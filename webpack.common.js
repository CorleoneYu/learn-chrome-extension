const path = require('path');

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src/popup/index.tsx'),
    background: path.join(__dirname, 'src/background.ts'),
    panel: path.join(__dirname, 'src/panel/index.tsx'),
    inject: path.join(__dirname, 'src/inject.ts'),
    contentScript: path.join(__dirname, 'src/contentScript.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
