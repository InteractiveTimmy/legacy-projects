"use strict";

class Player
{
  constructor ( params ) // { name, camera:{ fov, aspect, near, far } }
  {

    this.camera = new THREE.PerspectiveCamera(
      params.camera.fov,
      params.camera.aspect,
      params.camera.near,
      params.camera.far
    );
    this.camera.rotation.reorder( 'YXZ' );

    this.PI_2 = Math.PI / 2;

    this.input = {};
    this.input.viewChange = {};
    this.viewSensitivity = 0.005;
    this.name = params.name;

    this.distance = 2;
    this.camera.position.set( 0, 0, this.distance );

    this.viewObject = new THREE.Object3D( );
    this.viewObject.position.set( 0, 0, 0 );
    this.viewObject.rotation.reorder( 'YXZ' );
    this.viewObject.lookAt( this.camera.position );

    this.rotation = new THREE.Euler( ).copy( this.viewObject.rotation );
    this.rotation.reorder( 'YXZ' );

  }

  updatePlayer ( )
  {

    this.viewObject.position.copy( game.skeleton.bones[0].entity.mesh.position );

    this.checkInput( );

    // Clear viewChange
    this.input.viewChange.x = 0;
    this.input.viewChange.y = 0;

  }

  checkInput ( )
  {

    // Check Mouse Input -- Begin
    this.camera.rotation.y -= this.input.viewChange.x * this.viewSensitivity;
		this.camera.rotation.x -= this.input.viewChange.y * this.viewSensitivity;
    this.camera.rotation.x = Math.max( - this.PI_2, Math.min( this.PI_2, this.camera.rotation.x ) );

    this.viewObject.rotation.x = this.camera.rotation.x;
    this.viewObject.rotation.y = this.camera.rotation.y;

    // Check Mouse Input -- End

    // Check Keyboard Input -- Begin
    if ( this.input.forwards.active ) { this.distance *= 0.98; }
    if ( this.input.right.active ) { game.skeleton.setRagDoll( game.world ); }
    if ( this.input.left.active ) { game.skeleton.setAnimated( game.world ); }
    if ( this.input.sprint.active ) { game.skeleton.setOriginalLocation( ); }
    if ( this.input.weaponA.active ) { game.skeleton.setRagDoll( game.world, true ); }
    if ( this.input.weaponB.active ) { game.skeleton.setOriginalRotation( ); }
    if ( this.input.weaponC.active ) { game.skeleton.setSleep( ); }
    if ( this.input.weaponD.active ) { game.skeleton.setAwake( ); }
    if ( this.input.down.active ) {
      let myRandom = Math.floor( Math.random( ) * (game.skeleton.joints.length) );
      game.skeleton.removeJoint (
      game.world,
      game.skeleton.joints[ myRandom ] );
    }
    if ( this.input.backwards.active ) { this.distance *= 1.02; }
    /*
    if ( this.input.right.active ) { game.scene.children[0].oimo.angularVelocity.x = 10; }
    if ( this.input.left.active ) { game.scene.children[0].oimo.isKinematic = true; }
    console.log( this.input );
    if ( this.input.up.active ) {
      game.scene.children[0].oimo.resetQuaternion( game.scene.children[0].oimo.getQuaternion( ) );
    }
    if ( this.input.down.active ) {
      game.scene.children[0].oimo.resetPosition( game.scene.children[0].oimo.position.x, game.scene.children[0].oimo.position.y, game.scene.children[0].oimo.position.z );
    }
    if ( this.input.sprint.active ) { game.scene.children[0].oimo.isKinematic = true; }
    else { game.scene.children[0].oimo.isKinematic = false; }
    */
    // Check Keyboard Input -- End

    this.camera.position.set( 0, 0, this.distance );
    this.camera.position.applyEuler( this.viewObject.rotation );
    this.camera.position.add( this.viewObject.position );
    // this.camera.position.applyEuler( this.viewObject.rotation );

  }

}
