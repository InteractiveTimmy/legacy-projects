'use strict';

class ArcImpact
{
  constructor ( p ) // { core: @ArcCore }
  {
    this.core = p.core;

    // NOTE tests -- begin
    // this.core.tests.Math( this.core ); // tests math objects
    // NOTE tests -- end

    // initialize systems
    this.systems =
    {
      "output": new this.core.OutputSystem( ),
      "physics": new this.core.PhysicsSystem( ).setGravity( new this.core.Vector3( 0, -10, 0 ) )
    };

    // configure output system
    this.renderer = new this.core.Renderer( );
    this.views = [
      new this.core.View( { "viewPort": { "x": 0, "y": 0, "w": 0.5, "h": 0.5 } } ),
      new this.core.View( { "viewPort": { "x": 0.5, "y": 0, "w": 0.5, "h": 0.5 } } ),
      new this.core.View( { "viewPort": { "x": 0, "y": 0.5, "w": 0.5, "h": 0.5 } } ),
      new this.core.View( { "viewPort": { "x": 0.5, "y": 0.5, "w": 0.5, "h": 0.5 } } )
    ];

    for ( let v of this.views )
    { v.position.set( 0, 5, 20 ); }
    this.renderer.loadView( this.views );
    this.systems.output.setRenderer( this.renderer );

    let mesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( )
    );
    this.systems.output.space.add( mesh );

    // load systems
    this.core.loadSystems( [ this.systems.output, this.systems.physics ] );
    // this.core.unloadSystems( [ this.systems.output, this.systems.physics ] ); // remove systems

    this.entity = new this.core.Entity( );
    this.vector3 = new this.core.Vector3( 0, 5, -5 );
    this.quaternion = new this.core.Quaternion( 0, 0, 0, 1 );
    this.transform = new this.core.Transform( this.vector3, this.quaternion );

    this.floorRigidBodyElement = new this.core.RigidBody(
      new this.core.PhysicsShape( 'Box', new this.core.Vector3( 16, 2, 16 ).physics ),
      new this.core.Transform( new this.core.Vector3( 0, -8, 0 ), new this.core.Quaternion( ) ),
      0
    );
    this.floorMesh = new this.core.Mesh(
      new this.core.Geometry( 'BoxBuffer', [ 32, 4, 32 ] ),
      new this.core.Material( 'MeshBasic', { "color": 0x777777 } ),
      this.floorRigidBodyElement.transform
    );

    this.floorRigidBodyElement.setRestitution( 1 );

    this.physicsShapeSpecs = new this.core.Vector3( 0.5, 0.5, 0.5 );
    this.physicsShape = new this.core.PhysicsShape( 'Box', this.physicsShapeSpecs.physics );
    this.rigidBodyElement = new this.core.RigidBody( this.physicsShape, this.transform, 1 );

    this.rigidBodyElement.setRestitution( 1 );

    this.geometry = new this.core.Geometry( 'BoxBuffer', [ 1, 1, 1 ] );
    this.material = new this.core.Material( 'MeshBasic', { "color": 0xaaaaaa } );
    this.mesh = new this.core.Mesh( this.geometry, this.material, this.transform );

    let spriteTransform;
    let spriteShape = new this.core.PhysicsShape( 'Sphere', 0.5 );
    let spriteMaterial = new this.core.Material( 'Sprite', {
      "map": new THREE.TextureLoader( ).load( './assets/sprite.png' ),
      "color": 0xffffff
    } );
    this.spriteMeshes = [ ];
    this.spriteElements = [ ];
    for ( let x = 0; x < 1024; x++ )
    {
      spriteTransform = new this.core.Transform(
        new this.core.Vector3( Math.random( ) * 10 - 5, Math.random( ) * 10 + 5, Math.random( ) * 10 - 15 ),
        new this.core.Quaternion( )
      );
      this.spriteElements.push( new this.core.RigidBody( spriteShape, spriteTransform, 1 ) );
      this.spriteMeshes.push( new this.core.Sprite( spriteMaterial, spriteTransform ) );
    }
    for ( let r of this.spriteElements )
    { r.setRestitution( 1 ); }
    this.systems.physics.loadEntities( this.spriteElements );
    this.systems.output.loadEntities( this.spriteMeshes );

    this.spriteTransform = new this.core.Transform(
      new this.core.Vector3( 0, 0, -5 ),
      new this.core.Quaternion( )
    );
    this.spriteShape = new this.core.PhysicsShape( 'Sphere', 0.5 );
    this.spriteElement = new this.core.RigidBody( this.spriteShape, this.spriteTransform, 1 );
    this.spriteElement.setRestitution( 1 );

    this.spriteMaterial = new this.core.Material( 'Sprite', {
      "map": new THREE.TextureLoader( ).load( './assets/sprite.png' ),
      "color": 0xffffff
    } );
    this.spriteMesh = new this.core.Sprite( this.spriteMaterial, this.spriteTransform );
    this.spriteElement.health = 300;

    this.systems.physics.loadEntities( [ this.rigidBodyElement, this.floorRigidBodyElement, this.spriteElement ] );
    this.systems.output.loadEntities( [ this.mesh, this.floorMesh, this.spriteMesh ] );

    /*
    this.spriteElement.on( 'contact', ( e ) => {
      this.spriteElement.health -= e.force; console.log( this.spriteElement.health );
      if ( this.spriteElement.health < 0 )
      { this.systems.physics.unloadEntities( [ this.spriteElement ] ); this.systems.output.space.remove( this.spriteMesh ) }
    } );
    */

    this.core.start( );

    this.core.on( 'update', ( e ) => { this.step( e ); } );

    // this.core.start( );
  }

  step ( dt )
  {
    this.rigidBodyElement.getTransform( );
    this.spriteElement.getTransform( );
    for ( let e of this.spriteElements )
    { e.getTransform( ); }
    this.views[0].lookAt( this.transform.position.graphics );
    this.views[2].lookAt( this.spriteTransform.position.graphics );
  }
}

module.exports = ArcImpact;
