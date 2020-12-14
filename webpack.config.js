const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/assets/js/app.js",
    main: "./src/assets/js/main.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets/js"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "./src/assets/js")],
        loader: "babel-loader"
      }
    ]
  }
};
