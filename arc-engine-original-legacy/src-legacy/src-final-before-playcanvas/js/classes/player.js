'use strict';

const THREE = require( 'three' );

class Player
{
  constructor ( p )
  {
    this.config = p;

    this.PI_2 = Math.PI / 2;

    this.stats = { // Changing variables during engine step
      "actions":{},
      "fps":new THREE.Vector3( 60, 60, 60 ), // NOTE / TEMP: Assigned dynamically from engine
      "position":p.position ? new THREE.Vector3( ...p.position ) : new THREE.Vector3( ),
      "rotation":p.rotation ? new THREE.Euler( ...p.rotation, 'YXZ' ) : new THREE.Euler( 0, 0, 0, 'YXZ' ),
      "direction":new THREE.Vector3( 0, 0, -1 ), // TODO: Direction player is facing
      "linearVelocity":p.linearVelocity ? new THREE.Vector3( ...p.linearVelocity ) : new THREE.Vector3( ), // Linear velocity in m/s
      "linearVelocityRegulated":new THREE.Vector3( ), // Linear velocity divided by frames per second
      "linearVelocityNormalized":new THREE.Vector3( ), // Normalized velocity in m/s
      "linearAcceleration":new THREE.Vector3( ), // Acceleration calculated per frame in m/s
      "directionalInfluence":new THREE.Vector3( ), // Input influence
      "directionalInfluenceRotationLock":new THREE.Vector3( 0, 1, 0 ), // Locks rotation to noramlized vector
      "directionalInfluenceRotation":new THREE.Euler( ), // Stores final value of DI rotation Euler
      "gravitationInfluence":new THREE.Vector3( 0, -1, 0 ),
      "surface":new THREE.Vector3( 1, 1, 1 ), // NOTE / TEMP: Assigned dynamically based on surface
      "state":""
    };

    this.specs = { // Non-changing variables during engine step
      "maxLinearAcceleration":new THREE.Vector3( 10, 50, 10 ), // Maximum linear acceleration in m/s, should match maxLinearVelocity
      "maxLinearVelocity":new THREE.Vector3( 10, 50, 10 ), //  Maximum linear velocity in m/s
      "minLinearVelocity":new THREE.Vector3( 0.01, 0.01, 0.01 ), // Minimum linear velocity in m/s
      "lookSensitivity":0.5, // Sensitivity of "look"
      "height":2,
      "width":0.5
    };

    this.rays = [];
    this.generateRays( );
    this.stats.position.y = -5

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      this.config.camera.fov,
      this.config.camera.aspect.x / this.config.camera.aspect.y,
      this.config.camera.near,
      this.config.camera.far
    );

