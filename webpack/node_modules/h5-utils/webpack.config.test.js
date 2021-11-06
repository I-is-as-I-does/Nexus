var merge = require('webpack-merge');
var base = require('./webpack.config.base.js');

module.exports = merge(base, {
  entry: './test/index.js',
  output: {
    path: './test',
    filename: 'tests.js',
  },
});
