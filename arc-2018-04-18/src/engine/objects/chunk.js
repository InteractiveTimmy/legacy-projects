'use strict';

class Chunk extends THREE.Group
{
  constructor ( )
  {
    super( );

    this.gravity = new THREE.Vector3( 0, 0, 0 );
    this.friction = new THREE.Vector3( 0.1, 0.1, 0.1 );
  }

  add ( p ) // @THREE.Object3D
  {
    super.add( p );
    // this.computeBoundingBox( );
  }
}

module.exports = Chunk;
