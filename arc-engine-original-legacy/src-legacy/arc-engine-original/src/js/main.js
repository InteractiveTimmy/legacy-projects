"use strict";

let game;

function main( )
{
  init( );
  run( );
}

function run( )
{ // HAS TO BE A PRIVATE METHOD /* TODO */
  requestAnimationFrame( run );
  game.update( );
  game.render( );
}

function init( )
{ game = new Game( 'app' ); game.init( ); }

window.onload = function()
{ main( ); }
