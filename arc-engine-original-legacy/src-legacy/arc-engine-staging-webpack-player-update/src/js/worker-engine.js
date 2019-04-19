'use strict';

importScripts( './node_modules/three/build/three.js' );
importScripts( './node_modules/oimo/build/oimo.js' );
importScripts( './utils/uuid-generator.js' );
importScripts( './classes/entity.js' );
importScripts( './classes/player.js' );
importScripts( './classes/engine.js' );

let engine = new Engine( );

onmessage = function ( m )
{ engine.processMessage( m.data ); }

function run ( )
{
  engine.update( );
  postMessage( { "to":"counter", "from":"engine", "data":{ "type":"tps", "value":engine.stats.tps.r } } );
  setTimeout( run, engine.stats.tps.d );
  // console.log( engine.stats.tps.r );
}

run( );
