'use strict';

class PhysicsSystem
{
  constructor ( )
  {
    this.stats = { };
    // set up instance of physics chunk
    let collisionConfiguration = new AMMO.btDefaultCollisionConfiguration( );
    let dispatcher = new AMMO.btCollisionDispatcher( collisionConfiguration );
    let overlappingPairCache = new AMMO.btDbvtBroadphase( );
    let solver = new AMMO.btSequentialImpulseConstraintSolver( );

    // initialize AMMO world
    this.space = new AMMO.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

    this.children = [ ]; // holds complete list of children

    this.stats.ready = true;
  }

  setGravity ( g ) // @ArcCore.Vector3
  { this.space.setGravity( g ); return this; }

  loadPhysicsElements ( e = [ ] )
  {

  }

  start ( )
  { this.stats.running = true; this.step( ); }

  stop ( )
  { this.stats.running = false; }

  step ( )
  {
    this.stats.dt = ( this.stats.hasOwnProperty( 'dtl' ) ? performance.now( ) - this.stats.dtl : 0 );
    this.stats.dtl = performance.now( );

    this.space.stepSimulation( this.stats.dt / 1000, 10 );

    if ( this.stats.running && this.stats.ready )
    { setTimeout( ( ) => { this.step( ); }, 0 ) }

    console.log( this.stats.dt );
  }
}

module.exports = PhysicsSystem;
