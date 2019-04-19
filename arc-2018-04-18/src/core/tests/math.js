'use strict';

module.exports = ( p ) =>
{
  this.core = p;

  this.v1 = new this.core.Vector3( 0, 0, 0 );
  this.v2 = new this.core.Vector3( 0, 0, 0 );
  this.v3 = new this.core.Vector3( 0, 0, 0 );

  this.v1.set( 1, 1, 1 );
  this.v2 = new this.core.Vector3( ).copy( this.v1 );
  this.v1.add( new this.core.Vector3( 2, 2, 2 ) );
  this.v3 = new this.core.Vector3( ).copy( this.v2 ).add( this.v1 );

  this.e1 = new this.core.Euler( 0, 0, 0 );
  this.e2 = new this.core.Euler( 0, 0, 0 );
  this.e3 = new this.core.Euler( 0, 0, 0 );

  this.e1.set( Math.PI / 2, Math.PI / 4, Math.PI / 6 );
  this.e2.copy( this.e1 );
  this.e2.setX( Math.PI * 2 );
  this.e3.setDegrees( 180, 90, 45 );

  this.q1 = new this.core.Quaternion( );
  this.q2 = new this.core.Quaternion( );
  this.q3 = new this.core.Quaternion( );

  this.q1.set( 1, 0, 0, 0 );
  this.q2.setFromEuler( this.e3 );
  this.q3.copy( this.q2 );
  this.q3.negate( );

  this.t1 = new this.core.Transform( this.v1, this.q1 );

  console.log( 'v1', this.v1.toArray( ) );
  console.log( 'v2', this.v2.toArray( ) );
  console.log( 'v3', this.v3.toArray( ) );

  console.log( 'e1', this.e1.toArray( ) );
  console.log( 'e2', this.e2.getDegrees( ) );
  console.log( 'e3', this.e3.toArray( ) );

  console.log( 'q1', this.q1.toArray( ) );
  console.log( 'q2', this.q2.toArray( ) );
  console.log( 'q3', this.q3.toArray( ) );

  console.log( 'v1Ammo', [ this.v1.physics.x( ), this.v1.physics.y( ), this.v1.physics.z( ) ] );
  console.log( 'v2Ammo', [ this.v2.physics.x( ), this.v2.physics.y( ), this.v2.physics.z( ) ] );
  console.log( 'v3Ammo', [ this.v3.physics.x( ), this.v3.physics.y( ), this.v3.physics.z( ) ] );

  console.log( 'e1Ammo', [ this.e1.physics.x( ), this.e1.physics.y( ), this.e1.physics.z( ), this.e1.physics.w( ) ] );
  console.log( 'e2Ammo', [ this.e2.physics.x( ), this.e2.physics.y( ), this.e2.physics.z( ), this.e2.physics.w( ) ] );
  console.log( 'e3Ammo', [ this.e3.physics.x( ), this.e3.physics.y( ), this.e3.physics.z( ), this.e3.physics.w( ) ] );

  console.log( 'q1Ammo', [ this.q1.physics.x( ), this.q1.physics.y( ), this.q1.physics.z( ), this.q1.physics.w( ) ] );
  console.log( 'q2Ammo', [ this.q2.physics.x( ), this.q2.physics.y( ), this.q2.physics.z( ), this.q2.physics.w( ) ] );
  console.log( 'q3Ammo', [ this.q3.physics.x( ), this.q3.physics.y( ), this.q3.physics.z( ), this.q3.physics.w( ) ] );

  console.log( 'v1Three', this.v1.graphics.toArray( ) );
  console.log( 'v2Three', this.v2.graphics.toArray( ) );
  console.log( 'v3Three', this.v3.graphics.toArray( ) );

  console.log( 'e1Three', this.e1.graphics.toArray( ) );
  console.log( 'e2Three', this.e2.graphics.toArray( ) );
  console.log( 'e3Three', this.e3.graphics.toArray( ) );

  console.log( 'q1Three', this.q1.graphics.toArray( ) );
  console.log( 'q2Three', this.q2.graphics.toArray( ) );
  console.log( 'q3Three', this.q3.graphics.toArray( ) );

  console.log( 't1', this.t1.physics );
  console.log( 'v1', this.v1.toArray( ) );
  console.log( 'v1Ammo', [ this.v1.physics.x( ), this.v1.physics.y( ), this.v1.physics.z( ) ] );
  console.log( 't1v1Ammo', [ this.t1.physics.getOrigin( ).x( ), this.t1.physics.getOrigin( ).y( ), this.t1.physics.getOrigin( ).z( ) ] );
  this.v1.setX( 5 );
  console.log( 't1v1', this.v1.toArray( ) );
  console.log( 't1v1Ammo', [ this.t1.physics.getOrigin( ).x( ), this.t1.physics.getOrigin( ).y( ), this.t1.physics.getOrigin( ).z( ) ] );
  console.log( 'v1Ammo', [ this.v1.physics.x( ), this.v1.physics.y( ), this.v1.physics.z( ) ] );
}
