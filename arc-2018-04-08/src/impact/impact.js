'use strict';

class ArcImpact
{
  constructor ( p ) // { core: @ArcCore }
  {
    this.core = p.core;

    // initialize world
    this.world = new this.core.World( );

    // initialize chunks
    this.chunks = [ ];

    // initialize view
    this.view = new this.core.View( { "x": 0, "y": 0, "w": 1, "h": 1 } );
    this.view.position.set( 0, 0, 16 );
    this.core.systems.output.loadView( this.view ); // load view NOTE: needs to be changed to load along side world

    // create new chunk
    this.chunks.push( new this.core.Chunk( { "gravity": [ 0, -10, 0 ] } ) );

    // create entities
    this.entities = [ ];
    this.entities.push(
      new this.core.Entity( ).loadElement( 'graphics', new this.core.Mesh( {
        "geometry": new this.core.Geometry( 'BoxBuffer', [ 16, 2, 4 ] ),
        "material": new this.core.Material( 'MeshBasic', { "color": 0x888888 } )
      } ) ).loadElement( 'physics', new this.core.PhysicsBody( {
        "type": "box",
        "shape": [ 8, 1, 2 ],
        "mass": 0,
        "position": [ 0, -8, 0 ]
      } ) )
    );
    this.entities[0].bindElements( this.entities[0].physicsElements[0], this.entities[0].graphicsElements[0] );
    this.chunks[0].loadEntity( this.entities[0] );

    this.entities.push(
      new this.core.Entity( ).loadElement( 'graphics', new this.core.Mesh( {
        "geometry": new this.core.Geometry( 'BoxBuffer', [ 1, 1, 1 ] ),
        "material": new this.core.Material( 'MeshBasic', { "color": 0xcccccc } )
      } ) ).loadElement( 'physics', new this.core.PhysicsBody( {
        "type": "box",
        "shape": [ 0.5, 0.5, 0.5 ],
        "mass": 1,
        "position": [ 0, 8, 0 ]
      } ) )
    );
    console.log( 'test', this.entities[1].physicsElements[0] );
    console.log( Ammo );
    // this.entities[1].physicsElements[0].setCollisionFlags( this.entities[1].physicsElements[0].getCollisionFlags( ) );
    this.entities[1].physicsElements[0].setLinearFactor( new Ammo.btVector3( 1, 1, 0 ) );
    this.entities[1].bindElements( this.entities[1].physicsElements[0], this.entities[1].graphicsElements[0] );
    this.chunks[0].loadEntity( this.entities[1] );

    // load assets
    this.world.loadChunks( this.chunks );
    this.core.loadWorld( this.world );
    this.world.activateChunks( this.chunks );

    // set inputs
    this.input = { };
    this.input.right = this.core.systems.input.get( 'k68' );
    this.input.left = this.core.systems.input.get( 'k65' );
    this.input.up = this.core.systems.input.get( 'k87' );
    this.input.down = this.core.systems.input.get( 'k83' );

    this.core.on( 'update', ( e ) => { this.step( e ); } );

    this.core.start( );
  }

  step ( dt )
  {
    if ( this.input.right.value != 0 || this.input.left.value != 0 || this.input.up.value != 0 || this.input.down.value != 0 )
    { this.entities[1].physicsElements[0].activate( ); }
    this.entities[1].physicsElements[0].applyForce( new Ammo.btVector3(
      ( this.input.right.value - this.input.left.value ) * 15,
      ( this.input.up.value - this.input.down.value ) * 15,
      0
    ), new Ammo.btVector3( ) );
  }
}

module.exports = ArcImpact;
