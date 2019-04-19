// NOTE test object -- begin
this.entityA = new this.engine.Entity( );

this.materialA = new this.engine.Material( 'MeshBasic', { "color": 0xaaaaaa } );
this.geometryA = new this.engine.Geometry( 'BoxBuffer', [ 2, 2, 2 ] );
this.meshA = new this.engine.Mesh( { "geometry": this.geometryA, "material": this.materialA } );

this.entityA.loadElement( 'Mesh', { "mesh": this.meshA } );
this.entityA.position.set( 0, -2, -5 );

// this.world.add( this.entityA );
// NOTE test object -- end

// NOTE test floor -- begin
this.entityB = new this.engine.Entity( );

this.materialB = new this.engine.Material( 'MeshBasic', { "color": 0x777777 } );
this.geometryB = new this.engine.Geometry( 'BoxBuffer', [ 32, 2, 32 ] );
this.meshB = new this.engine.Mesh( { "geometry": this.geometryB, "material": this.materialB } );

this.entityB.loadElement( 'Mesh', { "mesh": this.meshB } );
this.entityB.position.set( 0, -4, 0 );

// this.world.add( this.entityB );
// NOTE test floor -- end

// NOTE test obstacles -- begin
let os = 2; // obstacle size
let fs = 16; // floor size
let ran = 0.1; // random chance

this.geometryC = new this.engine.Geometry( 'BoxBuffer', [ 2, 2, 2 ] );
let objectMesh;
this.meshesA = [ ];

for ( let x = -fs / 2; x <= fs / 2; x += os )
{
  for ( let y = -fs / 2; y <= fs / 2; y += os )
  {
    for ( let z = -fs / 2; z <= fs / 2; z += os )
    {
      if ( Math.random( ) <= ran )
      {
        objectMesh = new this.engine.Mesh( { "geometry": this.geometryC } );
        objectMesh.position.set( x, y, z );
        objectMesh.position.y += 6;
        this.meshesA.push( objectMesh );
        // this.world.add( objectMesh );
      }
    }
  }
}
// NOTE test obstacles -- end

// NOTE chunk -- begin
this.chunkA = new this.engine.Chunk( );

this.chunkA.add( this.entityA );
this.chunkA.add( this.entityB );
/*
for ( let o of this.meshesA )
{
  this.chunkA.add( o );
}
*/

this.world.add( this.chunkA );
// NOTE chunk -- end

// NOTE box helper test -- begin
this.boxHelper = new THREE.BoxHelper( this.chunkA, 0xff0000 );
console.log( this.boxHelper )
this.world.add( this.boxHelper );
// NOTE box helper test -- end
