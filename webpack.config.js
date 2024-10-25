const path = require('path');

module.exports = {
  entry: {
    popup: './src/pages/popup.jsx',
    testscript: './src/pages/testscript.js' // Fixed the path (added the correct dot-slash)
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js', // The bundled output file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Rule for JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,  // Rule for image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Keep original name and extension
              outputPath: 'assets/icons', // Output path for images
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Support .js and .jsx file extensions
  },
};
