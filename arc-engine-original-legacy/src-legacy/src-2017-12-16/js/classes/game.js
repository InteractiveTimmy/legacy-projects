'use strict';

module.exports = class Game
{
  constructor ( )
  {
    console.log( this.test );
    this.modules = require( '../modules.js' );

    this.graphics = new this.modules.graphics( {
      "element":document.getElementById( 'app' ),
      "three":this.modules.external.three,
      "config":this.modules.config
    } );

    this.player = new this.modules.assets.player( );

    this.input = new this.modules.input( 'app' );

    // TEMP Example Mesh Add
    let testBulkMesh = [];
    for ( let x = 0; x < 0; x++ )
    {
      testBulkMesh.push( {
        "geometry":new this.modules.external.three.BoxGeometry( 0.1, 0.1, 0.1 ),
        "material":new this.modules.external.three.MeshBasicMaterial( {
          color:`rgb(
          ${Math.floor( Math.random( ) * 255 )},
          ${Math.floor( Math.random( ) * 255 )},
          ${Math.floor( Math.random( ) * 255 )}
        )`} ),
        "position":[ -0.5 + Math.random( ), -0.5 + Math.random( ), -2 + Math.random( ) ],
        "rotation":[ Math.random( ), Math.random( ), Math.random( ) ],
        "name":`MESH-${this.modules.utils.generateUUID( )}`
      } );
    }
    /*
    this.testEntity = new this.modules.assets.entity( {
      "three":this.modules.external.three,
      "name":
    } );

    this.graphics.addMesh( testBulkMesh );
    */

    this.floorMesh = {
      "geometry":new this.modules.external.three.BoxGeometry( 10, 1, 10 ),
      "material":new this.modules.external.three.MeshBasicMaterial( { color:0x999999 } ),
      "position":[ 0, -2, 0 ],
      "rotation":[ 0, 0, 0 ],
      "name":`MESH-${this.modules.utils.generateUUID( )}`
    };

    this.graphics.addMesh( [ this.floorMesh ] );

    // this.graphics.removeMesh( { "name":this.testMesh.name } );

    console.log( 'constructed', this );
  }

  loop ( )
  {
    window.requestAnimationFrame( ( ) => {
      this.loop( );
    } );

    this.graphics.update( );
  }
}
