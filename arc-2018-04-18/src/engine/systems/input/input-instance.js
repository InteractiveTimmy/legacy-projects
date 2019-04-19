'use strict';

class InputInstance
{
  constructor ( p = { } )
  {
    this.value = p.value || 0;
    this.name = p.name || String.fromCharCode( p.code.replace( /^\D+/g, '') ).toUpperCase( );
    this.code = p.code;
  }
}

module.exports = InputInstance;
