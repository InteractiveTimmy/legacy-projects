'use strict';

class RendererHandler
{
  constructor ( p = { } ) // { "canvas":@element, "antialias":bool }
  {
    this.renderer = new THREE.WebGLRenderer( { "canvas":p.canvas, "antialias":p.aa || true } );
    this.renderer.setClearColor( p.cc || 0x222222 );
  }

  update ( p )
  {
    for ( let v in p.view )
    {
      this.renderer.setViewport(
        p.view[v].vp.x * this.renderer.getSize( ).width,
        p.view[v].vp.y * this.renderer.getSize( ).height,
        p.view[v].vp.w * this.renderer.getSize( ).width,
        p.view[v].vp.h * this.renderer.getSize( ).height
      );
      this.renderer.setScissor(
        p.view[v].vp.x * this.renderer.getSize( ).width,
        p.view[v].vp.y * this.renderer.getSize( ).height,
        p.view[v].vp.w * this.renderer.getSize( ).width,
        p.view[v].vp.h * this.renderer.getSize( ).height
      );
      this.renderer.setScissorTest( true );

      this.renderer.render( p.scene, p.view[v] );
    }
  }

  setSize ( p )
  {
    this.renderer.setSize( p.x, p.y );
  }

  get ( ) { return this.renderer; }
}

module.exports = ( p ) => { return new RendererHandler( p ); }
