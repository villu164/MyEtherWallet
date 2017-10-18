'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');
const _ = require('./utils');
const { CheckerPlugin } = require('awesome-typescript-loader');
const AutoDllPlugin = require('autodll-webpack-plugin');
const vendor = require('./vendor');
console.log(vendor);
//HELP_2a_Title
console.log(_.cwd('./common/translations/index.tsx'));
module.exports = {
  context: _.cwd('./'),
  entry: {
    client: './common/index.tsx',
    vendor,
    translations: [
      './common/vendor/ledger-eth.js',
      './common/vendor/ledger3.js',
      './common/vendor/trezor-connect.js',
      './common/vendor/u2f-api.js',
      './common/translations/lang/de.json',
      './common/translations/lang/el.json',
      './common/translations/lang/en.json',
      './common/translations/lang/es.json',
      './common/translations/lang/fi.json',
      './common/translations/lang/fr.json',
      './common/translations/lang/ht.json',
      './common/translations/lang/hu.json',
      './common/translations/lang/id.json',
      './common/translations/lang/it.json',
      './common/translations/lang/ja.json',
      './common/translations/lang/nl.json',
      './common/translations/lang/no.json',
      './common/translations/lang/pl.json',
      './common/translations/lang/pt.json',
      './common/translations/lang/ru.json',
      './common/translations/lang/ko.json',
      './common/translations/lang/tr.json',
      './common/translations/lang/vi.json',
      './common/translations/lang/zhcn.json',
      './common/translations/lang/zhtw.json'
    ]
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: config.publicPath
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.json', '.scss', '.less'],
    modules: [
      // places where to search for required modules
      config.srcPath,
      _.cwd('node_modules'),
      _.cwd('./')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        loaders: [
          { loader: 'cache-loader' },
          {
            loader: 'awesome-typescript-loader'
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            query: {
              hash: 'sha512',
              digest: 'hex',
              name: '[path][name].[ext]?[hash:6]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: config.imageCompressionOptions
          }
        ]
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BUILD_GH_PAGES': JSON.stringify(!!process.env.BUILD_GH_PAGES)
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: config.title,
      template: path.resolve(__dirname, '../common/index.html'),
      filename: _.outputIndexPath
    }),
    new AutoDllPlugin({
      context: _.cwd('./'),
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor,
        translations: [
          './common/vendor/ledger-eth.js',
          './common/vendor/ledger3.js',
          './common/vendor/trezor-connect.js',
          './common/vendor/u2f-api.js',
          './common/translations/lang/de.json',
          './common/translations/lang/el.json',
          './common/translations/lang/en.json',
          './common/translations/lang/es.json',
          './common/translations/lang/fi.json',
          './common/translations/lang/fr.json',
          './common/translations/lang/ht.json',
          './common/translations/lang/hu.json',
          './common/translations/lang/id.json',
          './common/translations/lang/it.json',
          './common/translations/lang/ja.json',
          './common/translations/lang/nl.json',
          './common/translations/lang/no.json',
          './common/translations/lang/pl.json',
          './common/translations/lang/pt.json',
          './common/translations/lang/ru.json',
          './common/translations/lang/ko.json',
          './common/translations/lang/tr.json',
          './common/translations/lang/vi.json',
          './common/translations/lang/zhcn.json',
          './common/translations/lang/zhtw.json'
        ]
      }
    }),
    new webpack.LoaderOptionsPlugin(_.loadersOptions()),
    new CopyWebpackPlugin([
      {
        from: _.cwd('./static'),
        // to the root of dist path
        to: './'
      }
    ])
  ],
  target: _.target
};
