var path = require('path');
var Webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
var pathToReact = path.resolve(node_modules_dir, 'react/dist/react.js');

var config = {
    devtool: 'eval',
    entry: [
    
      // For hot style updates
      'webpack/hot/dev-server',
    
      // The script refreshing the browser on none hot updates
      'webpack-dev-server/client?http://localhost:8080',
    
      // Our application
      mainPath],
    output: {
    
      // We need to give Webpack a path. It does not actually need it,
      // because files are kept in memory in webpack-dev-server, but an
      // error will occur if nothing is specified. We use the buildPath
      // as that points to where the files will eventually be bundled
      // in production
      path: buildPath,
      filename: 'js/bundle.js',
    
      // Everything related to Webpack should go through a build path,
      // localhost:3000/build. That makes proxying easier to handle
      publicPath: '/build/js/'
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        },{
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
    new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("css/main.css", {
            allChunks: true
        })]
};

if(process.env.NODE_ENV == "production"){
    config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
        compress: {
           warnings: false
        }
    }));
}

module.exports = config;