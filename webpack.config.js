const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require("path");

module.exports = {
  entry: "./src/App.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.sass$|\.scss$/,
        use: [
          "css-loader", // css compilation is required for extract-loader
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: "src/html/index.ejs",
      inject: true,
      filename: "index.html",
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
    })
  ],
  devServer: {
    compress: true,
    open: true,
    contentBase: "./assets",
    publicPath: "/",
    port: 9300,
    historyApiFallback: true,
  },
};
