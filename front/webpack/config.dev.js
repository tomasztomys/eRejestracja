/* eslint-disable */

var path    = require('path')
var webpack = require('webpack')

var assign = require('./assign')
var common = require('./common')
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = assign(common, {
  devtool: 'eval-source-map',
  watch: true,
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap'
      },
      {
        test: /(\.scss|\.css)$/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap&react-hot'
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],



  devServer: {
    contentBase: './build',
    hot: true,
    inline: true,
    port: process.env.npm_package_config_port,
    historyApiFallback: true
  }
})