'use strict';

class Game
{
  constructor ( p )
  {
    this.count = 0;
    this.lastTime = new Date( ).getSeconds( );

    this.canvas = document.getElementById( p.canvas );
    this.app = new pc.Application( this.canvas, { } );
    this.app.start( );

    // Fill screen
    this.app.setCanvasFillMode( pc.FILLMODE_FILL_WINDOW );
    this.app.setCanvasResolution( pc.RESOLUTION_AUTO );

    // Set scene
    this.app.scene.ambientLight = new pc.Color( 0.2, 0.2, 0.2 );

    // Set gravity

    // Auto resize
    window.addEventListener( 'resize', ( ) => {
      this.app.resizeCanvas( );
    } );

    // Add camera
    this.camera = new pc.Entity( 'player' );
    this.camera.addComponent( 'camera', {
      "clearColor":new pc.Color( 0.1, 0.1, 0.1 ),
      "farClip":1000,
      "nearClip":0.001,
      "rect":new pc.Vec4( 0, 0.5, 1, 0.5 )
    } );
    this.camera.setPosition( 0, 0, 20 );
    this.app.root.addChild( this.camera );

    this.cameraB = new pc.Entity( 'player' );
    this.cameraB.addComponent( 'camera', {
      "clearColor":new pc.Color( 0.1, 0.1, 0.1 ),
      "farClip":1000,
      "nearClip":0.001,
      "rect":new pc.Vec4( 0, 0, 1, 0.5 )
    } );
    this.cameraB.setPosition( -20, 0, 20 );
    this.cameraB.rotateLocal( 0, -45, 0 );
    this.app.root.addChild( this.cameraB );

    // Testing area -- Begin
    let object;
    object = new pc.Entity( 'light' );
    object.addComponent( 'light' );
    object.setEulerAngles( 45, 0, 0 );
    this.app.root.addChild( object );

    object = new pc.Entity( 'floor' );
    object.addComponent( 'model', {
      "type":"box"
    } );
    object.addComponent( 'rigidbody', {
      "type":"static",
      "mass":50
    } );
    object.addComponent( 'collision', {
      "type":"box",
      "halfExtents":new pc.Vec3( 5, 0.5, 5 )
    } );
    object.setPosition( 0, -5, 0 );
    object.setLocalScale( 10, 1, 10 );
    this.app.root.addChild( object );

    object = new pc.Entity( 'floor' );
    object.addComponent( 'model', {
      "type":"box"
    } );
    for ( let x = -3; x <= 3; x++ )
    {
      for ( let y = -3; y <= 3; y++ )
      {
        for ( let z = -3; z <= 3; z++ )
        {
          object = new pc.Entity( 'cube' );
          object.addComponent( 'model', {
            "type":"box"
          } );
          object.addComponent( 'rigidbody', {
            "type":"dynamic",
            "mass":50
          } );
          object.addComponent( 'collision', {
            "type":"box",
            "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
          } );
          object.setPosition( x, y, z );
          this.app.root.addChild( object );
        }
      }
    }
    // Testing area -- End

    // Update handler
    this.app.on( 'update', ( dt ) => { this.step( { "dt":dt } ) } );
  }

  step ( p )
  {
    this.count++;
    let now = new Date( ).getSeconds( );
    if ( now != this.lastTime )
    {
      this.lastTime = now;
      console.log( this.count );
      this.count = 0;
    }
    /*
    if ( this.count >= 10 )
    {
      this.count = 0;
      let object = new pc.Entity( 'cube' );
      object.addComponent( 'model', {
        "type":"box"
      } );
      object.addComponent( 'rigidbody', {
        "type":"dynamic",
        "mass":50
      } );
      object.addComponent( 'collision', {
        "type":"box",
        "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
      } );
      object.setPosition( Math.random( ) * 10 - 5, Math.random( ) * 10 - 5, Math.random( ) * 10 - 5 );
      this.app.root.addChild( object );
    }
    */
  }
}

let game = new Game( { "canvas":"app" } );
