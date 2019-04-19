'use strict';

class PhysicsShapeHelper
{
  constructor ( t = '', p = [ ] ) // "", { "config":... }, type and configuration
  {
    let type, params;
    let myClass;

    if ( typeof( t ) == 'object' ) { type = ''; params = t; }
    else { type = t; params = p; }

    if ( !Array.isArray( params ) )
    { params = [ params ]; }

    if ( AMMO.hasOwnProperty( 'bt' + type + 'Shape' ) )
    { myClass = AMMO['bt' + type + 'Shape']; }
    else
    { throw new Error( 'shape type not found' ); }

    class PhysicsShape extends myClass
    {
      constructor ( p )
      { super( ...p ); }
    }

    let physicsShape = new PhysicsShape( params )
    return physicsShape;
  }
}

module.exports = PhysicsShapeHelper;
