'use strict';

const THREE = require( 'three' );

module.exports = class Graphics
{
  constructor ( params )
  {

    console.log( params );
    this.name = params.name;
    this.element = document.getElementById( params.canvas );

    this.scene = new THREE.Scene( );

    this.renderer = new THREE.WebGLRenderer( { canvas:this.element, antialias:true } );
    this.renderer.setSize( params.renderer.width, params.renderer.height );
    this.renderer.config = params.renderer;

    this.camera = new THREE.PerspectiveCamera(
      params.camera.menu.fov,
      params.camera.menu.aspect[0] / params.camera.menu.aspect[1],
      params.camera.menu.near,
      params.camera.menu.far
    );
    this.camera.config = params.camera;

    /*
    let geometryType = 'BoxGeometry';

    let testMesh = new THREE.Mesh(
      new THREE[geometryType]( 10, 1, 10 ),
      new THREE.MeshBasicMaterial( { color:0x999999 } )
    );
    testMesh.position.set( 0, -1, 0 )

    this.scene.add( testMesh );
    */
    // this.generateRandomGeometry( 1000, 4 );

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

      console.log( x );

      mergedGeometry.merge( cubeGeo );
    }

    console.log( 'mergedGeometry', mergedGeometry );
    // cubes[x].position.set( Math.random( ) * 3 -1.5, Math.random( ) * 3 + 2, Math.random( ) * 3 - 5 );
    this.scene.add(  new THREE.Mesh(
      mergedGeometry,
      mat
    ) );
  }

  generateModel ( m )
  {
    if ( THREE[m.geometry.type] && THREE[m.material.type] )
    {
      let meshObject = new THREE.Mesh(
        new THREE[m.geometry.type]( ...m.geometry.params ),
        new THREE[m.material.type]( m.material.params )
      );
      meshObject.name = m.name;
      meshObject.position.copy( m.position );
      meshObject.quaternion.copy( m.quaternion );
      this.scene.add( meshObject );
    }
    else
    { console.log( 'generateModel( ) failed', m ); }
  }

  getEntityByName ( m )
  {
    for ( let x in this.scene.children )
    {
      if ( this.scene.children[x].name == m )
      { return this.scene.children[x].name }
    }
  }

  updateEntities ( m )
  {
    let childObject;
    for ( let x in m )
    {
      childObject = this.scene.getObjectByName( m[x].name )
      childObject.position.copy( m[x].position );
      childObject.quaternion.copy( m[x].quaternion );
    }
    /*
    for ( let x in this.scene.children )
    {
      for ( let y in m )
      {
        if ( this.scene.children[x].name == m[y].name )
        {
          // console.log( this.scene.getObjectByName( m[y].name ) );
          if ( this.scene.children[x].position != m[y].position )
          { this.scene.children[x].position.copy( m[y].position ); }
          if ( this.scene.children[x].quaternion != m[y].quaternion )
          { this.scene.children[x].quaternion.copy( m[y].quaternion ); }
        }
      }
    }
    */
  }

  updateCamera ( m )
  {
    // console.log( 'updateCamera', m );
    this.camera.position.copy( m.position );
    this.camera.rotation.copy( m.rotation );
  }

  update ( )
  {
    this.renderer.render( this.scene, this.camera );
  }

  processMessage ( m )
  {
    if ( this[m.command] )
    { this[m.command]( m.data ); }
    else
    { console.log( `Command Not Found`, m ); }
  }

}
