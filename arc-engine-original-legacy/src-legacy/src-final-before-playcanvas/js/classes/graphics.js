'use strict';

const THREE = require( 'three' );
// const OIMO = require( 'oimo' );
const UTILS = require ('./utils.js' )( );
console.log( UTILS.generateUUID( ) );

class Graphics
{
  constructor ( p )
  {
    this.config = p.config;
    this.element = p.element;

    this.renderer = new THREE.WebGLRenderer( { canvas:this.element, antialias:true } );
    this.renderer.setSize( this.config.renderer.width, this.config.renderer.height );

    this.camera = [];

    this.scene = new THREE.Scene( );

    // TEMP -- Start

    this.jsonLoader = new THREE.JSONLoader();

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    this.scene.add( directionalLight );

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add( light );

    this.initRandomGeometry( );

    let testMesh = new THREE.Mesh(
      new THREE.BoxGeometry( 2, 2, 2 ),
      new THREE.MeshPhongMaterial( { color:0x446688 } )
    );
    testMesh.position.set( 3, -6, 3 );

    // this.scene.add( testMesh );

    this.loadWorld( );

    // TEMP -- End

    console.log( this );
  }

  addCamera ( p )
  {
    let cameraObject;
    if ( p.specs )
    {
      cameraObject = new THREE.PerspectiveCamera(
        p.specs.fov,
        p.specs.aspect.x / p.specs.aspect.y,
        p.specs.near,
        p.specs.far
      );
    }
    else if ( p.camera )
    { cameraObject = p.camera; }
    else
    { throw 'parameters does not contain specs or camera'; }

    cameraObject.viewport = {};
    cameraObject.name = p.name;
    this.camera.push( cameraObject );
    this.updateViewPorts( );
  }

  updateViewPorts ( )
  {
    let renderObjectDimensions = this.renderer.getSize( );
    switch ( this.camera.length )
    {
      case 0:
        break;
      case 1:
        this.camera[0].viewport = {
          "x":0,
          "y":0,
          "width":renderObjectDimensions.width,
          "height":renderObjectDimensions.height
        };
        break;

      case 2:
        this.camera[0].viewport = {
          "x":renderObjectDimensions.width / 8,
          "y":0,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        this.camera[1].viewport = {
          "x":renderObjectDimensions.width / 8 * 3,
          "y":renderObjectDimensions.height / 2,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        break;

      case 3:
        this.camera[0].viewport = {
          "x":renderObjectDimensions.width / 4,
          "y":0,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        this.camera[1].viewport = {
          "x":0,
          "y":renderObjectDimensions.height / 2,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        this.camera[2].viewport = {
          "x":renderObjectDimensions.width / 2,
          "y":renderObjectDimensions.height / 2,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        break;

      case 4:
        this.camera[0].viewport = {
          "x":0,
          "y":0,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        this.camera[1].viewport = {
          "x":renderObjectDimensions.width / 2,
          "y":0,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        this.camera[2].viewport = {
          "x":0,
          "y":renderObjectDimensions.height / 2,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        this.camera[3].viewport = {
          "x":renderObjectDimensions.width / 2,
          "y":renderObjectDimensions.height / 2,
          "width":renderObjectDimensions.width / 2,
          "height":renderObjectDimensions.height / 2
        };
        break;
    }
  }

  update ( )
  {
    // this.camera[0].rotation.y += 0.005;

    for ( let x in this.camera )
    {
      // this.camera[x].rotation.y += 0.002 * ( x + 1 );
      this.renderer.setViewport(
        this.camera[x].viewport.x,
        this.camera[x].viewport.y,
        this.camera[x].viewport.width,
        this.camera[x].viewport.height
      );
      this.renderer.setScissor(
        this.camera[x].viewport.x,
        this.camera[x].viewport.y,
        this.camera[x].viewport.width,
        this.camera[x].viewport.height
      );
      this.renderer.setScissorTest( true );

      this.renderer.render( this.scene, this.camera[x] );
    }
  }

  loadJSON ( myResource ) { return new Promise( (resolve, reject) => {
    this.jsonLoader.load(
      myResource,
      function ( geo, mat )
      { resolve( [ geo, mat ] ); }
    )
  } ); }

  loadWorld ( )
  {
    this.loadJSON( '../../assets/models/worlds/test.json' ).then( ( r ) => {
      r[0].scale( 0.25, 0.25, 0.25 );
      r[0].translate( 0, -5, 0 );
      this.scene.add( new THREE.Mesh( r[0], r[1] ) );
    } );

    console.log( this.scene );
  }

  initRandomGeometry ( geoCount = 10, matCount = 8 )
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
      myOffset = new THREE.Vector3( Math.random( ) * 3 -1.5, Math.random( ) * 3 -1.5, Math.random( ) * 3 - 5 );
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
}

module.exports = function ( p )
{ return new Graphics( p ); }
