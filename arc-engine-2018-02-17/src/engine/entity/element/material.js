'use strict';

module.exports = ( parent, p = { } ) => {
  let o = { };

  if ( THREE.hasOwnProperty( `Mesh${p.type}Material`) )
  { o = new THREE[ `Mesh${p.type}Material` ]( p.config ); }

  o.entity = parent;

  return o;
}

/*
class ElementMaterial
{
  constructor ( parent, p = { } ) // { }
  {
    this.parent = parent;

    for ( let k in p )
    { this[k] = p[k]; }

    if ( THREE.hasOwnProperty( `Mesh${p.type}Material`) )
    { this.graphics = new THREE[ `Mesh${p.type}Material` ]( p.config ); }

    console.log( 'boom', this );

  }
}

module.exports = ( parent, p ) => { return new ElementMaterial( parent, p ); }
*/
