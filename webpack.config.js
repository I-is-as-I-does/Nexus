var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './dist');
var DEV_BUILD_DIR = path.resolve(__dirname, './public');
var APP_DIR = path.resolve(__dirname, './src');

const dirs = {
  DEV_BUILD_DIR: DEV_BUILD_DIR,
  BUILD_DIR: BUILD_DIR,
  APP_DIR: APP_DIR
}

const splitChunks = {
    chunks: "all",
    cacheGroups: {
      NxBrowserLib: {
        test: /[\\/]valva|jack-js|nexus-core[\\/]/,
        name: "NxBrowser-LibChunk",
        chunks: "all",
      },
      NxBrowserEdit: {
        test: /[\\/]editor[\\/]/,
        name: "NxBrowser-EditChunk",
        chunks: "all",
      },
      NxBrowser: {
        test: /([\\/](viewer|browser)[\\/])/,
        name: "NxBrowser",
        chunks: "all",
      },
    },
  }
  
module.exports = (env, argv) => {
    console.log(argv.mode)
    if (argv.mode === 'development' || argv.mode === 'production') {
      return require('./config/' + argv.mode + '.js')(dirs, splitChunks);
    } else {
      console.log("Wrong webpack build parameter. Possible choices: 'dev' or 'prod'.")
    }
  }