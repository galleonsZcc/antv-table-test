const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'));

    config.devServer.set('open', true);
    config.devServer.set('openPage', '?mockType=local');
  },
  css: {
    loaderOptions: {
      less: { javascriptEnabled: true },
    },
  },
};
