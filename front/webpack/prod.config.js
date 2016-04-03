var _ = require('lodash');
var commonConfig = require('./common');
var path = require('path');
var rootPath = path.join(__dirname, '..');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.assign(commonConfig, {
  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  entry: [
    './src/index'
  ]
});

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.LANDING_ONLY': JSON.stringify(false)
  }),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      unused: false
    },
  })
);

module.exports = config;
