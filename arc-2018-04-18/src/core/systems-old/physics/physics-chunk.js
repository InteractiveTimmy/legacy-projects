'use strict';

class PhysicsChunk
{
  constructor ( p = { } ) // { gravity: [x,y,z] }
  {

    this.stats =
    {
      "isActive": false
    };

    this.uuid = UUID( );

    // set up instance of physics chunk
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration( );
    let dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    let overlappingPairCache = new Ammo.btDbvtBroadphase( );
    let solver = new Ammo.btSequentialImpulseConstraintSolver( );

    // initialize Ammo world
    this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

    // generate gravity
    if ( p.hasOwnProperty( 'gravity' ) )
    { this.dynamicsWorld.setGravity( new Ammo.btVector3( ...p.gravity ) ); }

    this.entities = { }; // holds all entities
    this.statics = [ ]; // holds static entities
    this.dynamics = [ ]; // holds dynamic entities
  }

  loadPhysicsElement ( p ) // @Ammo.btRigidBody
  {
    p.physicsChunk = this;
    this.entities[p.uuid] = p;
    if ( p.isDynamic )
    { this.dynamics.push( p ); }
    else
    { this.statics.push( p ); }
  }

  step ( dt )
  { this.dynamicsWorld.stepSimulation( dt / 1000, 10 ); }
}

module.exports = PhysicsChunk;
