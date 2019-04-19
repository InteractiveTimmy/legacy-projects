'use strict';

class AE
{
  constructor ( ) //
  {
    this.stats =
    {
      "state":"idle",
      "rate":1,
      "tps":
      {
        "dt":0
      }
    };

    this.spaces = { };
  }

  init ( p ) // { systems:[ { name:"", config:{...} } ] }
  { return new Promise( ( resolve, reject ) => {
    this.config = {
      "default":require( './config-default.js' ),
      "custom":p
    };

    this.entity = require( './entity/entity.js' );
    this.space = require( './space/space.js' );

    this.systems = require( './systems/systems.js' )( );
    this.systems.init( this.config.custom.systems || this.config.default.systems ).then( ( r ) => {
      resolve( 'initialized', this );
    } );
  } ); }

  start ( )
  {
    this.stats.state = 'running';
    this.step( );
  }

  stop ( )
  {
    this.stats.state = 'idle';
  }

  load ( p ) // space:{ ... }, loads spaces
  {
    this.spaces[p.name] = p;
  }

  unload ( p ) // { name:"" }, unloads spaces
  { this.spaces[p.name].unload( ); delete this.spaces[p.name]; }

  step ( )
  { // TODO: this needs to be controlled based on frame rate
    if ( this.stats.state == 'running' )
    {
      requestAnimationFrame( ( ) => {
        this.step( );
      } );
      this.systems.update( );
      // console.log( this.stats.rate.delay );
    }
  }
}

module.exports = ( p ) => { return new AE( p ); }
