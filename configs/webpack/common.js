// shared config (dev and prod)
const { resolve } = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const SOURCE_PATH = resolve(__dirname, "../../src");
module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  context: SOURCE_PATH,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "awesome-typescript-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({ template: "index.html.ejs" }),
    new CopyPlugin([{ from: "assets", to: "assets" }], {
      context: SOURCE_PATH,
    }),
    new Dotenv(),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
};
