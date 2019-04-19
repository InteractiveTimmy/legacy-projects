'use strict';

const THREE = require( 'three' );

module.exports = class Graphics
{
  constructor ( params )
  {
    this.element = params.element;

    this.scene = new THREE.Scene( );

    this.renderer = new THREE.WebGLRenderer( { canvas:this.element, antialias:true } );
    this.renderer.setSize( params.config.renderer.width, params.config.renderer.height );
    this.renderer.config = params.config.renderer;

    this.camera = new THREE.PerspectiveCamera(
      params.config.camera.menu.fov,
      params.config.camera.menu.aspect.x / params.config.camera.menu.aspect.y,
      params.config.camera.menu.near,
      params.config.camera.menu.far
    );

    console.log( 'constructed', this );
    // this.generateRandomGeometry( 0, 1 );
  }

  addMesh ( p )
  {
    let meshObject;

    for ( let x in p )
    {
      meshObject = new THREE.Mesh(
        p[x].geometry,
        p[x].material
      );
      meshObject.name = p[x].name;

      if ( p[x].position )
      { meshObject.position.set( ...p[x].position ); }
      if ( p[x].rotation )
      { meshObject.rotation.set( ...p[x].rotation ); }

      this.scene.add( meshObject );
    }
  }

  removeMesh ( p )
  {
    this.scene.remove( this.scene.getObjectByName( p.name ) );
  }

  generateRandomGeometry ( geoCount = 10, matCount = 8 )
  {
    let cubeGeo = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    let mergedGeometry = new THREE.Geometry( );
    mergedGeometry.materials = [];
    let myOffset = new THREE.Vector3( );

    let matIndex;
    let mat = [];

    for ( let x = 0; x < matCount; x++ )
    {
      mat.push( new THREE.MeshBasicMaterial( { color:`rgb( ${ Math.floor( Math.random( ) * 255 ) },  ${ Math.floor( Math.random( ) * 255 ) },  ${ Math.floor( Math.random( ) * 255 ) } )` } ) );
    }

    for( let x = 0; x < geoCount; x++ )
    {
      myOffset = new THREE.Vector3( Math.random( ) * 3 -1.5, Math.random( ) * 3 + 2, Math.random( ) * 3 - 5 );
      cubeGeo = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
      matIndex = Math.floor( Math.random( ) * matCount );

      for ( let x in cubeGeo.faces )
      {
        cubeGeo.faces[x].materialIndex = matIndex;
      }

      for ( let x in cubeGeo.vertices )
      {
        cubeGeo.vertices[x].add( myOffset );
      }

      // console.log( x );

      mergedGeometry.merge( cubeGeo );
    }

    console.log( 'mergedGeometry', mergedGeometry );
    // cubes[x].position.set( Math.random( ) * 3 -1.5, Math.random( ) * 3 + 2, Math.random( ) * 3 - 5 );
    this.scene.add(  new THREE.Mesh(
      mergedGeometry,
      mat
    ) );
  }

  update ( )
  {
    this.renderer.render( this.scene, this.camera );
  }
}
