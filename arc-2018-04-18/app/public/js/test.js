'use strict';

let A = require( './ammo.js' );
A( ).then( ( r ) => {
  let AMMO = r;

  let collisionConfiguration = new AMMO.btDefaultCollisionConfiguration( );
  let dispatcher = new AMMO.btCollisionDispatcher( collisionConfiguration );
  let overlappingPairCache = new AMMO.btDbvtBroadphase( );
  let solver = new AMMO.btSequentialImpulseConstraintSolver( );
  // console.log( AMMO );
  // let collisionCallbackPointer = AMMO.Runtime.addFunction( this.collisionCallback );

  // initialize AMMO world
  let space = new AMMO.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

  console.log( AMMO.Runtime );
} );
