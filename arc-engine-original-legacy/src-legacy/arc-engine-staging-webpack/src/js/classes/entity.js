'use strict';

class Entity
{
  constructor ( params ) // { mesh:{ geometry, material, graphics }, oimo:{ world, type, size, pos, posShape, rot, move, density, friction, restitution, belongsTo, collidesWith } }
  {
    this.uuid = generateUUID( );
    this.name = `ENTITY-${this.uuid}`;

    this.generateOimo( params.oimo );
    this.sendModel( params.mesh );
  }

  generateOimo ( myOimo )
  {
    let oimoObject =
    {
      name:`OIMO-${this.uuid}`,
      type:myOimo.type, // type of shape : sphere, box, cylinder
      size:myOimo.size, // size of shape
      pos:myOimo.pos || [0,0,0], // start position in degree
      posShape:myOimo.posShape || [0,0,0], // Not sure what this does, but needed for complex objects
      rot:myOimo.rot || [0,0,0], // start rotation in degree
      move:myOimo.move || false, // dynamic or statique
      density:myOimo.density || 1,
      friction:myOimo.friction || 0.2,
      restitution:myOimo.restitution || 0.2,
      belongsTo:myOimo.belongsTo || 0xffffff, // The bits of the collision groups to which the shape belongs.
      collidesWith:myOimo.collidesWith || 0xffffffff // The bits of the collision groups with which the shape collides.
    };

    this.oimo = myOimo.world.add( oimoObject );
  }

  sendModel ( myModel )
  {
    postMessage( {
      "to":"graphics",
      "from":"engine",
      "command":"generateModel",
      "data":{
        "name":`MESH-${this.uuid}`,
        "geometry":myModel.geometry,
        "material":myModel.material,
        "position":this.oimo.getPosition( ),
        "quaternion":this.oimo.getQuaternion( )
      }
    } );
  }

  removeOimo ( myWorld )
  {
   myWorld.getByName( this.oimo.name ).dispose( );
   delete this.oimo;
  }
}
