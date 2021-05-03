const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

const fs = require("fs");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
// npm i -D cross-nev

module.exports = {
  entry: "./index.ts",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    // прописываем раширения , чтобы не указывать их в import
    extensions: [".tsx", ".ts", ".js", "json"],
    // пути к папкам для import
    alias: {
      // "@components": path.resolve(__dirname, "src/components"),
    },
  },

  // Control how source maps are generated

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    hot: isDev,
    compress: true,
    port: 8080,
  },

  context: path.resolve(__dirname, "src"),

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
        test: /\.txt|html$/,
        use: "raw-loader",
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    // HTML
    new HtmlWebpackPlugin({
      minify: {
        filename: "index.html", // output file

        collapseWhitespace: isProd,
      },
    }),
    // Очистка dist
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
