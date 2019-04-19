'use strict';

let Element = require( '../element/element.js' );

class Entity
{
  constructor ( n, p ) // name, { ... }
  {
    this.name = n;
    this.children = { };
  }

  load ( n, p ) // type, { ... }
  {
    let x = require( `../element/${n}.js` )( p );

    console.log( x );
    console.log( 'name', n );
    console.log( 'params', p );
    this.children[n] = {
      "parent":this,
      "type":n,
      "data":x
    };
  }

  unload ( p ) // { type:"" }, remove system element
  {

  }

  step ( p ) // { rate:# }
  {

  }
}

module.exports = Entity;
