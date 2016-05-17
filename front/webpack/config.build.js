/* eslint-disable */

var extractTextPlugin = require('extract-text-webpack-plugin')
var path              = require('path')
var webpack           = require('webpack')

var assign = require('./assign')
var common = require('./common')



module.exports = assign(common, {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loader: extractTextPlugin.extract([
          'css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'resolve-url',
          'sass?sourceMap'
        ]),
      },
      {
        test: /(\.scss|\.css)$/,
        loader: extractTextPlugin.extract([
          'css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'resolve-url',
          'sass?sourceMap',
          'toolbox'
        ]),
      },
      {
        test: /(\.png|\.jpg|\.gif)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      },
      {
        test: /\.(jpg|png|svg|woff)$/,
        include: /assets/,
        loader: 'file',
        query: {
          name: 'assets/[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new extractTextPlugin('[hash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
})