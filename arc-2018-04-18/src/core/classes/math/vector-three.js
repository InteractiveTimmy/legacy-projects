'use strict';

class Vector3
{
  constructor ( x = 0, y = 0, z = 0 )
  {
    this.graphics = new THREE.Vector3( );
    this.physics = new AMMO.btVector3( );

    this.set( x, y, z );
  }

  set ( x = 0, y = 0, z = 0, s = 'set' ) // [ ... ]
  {
    this.graphics.set( x, y, z );
    this.physics.setValue( x, y, z );

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

  toArray ( )
  { return [ this.x, this.y, this.z ]; }

  applyEuler ( e )
  { return this.set( ...this.graphics.applyEuler( e.graphics ).toArray( ) ); }

  applyQuaternion ( q )
  { return this.set( ...this.graphics.applyEuler( q.graphics ).toArray( ) ); }

  addScalar ( s )
  { return this.set( this.x + s, this.y + s, this.z + s ); }

  copy ( v )
  { return this.set( v.x, v.y, v.z ); }

  cross ( v )
  { return this.set( ...this.graphics.cross( v ).toArray( ) ); }

  distanceTo ( v )
  { return this.graphics.distanceTo( v ); }

  add ( v )
  { return this.set( this.x + v.x, this.y + v.y, this.z + v.z ); }

  sub ( v )
  { return this.set( this.x - v.x, this.y - v.y, this.z - v.z ); }

  multiply ( v )
  { return this.set( this.x * v.x, this.y * v.y, this.z * v.z ); }

  divide ( v )
  { return this.set( this.x / v.x, this.y / v.y, this.z / v.z ); }

  equals ( v )
  { if ( this.x == v.x && this.y == v.y && this.z == v.z ) { return true; } else { return false; } }

  negate ( )
  { return this.set( ...this.graphics.negate( ).toArray( ) ); }

  normalize ( )
  { return this.set( ...this.graphics.normalize( ).toArray( ) ); }

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

module.exports = Vector3
