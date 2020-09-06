const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    background: path.join(__dirname, "src/background.ts"),
    panel: path.join(__dirname, "src/panel/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};