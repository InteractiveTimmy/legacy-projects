"use strict";

class Game
{
  constructor ( element )
  {
    this.element = document.getElementById( element );

    this.renderer = new THREE.WebGLRenderer( { canvas:this.element, antialias:true } );
    this.scene = new THREE.Scene( );

    this.stats = new Stats( );
    this.stats.showPanel( 0 );
    document.body.appendChild( this.stats.dom );

    this.camera = new THREE.PerspectiveCamera( 75, 16/9, 0.001, 2000000 ); // TEMP: Remove this later
    this.input = new EventHandler( this.element );
    this.world = new OIMO.World( { worldscale: 1, info: false } );

    this.config = {};
    this.status = {};
  }

  update ( )
  { /* TODO */

    // TEMP BEGIN: Check for pointer locked, will run endlessly later
    if ( this.input.mouse.pointerLocked )
    { this.status.enabled = true; }
    else
    { this.status.enabled = false; }
    // TEMP END: Check for pointer locked, will run endlessly later

    if ( this.status.initialized && this.status.enabled )
    {
      this.stats.begin( );
      this.player.updatePlayer( );
      for ( let x in this.scene.children )
      {
        if ( this.scene.children[x].updateEntity )
        { this.scene.children[x].updateEntity( ); }
      }

      this.world.step();

      this.debug( );

      // this.player.updateCamera( );
    } else {
      this.stats.end( );
    }
  }

  render ( )
  { /* TODO */
    this.renderer.render( this.scene, this.camera );
  }

