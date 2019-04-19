'use strict';

// mesh
module.exports = ( p = { } ) => {
  let o = { };
  o = new THREE.Mesh( p.geometry, p.material );
  return o;
}
