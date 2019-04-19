'use strict';

class Quaternion
{
  constructor ( x = 0, y = 0, z = 0, w = 1 )
  {
    this.x;
    this.y;
    this.z;
    this.w;

    this.graphics = new THREE.Quaternion( );
    this.physics = new AMMO.btQuaternion( );

    this.set( x, y, z, w );
  }

  set ( x = 0, y = 0, z = 0, w = 1, s = 'set' )
  {
    if ( x > 1 || x < -1 ) { x = x % 1; }
    if ( y > 1 || y < -1 ) { y = y % 1; }
    if ( z > 1 || z < -1 ) { z = z % 1; }
    if ( w > 1 || w < -1 ) { w = w % 1; }

    this.graphics.set( x, y, z, w );
    this.physics.setValue( x, y, z, w );

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.emit( s );

    return this;
  }

  copy ( q )
  { return this.set( q.x, q.y, q.z, q.w ); }

  equals ( q )
  { if ( this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w ) { return true; } else { return false; } }

  setFromEuler ( e )
  { return this.set( ...this.graphics.setFromEuler( e.graphics).toArray( ) ); }

  negate ( )
  { return this.set( ...this.graphics.inverse( ).toArray( ) ); }

  multiply ( q )
  { return this.set( ...this.graphics.multiply( q ).toArray( ) ); }

  toArray ( )
  { return [ this.x, this.y, this.z, this.w ]; }

  on ( e, f )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { this.events = { }; }
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { return; }
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }
}

module.exports = Quaternion;
