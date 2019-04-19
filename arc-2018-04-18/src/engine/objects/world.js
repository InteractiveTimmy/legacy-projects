'use strict';

class World extends THREE.Scene
{
  constructor ( ) // { physics: @Engine.PhysicsSystem }
  {
    super( );

    this.friction = new THREE.Vector3( 0.95, 0.95, 0.95 );
    this.gravity = new THREE.Vector3( 0, -1, 0 );
  }

  update ( dt )
  {
    for ( let c of this.children )
    {
      if ( c.isReady == true )
      {
        c.update( dt, this.friction, this.gravity, this );
      }
    }
  }
}

module.exports = World;
