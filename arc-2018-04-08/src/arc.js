'use strict';
// NOTE add this for production
// global.THREE = require( 'three' );

class Arc
{
  constructor ( )
  {
    // import pack libraries
    this.packs =
    {
      "Core": require( './core/core.js' ),
      "Conflict": require( './conflict/conflict.js' ),
      "Impact": require( './impact/impact.js' )
    };

    // declare packs
    this.core = new this.packs.Core( { } );
    this.conflict = new this.packs.Conflict( { "core": this.core } );
    // this.impact = new this.packs.Impact( { "core": this.core } );

    console.log( this );
  }
}

Ammo( ).then( ( r ) => {
  global.Ammo = r;
  let game = new Arc( );
} );
