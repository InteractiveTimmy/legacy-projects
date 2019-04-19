'use strict';

class InputSystem
{
  constructor ( p = { } ) // { element:@html }
  {
    // import modules
    this.Keyboard = require( './input/keyboard.js' );
    this.Mouse = require( './input/mouse.js' );
    this.Pad = require( './input/pad.js' );
    this.InputInstance = require( './input/input-instance.js' );

    // import reference
    this.reference = require( './input/reference.js' );

    // set variables
    this.instances = { };
    this.element = p.element;
    this.stats = {
      "pl": false // pointer lock
    };

    // init reference
    for ( let r of this.reference )
    { this.instances[r.code] = new this.InputInstance( r ); }

    // init devices
    this.keyboard = new this.Keyboard( { "instances": this.instances } );
    this.mouse = new this.Mouse( { "instances": this.instances, "element": p.element, "stats": this.stats } );

    // init events
    document.addEventListener( 'keydown', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'keyup', ( e ) => { this.handleEvent( e ); } );

    document.addEventListener( 'mousemove', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'mousedown', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'mouseup', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'mousewheel', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'pointerlockchange', ( e ) => { this.handlePointerLock( e ); } );
    document.addEventListener( 'mozpointerlockchange', ( e ) => { this.handlePointerLock( e ); } );
  }

  get ( p ) // @input.code
  {
    if ( this.instances.hasOwnProperty( p ) )
    { return this.instances[p]; }
    else
    { this.instances[p] = new this.InputInstance( { "code": p } ); return this.instances[p]; }
  }

  handleEvent ( p )
  {
    if ( this.stats.pl || p.type == 'mousedown' )
    {
      if ( p.constructor.name == 'KeyboardEvent' && this.stats.pl )
      { this.keyboard.handle( p ); }
      else if ( p.constructor.name == 'MouseEvent' )
      { this.mouse.handle( p ); }
    }

    if ( this.stats.pl == true ) { p.preventDefault( ); }
  }

  handlePointerLock ( p )
  {
    if (document.pointerLockElement === this.element || document.mozPointerLockElement === this.element )
    { this.stats.pl = true; }
    else
    { this.stats.pl = false; }
  }

  clearAnalog ( )
  {
    this.mouse.clearAnalog( );
  }
}

module.exports = InputSystem;
