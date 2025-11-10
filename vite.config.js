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
        '/projects/10'
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
  base: '/elodie_portfolio/',  // Remplace 'nom-du-repo' par le nom de ton dépôt GitHub

})
