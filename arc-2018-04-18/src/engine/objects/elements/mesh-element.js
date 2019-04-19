'use strict';

class MeshElement
{
  constructor ( p = { } ) // { entity:@ae.Entity, config:{ } }
  {
    this.entity = p.entity;
    this.entity.add( p.config.mesh );
  }
}

module.exports = MeshElement;
