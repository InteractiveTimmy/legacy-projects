'use strict';

module.exports = ( parent, p = { } ) => {
  let o = { };

  if ( THREE.hasOwnProperty( `${p.type}Geometry` ) )
  { o = new THREE[ `${p.type}Geometry` ]( ...p.specs ); }

  o.entity = parent;

  return o;
}
/*
class ElementGeometry extends THREE.Geometry
{
  constructor ( parent, p = { } ) // { type:"", specs:[ ] }
  {
    super( );
    this.parent = parent;

    for ( let k in p )
    { this[k] = p[k]; }

    if ( THREE.hasOwnProperty( `${p.type}Geometry` ) )
    { this.graphics = new THREE[ `${p.type}Geometry` ]( ...p.specs ); }
    console.log( this );

  }
}

module.exports = ( parent, p ) => { return new ElementGeometry( parent, p ); }
*/
