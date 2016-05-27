/* eslint-disable */

var autoprefixer = require('autoprefixer')
var htmlPlugin   = require('html-webpack-plugin')
var path         = require('path')
var rootPath     = path.join(__dirname, '..');


module.exports = {
  context: path.resolve('./src'),
  entry: [
    './scripts/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: /scripts/,
      },
      {
        test: /\.json$/,
        include: /assets/,
        loader: 'json',
      },
    ],
  },
  output: {
    publicPath: '/',
    filename: '[hash].js',
    path: path.resolve('./build'),
  },
  plugins: [
    new htmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeTagWhitespace: true,
      },
      template: 'index.html',
    }),
  ],
  toolbox: 'theme.scss',
  postcss: function() {
    return [
      autoprefixer,
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve('./src/assets'),
      styles: path.resolve('./src/styles'),
      constants: path.resolve('./src/scripts/constants'),
      utilities: path.resolve('./src/scripts/utilities'),
      actions: path.resolve('./src/scripts/actions'),
      reducers: path.resolve('./src/scripts/reducers'),
      lib: path.resolve('./src/scripts/lib'),
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json',
      '.sass',
      '.scss',
    ]
  },
}