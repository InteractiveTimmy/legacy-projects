'use strict';

class ArcCore
{
  constructor ( )
  {
    this.stats =
    {
      "ready": false,
      "running": false,
      "dt": 0,
      "dtl": 0
    };

    this.events = { };

    // import private modules
    this.modules = {
      "Output": require( './systems/output.js' ),
      "Input": require( './systems/input.js' ),
      "Physics": require( './systems/physics.js' ),
    };

    // initialize systems
    this.systems = { };
    this.systems.output = new this.modules.Output( );
    this.systems.input = new this.modules.Input( { "element": this.systems.output.renderer.domElement } );
    this.systems.physics = new this.modules.Physics( );

    // declare public objects
    this.Entity = require( './classes/entity.js' );
    this.Chunk = require( './classes/chunk.js' );
    this.PhysicsChunk = require( './systems/physics/physics-chunk.js' );
    this.GraphicsChunk = require( './classes/chunk/graphics-chunk.js' );
    this.World = require( './classes/world.js' );
    this.Geometry = require( './classes/geometry.js' );
    this.Material = require( './classes/material.js' );
    this.Mesh = require( './classes/mesh.js' );
    this.View = require( './classes/View.js' );
    this.PhysicsBody = require( './classes/physics-body.js' );

    // expose math
    /*
    this.Math =
    {
      "PhysicsVector3": require( './classes/math/physics-vector-3.js' ),
      "PhysicsQuaternion": require( './classes/math/physics-quaternion.js' )
    };
    */

    this.stats.ready = true;
  }

  loadWorld ( p ) // @Core.World
  {
    this.world = p;
    this.systems.physics.children = this.world.chunks;
    this.systems.output.loadWorld( this.world );
  }

  unloadWorld ( )
  {
    this.world = null;
    this.systems.physics.children.length = 0;
    this.systems.graphics.world = null;
  }

  start ( )
  {
    this.stats.running = true;
    this.systems.physics.start( );
    this.step( );
  }

  stop ( )
  { this.stats.running = false; }

  step ( )
  {
    if ( this.stats.running && this.stats.ready )
    { window.requestAnimationFrame( ( ) => { this.step( ); } ); }
    this.stats.dt = performance.now( ) - this.stats.dtl;
    this.stats.dtl = performance.now( );

    this.emit( 'update', this.stats.dt );

    this.systems.physics.step( this.stats.dt );
    this.systems.output.update( );

    this.systems.input.clearAnalog( );
  }

  on ( e, f )
  {
    if ( typeof( f ) == 'function' ) { this.events[e] = f; }
    else { throw 'f is not a function'; }
  }

  emit ( e, p = { } )
  {
    for ( let f of Object.keys( this.events ) )
    { if ( e == f ) { this.events[ e ]( p ); } }
  }

}

module.exports = ArcCore;
