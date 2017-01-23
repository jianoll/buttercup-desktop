const { resolve } = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

module.exports = {
  ...baseConfig,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/only-dev-server',
    resolve(__dirname, '../src/renderer/index')
  ],

  devServer: {
    hot: true,
    contentBase: baseConfig.output.path,
    publicPath: '/app',
    port: 3000,
    stats: 'minimal'
  },

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/app/'
  },

  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,

      {
        test: /\.global\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader'
        ]
      },

      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  externals: [
    ...baseConfig.externals
  ],

  target: 'electron-renderer'
};
