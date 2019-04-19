'use strict';

let engine, graphics, input, config;

function init ( ) { return new Promise( ( resolve, reject ) => {

  ajax.get( '/new-config.json' ).then( ( myResponse ) => {

    config = JSON.parse( myResponse );
    console.log( 'config', config );

    graphics = new Graphics( 'app' );
    engine = new Worker( '/js/worker-engine/worker.js' );
    input = new Input( 'app' );

    // let playerTest = input.generatePlayer( config.input.players[0] );
    engine.postMessage( { "to":"engine", "from":graphics.name, "command":"initGraphics" } );
    engine.postMessage( { "to":"engine", "from":input.name, "command":"initInput" } );

    engine.postMessage( { "to":"engine", "from":"main", "command":"generatePlayer", "message":{ "input":config.input.players[0], "graphics":graphics.name } } );

    engine.postMessage( { "to":"engine", "from":"main", "command":"run" } );

    engine.onmessage = function ( e )
    { processMessage( e ); };

    engine.onerror = function ( e )
    { throw new Error( `${e.message} (${e.filename}:${e.lineno})`); };

    resolve( 'Initialized' );

  } ).catch( ( e ) => {
    reject( e );
  } );

} ) };

function main ( ) {
  init( ).then( ( myResponse ) => {
    console.log( myResponse );
    run( );
  } ).catch( ( e ) => {
    console.log( `Initilization Failed - ${e}`)
  } );
}

function run ( ) {
  requestAnimationFrame( run );
  graphics.update( );
}

function processMessage ( myMessage )
{
  switch ( myMessage.data.to )
  {
    case graphics.name:
      graphics.processMessage( myMessage.data );
      break;

    case input.name:
      input.processMessage( myMessage.data );
      break;

    case 'debug':
      debug( myMessage.data.message );
      break;

    default:
      console.log( 'Invalid Target for Received Message in Main', myMessage );
      break;
  }
}

function debug ( myString )
{
  let output = "DEBUG<br />";
  output += `${myString.type} - ${myString.value}`;
  document.getElementById("debug").innerHTML = output;
}

window.onload = function( )
{ main( ); }
