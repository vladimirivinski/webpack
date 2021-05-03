const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
// npm i -D cross-env

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  entry: "./index.ts",

  output: {
    filename: filename("js"),
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
  devtool: isDev ? "source-map" : "inline-source-map",

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    hot: isDev,
    compress: true,
    port: 8080,
  },

  context: path.resolve(__dirname, "src"),

  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.html$/,
      //   use: ["html-loader"],
      // },
      {
        // to auto refresh index.html and other html
        test: /\.html$/,
        loader: "raw-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.s[ac]ss|css$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV === isDev ? "style-loader" : MiniCssExtractPlugin.loader,
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
        filename: filename("html"), // output file
        collapseWhitespace: isProd,
      },
    }),
    // Очистка dist
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],
};
