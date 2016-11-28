const ENV = process.env.NODE_ENV = process.env.ENV = 'prod';
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
module.exports = webpackMerge(commonConfig, {
  htmlLoader : {
    minimize : false
  },
  output : {
    path : helpers.root('dist'),
    publicPath : '',
    filename : '[name].[hash].js',
    chunkFilename : '[id].[hash].chunk.js'
  },
  plugins : [
    new WebpackCleanupPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'exclude' : [
        /vendor/,
        /polyfills/
      ]
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env' : {
        ENV : JSON.stringify(ENV)
      }
    })
  ]
});
