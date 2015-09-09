var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var config = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000', 
    'webpack/hot/dev-server', 
    path.resolve(appPath, 'main.js')],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        },{
      test: /\.css$/,
      loader: 'style!css'
    }
        ]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
