var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcssImport = require('postcss-import');
var host = '0.0.0.0';
var port = parseInt(process.env.PORT) || 3000;
var rootPath = path.join(__dirname, '..');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },

  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      loaders: [ 'babel-loader?stage=0&optional[]=runtime' ],
      include: path.join(rootPath, 'src'),
      stage: 0
    }, {
      test: /(\.css|\.scss)$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox')
    }, {
      test: /(\.png|\.jpg|\.gif)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.svg$/,
      loader: 'svg-inline'
    }, {
      test: /\.json$/,
      loader: 'file'
    }]
  },

  toolbox: 'theme.scss',
  postcss: [autoprefixer],

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin(
      "vendor",
      "vendor.bundle.js", {
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(app_dir) === -1;
      }
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:3000/navigation' })
  ]
};
