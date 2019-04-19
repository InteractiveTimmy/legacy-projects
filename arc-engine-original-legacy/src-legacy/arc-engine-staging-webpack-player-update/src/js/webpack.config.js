module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: [ "worker-Loader" ]
        }
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader"
          ]
        }
      ]
    }
};
