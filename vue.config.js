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
  configureWebpack:(config)=>{
    const processArgvs = process.argv.slice(3)
    config.resolve.alias= {
        '@': path.resolve(__dirname,'./src'),
        vue$: 'vue/dist/vue.esm.js',
        js: path.resolve(__dirname, './src/assets/js'),
        scss: path.resolve(__dirname, './src/assets/scss'),
        components: path.resolve(__dirname, './src/components')
      }
    // 判断是否有 mock 参数，有则在原入口的基础上带上 mock 工具与数据
    console.log('process.env.VUE_APP_INMOCK:',processArgvs.indexOf('inMock=true'))
    if (processArgvs.indexOf('inMock=true')) {
      let entry = config.entry
      if (Array.isArray(entry)) {  
        entry.push('./src/mock')
      } else if (typeof entry === 'object') {
        Object.keys(entry).forEach(name => {
          if (Array.isArray(entry[name])) {
            entry[name].push('./src/mock')
          } else {
            entry[name] = [entry[name], './src/mock']
          }
        })
      } else {
        config.entry = [entry, './src/mock']
      }
    }
  },
  devServer:{
/*     proxy: {
      '/api': {
        // target: 'http://10.0.100.101:5002',
        target: 'http://10.0.100.83:5002',
        changeOrigin: true
      }
    } */
  }
}

