'use strict';

const THREE = require( 'three' );

module.exports = class Entity
{
  constructor ( p ) // { name, mesh, physics, position, rotation, linearVelocity, mass, gravitation }
  {

    this.name = p.name; // unique name
    this.mesh = p.mesh; // THREE mesh

    this.physics = p.physicsed; // "simple", "complex", or null

    this.position = p.position || [0,0,0]; // center position
    this.rotation = p.rotation || [0,0,0]; // rotation of object

    this.linearVelocity = p.linearVelocity || [0,0,0]; // velocity per tick
    this.mass = p.mass || 0; // object mass, kg
    this.gravitation = p.gravitation || [0,0,0]; // local gravitation on entity

    if ( this.physicsed )
    { this.generatePhysics( this.physicsed ); }

    console.log( this.mesh );
  }

  generatePhysics( p )
  {
    if ( p.type == "simple" )
    {
      this.rays = {};

      this.mesh.geometry.computeBoundingBox( );

      this.physics.modelBox = new THREE.Box3(
        this.mesh.geometry.boundingBox.min,
        this.mesh.geometry.boundingBox.max
      );

      this.mesh.geometry.computeBoundingSphere( );
      this.physics.modelSphere = this.mesh.geometry.boundingSphere;

      this.rays.gravity


      // NOTE OLD BELOW

      let bB = this.mesh.geometry.boundingBox;

      let absMax = Math.max( bB.max.x, bB.max.y, bB.max.z ) * 2;

      let simpleBB = new THREE.Box3( bB.min, bB.max );

      let direction = new THREE.Vector3(
        this.gravitationalVelocity[0],
        this.gravitationalVelocity[1],
        this.gravitationalVelocity[2]
      ).normalize( ).multiply( new THREE.Vector3(
        absMax, absMax, absMax
      ) );

      simpleBB.clampPoint( direction, direction );

      this.rays = {};

      this.bbPoint = direction.add( new THREE.Vector3( ...this.position ) );

      console.log( 'bb', this.bbPoint );

      /*
      this.rays.gravity = new THREE.Raycaster(
        new THREE.Vector3( ...this.position ),
        new THREE.Vector3( ).copy( direction ),

      )
      */
    }
  }

  getMesh ( )
  {
    return this.mesh;
  }
}
