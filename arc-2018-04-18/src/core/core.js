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

    this.stats = { };
    this.events = { };
    this.systems = [ ];

    this.tests =
    {
      "Math": require( './tests/math.js' )
    };

    // maths
    this.Vector3 = require( './classes/math/vector-three.js' );
    this.Euler = require( './classes/math/euler.js' );
    this.Quaternion = require( './classes/math/quaternion.js' );
    this.Transform = require( './classes/math/transform.js' );

    // systems
    this.PhysicsSystem = require( './classes/systems/physics.js' );
    this.OutputSystem = require( './classes/systems/output.js' );

    // output system objects
    this.Renderer = require( './classes/output-system/renderer.js' );
    this.View = require( './classes/output-system/view.js' );

    // objects
    this.Entity = require( './classes/objects/entity.js' );

    // elements
    this.RigidBody = require( './classes/elements/rigid-body.js' );
    this.Mesh = require( './classes/elements/mesh.js' );
    this.Sprite = require( './classes/elements/sprite.js' );

    // helpers
    this.PhysicsShape = require( './classes/helpers/physics-shape.js' );
    this.Geometry = require( './classes/helpers/geometry.js' );
    this.Material = require( './classes/helpers/material.js' );

    this.stats.ready = true;
  }

  loadSystems ( s )
  {
    if ( Array.isArray( s ) )
    {
      for ( let i of s )
      { this.systems.push( i ); }
    }
    else
    { this.systems.push( s ); }
  }

  unloadSystems ( s )
  {
    if ( Array.isArray( s ) )
    {
      for ( let i of s )
      { this.systems = this.systems.filter( c => i.uuid != c.uuid ); }
    }
    else
    { this.systems = this.systems.filter( c => s.uuid != c.uuid ); }
  }

  start ( )
  {
    for ( let s of this.systems )
    { s.start( ); }
    this.stats.running = true;
    this.step( );
  }

  stop ( )
  {
    for ( let s of this.systems )
    { s.stop( ); }
    this.stats.running = false;
  }

  step ( )
  {
    /*
    for ( let s of this.systems )
    { console.log( s.constructor.name, s.stats.dt ); }
    */

    this.emit( 'update', this.stats.dt );

    if ( this.stats.running && this.stats.ready )
    { setTimeout( ( ) => { this.step( ); }, 1000 / 60 ) }

    // this.systems.input.clearAnalog( );
  }

  on ( e, f )
  {
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }

}

module.exports = ArcCore;
