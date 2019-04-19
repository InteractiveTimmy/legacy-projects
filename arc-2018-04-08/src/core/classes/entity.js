'use strict';

class Entity
{
  constructor ( p = { } ) // { static:bool }
  {
    this.physicsElements = [ ];
    this.graphicsElements = [ ];
  }

  loadElement ( t, p = { } ) // "", { }
  {
    p.entity = this;
    this[t + 'Elements'].push( p );
    return this;
  }

  bindElements ( p, g )
  {
    if ( this.graphicsElements.find( e => e.uuid == g.uuid ) && this.physicsElements.find( e => e.uuid = p.uuid ) )
    {
      this.graphicsElements.find( e => e.uuid == g.uuid ).boundPhysicsElement = p;
      this.physicsElements.find( e => e.uuid = p.uuid ).boundGraphicsElement = g;
    }
    else
    {
      throw new Error ( `cannot find one or more child elements: ${p.uuid} || ${g.uuid}` );
    }
  }

  getChildByUUID ( p ) // "", gets a child by UUID
  {
    if ( this.reference.uuid.hasOwnProperty( p ) )
    { return this.children[this.reference.uuid[p]]; }
    else
    { throw new Error( `child uuid ${p} doesn't exist under parent ${this.uuid}` ); }
  }

  getChildByName ( p ) // "", gets a child by name
  {
    if ( this.reference.name.hasOwnProperty( p ) )
    { return this.children[this.reference.name[p]]; }
    else
    { throw new Error( `child name ${p} doesn't exist under parent ${this.uuid}` ); }
  }
}

module.exports = Entity;
