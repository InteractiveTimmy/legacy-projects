'use strict';
class RigidBody extends AMMO.btRigidBody
{
  constructor ( s, t, m = 0 )
  {
    let shape = s;
    let transform = t.physics;
    let mass = m;

    let isDynamic = ( mass !== 0 );
    let intertia = new AMMO.btVector3( 0, 0, 0 );

    if ( isDynamic )
    { shape.calculateLocalInertia( mass, intertia ); }

    let motionState = new AMMO.btDefaultMotionState( transform );
    let rbInfo = new AMMO.btRigidBodyConstructionInfo( mass, motionState, shape, intertia );

    super( rbInfo );

    // this.setCollisionFlags( )
    this.uuid = UUID( ); // generates uuid for rigid body
    this.system = 'physics';
    this.transform = t; // stores transform buffer for physics system
    this.transformBuffer = new AMMO.btTransform( );
    this.motionState = new AMMO.btDefaultMotionState( );
    this.isDynamic = isDynamic;

    this.transform.on( 'set', ( ) => {
      this.setTransform( );
    } );
  }

  getTransform ( )
  {
    this.getMotionState( ).getWorldTransform( this.transformBuffer );
    this.transform.setFromAmmoTransform( this.transformBuffer );
    return this;
  }

  setTransform ( )
  {
    this.setCenterOfMassTransform( this.transform.physics );
    if ( !this.isDynamic )
    {
      this.motionState.setWorldTransform( this.transform.physics );
      this.setMotionState( this.motionState );
    }
    return this;
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

module.exports = RigidBody;
