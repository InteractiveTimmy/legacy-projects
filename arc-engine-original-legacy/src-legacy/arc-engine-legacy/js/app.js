'use strict';

/* NOTE Webworker Message Format
{ to:'name of target element', from:'name of sending element', command:'contains method', data:'contains data to be passed into target method' }
*/

let app = {};

app.initWorker = function ( params ) { return new Promise( ( resolve, reject ) => {

  let parent = this;
  let worker = new Worker( params.url );
  worker.name = params.name;

  worker.onmessage = function ( m )
  { parent.processMessage( m ); }

  worker.onerror = function ( e )
  { parent.processError( e ); }

  this.workers.push( worker );

  resolve( `Generated Worker -- ${params.name}` );
} ); };

app.getWorkerByName = function ( myName )
{
  for ( let x in this.workers )
  {
    if ( this.workers[x].name == myName )
    { return this.workers[x]; }
  }
};

app.initDocument = function ( ) { return new Promise( ( resolve, reject) => { // TEMP Remove on Production

  let docInit = require( './index.js' );

  docInit( ).then( ( r ) => {
    document.write( r );
    resolve( r );
  } );

} ); }

app.init = function ( ) { return new Promise( ( resolve, reject ) => {
    console.log( 'app.init' );

    this.name = 'APP';
    this.workers = [];
    this.sendData = {};

    this.ajax = require( './utils/ajax.js' );
    this.generateUUID = require( './utils/module-uuid-generator.js' );

    this.moduleGraphics = require( './classes/graphics.js' );
    this.moduleInput = require( './classes/input.js' );
    this.moduleCounter = require( './classes/counter.js' );

    this.stats = {};
    this.stats.skips = 0;
    this.stats.skipsAmount = 0;
    this.stats.rtps = new this.moduleCounter( );
    this.stats.etps = new this.moduleCounter( );

    this.input = new this.moduleInput( 'app' );

    Promise.all( [
      this.ajax.get( './js/config.json' ),
      this.initWorker( { "url":"/js/worker-engine.js", "name":"engine" } ),
      this.initWorker( { "url":"/js/worker-loader.js", "name":"loader" } )
    ] ).then( ( r ) => {

      console.log( r );
      let config = JSON.parse( r[0] );

      this.graphics = new this.moduleGraphics( {
        "canvas":"app",
        "name":"GRAPHICS",
        "camera":config.camera,
        "renderer":config.renderer
      } );

      for ( let x in config.input.players )
      {
        this.processMessage( { "data":{
          "to":"engine",
          "from":"app",
          "command":"generatePlayer",
          "data":config.input.players[x]
        } } );
      }

      resolve( 'app.init -- complete' );

    } ).catch( ( e ) => {
      console.log( e );
    } );

  } );
};

app.renderLoop = function ( )
{
  this.stats.rtps.tick( );
  requestAnimationFrame( ( ) => {
    app.renderLoop( );
  } );

  // Graphics -- Begin
  if ( !this.stats.rtps.getShouldSkip( ) )
  {
    this.processMessage( { "data":{
      "to":"engine",
      "from":"graphics",
      "command":"sendEntities",
      "data":null
    } } );
  }

  /*
  this.processMessage( { "data":{
    "to":"engine",
    "from":"app",
    "command":"generateRandomEntities",
    "data":{ "count":1, "type":"sphere" }
  } } );
  */


  this.graphics.update( );
  // Graphics -- End

  // Input -- Begin
  this.sendData.input = this.input.getInput( );
  if ( this.sendData.input.length > 0 )
  {
    this.processMessage( { "data":{
      "to":"engine",
      "from":"input",
      "command":"updateInput",
      "data":this.sendData.input
    } } );
  }
  //Input -- End

  document.getElementById( 'debug' ).innerHTML = `fps - ${this.stats.rtps.getTPS( )}\ntps - ${this.stats.etps.getTPS( )}`;
};

app.processMessage = function ( m )
{
  switch ( m.data.to )
  {
    case 'engine':
      this.getWorkerByName( 'engine' ).postMessage( m.data );
      break;

    case 'graphics':
      this.graphics.processMessage( m.data );
      break;

    case 'loader':
      this.loader.postMessage( m.data );
      break;

    case 'counter':
      this.stats.etps.tick( );
      break;

    default:
      console.log( `${this.name} - failed to process message`, m );
      break;
  }
};

app.processError = function ( e )
{
  console.log( 'error message', e );
};

app.main = function ( )
{
  console.log( 'app.main' );

  this.initDocument( ).then( ( r ) => {

    console.log( 'app.initDocument -- complete' );

    this.init( ).then( ( r ) => {
      console.log( r );
      this.processMessage( { "data":{
        "to":"graphics",
        "from":"app",
        "command":"notreal",
        "data":"test"
      } } );
      app.renderLoop( );
      app.inputLoop( );
      testfunc( );
    } ).catch( ( e ) => {
      console.log( e );
    } );

  } );

};

function testfunc ( )
{
  console.log( 'hit test function' );
}

window.onload = function ( )
{
  app.main( );
}
