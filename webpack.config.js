const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Convert the environment variables to a format DefinePlugin expects
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    popup: './src/extension/popup/PopupApp.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Rule for JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Rule for CSS files
        use: ['style-loader', 'css-loader'], // Use both style-loader and css-loader
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot)$/i, // Rule for image and font files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Keep original file name and extension
              outputPath: 'assets', // Output to /build/assets
            },
          },
        ],
      },
      {
        test: /\.svg$/, // Rule specifically for SVG files
        use: [
          {
            loader: '@svgr/webpack', // Use SVGR for importing SVGs as React components
            options: {
              icon: true, // Optional: configure SVGR (e.g., for icon optimization)
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys), // Add DefinePlugin for environment variables
  ],
};
