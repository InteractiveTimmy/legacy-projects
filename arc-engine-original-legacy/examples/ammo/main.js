'use strict';

/* NOTE
 - Only use oimo js when needed, Limited PHysics Engine
 - Create webworker for loader and oimo
 - Generate custom, lightweight physicsed world
 - Classes
 - - Game
 - - Graphics
 - - Input
 - - Entity
 - - - Basic
 - - - Charcter
 - - - Player
 - - - NonPlayer
*/
// THREE.js
let renderer, scene, camera, element, light;

// AMMO.js
let collisionConfiguration, dispatcher, overlappingPairCache, solver, dynamicsWorld;

// Entities
let floor, boxes


function main ( )
{
  init( );
  step( );
}

function init ( )
{
  element = document.getElementById( 'app' );

  // THREE -- Begin
  renderer = new THREE.WebGLRenderer( { canvas:element, antialias:true } );
  scene = new THREE.Scene( );
  camera = new THREE.PerspectiveCamera( 75, 16 / 9, 0.001, 1000 );
  // THREE -- End

  light = new THREE.DirectionalLight( 0xffffff, 0.8 );
  light.position.set( 0, 5, 5 );
  scene.add( light );

  renderer.setSize( 800, 450 );

  // Floor -- Begin
  floor = { };
  floor.mesh = new THREE.Mesh(
    new THREE.BoxGeometry( 10, 1, 10 ),
    new THREE.MeshPhongMaterial( { color:0x555599 } )
  );
  floor.mesh.position.set( 0, -2, 0 );

  scene.add( floor.mesh );
  // Floor -- End

  boxes = new THREE.Mesh(
    new THREE.BoxGeometry( 1, 1, 1 ),
    new THREE.MeshPhongMaterial( { color:0x567890 } )
  );
  boxes.position.set( 0, 0, -3 );
  boxes.rotation.set( 1, 0.5, 0.5 );
  console.log( boxes.quaternion.toArray( ) );
  scene.add( boxes );

  // AMMO -- Begin
  Ammo().then(function() {
    // Adapted from HelloWorld.cpp, Copyright (c) 2003-2007 Erwin Coumans  http://continuousphysics.com/Bullet/

    function main() {

      let step = function ( ) {
        window.requestAnimationFrame( ( ) => {
          step( );
        } );

        dynamicsWorld.stepSimulation(1/60, 10);

        bodies.forEach(function(body) {
          if (body.getMotionState()) {
            body.getMotionState().getWorldTransform(trans);
            // console.log("world pos = " + [trans.getOrigin().x().toFixed(2), trans.getOrigin().y().toFixed(2), trans.getOrigin().z().toFixed(2)]);
            
            boxes.position.set( trans.getOrigin().x().toFixed(2), trans.getOrigin().y().toFixed(2), trans.getOrigin().z().toFixed(2) );
            boxes.quaternion.set( trans.getRotation().x(), trans.getRotation().y(), trans.getRotation().z(), trans.getRotation().w() )

            //console.log("world rot = " + [trans.getRotation().x().toFixed(2), trans.getRotation().y().toFixed(2), trans.getRotation().z().toFixed(2), trans.getRotation().w().toFixed(2)]);
          }
        });

        boxes.position.set( trans.getOrigin().x().toFixed(2), trans.getOrigin().y().toFixed(2), trans.getOrigin().z().toFixed(2) );
        // boxes.quaternion.set( trans.getRotation().x().toFixed(2), trans.getRotation().y().toFixed(2), trans.getRotation().z().toFixed(2), trans.getRotation().w().toFixed(2) );
        // console.log( boxes.position );
      }
      var collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
          dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
          overlappingPairCache    = new Ammo.btDbvtBroadphase(),
          solver                  = new Ammo.btSequentialImpulseConstraintSolver(),
          dynamicsWorld           = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
      dynamicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));

      var groundShape     = new Ammo.btBoxShape(new Ammo.btVector3(10, 1, 10)),
          bodies          = [],
          groundTransform = new Ammo.btTransform();

      groundTransform.setIdentity();
      groundTransform.setOrigin(new Ammo.btVector3(0, -3, 0));

      (function() {
        var mass          = 0,
            isDynamic     = (mass !== 0),
            localInertia  = new Ammo.btVector3(0, 0, 0);

        if (isDynamic)
          groundShape.calculateLocalInertia(mass, localInertia);

        var myMotionState = new Ammo.btDefaultMotionState(groundTransform),
            rbInfo        = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, groundShape, localInertia),
            body          = new Ammo.btRigidBody(rbInfo);

        dynamicsWorld.addRigidBody(body);
        bodies.push(body);
      })();


      (function() {
        var colShape        = new Ammo.btBoxShape(new Ammo.btVector3(1, 1, 1)),
            startTransform  = new Ammo.btTransform();

        startTransform.setIdentity();

        var mass          = 1,
            isDynamic     = (mass !== 0),
            localInertia  = new Ammo.btVector3(0, 0, 0);

        if (isDynamic)
          colShape.calculateLocalInertia(mass,localInertia);

        startTransform.setOrigin(new Ammo.btVector3(0, 0, -3));
        startTransform.setRotation( new Ammo.btQuaternion( ...boxes.quaternion.toArray( ) ) )
        console.log( 'rot', startTransform.getRotation( ) );

        var myMotionState = new Ammo.btDefaultMotionState(startTransform),
            rbInfo        = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
            body          = new Ammo.btRigidBody(rbInfo);

        dynamicsWorld.addRigidBody(body);
        bodies.push(body);
      })();

      var trans = new Ammo.btTransform(); // taking this out of the loop below us reduces the leaking
      step( );

      /*for (var i = 0; i < 135; i++) {

      }*/

      // Delete objects we created through |new|. We just do a few of them here, but you should do them all if you are not shutting down ammo.js
      // we'll free the objects in reversed order as they were created via 'new' to avoid the 'dead' object links
      /*
      Ammo.destroy(dynamicsWorld);
      Ammo.destroy(solver);
      Ammo.destroy(overlappingPairCache);
      Ammo.destroy(dispatcher);
      Ammo.destroy(collisionConfiguration);
      */

      console.log('ok.')
    }

    main();
  });
  // AMMO -- End

}

function step ( )
{
  window.requestAnimationFrame( ( ) => {
    step( );
  } );

  renderer.render( scene, camera );

  // console.log( 'stepped' );
}

window.onload = function ( ) // Initial Load of Document
{ main( ); }
