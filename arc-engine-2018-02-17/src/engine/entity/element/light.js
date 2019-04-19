'use strict';

// light
module.exports = ( p = { } ) => {
  let o = { };
  o = new THREE[`${p.type}Light`]( );

  for ( let k in p.config )
  { o[k] = p.config[k]; }


  return o;
}
/*
class ElementLight
{
  constructor ( parent, p = { } ) // { color:#, intensity:# }
  {
    this.parent = parent;
    for ( let k in p )
    { this[k] = p[k]; }

    if ( THREE.hasOwnProperty( `Mesh${p.type}Material`) )
    { this.graphics = new THREE[ `Mesh${p.type}Material` ]( p.config ); }

  }
}

module.exports = ( parent, p ) => { return new ElementLight( parent, p ); }
*/
