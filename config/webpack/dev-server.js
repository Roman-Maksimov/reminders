const { common, config, resolveDir } = require('./base');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCss = new ExtractTextPlugin("css/[name].css", {allChunks: true});

const jsFilenameTemplate = "js/[name].js";

module.exports = Object.assign(config, {

  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  },

  output: {
    path: resolveDir("build"),
    publicPath: "/",
    filename: jsFilenameTemplate
  },

  devtool: "#inline-source-map",

  module: {

    preLoaders: ((config.module || {}).preLoaders || []).concat([
      {
        test: /\.spec\.js$/,
        include: /(src|tests)/,
        exclude: /node_modules/,
        loader: common.babelLoader
      }
    ]),

    loaders: ((config.module || {}).loaders || []).concat([
      { test: /\.js$/,
        // TODO: consider use .babelrc instead
        loader: common.babelLoader + ",plugins[]=react-hot-loader/babel",
        include: resolveDir("src")
      },
      { test: /\.s?css$/,
        loader: extractCss.extract(common.cssModulesLoader + "!postcss!sass"),
        include: [
          resolveDir("node_modules/react-toolbox"),
          resolveDir("src/vendor/react-toolbox")
        ]
      },
      { test: /\.scss$/,
        loader: extractCss.extract('css!postcss!sass'),
        include: resolveDir("src"),
        exclude: resolveDir("src/vendor") 
      }
    ])
  },

  plugins: (config.plugins || {}).concat([
    extractCss,
    
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    new webpack.HotModuleReplacementPlugin({
        multiStep: true
    }),

    new webpack.NoErrorsPlugin(),
  ]),

  // The setup may be problematic on certain versions of Windows, Ubuntu, and Vagrant.
  // We can solve this through polling:
  watchOptions: {
    // Delay the rebuild after the first change
    aggregateTimeout: 300,
    // Poll using interval (in ms, accepts boolean too)
    poll: 1000
  },

  devServer: {
    contentBase: "build/",
    publicPath: "/",

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    // Unlike the cli flag, this doesn't set
    // HotModuleReplacementPlugin!
    hot: true,
    inline: true,

    /*proxy: {
        '/ajax/*': 'http://your.backend/'
    },*/

    stats: { colors: true }
  },
});

