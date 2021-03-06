module.exports = {
    entry: "./js/app.js",
    output: {
        path: __dirname,
        filename: "./build/arc-engine.js"
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.exec\.js$/,
          use: [ 'script-loader' ]
        },
        {
          test: /\.worker\.js$/,
          use: [ "worker-Loader" ]
        },
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
