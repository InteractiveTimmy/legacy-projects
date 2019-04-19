var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
    entry: {
      app:"./src/entry.js"
    },
    output: {
        path: __dirname,
        filename: "./build/ae.js"
    },
    resolve: {
      extensions: [ '.js' ],
      alias: {
      'THREE': path.resolve(__dirname, './src/external/three.module.js'),
      'UTILS': path.resolve(__dirname, './src/utilities/utilities.js')
      }
    },
    plugins: [
      new webpack.ProvidePlugin( { 'THREE': 'THREE' } ),
      new webpack.ProvidePlugin( { 'UTILS': 'UTILS' } )
    ],
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
