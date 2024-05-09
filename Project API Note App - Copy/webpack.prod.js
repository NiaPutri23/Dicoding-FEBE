const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      /* babel loader */
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            // exclude: /(node_modules|bower_components)/,
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
})
