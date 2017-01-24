/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/index.html`,
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js',
  },
  module: {
    preLoaders: [{
      test: /\.js$|\.jsx$/,
      exclude: [
        /node_modules/
      ],
      loader: 'eslint'
    }],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },

  devServer: {
    inline: true,
    stats: 'errors-only',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [new ExtractTextPlugin('css/[name].css'), HTMLWebpackPluginConfig]
};
