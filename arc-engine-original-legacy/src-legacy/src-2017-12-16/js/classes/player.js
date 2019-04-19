'use strict';

// let Character = require( './character.js' );
const THREE = require( 'three' );

module.exports = class Player // extends Character
{
  constructor ( )
  {
    // super( );
    this.specs =
    {
      "height":2,
      "width":0.5,
      "acceleration":0.1
    };

    this.stats =
    {
      "position":new THREE.Vector3( 0, 0, 0 ),
      "rotation":new THREE.Euler( 0, 0, 0, 'YXZ' ),
      "directionalVelocity":new THREE.Vector3( 0, 0, 0 ),
      "directionalInfluence":new THREE.Vector3( 0, 0, 0 )
    };

    this.input = { };

    this.generateRays( );

  }

  generateRays ( )
  {

    this.rays = { };

    // Vertical Rays
    this.rays.down = new THREE.Raycaster(
      new THREE.Vector3( ).copy( this.stats.position ),
      new THREE.Vector3( 0, -1, 0 ),
      0,
      this.specs.height / 2
    );

    this.rays.up = new THREE.Raycaster(
      new THREE.Vector3( ).copy( this.stats.position ),
      new THREE.Vector3( 0, 1, 0 ),
      0,
      this.specs.height / 2
    );

    // Directional
    this.rays.directional = { };
    this.rays.directional.lower = [];
    this.rays.directional.middle = [];
    this.rays.directional.upper = [];

    for ( let x = -1; x < 2; x++ )
    {
      this.rays.directional.upper.push( new THREE.Raycaster(
        new THREE.Vector3( x * ( this.specs.width / 2 ), 0, 0 ),
        new THREE.Vector3( 0, 0, -1 ),
        0,
        this.specs.width / 2
      ) );
      this.rays.directional.upper[x+1].relativePosition = new THREE.Vector3( x * ( this.specs.width / 2 ), 0, 0 );
    }

    for ( let x = -1; x < 2; x++ )
    {
      this.rays.directional.upper.push( new THREE.Raycaster(
        new THREE.Vector3( x * ( this.specs.width / 2 ), 0, 0 ),
        new THREE.Vector3( 0, 0, -1 ),
        0,
        this.specs.width / 2
      ) );
      this.rays.directional.upper[x+1].relativePosition = new THREE.Vector3( x * ( this.specs.width / 2 ), 0, 0 );
    }

    for ( let x = -1; x < 2; x++ )
    {
      this.rays.directional.upper.push( new THREE.Raycaster(
        new THREE.Vector3( x * ( this.specs.width / 2 ), 0, 0 ),
        new THREE.Vector3( 0, 0, -1 ),
        0,
        this.specs.width / 2
      ) );
      this.rays.directional.upper[x+1].relativePosition = new THREE.Vector3( x * ( this.specs.width / 2 ), 0, 0 );
    }

    console.log( this.rays.down );

  }

  updateRays ( )
  {
    this.rays.down.ray.origin.copy( this.stats.position );
    this.rays.up.ra.origin.copy( this.stats.position );


  }
}
