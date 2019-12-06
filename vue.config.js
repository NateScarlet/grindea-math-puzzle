module.exports = {
  publicPath: './',
  transpileDependencies: ['strip-ansi', 'ansi-regex'],
  devServer: {
    contentBase: 'public',
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
