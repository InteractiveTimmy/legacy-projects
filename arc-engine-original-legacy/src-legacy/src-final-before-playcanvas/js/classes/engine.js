'use strict';

// const MODULES = require( './modules.js' );

class Engine
{
  constructor ( p )
  {
    this.config = p.config

    this.stats = {
      "running":true
    };

    this.utils = require( './utils.js' )( );

    this.graphics = require( './graphics.js' )( {
      "config":this.config.graphics,
      "element":p.element || "app"
    } );

    this.input = require( './input.js' )( {
      "element":p.element || "app"
    } );

    // console.log( this.config.input.players );
    this.player = [];
    this.player.push( require( './player.js' )( {
      "input":this.config.input.players[0],
      "camera":this.config.graphics.camera.player
    } ) );

    this.graphics.addCamera( {
      "camera":this.player[0].camera,
      "name":this.utils.generateUUID( ),
      "format":"player"
    } );

    /*
    this.graphics.addCamera( {
      "specs":this.config.graphics.camera.menu,
      "name":this.utils.generateUUID( ),
      "format":"player"
    } );
    */

    console.log( this );
    this.step( );
  }

  updatePlayerInput ( p )
  { // NOTE: Complete
    if ( p.length > 0 )
    {
      for ( let x in p )
      {
        for ( let y in this.player )
        {
          if ( p[x].type )
          {
            if ( this.player[y].config.input[p[x].code] == p[x].type )
            { this.player[y].stats.actions[p[x].code].active = p[x].active; }
          }
          else
          {
            if ( this.player[y].config.input[p[x].code] )
            { this.player[y].stats.actions[this.player[y].config.input[p[x].code].action].active = p[x].active; }
          }
        }
      }
    }
  }

  step ( )
  {
    if ( this.stats.running )
    {
      window.requestAnimationFrame( ( ) => {
        this.step( );
        this.updatePlayerInput( this.input.getInput( ) );
        this.player[0].update( this.graphics.scene.children );
      } );
    }
    this.graphics.update( );
  }
}

module.exports = function ( p )
{
  let myEngine = new Engine( p );
  return myEngine;
}
