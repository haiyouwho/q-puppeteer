const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: {
    'puppeteer': 'commonjs2 puppeteer',
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname + 'src'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disbled' // 'disbled server' 
    }),
  ],
  stats: 'errors-only',
  performance: {
    hints: false
  }
}
