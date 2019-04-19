module.exports = {
    entry: "./js/app.js",
    output: {
        path: __dirname,
        filename: "../js/arc-engine.js"
    },
    devtool: "inline-source-map",
    node: {
      console: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
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
