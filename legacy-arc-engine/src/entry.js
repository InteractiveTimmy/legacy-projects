'use strict';

let game;

class Game
{
  constructor ( )
  {
    this.Engine = require( './Engine.js' )( );
    this.Engine.on( 'update', ( p ) => { this.update( p ); } );

    this.Engine.stats.log.enableAll( );

    // TEMP: test area -- begin
    /*
    this.element = document.createElement( 'canvas' );
    this.element.setAttribute( 'id', 'app' );
    this.element.setAttribute( 'style', `width:${800}; height:${450};` );
    this.element.setAttribute( 'width', 800 );
    this.element.setAttribute( 'height', 450 );
    document.body.appendChild( this.element );

    this.testelement = document.getElementById( 'testests' );

    this.teststring = "test";

    if ( this.testelement )
    { console.log( true ); }
    else {
      console.log( false );
    }
    console.log( this.testelement );
    console.log( this.teststring instanceof String );

    this.scene = new THREE.Scene( );
    this.renderer = new THREE.WebGLRenderer( { "canvas":this.element, "antialias":true } );
    this.camera = new THREE.PerspectiveCamera( 70, 16/9, 0.001, 1000 );

    this.test = { };

    this.test.AssetA = new this.Engine.Asset( 'material', {
      "type":"Basic",
      "config":{ "color":0xffbbaa }
    } );
    this.test.AssetC = new this.Engine.Asset( 'material', {
      "type":"Basic",
      "config":{ "color":0x0055ff }
    } );

    this.test.AssetB = new this.Engine.Asset( 'geometry', {
      "type":"Box",
      "config":[ 1, 1, 2 ]
    } );

    this.test.EntityA = new this.Engine.Entity( );
    this.test.EntityA.load( 'mesh', {
      "geometry":this.test.AssetB,
      "material":this.test.AssetA
    } ).position.set( 0, 0, 0 );

    this.test.EntityA.position.set( 0, 0, -5 );

    this.test.EntityB = new this.Engine.Entity( );
    this.test.EntityB.load( 'mesh', {
      "geometry":this.test.AssetB,
      "material":this.test.AssetC
    } );
    this.test.EntityB.position.set( 0, 2, 0 );

    this.test.EntityA.load( 'entity', this.test.EntityB );

    this.scene.add( this.test.EntityA );
    */
    this.Engine.start( );
  }

  update ( )
  {
    console.log( 'test' );
    this.Engine.systems.graphics.box.rotation.x += 0.01;
    // this.Engine.Systems.Graphics.box.rotation.x += 0.01;
    /*
    this.test.EntityA.rotation.x += 0.01;
    this.test.EntityA.rotation.y += 0.005;
    this.renderer.render( this.scene, this.camera );
    */
  }
}

window.onload = ( ) => { game = new Game( ); }
