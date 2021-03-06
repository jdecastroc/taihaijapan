const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const Visualizer = require('webpack-visualizer-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
require('object-assign');
const settings = require('./settings');

const postCssPlugins = () => [autoprefixer('>1%', 'not ie < 9')];

module.exports = (env) => ({
  entry: settings.entries,

  // Output file config
  output: {
    // Output filename/bundle
    filename: settings.options.filename,
    // Path to the output filename
    path: path.join(settings.paths.build),
    // Required for HMR to know where to load the hot update chunks
    publicPath: settings.paths.publicPath,
  },

  // less verbose
  stats: {
    children: false,
  },

  plugins: [
    // copy static frontend to the backend public folder
    new CopyWebpackPlugin([{
      context: settings.paths.srcHtml,
      from: { glob: '**/*', dot: true },
      to: settings.paths.build,
    }]),

    // css
    new ExtractTextPlugin(path.join(settings.paths.buildCss, settings.options.cssName)),

    // Allows to see building stats (radial one)
    new Visualizer({
      filename: path.relative(settings.paths.build, path.join(settings.paths.buildInfo, 'visualizer.html')),
    }),
    // Allows to see building stats (squared one)
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.join(settings.paths.buildInfo, 'analyzer.html'),
    }),
  ],

  module: {
    rules: [
      // styles
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: env === 'prod',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: postCssPlugins,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.(less)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: env === 'prod',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: postCssPlugins,
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        }),
      },
      // linting
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        include: settings.paths.src,
        use: 'eslint-loader',
      },
      // transpiling
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [
          settings.paths.src,
        ],
        use: [
          { loader: 'babel-loader', options: { cacheDirectory: true } },
        ],
      },
      // fonts
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: '[hash].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      // images
      {
        test: /\.(png|jpg|gif|webp)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: '[hash].[ext]',
            outputPath: 'img/',
          },
        }],
      },
    ],
  },
});
