const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cssOutputPath = isProduction ? '/styles/app.[hash].css' : '/styles/app.css';
const jsOutputPath = isProduction ? '/scripts/app.[hash].js' : '/scripts/app.js';
const ExtractSASS = new ExtractTextPlugin(cssOutputPath);
const port = isProduction ? process.env.PORT || 17000 : process.env.PORT || 3000;

// ------------------------------------------
// Base
// ------------------------------------------
const webpackConfig = {
  resolve: {
    root: Path.resolve(__dirname),
    alias: {
      app: 'src',
      actions: 'src/actions',
      selectors: 'src/selectors',
    },
    extensions: ['', '.js'],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          process.env.NODE_ENV != null ? process.env.NODE_ENV : 'development'
        ),
      },
    }),
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, './public/index.html'),
    }),
    new CopyWebpackPlugin([{ from: 'static/assets', to: './' }]),
  ],
  module: {
    loaders: [{
      test: /.js?$/,
      include: Path.join(__dirname, './src'),
      loader: 'babel',
    }],
  },
};

// ------------------------------------------
// Entry points
// ------------------------------------------
webpackConfig.entry = !isProduction
  ? ['webpack/hot/dev-server',
     Path.join(__dirname, './public/index')]
  : [Path.join(__dirname, './public/index')];

// ------------------------------------------
// Bundle output
// ------------------------------------------
webpackConfig.output = {
  path: Path.join(__dirname, './dist'),
  filename: jsOutputPath,
};

// ------------------------------------------
// Devtool
// ------------------------------------------
webpackConfig.devtool = isProduction ? 'source-map' : 'cheap-eval-source-map';


// ------------------------------------------
// Module
// ------------------------------------------
isProduction
  ? webpackConfig.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: ExtractSASS.extract(['css', 'sass']),
  })
  : webpackConfig.module.loaders.push({
    test: /\.(css|scss)$/,
    loaders: ['style', 'css', 'sass'],
  }
    );
webpackConfig.module.loaders.push(
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff&name=/[hash].[ext]',
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff&name=/[hash].[ext]',
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream&name=/[hash].[ext]',
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file?name=/[hash].[ext]',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml',
  }
     );
// Images
// ------------------------------------
webpackConfig.module.loaders.push(
  {
    test: /\.(?:png|jpg|svg)$/,
    loader: 'url?name=/[name].[ext]',
    query: {
      limit: 20000,
    },
  }
);

// ------------------------------------------
// Plugins
// ------------------------------------------
isProduction
  ? webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      ExtractSASS
    )
  : webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

// ------------------------------------------
// Development server
// ------------------------------------------
if (!isProduction) {
  webpackConfig.devServer = {
    contentBase: Path.join(__dirname, './'),
    hot: true,
    port,
    inline: true,
    progress: true,
    historyApiFallback: true,
  };
}

module.exports = webpackConfig;
