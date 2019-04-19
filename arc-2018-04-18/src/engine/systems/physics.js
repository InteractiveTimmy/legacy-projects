'use strict';

class PhysicsSystem
{
  constructor ( )
  {
    this.modules =
    {
      "Webworkify": require( 'webworkify' )
    };

    this.physics = this.modules.Webworkify( require( './physics/worker.js' ) );
    this.physics.onmessage = ( e ) => { if ( e.isTrusted ) { this.handleMessage( e.data ); } };

    this.world;
    this.buffer = [ ];
  }

  loadEntity ( p )
  {
    this.physics.postMessage( { "c": "loadEntity", "p": {
      "uuid": p.uuid,
      "type": "box",
      "shape": [ 0.5, 0.5, 0.5 ],
      "mass": 1,
      "position": p.position.toArray( ),
      "rotation": p.quaternion.toArray( )
    } } );
  }

  loadWorld ( p ) // @Engine.World
  { this.world = p; console.log( this.world.children ); }

  updateWorld ( p ) // [ ...{ uuid:"", transform:{ position: [x,y,z], rotation: [x,y,z,w] } } ]
  {
    let object;
    for ( let o of p )
    {
      console.log( o );
      object = this.world.getObjectByProperty( 'uuid', o[0] );
      object.position.set( o[1], o[2], o[3] );
      object.quaternion.set( o[4], o[5], o[6], o[7] );

      // object.position.set( ...o.transform.position );
      // object.quaternion.set( ...o.transform.rotation );
    }
  }

  updateBuffer ( p )
  {
    this.buffer = p;
  }

  step ( )
  {
    if ( this.buffer.length > 0 )
    {
      let object;
      for ( let o of this.buffer )
      {
        object = this.world.getObjectByProperty( 'uuid', o[0] );
        object.position.set( o[1], o[2], o[3] );
        object.quaternion.set( o[4], o[5], o[6], o[7] );
      }
      this.buffer.length = 0;
    }
    // this.physics.postMessage( { "c": "step", "p": { "dt": dt } } );
  }

  handleMessage ( p )
  {
    if ( typeof this[p.c] === 'function' )
    { this[p.c]( p.p ); }
    else
    { throw new Error( `function ${p.c} does not exists` ); }
  }
}

module.exports = PhysicsSystem;
