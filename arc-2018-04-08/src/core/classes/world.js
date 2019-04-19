'use strict';

class World extends THREE.Scene
{
  constructor ( ) // { physics: @Engine.PhysicsSystem }
  {
    super( );

    this.chunks = [ ];
  }

  activateChunks ( p ) // [ ...@Core.Chunk ]
  {
    for ( let o of p )
    {
      if ( o.constructor.name == 'Chunk' )
      { o.activate( this ); }
      else
      { throw new Error( `chunk "${o.uuid}" is not an instance of Core.Chunk` ); }
    }
    return this;
  }

  deactivateChunks ( p ) // [ ...@Core.Chunk ]
  {
    for ( let o of p )
    {
      if ( o.constructor.name == 'Chunk' )
      { o.deactivate( this ); }
      else
      { throw new Error( `chunk "${o.uuid}" is not an instance of Core.Chunk` ); }
    }
    return this;
  }

  loadChunks ( p ) // [ ...@Core.Chunk ]
  {
    for ( let o of p )
    {
      if ( this.chunks.filter( c => o.uuid == c.uuid ).length > 0 )
      { throw new Error( `chunk "${o.uuid}" already exists in World ${this.uuid} chunks` ); }
      else if ( o.constructor.name == 'Chunk' )
      { this.chunks.push( o ); }
      else
      { throw new Error( `chunk "${o.uuid}" is not an instance of Core.Chunk` ); }
    }
    return this;
  }
}

module.exports = World;
