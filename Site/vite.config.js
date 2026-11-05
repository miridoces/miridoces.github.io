import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

// BASE_PATH: "/<repo>/" no GitHub Pages; "/" (padrão) no domínio da cliente.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
    react({ include: /\.(mdx|js|jsx)$/ }),
  ],
  // permite importar tokens.css e logos de ../ArteVisual/identidade (fonte única da marca)
  server: { fs: { allow: ['..'] } },
  test: { environment: 'node' },
})
