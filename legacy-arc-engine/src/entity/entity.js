'use strict';

class Entity extends THREE.Object3D
{
  constructor ( p = { } ) // { name:"" }
  {
    super( );
    this.name = ( p.hasOwnProperty( 'name' ) ? p.name : `ENTITY-${this.uuid}` );
    UTILS.log.write( [ `entity created`, this ], 'load' );
  }

  load ( t, p )
  {
    let e = require( `../element/element.js` )( t, p );
    this.add( e );
    UTILS.log.write( [ `added ${t} element to ${this.name}`, e ], 'load' );
    return e;
  }

  unload ( p )
  {

  }

}

module.exports = Entity;
