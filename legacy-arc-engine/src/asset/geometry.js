'use strict';

// geometry
module.exports = ( p = { } ) => {
  let o = { };

  if ( THREE.hasOwnProperty( `${p.type}Geometry` ) )
  { o = new THREE[ `${p.type}Geometry` ]( ...p.config ); }

  return o;
}
