'use strict';

function generateCapsuleGeometry ( radius, height, SRadius, SHeight )
{

  let result = {};

  let sRadius = SRadius || 20;
  let sHeight = SHeight || 10;
  let o0 = Math.PI*2;
  let o1 = Math.PI/2;
  let g = new THREE.Geometry( );
  let m0 = new THREE.CylinderGeometry( radius, radius, height - ( radius * 2 ), sRadius, 1, true );
  let m1 = new THREE.SphereGeometry( radius, sRadius, sHeight, 0, o0, 0, o1 );
  let m2 = new THREE.SphereGeometry( radius, sRadius, sHeight, 0, o0, o1, o1 );
  let mtx0 = new THREE.Matrix4().makeTranslation( 0, 0, 0 );
  let mtx1 = new THREE.Matrix4().makeTranslation( 0, height * 0.5 - radius, 0 );
  let mtx2 = new THREE.Matrix4().makeTranslation( 0, -height * 0.5 + radius, 0 );
  g.merge( m0, mtx0 );
  g.merge( m1, mtx1 );
  g.merge( m2, mtx2 );
  let geo = new THREE.BufferGeometry( );
  geo.fromGeometry( g );
  result.mesh = geo;

  let types = [ 'sphere', 'cylinder', 'sphere' ];
  let sizes = [
    radius, radius, radius,
    radius, height - ( radius * 2 ), radius,
    radius, radius, radius
  ];
  let positions = [
    0, ( height / 2 ) - radius, 0,
    0, 0, 0,
    0, -1 * ( height / 2 ) + radius, 0
  ];

  result.oimo = { "type":types, "size":sizes, "position":positions, "posShape":positions };

  return result;

}
