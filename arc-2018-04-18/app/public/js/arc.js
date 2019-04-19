(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';
// NOTE add this for production
// global.THREE = require( 'three' );

class Arc
{
  constructor ( )
  {
    // import pack libraries
    this.packs =
    {
      "Core": require( './core/core.js' ),
      "Conflict": require( './conflict/conflict.js' ),
      "Impact": require( './impact/impact.js' )
    };

    // declare packs
    this.core = new this.packs.Core( { } );
    // this.conflict = new this.packs.Conflict( { "core": this.core } );
    this.impact = new this.packs.Impact( { "core": this.core } );

    console.log( this );
  }
}

Ammo( ).then( ( r ) => {
  global.AMMO = r;
  let game = new Arc( );
} );

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./conflict/conflict.js":2,"./core/core.js":18,"./impact/impact.js":20}],2:[function(require,module,exports){
'use strict';

class ArcConflict
{
  constructor ( p ) // { core: @Arc.Core }
  {
    this.core = p.core;

    this.stats =
    {
      "ready": false,
      "running": false
    };

    let testvec = new THREE.Vector3( 1, 2, 3 );
    testvec.addScalar( 2 );
    console.log( testvec );

    // TEMP testing -- begin
    // NOTE: @Core.PhysicsSystem -- complete
    this.entityA = new this.core.Entity( );
    this.entityB = new this.core.Entity( );
    this.entityC = new this.core.Entity( );
    this.entityD = new this.core.Entity( );
    this.entityE = new this.core.Entity( );
    this.chunk = new this.core.Chunk( { "gravity": [ 0, 0, 0 ] } );
    this.world = new this.core.World( );

    this.view = new this.core.View( { "x": 0, "y": 0, "w": 1, "h": 1 } );
    this.view.position.set( 0, 16, 64 );
    this.view.rotation.y = Math.PI / 4;
    this.view.rotation.x = -Math.PI / 6;
    this.core.systems.output.loadView( this.view );

    this.entities = [ ];
    this.meshes = [ ];
    this.physicsBodies = [ ];
    this.material = new this.core.Material( 'MeshBasic', { "color": 0x555555 } );
    this.geometry = new this.core.Geometry( 'SphereBuffer', [ 1, 16, 16 ] );
    for ( let x = 0; x < 512; x++ )
    {
      this.entities.push( new this.core.Entity( ) );
      this.meshes.push( new this.core.Mesh( { "geometry": this.geometry, /* "material": ( this.entities.length == 1 ) ? new this.core.Material( 'MeshBasic', { "color": 0x00bbff } ) : this.material */ } ) );
      this.physicsBodies.push( new this.core.PhysicsBody( {
        "type": "sphere",
        "shape": [ 1 ],
        "mass": 1,
        "position": [ Math.random( ) * 20 - 10, Math.random( ) * 20 + 10, Math.random( ) * 20 - 10 ],
        "rotation": [ 0, 0, 0, 1 ]
      } ) );

      // this.physicsBodies[this.physicsBodies.length - 1].setRestitution( 1.0 );

      this.entities[this.entities.length - 1].loadElement( 'physics', this.physicsBodies[this.physicsBodies.length - 1] );
      this.entities[this.entities.length - 1].loadElement( 'graphics', this.meshes[this.physicsBodies.length - 1] );
      this.entities[this.entities.length - 1].bindElements( this.physicsBodies[this.physicsBodies.length - 1], this.meshes[this.physicsBodies.length - 1] );
      this.chunk.loadEntity( this.entities[this.entities.length - 1] );
    }

    this.geometryA = new this.core.Geometry( 'SphereBuffer', [ 1, 32, 32 ] );
    this.geometryB = new this.core.Geometry( 'BoxBuffer', [ 512, 2, 128 ] );
    this.geometryC = new this.core.Geometry( 'BoxBuffer', [ 512, 8, 8 ] );
    this.geometryD = new this.core.Geometry( 'BoxBuffer', [ 8, 8, 120 ] );
    this.materialB = new this.core.Material( 'MeshBasic', { "color": 0x999999 } );
    this.materialC = new this.core.Material( 'MeshBasic', { "color": 0x00aaff } );
    this.materialD = new this.core.Material( 'MeshBasic', { "color": 0xffaa00 } );
    this.meshA = new this.core.Mesh( { "geometry": this.geometryA, "material": this.materialA } );
    this.meshB = new this.core.Mesh( { "geometry": this.geometryB, "material": this.materialB } );
    this.meshC = new this.core.Mesh( { "geometry": this.geometryC, "material": this.materialC } );
    this.meshD = new this.core.Mesh( { "geometry": this.geometryC, "material": this.materialC } );
    this.meshE = new this.core.Mesh( { "geometry": this.geometryD, "material": this.materialD } );

    this.physicsBodyA = new this.core.PhysicsBody( {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 1
    } );
    this.physicsBodyB = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 256, 1, 64 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ 0, -20, 0 ],
      "mass": 0
    } );
    this.physicsBodyC = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 256, 4, 4 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ 0, -15, 60 ],
      "mass": 0
    } );
    this.physicsBodyD = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 256, 4, 4 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ 0, -15, -60 ],
      "mass": 0
    } );
    this.physicsBodyE = new this.core.PhysicsBody( {
      "type": "box",
      "shape": [ 4, 4, 60 ],
      "rotation": [ 0, 0, Math.PI / 10 ],
      "position": [ -120, -60, 0 ],
      "mass": 0
    } );

    // this.physicsbodyB.setTransform( )

    this.entityA.loadElement( 'physics', this.physicsBodyA );
    this.entityA.loadElement( 'graphics', this.meshA );
    this.entityB.loadElement( 'physics', this.physicsBodyB );
    this.entityB.loadElement( 'graphics', this.meshB );
    this.entityC.loadElement( 'physics', this.physicsBodyC );
    this.entityC.loadElement( 'graphics', this.meshC );
    this.entityD.loadElement( 'physics', this.physicsBodyD );
    this.entityD.loadElement( 'graphics', this.meshD );
    this.entityE.loadElement( 'physics', this.physicsBodyE );
    this.entityE.loadElement( 'graphics', this.meshE );

    this.entityA.bindElements( this.physicsBodyA, this.meshA );
    this.entityB.bindElements( this.physicsBodyB, this.meshB );
    this.entityC.bindElements( this.physicsBodyC, this.meshC );
    this.entityD.bindElements( this.physicsBodyD, this.meshD );
    this.entityE.bindElements( this.physicsBodyE, this.meshE );

    console.log( ...new THREE.Quaternion( ).setFromEuler( new THREE.Euler( 0, 0, 0 ) ).toArray( ) )

    // this.physicsBodyB.setTransform( { "position": [ 0, -20, 0 ], "rotation": [ 0, 0, Math.PI / 10 ] } );
    // this.physicsBodyA.setTransform( { "position": [ -10, 20, -10 ] } );

    // console.log( this.physicsBodyB.rotation );

    /*
    this.entity.loadElement( 'Physics', {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 1,
      "position": [ 1, 1, -5 ],
      "rotation": [ 0, 0, 0, 1 ]
    } ).bindGraphicsElement( this.meshA );
    */
    this.chunk.loadEntity( this.entityA );
    this.chunk.loadEntity( this.entityB );
    this.chunk.loadEntity( this.entityC );
    this.chunk.loadEntity( this.entityD );
    this.chunk.loadEntity( this.entityE );
    this.world.loadChunks( [ this.chunk ] );
    this.core.loadWorld( this.world );
    this.world.activateChunks( [ this.chunk ] );
    // this.graphicsChunk.loadGraphicsElements( [ testObject ] );

    /*
    this.physicsChunk = new this.core.PhysicsChunk( { "gravity": [ 0, -10, 0 ] } );

    this.entity = new this.core.Entity( );
    this.entity.loadElement( 'Physics', {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 0,
      "position": [ 0, -5, -3 ],
      "rotation": [ 0, 0, 0, 1 ]
    } ).bindMesh( new this.core.Mesh( {
      "geometry": new this.core.Geometry( 'BoxBuffer', [ 1, 1, 1 ] ),
      "material": new this.core.Material( 'MeshBasic', { "color": 0xffffff } )
    } ) );

    this.physicsChunk.loadEntity( this.entity.rigidBodies[0] );

    this.entity.rigidBodies[0].setTransform( {
      "position": new THREE.Vector3( 1, 1, 1 ),
      "rotation": new THREE.Euler( 1, 1, 1 )
    } );
    console.log( this.physicsChunk );
    */
    // this.core.systems.physics.chunk.dynamicsWorld.addRigidBody( this.entity.rigidBodies[0] );
    // this.core.systems.physics.chunk.dynamics.push( this.entity.rigidBodies[0] );
    /*
    this.entity = new this.core.Entity( );
    this.entity.loadElement( 'Physics', {
      "type": "sphere",
      "shape": [ 1 ],
      "mass": 0,
      "position": [ 0, -5, -3 ],
      "rotation": [ 0, 0, 0, 1 ]
    } ).setTransform( {
      "rotation": new THREE.Euler( 1, 1, 1 ),
      "position": new THREE.Vector3( 1, 5, 1 )
    } ).bindMesh( new this.core.Mesh( {
      "geometry": new this.core.Geometry( 'BoxBuffer', [ 1, 1, 1 ] ),
      "material": new this.core.Material( 'MeshBasic', { "color": 0xffffff } )
    } ) );
    this.core.systems.physics.chunk.dynamicsWorld.addRigidBody( this.entity.rigidBodies[0] );
    this.core.systems.physics.chunk.dynamics.push( this.entity.rigidBodies[0] );
    */
    /*
    this.world = new this.core.World( );
    this.core.systems.output.loadWorld( this.world );

    this.view = new this.core.View( { "x": 0, "y": 0, "w": 1, "h": 1 } );
    this.core.systems.output.loadView( this.view );
    */
    /*
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry( 64, 64, 1, 1 ),
      new THREE.MeshBasicMaterial( { "color": 0x555555, "side": THREE.DoubleSide } )
    );
    this.floor.position.set( 0, -4, 0 );
    this.floor.rotation.x = Math.PI / 2;
    // this.chunk.loadEntity( this.floor );

    this.object = new THREE.Mesh(
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { "color": 0xaaaaaa } )
    );
    this.object.position.set( 0, 0, -5 );
    // this.chunk.loadEntity( this.object );
    // TEMP testing -- end
    */

    // handle core frame request
    this.core.on( 'update', ( e ) => { this.step( e ); } );

    console.log( this.chunk.physicsChunk.dynamicsWorld );
    this.force = new Ammo.btVector3( 0, -50, 0 );

    this.center = new Ammo.btVector3( );
    console.log( 'Vec3 before', [ this.center.x( ), this.center.y( ), this.center.z( ) ] );
    this.center.setValue( 1, 1, 0 );
    console.log( 'Vec3 after', [ this.center.x( ), this.center.y( ), this.center.z( ) ] );

    this.quater = new Ammo.btQuaternion( 0, 0, 0, 1 );
    console.log( 'Quat before', [ this.quater.x( ), this.quater.y( ), this.quater.z( ), this.quater.w( ) ] );
    // this.quater.setValue( 1, 0, 0, 0 );
    this.quater.setEulerZYX( 0, 1, 0 );
    console.log( 'Quat after', [ this.quater.x( ), this.quater.y( ), this.quater.z( ), this.quater.w( ) ] );

    this.tt = new THREE.Euler( 0, 1, 0, 'YXZ' );
    console.log( new THREE.Quaternion( ).setFromEuler( this.tt ) );



    this.yrot = -Math.PI;

    this.core.start( );
  }

  step ( dt )
  {
    if ( this.physicsBodyB.hasChanged )
    { console.log( 'i changed' ); }
    for ( let c of this.physicsBodies )
    {
      c.applyForce( this.force, this.center );
      if ( c.position.y < -150 )
      { c.setTransform( { "position": [ 0, 20, 0 ] } ) }
    }
    // this.physicsBodies[0].applyForce( new Ammo.btVector3( 0, 10, 0 ) );
    // this.physicsBodyB.getTransform( );
  }
}

