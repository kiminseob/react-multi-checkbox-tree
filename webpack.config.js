const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const port = process.env.PORT || 3002;

module.exports = {
  // 개발환경
  mode: 'development',

  // 애플리케이션 시작 경로
  entry: '/src/index.js',

  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts|scss)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],

  resolve: {
    extensions: ['.scss', '.js', '.jsx', '.css', '.tsx', '.ts'],
    alias: {
      ConfigCheckboxTree: path.resolve(__dirname, 'src/ConfigCheckboxTree'),
      data: path.resolve(__dirname, 'src/data'),
    },
  },

  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  // 개발 서버 설정
  devServer: {
    host: 'localhost',
    port: port,
    open: true, // open page when start
    historyApiFallback: true,
  },
};