  init ( )
  {

    this.loadConfig( ).then( ( response ) => {

      this.config = JSON.parse( response );

      console.log( this.camera );

      this.renderer.setSize( this.config.menu.camera.width, this.config.menu.camera.height );

      // TEMP -- Begin
      this.player = new Player( {
        "name":"playerA",
        "camera":
        {
          "fov":this.config.playerA.camera.fov,
          "aspect":this.config.playerA.camera.width / this.config.playerA.camera.height,
          "near":this.config.playerA.camera.near,
          "far":this.config.playerA.camera.far
        }
      } );

      this.camera = this.player.camera;

      this.input.assignControls( this.player, this.config.playerA.controls );

      // Floor -- Begin
      let floorSize = 10;

      this.platform = {};
      this.platform.floor = new Entity( {
        "three":
        {
          "scene":this.scene,
          "geometry": new THREE.CubeGeometry( floorSize, floorSize / 10, floorSize ),
          "material": new THREE.MeshPhongMaterial( { color:0x555555 , side:THREE.DoubleSide, transparent: true, opacity: 0.25 } ),
        },
        "oimo":
        {
          "world":this.world,
          "type":"box",
          "size":[ floorSize, floorSize / 10, floorSize ],
          "pos":[ 0, -1 * floorSize * 0.55, 0 ],
          "physicsed":false
        }
      } );

      this.platform.gridHelperB = new THREE.GridHelper( floorSize, floorSize * 2, 0x888888, 0x444444 );
      this.platform.gridHelperB.position.y = -1 * floorSize * 0.5;
      this.scene.add( this.platform.gridHelperB );

      this.platform.gridHelperA = new THREE.GridHelper( floorSize, floorSize, 0x888888, 0x666666 );
      this.platform.gridHelperA.position.y = -1 * floorSize * 0.5;
      this.scene.add( this.platform.gridHelperA );
      // Floor -- End

      /*
      let capSpecs = generateCapsuleGeometry( 0.05, 0.5 );
      capSpecs.oimo.physicsed = true;
      capSpecs.oimo.world = this.world;
      capSpecs.oimo.rotation = [0, 0, 45];
      let cap = new Entity( {
        "three":{
          "scene":this.scene,
          "geometry":capSpecs.mesh,
          "material":new THREE.MeshPhongMaterial( { color:0x000099, wireframe:true } )
        },
        "oimo":capSpecs.oimo
      } );
      */

      this.skeleton = new Skeleton( {
        "resource":'/assets/models/skeletons/humanoid.json',
        "scene":this.scene,
        "world":this.world
      } );

      /*
      let capSpecs = generateCapsuleGeometry( 2, 6 );
      capSpecs.oimo.physicsed = true;
      let cap = new Entity( {
        "three":{
          "geometry":capSpecs.mesh,
          "material":new THREE.MeshPhongMaterial( { color:0x000099, wireframe:true } )
        },
        "oimo":capSpecs.oimo,
        "world":{
          "position":[ 0, 0, 0 ],
          "rotation":[ 0, 0, 0 ]
        }
      } );

      // cap.generateOimo( this.world );
      // this.scene.add( cap );

      let testBox = [];
      for ( let x = 0; x < 5; x++ )
      {
        testBox.push( new Entity( {
          "three":
          {
            "geometry": new THREE.CubeGeometry( 2, 2, 2 ),
            "material": new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( "assets/textures/crate.png" ), side:THREE.DoubleSide } ),
          },
          "oimo":
          {
            "type":"box",
            "size":[ 2, 2, 2 ],
            "physicsed":true
          },
          "world":
          {
            "position":[ Math.random() * 10 - 5, 10, Math.random() * 10 - 5 ],
            "rotation":[ 0, 0, 0 ]
          }
        } ) );
        testBox[x].generateOimo( this.world );
        this.scene.add( testBox[x] );
      }

      // testBox.oimo.position.set( 0, 20, -30 );
      // this.scene.add( testBox );

      let floorSize = 20;

      this.platform = {};

      this.platform.floor = new Entity( {
        "three":
        {
          "geometry": new THREE.CubeGeometry( floorSize, floorSize / 10, floorSize ),
          "material": new THREE.MeshPhongMaterial( { color:0x555555 , side:THREE.DoubleSide, transparent: true, opacity: 0.25 } ),
        },
        "oimo":
        {
          "type":"box",
          "size":[ floorSize, floorSize / 10, floorSize ],
          "physicsed":false
        },
        "world":
        {
          "position":[ 0, -1 * floorSize * 0.55, 0 ],
          "rotation":[ 0, 0, 0 ]
        }
      } );
      this.platform.floor.generateOimo( this.world );
      this.scene.add( this.platform.floor );

      let testThing = new THREE.Mesh(
        new THREE.CubeGeometry( 2, 2, 2 ),
        new THREE.MeshBasicMaterial( { wireframe:true, side:THREE.DoubleSide } )
      );

      let oimoObject =
      {
        type:'box', // type of shape : sphere, box, cylinder
        size:[ 2, 2, 2 ], // size of shape
        pos:[ 0, 0, 0 ], // start position in degree
        rot:[ 0, 0, 0 ], // start rotation in degree
        move:true, // dynamic or statique
        belongsTo: 1, // The bits of the collision groups to which the shape belongs.
        collidesWith: 0xffffffff // The bits of the collision groups with which the shape collides.
      };

      let finalObject = this.world.add( oimoObject );
      finalObject.connectMesh( testThing );
      testThing.material.wireframe = false;
      console.log( finalObject );
      this.scene.add( testThing );

      /*
      let testCapsule = new Character( {
        "world":this.world,
        "height":2,
        "width":0.5
      } );

      testCapsule.oimo.position.set( 0, 0, -3 );
      this.scene.add( testCapsule );
      */

      let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      this.scene.add( directionalLight );

      let ambientLight = new THREE.AmbientLight( 0x777777 ); // soft white light
      this.scene.add( ambientLight );

      /*
      this.platform.gridHelperB = new THREE.GridHelper( floorSize, floorSize * 2, 0x888888, 0x444444 );
      this.platform.gridHelperB.position.y = -1 * floorSize * 0.5;
      this.scene.add( this.platform.gridHelperB );

      this.platform.gridHelperA = new THREE.GridHelper( floorSize, floorSize, 0x888888, 0x666666 );
      this.platform.gridHelperA.position.y = -1 * floorSize * 0.5;
      this.scene.add( this.platform.gridHelperA );
      */

      // Add Sky
      this.sky = new THREE.Sky();
      this.sky.scale.setScalar( 450000 );
      this.scene.add( this.sky );

      // Add Sun Helper
      this.sunSphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 20000, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
      );
      this.sunSphere.position.y = - 700000;
      this.sunSphere.visible = false;
      this.scene.add( this.sunSphere );

      console.log( this.world );

      /// GUI


      var effectController  = {
        inclination: 0.49, // elevation / inclination
        azimuth: 0.25, // Facing front,
        distance: 1000
      };

      var theta = Math.PI * ( effectController.inclination - 0.5 );
      var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

      this.sunSphere.position.x = effectController.distance * Math.cos( phi );
      this.sunSphere.position.y = effectController.distance * Math.sin( phi ) * Math.sin( theta );
      this.sunSphere.position.z = effectController.distance * Math.sin( phi ) * Math.cos( theta );

      this.sunSphere.visible = effectController.sun;

      this.sky.material.uniforms.sunPosition.value.copy( this.sunSphere.position );

      console.log( this.sky );
      console.log( 'camera', this.camera );

      // TEMP -- End

      this.status.initialized = true;

    } ).catch( ( error ) => {
      console.log( error );
    } );

  }

  loadScene ( )
  { /* TODO */ }

  loadConfig ( )
  {
    return new Promise( (resolve, reject) => {
      ajax.get('/config.json', '', function( response ) {
        if ( response.status.toString()[0] == 2 )
        { resolve( response.responseText ); }
        else
        {
          ajax.get('/config-default.json', '', function( response ) {
            if ( response.status.toString()[0] == 2 )
            { resolve( response.responseText ) }
            else { reject( 'config.json and config-default.json not found' ); }
          });
        }
      } );
    } );
  } /* TODO */

  debug ( )
  {
    let debugString = '-- Debug --';
    debugString += `<br />Enabled: ${ this.status.enabled  }`;
    document.getElementById("debug").innerHTML = debugString;
  }

}
