//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  //改為'production'則會自動壓縮檔案
  entry: './index.js',
  //bundle的進入點
  output: {
    path: path.resolve(__dirname, 'dist'), //打包後的檔案位置，以此為例會放在名為dist的資料夾
    filename: '[name].[hash].js' //打包後的檔案名稱
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'images'),
    },
  },
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[name].[ext]',
            },
          },
          // 配置 image-webpack-loader (第一步)
          {
            loader: 'image-webpack-loader',
            options: {
              // 只在 production 環境啟用壓縮 (第二步)
              disable: process.env.NODE_ENV === 'production' ? false : true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      //使用src裡面的index.html作為模板
      filename: 'index.html',
      //處理完後的檔案名稱
    })
  ],


};
