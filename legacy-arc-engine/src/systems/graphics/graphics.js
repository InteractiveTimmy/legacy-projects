'use strict';

class Graphics
{
  constructor ( p = { } )
  {
    this.element = require( './html-element.js' )( p.element );
    this.renderer = require( './renderer-handler.js' )( { "canvas":this.element, "cc":p.clearColor, "aa":p.antialias } );
    this.view = require( './view-handler.js' )( { } );

    document.getElementsByTagName( 'body' )[0].setAttribute( 'style', 'overflow:hidden;' );
    window.addEventListener( 'resize', ( ) => { this.updateSize( ); }, false );

    this.view.load( { "vp":{ "x":0, "y":0, "w":0.5, "h":0.5, "tf":70, "tr":1.78 } } );
    this.view.load( { "vp":{ "x":0.5, "y":0, "w":0.5, "h":0.5, "tf":70, "tr":1.78 } } );
    // this.view.load( { "vp":{ "x":0, "y":0.5, "w":0.5, "h":0.5, "tf":70, "tr":1.78 } } );
    this.view.load( { "vp":{ "x":0, "y":0.5, "w":1, "h":0.5, "tf":70, "tr":1.78 } } );

    this.scene = new THREE.Scene( );

    this.box = new THREE.Mesh(
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { "color":0xffbb77 } )
    );

    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry( 0.5, 32, 32 ),
      new THREE.MeshBasicMaterial( { "color":0x0000ff } )
    );

    this.sphere.position.set( -1.5, 0, -2 );

    this.box.rotation.set( 0.5, 0.5, 0 );
    this.box.position.set( 0, 0, -2 );

    this.scene.add( this.sphere );

    this.scene.add( this.box );


    this.renderer.update( { "view":this.view.get( ), "scene":this.scene } );
  }

  init ( p = { } ) // { element:"", x:#, y:#, fullscreen:bool, "clearColor":#, "antialias":bool }
  {
    this.element = require( './html-element.js' )( p.element );
    this.renderer = require( './renderer-handler.js' )( { "canvas":this.element.get( ), "cc":p.clearColor, "aa":p.antialias } );
    this.view = require( './view-handler.js' )( { } );

    if ( p.dynamic )
    {
      document.getElementsByTagName( 'body' )[0].setAttribute( 'style', 'overflow:hidden;' );
      window.addEventListener( 'resize', ( ) => { this.updateSize( ); }, false );
    }

    // TEMP: testing -- begin
    this.view.load( { "vp":{ "x":0, "y":0, "w":0.5, "h":0.5, "tf":70, "tr":1.78 } } );
    this.view.load( { "vp":{ "x":0.5, "y":0.5, "w":0.5, "h":0.5, "tf":70, "tr":1.78 } } );
    this.view.load( { "vp":{ "x":0, "y":0.5, "w":0.5, "h":0.5, "tf":70, "tr":1.78 } } );
    this.view.load( { "vp":{ "x":0.5, "y":0, "w":0.5, "h":0.5, "tf":70, "tr":1.78 } } );

    this.view.get( )[0].position.set( 0, 0, 5 );
    this.view.get( )[1].position.set( -1, 0, 5 );
    this.view.get( )[2].position.set( 1, 0, 5 );
    this.view.get( )[3].position.set( 0, 1, 5 );

    this.scene = new THREE.Scene( );

    this.updateSize( ); // TEMP: Triggers testing
    // TEMP: testing -- end
  }

  update ( )
  {
    /* TEMP: box test
    this.box.rotation.x += 0.01;
    this.box.rotation.y += 0.01;
    this.box.rotation.z += 0.01;
    */
    this.renderer.update( { "view":this.view.get( ), "scene":this.scene } );
  }

  updateSize ( )
  {
    this.element.setSize( { "x":document.body.clientWidth, "y":document.body.clientHeight } );
    this.renderer.setSize( { "x":document.body.clientWidth, "y":document.body.clientHeight } );
    this.view.setViewPort( { "dimensions":this.renderer.get( ).getSize( ) } );

    this.renderer.update( { "view":this.view.get( ), "scene":this.scene } );
    // this.renderer.get( ).render( this.scene, this.camera );
  }
}

module.exports = ( p ) => { return new Graphics( p ); }
