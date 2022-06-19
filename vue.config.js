const path = require('path');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 5000
    },

    publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
          path.resolve(__dirname, './src/style/index.less'),
          path.resolve(__dirname, './src/style/variables.less'),
        ]
      }
    }
}
