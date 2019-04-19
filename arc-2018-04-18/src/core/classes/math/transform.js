'use strict';

class Transform
{
  constructor ( v, q )
  {
    this.position = v;
    this.rotation = q;
    this.physics = new AMMO.btTransform( );
    this.physics.setIdentity( );
    this.physics.setOrigin( this.position.physics );
    this.physics.setRotation( this.rotation.physics );

    this.position.on( 'set', ( ) => {
      this.physics.setOrigin( this.position.physics );
      this.emit( 'set' );
    } );

    this.rotation.on( 'set', ( ) => {
      this.physics.setRotation( this.rotation.physics );
      this.emit( 'set' );
    } );

    this.position.on( 'update', ( ) => {
      this.physics.setOrigin( this.position.physics );
      this.emit( 'update' );
    } );

    this.rotation.on( 'update', ( ) => {
      this.physics.setRotation( this.rotation.physics );
      this.emit( 'update' );
    } );
  }

  setPosition ( v )
  {

  }

  setRotation ( q )
  {

  }

  setFromAmmoTransform ( t )
  {
    t.position = t.getOrigin( );
    t.rotation = t.getRotation( );

    this.position.set( t.position.x( ), t.position.y( ), t.position.z( ), 'update' );
    this.rotation.set( t.rotation.x( ), t.rotation.y( ), t.rotation.z( ), t.rotation.w( ), 'update' );
  }

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

module.exports = Transform;
