'use strict';

importScripts( '../external/three.js' );
importScripts( '../external/oimo.js' );
importScripts( '../util/uuid-gen.js' );
importScripts( 'class-entity.js' );
importScripts( 'class-player.js' );
importScripts( 'engine.js' );

let engine = new Engine;

function processMessage ( myMessage )
{
  switch ( myMessage.data.to )
  {
    case 'engine':
      engine.processMessage( myMessage.data );
      break;

    default:
      console.log( 'Invalid Target for Received Message in Engine' );
  }
}

onmessage = function ( e )
{ processMessage( e ); }

function run ( )
{
  engine.update( );
  postMessage( { "to":"debug", "from":"engine", "message":{ "type":"tps", "value":engine.stats.tps.r } } );
  setTimeout( run, engine.stats.tps.d );
}

run( );
