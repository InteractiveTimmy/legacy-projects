"use strict";

class EventHandler
{
  constructor ( element )
  {
    this.element = element;

    this.keyboard;
    this.mouse;
    this.controller = [];

    for ( let x = 0; x < 4; x++ )
    { this.controller.push( { } ); }

    this.generatePointerLock( );
    this.generateKeyboard( );
    this.generateMouse( );
    this.generateController( );

  }

  update ( )
  { /* TODO */ }

  generate ( )
  { /* TODO */ }

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
      if ( document.pointerLockElement === game.element || document.mozPointerLockElement === game.element || document.webkitPointerLockElement === game.element )
      {
        if ( !parent.mouse.pointerLocked )
        {
          parent.mouse.pointerLocked = true;
        }
      } else {
        parent.mouse.pointerLocked = false;
      }
    }
  }

  generateKeyboard ( )
  {
    this.keyboard = {};

    document.addEventListener( 'keydown', ( event ) =>
    {
      const code = event.keyCode;
      if ( this.keyboard[code] )
      { this.keyboard[code].active = true; }
    });

    document.addEventListener( 'keyup', ( event ) =>
    {
      const code = event.keyCode;
      if ( this.keyboard[code] )
      { this.keyboard[code].active = false; }
    });
  }

  generateMouse ( )
  {
    this.mouse = {};
    this.mouse.position = {};

    document.addEventListener( 'mousemove', ( event ) =>
    {
      this.mouse.position.x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      this.mouse.position.y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    });

    document.addEventListener( 'mousedown', ( event ) =>
    {
      const code = event.button;
      if ( this.mouse[code] )
      { this.mouse[code].active = true; }
    });

    document.addEventListener( 'mouseup', ( event ) =>
    {
      const code = event.button;
      if ( this.mouse[code] )
      { this.mouse[code].active = false; }
    });
  }

  generateController (  )
  { /* TODO */ }

  findBind ( myArray, myCode )
  {
    return myArray === myCode;
  }

  assignControls ( myPlayer, myKeyMap )
  { /* TODO */

    for ( let index in myKeyMap.keyboard )
    {
      this.keyboard[ myKeyMap.keyboard[index].code ] = { "active":false };
      myPlayer.input[ myKeyMap.keyboard[index].value ] = this.keyboard[ myKeyMap.keyboard[index].code ];
    }

    for ( let index in myKeyMap.mouse )
    {
      this.mouse[ myKeyMap.mouse[index].code ] = { "active":false };
      myPlayer.input[ myKeyMap.mouse[index].value ] = this.mouse[ myKeyMap.mouse[index].code ];
    }

    if ( myKeyMap.look == "mouse" )
    { myPlayer.input.viewChange = this.mouse.position; }

  }

}
