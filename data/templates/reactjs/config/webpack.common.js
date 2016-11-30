var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
module.exports = {
  entry : {
    app : './src/main'
  },
  resolve : {
    extensions : [
      '',
      '.js',
      '.jsx'
    ]
  },
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        loader : 'babel'
      },
      {
        test : /\.html$/,
        loader : 'html'
      },
      {
        test : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader : 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test : /\.scss$/,
        exclude : helpers.root('src', 'app'),
        loader : ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test : /\.scss$/,
        include : helpers.root('src', 'app'),
        loaders : [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test : /\.css$/,
        exclude : helpers.root('src', 'app'),
        loader : ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test : /\.css$/,
        include : helpers.root('src', 'app'),
        loaders : [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins : [
    new webpack.optimize.CommonsChunkPlugin({
      name : ['app']
    }),
    new HtmlWebpackPlugin({
      template : 'src/index.html'
    })
  ]
};
