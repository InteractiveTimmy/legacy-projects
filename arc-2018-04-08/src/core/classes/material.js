'use strict';

class Material
{
  constructor ( t, p = [ ] ) // "", [ ... ], type and configuration
  {
    let type, params;
    let myClass;

    if ( typeof( t ) == 'object' ) { type = ''; params = t; }
    else { type = t; params = p; }

    if ( THREE.hasOwnProperty( type + 'Material' ) )
    { myClass = THREE[type + 'Material']; }
    else
    { throw new Error( 'material type not found' ); }

    class Material extends myClass
    {
      constructor ( p )
      { super( p ); }
    }

    let material = new Material( params );

    return material;
  }
}

module.exports = Material;
