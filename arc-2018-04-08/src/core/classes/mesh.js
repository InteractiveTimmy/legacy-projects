'use strict';

class Mesh extends THREE.Mesh
{
  constructor ( p ) // { geometry:@THREE.Geometry || @THREE, material}
  {
    super( p.geometry, p.material );

    this.rotation.reorder( 'YXZ' );
  }
}

module.exports = Mesh;
