'use strict';

const EVENTS = require( 'events' );

class AE extends EVENTS
{
  constructor ( p )
  {
    super( );

    this.config = p;
    this.stats = { "states":{ }, "performance":{ } };

    this.systems = require( './system/system-handler.js' )( );
    this.scenes = require( './scene/scene-handler.js' )( );


    // NOTE: expose classes
    this.Asset = require( './asset/asset.js' );
    this.Entity = require( './entity/entity.js' );
    this.Scene = require( './scene/scene.js' );

    // TEMP: test objects
    this.test = {
      "moveValue":1,
      "myEntityA":new this.Entity( ),
      "myScene":new this.Scene( ),
      "myMaterialA":new this.Asset( 'material', { "type":"Phong", "config":{ "color":0x55aaff, "side":THREE.DoubleSide } } ),
      "myGeometryA":new this.Asset( 'geometry', { "type":"Box", "config":[ 1, 1, 1 ] } )
    };

    this.test.myEntityA.loadElement( 'mesh', {
      "material":this.test.myMaterialA.data,
      "geometry":this.test.myGeometryA.data,
    } ).setOffset( {
      "position":[ 0, 0, 0 ],
      "rotation":[ 1, 1, 1 ],
      "relative":true
    } );
    this.test.myEntityA.loadElement( 'mesh', {
      "material":this.test.myMaterialA.data,
      "geometry":this.test.myGeometryA.data,
    } ).setOffset( {
      "position":[ -1, 0, 0 ],
      "rotation":[ 1, 1, 1 ],
      "relative":true
    } );
    this.test.myEntityA.loadElement( 'mesh', {
      "material":this.test.myMaterialA.data,
      "geometry":this.test.myGeometryA.data,
    } ).setOffset( {
      "position":[ 0, 1, 0 ],
      "rotation":[ 1, 1, 1 ],
      "relative":true
    } );
    this.test.myEntityA.loadElement( 'light', {
      "type":"Point",
      "config":{
        "color":{ "r":1, "g":1, "b":1 },
        "intensity":1,
        "distance":100
      }
    } ).setOffset( {
      "position":[ 0, 0, 2 ],
      "relative":false
    } );
    this.test.myEntityA.loadElement( 'light', {
      "type":"Spot",
      "config":{
        "color":{ "r":1, "g":1, "b":1 },
        "intensity":1,
        "distance":100
      }
    } ).setOffset( {
      "position":[ 0, 0, 5 ],
      "relative":false,
      "target":this.test.myEntityA.target
    } );
    console.log( this.test.myEntityA );

    this.test.compareEntity = new this.Entity( );
    this.test.compareObject3D = new THREE.Object3D( );

    console.log( 'entity', this.test.compareEntity );
    console.log( 'Object3D', this.test.compareObject3D );

    this.test.myEntityA.position.set( 0, 0, -5 );

    this.stats.states.constructed = true;
    console.log( this );
  }

  init ( p )
  { return new Promise( ( resolve, reject ) => {

    this.systems.init( this.config.systems ).then( ( r ) => {
      this.step( );
    } ).catch( ( e ) => {

    } );
    // TODO: add starting process here
    this.stats.states.initialized = true;
    resolve( );
  } ); }

  start ( p )
  {
    this.stats.states.running = true;
    this.systems.graphics.scene.add( this.test.myEntityA.elements[0] );
    this.systems.graphics.scene.add( this.test.myEntityA.elements[1] );
    this.systems.graphics.scene.add( this.test.myEntityA.elements[2] );
    // this.systems.graphics.scene.add( this.test.myEntityA.elements[3] );
    this.systems.graphics.scene.add( this.test.myEntityA.target );
    this.systems.graphics.scene.add( this.test.myEntityA.elements[4] );
  }

  stop ( p )
  { this.stats.states.running = false; }

  load ( p ) // { type:"" }
  { return new Promise( ( resolve, reject ) => {
    this.systems.loadEntity( p );
  } ); }

  unload ( p )
  { return new Promise( ( resolve, reject ) => {

  } ); }

  step ( )
  {
    if ( !this.stats.states.running ) { return }

    this.stats.states.ready = false;
    this.stats.performance.last = performance.now( );

    this.systems.step( );
    this.test.myEntityA.position.x -= 0.05 * this.test.moveValue;
    this.test.myEntityA.rotation.y -= 0.005;
    this.test.myEntityA.rotation.x -= 0.01;
    if ( this.test.myEntityA.position.x < -5 ) { this.test.moveValue *= -1; }
    if ( this.test.myEntityA.position.x > 5 ) { this.test.moveValue *= -1; }
    this.test.myEntityA.update( );
    /*
    this.test.myEntityB.position.x += 0.005;
    this.test.myEntityB.rotation.y += 0.005;
    this.test.myEntityB.rotation.z += 0.01;
    if ( this.test.myEntityB.position.x > 5 ) { this.test.myEntityB.position.x = -5; }
    this.test.myEntityB.update( );
    */

    this.stats.performance.delta = performance.now( ) - this.stats.performance.last;
    this.stats.states.ready = true;

    this.emit( 'update', this.stats.performance.delta );

    requestAnimationFrame( ( ) => { this.step( ); } );
    // setTimeout( ( ) => { this.step( ) }, ( ( 1000 / 60 ) - this.stats.performance.delta ) );
  }

}

module.exports = ( p ) => { return new AE( p ); };
