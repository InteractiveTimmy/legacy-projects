'use strict';

class GeometryHelper
{
  constructor ( t = '', p = { } ) // "", { "config":... }, type and configuration
  {
    let type, params;
    let myClass;

    if ( typeof( t ) == 'object' ) { type = ''; params = t; }
    else { type = t; params = p; }

    if ( THREE.hasOwnProperty( type + 'Geometry' ) )
    { myClass = THREE[type + 'Geometry']; }
    else
    { throw new Error( 'geometry type not found' ); }

    class Geometry extends myClass
    {
      constructor ( p ) // [ ...verticies || ...config ]
      {
        if ( t == 'Buffer' )
        {
          super( );
          let verts = new Float32Array( p );
          this.addAttribute( 'position', new THREE.BufferAttribute( verts, 3 ) );
        }
        else
        { super( ...p ); }
      }
    }

    let geometry = new Geometry( params )
    return geometry;
  }
}

module.exports = GeometryHelper;
