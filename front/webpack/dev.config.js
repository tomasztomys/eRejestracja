var _ = require('lodash');
var commonConfig = require('./common');
var path = require('path');
var rootPath = path.join(__dirname, '..');
var webpack = require('webpack');

var node_modules_dir = path.join(__dirname, 'node_modules');
var app_dir = path.join(__dirname, 'src');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.assign(commonConfig, {
  devtool: 'eval-source-map',

  watch: true,

  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
});

// add hot reloading for dev
var jsFiles = config.module.loaders[0];
jsFiles.loaders.unshift('react-hot');


config.plugins.push(
  // development mode
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.LANDING_ONLY': JSON.stringify(false)
  }),
  // needed for hot reloading to work
  new webpack.HotModuleReplacementPlugin()
);

module.exports = config;