module.exports = ArcConflict;

},{}],3:[function(require,module,exports){
'use strict';

class Mesh extends THREE.Mesh
{
  constructor ( g, m, t )
  {
    super( g, m );

    this.system = 'output';
    this.transform = t;

    this.position.copy( this.transform.position.graphics );
    this.quaternion.copy( this.transform.rotation.graphics );

    this.transform.on( 'update', ( ) => {
      this.position.copy( this.transform.position.graphics );
      this.quaternion.copy( this.transform.rotation.graphics );
    } );

    this.transform.on( 'set', ( ) => {
      this.position.copy( this.transform.position.graphics );
      this.quaternion.copy( this.transform.rotation.graphics );
    } );
  }
}

module.exports = Mesh;

},{}],4:[function(require,module,exports){
'use strict';
class RigidBody extends AMMO.btRigidBody
{
  constructor ( s, t, m = 0 )
  {
    let shape = s;
    let transform = t.physics;
    let mass = m;

    let isDynamic = ( mass !== 0 );
    let intertia = new AMMO.btVector3( 0, 0, 0 );

    if ( isDynamic )
    { shape.calculateLocalInertia( mass, intertia ); }

    let motionState = new AMMO.btDefaultMotionState( transform );
    let rbInfo = new AMMO.btRigidBodyConstructionInfo( mass, motionState, shape, intertia );

    super( rbInfo );

    // this.setCollisionFlags( )
    this.uuid = UUID( ); // generates uuid for rigid body
    this.system = 'physics';
    this.transform = t; // stores transform buffer for physics system
    this.transformBuffer = new AMMO.btTransform( );
    this.motionState = new AMMO.btDefaultMotionState( );
    this.isDynamic = isDynamic;

    this.transform.on( 'set', ( ) => {
      this.setTransform( );
    } );
  }

  getTransform ( )
  {
    this.getMotionState( ).getWorldTransform( this.transformBuffer );
    this.transform.setFromAmmoTransform( this.transformBuffer );
    return this;
  }

  setTransform ( )
  {
    this.setCenterOfMassTransform( this.transform.physics );
    if ( !this.isDynamic )
    {
      this.motionState.setWorldTransform( this.transform.physics );
      this.setMotionState( this.motionState );
    }
    return this;
  }

  on ( e, f )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { this.events = { }; }
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { return; }
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }
}

module.exports = RigidBody;

},{}],5:[function(require,module,exports){
'use strict';

class Sprite extends THREE.Sprite
{
  constructor ( m, t )
  {
    super( m );

    this.system = 'output';
    this.transform = t;

    this.position.copy( this.transform.position.graphics );
    this.quaternion.copy( this.transform.rotation.graphics );

    this.transform.on( 'update', ( ) => {
      this.position.copy( this.transform.position.graphics );
      this.quaternion.copy( this.transform.rotation.graphics );
    } );

    this.transform.on( 'set', ( ) => {
      this.position.copy( this.transform.position.graphics );
      this.quaternion.copy( this.transform.rotation.graphics );
    } );
  }
}

module.exports = Sprite;

},{}],6:[function(require,module,exports){
'use strict';

class GeometryHelper
{
  constructor ( t = '', p = { } ) // "", { "config":... }, type and configuration
  {
    let type, params;
    let myClass;

    if ( typeof( t ) == 'object' ) { type = ''; params = t; }
    else { type = t; params = p; }

    if ( THREE.hasOwnProperty( type + 'Geometry' ) )
    { myClass = THREE[type + 'Geometry']; }
    else
    { throw new Error( 'geometry type not found' ); }

    class Geometry extends myClass
    {
      constructor ( p ) // [ ...verticies || ...config ]
      {
        if ( t == 'Buffer' )
        {
          super( );
          let verts = new Float32Array( p );
          this.addAttribute( 'position', new THREE.BufferAttribute( verts, 3 ) );
        }
        else
        { super( ...p ); }
      }
    }

    let geometry = new Geometry( params )
    return geometry;
  }
}

module.exports = GeometryHelper;

},{}],7:[function(require,module,exports){
'use strict';

class Material
{
  constructor ( t, p = [ ] ) // "", [ ... ], type and configuration
  {
    let type, params;
    let myClass;

    if ( typeof( t ) == 'object' ) { type = ''; params = t; }
    else { type = t; params = p; }

    if ( THREE.hasOwnProperty( type + 'Material' ) )
    { myClass = THREE[type + 'Material']; }
    else
    { throw new Error( 'material type not found' ); }

    class Material extends myClass
    {
      constructor ( p )
      { super( p ); }
    }

    let material = new Material( params );

    return material;
  }
}

module.exports = Material;

},{}],8:[function(require,module,exports){
'use strict';

class PhysicsShapeHelper
{
  constructor ( t = '', p = [ ] ) // "", { "config":... }, type and configuration
  {
    let type, params;
    let myClass;

    if ( typeof( t ) == 'object' ) { type = ''; params = t; }
    else { type = t; params = p; }

    if ( !Array.isArray( params ) )
    { params = [ params ]; }

    if ( AMMO.hasOwnProperty( 'bt' + type + 'Shape' ) )
    { myClass = AMMO['bt' + type + 'Shape']; }
    else
    { throw new Error( 'shape type not found' ); }

    class PhysicsShape extends myClass
    {
      constructor ( p )
      { super( ...p ); }
    }

    let physicsShape = new PhysicsShape( params )
    return physicsShape;
  }
}

module.exports = PhysicsShapeHelper;

},{}],9:[function(require,module,exports){
'use strict';

class Euler
{
  constructor ( x = 0, y = 0, z = 0, o = 'YXZ' )
  {
    this.x;
    this.y;
    this.z;
    this.order;

    this.graphics = new THREE.Euler( );
    this.physics = new AMMO.btQuaternion( );

    this.setOrder( o );
    this.set( x, y, z );
  }

  set ( x = 0, y = 0, z = 0, s = 'set' )
  {
    if ( x > Math.PI || x < -Math.PI ) { x = x % Math.PI; }
    if ( y > Math.PI || y < -Math.PI ) { y = y % Math.PI; }
    if ( z > Math.PI || z < -Math.PI ) { z = z % Math.PI; }

    this.graphics.set( x, y, z );
    this.physics.setEulerZYX( x, y, z );

    this.x = x;
    this.y = y;
    this.z = z;

    this.emit( s );

    return this;
  }

  setX ( x )
  { return this.set( x, this.y, this.z ); }

  setY ( y )
  { return this.set( this.x, y, this.z ); }

  setZ ( z )
  { return this.set( this.x, this.y, z ); }

  setDegrees ( x = 0, y = 0, z = 0 )
  { return this.set( ( x / 180 ) * Math.PI, ( y / 180 ) * Math.PI, ( z / 180 ) * Math.PI ); }

  setXDegrees ( x )
  { return this.set( x / ( 180 * Math.PI ), this.y, this.z ); }

  setYDegrees ( y )
  { return this.set( this.x, y / ( 180 * Math.PI ), this.z ); }

  setZDegrees ( z )
  { return this.set( this.x, this.y, z / ( 180 * Math.PI ) ); }

  getDegrees ( )
  { return [ ( this.x / Math.PI ) * 180, ( this.y / Math.PI ) * 180, ( this.z / Math.PI ) * 180 ]; }

  setOrder ( o )
  { this.graphics.reorder( o ); this.order = o; return this; }

  copy ( e )
  { this.setOrder( e.order ); return this.set( e.x, e.y, e.z ); }

  equals ( e )
  { if ( this.x == v.x && this.y == v.y && this.z == v.z && this.order == v.order ) { return true; } else { return false; } }

  setFromQuaternion ( q )
  { return this.set( ...this.graphics.setFromQuaternion( q.graphics ).toArray( ) ); }

  toArray ( )
  { return [ this.x, this.y, this.z ]; }

  negate ( )
  { return this.set( this.x - Math.PI, this.y - Math.PI, this.z - Math.PI ); }

  on ( e, f )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { this.events = { }; }
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { return; }
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }
}

module.exports = Euler;

},{}],10:[function(require,module,exports){
'use strict';

class Quaternion
{
  constructor ( x = 0, y = 0, z = 0, w = 1 )
  {
    this.x;
    this.y;
    this.z;
    this.w;

    this.graphics = new THREE.Quaternion( );
    this.physics = new AMMO.btQuaternion( );

    this.set( x, y, z, w );
  }

  set ( x = 0, y = 0, z = 0, w = 1, s = 'set' )
  {
    if ( x > 1 || x < -1 ) { x = x % 1; }
    if ( y > 1 || y < -1 ) { y = y % 1; }
    if ( z > 1 || z < -1 ) { z = z % 1; }
    if ( w > 1 || w < -1 ) { w = w % 1; }

    this.graphics.set( x, y, z, w );
    this.physics.setValue( x, y, z, w );

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.emit( s );

    return this;
  }

  copy ( q )
  { return this.set( q.x, q.y, q.z, q.w ); }

  equals ( q )
  { if ( this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w ) { return true; } else { return false; } }

  setFromEuler ( e )
  { return this.set( ...this.graphics.setFromEuler( e.graphics).toArray( ) ); }

  negate ( )
  { return this.set( ...this.graphics.inverse( ).toArray( ) ); }

  multiply ( q )
  { return this.set( ...this.graphics.multiply( q ).toArray( ) ); }

  toArray ( )
  { return [ this.x, this.y, this.z, this.w ]; }

  on ( e, f )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { this.events = { }; }
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { return; }
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }
}

module.exports = Quaternion;

},{}],11:[function(require,module,exports){
'use strict';

class Transform
{
  constructor ( v, q )
  {
    this.position = v;
    this.rotation = q;
    this.physics = new AMMO.btTransform( );
    this.physics.setIdentity( );
    this.physics.setOrigin( this.position.physics );
    this.physics.setRotation( this.rotation.physics );

    this.position.on( 'set', ( ) => {
      this.physics.setOrigin( this.position.physics );
      this.emit( 'set' );
    } );

    this.rotation.on( 'set', ( ) => {
      this.physics.setRotation( this.rotation.physics );
      this.emit( 'set' );
    } );

    this.position.on( 'update', ( ) => {
      this.physics.setOrigin( this.position.physics );
      this.emit( 'update' );
    } );

    this.rotation.on( 'update', ( ) => {
      this.physics.setRotation( this.rotation.physics );
      this.emit( 'update' );
    } );
  }

  setPosition ( v )
  {

  }

  setRotation ( q )
  {

  }

  setFromAmmoTransform ( t )
  {
    t.position = t.getOrigin( );
    t.rotation = t.getRotation( );

    this.position.set( t.position.x( ), t.position.y( ), t.position.z( ), 'update' );
    this.rotation.set( t.rotation.x( ), t.rotation.y( ), t.rotation.z( ), t.rotation.w( ), 'update' );
  }

  on ( e, f )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { this.events = { }; }
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { return; }
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }
}

module.exports = Transform;

},{}],12:[function(require,module,exports){
'use strict';

class Vector3
{
  constructor ( x = 0, y = 0, z = 0 )
  {
    this.graphics = new THREE.Vector3( );
    this.physics = new AMMO.btVector3( );

    this.set( x, y, z );
  }

  set ( x = 0, y = 0, z = 0, s = 'set' ) // [ ... ]
  {
    this.graphics.set( x, y, z );
    this.physics.setValue( x, y, z );

    this.x = x;
    this.y = y;
    this.z = z;

    this.emit( s );

    return this;
  }

  setX ( x )
  { return this.set( x, this.y, this.z ); }

  setY ( y )
  { return this.set( this.x, y, this.z ); }

  setZ ( z )
  { return this.set( this.x, this.y, z ); }

  toArray ( )
  { return [ this.x, this.y, this.z ]; }

  applyEuler ( e )
  { return this.set( ...this.graphics.applyEuler( e.graphics ).toArray( ) ); }

  applyQuaternion ( q )
  { return this.set( ...this.graphics.applyEuler( q.graphics ).toArray( ) ); }

  addScalar ( s )
  { return this.set( this.x + s, this.y + s, this.z + s ); }

  copy ( v )
  { return this.set( v.x, v.y, v.z ); }

  cross ( v )
  { return this.set( ...this.graphics.cross( v ).toArray( ) ); }

  distanceTo ( v )
  { return this.graphics.distanceTo( v ); }

  add ( v )
  { return this.set( this.x + v.x, this.y + v.y, this.z + v.z ); }

  sub ( v )
  { return this.set( this.x - v.x, this.y - v.y, this.z - v.z ); }

  multiply ( v )
  { return this.set( this.x * v.x, this.y * v.y, this.z * v.z ); }

  divide ( v )
  { return this.set( this.x / v.x, this.y / v.y, this.z / v.z ); }

  equals ( v )
  { if ( this.x == v.x && this.y == v.y && this.z == v.z ) { return true; } else { return false; } }

  negate ( )
  { return this.set( ...this.graphics.negate( ).toArray( ) ); }

  normalize ( )
  { return this.set( ...this.graphics.normalize( ).toArray( ) ); }

  on ( e, f )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { this.events = { }; }
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( !this.hasOwnProperty( 'events' ) ) { return; }
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }
}

module.exports = Vector3

},{}],13:[function(require,module,exports){
'use strict';

class Entity
{
  constructor ( e ) // [ ...@ArcCore.Element ]
  { this.loadElement( e ); }

  loadElement ( e ) // [ ...@ArcCore.Element ]
  {
    if ( Array.isArray( e ) )
    {
      for ( let i of e )
      {
        if ( !i.system ) { throw new Error( `element type not specified` ); }
        if ( !this.hasOwnProperty( i.system + 'Elements' ) ) { this[i.system + 'Elements'] = [ ]; }
        this[i.system + 'Elements'].push( i );
      }
    }
    else if ( e )
    {
      if ( !e.system ) { throw new Error( `element type not specified` ); }
      if ( !this.hasOwnProperty( e.system + 'Elements' ) ) { this[e.system + 'Elements'] = [ ];  }
      this[e.system + 'Elements'].push( e );
    }
    return this;
  }
}

module.exports = Entity;

},{}],14:[function(require,module,exports){
'use strict';

class Renderer extends THREE.WebGLRenderer
{
  constructor ( p = { } ) // { element:@element, clearColor:b24, antialias:bool }
  {
    if ( p.hasOwnProperty( 'canvas' ) )
    { super( { "canvas": p.element, "antialias": p.antialias || true } ); }
    else
    { super( { "antialias": p.antialias || true } ); }

    if ( !p.hasOwnProperty( 'element' ) )
    {
      window.addEventListener( 'resize', ( ) => {
        this.setDimensions( {
          "width": document.body.clientWidth,
          "height": document.body.clientHeight
        } );
      }, false );

      document.body.appendChild( this.domElement );

      this.setDimensions( {
        "width": document.body.clientWidth,
        "height": document.body.clientHeight
      } );
    }

    this.setClearColor( p.clearColor || 0x222222 );

    this.views = [ ];
  }

  update ( s ) // { scene:@scene }
  {
    if ( this.views.length == 1 )
    { this.render( s, this.views[0] ); }
    else if ( this.views.length > 1 )
    {
      for ( let v in this.views )
      {
        this.setViewport(
          this.views[v].specs.viewPort.x * this.getSize( ).width,
          this.views[v].specs.viewPort.y * this.getSize( ).height,
          this.views[v].specs.viewPort.w * this.getSize( ).width,
          this.views[v].specs.viewPort.h * this.getSize( ).height
        );
        this.setScissor(
          this.views[v].specs.viewPort.x * this.getSize( ).width,
          this.views[v].specs.viewPort.y * this.getSize( ).height,
          this.views[v].specs.viewPort.w * this.getSize( ).width,
          this.views[v].specs.viewPort.h * this.getSize( ).height
        );
        this.setScissorTest( true );

        this.render( s, this.views[v] );
      }
    }
  }

  setDimensions ( p = { } ) // { width:#, height:# }
  {
    this.setSize( p.width, p.height );
    for ( let v in this.views )
    { this.views[v].setViewPort( p ); }
  }

  loadView ( v ) // [ ...@ArcCore.View ]
  {
    if ( Array.isArray( v ) )
    {
      for ( let i of v )
      {
        if ( i.constructor.name == 'View' )
        { this.views.push( i ); }
        else
        { throw new Error( `received array object is not of type "view"` ); }
      }
    }
    else if ( v.constructor.name == 'View' )
    { this.views.push( v ); }
    else
    { throw new Error( `received object is not of type "View" or "Array"`); }

    this.setDimensions( this.getSize( ) );
    return this;
  }

  unloadView ( v ) // [ ...@ArcCore.View ]
  {
    if ( Array.isArray( v ) )
    {
      for ( let i of v )
      {
        if ( this.views.filter( c => i.uuid == c.uuid ).length < 1 )
        { throw new Error( `view "${o.uuid}" doesn't exists in Arc.Renderer ${this.uuid} views` ); }
        else if ( i.constructor.name == 'View' )
        { this.views = this.views.filter( c => i.uuid != c.uuid ); }
        else
        { throw new Error( `view "${o.uuid}" is not an instance of Arc.View` ); }
      }
    }
    else if ( v.constructor.name == 'View' )
    {
      if ( this.views.filter( c => v.uuid == c.uuid ).length < 1 )
      { throw new Error( `view "${v.uuid}" doesn't exists in Arc.Renderer ${this.uuid} views` ); }
      else ( v.constructor.name == 'View' )
      { this.views = this.views.filter( c => v.uuid != c.uuid ); }
    }
    else
    { throw new Error( `received object is not of type "View" or "Array"`); }

    this.setDimensions( this.getSize( ) );
    return this;
  }
}

module.exports = Renderer;

},{}],15:[function(require,module,exports){
'use strict';

class View extends THREE.PerspectiveCamera
{
  constructor ( p = { } ) // { fov:#, aspect:#, near:#, far:#, viewPort: { x:#, y:#, w:#, h:# } }
  {
    super( );
    this.rotation.set( 0, 0, 0, 'YXZ' );

    this.specs = {
      "fov": p.hasOwnProperty( 'fov' ) ? p.fov : 90,
      "aspect": p.hasOwnProperty( 'ratio' ) ? p.ratio : 16 / 9,
      "near": p.hasOwnProperty( 'near' ) ? p.near : 0.001,
      "far": p.hasOwnProperty( 'far' ) ? p.far : 1000,
      "viewPort": p.hasOwnProperty( 'viewPort' ) ? p.viewPort :
      { "x": 0, "y": 0, "w": 1, "h": 1 }
    };
  }

  update ( )
  {

  }

  setFOV ( p = { } ) // { ratio:# }
  { this.fov = ( 2 * Math.atan( p.ratio / this.specs.aspect * Math.tan( ( this.specs.fov / 2) * Math.PI / 180 ) ) ) / Math.PI * 180; }

  setViewPort ( p = { } ) // { width:#, height# }
  {
    this.aspect = ( p.width * this.specs.viewPort.w ) / ( p.height * this.specs.viewPort.h );
    this.setFOV( { "ratio": p.width / p.height } );
    this.updateProjectionMatrix( );
  }

}

module.exports = View;

},{}],16:[function(require,module,exports){
'use strict';

class OutputSystem
{
  constructor ( )
  {
    this.uuid = UUID( );
    this.stats = { };
    this.space = new THREE.Scene( );
    this.children = [ ];
  }

  setRenderer ( r ) // @ArcCore.Renderer
  {
    if ( r.constructor.name == 'Renderer' )
    { this.renderer = r; this.stats.ready = true; return this; }
    else
    { throw new Error( `received object type "${r.constructor.name}", expected object type "Renderer"` ); }
  }

  loadEntities ( e ) // @ArcCore.OutputElement
  {
    for ( let i of e )
    {
      this.space.add( i );
    }
  }

  unloadEntities ( e ) // @ArcCore.OutputElement
  {

  }

  start ( )
  { this.stats.running = true; this.step( ); }

  stop ( )
  { this.stats.running = false; }

  step ( )
  {
    if ( this.stats.running && this.stats.ready )
    { window.requestAnimationFrame( ( ) => { this.step( ); } ); }

    this.stats.dt = ( this.stats.hasOwnProperty( 'dtl' ) ? performance.now( ) - this.stats.dtl : 0 );
    this.stats.dtl = performance.now( );

    for ( let i of this.children )
    {
      if ( i.hasOwnProperty( 'physicsElements' ) )
      {
        for ( let e of i.physicsElements )
        { e.getTransform( ); }
      }
    }

    this.renderer.update( this.space );
  }
}

module.exports = OutputSystem;

},{}],17:[function(require,module,exports){
'use strict';

const Vector3 = require( './../math/vector-three.js' );

class PhysicsSystem
{
  constructor ( )
  {
    this.uuid = UUID( );
    this.stats = { };
    // set up instance of physics chunk
    let collisionConfiguration = new AMMO.btDefaultCollisionConfiguration( );
    let dispatcher = new AMMO.btCollisionDispatcher( collisionConfiguration );
    let overlappingPairCache = new AMMO.btDbvtBroadphase( );
    let solver = new AMMO.btSequentialImpulseConstraintSolver( );

    // initialize AMMO world
    this.space = new AMMO.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

    // collision handler
    this.collisions = { };
    this.collisions.dispatcher = dispatcher;
    this.collisions.numberOfManifolds = 0;
    this.collisions.manifold = new AMMO.btPersistentManifold( );

    this.children = [ ]; // holds complete list of children

    this.stats.ready = true;
  }

  setGravity ( g ) // @ArcCore.Vector3
  { this.space.setGravity( g.physics ); return this; }

  handleCollision ( m )
  {
    this.collisions.bodyA = m.getBody0( );
    this.collisions.bodyB = m.getBody1( );

    if ( this.children[this.collisions.bodyA.getUserPointer( ).ptr].hasOwnProperty( 'events' ) || this.children[this.collisions.bodyB.getUserPointer( ).ptr].hasOwnProperty( 'events' ) )
    {
      this.collisions.manifoldPoint = m.getContactPoint( );
      this.collisions.pointALocal = this.collisions.manifoldPoint.get_m_localPointA( );
      this.collisions.pointBLocal = this.collisions.manifoldPoint.get_m_localPointB( );
      this.collisions.pointAWorld = this.collisions.manifoldPoint.get_m_positionWorldOnA( );
      this.collisions.pointBWorld = this.collisions.manifoldPoint.get_m_positionWorldOnB( );

      this.children[this.collisions.bodyA.getUserPointer( ).ptr].emit( 'contact', {
        "localPointSelf": new Vector3(
          this.collisions.pointALocal.x( ),
          this.collisions.pointALocal.y( ),
          this.collisions.pointALocal.z( ),
        ),
        "worldPointSelf": new Vector3(
          this.collisions.pointAWorld.x( ),
          this.collisions.pointAWorld.y( ),
          this.collisions.pointAWorld.z( ),
        ),
        "localPointOther": new Vector3(
          this.collisions.pointBLocal.x( ),
          this.collisions.pointBLocal.y( ),
          this.collisions.pointBLocal.z( ),
        ),
        "worldPointOther": new Vector3(
          this.collisions.pointBWorld.x( ),
          this.collisions.pointBWorld.y( ),
          this.collisions.pointBWorld.z( ),
        ),
        "force": this.collisions.manifoldPoint.getAppliedImpulse( ),
        "Other": this.children[this.collisions.bodyB.getUserPointer( ).ptr]
      } );

      this.children[this.collisions.bodyB.getUserPointer( ).ptr].emit( 'contact', {
        "localPointSelf": new Vector3(
          this.collisions.pointBLocal.x( ),
          this.collisions.pointBLocal.y( ),
          this.collisions.pointBLocal.z( ),
        ),
        "worldPointSelf": new Vector3(
          this.collisions.pointBWorld.x( ),
          this.collisions.pointBWorld.y( ),
          this.collisions.pointBWorld.z( ),
        ),
        "localPointOther": new Vector3(
          this.collisions.pointALocal.x( ),
          this.collisions.pointALocal.y( ),
          this.collisions.pointALocal.z( ),
        ),
        "worldPointOther": new Vector3(
          this.collisions.pointAWorld.x( ),
          this.collisions.pointAWorld.y( ),
          this.collisions.pointAWorld.z( ),
        ),
        "force": this.collisions.manifoldPoint.getAppliedImpulse( ),
        "Other": this.children[this.collisions.bodyA.getUserPointer( ).ptr]
      } );
    }
  }

  loadEntities ( e = [ ] )
  {
    for ( let i of e )
    {
      console.log( i.events );
      this.children.push( i );
      this.space.addRigidBody( i );
      i.setUserPointer( this.children.length - 1 );
    }
  }

  unloadEntities ( e = [ ] )
  {
    for ( let i of e )
    {
      this.children = this.children.filter( c => i.uuid != c.uuid );
      this.space.removeRigidBody( i );
    }
    for ( let c of this.children )
    { c.setUserPointer( this.children.indexOf( c ) ); }
  }

  start ( )
  { this.stats.running = true; this.step( ); }

  stop ( )
  { this.stats.running = false; }

  step ( )
  {
    this.stats.dt = ( this.stats.hasOwnProperty( 'dtl' ) ? performance.now( ) - this.stats.dtl : 0 );
    this.stats.dtl = performance.now( );

    this.space.stepSimulation( this.stats.dt / 1000, 10 );

    this.collisions.numberOfManifolds = this.collisions.dispatcher.getNumManifolds( );

    for ( let mi = 0; mi < this.collisions.numberOfManifolds; mi++ )
    { this.handleCollision( this.collisions.dispatcher.getManifoldByIndexInternal( mi ) ); }

    if ( this.stats.running && this.stats.ready )
    { setTimeout( ( ) => { this.step( ); }, 0 ) }
  }
}

module.exports = PhysicsSystem;

},{"./../math/vector-three.js":12}],18:[function(require,module,exports){
'use strict';

class ArcCore
{
  constructor ( )
  {
    this.stats =
    {
      "ready": false,
      "running": false,
      "dt": 0,
      "dtl": 0
    };

    this.stats = { };
    this.events = { };
    this.systems = [ ];

    this.tests =
    {
      "Math": require( './tests/math.js' )
    };

    // maths
    this.Vector3 = require( './classes/math/vector-three.js' );
    this.Euler = require( './classes/math/euler.js' );
    this.Quaternion = require( './classes/math/quaternion.js' );
    this.Transform = require( './classes/math/transform.js' );

    // systems
    this.PhysicsSystem = require( './classes/systems/physics.js' );
    this.OutputSystem = require( './classes/systems/output.js' );

    // output system objects
    this.Renderer = require( './classes/output-system/renderer.js' );
    this.View = require( './classes/output-system/view.js' );

    // objects
    this.Entity = require( './classes/objects/entity.js' );

    // elements
    this.RigidBody = require( './classes/elements/rigid-body.js' );
    this.Mesh = require( './classes/elements/mesh.js' );
    this.Sprite = require( './classes/elements/sprite.js' );

    // helpers
    this.PhysicsShape = require( './classes/helpers/physics-shape.js' );
    this.Geometry = require( './classes/helpers/geometry.js' );
    this.Material = require( './classes/helpers/material.js' );

    this.stats.ready = true;
  }

  loadSystems ( s )
  {
    if ( Array.isArray( s ) )
    {
      for ( let i of s )
      { this.systems.push( i ); }
    }
    else
    { this.systems.push( s ); }
  }

  unloadSystems ( s )
  {
    if ( Array.isArray( s ) )
    {
      for ( let i of s )
      { this.systems = this.systems.filter( c => i.uuid != c.uuid ); }
    }
    else
    { this.systems = this.systems.filter( c => s.uuid != c.uuid ); }
  }

  start ( )
  {
    for ( let s of this.systems )
    { s.start( ); }
    this.stats.running = true;
    this.step( );
  }

  stop ( )
  {
    for ( let s of this.systems )
    { s.stop( ); }
    this.stats.running = false;
  }

  step ( )
  {
    /*
    for ( let s of this.systems )
    { console.log( s.constructor.name, s.stats.dt ); }
    */

    this.emit( 'update', this.stats.dt );

    if ( this.stats.running && this.stats.ready )
    { setTimeout( ( ) => { this.step( ); }, 1000 / 60 ) }

    // this.systems.input.clearAnalog( );
  }

  on ( e, f )
  {
    if ( typeof( f ) == 'function' )
    {
      if ( !this.events.hasOwnProperty( e ) )
      { this.events[e] = [ ]; }
      this.events[e].push( f );
    }
    else { throw new Error( 'passed parameter is not a function' ); }
  }

  emit ( e, p = { } )
  {
    if ( this.events.hasOwnProperty( e ) )
    {
      for ( let i of this.events[e] )
      { i( p ); }
    }
  }

}

module.exports = ArcCore;

},{"./classes/elements/mesh.js":3,"./classes/elements/rigid-body.js":4,"./classes/elements/sprite.js":5,"./classes/helpers/geometry.js":6,"./classes/helpers/material.js":7,"./classes/helpers/physics-shape.js":8,"./classes/math/euler.js":9,"./classes/math/quaternion.js":10,"./classes/math/transform.js":11,"./classes/math/vector-three.js":12,"./classes/objects/entity.js":13,"./classes/output-system/renderer.js":14,"./classes/output-system/view.js":15,"./classes/systems/output.js":16,"./classes/systems/physics.js":17,"./tests/math.js":19}],19:[function(require,module,exports){
'use strict';

module.exports = ( p ) =>
{
  this.core = p;

  this.v1 = new this.core.Vector3( 0, 0, 0 );
  this.v2 = new this.core.Vector3( 0, 0, 0 );
  this.v3 = new this.core.Vector3( 0, 0, 0 );

  this.v1.set( 1, 1, 1 );
  this.v2 = new this.core.Vector3( ).copy( this.v1 );
  this.v1.add( new this.core.Vector3( 2, 2, 2 ) );
  this.v3 = new this.core.Vector3( ).copy( this.v2 ).add( this.v1 );

  this.e1 = new this.core.Euler( 0, 0, 0 );
  this.e2 = new this.core.Euler( 0, 0, 0 );
  this.e3 = new this.core.Euler( 0, 0, 0 );

  this.e1.set( Math.PI / 2, Math.PI / 4, Math.PI / 6 );
  this.e2.copy( this.e1 );
  this.e2.setX( Math.PI * 2 );
  this.e3.setDegrees( 180, 90, 45 );

  this.q1 = new this.core.Quaternion( );
  this.q2 = new this.core.Quaternion( );
  this.q3 = new this.core.Quaternion( );

  this.q1.set( 1, 0, 0, 0 );
  this.q2.setFromEuler( this.e3 );
  this.q3.copy( this.q2 );
  this.q3.negate( );

  this.t1 = new this.core.Transform( this.v1, this.q1 );

  console.log( 'v1', this.v1.toArray( ) );
  console.log( 'v2', this.v2.toArray( ) );
  console.log( 'v3', this.v3.toArray( ) );

  console.log( 'e1', this.e1.toArray( ) );
  console.log( 'e2', this.e2.getDegrees( ) );
  console.log( 'e3', this.e3.toArray( ) );

  console.log( 'q1', this.q1.toArray( ) );
  console.log( 'q2', this.q2.toArray( ) );
  console.log( 'q3', this.q3.toArray( ) );

  console.log( 'v1Ammo', [ this.v1.physics.x( ), this.v1.physics.y( ), this.v1.physics.z( ) ] );
  console.log( 'v2Ammo', [ this.v2.physics.x( ), this.v2.physics.y( ), this.v2.physics.z( ) ] );
  console.log( 'v3Ammo', [ this.v3.physics.x( ), this.v3.physics.y( ), this.v3.physics.z( ) ] );

  console.log( 'e1Ammo', [ this.e1.physics.x( ), this.e1.physics.y( ), this.e1.physics.z( ), this.e1.physics.w( ) ] );
  console.log( 'e2Ammo', [ this.e2.physics.x( ), this.e2.physics.y( ), this.e2.physics.z( ), this.e2.physics.w( ) ] );
  console.log( 'e3Ammo', [ this.e3.physics.x( ), this.e3.physics.y( ), this.e3.physics.z( ), this.e3.physics.w( ) ] );

  console.log( 'q1Ammo', [ this.q1.physics.x( ), this.q1.physics.y( ), this.q1.physics.z( ), this.q1.physics.w( ) ] );
  console.log( 'q2Ammo', [ this.q2.physics.x( ), this.q2.physics.y( ), this.q2.physics.z( ), this.q2.physics.w( ) ] );
  console.log( 'q3Ammo', [ this.q3.physics.x( ), this.q3.physics.y( ), this.q3.physics.z( ), this.q3.physics.w( ) ] );

  console.log( 'v1Three', this.v1.graphics.toArray( ) );
  console.log( 'v2Three', this.v2.graphics.toArray( ) );
  console.log( 'v3Three', this.v3.graphics.toArray( ) );

  console.log( 'e1Three', this.e1.graphics.toArray( ) );
  console.log( 'e2Three', this.e2.graphics.toArray( ) );
  console.log( 'e3Three', this.e3.graphics.toArray( ) );

  console.log( 'q1Three', this.q1.graphics.toArray( ) );
  console.log( 'q2Three', this.q2.graphics.toArray( ) );
  console.log( 'q3Three', this.q3.graphics.toArray( ) );

  console.log( 't1', this.t1.physics );
  console.log( 'v1', this.v1.toArray( ) );
  console.log( 'v1Ammo', [ this.v1.physics.x( ), this.v1.physics.y( ), this.v1.physics.z( ) ] );
  console.log( 't1v1Ammo', [ this.t1.physics.getOrigin( ).x( ), this.t1.physics.getOrigin( ).y( ), this.t1.physics.getOrigin( ).z( ) ] );
  this.v1.setX( 5 );
  console.log( 't1v1', this.v1.toArray( ) );
  console.log( 't1v1Ammo', [ this.t1.physics.getOrigin( ).x( ), this.t1.physics.getOrigin( ).y( ), this.t1.physics.getOrigin( ).z( ) ] );
  console.log( 'v1Ammo', [ this.v1.physics.x( ), this.v1.physics.y( ), this.v1.physics.z( ) ] );
}

},{}],20:[function(require,module,exports){
'use strict';

class ArcImpact
{
  constructor ( p ) // { core: @ArcCore }
  {
    this.core = p.core;

    // NOTE tests -- begin
    // this.core.tests.Math( this.core ); // tests math objects
    // NOTE tests -- end

    // initialize systems
    this.systems =
    {
      "output": new this.core.OutputSystem( ),
      "physics": new this.core.PhysicsSystem( ).setGravity( new this.core.Vector3( 0, -10, 0 ) )
    };

    // configure output system
    this.renderer = new this.core.Renderer( );
    this.views = [
      new this.core.View( { "viewPort": { "x": 0, "y": 0, "w": 0.5, "h": 0.5 } } ),
      new this.core.View( { "viewPort": { "x": 0.5, "y": 0, "w": 0.5, "h": 0.5 } } ),
      new this.core.View( { "viewPort": { "x": 0, "y": 0.5, "w": 0.5, "h": 0.5 } } ),
      new this.core.View( { "viewPort": { "x": 0.5, "y": 0.5, "w": 0.5, "h": 0.5 } } )
    ];

    for ( let v of this.views )
    { v.position.set( 0, 5, 20 ); }
    this.renderer.loadView( this.views );
    this.systems.output.setRenderer( this.renderer );

    let mesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( )
    );
    this.systems.output.space.add( mesh );

    // load systems
    this.core.loadSystems( [ this.systems.output, this.systems.physics ] );
    // this.core.unloadSystems( [ this.systems.output, this.systems.physics ] ); // remove systems

    this.entity = new this.core.Entity( );
    this.vector3 = new this.core.Vector3( 0, 5, -5 );
    this.quaternion = new this.core.Quaternion( 0, 0, 0, 1 );
    this.transform = new this.core.Transform( this.vector3, this.quaternion );

    this.floorRigidBodyElement = new this.core.RigidBody(
      new this.core.PhysicsShape( 'Box', new this.core.Vector3( 16, 2, 16 ).physics ),
      new this.core.Transform( new this.core.Vector3( 0, -8, 0 ), new this.core.Quaternion( ) ),
      0
    );
    this.floorMesh = new this.core.Mesh(
      new this.core.Geometry( 'BoxBuffer', [ 32, 4, 32 ] ),
      new this.core.Material( 'MeshBasic', { "color": 0x777777 } ),
      this.floorRigidBodyElement.transform
    );

    this.floorRigidBodyElement.setRestitution( 1 );

    this.physicsShapeSpecs = new this.core.Vector3( 0.5, 0.5, 0.5 );
    this.physicsShape = new this.core.PhysicsShape( 'Box', this.physicsShapeSpecs.physics );
    this.rigidBodyElement = new this.core.RigidBody( this.physicsShape, this.transform, 1 );

    this.rigidBodyElement.setRestitution( 1 );

    this.geometry = new this.core.Geometry( 'BoxBuffer', [ 1, 1, 1 ] );
    this.material = new this.core.Material( 'MeshBasic', { "color": 0xaaaaaa } );
    this.mesh = new this.core.Mesh( this.geometry, this.material, this.transform );

    let spriteTransform;
    let spriteShape = new this.core.PhysicsShape( 'Sphere', 0.5 );
    let spriteMaterial = new this.core.Material( 'Sprite', {
      "map": new THREE.TextureLoader( ).load( './assets/sprite.png' ),
      "color": 0xffffff
    } );
    this.spriteMeshes = [ ];
    this.spriteElements = [ ];
    for ( let x = 0; x < 1024; x++ )
    {
      spriteTransform = new this.core.Transform(
        new this.core.Vector3( Math.random( ) * 10 - 5, Math.random( ) * 10 + 5, Math.random( ) * 10 - 15 ),
        new this.core.Quaternion( )
      );
      this.spriteElements.push( new this.core.RigidBody( spriteShape, spriteTransform, 1 ) );
      this.spriteMeshes.push( new this.core.Sprite( spriteMaterial, spriteTransform ) );
    }
    for ( let r of this.spriteElements )
    { r.setRestitution( 1 ); }
    this.systems.physics.loadEntities( this.spriteElements );
    this.systems.output.loadEntities( this.spriteMeshes );

    this.spriteTransform = new this.core.Transform(
      new this.core.Vector3( 0, 0, -5 ),
      new this.core.Quaternion( )
    );
    this.spriteShape = new this.core.PhysicsShape( 'Sphere', 0.5 );
    this.spriteElement = new this.core.RigidBody( this.spriteShape, this.spriteTransform, 1 );
    this.spriteElement.setRestitution( 1 );

    this.spriteMaterial = new this.core.Material( 'Sprite', {
      "map": new THREE.TextureLoader( ).load( './assets/sprite.png' ),
      "color": 0xffffff
    } );
    this.spriteMesh = new this.core.Sprite( this.spriteMaterial, this.spriteTransform );
    this.spriteElement.health = 300;

    this.systems.physics.loadEntities( [ this.rigidBodyElement, this.floorRigidBodyElement, this.spriteElement ] );
    this.systems.output.loadEntities( [ this.mesh, this.floorMesh, this.spriteMesh ] );

    /*
    this.spriteElement.on( 'contact', ( e ) => {
      this.spriteElement.health -= e.force; console.log( this.spriteElement.health );
      if ( this.spriteElement.health < 0 )
      { this.systems.physics.unloadEntities( [ this.spriteElement ] ); this.systems.output.space.remove( this.spriteMesh ) }
    } );
    */

    this.core.start( );

    this.core.on( 'update', ( e ) => { this.step( e ); } );

    // this.core.start( );
  }

  step ( dt )
  {
    this.rigidBodyElement.getTransform( );
    this.spriteElement.getTransform( );
    for ( let e of this.spriteElements )
    { e.getTransform( ); }
    this.views[0].lookAt( this.transform.position.graphics );
    this.views[2].lookAt( this.spriteTransform.position.graphics );
  }
}

module.exports = ArcImpact;

},{}]},{},[1]);
