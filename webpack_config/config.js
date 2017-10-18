'use strict';
const path = require('path');
const vendor = require('./vendor');
vendor.push(
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
);
module.exports = {
  port: process.env.HTTPS ? 3443 : 3000,
  title: 'MEW',
  publicPath: process.env.BUILD_GH_PAGES ? '/react-semantic.ui-starter/' : '/',
  srcPath: path.join(__dirname, './../common'),
  // add these dependencies to a standalone vendor bundle
  vendor: vendor,
  // Settings for webpack-image-loader image compression
  imageCompressionOptions: {
    optipng: {
      optimizationLevel: 4
    },
    gifsicle: {
      interlaced: false
    },
    mozjpeg: {
      quality: 80
    },
    svgo: {
      plugins: [{ removeViewBox: true }, { removeEmptyAttrs: false }, { sortAttrs: true }]
    }
  }
};
