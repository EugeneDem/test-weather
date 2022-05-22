const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/test-weather/htdocs/" : "/",
  outputDir: 'htdocs',
  productionSourceMap: false,
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/variables.scss";`
      }
    },
    extract: {
      filename: '[name].[hash:8].css',
      chunkFilename: '[name].[hash:8].css'
    }
  },
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: '[name].[hash:8].js'
    }
  },
  chainWebpack(config) {
    config
      .optimization.splitChunks({
        cacheGroups: {
          default: false,
          all: {
            name: 'all',
            test: /.*/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      });
  }
})
