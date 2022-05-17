const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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

// module.exports = {
// 	outputDir: 'htdocs',
// 	productionSourceMap: false,
// 	"transpileDependencies": [
// 		"vuetify"
// 	],
// 	css: {
// 		loaderOptions: {
// 			stylus: {
// 				use: [require('nib')()],
// 				import: [
// 					'~nib/lib/nib/index.styl',
// 					__dirname + '/src/styles/variables.styl',
// 				]
// 			}
// 		},
// 		extract: {
// 			filename: '[name].[hash:8].css',
// 			chunkFilename: '[name].[hash:8].css'
// 		},
// 	},
// 	filenameHashing: false,
// 	configureWebpack: {
// 		output: {
// 			filename: '[name].[hash:8].js',
// 			chunkFilename: '[name].[hash:8].js'
// 		}
// 	},
// 	chainWebpack(config) {
// 		config
// 			.optimization.splitChunks({
// 				cacheGroups: {
// 					default: false,
// 					all: {
// 						name: 'all',
// 						test: /.*/,
// 						chunks: 'all',
// 						minChunks: 1,
// 						reuseExistingChunk: true,
// 					},
// 				},
// 			});
// 	}
// }