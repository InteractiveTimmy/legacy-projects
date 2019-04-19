'use strict';

class Logger
{
  constructor ( p = { } ) // { target:f, levels:{ ..."":bool } }
  {
    this.target = ( p.target ? p.target : console.log );
    this.levels = { };
    if ( p.hasOwnProperty( 'levels' ) )
    { this.levels = p.levels; }
  }

  write ( m = [ ], l = "all" )
  {
    let obj = ""
    if ( this.levels.self ) { obj = m[1] }
    if ( this.levels[l] || l == "all" ) { this.target( m[0], obj ); }
  }

  enableAll ( )
  {
    this.levels.load = true;
    this.levels.unload = true;
    this.levels.error = true;
    this.levels.stats = true;
    this.levels.self = true;
  }
}

module.exports = ( p ) => { return new Logger( p ); }
