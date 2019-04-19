'use strict';

class Systems
{
  constructor ( )
  {

  }

  step ( )
  {
    for ( let s in this )
    { this[s].update( ); }
  }

  load ( p = { } )
  {
    this[p.name] = require( `./${p.name}/${p.name}.js` )( p.config );
  }

  unload ( p )
  {

  }
}

module.exports = ( p ) => { return new Systems( ); };