    // Iterate through config.input to generate this.stats.actions
    for ( let key in this.config.input )
    {
      if ( !isNaN( key ) )
      { this.stats.actions[this.config.input[key].action] = { "active":false }; }
      else
      { this.stats.actions[key] = { "active":{ "x":0, "y":0 } }; }
    }
  }

  update ( p )
  {
    // Fall check
    if ( this.stats.position.y < -100 )
    {
      this.stats.position.set( 0, 20, 0 );
    }
    this.checkInput( );

    this.calcMovement( );

    this.updateRays( );

    if ( this.rays[0].intersectObjects( p ).length > 0 )
    { // console.log( this.rays[0].intersectObjects( p )[0].point.y );
      this.stats.position.y = this.rays[0].intersectObjects( p )[0].point.y + this.specs.height / 2;
      this.stats.linearVelocity.y = 0;
      this.stats.linearVelocityRegulated.y = 0;
    }

    this.rays[2].objects = this.rays[2].intersectObjects( p );

    if ( this.rays[2].objects.length > 0 )
    {
      console.log( new THREE.Vector3( ).copy( this.rays[2].objects[0].point ).sub( this.stats.position ) );
      this.stats.linearVelocity.set( 0, 0, 0 );
      this.stats.linearVelocityRegulated.set( 0, 0, 0 );
    }

    // Adjust position of entity
    this.stats.position.add( this.stats.linearVelocityRegulated );

    this.camera.rotation.copy( this.stats.rotation );
    this.camera.position.copy( this.stats.position );
  }

  updateRays ( )
  {
    this.stats.direction.copy( this.stats.linearVelocity ).normalize( );
    this.stats.direction.y = 0;
    let testVector = new THREE.Vector3( ).copy( this.stats.position ).add( this.stats.linearVelocityRegulated );
    let distance = this.stats.position.distanceTo( testVector );
    // console.log( 'distance', distance );
    // console.log( 'ray and direction', this.rays[2].ray.direction );
  }

  generateRays ( )
  {
    this.rays.push( new THREE.Raycaster(
      this.stats.position,
      new THREE.Vector3( 0, -1, 0 ),
      0,
      this.specs.height / 2
    ) );

    this.rays.push( new THREE.Raycaster(
      this.stats.position,
      new THREE.Vector3( 0, 1, 0 ),
      0,
      this.specs.height / 2
    ) );

    this.rays.push( new THREE.Raycaster(
      this.stats.position,
      this.stats.direction,
      0,
      this.specs.width / 2
    ) );
  }

  calcMovement ( )
  {
    // Copy and normalize linear velocity
    this.stats.linearVelocityNormalized.copy( this.stats.linearVelocity ).divide( this.specs.maxLinearVelocity );

    // Calculate Acceleration based on surface
    this.stats.linearAcceleration.copy( this.stats.directionalInfluence );
    this.stats.linearAcceleration.sub( this.stats.linearVelocityNormalized );
    this.stats.linearAcceleration.multiply( this.stats.surface );

    // TODO: Apply gravity
    this.stats.linearAcceleration.add( this.stats.gravitationInfluence );

    // Add acceleration, then limit linear velocity and adjust based off of frames per second
    this.stats.linearVelocity.add( this.stats.linearAcceleration );
    this.stats.linearVelocity.x = Math.abs( this.stats.linearVelocity.x ) < this.specs.minLinearVelocity.x ? 0 : this.stats.linearVelocity.x;
    this.stats.linearVelocity.y = Math.abs( this.stats.linearVelocity.y ) < this.specs.minLinearVelocity.y ? 0 : this.stats.linearVelocity.y;
    this.stats.linearVelocity.z = Math.abs( this.stats.linearVelocity.z ) < this.specs.minLinearVelocity.z ? 0 : this.stats.linearVelocity.z;
    this.stats.linearVelocityRegulated.copy( this.stats.linearVelocity );
    this.stats.linearVelocityRegulated.divide( this.stats.fps );
  }

  checkInput ( )
  {
    // Check Look Input -- Begin
    // // TEMP / NOTE / TODO: Adjust this based on current gravitationInfluence
    this.stats.rotation.y -= this.stats.actions.look.active.x * ( this.specs.lookSensitivity * 0.002 );
    this.stats.rotation.x -= this.stats.actions.look.active.y * ( this.specs.lookSensitivity * 0.002 );
    this.stats.rotation.x = Math.max( - this.PI_2, Math.min( this.PI_2, this.stats.rotation.x ) );

    if ( this.stats.rotation.y > Math.PI * 2 ) { this.stats.rotation.y -= Math.PI * 2; }
    if ( this.stats.rotation.y < -Math.PI * 2 ) { this.stats.rotation.y += Math.PI * 2; }

    this.stats.actions.look.active = { "x":0, "y":0 };
    // Check Look Input -- End

    // Check Movement Input -- Begin
    // // TEMP / NOTE / TODO: Adjust this based on analog input
    this.stats.directionalInfluence.set( 0, 0, 0 );

    if ( this.stats.actions.forwards.active ) { this.stats.directionalInfluence.z -= 1; }
    if ( this.stats.actions.backwards.active ) { this.stats.directionalInfluence.z += 1; }
    if ( this.stats.actions.left.active ) { this.stats.directionalInfluence.x -= 1; }
    if ( this.stats.actions.right.active ) { this.stats.directionalInfluence.x += 1; }
    /* TODO: Change this to operate under a jump vector / crouch handler
    if ( this.stats.actions.up.active ) { this.stats.directionalInfluence.y += 1; }
    if ( this.stats.actions.down.active ) { this.stats.directionalInfluence.y -= 1; }
    */
    // Check Movement Input -- End

    // Adjust directional influence in correlation with rotational perspective
    this.stats.directionalInfluenceRotation.copy( this.stats.rotation );
    this.stats.directionalInfluenceRotation.x *= this.stats.directionalInfluenceRotationLock.x;
    this.stats.directionalInfluenceRotation.y *= this.stats.directionalInfluenceRotationLock.y;
    this.stats.directionalInfluenceRotation.z *= this.stats.directionalInfluenceRotationLock.z;

    this.stats.directionalInfluence.applyEuler( new THREE.Euler(
      0,
      this.stats.rotation.y,
      0
    ) );

  }
}

module.exports = function ( p )
{ return new Player( p ) }
