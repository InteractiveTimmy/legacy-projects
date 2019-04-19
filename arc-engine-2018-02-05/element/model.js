'use strict';

module.exports = ( p ) =>
{
  let mesh = new THREE.Mesh(
    new THREE[`${p.geometry.type}Geometry`]( ...p.geometry.params ),
    new THREE[`Mesh${p.material.type}Material`]( p.material.params )
  );
  return mesh;
}
