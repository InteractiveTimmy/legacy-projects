'use strict';

class Graphics
{
  constructor ( element )
  {

    this.name = `GRAPHICS-${generateUUID( )}`;

    this.element = document.getElementById( element );

    this.renderer = new THREE.WebGLRenderer( { canvas:this.element, antialias:true } );
    this.scene = new THREE.Scene( );
    this.camera = new THREE.PerspectiveCamera( 60, 16/9, 0.001, 2000000 );

    this.jsonLoader = new THREE.JSONLoader( );

    this.stats = new Stats( );
    this.stats.showPanel( 0 );
    document.body.appendChild( this.stats.dom );

    this.renderer.setSize( 800, 450 );

    /* TEMP: Testing WebGL Loads */
    this.loadJSON( 'assets/models/leg-lower.json').then( ( result ) => {
      console.log( result );
      this.scene.add( new THREE.Mesh( result[0], new THREE.MeshBasicMaterial( { color:0x999999, wireframe:true } ) ) );
    } ).catch( ( error ) => {
      console.log( error );
    } );

    this.generateRandomGeometry( );

  }

  loadJSON ( myResource ) { return new Promise( (resolve, reject) => {
    this.jsonLoader.load(
      myResource,
      function ( geo, mat )
      { resolve( [ geo, mat ] ); }
    )
  } ); }

  generateRandomGeometry ( )
  {
    let cubeGeo = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    let mergedGeometry = new THREE.Geometry( );
    mergedGeometry.materials = [];
    let myOffset = new THREE.Vector3( );

    let matCount = 8;
    let matIndex;
    let mat = [];

    for ( let x = 0; x < matCount; x++ )
    {
      mat.push( new THREE.MeshBasicMaterial( { color:`rgb( ${ Math.floor( Math.random( ) * 255 ) },  ${ Math.floor( Math.random( ) * 255 ) },  ${ Math.floor( Math.random( ) * 255 ) } )` } ) );
    }

    for( let x = 0; x < 1; x++ )
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

  update ( )
  {
    this.stats.begin( );
    this.getEntities( );
    this.renderer.render( this.scene, this.camera );
    this.stats.end( );
  }

  processMessage ( myMessage )
  {
    switch ( myMessage.command )
    {
      case 'updateMeshes':
        this.updateMeshes( myMessage.message );
        break;

      case 'generateModel':
        this.generateModel( myMessage.message );
        break;

      case 'updateCamera':
        this.camera.rotation.copy( myMessage.message.rotation );
        this.camera.position.copy( myMessage.message.position );
        break;

      default:
        // postMessage( 'Command Not Found' );
    }
  }

  generateGeometryObject ( myGeometry )
  {
    switch ( myGeometry.type )
    {
      case 'box':
        return new THREE.BoxGeometry( myGeometry.dimensions[0], myGeometry.dimensions[1], myGeometry.dimensions[2])
        break;

      default:
        break;
    }
  }

  generateMaterialObject ( myMaterial )
  {
    switch ( myMaterial.type )
    {
      case 'basic':
        return new THREE.MeshBasicMaterial( myMaterial.params );
        break;

      default:
        break;
    }
  }

  generateModel ( myMesh )
  {
    let meshObject = new THREE.Mesh(
      this.generateGeometryObject( myMesh.geometry ),
      this.generateMaterialObject( myMesh.material )
    );
    meshObject.name = myMesh.name;
    this.scene.add( meshObject );
  }

  getEntities ( )
  {
    engine.postMessage( { "to":"engine", "from":this.name, "command":"getEntities" } );
  }

  updateMeshes ( myEntities )
  {
    let myMesh;
    for ( let x in myEntities )
    {
      myMesh = this.getMeshByName( myEntities[x].mesh );
      if ( myMesh )
      {
        myMesh.position.copy( myEntities[x].position );
        myMesh.quaternion.copy( myEntities[x].quaternion );
      }
    }
    // console.log( myEntities, this.scene.children );
  }

  getMeshByName ( myName )
  {
    for ( let x in this.scene.children )
    {
      if ( this.scene.children[x].name == myName )
      { return this.scene.children[x]; }
    }
  }

}
