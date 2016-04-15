'use strict';

var path = require('path');
var webpack = require('webpack');
var config = {
  devTool: 'eval',

  devServer: {
    inline: true,
    port: 3211
  },

  entry: {
    src: ['./src/js/App.js']
  },

  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "react-application.js"
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};

module.exports = config;

