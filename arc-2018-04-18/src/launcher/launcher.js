'use strict';

class ArcLauncher
{
  constructor ( p = { } ) // { engine:@Arc.Engine }
  {
    if ( !p.hasOwnProperty( 'engine' ) ) { throw new Error( 'engine not specified' ); }
    this.Engine = p.engine;
  }
}

module.exports = ArcLauncher;
