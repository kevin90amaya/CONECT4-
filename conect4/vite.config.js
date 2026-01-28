import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src/main/resources/static',
  build: {
    outDir: '../../../target/classes/static',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/main/resources/static/scripts.js'
      },
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][ext]'
      }
    }
  },
server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
      '/ws': {
        target: 'http://localhost:8080',  // Cambiado de ws:// a http://
        ws: true,
        changeOrigin: true,  // Añadido
        secure: false        // Añadido para desarrollo
      }
    }
}
});

