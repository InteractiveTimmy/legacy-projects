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

  update ( s ) // { scene:@scene }
  {
    if ( this.views.length == 1 )
    { this.render( s, this.views[0] ); }
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

        this.render( s, this.views[v] );
      }
    }
  }

  setDimensions ( p = { } ) // { width:#, height:# }
  {
    this.setSize( p.width, p.height );
    for ( let v in this.views )
    { this.views[v].setViewPort( p ); }
  }

  loadView ( v ) // [ ...@ArcCore.View ]
  {
    if ( Array.isArray( v ) )
    {
      for ( let i of v )
      {
        if ( i.constructor.name == 'View' )
        { this.views.push( i ); }
        else
        { throw new Error( `received array object is not of type "view"` ); }
      }
    }
    else if ( v.constructor.name == 'View' )
    { this.views.push( v ); }
    else
    { throw new Error( `received object is not of type "View" or "Array"`); }

    this.setDimensions( this.getSize( ) );
    return this;
  }

  unloadView ( v ) // [ ...@ArcCore.View ]
  {
    if ( Array.isArray( v ) )
    {
      for ( let i of v )
      {
        if ( this.views.filter( c => i.uuid == c.uuid ).length < 1 )
        { throw new Error( `view "${o.uuid}" doesn't exists in Arc.Renderer ${this.uuid} views` ); }
        else if ( i.constructor.name == 'View' )
        { this.views = this.views.filter( c => i.uuid != c.uuid ); }
        else
        { throw new Error( `view "${o.uuid}" is not an instance of Arc.View` ); }
      }
    }
    else if ( v.constructor.name == 'View' )
    {
      if ( this.views.filter( c => v.uuid == c.uuid ).length < 1 )
      { throw new Error( `view "${v.uuid}" doesn't exists in Arc.Renderer ${this.uuid} views` ); }
      else ( v.constructor.name == 'View' )
      { this.views = this.views.filter( c => v.uuid != c.uuid ); }
    }
    else
    { throw new Error( `received object is not of type "View" or "Array"`); }

    this.setDimensions( this.getSize( ) );
    return this;
  }
}

module.exports = Renderer;
