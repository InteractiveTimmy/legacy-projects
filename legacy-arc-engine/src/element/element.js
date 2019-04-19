'use strict'

module.exports = ( t, p = { } ) => {
  try {
    let o = require( `./${t}.js` )( p );
    o.name = ( p.hasOwnProperty( 'name' ) ? p.name : `${t.toUpperCase( )}-${o.uuid}` );
    return o;
  }
  catch ( e ) { throw `element type '${t}' doesn't exist: ${e}`; }
}
