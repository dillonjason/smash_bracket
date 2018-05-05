const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve('src', 'index.ts'),
  resolve: {
    extensions: [".js", ".json", ".jsx", ".scss", ".ts", ".tsx"]
  },
  module: {
    loaders: [
        { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}