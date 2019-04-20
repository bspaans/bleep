const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bleep.js',
    path: path.resolve('./'),
  }
};

