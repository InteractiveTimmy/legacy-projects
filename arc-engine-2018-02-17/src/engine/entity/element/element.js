'use strict'

module.exports = ( parent, t, p = { } ) => {
  let o = { };

  o = require( `./${t}.js` )( p );

  o.entity = parent;
  o.offset = {
    "position":new THREE.Vector3( ),
    "rotation":new THREE.Euler( 0, 0, 0, 'YXZ' ),
    "relative":true
  };

  o.offset.initial = {
    "position":new THREE.Vector3( ).copy( o.offset.position ),
    "rotation":new THREE.Euler( ).copy( o.offset.rotation )
  };

  o.setOffset = ( p ) =>
  {
    console.log( 'reached setOffset', p );
    if ( p.hasOwnProperty( 'position' ) )
    { o.offset.position.copy( p.hasOwnProperty( 'position' ) ? new THREE.Vector3( ...p.position ) : new THREE.Vector3( ) ); }
    if ( p.hasOwnProperty( 'rotation' ) )
    { o.offset.rotation.copy( p.hasOwnProperty( 'rotation' ) ? new THREE.Euler( ...p.rotation, 'YXZ' ) : new THREE.Euler( 0, 0, 0, 'YXZ' ) ); }
    if ( p.hasOwnProperty( 'relative' ) )
    { o.offset.relative = p.relative; }

    o.offset.initial = {
      "position":new THREE.Vector3( ).copy( o.offset.position ),
      "rotation":new THREE.Euler( ).copy( o.offset.rotation )
    };

    return o;
  }

  return o;
}
