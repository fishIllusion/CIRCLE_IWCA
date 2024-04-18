// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false
// })
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false, //关闭eslint检查
  outputDir: "dist",
  // assetsDir: "static",
  indexPath: "index.html",
  // filenameHashing: true,
  // assetsPublicPath: './',
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: '/',
  // productionSourceMap: false,
  devServer: {
    // open: true, 自动开启选项
    host: 'localhost',//http://127.0.0.1:5050 http://123.207.210.161:5050
    port: 80, //该网站页面服务所在端口号8080 
    https: false, 
    historyApiFallback: true,
    allowedHosts: 'all',
    proxy: {
      '/api|/binary': {
        // target: 'http://123.207.210.161:5050',

        target: 'http://121.43.139.166:3000',
        // target: 'http://localhost:3000',


        //本地IP http://127.0.0.1:5050 http://123.207.210.161:5050
        //远程IP target: 'http://123.207.210.161:5050',
        changeOrigin:true, 
      },
    }
  }
})
