'use strict';

const THREE = require( 'three' );

module.exports = class Playground // extends Character
{
  constructor ( )
  {
    this.vertices = [];
    this.faces = [];
  }

  generateGeometry ( )
  {
    this.vertices.push(
      new THREE.Vector3( -10, 0, -10 ), // Vert 1
      new THREE.Vector3( 10, 0, -10 ), // Vert 2
      new THREE.Vector3( 10, 0, 10 ), // Vert 3
      new THREE.Vector3( -10, 0, 10 ), // Vert 4
      new THREE.Vector3( -10, 2, -10 ), // Vert 5
      new THREE.Vector3( 10, 2, -10 ), // Vert 6
      new THREE.Vector3( 10, 2, -16 ), // Vert 7
      new THREE.Vector3( 10, 2, -16 ), // Vert 8
    );
  }
}
