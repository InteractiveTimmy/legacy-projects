'use strict';

class GeometryHelper
{
  constructor ( t = '', p = { } ) // "", { "config":... }, type and configuration
  {
    let type, params;
    let myClass;

    if ( typeof( t ) == 'object' ) { type = ''; params = t; }
    else { type = t; params = p; }

    if ( THREE.hasOwnProperty( type + 'BufferGeometry' ) )
    { myClass = THREE[type + 'BufferGeometry']; }
    else
    { throw new Error( 'geometry type not found' ); }

    class Geometry extends myClass
    {
      constructor ( p ) // [ ...verticies || ...config ]
      {
        if ( t == '' )
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
    /*
    for ( let i in THREE )
    {
      if ( i.includes( p.type ) && i.includes( 'Geometry' ) )
      { foundGeometries++; foundGeometryType = i }
    }

    if ( foundGeometries == 1 )
    {
      myClass = THREE[foundGeometryType];

      class Geometry extends myClass
      {
        constructor ( p ) // config
        { super( ...p ); }
      }

      let geometry = new Geometry( p.config );

      return geometry;
    }
    else
    {
      myClass = THREE.BufferGeometry;

      class Geometry extends myClass
      {
        constructor ( p ) // [ ...verticies ]
        {
          super( );
          this.addAttribute( 'position', new THREE.BufferAttribute( p, 3 ) );
        }
      }

      let geometry = new Geometry( p.config );

      return geometry;
    }
    */
  }
}

module.exports = GeometryHelper;
