'use strict';

// Dependencies
var path = require('path');

/**
 * Development config
 * @param  {String} _path Absolute path to application
 * @return {Object}       Object of development settings
 */
module.exports = function(_path) {

  return {
    context: _path,
    debug: true,
    devtool: 'eval',
    devServer: {
      contentBase: './dist',
      info: true,
      hot: false,
      inline: true
    },
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.join(_path, 'app'),
        loaders: ['eslint-loader']
      }]
    }
  }
};
