const ENV = process.env.NODE_ENV = process.env.ENV = 'dev';
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = webpackMerge(commonConfig, {
  devServer : {
    historyApiFallback : true,
    stats : 'minimal'
  },
  devtool : 'cheap-module-eval-source-map',
  output : {
    path : helpers.root('dist'),
    publicPath : 'http://localhost:3000/',
    filename : '[name].js',
    chunkFilename : '[id].chunk.js'
  },
  plugins : [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env' : {
        ENV : JSON.stringify(ENV)
      }
    })
  ]
});
