'use strict';

class AE
{
  constructor ( )
  {
    this.events = { };
    this.stats = {
      "states":{ },
      "rates":{ "dt":0, "pt":0 },
      "log":UTILS.log
    };

    this.Entity = require( './entity/entity.js' );
    this.Asset = require( './asset/asset.js' );

    this.systems = {
      "graphics":require( './systems/graphics/graphics.js')( )
    }

    console.log( this );

  }

  start ( )
  {
    this.stats.states.running = true;
    UTILS.log.write( [ `ae => stats => states => running: true`, this ], 'stats' );
    this.update( );
  }

  stop ( )
  {
    this.stats.states.running = false;
  }

  update ( )
  {
    this.stats.rates.pt = performance.now( );

    this.stats.rates.dt = performance.now( ) - this.stats.rates.pt;
    this.emit( 'update', this.stats.rates.dt );

    this.systems.graphics.box.rotation.x += 0.01;
    this.systems.graphics.box.rotation.y += 0.01;

    this.systems.graphics.renderer.update( { "view":this.systems.graphics.view.get( ), "scene":this.systems.graphics.scene } );

    if ( this.stats.states.running )
    { requestAnimationFrame( ( ) => { this.update( ); } ); }
  }

  on ( e, f )
  {
    if ( typeof( f ) == 'function' ) { this.events[e] = f; }
    else { throw 'f is not a function'; }
  }

  emit ( e, p )
  {
    for ( let f in this.events )
    { if ( e == f ) { this.events[ e ]( p ); } }
  }
}

module.exports = ( ) => { return new AE( ); }
