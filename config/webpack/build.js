const { env, common, config, resolveDir } = require('./base');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackStableModuleIdAndHash = require("webpack-stable-module-id-and-hash");

function mergeEntryConfigs(app, extracted) {
  return Object.assign(app, extracted.reduce(function(entries, chunk) {
    entries[chunk.name] = chunk.modules;
    return entries;
  }, {}));
}

const extractCss = new ExtractTextPlugin('css/[name]-[contenthash].css');

const jsFilenameTemplate = "js/[name]-[chunkhash].min.js";

// Order is matter
// webpack does not evaluate correct dependencies order
// in CommonsChunkPlugin
//  * less coupled chunks should be listed before those which more coupled
//  * first chunk become entry (appears in CommonsChunkPlugin config last)
// https://github.com/webpack/webpack/issues/1016
const extractedChunks = [
  { name: 'babel',  modules: ['babel-polyfill'] },
  { name: 'vendor', modules: ['./src/vendor/index.js'] }
];

module.exports = Object.assign(config, {

  entry: mergeEntryConfigs({
    app: './src/main.js'
  }, extractedChunks),

  output: {
    path: resolveDir("build"),
    publicPath: env.CDN_URL + "/",
    filename: jsFilenameTemplate
  },

  devtool: "source-map",

  module: {
    loaders: ((config.module || {}).loaders || []).concat([
      { test: /\.js$/,
        loader: common.babelLoader,
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

    new WebpackStableModuleIdAndHash(),
    new webpack.optimize.CommonsChunkPlugin({ 
      names: extractedChunks.map(function(chunk) { return chunk.name }).reverse(),
      filename: jsFilenameTemplate,
    }),

    new webpack.optimize.UglifyJsPlugin({
      minify: true,
      comments: false,
      compress: {
        dead_code: true,
        conditionals: true,
        loops: true,
        unused: true,
        evaluate: true,  
        booleans: true,
        sequences: true,
   
        warnings: false,
        // drop_console: true,
      }
    }),
  ]) 
});
