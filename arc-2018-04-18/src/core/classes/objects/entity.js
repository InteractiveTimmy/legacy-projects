'use strict';

class Entity
{
  constructor ( e ) // [ ...@ArcCore.Element ]
  { this.loadElement( e ); }

  loadElement ( e ) // [ ...@ArcCore.Element ]
  {
    if ( Array.isArray( e ) )
    {
      for ( let i of e )
      {
        if ( !i.system ) { throw new Error( `element type not specified` ); }
        if ( !this.hasOwnProperty( i.system + 'Elements' ) ) { this[i.system + 'Elements'] = [ ]; }
        this[i.system + 'Elements'].push( i );
      }
    }
    else if ( e )
    {
      if ( !e.system ) { throw new Error( `element type not specified` ); }
      if ( !this.hasOwnProperty( e.system + 'Elements' ) ) { this[e.system + 'Elements'] = [ ];  }
      this[e.system + 'Elements'].push( e );
    }
    return this;
  }
}

module.exports = Entity;
