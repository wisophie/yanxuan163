module.exports={
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //配置postcss-pxtorem
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 41.4,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            exclude: /node_modules/i
          })
        ]
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer:{

  }
}