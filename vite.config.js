import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import eslintPlugin from 'vite-plugin-eslint'
import progress from 'vite-plugin-progress'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())

  const srcPath = path.resolve(__dirname, 'src')

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY

  const envConfig = {
    proxyPattern: '/api',
    url: 'http://ceshi13.dishait.cn'
  }

  return {
    server: {
      proxy: createViteProxy(isOpenProxy, envConfig)
    },
    plugins: setupVitePlugins(viteEnv),
    resolve: {
      alias: {
        '~': srcPath
      }
    },
    optimizeDeps: {
      include: []
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  }
})

function setupVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    WindiCSS(), // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          appName: viteEnv.VITE_APP_NAME
        }
      }
    }),
    progress(),
    viteCompression(),
    visualizer({
      emitFile: true,
      filename: 'stats.html'
    })
    // chunkSplitPlugin({ strategy: 'default' })
  ]

  return plugins
}

function createViteProxy(isOpenProxy, envConfig) {
  if (!isOpenProxy) return undefined
  const proxy = {
    [envConfig.proxyPattern]: {
      target: envConfig.url,
      changeOrigin: true,
      rewrite: path =>
        path.replace(new RegExp(`^${envConfig.proxyPattern}`), '')
    }
  }
  return proxy
}
