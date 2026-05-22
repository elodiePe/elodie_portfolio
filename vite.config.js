import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'node:fs'
import path from 'node:path'

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateDuplicateIndexIndexHtmlPlugin(){
  return {
    name: 'duplicate-index-html',
    apply: 'build',
    // remove old dist before build starts to avoid stale files
    buildStart() {
      const distPath = path.resolve(__dirname, 'dist')
      if (fs.existsSync(distPath)) {
        fs.rmSync(distPath, { recursive: true, force: true })
      }
    },
    writeBundle() {
      const indexPath = path.resolve(__dirname, 'dist', 'index.html')
      const routes = [
        '/',
        '/contact',
        '/projects',
        '/projects/1', 
        '/projects/2',
        '/projects/3',
        '/projects/4',
        '/projects/5',
        '/projects/6',
        '/projects/7',
        '/projects/8',
        '/projects/9',
        '/projects/10',
        '/projects/11',
        '/projects/12',
        '/projects/13',
        '/projects/14',
        '/projects/15',
        '/projects/16',
        '/projects/17',
        '/projects/18',
        '/projects/19',
        '/projects/20',
          
        // add more project IDs as needed
      ]

      routes.forEach(route => {
        // strip leading slash to avoid path.resolve treating it as absolute
        const cleanRoute = route.replace(/^\//, '')
        const routeDir = path.resolve(__dirname, 'dist', cleanRoute)
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true })
        }
        fs.copyFileSync(indexPath, path.resolve(routeDir, 'index.html'))
      })
      // ensure public/404.html and favicon.ico are copied to dist root
      const public404 = path.resolve(__dirname, 'public', '404.html')
      const out404 = path.resolve(__dirname, 'dist', '404.html')
      if (fs.existsSync(public404)) {
        fs.copyFileSync(public404, out404)
      }
      
      // copy favicon.ico explicitly
      const publicFavicon = path.resolve(__dirname, 'public', 'favicon.ico')
      const outFavicon = path.resolve(__dirname, 'dist', 'favicon.ico')
      if (fs.existsSync(publicFavicon)) {
        fs.copyFileSync(publicFavicon, outFavicon)
      }
        // copy logo SVG as favicon
        const logoSvg = path.resolve(__dirname, 'src', 'assets', 'elodie_logo_portfolio.svg')
        const outFaviconSvg = path.resolve(__dirname, 'dist', 'favicon.svg')
        if (fs.existsSync(logoSvg)) {
          fs.copyFileSync(logoSvg, outFaviconSvg)
        }
      
        // also copy white logo for future use
        const logoWhiteSvg = path.resolve(__dirname, 'src', 'assets', 'elodie_logo_portfolio_white.svg')
        const outFaviconWhite = path.resolve(__dirname, 'dist', 'favicon-white.svg')
        if (fs.existsSync(logoWhiteSvg)) {
          fs.copyFileSync(logoWhiteSvg, outFaviconWhite)
        }

        // remove any legacy favicon.ico copied from public/
        const legacyFavicon = path.resolve(__dirname, 'dist', 'favicon.ico')
        if (fs.existsSync(legacyFavicon)) {
          fs.rmSync(legacyFavicon, { force: true })
        }
      }
  };

}
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), generateDuplicateIndexIndexHtmlPlugin(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // base: '/elodie_portfolio/',  // Remplace 'nom-du-repo' par le nom de ton dépôt GitHub
  base: '/', 
})
