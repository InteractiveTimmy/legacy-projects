'use strict';

class Systems
{
  constructor ( p )
  { }

  init ( p ) // [ { name:"", config:{ ... } } ]
  { return new Promise( ( resolve, reject ) => {
    let arrPromises = [ ];

    for ( let s in p )
    { arrPromises.push( this.load( p[s] ) ); }

    Promise.all( arrPromises ).then( ( r ) => {
      resolve( );
    } ).catch( ( e ) => {
      reject( );
    } );
  } ); }

  load ( p ) // { name:"", config:{ ... } }, used to load a system
  { return new Promise( ( resolve, reject ) => {
    let systemModule = require( `./${p.name}/${p.name}.js` );
    this[p.name] = new systemModule( );
    this[p.name].init( p.config ).then( ( r ) => {
      resolve( );
    } ).catch( ( e ) => {
      reject( );
    } );
  } ); }

  unload ( p ) // { name:"" }, used to unload a system by name
  { return new Promise( ( resolve, reject ) => {
    this[p.name].unLoad( ).then( ( r ) => {
      delete this[p.name];
      resolve( );
    } );
  } ); }

  update ( )
  {
    for ( let s in this )
    {
      if ( this[s].stats.state == 'ready' )
      { this[s].update( ); }
    }
  }
}

module.exports = ( p ) => { return new Systems( p ); }
