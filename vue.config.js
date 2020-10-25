
/* eslint-disable no-console */
const { name } = require('./package')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const dev = process.env.NODE_ENV === 'local'

const port = 8081 // dev port

module.exports = {
  publicPath: dev ? `http://localhost:${port}/` : './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  // 是否使用md5码
  filenameHashing: true,

  // eslint 错误处理，true表示对待eslint错误为warnings，warnings不会导致编译失败
  lintOnSave: true,

  // 生产环境是否开启source map
  productionSourceMap: false,

  // 内容安全策略及子资源完整性
  integrity: false,

  // 本地服务
  devServer: {
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assetsDir': resolve('src/assets'),
        '@selectBox': resolve('src/components/SelectBox'),
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      // library: `${name}-[name]`,
      library: `${name}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    }
  },

  chainWebpack: config => {
    if (config.plugins.has('progress') && process.env.CI_RUNNER_ID) {
      config.plugins.delete('progress')
    }
    // config.plugin('workbox')
    config.plugin('define')
      .tap(args => {
        args[0].BUILD_TIME = +Date.now()
        return args
      })
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/styles/variables.less')
      ]
    }
  },

  transpileDependencies: [
    /\/node_modules\/@mainto-ui-component\/vue\//,
    "vuetify"
  ],

  pwa: {
    name: 'Cloud Tool',
    themeColor: '#4669FB',
    msTileColor: '#fffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'GenerateSW',
    manifestOptions: {
      short_name: '云端助手',
      display: 'standalone',
      start_url: dev ? '/index.html' : "/cloud-tool/index.html",
      background_color: "#131923",
      icons: [
        {
          "src": dev ? "/img/icons/android-chrome-192x192.png" : "/cloud-tool/img/icons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": dev ? "/img/icons/android-chrome-512x512.png" : "/cloud-tool/img/icons/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
    }
  }
}
