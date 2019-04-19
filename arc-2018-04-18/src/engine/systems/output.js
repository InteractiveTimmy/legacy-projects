'use strict';

class OutputSystem
{
  constructor ( p = { } ) // { element:@element }
  {
    this.stats = { };
    this.world;

    this.Renderer = require( './output/renderer.js' );

    this.renderer = new this.Renderer( );
  }

  update ( )
  {
    if ( this.hasOwnProperty( 'world' ) )
    { this.renderer.update( { "scene": this.world } ); }
  }

  loadWorld ( p ) // @Engine.World
  { this.world = p; }

  loadView ( p ) // @ae.View
  {
    if ( p.constructor.name == 'View' )
    { this.renderer.load( p ); }
  }

  unload ( )
  {

  }
}

module.exports = OutputSystem;
