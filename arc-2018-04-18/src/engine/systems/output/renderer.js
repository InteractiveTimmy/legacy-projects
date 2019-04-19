'use strict';

class Renderer extends THREE.WebGLRenderer
{
  constructor ( p = { } ) // { element:@element, clearColor:b24, antialias:bool }
  {
    if ( p.hasOwnProperty( 'canvas' ) )
    { super( { "canvas": p.element, "antialias": p.antialias || true } ); }
    else
    { super( { "antialias": p.antialias || true } ); }

    if ( !p.hasOwnProperty( 'element' ) )
    {
      window.addEventListener( 'resize', ( ) => {
        this.setDimensions( {
          "width": document.body.clientWidth,
          "height": document.body.clientHeight
        } );
      }, false );

      document.body.appendChild( this.domElement );

      this.setDimensions( {
        "width": document.body.clientWidth,
        "height": document.body.clientHeight
      } );
    }

    this.setClearColor( p.clearColor || 0x222222 );

    this.views = [ ];
  }

  update ( p = { } ) // { scene:@scene }
  {
    if ( this.views.length == 1 )
    { this.render( p.scene, this.views[0] ); }
    else if ( this.views.length > 1 )
    {
      for ( let v in this.views )
      {
        this.setViewport(
          this.views[v].specs.viewPort.x * this.getSize( ).width,
          this.views[v].specs.viewPort.y * this.getSize( ).height,
          this.views[v].specs.viewPort.w * this.getSize( ).width,
          this.views[v].specs.viewPort.h * this.getSize( ).height
        );
        this.setScissor(
          this.views[v].specs.viewPort.x * this.getSize( ).width,
          this.views[v].specs.viewPort.y * this.getSize( ).height,
          this.views[v].specs.viewPort.w * this.getSize( ).width,
          this.views[v].specs.viewPort.h * this.getSize( ).height
        );
        this.setScissorTest( true );

        this.render( p.scene, this.views[v] );
      }
    }
  }

  setDimensions ( p = { } ) // { width:#, height:# }
  {
    this.setSize( p.width, p.height );
    for ( let v in this.views )
    { this.views[v].setViewPort( p ); }
  }

  load ( p = { } )
  {
    this.views.push( p );
    this.setDimensions( this.getSize( ) )
  }

  unload ( p = { } )
  { }
}

module.exports = Renderer;
