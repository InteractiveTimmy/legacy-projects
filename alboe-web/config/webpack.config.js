const PATH = require( 'path' );
const HTMLWPP = require( 'html-webpack-plugin' );

module.exports = {
  "entry": "./src/index.js",
  "output": {
    "path": PATH.join( __dirname, '/../build' ),
    "filename": "index.js"
  },
  "module": {
    "rules": [
      {
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader"
        }
      },
      {
        "test": /\.scss$/,
        "exclude": /node_modules/,
        "use": [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  "plugins": [
    new HTMLWPP( {
      "template": "./src/index.html"
    } )
  ]
}
