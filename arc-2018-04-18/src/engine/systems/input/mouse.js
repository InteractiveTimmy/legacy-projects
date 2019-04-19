'use strict';

class Mouse
{
  constructor ( p = { } )
  {
    this.instances = p.instances;
    this.stats = p.stats;
    this.element = p.element;

    this.InputInstance = require( './input-instance.js' );
  }

  handle ( p )
  {
    if ( p.type == "mousemove" ) { this.handleMouseMove( p ); }
    if ( p.type == "mousedown" ) { this.handleMouseDown( p ); }
    if ( p.type == "mouseup" ) { this.handleMouseUp( p ); }
    if ( p.type == "mousewheel" ) { this.handleKeyUp( p ); }
  }

  handleMouseMove ( p )
  {
    this.instances['mmy+'].value += p.movementY * 0.02;
    this.instances['mmy-'].value -= p.movementY * 0.02;
    this.instances['mmx+'].value += p.movementX * 0.02;
    this.instances['mmx-'].value -= p.movementX * 0.02;

    if ( this.instances['mmy+'].value < 0 ) { this.instances['mmy+'].value = 0; }
    if ( this.instances['mmy-'].value < 0 ) { this.instances['mmy-'].value = 0; }
    if ( this.instances['mmx+'].value < 0 ) { this.instances['mmx+'].value = 0; }
    if ( this.instances['mmx-'].value < 0 ) { this.instances['mmx-'].value = 0; }
  }

  handleMouseWheel ( p )
  {
    this.instances['mwy+'].value += p.wheelDeltaY / 120;
    this.instances['mwy-'].value -= p.wheelDeltaY / 120;
    this.instances['mwx+'].value += p.wheelDeltaX / 120;
    this.instances['mwx-'].value -= p.wheelDeltaX / 120;

    if ( this.instances['mwy+'].value < 0 ) { this.instances['mwy+'].value = 0; }
    if ( this.instances['mwy-'].value < 0 ) { this.instances['mwy-'].value = 0; }
    if ( this.instances['mwx+'].value < 0 ) { this.instances['mwx+'].value = 0; }
    if ( this.instances['mwx-'].value < 0 ) { this.instances['mwx-'].value = 0; }
  }

  handleMouseDown ( p )
  {
    if ( this.stats.pl == false )
    {
      this.element.requestPointerLock = this.element.requestPointerLock || this.element.mozRequestPointerLock;
      this.element.requestPointerLock( );
    }
    if ( this.instances.hasOwnProperty( `mb${p.button}` ) )
    { this.instances[`mb${p.button}`].value = 1; }
  }

  handleMouseUp ( p )
  {
    if ( this.instances.hasOwnProperty( `mb${p.button}` ) )
    { this.instances[`mb${p.button}`].value = 0; }
  }

  clearAnalog ( )
  {
    this.instances['mmy+'].value = 0;
    this.instances['mmy-'].value = 0;
    this.instances['mmx+'].value = 0;
    this.instances['mmx-'].value = 0;

    this.instances['mwy+'].value = 0;
    this.instances['mwy-'].value = 0;
    this.instances['mwx+'].value = 0;
    this.instances['mwx-'].value = 0;
  }
}

module.exports = Mouse;
