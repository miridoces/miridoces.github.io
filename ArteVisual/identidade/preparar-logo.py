#!/usr/bin/env python3
"""Prepara os arquivos do logo Nosso Doce Seu a partir da arte recebida (JPEG com fundo creme).

Uso:
    python3 preparar-logo.py logo/nossodoceseu-original.jpg logo/ [--favicon-dir ../../Site/public]

Entrada: a arte original (fundo creme liso, logo no centro).
Saída (na pasta indicada):
    nossodoceseu-principal.png      logo completo, fundo transparente, alta resolução
    nossodoceseu-nome.png           só o nome + "CONFEITARIA" (sem o chantilly), para faixas horizontais
    nossodoceseu-nome-creme.png     o mesmo, em uma cor (Creme), para fundos escuros
    nossodoceseu-simbolo.png        só o chantilly com a cereja
    nossodoceseu-perfil-1080.png    foto de perfil do Instagram (símbolo sobre círculo Creme)
    web/*.png                       versões menores usadas pelo site
    --favicon-dir: favicon.png (64px, a cereja) e apple-touch-icon.png (180px, o símbolo)

Depende só do Pillow (requirements.txt). Não altera a arte original.
"""
import argparse
import os
from collections import deque

from PIL import Image, ImageFilter

CREME = (253, 243, 228)           # mesmo valor de --creme em tokens.css
LIMIAR_RUIDO = 0.06               # alpha abaixo disso é ruído do JPEG
ZONA_SIMBOLO = dict(xmin=370, ymax=640)  # componentes do chantilly ficam acima/à direita disso (arte 1536×1024)
ZONA_CEREJA_YMAX = 400


def cor_para_alpha(im, fundo):
    """Remove a cor de fundo (como o "cor para alfa" do GIMP), devolvendo RGBA."""
    w, h = im.size
    src = im.load()
    out = Image.new('RGBA', (w, h))
    dst = out.load()
    for y in range(h):
        for x in range(w):
            p = src[x, y]
            a = 0.0
            for c in range(3):
                d = p[c] - fundo[c]
                if d > 0:
                    a = max(a, d / max(255 - fundo[c], 60))
                elif d < 0:
                    a = max(a, -d / fundo[c])
            a = min(a, 1.0)
            if a < LIMIAR_RUIDO:
                dst[x, y] = (0, 0, 0, 0)
                continue
            cor = tuple(max(0, min(255, round(fundo[c] + (p[c] - fundo[c]) / a))) for c in range(3))
            dst[x, y] = cor + (round(a * 255),)
    return out


def componentes(rgba, alpha_min=64):
    """Rotula regiões conectadas (8 vizinhos) com alpha >= alpha_min. Devolve lista de (bbox, pixels)."""
    w, h = rgba.size
    a = rgba.getchannel('A').load()
    visto = bytearray(w * h)
    saida = []
    for y0 in range(h):
        for x0 in range(w):
            i0 = y0 * w + x0
            if visto[i0] or a[x0, y0] < alpha_min:
                continue
            visto[i0] = 1
            fila = deque([(x0, y0)])
            px = []
            x1 = x2 = x0
            y1 = y2 = y0
            while fila:
                x, y = fila.popleft()
                px.append((x, y))
                x1, x2, y1, y2 = min(x1, x), max(x2, x), min(y1, y), max(y2, y)
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h:
                            j = ny * w + nx
                            if not visto[j] and a[nx, ny] >= alpha_min:
                                visto[j] = 1
                                fila.append((nx, ny))
            saida.append(((x1, y1, x2, y2), px))
    return saida


def mascara(tamanho, pixels, dilatar=9):
    m = Image.new('L', tamanho, 0)
    mp = m.load()
    for x, y in pixels:
        mp[x, y] = 255
    return m.filter(ImageFilter.MaxFilter(dilatar)) if dilatar else m


def aplicar_mascara(rgba, m):
    out = rgba.copy()
    a = Image.composite(rgba.getchannel('A'), Image.new('L', rgba.size, 0), m)
    out.putalpha(a)
    return out


def recortar(rgba, margem=12):
    bbox = rgba.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    x1, y1, x2, y2 = bbox
    w, h = rgba.size
    return rgba.crop((max(0, x1 - margem), max(0, y1 - margem), min(w, x2 + margem), min(h, y2 + margem)))


def preencher_furos(rgba, original, caixa):
    """Dentro de `caixa`, torna opaco o que estiver cercado (ex.: o brilho branco da cereja)."""
    x1, y1, x2, y2 = caixa
    a = rgba.load()
    o = original.load()
    fora = set()
    fila = deque()
    for x in range(x1, x2 + 1):
        fila.extend([(x, y1), (x, y2)])
    for y in range(y1, y2 + 1):
        fila.extend([(x1, y), (x2, y)])
    while fila:
        x, y = fila.popleft()
        if (x, y) in fora or not (x1 <= x <= x2 and y1 <= y <= y2) or a[x, y][3] >= 128:
            continue
        fora.add((x, y))
        fila.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    for y in range(y1, y2 + 1):
        for x in range(x1, x2 + 1):
            if (x, y) not in fora and a[x, y][3] < 255:
                a[x, y] = o[x, y] + (255,)


