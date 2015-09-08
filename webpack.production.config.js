var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var Webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var pathToReact = path.resolve(node_modules_dir, 'react/dist/react.min.js');

var config = {
   
    entry: mainPath,
    output: {
        path: buildPath,
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }
        ],
        noParse: [pathToReact]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
          'react': pathToReact
        }
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
        compress: {
           warnings: false
        }}),
        new ExtractTextPlugin("css/main.css", {
            allChunks: true
        })
    ]
};


module.exports = config;