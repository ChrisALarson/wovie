const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.jsx$/, exclude: /node_modules/, use: 'babel-loader' }],
  },
  resolve: {
    extensions: ['*', '.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
};
