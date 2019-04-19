'use strict';

class GraphicsChunk
{
  constructor ( p = { } ) // { gravity: [x,y,z] }
  {

    this.stats =
    {
      "isActive": false
    };

    this.uuid = UUID( );

    this.children = [ ]; // holds all children
  }

  activate ( p )
  {
    this.stats.isActive = true;
    for ( let c of this.children )
    { p.add( c ); }
  }

  deactivate ( p )
  {
    this.stats.isActive = false;
    for ( let c of this.children )
    { p.remove( c ); }
  }

  loadGraphicsElements ( p ) // [ ...@Three.Object3D ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length > 0 )
      { throw new Error( `element "${o.uuid}" already exists in GraphicChunk ${this.uuid} children` ); }
      else if ( o instanceof THREE.Object3D )
      { this.children.push( o ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Three.Object3D` ); }
    }
    return this;
  }

  unloadGraphicsElements ( p ) // [ ...@Three.Object3D ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length < 1 )
      { throw new Error( `element "${o.uuid}" doesn't exists in GraphicChunk ${this.uuid} children` ); }
      else if ( o instanceof THREE.Object3D )
      { this.children = this.children.filter( c => o.uuid != c.uuid ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Three.Object3D` ); }
    }
    return this;
  }
}

module.exports = GraphicsChunk;
