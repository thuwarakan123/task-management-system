const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    publicPath: "http://localhost:3002/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Ensure Webpack resolves TSX
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match TSX/TS files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 3002, // Ensure micro-frontend runs on port 3002
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "tasks",
      filename: "remoteEntry.js",
      exposes: {
        "./TaskManagement": "./src/components/TaskManagement", // Ensure this matches the correct path
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
};



