const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const ESLintPlugin = require("eslint-webpack-plugin");

const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    devMiddleware: {
      index: false,
      mimeTypes: { "text/html": ["phtml"] },
      serverSideRender: true,
      writeToDisk: true,
    },
    proxy: {
      context: () => true,
      target: "http://localhost:8083",
    },
  },
  output: {
    filename: "engine.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // new HTMLInlineCSSWebpackPlugin({
    //     //
    // }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html",
    }),
    new HtmlWebpackInlineSVGPlugin({
      // todo: move it external file somehow?
      svgoConfig: [
        {
          cleanupNumericValues: {
            floatPrecision: 2,
          },
        },
        {
          convertPathData: {
            floatPrecision: 2,
          },
        },
        {
          transformsWithOnePath: {
            floatPrecision: 2,
          },
        },
        {
          convertTransform: {
            floatPrecision: 2,
          },
        },
        {
          cleanupListOfValues: {
            floatPrecision: 2,
          },
        },
        {
          collapseGroups: true,
        },
        {
          removeEditorsNSData: true,
        },
        {
          cleanupAttrs: true,
        },
        {
          removeEmptyContainers: true,
        },
        {
          removeXMLProcInst: true,
        },
        {
          mergePaths: true,
        },
        {
          removeUnusedNS: true,
        },
      ],
    }),
    new ESLintPlugin({}),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        include: [path.resolve(__dirname)],
      },
      {
        test: /\.svg/,
        type: "asset/resource",
        include: [
          path.resolve(__dirname, "images/sliced/backgrounds"),
          path.resolve(__dirname, "images/sliced/controls"),
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "osc-js": path.resolve(__dirname, "node_modules/osc/dist/osc-browser.js"),
      sassy: path.resolve(__dirname, "style.sass"),
    },
    fallback: {
      zlib: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      url: false,
      path: false,
      os: false,
      fs: false,
    },
  },
};
