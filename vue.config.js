module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/server': {
        target: 'http://192.168.1.220/server',

        changeOrigin: true,
        pathRewrite: {
          '^/server': '',
        },
      },
    },
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/styles/main.scss"',
      },
    },
  },
  chainWebpack: (config) => {
    config.entry('main').add('@babel/polyfill');
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => Object.assign(opt, { data: '@import "~@/styles/main.scss";' }));
    });
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  transpileDependencies:['vuetify', 'vuex']
};
