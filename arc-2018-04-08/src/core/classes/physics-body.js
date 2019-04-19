'use strict';
class PhysicsBody extends Ammo.btRigidBody
{
  constructor ( p = { } )
  {
    let entity = p.entity;

    let shape;

    // handle shape type -- begin
    // 6 primatives
    if ( p.type == 'sphere' )
    { shape = new Ammo.btSphereShape( ...p.shape ); }
    if ( p.type == 'box' )
    { shape = new Ammo.btBoxShape( new Ammo.btVector3( ...p.shape ) ); }
    if ( p.type == 'cylinder' ) // [ ?? ]
    { shape = new Ammo.btCylinderShape( new Ammo.btVector3( ...p.shape ) ); }
    if ( p.type == 'capsule' )
    { }
    if ( p.type == 'cone' )
    { }
    if ( p.type == 'multisphere' )
    { }

    // 5 meshs
    if ( p.type == 'hull' )
    { }
    if ( p.type == 'mesh' )
    { }
    if ( p.type == 'staticmesh' )
    { }
    if ( p.type == 'terrain' )
    { }
    if ( p.type == 'plane' )
    { shape = new Ammo.btStaticPlaneShape( new Ammo.btVector3( ...p.shape ), 1 ); }

    // 1 compounds
    if ( p.type == 'compound' )
    { }
    // handle shape type -- end

    let startTransform  = new Ammo.btTransform();
    startTransform.setIdentity( );

    let mass = p.mass || 0;
    let isDynamic = ( mass !== 0 );
    let intertia = new Ammo.btVector3( 0, 0, 0 );

    if ( isDynamic )
    { shape.calculateLocalInertia( mass, intertia ); }

    // set position
    let position;
    if ( p.hasOwnProperty( 'position' ) )
    {
      if ( !Array.isArray( p.position ) )
      { throw new Error( `position is not of type Array` ); }
      else if ( p.position.length == 3 )
      {
        position = new THREE.Vector3( ...p.position );
        startTransform.setOrigin( new Ammo.btVector3( ...p.position ) );
      }
      else
      { throw new Error( `position does not contain 3 elements` ); return; }
    }
    else
    { position = new THREE.Vector3( ); }

    // set rotation and quaternion
    let rotation;
    let quaternion;
    if ( p.hasOwnProperty( 'rotation' ) )
    {
      if ( !Array.isArray( p.rotation ) )
      { throw new Error( `rotation is not of type Array` ); }
      else if ( p.rotation.length == 3 )
      {
        rotation = new THREE.Euler( ...p.rotation );
        quaternion = new THREE.Quaternion( ).setFromEuler( rotation );
        startTransform.setRotation( new Ammo.btQuaternion( ...quaternion.toArray( ) ) );
      }
      else if ( p.rotation.length == 4 )
      {
        quaternion = new THREE.Quaternion( ...p.rotation );
        rotation = new THREE.Euler( ).setFromQuaternion( quaternion );
        startTransform.setRotation( new Ammo.btQuaternion( ...quaternion.toArray( ) ) );
      }
      else
      { throw new Error( `position does not contain 3 or 4 elements` ); return; }
    }
    else
    { rotation = new THREE.Euler( ); quaternion = new THREE.Quaternion( ); }

    let motionState = new Ammo.btDefaultMotionState( startTransform );
    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, intertia );

    super( rbInfo );

    // this.setCollisionFlags( )
    this.uuid = UUID( ); // generates uuid for rigid body
    this.position = position; // stores Three.Vector3 of body position
    this.quaternion = quaternion; // stores Three.Quaternion of body quaternion
    this.rotation = rotation; // stores Three.Euler from body quaternion
    this.transform = new Ammo.btTransform( ); // stores transform buffer for physics system
    this.isDynamic = isDynamic;
    this.hasChanged = true;
  }
  /*
  applyForce ( f, o )
  {

  }
  */

  getTransform ( )
  {
    this.getMotionState( ).getWorldTransform( this.transform );
    this.transform.position = this.transform.getOrigin( );
    this.transform.quaternion = this.transform.getRotation( );

    this.position.set(
      this.transform.position.x( ),
      this.transform.position.y( ),
      this.transform.position.z( ),
    );

    this.quaternion.set(
      this.transform.quaternion.x( ),
      this.transform.quaternion.y( ),
      this.transform.quaternion.z( ),
      this.transform.quaternion.w( ),
    );

    this.rotation.setFromQuaternion( this.quaternion );

    if ( this.hasOwnProperty( 'boundGraphicsElement' ) )
    {
      this.boundGraphicsElement.position.copy( this.position );
      this.boundGraphicsElement.quaternion.copy( this.quaternion );
    }

    this.hasChanged = false;
    return this;
  }

  setTransform ( p ) // { position: [x,y,z], rotation: [x,y,z] || [x,y,z,w] }
  {
    this.transform = this.getCenterOfMassTransform( );

    if ( p.hasOwnProperty( 'position' ) )
    {
      if ( !Array.isArray( p.position ) )
      { throw new Error( `position is not of type Array` ); }
      else if ( p.position.length == 3 )
      { this.transform.setOrigin( new Ammo.btVector3( ...p.position ) ); }
      else
      { throw new Error( `position does not contain 3 elements` ); return; }
    }

    if ( p.hasOwnProperty( 'rotation' ) )
    {
      if ( !Array.isArray( p.rotation ) )
      { throw new Error( `rotation is not of type Array` ); }
      else if ( p.rotation.length == 3 )
      {
        this.transform.setRotation( new Ammo.btQuaternion(
          ...new THREE.Quaternion( ).setFromEuler( new THREE.Euler(
            ...p.rotation
          ) ).toArray( ) ) );
      }
      else if ( p.rotation.length == 4 )
      { this.transform.setRotation( new Ammo.btQuaternion( ...p.rotation ) ); }
      else
      { throw new Error( `position does not contain 3 or 4 elements` ); return; }
    }

    this.setCenterOfMassTransform( this.transform );

    if ( this.isDynamic )
    { this.setCenterOfMassTransform( this.transform ); }
    else
    { this.setMotionState( new Ammo.btDefaultMotionState( this.transform ) ); }

    this.hasChanged = true;
    return this;
  }
}

module.exports = PhysicsBody;
