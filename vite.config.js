import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import eslintPlugin from 'vite-plugin-eslint'
import progress from 'vite-plugin-progress'
import colors from 'picocolors'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())

  const srcPath = path.resolve(__dirname, 'src')

  const isOpenProxy = !!viteEnv.VITE_HTTP_PROXY

  const outDir = path.resolve(__dirname, 'dist')

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
      },
      cssCodeSplit: false,
      outDir: outDir,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            // 分包配置，配置完成自动按需加载
            vue: ['vue', 'vue-router', 'element-plus']
          }
        }
      }
    }
  }
})

function setupVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    WindiCSS(),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
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
    progress({
      format: `${colors.green(colors.bold('Bouilding'))} ${colors.cyan(
        '[:bar]'
      )} :percent`
      // complete: '=',
      // incomplete: ''
    }),
    viteCompression(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      open: true,
      emitFile: true,
      filename: 'stats.html'
    })
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
