'use strict';

class Graphics
{
  constructor ( ) // { }
  {
    this.stats = { "state":"idle" };
  }

  init ( p ) // { !element:"" }
  { return new Promise( ( resolve, reject ) => {
    if ( !p ) { p = { }; }

    if ( !p.hasOwnProperty( 'element' ) )
    {
      this.element = document.createElement( 'canvas' );
      this.element.setAttribute( 'id', 'app' );
      this.element.setAttribute( 'style', `width:${document.body.clientWidth}; height:${document.body.clientHeight};` );
      this.element.setAttribute( 'width', document.body.clientWidth );
      this.element.setAttribute( 'height', document.body.clientHeight );
      document.body.appendChild( this.element );
    }
    else
    { this.element = p.element; }

    this.renderer = new THREE.WebGLRenderer( { canvas:this.element, antialias:true } );
    this.renderer.setClearColor( 0x222222 );

    this.scene = new THREE.Scene( );

    this.camera = new THREE.PerspectiveCamera( 70, document.body.clientWidth / document.body.clientHeight );
    this.camera.position.set( 0, 0, 5 );

    this.box = new THREE.Mesh(
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { "color":0xffbb77 } )
    );
    this.box.rotation.set( 0.5, 0, 0 );

    this.scene.add( this.box );

    this.stats.state = 'ready';
    resolve( );
  } ); }

  load ( p ) // { geometry:{ type:"", params:[ ... ] }, material:{ type:"", params:{ ... } } }
  {
    let meshObject = new THREE.Mesh(
      new THREE[`${p.geometry}Geometry`]( ...p.geometry.params ),
      new THREE[`Mesh${p.material.type}Material`]( p.material.params )
    );
    this.scene.add( meshObject );
    return meshObject;
  }

  update ( )
  {
    this.renderer.render( this.scene, this.camera );
    this.box.rotation.x += 0.01;
    this.box.rotation.y += 0.01;
  }
}

module.exports = Graphics;
