'use strict';

module.exports = class Input
{
  constructor ( element )
  {

    this.name = 'INPUT';
    this.changed = [];

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
      default:
        console.log( 'Command Not Found', myMessage );
        break;
    }
  }

  getCodeInChanged( c, t )
  {
    for( let x in this.changed )
    {
      if ( t )
      {
        if ( this.changed[x].code == c && this.changed[x].type == t )
        { return this.changed[x]; }
      }
      else
      {
        if ( this.changed[x].code == c )
        { return this.changed[x]; }
      }
    }
  }

  update ( params ) // Key
  {
    console.log( params );
    /*
    if ( params.code == "look" || params.code == "move" )
    {
      let inputObject = this.getCodeInChanged( params.code, params.type );
      if ( inputObject )
      { inputObject.active.x += params.active.x; inputObject.active.y += params.active.y; }
      else
      { this.changed.push( params ); }
    }
    else
    { this.changed.push( params ); }
    */
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
      if ( !this.buttons[code].active )
      {
        this.buttons[code].active = true;
        this.update( { "code":code, "active":this.buttons[code].active } );
      }
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
      this.update( { "code":"look", "type":"mouse", "active":this.mouse } );
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

  getInput( )
  {
    let changedArray = this.changed;
    this.changed = [];
    return changedArray;
  }

  generateController (  )
  { /* TODO */ }

}
