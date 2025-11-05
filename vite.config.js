import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'

function generateDuplicateIndexIndexHtmlPlugin(){
  return {
    name: 'duplicate-index-html',
    apply: 'build',
    writeBundle(){
      const indexPath = path.resolve(__dirname, 'dist', 'index.html');
      const routes = [
        '/',
        '/contact',
        '/projects',
        '/projects/1', // Exemple d'ID de projet
        '/projects/2'  // E

      ];
      routes.forEach(route => {
        const routePath = path.resolve(__dirname, 'dist', route);
        const fs = require('fs');
        const dir = path.dirname(routePath);
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.copyFileSync(indexPath, path.resolve(routePath, 'index.html'));
      });
    },
    generateBundle(){
      const distPath = path.resolve(__dirname, 'dist');
      if(require('fs').existsSync(distPath)){
        const fs = require('fs');
        fs.rmSync(distPath, { recursive: true, force: true });
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
  base: '/elodie_portfolio/',  // Remplace 'nom-du-repo' par le nom de ton dépôt GitHub

})
