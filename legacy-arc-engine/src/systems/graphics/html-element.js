'use strict';

function TargetElement ( p = { } )
{
  let o;

  if ( p instanceof HTMLElement )
  { o = p; }
  else if ( typeof p == "string" )
  {
    o = document.getElementById( p );
    if ( !o )
    { throw `element ${p} doesn't exist`; }
  }
  else
  {
    document.getElementsByTagName( 'body' )[0].setAttribute( 'style', 'overflow:hidden;' );

    o = document.createElement( 'canvas' );
    o.setAttribute( 'id', 'app' );
    o.isDynamic = true;

    o.setSize = ( p = { } ) => // { x:#, y:# }
    {
      o.setAttribute( 'style', `width:${p.x}; height:${p.y};` );
      o.setAttribute( 'width', p.x );
      o.setAttribute( 'height', p.y );
    };

    o.setSize( {
      "x":document.body.clientWidth,
      "y":document.body.clientHeight
    } );
  }

  document.body.appendChild( o );
  return o;
};

module.exports = TargetElement;
