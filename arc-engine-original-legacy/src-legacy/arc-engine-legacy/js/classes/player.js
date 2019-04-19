'use strict';

class Player
{
  constructor ( params )
  {
    this.name = `PLAYER-${generateUUID( )}`;
    this.input = params;

    this.PI_2 = Math.PI / 2;

    this.position = new THREE.Vector3( 0, 0, 0 );
    this.rotation = new THREE.Euler( 0, 0, 0, 'YXZ' );
    this.direction = new THREE.Vector3( 0, 0, -1 );

    this.moveSpeed = 3;
    this.lookSensitivity = 0.5;
    this.actions = {};

    for ( let key in params )
    {
      if ( !isNaN( key ) )
      { this.actions[params[key].action] = { "active":false }; }
      else
      { this.actions[key] = { "active":{ "x":0, "y":0 } }; }
    }
  }

  update ( params ) // TPS
  {
    this.checkInput( params )
    postMessage( {
      "to":"graphics",
      "from":"engine",
      "command":"updateCamera",
      "data":{
        "rotation":this.rotation,
        "position":this.position
      }
    } );
  }

  checkInput ( params )
  {
    // Check Mouse Input -- Begin
    this.rotation.y -= this.actions.look.active.x * ( this.lookSensitivity / params.tps );
    this.rotation.x -= this.actions.look.active.y * ( this.lookSensitivity / params.tps );
    this.rotation.x = Math.max( - this.PI_2, Math.min( this.PI_2, this.rotation.x ) );

    this.actions.look.active = { "x":0, "y":0 };

    let influence = new THREE.Vector3( );
    // console.log( this.actions );

    if ( this.actions.forwards.active ) { influence.z -= 1; }
    if ( this.actions.backwards.active ) { influence.z += 1; }
    if ( this.actions.left.active ) { influence.x -= 1; }
    if ( this.actions.right.active ) { influence.x += 1; }
    if ( this.actions.up.active ) { influence.y += 1; }
    if ( this.actions.down.active ) { influence.y -= 1; }

    influence.applyEuler( this.rotation );
    influence.multiply( new THREE.Vector3(
      this.moveSpeed / params.tps,
      this.moveSpeed / params.tps,
      this.moveSpeed / params.tps
    ) );

    this.position.add( influence );

    // console.log( this.quaternion );

    // Check Mouse Input -- End

    // if ( this.actions.)
  }

}
