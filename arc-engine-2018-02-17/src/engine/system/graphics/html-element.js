'use strict';

class HTMLElement
{
  constructor ( p = { } ) // { name:"", x:#, y:# }
  {
    this.element;

    if ( p.name ) { this.element = p.name; }
    else {
      this.init( );

      this.set( {
        "x":p.x || document.body.clientWidth,
        "y":p.y || document.body.clientHeight
      } );

      document.body.appendChild( this.element );
    }
  }

  init ( )
  {
    this.element = document.createElement( 'canvas' );
    this.element.setAttribute( 'id', 'app' );
  }

  update ( p )
  { }

  get ( )
  { return this.element; }

  set ( p ) // { x:#, y:# }, sets the width / height of the element
  {
    this.element.setAttribute( 'style', `width:${p.x}; height:${p.y};` );
    this.element.setAttribute( 'width', p.x );
    this.element.setAttribute( 'height', p.y );
  }
}

module.exports = ( p ) => { return new HTMLElement( p ); }
