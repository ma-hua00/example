const path = require("path");
// 引入等比适配插件
const px2rem = require('postcss-px2rem');

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})

module.exports = {
  publicPath:'./',

  outputDir:`dis-${process.env.NODE_ENV}`,

  productionSourceMap:process.env.NODE_ENV==='production'?false:true,

  // 本地跨域配置
  // devServer: {
  //   // 配置跨域代理
  //   proxy: {
  //     "api/": {//将http://baidui.com"映射为/api
  //
  //       target: "http://192.168.0.230:9302/",//需要代理的baserurl，运营端
  //
  //       changeOrigin: true, //本地会虚拟一个服务端接收你的请求并代你发送该请求
  //       pathRewrite: {
  //         "^/api": "" //重写路径，比如将api/aa/bb重写为aa/bb
  //       },
  //       logLevel: "debug"//可以在终端打印日志
  //     }
  //   }
  // },

  // 配置全局通用自定义scss变量
  css:{
    loaderOptions:{
      sass:{
        prependData:'@import "~@src/static/scss/common.scss";'
      },
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  
  //配置全局引入路径
  chainWebpack:config => {
    config.resolve.alias
      .set('@views',path.join(__dirname,'./src/views'))
      .set('@src',path.join(__dirname,'./src'))
  }
}