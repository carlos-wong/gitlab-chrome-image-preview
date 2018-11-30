const path = require('path');

module.exports = {
  entry: './contentScript.js',
  output: {
    filename: 'main.js',
    path: path.resolve('./', 'dist')
  }
};
