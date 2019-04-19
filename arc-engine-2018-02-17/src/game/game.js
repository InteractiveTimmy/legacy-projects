'use strict';

class ARC
{
  constructor ( p ) {
    this.engine = require( '../engine/engine.js' )( {
      "systems":[
        { "name":"graphics", "config":{ "dynamic":true } },
        { "name":"template", "config":{ } }
      ]
    } );

    this.engine.init( ).then( ( r ) => {
      this.engine.start( );
      this.engine.on( 'update', ( dt ) => { /* console.log( dt ); */ } );
    } ).catch( ( e ) => {

    } );
  }
}

module.exports = ( p ) => { return new ARC( p ); }
