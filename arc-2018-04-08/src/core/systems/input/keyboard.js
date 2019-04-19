'use strict';

class Keyboard
{
  constructor ( p = { } ) // { "instances":{...} }
  {
    this.instances = p.instances;

    this.InputInstance = require( './input-instance.js' );
  }

  handle ( p )
  {
    if ( p.type == "keydown" ) { this.handleKeyDown( p ); }
    if ( p.type == "keyup" ) { this.handleKeyUp( p ); }
  }

  handleKeyDown ( p )
  {
    if ( this.instances.hasOwnProperty( `k${p.keyCode}` ) )
    { this.instances[`k${p.keyCode}`].value = 1; }
    else
    {
      this.instances[`k${p.keyCode}`] = new this.InputInstance( {
        "value": 1,
        "name": p.key.toUpperCase( ),
        "code": `k${p.keyCode}`
      } );
    }
  }

  handleKeyUp ( p )
  {
    if ( this.instances.hasOwnProperty( `k${p.keyCode}` ) )
    { this.instances[`k${p.keyCode}`].value = 0; }
    else
    {
      this.instances[`k${p.keyCode}`] = new this.InputInstance( {
        "value": 0,
        "name": p.key.toUpperCase( ),
        "code": `k${p.keyCode}`
      } );
    }
  }
}

module.exports = Keyboard;
