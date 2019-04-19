'use strict';

module.exports = ( self ) =>
{

  self.modules =
  {
    "Ammo": require( './ammo.js' ),
    "Handler": require( './handler.js' )
  };

  self.modules.Ammo( ).then( ( r ) => {
    self.AMMO = r;
    self.handler = new self.modules.Handler( );

    self.onmessage = ( e ) => { if ( e.isTrusted ) { self.handler.handleMessage( e.data ); } };

    // self.postMessage( { "hello": "world" } );
  } );
};
