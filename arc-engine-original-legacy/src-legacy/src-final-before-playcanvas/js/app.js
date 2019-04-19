'use strict'

/* NOTE
 - Only use oimo js when needed, Limited PHysics Engine
 - Create webworker for loader and oimo
 - Generate custom, lightweight physicsed world
 - Classes
 - - Game
 - - Graphics
 - - Input
 - - Entity
 - - - Basic
 - - - Charcter
 - - - Player
 - - - NonPlayer
*/

let game = require( './classes/engine.js' )( {
  "element":document.getElementById( 'app' ),
  "config":require( '../config.json' )
} );

window.onload = function ( ) // Initial Load of Document
{ /* game.loop( ); */ console.log( 'loaded' ); }
