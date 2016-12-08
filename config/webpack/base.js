const fs = require("fs");
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

if(fs.existsSync(".env")){
    require('dotenv').config();
}

// Environment variables which should be exported outside this module
const env = {
  projectRoot: path.resolve(__dirname, "..", ".."),
  NODE_ENV:    process.env.NODE_ENV || "development",
  CDN_URL:     process.env.CDN_URL || ""
};

function resolveDir(dirPath) {
  return path.join.apply(path, [ env.projectRoot ].concat(dirPath.split('/')));
}

console.log('\n> Building with NODE_ENV:', env.NODE_ENV);
console.log('> Project root:', env.projectRoot);

const common = {
  // TODO: consider to use .babelrc instead
  babelLoader: "babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy",
  cssModulesLoader: "css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
};

const imgFilenameTemplate = 'img/[path][name]-[hash].[ext]';

// This is experemental - duplicated files (the same md5) wouldn't be duplicated on CDN
// nice to add [size], but no option in default webpack
// const imgFilenameTemplate = 'img/[hash].[ext]';

const config = {

  resolve: {
    root: env.projectRoot,
    extensions: ["", ".js", ".css", ".scss", ".html"]
  },

    sassLoader: {
        data: "" +
        "$NODE_ENV: '" + env.NODE_ENV + "'; " +
        "$CDN_URL: '" + env.CDN_URL + "'; " +
        "@import 'src/vendor/react-toolbox/theme'; "
    },

  postcss: [ autoprefixer({ browsers: ['last 3 versions'] }) ],  

  module: {
    loaders: [
      { test: /.html?$/,
        loaders: ['html-loader'],
        exclude: /node_modules/
      },

      { test: /\.png$/, 
        loader: 'file?context=resources/img&name=' + imgFilenameTemplate,
        include: resolveDir("resources/img")
      },

      { test: /\.png$/, 
        loader: 'file?context=src&name=' + imgFilenameTemplate,
        include: resolveDir("src/components")
      },

    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
      CDN_URL: JSON.stringify(env.CDN_URL),
      BACKEND_URL: JSON.stringify(process.env.API_URL || "http://localhost:8080"),
      API_VERSION: JSON.stringify('v1')
    }),

    // don't include locales from `moment` package
    // http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      cdnUrl: env.CDN_URL,
    }),

    // TODO: add versions/hashes to assets which is copied here
    new CopyWebpackPlugin([
      {
        // copy normalize.css (won't compile it into the bundle)
        from: 'node_modules/normalize.css/normalize.css',
        to: 'css'
      },
      {
        // copy MDL css file
        from: 'node_modules/material-design-lite/material.min.css',
        to: 'css'
      },
      {
        // copy MDL css map file
        from: 'node_modules/material-design-lite/material.min.css.map',
        to: 'css'
      },
      {
        // copy MDL js file
        from: 'node_modules/material-design-lite/material.min.js',
        to: 'js'
      },
      {
        // copy MDL js Map file
        from: 'node_modules/material-design-lite/material.min.js.map',
        to: 'js'
      },
      {
        from: 'node_modules/mdi/fonts',
        to: 'fonts'
      },
      {
        from: 'node_modules/mdi/css/materialdesignicons.min.css',
        to: 'css'
      },
      {
        // copy fonts
        from: 'src/styles/fonts',
        to: 'fonts'
      },
      {
        // copy all from /resources path
        context: 'resources',
        from: '**/*',
        to: '.',
        ignore: [
           // don't copy PSD files
          'img/**/*.psd'
        ]
      }
    ])
  ]
};

module.exports = {
  env,
  common,
  config,
  resolveDir
};
