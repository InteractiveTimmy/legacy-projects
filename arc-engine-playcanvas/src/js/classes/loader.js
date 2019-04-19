'use strict';

class Loader
{
  constructor ( p ) // { "directory":"" }, used to load resources
  {
    this.directory = p.directory; // global directory for resources
    this.pcLoader = new pc.ResourceLoader( ); // load handler

    let handlers = [ 'Animation', 'Audio', 'Binary', 'Css', 'Cubemap', 'Folder', 'Font', 'Hierarchy', 'Html', 'Json', 'Material', 'Model', 'Scene', 'SceneSettings', 'Script', 'Shader', 'Text', 'Texture' ]
    for ( let h in handlers )
    {
      try { this.pcLoader.addHandler( handlers[h].toLowerCase( ), new pc[handlers[h] + 'Handler']( ) ); }
      catch ( error ) { console.log( handlers[h] ); }
    }

    console.log( this.pcLoader );

    console.log( Promise );

    console.log( 'initialized', this );

    this.loadFile( { "path":"worlds/test.json", "type":"model" } ).then( ( r ) => {
      console.log( r );
    } ).catch( ( e ) => {
      throw e;
    } );
  }

  loadFile ( p ) // { "path":"", "type":"" }, loads a single file
  { return new Promise( ( resolve, reject ) => {
    if ( p && p.path && p.type )
    {
      this.pcLoader.load( this.directory + p.path, p.type, ( e, r ) => {
        if ( e ) { reject( new Error( e ) ); }
        else { resolve( r ); }
      } );
    }
    else
    { reject( new Error( 'missing parameters' ) ); }
  } ); }

  load ( p ) // ![ { "path":"", "type":"" } ], loads a file
  { return new Promise ( ( resolve, reject ) => {
    let arrObj = [ ];
    let arrFun = [ ];

    if ( !Array.isArray( p ) )
    { arrObj.push( p ); }
    else
    { arrObj = p; }

    for ( let x in arrObj )
    {
      arrFun.push( this.pcLoader.load( `${this.directory}`))
    }



    resolve( ); // TEMP: resolve for now
  } ); }
}

module.exports = ( p ) => { return new Loader( p ); }
