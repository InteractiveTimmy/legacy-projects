"use strict";

class Entity
{
  constructor ( params ) // { three:{ scene, etc }, oimo:{ world, etc } }
  {
    this.uuid = generateUUID( 'entity' );

    if ( params.three ) // geometry, material
    { this.generateMesh( params.three ); }

    if( params.oimo ) // world, etc
    {
      this.generateOimo( params.oimo );
      // this.oimo.connectMesh( this.mesh );
    }
  }

  generateOimo ( myOimo )
  {
    if ( !myOimo.world || !myOimo.type || !myOimo.size )
    { console.log( `Missing world, type, or size for generateOimo ${ this.uuid }` ); return; }

    let oimoObject =
    {
      name:myOimo.name || generateUUID( 'oimo' ),
      type:myOimo.type, // type of shape : sphere, box, cylinder
      size:myOimo.size, // size of shape
      pos:myOimo.pos || [0,0,0], // start position in degree
      posShape:myOimo.posShape || [0,0,0], // Not sure what this does, but needed for complex objects
      rot:myOimo.rotation || [0,0,0], // start rotation in degree
      move:myOimo.physicsed || false, // dynamic or statique
      density:myOimo.density || 1,
      friction:myOimo.friction || 0.2,
      restitution:myOimo.restitution || 0.2,
      belongsTo:myOimo.belongsTo || 0xffffff, // The bits of the collision groups to which the shape belongs.
      collidesWith:myOimo.collidesWith || 0xffffffff // The bits of the collision groups with which the shape collides.
    };

    this.oimo = myOimo.world.add( oimoObject );
    this.oimo.connectMesh( this.mesh );
  }

  generateMesh ( myThree )
  {
    this.mesh = new THREE.Mesh( myThree.geometry, myThree.material );
    myThree.scene.add( this.mesh );
  }

  removeOimo ( myWorld )
  {
    myWorld.getByName( this.oimo.name ).dispose( );
    delete this.oimo;
  }

  dispose ( )
  {

    if ( this.mesh )
    { this.mesh.dispose( ); }
    if ( this.oimo )
    { this.oimo.dispose( ); }

    this.dispose( );

  }

}
