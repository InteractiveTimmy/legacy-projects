'use strict';

class Euler
{
  constructor ( x = 0, y = 0, z = 0, o = 'YXZ' )
  {
    this.x;
    this.y;
    this.z;
    this.order;

    this.graphics = new THREE.Euler( );
    this.physics = new AMMO.btQuaternion( );

    this.setOrder( o );
    this.set( x, y, z );
  }

  set ( x = 0, y = 0, z = 0, s = 'set' )
  {
    if ( x > Math.PI || x < -Math.PI ) { x = x % Math.PI; }
    if ( y > Math.PI || y < -Math.PI ) { y = y % Math.PI; }
    if ( z > Math.PI || z < -Math.PI ) { z = z % Math.PI; }

    this.graphics.set( x, y, z );
    this.physics.setEulerZYX( x, y, z );

    this.x = x;
    this.y = y;
    this.z = z;

    this.emit( s );

    return this;
  }

  setX ( x )
  { return this.set( x, this.y, this.z ); }

  setY ( y )
  { return this.set( this.x, y, this.z ); }

  setZ ( z )
  { return this.set( this.x, this.y, z ); }

  setDegrees ( x = 0, y = 0, z = 0 )
  { return this.set( ( x / 180 ) * Math.PI, ( y / 180 ) * Math.PI, ( z / 180 ) * Math.PI ); }

  setXDegrees ( x )
  { return this.set( x / ( 180 * Math.PI ), this.y, this.z ); }

  setYDegrees ( y )
  { return this.set( this.x, y / ( 180 * Math.PI ), this.z ); }

  setZDegrees ( z )
  { return this.set( this.x, this.y, z / ( 180 * Math.PI ) ); }

  getDegrees ( )
  { return [ ( this.x / Math.PI ) * 180, ( this.y / Math.PI ) * 180, ( this.z / Math.PI ) * 180 ]; }

  setOrder ( o )
  { this.graphics.reorder( o ); this.order = o; return this; }

  copy ( e )
  { this.setOrder( e.order ); return this.set( e.x, e.y, e.z ); }

  equals ( e )
  { if ( this.x == v.x && this.y == v.y && this.z == v.z && this.order == v.order ) { return true; } else { return false; } }

  setFromQuaternion ( q )
  { return this.set( ...this.graphics.setFromQuaternion( q.graphics ).toArray( ) ); }

  toArray ( )
  { return [ this.x, this.y, this.z ]; }

  negate ( )
  { return this.set( this.x - Math.PI, this.y - Math.PI, this.z - Math.PI ); }

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

module.exports = Euler;
