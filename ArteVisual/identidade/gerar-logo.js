// Gera os SVGs do logo MiriDoces (direção A · Confeito) com o texto convertido em curvas.
// Uso: node gerar-logo.js <Caprasimo-Regular.ttf> <pasta-de-saida>
// Saída: miridoces-principal.svg, miridoces-chocolate.svg, miridoces-branco.svg, miridoces-simbolo.svg
const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');

const [fontFile, outDir] = process.argv.slice(2);
if (!fontFile || !outDir) { console.error('Uso: node gerar-logo.js <fonte.ttf> <saida>'); process.exit(1); }

const COR = { framboesa: '#B5305F', chocolate: '#3A1E1A', merengue: '#FFF5F7', caramelo: '#E7A03C', pistache: '#7FA872', branco: '#FFFFFF' };
const font = opentype.loadSync(fontFile);
const r = n => Math.round(n * 100) / 100;

// Divide os comandos de um path em contornos (cada um começa com M)
function contornos(cmds) {
  const out = []; let cur = null;
  for (const c of cmds) { if (c.type === 'M') { cur = []; out.push(cur); } cur.push(c); }
  return out;
}
function bbox(cmds) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const c of cmds) for (const [kx, ky] of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
    if (c[kx] === undefined) continue;
    x1 = Math.min(x1, c[kx]); x2 = Math.max(x2, c[kx]); y1 = Math.min(y1, c[ky]); y2 = Math.max(y2, c[ky]);
  }
  return { x1, y1, x2, y2 };
}
function toD(cmds) {
  return cmds.map(c => {
    switch (c.type) {
      case 'M': case 'L': return `${c.type}${r(c.x)} ${r(c.y)}`;
      case 'Q': return `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`;
      case 'C': return `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`;
      case 'Z': return 'Z';
    }
  }).join('');
}

// Palavra com o pingo dos "i" trocado por granulado
function palavra(texto, size, trocarPingo) {
  const corpo = []; const pingos = [];
  font.forEachGlyph(texto, 0, size, size, { kerning: true }, (glyph, gx, gy, fs) => {
    const cs = contornos(glyph.getPath(gx, gy, fs).commands);
    if (trocarPingo && glyph.name === 'i' && cs.length > 1) {
      // o pingo é o contorno mais alto (menor y)
      let top = 0;
      cs.forEach((c, i) => { if (bbox(c).y2 < bbox(cs[top]).y2) top = i; });
      pingos.push(bbox(cs[top]));
      cs.splice(top, 1);
    }
    cs.forEach(c => corpo.push(...c));
  });
  return { d: toD(corpo), box: bbox(corpo), pingos };
}

function granulo(b, cor, angulo) {
  const cx = (b.x1 + b.x2) / 2, cy = (b.y1 + b.y2) / 2 - (b.y2 - b.y1) * 0.3;
  const w = (b.x2 - b.x1) * 1.3, h = (b.x2 - b.x1) * 0.5;
  return `<rect x="${r(cx - w / 2)}" y="${r(cy - h / 2)}" width="${r(w)}" height="${r(h)}" rx="${r(h / 2)}" fill="${cor}" transform="rotate(${angulo} ${r(cx)} ${r(cy)})"/>`;
}

function wordmark(nome, corTexto, coresGranulo) {
  const p = palavra('MiriDoces', 200, coresGranulo.length > 0);
  const top = Math.min(p.box.y1, ...p.pingos.map(b => b.y1)) - 16;
  const pad = 16;
  const vb = [p.box.x1 - pad, top - pad, p.box.x2 - p.box.x1 + pad * 2, p.box.y2 - top + pad * 2].map(r);
  const angulos = [-28, 24];
  const gran = p.pingos.map((b, i) => granulo(b, coresGranulo[i % coresGranulo.length], angulos[i % 2])).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" role="img" aria-label="MiriDoces"><path fill="${corTexto}" d="${p.d}"/>${gran}</svg>\n`;
  fs.writeFileSync(path.join(outDir, nome), svg);
  return vb;
}

function simbolo(nome) {
  const S = 1000, size = 640;
  const g = font.charToGlyph('M');
  const tmp = g.getPath(0, 0, size); const b = bbox(tmp.commands);
  const dx = S / 2 - (b.x1 + b.x2) / 2, dy = S / 2 - (b.y1 + b.y2) / 2 + 10;
  const d = toD(g.getPath(dx, dy, size).commands);
  // granulado em volta do M, fora da área da letra
  const pos = [
    [215, 250, 35, COR.caramelo], [500, 120, -15, COR.branco], [780, 240, -40, COR.pistache],
    [880, 520, 70, COR.caramelo], [770, 810, 30, COR.branco], [500, 890, -10, COR.pistache],
    [225, 790, -35, COR.caramelo], [115, 510, 80, COR.branco],
  ];
  const gw = 92, gh = 32;
  const gran = pos.map(([x, y, a, c]) => `<rect x="${x - gw / 2}" y="${y - gh / 2}" width="${gw}" height="${gh}" rx="${gh / 2}" fill="${c}" transform="rotate(${a} ${x} ${y})"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img" aria-label="MiriDoces"><circle cx="500" cy="500" r="500" fill="${COR.framboesa}"/>${gran}<path fill="${COR.branco}" d="${d}"/></svg>\n`;
  fs.writeFileSync(path.join(outDir, nome), svg);
}

fs.mkdirSync(outDir, { recursive: true });
console.log('principal', wordmark('miridoces-principal.svg', COR.framboesa, [COR.caramelo, COR.pistache]));
// versões de uma cor mantêm o pingo normal: granulado monocromático parece acento
wordmark('miridoces-chocolate.svg', COR.chocolate, []);
wordmark('miridoces-branco.svg', COR.branco, []);
simbolo('miridoces-simbolo.svg');
console.log('ok:', fs.readdirSync(outDir).join(', '));
