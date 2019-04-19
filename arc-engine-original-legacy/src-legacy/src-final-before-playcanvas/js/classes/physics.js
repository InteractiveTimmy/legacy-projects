'use strict';

// const OIMO = require( 'oimo' );

class Physics
{
  constructor ( p )
  {
    this.parameters = p;
  }
}

module.exports = function ( p )
{
  let myPhysics = new Physics( p );
  return myPhysics;
}
