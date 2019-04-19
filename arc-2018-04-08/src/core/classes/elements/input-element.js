'use strict';

class InputElement
{
  constructor ( p = { } ) // { entity:@ae.entity, config: { *action:ae.input.InputInstance } }
  {
    for ( let i of Object.keys( p.config ) )
    { this[i] = p.config[i]; }
  }
}

module.exports = InputElement;
