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

let gameLib = require( './classes/game.js' );
let game = new gameLib( );

window.onload = function ( ) // Initial Load of Document
{ game.loop( ); }
