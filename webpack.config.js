const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./index.ts",

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // Control how source maps are generated
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    hot: true,
    compress: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    // HTML
    new HtmlWebpackPlugin(),
    // Очистка dist
    new CleanWebpackPlugin(),
    // Открытие dev-server
    new webpack.HotModuleReplacementPlugin(),
  ],
};
