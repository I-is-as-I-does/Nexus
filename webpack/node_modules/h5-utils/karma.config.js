'use strict';

var merge = require('webpack-merge');
var base = require('./webpack.config.base.js');

var webpackConfig = merge(base, {
  output: {
    path: './test',
    filename: 'tests.js',
  },
  devtool: 'inline-source-map',
});

delete webpackConfig.entry;

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai-as-promised', 'chai'],
    files: [
      'https://github.elemecdn.com/uglifyjs!YanagiEiichi/geohash.js/1.0.1/geohash.js',
      'https://github.elemecdn.com/uglifyjs!YanagiEiichi/uparams/1.3.1/uparams.js',
      'https://github.elemecdn.com/uglifyjs!eleme/hybridAPI/0.3.0/hybrid-api.js',
      './h5-utils.js',
      './test/index.js',
    ],
    preprocessors: {
      './test/index.js': ['webpack', 'sourcemap'],
    },
    browsers: ['Chrome'],
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    colors: true,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    proxies: {
      '/v1/cities': {
        'target': 'http://mainsite-restapi.ele.me/v1/cities',
        'changeOrigin': true
      },
    },
  });
};
