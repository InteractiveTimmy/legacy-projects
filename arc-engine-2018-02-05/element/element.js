'use strict';

class Element
{
  constructor ( p ) // { parent:{ ... }, type:"", config:{ ... } }
  {
    require( `./${p.type}.js` ).call( this, p.config );
    // require( `./${p.type}.js` ).call( this, p.config );

    this.parent = p.parent;
  }

  step ( p ) // { rate:# }
  {

  }
}

module.exports = Element;
