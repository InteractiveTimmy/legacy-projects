'use strict';

const Vector3 = require( './../math/vector-three.js' );

class PhysicsSystem
{
  constructor ( )
  {
    this.uuid = UUID( );
    this.stats = { };
    // set up instance of physics chunk
    let collisionConfiguration = new AMMO.btDefaultCollisionConfiguration( );
    let dispatcher = new AMMO.btCollisionDispatcher( collisionConfiguration );
    let overlappingPairCache = new AMMO.btDbvtBroadphase( );
    let solver = new AMMO.btSequentialImpulseConstraintSolver( );

    // initialize AMMO world
    this.space = new AMMO.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

    // collision handler
    this.collisions = { };
    this.collisions.dispatcher = dispatcher;
    this.collisions.numberOfManifolds = 0;
    this.collisions.manifold = new AMMO.btPersistentManifold( );

    this.children = [ ]; // holds complete list of children

    this.stats.ready = true;
  }

  setGravity ( g ) // @ArcCore.Vector3
  { this.space.setGravity( g.physics ); return this; }

  handleCollision ( m )
  {
    this.collisions.bodyA = m.getBody0( );
    this.collisions.bodyB = m.getBody1( );

    if ( this.children[this.collisions.bodyA.getUserPointer( ).ptr].hasOwnProperty( 'events' ) || this.children[this.collisions.bodyB.getUserPointer( ).ptr].hasOwnProperty( 'events' ) )
    {
      this.collisions.manifoldPoint = m.getContactPoint( );
      this.collisions.pointALocal = this.collisions.manifoldPoint.get_m_localPointA( );
      this.collisions.pointBLocal = this.collisions.manifoldPoint.get_m_localPointB( );
      this.collisions.pointAWorld = this.collisions.manifoldPoint.get_m_positionWorldOnA( );
      this.collisions.pointBWorld = this.collisions.manifoldPoint.get_m_positionWorldOnB( );

      this.children[this.collisions.bodyA.getUserPointer( ).ptr].emit( 'contact', {
        "localPointSelf": new Vector3(
          this.collisions.pointALocal.x( ),
          this.collisions.pointALocal.y( ),
          this.collisions.pointALocal.z( ),
        ),
        "worldPointSelf": new Vector3(
          this.collisions.pointAWorld.x( ),
          this.collisions.pointAWorld.y( ),
          this.collisions.pointAWorld.z( ),
        ),
        "localPointOther": new Vector3(
          this.collisions.pointBLocal.x( ),
          this.collisions.pointBLocal.y( ),
          this.collisions.pointBLocal.z( ),
        ),
        "worldPointOther": new Vector3(
          this.collisions.pointBWorld.x( ),
          this.collisions.pointBWorld.y( ),
          this.collisions.pointBWorld.z( ),
        ),
        "force": this.collisions.manifoldPoint.getAppliedImpulse( ),
        "Other": this.children[this.collisions.bodyB.getUserPointer( ).ptr]
      } );

      this.children[this.collisions.bodyB.getUserPointer( ).ptr].emit( 'contact', {
        "localPointSelf": new Vector3(
          this.collisions.pointBLocal.x( ),
          this.collisions.pointBLocal.y( ),
          this.collisions.pointBLocal.z( ),
        ),
        "worldPointSelf": new Vector3(
          this.collisions.pointBWorld.x( ),
          this.collisions.pointBWorld.y( ),
          this.collisions.pointBWorld.z( ),
        ),
        "localPointOther": new Vector3(
          this.collisions.pointALocal.x( ),
          this.collisions.pointALocal.y( ),
          this.collisions.pointALocal.z( ),
        ),
        "worldPointOther": new Vector3(
          this.collisions.pointAWorld.x( ),
          this.collisions.pointAWorld.y( ),
          this.collisions.pointAWorld.z( ),
        ),
        "force": this.collisions.manifoldPoint.getAppliedImpulse( ),
        "Other": this.children[this.collisions.bodyA.getUserPointer( ).ptr]
      } );
    }
  }

  loadEntities ( e = [ ] )
  {
    for ( let i of e )
    {
      console.log( i.events );
      this.children.push( i );
      this.space.addRigidBody( i );
      i.setUserPointer( this.children.length - 1 );
    }
  }

  unloadEntities ( e = [ ] )
  {
    for ( let i of e )
    {
      this.children = this.children.filter( c => i.uuid != c.uuid );
      this.space.removeRigidBody( i );
    }
    for ( let c of this.children )
    { c.setUserPointer( this.children.indexOf( c ) ); }
  }

  start ( )
  { this.stats.running = true; this.step( ); }

  stop ( )
  { this.stats.running = false; }

  step ( )
  {
    this.stats.dt = ( this.stats.hasOwnProperty( 'dtl' ) ? performance.now( ) - this.stats.dtl : 0 );
    this.stats.dtl = performance.now( );

    this.space.stepSimulation( this.stats.dt / 1000, 10 );

    this.collisions.numberOfManifolds = this.collisions.dispatcher.getNumManifolds( );

    for ( let mi = 0; mi < this.collisions.numberOfManifolds; mi++ )
    { this.handleCollision( this.collisions.dispatcher.getManifoldByIndexInternal( mi ) ); }

    if ( this.stats.running && this.stats.ready )
    { setTimeout( ( ) => { this.step( ); }, 0 ) }
  }
}

module.exports = PhysicsSystem;
