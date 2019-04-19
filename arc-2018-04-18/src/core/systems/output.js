'use strict';

class OutputSystem
{
  constructor ( )
  {
    this.stats = { };
  }

  setRenderer ( r ) // @ArcCore.Renderer
  {
    if ( r.constructor.name == 'Renderer' )
    { this.renderer = r; return this; }
    else
    { throw new Error( `received object type "${r.constructor.name}", expected object type "Renderer"` ); }
  }
}

module.exports = OutputSystem;
