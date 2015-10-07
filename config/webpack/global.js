'use strict'

// Dependencies
var path         = require('path');
var webpack      = require('webpack');
var Manifest     = require('manifest-revision-webpack-plugin');
var TextPlugin   = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlPlugin   = require('html-webpack-plugin');

/**
 * Global webpack config
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
module.exports = function(_path) {

  // Local variables
  var dependencies  = Object.keys(require(_path + '/package').dependencies);
  var rootAssetPath = _path + 'app';

  return {

    // Entry points
    entry: {
      application: _path + '/app/app.js',
      vendors: dependencies
    },

    // Output system
    output: {
      path: path.join(_path, 'dist'),
      filename: path.join('assets', 'js', '[name].bundle.[chunkhash].js'),
      chunkFilename: '[id].bundle.[chunkhash].js',
      publicPath: '/'
    },

    // Resolves modules
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules'],
      alias: {
        _svg:         path.join(_path, 'app', 'assets', 'svg'),
        _data:        path.join(_path, 'app', 'data'),
        _fonts:       path.join(_path, 'app', 'assets', 'fonts'),
        _modules:     path.join(_path, 'app', 'assets', 'modules'),
        _images:      path.join(_path, 'app', 'assets', 'images'),
        _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
        _templates:   path.join(_path, 'app', 'assets', 'templates')
      }
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel-loader'],
          include: path.join(_path, 'app'),
          exclude: path.resolve(__dirname, 'node_modules')
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline'
        },
        { test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif)$/i, loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]'] },
        { test: /\.styl$/, loader: TextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader') }
      ]
    },

    // Post css
    postcss: [
      autoprefixer({ browsers: ['last 2 versions'] }),
      require('postcss-center')
    ],

    // Load plugins
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[chunkhash].js'),
      new TextPlugin('assets/css/[name].[chunkhash].css'),
      new Manifest(path.join(_path + '/config', 'manifest.json'), {
        rootAssetPath: rootAssetPath
      }),

      // Create instance for entry point index.html building
      new HtmlPlugin({
        title: 'Modal javascript dialog',
        chunks: ['application', 'vendors'],
        filename: 'index.html',
        template: path.join(_path, 'app', 'assets', 'templates', 'layouts', 'index.html')
      })
    ]
  }
};
