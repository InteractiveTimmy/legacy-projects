'use strict';

class Space
{
  constructor ( n, p ) // name, { ... }
  {
    this.name = n;
    this.children = { };
  }

  load ( p ) // entity:{ ... }
  {
    this.children[p.name] = p;
  }

  unload ( )
  {

  }

  step ( p ) // { rate:# }
  {

  }

  init ( p )
  { return new Promise( ( resolve, reject ) => {
    resolve( );
  } ); }
}

module.exports = Space;
