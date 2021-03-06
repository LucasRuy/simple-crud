const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[contenthash].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9999,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      actions: path.resolve(__dirname, 'src/scripts/actions/'),
      components: path.resolve(__dirname, 'src/scripts/components/'),
      constants: path.resolve(__dirname, 'src/scripts/constants/'),
      pages: path.resolve(__dirname, 'src/scripts/pages/'),
      service: path.resolve(__dirname, 'src/scripts/service/'),
      sagas: path.resolve(__dirname, 'src/scripts/sagas/'),
      utils: path.resolve(__dirname, 'src/scripts/utils/'),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/assets/', to: 'assets' }],
    }),
    new HtmlWebpackPlugin({
      title: 'CodeLeap Network',
      filename: 'index.html',
      favicon: './src/assets/images/favicon.png',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    }),
    new StylelintPlugin({
      files: '**/*.css',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheet/[name].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}

module.exports = config
