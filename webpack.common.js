const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather App",
      template: "./public/index.html",
      filename: "./index.html",
      inject: "head",
    }),
    new WorkboxPlugin.GenerateSW(),
    new CopyPlugin({
      patterns: [
        { from: "public/webmanifest.json", to: "." },
        { from: "public/icons/", to: "./icons" }
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].bundle.js",
    clean: true,
  },
};
