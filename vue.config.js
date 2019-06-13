const path = require('path')
const isPro = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: isPro ? '/dist' : '/',//暂时写成绝对路径，以解决正式环境下的路径错误问题
  outputDir: path.resolve(__dirname, './dist'),
  runtimeCompiler: true,
  productionSourceMap: false,
  filenameHashing:false,//文件名剔除hash
  css:{
    extract:!isPro,//是否单独提取组建中的css
    sourceMap:!isPro,
  },
  configureWebpack: {
    resolve: {
      alias: {
        js: path.resolve(__dirname, './src/assets/js'),
        scss: path.resolve(__dirname, './src/assets/scss'),
        components: path.resolve(__dirname, './src/components')
      }
    }
  },
  devServer:{
    proxy: {
      '/api': {
        // target: 'http://10.0.100.101:5002',
        target: 'http://10.0.100.83:5002',
        changeOrigin: true
      }
    }
  }
}

