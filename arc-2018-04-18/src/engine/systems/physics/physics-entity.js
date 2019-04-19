'use strict';

class PhysicsEntity
{
  constructor ( t, p )
  {
    this.uuid = p.uuid;

    this.transform = new AMMO.btTransform( );
    this.output = new Array( 8 );
    this.position = new Array( 3 );
    this.rotation = new Array( 4 );

    // handle shape type -- begin
    // 6 primatives
    if ( t == 'sphere' )
    { this.shape = new AMMO.btSphereShape( ...p.shape ); }
    if ( t == 'box' )
    { this.shape = new AMMO.btBoxShape( new AMMO.btVector3( ...p.shape ) ); }
    if ( t == 'cylinder' ) // [ ?? ]
    { this.shape = new AMMO.btCylinderShape( new AMMO.btVector3( ...p.shape ) ); }
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
    { this.shape = new AMMO.btStaticPlaneShape( new AMMO.btVector3( ...p.shape ), 1 ); }

    // 1 compounds
    if ( t == 'compound' )
    { }
    // handle shape type -- end

    this.startTransform  = new AMMO.btTransform();
    this.startTransform.setIdentity( );

    this.mass = p.mass || 0,
    this.isDynamic = ( this.mass !== 0 ),
    this.intertia = new AMMO.btVector3( 0, 0, 0 );

    if ( this.isDynamic )
    { this.shape.calculateLocalInertia( this.mass, this.intertia ); }

    this.startTransform.setOrigin(new AMMO.btVector3( ...p.position ) );
    this.startTransform.setRotation( new AMMO.btQuaternion( ...p.rotation ) );

    this.motionState = new AMMO.btDefaultMotionState( this.startTransform ),
    this.rbInfo = new AMMO.btRigidBodyConstructionInfo( this.mass, this.motionState, this.shape, this.intertia ),
    this.body = new AMMO.btRigidBody( this.rbInfo );
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
    /*
    this.position[0] = this.transform.position.x( );
    this.position[1] = this.transform.position.y( );
    this.position[2] = this.transform.position.z( );
    this.rotation[0] = this.transform.rotation.x( );
    this.rotation[1] = this.transform.rotation.y( );
    this.rotation[2] = this.transform.rotation.z( );
    this.rotation[3] = this.transform.rotation.w( );
    return { "position": this.position, "rotation": this.rotation };
    */
  }

}

module.exports = PhysicsEntity;

/*
'use strict';

class PhysicsEntity
{
  constructor ( t = "", p = { } ) // "", { shape:[...], mass:#, origin:[x,y,z] } }
  {
    this.uuid = p.uuid;

    this.tc = new AMMO.btTransform( );
    this.output = {
      "transformC": new AMMO.btTransform( ),
      "transformL": new AMMO.btTransform( ),
      "posC": [ 0, 0, 0 ],
      "posL": [ 0, 0, 0 ], // need to utilize for output load handling
      "rotC": [ 0, 0, 0, 0 ],
      "rotL": [ 0, 0, 0, 0 ] // need to utilize for output load handling
    };
    // 6 primatives

    if ( t == 'sphere' ) // [ radius ]
    { this.shape = new AMMO.btSphereShape( p.shape[0] ); }

    if ( t == 'box' ) // [ x, y, z ]
    { this.shape = new AMMO.btBoxShape( new AMMO.btVector3( ...p.shape ) ); }

    if ( t == 'cylinder' ) // [ ?? ]
    { this.shape = new AMMO.btCylinderShape( new AMMO.btVector3( ...p.shape ) ); }

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
    { }

    // 1 compounds
    if ( t == 'compound' )
    { }

    this.transform = new AMMO.btTransform( ); // initializes origin
    this.transform.setIdentity( ); // sets initial origin

    this.mass = p.mass || 0;
    this.dynamic = ( this.mass != 0 );
    this.inertia = new AMMO.btVector3( 0, 0, 0 ); // stores local initeria

    console.log( this.mass );
    console.log( this.inertia.x( ), this.inertia.y( ), this.inertia.z( ) );

    if ( this.dynamic )
    { this.shape.calculateLocalInertia( this.mass, this.inertia ); }

    console.log( this.shape );

    this.transform.setOrigin( new AMMO.btVector3( ...p.origin ) );
    // if ( p.hasOwnProperty( 'rotation' ) && p.rotation ) { this.transform.setRotation( new AMMO.btQuaternion( ...p.rotation ) ); }

    console.log( this.inertia.x( ) );

    this.motionState = new AMMO.btDefaultMotionState( this.transform );
    this.rbInfo = new AMMO.btRigidBodyConstructionInfo( this.mass, this.motionState, this.shape, this.intertia );
    this.body = new AMMO.btRigidBody( this.rbInfo );
  }

  getTransform ( )
  {
    this.body.getMotionState( ).getWorldTransform( this.output.transformC );

    // pipe to output
    this.output.posC[0] = this.output.transformC.getOrigin( ).x( );
    this.output.posC[1] = this.output.transformC.getOrigin( ).y( );
    this.output.posC[2] = this.output.transformC.getOrigin( ).z( );
    this.output.rotC[0] = this.output.transformC.getRotation( ).x( );
    this.output.rotC[1] = this.output.transformC.getRotation( ).y( );
    this.output.rotC[2] = this.output.transformC.getRotation( ).z( );
    this.output.rotC[3] = this.output.transformC.getRotation( ).w( );

    return { "position": this.output.posC, "rotation": this.output.rotC };
  }
}

module.exports = PhysicsEntity;
*/
