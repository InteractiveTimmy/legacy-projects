'use strict';

class Input
{
  constructor ( element )
  {

    this.name = `INPUT-${generateUUID( )}`;
    this.players = [];

    this.element = document.getElementById( element );

    this.buttons;
    this.mouse;
    this.controller;

    this.generatePointerLock( );
    this.generateKeyboard( );
    this.generateMouse( );
    this.generateController( );

  }

  processMessage ( myMessage )
  {
    switch ( myMessage.command )
    {
      case 'generatePlayer':
        this.generatePlayer( myMessage.message )
        break;

      default:
        console.log( 'Command Not Found', myMessage );
        break;
    }
  }

  generatePlayer ( params )
  {
    let playerObject = {
      "name":params.name
    };

    let paramKeys = Object.keys( params.input );

    for ( let key in params.input )
    {
      playerObject[key] = params.input[key];
      if ( !this.buttons[key] && !isNaN( key ) )
      { this.buttons[key] = { "active":false }; }
      playerObject.look = params.input.look;
      playerObject.move = params.input.move;
    }

    this.players.push( playerObject );

    console.log( 'test', params );

    return playerObject.name;
  }

  removePlayer ( myName )
  {
    for ( let x in this.players )
    {
      if ( this.players[x].name == myName ) { this.players.splice( x, 1 ); }
    }
  }

  update ( params ) // Key
  {
    if ( params.code == 'look' )
    {
      for ( let x in this.players )
      {
        if ( this.players[x].look == params.type )
        {
          engine.postMessage( {
            "to":"engine",
            "from":this.name,
            "command":"updateInput",
            "message":{
              "player":this.players[x].name,
              "action":params.code,
              "active":params.active
            }
          } );
        }
      }
    }
    else
    {
      for ( let x in this.players )
      {
        for ( let key in this.players[x] )
        {
          if ( key == params.code )
          {
            engine.postMessage( {
              "to":"engine",
              "from":this.name,
              "command":"updateInput",
              "message":{
                "player":this.players[x].name,
                "action":this.players[x][key].action,
                "active":params.active
              }
            } );
          }
        }
      }
    }
  }

  generatePointerLock ( )
  {
    let parent = this;

    this.element.onclick = function( )
    {
      parent.element.requestPointerLock( );
    }

    document.addEventListener( 'pointerlockchange', lockChange, false );
    document.addEventListener( 'mozpointerlockchange', lockChange, false );
    document.addEventListener( 'webkitpointerlockchange', lockChange, false );

    function lockChange( )
    {
      if ( document.pointerLockElement === this.element || document.mozPointerLockElement === this.element || document.webkitPointerLockElement === this.element )
      {
        if ( !parent.pointerLocked )
        {
          parent.pointerLocked = true;
        }
      } else {
        parent.pointerLocked = false;
      }
    }
  }

  generateKeyboard ( )
  {
    this.buttons = {};

    document.addEventListener( 'keydown', ( event ) =>
    {
      const code = event.keyCode;
      if ( !this.buttons[code] ) { this.buttons[code] = {}; }
      this.buttons[code].active = true;
      this.update( { "code":code, "active":this.buttons[code].active } );
    });

    document.addEventListener( 'keyup', ( event ) =>
    {
      const code = event.keyCode;
      if ( !this.buttons[code] ) { this.buttons[code] = {}; }
      this.buttons[code].active = false;
      this.update( { "code":code, "active":this.buttons[code].active } );
    });
  }

  generateMouse ( )
  {
    this.mouse = {};

    document.addEventListener( 'mousemove', ( event ) =>
    {
      this.mouse.x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      this.mouse.y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      if ( this.mouse.x > 200 || this.mouse.x < -200 || this.mouse.y > 200 || this.mouse.y < -200 )
      { console.log( this.mouse ); }
      else
      { this.update( { "code":"look", "type":"mouse", "active":this.mouse } ); }
    });

    document.addEventListener( 'mousedown', ( event ) =>
    {
      const code = event.button;
      if ( !this.buttons[code] ) { this.buttons[code] = {}; }
      this.buttons[code].active = true;
      this.update( { "code":code, "active":this.buttons[code].active } );
    });

    document.addEventListener( 'mouseup', ( event ) =>
    {
      const code = event.button;
      if ( !this.buttons[code] ) { this.buttons[code] = {}; }
      this.buttons[code].active = false;
      this.update( { "code":code, "active":this.buttons[code].active } );
    });
  }

  generateController (  )
  { /* TODO */ }

}
