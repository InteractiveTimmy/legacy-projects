'use strict';

class PhysicsHandler
{
  constructor ( )
  {
    this.stats =
    {
      "ready": false,
      "dt": 0,
      "stepper": 1,
      "cstep": 0
    };

    this.basicColShape = new AMMO.btSphereShape( 1 );

    this.PhysicsEntity = require( './physics-entity.js' );

    this.output = [ ];
    this.entities = { };
    this.statics = [ ];
    this.dynamics = [ ];
    this.reference = { };
    this.transform = new AMMO.btTransform( );

    // init ammo -- begin
    this.collisionConfiguration = new AMMO.btDefaultCollisionConfiguration( );
    this.dispatcher = new AMMO.btCollisionDispatcher( this.collisionConfiguration );
    this.overlappingPairCache = new AMMO.btDbvtBroadphase( );
    this.solver = new AMMO.btSequentialImpulseConstraintSolver( );
    this.dynamicsWorld = new AMMO.btDiscreteDynamicsWorld(
      this.dispatcher,
      this.overlappingPairCache,
      this.solver,
      this.collisionConfiguration
    );

    this.dynamicsWorld.setGravity( new AMMO.btVector3( 0, -10, 0 ) );

    this.floor = new this.PhysicsEntity( 'plane', {
      "uuid": "planeTest",
      "shape": [ 0, 1, 0 ],
      "mass": 0,
      "position": [0, -5, 0],
      "rotation": [ 0, 0, 0, 1 ]
    } );

    this.dynamicsWorld.addRigidBody( this.floor.body );
    this.statics.push( this.floor );

    this.stats.ready = true;
    this.stats.running = true;
    this.step( { "dt": 20 } );
  }

  step ( p ) // { dt:# }
  {
    this.dt = performance.now( );
    this.output.length = 0;

    this.stats.cstep++;

    if ( this.stats.ready )
    {
      this.dynamicsWorld.stepSimulation( 1 / 60, 10 );

      for ( let o of this.dynamics )
      {
        this.output.push( o.getTransform( ) );
      }
      if ( this.output.length != 0 && this.stats.cstep >= this.stats.stepper )
      { postMessage( { "c": "updateBuffer", "p": this.output } ); this.stats.cstep = 0; }
    }

    this.dt = performance.now( ) - this.dt;
    if ( this.stats.running )
    { setTimeout( ( ) => { this.step( { "dt": this.dt } ); },  ( 1000 / 60 ) - this.dt ); }
  }

  loadEntity ( p ) // { uuid:"", type:"", shape:[...], mass:#, origin:[x,y,z], rotation:[x,y,z,w] }
  {
    this.entities[p.uuid] = new this.PhysicsEntity( p.type, {
      "uuid": p.uuid,
      "shape": p.shape,
      "mass": p.mass,
      "position": p.position,
      "rotation": p.rotation
    } );

    this.dynamicsWorld.addRigidBody( this.entities[p.uuid].body );
    if ( this.entities[p.uuid].isDynamic )
    { this.dynamics.push( this.entities[p.uuid] ); }
    else
    { this.statics.push( this.entities[p.uuid] ); }
  }

  handleMessage ( p )
  {
    if ( typeof this[p.c] === 'function' )
    { this[p.c]( p.p ); }
    else
    { throw new Error( `function ${p.c} does not exists` ); }
  }
}

module.exports = PhysicsHandler;
