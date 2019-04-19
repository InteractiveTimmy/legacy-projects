'use strict';

class ArcConflict
{
  constructor ( p ) // { core: @Arc.Core }
  {
    this.core = p.core;

    this.stats =
    {
      "ready": false,
      "running": false
    };

    // TEMP testing -- begin
    // NOTE: @Core.PhysicsSystem -- complete
    this.entityA = new this.core.Entity( );
    this.entityB = new this.core.Entity( );
    this.entityC = new this.core.Entity( );
    this.entityD = new this.core.Entity( );
    this.entityE = new this.core.Entity( );
    this.chunk = new this.core.Chunk( { "gravity": [ 0, -10, 0 ] } );
    this.world = new this.core.World( );

    this.view = new this.core.View( { "x": 0, "y": 0, "w": 1, "h": 1 } );
    this.view.position.set( 0, 16, 64 );
    this.view.rotation.y = Math.PI / 4;
    this.view.rotation.x = -Math.PI / 6;
    this.core.systems.output.loadView( this.view );

    this.entities = [ ];
    this.meshes = [ ];
    this.physicsBodies = [ ];
    this.material = new this.core.Material( 'MeshBasic', { "color": 0x555555 } );
    this.geometry = new this.core.Geometry( 'SphereBuffer', [ 1, 16, 16 ] );
    for ( let x = 0; x < 1024; x++ )
    {
      this.entities.push( new this.core.Entity( ) );
      this.meshes.push( new this.core.Mesh( { "geometry": this.geometry, /* "material": ( this.entities.length == 1 ) ? new this.core.Material( 'MeshBasic', { "color": 0x00bbff } ) : this.material */ } ) );
      this.physicsBodies.push( new this.core.PhysicsBody( {
        "type": "sphere",
        "shape": [ 1 ],
        "mass": 1,
        "position": [ Math.random( ) * 20 - 10, Math.random( ) * 20 + 10, Math.random( ) * 20 - 10 ],
        "rotation": [ 0, 0, 0, 1 ]
      } ) );

      // this.physicsBodies[this.physicsBodies.length - 1].setRestitution( 1.0 );

      this.entities[this.entities.length - 1].loadElement( 'physics', this.physicsBodies[this.physicsBodies.length - 1] );
      this.entities[this.entities.length - 1].loadElement( 'graphics', this.meshes[this.physicsBodies.length - 1] );
      this.entities[this.entities.length - 1].bindElements( this.physicsBodies[this.physicsBodies.length - 1], this.meshes[this.physicsBodies.length - 1] );
      this.chunk.loadEntity( this.entities[this.entities.length - 1] );
    }

    this.geometryA = new this.core.Geometry( 'SphereBuffer', [ 1, 32, 32 ] );
    this.geometryB = new this.core.Geometry( 'BoxBuffer', [ 512, 2, 128 ] );
    this.geometryC = new this.core.Geometry( 'BoxBuffer', [ 512, 8, 8 ] );
    this.geometryD = new this.core.Geometry( 'BoxBuffer', [ 8, 8, 120 ] );
    this.materialB = new this.core.Material( 'MeshBasic', { "color": 0x999999 } );
    this.materialC = new this.core.Material( 'MeshBasic', { "color": 0x00aaff } );
    this.materialD = new this.core.Material( 'MeshBasic', { "color": 0xffaa00 } );
    this.meshA = new this.core.Mesh( { "geometry": this.geometryA, "material": this.materialA } );
    this.meshB = new this.core.Mesh( { "geometry": this.geometryB, "material": this.materialB } );
    this.meshC = new this.core.Mesh( { "geometry": this.geometryC, "material": this.materialC } );
    this.meshD = new this.core.Mesh( { "geometry": this.geometryC, "material": this.materialC } );
    this.meshE = new this.core.Mesh( { "geometry": this.geometryD, "material": this.materialD } );

    this.physicsBodyA = new this.core.PhysicsBody( {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 1
    } );
    this.physicsBodyB = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 256, 1, 64 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ 0, -20, 0 ],
      "mass": 0
    } );
    this.physicsBodyC = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 256, 4, 4 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ 0, -15, 60 ],
      "mass": 0
    } );
    this.physicsBodyD = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 256, 4, 4 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ 0, -15, -60 ],
      "mass": 0
    } );
    this.physicsBodyE = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 4, 4, 60 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ -120, -60, 0 ],
      "mass": 0
    } );

    // this.physicsbodyB.setTransform( )

    this.entityA.loadElement( 'physics', this.physicsBodyA );
    this.entityA.loadElement( 'graphics', this.meshA );
    this.entityB.loadElement( 'physics', this.physicsBodyB );
    this.entityB.loadElement( 'graphics', this.meshB );
    this.entityC.loadElement( 'physics', this.physicsBodyC );
    this.entityC.loadElement( 'graphics', this.meshC );
    this.entityD.loadElement( 'physics', this.physicsBodyD );
    this.entityD.loadElement( 'graphics', this.meshD );
    this.entityE.loadElement( 'physics', this.physicsBodyE );
    this.entityE.loadElement( 'graphics', this.meshE );

    this.entityA.bindElements( this.physicsBodyA, this.meshA );
    this.entityB.bindElements( this.physicsBodyB, this.meshB );
    this.entityC.bindElements( this.physicsBodyC, this.meshC );
    this.entityD.bindElements( this.physicsBodyD, this.meshD );
    this.entityE.bindElements( this.physicsBodyE, this.meshE );

    console.log( ...new THREE.Quaternion( ).setFromEuler( new THREE.Euler( 0, 0, 0 ) ).toArray( ) )

    // this.physicsBodyB.setTransform( { "position": [ 0, -20, 0 ], "rotation": [ 0, 0, Math.PI / 10 ] } );
    // this.physicsBodyA.setTransform( { "position": [ -10, 20, -10 ] } );

    // console.log( this.physicsBodyB.rotation );

    /*
    this.entity.loadElement( 'Physics', {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 1,
      "position": [ 1, 1, -5 ],
      "rotation": [ 0, 0, 0, 1 ]
    } ).bindGraphicsElement( this.meshA );
    */
    this.chunk.loadEntity( this.entityA );
    this.chunk.loadEntity( this.entityB );
    this.chunk.loadEntity( this.entityC );
    this.chunk.loadEntity( this.entityD );
    this.chunk.loadEntity( this.entityE );
    this.world.loadChunks( [ this.chunk ] );
    this.core.loadWorld( this.world );
    this.world.activateChunks( [ this.chunk ] );
    // this.graphicsChunk.loadGraphicsElements( [ testObject ] );

    /*
    this.physicsChunk = new this.core.PhysicsChunk( { "gravity": [ 0, -10, 0 ] } );

    this.entity = new this.core.Entity( );
    this.entity.loadElement( 'Physics', {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 0,
      "position": [ 0, -5, -3 ],
      "rotation": [ 0, 0, 0, 1 ]
    } ).bindMesh( new this.core.Mesh( {
      "geometry": new this.core.Geometry( 'BoxBuffer', [ 1, 1, 1 ] ),
      "material": new this.core.Material( 'MeshBasic', { "color": 0xffffff } )
    } ) );

    this.physicsChunk.loadEntity( this.entity.rigidBodies[0] );

    this.entity.rigidBodies[0].setTransform( {
      "position": new THREE.Vector3( 1, 1, 1 ),
      "rotation": new THREE.Euler( 1, 1, 1 )
    } );
    console.log( this.physicsChunk );
    */
    // this.core.systems.physics.chunk.dynamicsWorld.addRigidBody( this.entity.rigidBodies[0] );
    // this.core.systems.physics.chunk.dynamics.push( this.entity.rigidBodies[0] );
    /*
    this.entity = new this.core.Entity( );
    this.entity.loadElement( 'Physics', {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 0,
      "position": [ 0, -5, -3 ],
      "rotation": [ 0, 0, 0, 1 ]
    } ).setTransform( {
      "rotation": new THREE.Euler( 1, 1, 1 ),
      "position": new THREE.Vector3( 1, 5, 1 )
    } ).bindMesh( new this.core.Mesh( {
      "geometry": new this.core.Geometry( 'BoxBuffer', [ 1, 1, 1 ] ),
      "material": new this.core.Material( 'MeshBasic', { "color": 0xffffff } )
    } ) );
    this.core.systems.physics.chunk.dynamicsWorld.addRigidBody( this.entity.rigidBodies[0] );
    this.core.systems.physics.chunk.dynamics.push( this.entity.rigidBodies[0] );
    */
    /*
    this.world = new this.core.World( );
    this.core.systems.output.loadWorld( this.world );

    this.view = new this.core.View( { "x": 0, "y": 0, "w": 1, "h": 1 } );
    this.core.systems.output.loadView( this.view );
    */
    /*
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry( 64, 64, 1, 1 ),
      new THREE.MeshBasicMaterial( { "color": 0x555555, "side": THREE.DoubleSide } )
    );
    this.floor.position.set( 0, -4, 0 );
    this.floor.rotation.x = Math.PI / 2;
    // this.chunk.loadEntity( this.floor );

    this.object = new THREE.Mesh(
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { "color": 0xaaaaaa } )
    );
    this.object.position.set( 0, 0, -5 );
    // this.chunk.loadEntity( this.object );
    // TEMP testing -- end
    */

    // handle core frame request
    this.core.on( 'update', ( e ) => { this.step( e ); } );

    console.log( this.chunk.physicsChunk.dynamicsWorld );
    this.force = new Ammo.btVector3( 0, -20, 0 );
    this.center = new Ammo.btVector3( );

    this.yrot = -Math.PI;

    this.core.start( );
  }

  step ( dt )
  {
    if ( this.physicsBodyB.hasChanged )
    { console.log( 'i changed' ); }
    for ( let c of this.physicsBodies )
    {
      // c.applyForce( this.force, this.center );
      if ( c.position.y < -150 )
      { c.setTransform( { "position": [ 0, 20, 0 ] } ) }
    }
    // this.physicsBodies[0].applyForce( new Ammo.btVector3( 0, 10, 0 ) );
    // this.physicsBodyB.getTransform( );
  }
}

module.exports = ArcConflict;
