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
    popup: './src/extension/popup/PopupApp.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Added TypeScript support
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-react',
              '@babel/preset-typescript' // Added TypeScript preset
            ],
          },
        },
      },
      {
        test: /\.jsx?$/, // Keep for existing JSX files during transition
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Added postcss-loader
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // TypeScript extensions
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/shared/components'),
      '@/hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@/utils': path.resolve(__dirname, 'src/shared/utils'),
      '@/types': path.resolve(__dirname, 'src/shared/types'),
    },
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ],
};