def em_uma_cor(rgba, cor):
    out = Image.new('RGBA', rgba.size, cor + (0,))
    out.putalpha(rgba.getchannel('A'))
    return out


def reduzir(im, largura):
    h = round(im.height * largura / im.width)
    return im.resize((largura, h), Image.LANCZOS)


def no_quadrado(im, lado, fundo=None, ocupacao=0.72, circulo=False):
    quadro = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
    if fundo:
        if circulo:
            disco = Image.new('L', (lado * 4, lado * 4), 0)
            from PIL import ImageDraw
            ImageDraw.Draw(disco).ellipse((0, 0, lado * 4 - 1, lado * 4 - 1), fill=255)
            quadro.paste(Image.new('RGBA', (lado, lado), fundo + (255,)), (0, 0), disco.resize((lado, lado), Image.LANCZOS))
        else:
            quadro = Image.new('RGBA', (lado, lado), fundo + (255,))
    escala = ocupacao * lado / max(im.size)
    peca = im.resize((round(im.width * escala), round(im.height * escala)), Image.LANCZOS)
    quadro.alpha_composite(peca, ((lado - peca.width) // 2, (lado - peca.height) // 2))
    return quadro


def salvar(im, caminho):
    im.save(caminho, optimize=True)
    print(f'  {caminho} ({im.width}×{im.height}, {os.path.getsize(caminho) // 1024} KB)')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('original', help='arte original (JPEG/PNG com fundo creme)')
    ap.add_argument('saida', help='pasta de saída (ex.: logo/)')
    ap.add_argument('--favicon-dir', help='pasta public/ do site, para favicon.png e apple-touch-icon.png')
    args = ap.parse_args()

    original = Image.open(args.original).convert('RGB')
    if original.size != (1536, 1024):
        ap.error('as zonas de recorte foram medidas na arte de 1536×1024; ajuste ZONA_SIMBOLO para outro tamanho')

    print('Removendo o fundo…')
    rgba = cor_para_alpha(original, CREME)

    print('Separando símbolo e nome…')
    simb_px, nome_px, cereja_px = [], [], []
    for (x1, y1, x2, y2), px in componentes(rgba):
        if x1 >= ZONA_SIMBOLO['xmin'] and y2 < ZONA_SIMBOLO['ymax']:
            if len(px) >= 150:  # descarta pontinhos soltos (ruído da arte)
                simb_px += px
        else:
            nome_px += px
    # a cereja: pixels vermelho-vivo no alto do símbolo (as transições rosa/marrom do chantilly não entram)
    o = original.load()
    cereja_px = [(x, y) for x, y in simb_px
                 if y < ZONA_CEREJA_YMAX and o[x, y][0] > 190 and o[x, y][1] < 50 and o[x, y][2] < 80]
    cx1 = min(x for x, _ in cereja_px); cx2 = max(x for x, _ in cereja_px)
    cy1 = min(y for _, y in cereja_px); cy2 = max(y for _, y in cereja_px)
    preencher_furos(rgba, original, (cx1 - 4, cy1 - 4, cx2 + 4, cy2 + 4))

    m_simb = mascara(rgba.size, simb_px)
    m_nome = mascara(rgba.size, nome_px)
    simbolo = recortar(aplicar_mascara(rgba, m_simb))
    nome = recortar(aplicar_mascara(rgba, m_nome))
    principal = recortar(rgba, margem=24)
    # cereja com o cabinho (favicon): a elipse da cereja + o que estiver acima dela
    from PIL import ImageDraw
    m_cereja = Image.new('L', rgba.size, 0)
    d = ImageDraw.Draw(m_cereja)
    d.ellipse((cx1 - 5, cy1 - 5, cx2 + 5, cy2 + 5), fill=255)
    d.rectangle((0, 0, rgba.width, cy1 + (cy2 - cy1) // 5), fill=255)
    m_cereja = Image.composite(m_simb, Image.new('L', rgba.size, 0), m_cereja)
    cabinho = recortar(aplicar_mascara(rgba, m_cereja), margem=2)

    os.makedirs(os.path.join(args.saida, 'web'), exist_ok=True)
    s = lambda nome_arq: os.path.join(args.saida, nome_arq)
    print('Salvando:')
    salvar(principal, s('nossodoceseu-principal.png'))
    salvar(nome, s('nossodoceseu-nome.png'))
    salvar(em_uma_cor(nome, CREME), s('nossodoceseu-nome-creme.png'))
    salvar(simbolo, s('nossodoceseu-simbolo.png'))
    salvar(no_quadrado(simbolo, 1080, fundo=CREME, ocupacao=0.8, circulo=True), s('nossodoceseu-perfil-1080.png'))
    salvar(reduzir(nome, 560), s('web/nome-560.png'))
    salvar(reduzir(em_uma_cor(nome, CREME), 400), s('web/nome-creme-400.png'))
    salvar(reduzir(simbolo, 640), s('web/simbolo-640.png'))
    salvar(reduzir(principal, 900), s('web/principal-900.png'))
    if args.favicon_dir:
        salvar(no_quadrado(cabinho, 64, ocupacao=0.98), os.path.join(args.favicon_dir, 'favicon.png'))
        salvar(no_quadrado(simbolo, 180, fundo=CREME, ocupacao=0.82), os.path.join(args.favicon_dir, 'apple-touch-icon.png'))


if __name__ == '__main__':
    main()
