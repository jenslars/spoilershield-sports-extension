const path = require('path');

module.exports = {
  entry: './src/pages/popup.jsx', // Your React entry point
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'popup.bundle.js', // The bundled output file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Support .js and .jsx file extensions
  },
};
