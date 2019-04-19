'use strict';

class Template
{
  constructor ( p )
  {
    this.stats = { "state":"constructing" };

    this.stats.state = "constructed";
  }

  init ( p )
  { return new Promise( ( resolve, reject ) => {
    resolve( );
  } ); }

  update ( ) { }
}

module.exports = ( p ) => { return new Template( p ); }
