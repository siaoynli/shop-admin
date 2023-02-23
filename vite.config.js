import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import eslintPlugin from 'vite-plugin-eslint'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    WindiCSS(), // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
})
