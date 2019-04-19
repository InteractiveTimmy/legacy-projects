'use strict';

class PhysicsChunk
{
  constructor ( p = { } ) // { gravity: [x,y,z] }
  {
    this.stats =
    {
      "isActive": false
    };

    this.uuid = UUID( );

    // set up instance of physics chunk
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration( );
    let dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    let overlappingPairCache = new Ammo.btDbvtBroadphase( );
    let solver = new Ammo.btSequentialImpulseConstraintSolver( );

    // initialize Ammo world
    this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

    // generate gravity
    if ( p.hasOwnProperty( 'gravity' ) )
    { this.dynamicsWorld.setGravity( new Ammo.btVector3( ...p.gravity ) ); }

    this.children = [ ]; // holds complete list of children
  }

  activate ( )
  {
    this.stats.isActive = true;
  }

  deactivate ( )
  {
    this.stats.isActive = false;
  }

  loadPhysicsElements ( p ) // [ ...@Ammo.btRigidBody ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length > 0 )
      { throw new Error( `element "${o.uuid}" already exists in PhysicsChunk ${this.uuid} children` ); }
      else if ( o instanceof Ammo.btRigidBody )
      { this.children.push( o ); this.dynamicsWorld.addRigidBody( o ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Ammo.btRigidBody` ); }
    }
    return this;
  }

  unloadPhysicsElement ( p ) // [ ...@Ammo.btRigidBody ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length < 1 )
      { throw new Error( `element "${o.uuid}" doesn't exists in PhysicsChunk ${this.uuid} children` ); }
      else if ( o instanceof THREE.Object3D )
      { this.children = this.children.filter( c => o.uuid != c.uuid ); Ammo.destroy( o ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Three.Object3D` ); }
    }
    return this;
  }

  step ( dt )
  {
    this.dynamicsWorld.stepSimulation( dt / 1000, 10 );
    /*
    let manifoldNum = this.dynamicsWorld.getDispatcher( ).getNumManifolds( );

    for ( let x = 0; x < manifoldNum; x++ )
    {
      let contactManifold = this.dynamicsWorld.getDispatcher( ).getManifoldByIndexInternal( x );

      let pointA = contactManifold.getContactPoint( ).get_m_localPointA( );
      let arrPointA = [ pointA.x( ), pointA.y( ), pointA.z( ) ];
      let bodyA = contactManifold.getBody0( );

      let pointB = contactManifold.getContactPoint( ).get_m_localPointB( );
      let arrPointB = [ pointB.x( ), pointB.y( ), pointB.z( ) ];
      let bodyB = contactManifold.getBody1( );
      // bodyB.applyImpulse( new Ammo.btVector3( 0, 10, 0 ), new Ammo.btVector3( ) );
      // console.log( bodyB );
    }
    */
    for ( let c of this.children )
    {
      if ( c.isDynamic || c.hasChanged )
      { c.getTransform( ); }
    }
  }
}

module.exports = PhysicsChunk;
