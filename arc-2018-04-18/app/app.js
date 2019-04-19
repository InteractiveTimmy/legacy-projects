'use strict';

class DevelopmentApp
{
  constructor ( p ) // { name:"", entry:"" }, requires input string for target entry point
  {
    this.entry = p.entry; // contains local uri for entry file
    this.name = p.name; // contains name of file

    this.modules =
    {
      "FS": require( 'fs' ),
      "Express": require( 'express' ),
      "Browserify": require( 'browserify' )
    };

    this.bundle; // contains utf8 of bundled application
    this.webApp; // contains instance of express
  }

  start ( )
  { return new Promise( ( resolve, reject ) => {
    this.bundle( ).then( ( r ) => {
      console.log( r );
      this.copy( './app/public/js/' ).then( ( r ) => {
        console.log( r );
        this.web( ).then( ( r ) => {
          console.log( r );
          resolve( 'application started' );
        } ).catch( ( e ) => { console.log( e ); } );
      } ).catch( ( e ) => { console.log( e ); } );
    } ).catch( ( e ) => { console.log( e ); } );
  } ); }

  bundle ( )
  { return new Promise( ( resolve, reject ) => {
    this.bundle = new this.modules.Browserify( );
    this.bundle.add( this.entry );
    this.bundle.bundle( ( e, d ) => {
      if ( e ) { reject( e ); return; }
      this.bundle.code = d.toString( 'utf8' );
      this.modules.FS.writeFile( `./build/arc.js`, this.bundle.code, ( e ) => {
        if ( e ) { reject( e ); }
        resolve( 'application bundle ready' );
      } );
    } );
  } ); }

  copy ( p ) // "", copies file to target destination
  { return new Promise( ( resolve, reject ) => {
    this.modules.FS.copyFile( `./build/${this.name}`, `${p}${this.name}`, ( e ) => {
      if ( e ) { reject( e ); }
      resolve( 'application copied' );
    } );
  } ); }

  web ( )
  { return new Promise( ( resolve, reject ) => {
    this.webApp = new this.modules.Express( );
    this.webApp.use( '/', this.modules.Express.static( './app/public' ) );
    this.webApp.listen( 8080 );
    resolve( 'web application ready' );
  } ); }
}

let myApp = new DevelopmentApp( { "name": "arc.js", "entry": "./src/arc.js" } );
myApp.start( );
