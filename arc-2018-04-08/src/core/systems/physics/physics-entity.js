'use strict';

class PhysicsEntity
{
  constructor ( t, p )
  {
    this.uuid = p.uuid;

    this.transform = new Ammo.btTransform( );
    this.output = new Array( 8 );
    this.position = new Array( 3 );
    this.rotation = new Array( 4 );

    // handle shape type -- begin
    // 6 primatives
    if ( t == 'sphere' )
    { this.shape = new Ammo.btSphereShape( ...p.shape ); }
    if ( t == 'box' )
    { this.shape = new Ammo.btBoxShape( new Ammo.btVector3( ...p.shape ) ); }
    if ( t == 'cylinder' ) // [ ?? ]
    { this.shape = new Ammo.btCylinderShape( new Ammo.btVector3( ...p.shape ) ); }
    if ( t == 'capsule' )
    { }
    if ( t == 'cone' )
    { }
    if ( t == 'multisphere' )
    { }

    // 5 meshs
    if ( t == 'hull' )
    { }
    if ( t == 'mesh' )
    { }
    if ( t == 'staticmesh' )
    { }
    if ( t == 'terrain' )
    { }
    if ( t == 'plane' )
    { this.shape = new Ammo.btStaticPlaneShape( new Ammo.btVector3( ...p.shape ), 1 ); }

    // 1 compounds
    if ( t == 'compound' )
    { }
    // handle shape type -- end

    this.startTransform  = new Ammo.btTransform();
    this.startTransform.setIdentity( );

    this.mass = p.mass || 0,
    this.isDynamic = ( this.mass !== 0 ),
    this.intertia = new Ammo.btVector3( 0, 0, 0 );

    if ( this.isDynamic )
    { this.shape.calculateLocalInertia( this.mass, this.intertia ); }

    this.startTransform.setOrigin(new Ammo.btVector3( ...p.position ) );
    this.startTransform.setRotation( new Ammo.btQuaternion( ...p.rotation ) );

    this.motionState = new Ammo.btDefaultMotionState( this.startTransform ),
    this.rbInfo = new Ammo.btRigidBodyConstructionInfo( this.mass, this.motionState, this.shape, this.intertia ),
    this.body = new Ammo.btRigidBody( this.rbInfo );
  }

  getTransform ( )
  {
    this.body.getMotionState( ).getWorldTransform( this.transform );
    this.transform.position = this.transform.getOrigin( );
    this.transform.rotation = this.transform.getRotation( );

    this.output[0] = this.uuid;
    this.output[1] = this.transform.position.x( );
    this.output[2] = this.transform.position.y( );
    this.output[3] = this.transform.position.z( );
    this.output[4] = this.transform.rotation.x( );
    this.output[5] = this.transform.rotation.y( );
    this.output[6] = this.transform.rotation.z( );
    this.output[7] = this.transform.rotation.w( );
    return this.output;
  }

}

module.exports = PhysicsEntity;
