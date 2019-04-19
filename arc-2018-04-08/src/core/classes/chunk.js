'use strict';

class Chunk
{
  constructor ( p ) // { physicsChunk: @Core.PhysicsChunk, graphicsChunk: @Core.GrahpicsChunk }
  {
    this.stats =
    {
      "isActive": false
    };

    this.chunks =
    {
      "PhysicsChunk": require( './chunk/physics-chunk.js' ),
      "GraphicsChunk": require( './chunk/graphics-chunk.js' )
    };

    this.physicsChunk = new this.chunks.PhysicsChunk( p );
    this.graphicsChunk = new this.chunks.GraphicsChunk( );
  }

  activate ( p )
  {
    this.stats.isActive = true;
    this.physicsChunk.activate( );
    this.graphicsChunk.activate( p );
  }

  deactivate ( p )
  {
    this.stats.isActive = false;
    this.physicsChunk.deactivate( );
    this.graphicsChunk.deactivate( p );
  }

  loadEntity ( p ) // @Core.Entity
  {
    if ( p.constructor.name != 'Entity' )
    { throw new Error( `parameter is not of type Entity` ); }
    else
    {
      this.physicsChunk.loadPhysicsElements( p.physicsElements );
      this.graphicsChunk.loadGraphicsElements( p.graphicsElements );
    }

    return this;
  }

  unloadEntity ( p )
  {

  }
}

module.exports = Chunk;
