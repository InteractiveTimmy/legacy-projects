'use strict';

class Systems
{
  constructor ( )
  {

  }

  init ( p ) // [ { name:"", config:{ ... } } ]
  { return new Promise( ( resolve, reject ) => {

    let parr = [ ]; // promise array

    for ( let s in p )
    { parr.push( this.loadSystem( p[s] ) ); }

    Promise.all( parr ).then( ( r ) => {
      resolve( );
    } ).catch( ( e ) => {
      reject( );
    } );
  } ); }

  step ( )
  {
    for ( let s in this )
    { this[s].update( ); }
  }

  start ( p )
  { return new Promise( ( resolve, reject ) => {

    resolve( );
  } ); }

  stop ( p )
  { return new Promise( ( resolve, reject ) => {

    resolve( );
  } ); }

  loadEntity ( p )
  { return new Promise( ( resolve, reject ) => {
    for ( let e in p.elements )
    {
      for ( let s in this )
      {
        if ( this[s].handles.hasOwnProperty( e ) ) { this[s][`load${e}`]( p ); }
      }
    }
    resolve( 'done' );
  } ); }

  unloadEntity ( p )
  {

  }

  loadSystem ( p )
  { return new Promise( ( resolve, reject ) => {
    this[p.name] = require( `./${p.name}/${p.name}.js` )( p.config );
    // this[p.name] = new systemModule( );
    this[p.name].init( p.config ).then( ( r ) => {
      resolve( );
    } ).catch( ( e ) => {
      reject( );
    } );
  } ); }

  unloadSystem ( p )
  { return new Promise( ( resolve, reject ) => {

    resolve( );
  } ); }
}

module.exports = ( p ) => { return new Systems( ); };
