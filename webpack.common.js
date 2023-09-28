const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
  //  app: './src/index.js'
    app: './src/potatoMatch.js'
  },
  devtool: "eval-source-map",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    compress: true,
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.ico',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'images'),
          to: path.resolve(__dirname, 'build/images'),
          noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, 'music'),
          to: path.resolve(__dirname, 'build/music'),
          noErrorOnMissing: true
        }
      ],
    })
  ],
};
