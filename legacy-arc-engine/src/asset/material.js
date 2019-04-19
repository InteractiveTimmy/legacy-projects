'use strict';

// material
module.exports = ( p = { } ) => {
  let o = { };

  if ( THREE.hasOwnProperty( `Mesh${p.type}Material`) )
  { o = new THREE[ `Mesh${p.type}Material` ]( p.config ); }

  return o;
}
