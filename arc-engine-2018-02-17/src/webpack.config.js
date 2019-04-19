let webpack = require( 'webpack' );
let path = require( 'path' );

module.exports = {
    entry: {
      app:"./app.js"
    },
    output: {
        path: __dirname,
        filename: "./build/[name].js"
    },
    devServer:{
      port:8080,
      historyApiFallback: {
        index:"./index.html"
      }
    },
    resolve: {
      extensions: [ '.js' ],
      alias: {
        'UTILS': path.resolve( __dirname, './engine/utilities/utilities.js' ),
        'THREE': path.resolve( __dirname, './external/three.module.js' )
      }
    },
    plugins: [
      new webpack.ProvidePlugin( {
        'UTILS':'UTILS',
        'THREE':'THREE'
      } )
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
