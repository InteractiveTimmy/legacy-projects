'use strict';

class PhysicsSystem
{
  constructor ( )
  {
    this.stats =
    {
      "ready": false,
      "running": false,
      "dt": 0
    };

    this.children = [ ];

    this.stats.ready = true;
  }

  loadPhysicsChunk ( p ) // @Core.PhysicsChunk
  {
    if ( p.constructor.name != 'PhysicsChunk' )
    { throw new Error( `parameter is not of type PhysicsChunk` ); }
    else if ( this.children.filter( c => p.uuid == c.uuid ).length > 0 )
    { throw new Error( `PhysicsChunk "${p.uuid}" already exists in physics system's active physics chunks`); }
    else
    { this.children.push( p ); return p; }
  }

  unloadPhysicsChunk ( p ) // @Core.PhyicsChunk
  {
    if ( p.constructor.name != 'PhysicsChunk' )
    { throw new Error( `parameter is not of type PhysicsChunk` ); }
    else if ( this.children.filter( c => p.uuid == c.uuid ).length < 1 )
    { throw new Error( `PhysicsChunk "${p.uuid}" doesn't exists in physics system's physics chunks`); }
    else
    { this.children = this.children.filter( c => p.uuid != c.uuid ); return p; }
  }

  getPhysicsChunkByUUID ( p = "" ) // "", uuid
  { return this.children.find( c => p == c.uuid ) }

  getPhysicsChunkByName ( p = "" ) // "", name
  { return this.children.find( c => p == c.name ); }

  start ( )
  { this.stats.running = true; }

  stop ( )
  { this.stats.running = false; }

  step ( dt )
  {
    if ( this.stats.ready && this.stats.running )
    {
      for ( let c of this.children )
      {
        if ( c.stats.isActive )
        {
          c.physicsChunk.step( dt );
        }
      }
    }
    else
    { return; }
  }
}

module.exports = PhysicsSystem;
