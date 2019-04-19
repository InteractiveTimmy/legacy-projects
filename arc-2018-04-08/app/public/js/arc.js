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
    this.conflict = new this.packs.Conflict( { "core": this.core } );
    // this.impact = new this.packs.Impact( { "core": this.core } );

    console.log( this );
  }
}

Ammo( ).then( ( r ) => {
  global.Ammo = r;
  let game = new Arc( );
} );

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./conflict/conflict.js":2,"./core/core.js":13,"./impact/impact.js":24}],2:[function(require,module,exports){
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

    // TEMP testing -- begin
    // NOTE: @Core.PhysicsSystem -- complete
    this.entityA = new this.core.Entity( );
    this.entityB = new this.core.Entity( );
    this.entityC = new this.core.Entity( );
    this.entityD = new this.core.Entity( );
    this.entityE = new this.core.Entity( );
    this.chunk = new this.core.Chunk( { "gravity": [ 0, -10, 0 ] } );
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
    for ( let x = 0; x < 1024; x++ )
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
    this.force = new Ammo.btVector3( 0, -20, 0 );
    this.center = new Ammo.btVector3( );

    this.yrot = -Math.PI;

    this.core.start( );
  }

  step ( dt )
  {
    if ( this.physicsBodyB.hasChanged )
    { console.log( 'i changed' ); }
    for ( let c of this.physicsBodies )
    {
      // c.applyForce( this.force, this.center );
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

},{}],4:[function(require,module,exports){
'use strict';

class Chunk
{
  constructor ( p ) // { physicsChunk: @Core.PhysicsChunk, graphicsChunk: @Core.GrahpicsChunk }
  {
    this.stats =
    {
      "isActive": false
    };

    this.chunks =
    {
      "PhysicsChunk": require( './chunk/physics-chunk.js' ),
      "GraphicsChunk": require( './chunk/graphics-chunk.js' )
    };

    this.physicsChunk = new this.chunks.PhysicsChunk( p );
    this.graphicsChunk = new this.chunks.GraphicsChunk( );
  }

  activate ( p )
  {
    this.stats.isActive = true;
    this.physicsChunk.activate( );
    this.graphicsChunk.activate( p );
  }

  deactivate ( p )
  {
    this.stats.isActive = false;
    this.physicsChunk.deactivate( );
    this.graphicsChunk.deactivate( p );
  }

  loadEntity ( p ) // @Core.Entity
  {
    if ( p.constructor.name != 'Entity' )
    { throw new Error( `parameter is not of type Entity` ); }
    else
    {
      this.physicsChunk.loadPhysicsElements( p.physicsElements );
      this.graphicsChunk.loadGraphicsElements( p.graphicsElements );
    }

    return this;
  }

  unloadEntity ( p )
  {

  }
}

module.exports = Chunk;

},{"./chunk/graphics-chunk.js":5,"./chunk/physics-chunk.js":6}],5:[function(require,module,exports){
'use strict';

class GraphicsChunk
{
  constructor ( p = { } ) // { gravity: [x,y,z] }
  {

    this.stats =
    {
      "isActive": false
    };

    this.uuid = UUID( );

    this.children = [ ]; // holds all children
  }

  activate ( p )
  {
    this.stats.isActive = true;
    for ( let c of this.children )
    { p.add( c ); }
  }

  deactivate ( p )
  {
    this.stats.isActive = false;
    for ( let c of this.children )
    { p.remove( c ); }
  }

  loadGraphicsElements ( p ) // [ ...@Three.Object3D ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length > 0 )
      { throw new Error( `element "${o.uuid}" already exists in GraphicChunk ${this.uuid} children` ); }
      else if ( o instanceof THREE.Object3D )
      { this.children.push( o ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Three.Object3D` ); }
    }
    return this;
  }

  unloadGraphicsElements ( p ) // [ ...@Three.Object3D ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length < 1 )
      { throw new Error( `element "${o.uuid}" doesn't exists in GraphicChunk ${this.uuid} children` ); }
      else if ( o instanceof THREE.Object3D )
      { this.children = this.children.filter( c => o.uuid != c.uuid ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Three.Object3D` ); }
    }
    return this;
  }
}

module.exports = GraphicsChunk;

},{}],6:[function(require,module,exports){
'use strict';

class PhysicsChunk
{
  constructor ( p = { } ) // { gravity: [x,y,z] }
  {
    this.stats =
    {
      "isActive": false
    };

    this.uuid = UUID( );

    // set up instance of physics chunk
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration( );
    let dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    let overlappingPairCache = new Ammo.btDbvtBroadphase( );
    let solver = new Ammo.btSequentialImpulseConstraintSolver( );

    // initialize Ammo world
    this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

    // generate gravity
    if ( p.hasOwnProperty( 'gravity' ) )
    { this.dynamicsWorld.setGravity( new Ammo.btVector3( ...p.gravity ) ); }

    this.children = [ ]; // holds complete list of children
  }

  activate ( )
  {
    this.stats.isActive = true;
  }

  deactivate ( )
  {
    this.stats.isActive = false;
  }

  loadPhysicsElements ( p ) // [ ...@Ammo.btRigidBody ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length > 0 )
      { throw new Error( `element "${o.uuid}" already exists in PhysicsChunk ${this.uuid} children` ); }
      else if ( o instanceof Ammo.btRigidBody )
      { this.children.push( o ); this.dynamicsWorld.addRigidBody( o ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Ammo.btRigidBody` ); }
    }
    return this;
  }

  unloadPhysicsElement ( p ) // [ ...@Ammo.btRigidBody ]
  {
    for ( let o of p )
    {
      if ( this.children.filter( c => o.uuid == c.uuid ).length < 1 )
      { throw new Error( `element "${o.uuid}" doesn't exists in PhysicsChunk ${this.uuid} children` ); }
      else if ( o instanceof THREE.Object3D )
      { this.children = this.children.filter( c => o.uuid != c.uuid ); Ammo.destroy( o ); }
      else
      { throw new Error( `element "${o.uuid}" is not an instance of Three.Object3D` ); }
    }
    return this;
  }

  step ( dt )
  {
    this.dynamicsWorld.stepSimulation( dt / 1000, 10 );
    /*
    let manifoldNum = this.dynamicsWorld.getDispatcher( ).getNumManifolds( );

    for ( let x = 0; x < manifoldNum; x++ )
    {
      let contactManifold = this.dynamicsWorld.getDispatcher( ).getManifoldByIndexInternal( x );

      let pointA = contactManifold.getContactPoint( ).get_m_localPointA( );
      let arrPointA = [ pointA.x( ), pointA.y( ), pointA.z( ) ];
      let bodyA = contactManifold.getBody0( );

      let pointB = contactManifold.getContactPoint( ).get_m_localPointB( );
      let arrPointB = [ pointB.x( ), pointB.y( ), pointB.z( ) ];
      let bodyB = contactManifold.getBody1( );
      // bodyB.applyImpulse( new Ammo.btVector3( 0, 10, 0 ), new Ammo.btVector3( ) );
      // console.log( bodyB );
    }
    */
    for ( let c of this.children )
    {
      if ( c.isDynamic || c.hasChanged )
      { c.getTransform( ); }
    }
  }
}

module.exports = PhysicsChunk;

},{}],7:[function(require,module,exports){
'use strict';

class Entity
{
  constructor ( p = { } ) // { static:bool }
  {
    this.physicsElements = [ ];
    this.graphicsElements = [ ];
  }

  loadElement ( t, p = { } ) // "", { }
  {
    p.entity = this;
    this[t + 'Elements'].push( p );
    return this;
  }

  bindElements ( p, g )
  {
    if ( this.graphicsElements.find( e => e.uuid == g.uuid ) && this.physicsElements.find( e => e.uuid = p.uuid ) )
    {
      this.graphicsElements.find( e => e.uuid == g.uuid ).boundPhysicsElement = p;
      this.physicsElements.find( e => e.uuid = p.uuid ).boundGraphicsElement = g;
    }
    else
    {
      throw new Error ( `cannot find one or more child elements: ${p.uuid} || ${g.uuid}` );
    }
  }

  getChildByUUID ( p ) // "", gets a child by UUID
  {
    if ( this.reference.uuid.hasOwnProperty( p ) )
    { return this.children[this.reference.uuid[p]]; }
    else
    { throw new Error( `child uuid ${p} doesn't exist under parent ${this.uuid}` ); }
  }

  getChildByName ( p ) // "", gets a child by name
  {
    if ( this.reference.name.hasOwnProperty( p ) )
    { return this.children[this.reference.name[p]]; }
    else
    { throw new Error( `child name ${p} doesn't exist under parent ${this.uuid}` ); }
  }
}

module.exports = Entity;

},{}],8:[function(require,module,exports){
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
    /*
    for ( let i in THREE )
    {
      if ( i.includes( p.type ) && i.includes( 'Geometry' ) )
      { foundGeometries++; foundGeometryType = i }
    }

    if ( foundGeometries == 1 )
    {
      myClass = THREE[foundGeometryType];

      class Geometry extends myClass
      {
        constructor ( p ) // config
        { super( ...p ); }
      }

      let geometry = new Geometry( p.config );

      return geometry;
    }
    else
    {
      myClass = THREE.BufferGeometry;

      class Geometry extends myClass
      {
        constructor ( p ) // [ ...verticies ]
        {
          super( );
          this.addAttribute( 'position', new THREE.BufferAttribute( p, 3 ) );
        }
      }

      let geometry = new Geometry( p.config );

      return geometry;
    }
    */
  }
}

module.exports = GeometryHelper;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
'use strict';

class Mesh extends THREE.Mesh
{
  constructor ( p ) // { geometry:@THREE.Geometry || @THREE, material}
  {
    super( p.geometry, p.material );

    this.rotation.reorder( 'YXZ' );
  }
}

module.exports = Mesh;

},{}],11:[function(require,module,exports){
'use strict';
class PhysicsBody extends Ammo.btRigidBody
{
  constructor ( p = { } )
  {
    let entity = p.entity;

    let shape;

    // handle shape type -- begin
    // 6 primatives
    if ( p.type == 'sphere' )
    { shape = new Ammo.btSphereShape( ...p.shape ); }
    if ( p.type == 'box' )
    { shape = new Ammo.btBoxShape( new Ammo.btVector3( ...p.shape ) ); }
    if ( p.type == 'cylinder' ) // [ ?? ]
    { shape = new Ammo.btCylinderShape( new Ammo.btVector3( ...p.shape ) ); }
    if ( p.type == 'capsule' )
    { }
    if ( p.type == 'cone' )
    { }
    if ( p.type == 'multisphere' )
    { }

    // 5 meshs
    if ( p.type == 'hull' )
    { }
    if ( p.type == 'mesh' )
    { }
    if ( p.type == 'staticmesh' )
    { }
    if ( p.type == 'terrain' )
    { }
    if ( p.type == 'plane' )
    { shape = new Ammo.btStaticPlaneShape( new Ammo.btVector3( ...p.shape ), 1 ); }

    // 1 compounds
    if ( p.type == 'compound' )
    { }
    // handle shape type -- end

    let startTransform  = new Ammo.btTransform();
    startTransform.setIdentity( );

    let mass = p.mass || 0;
    let isDynamic = ( mass !== 0 );
    let intertia = new Ammo.btVector3( 0, 0, 0 );

    if ( isDynamic )
    { shape.calculateLocalInertia( mass, intertia ); }

    // set position
    let position;
    if ( p.hasOwnProperty( 'position' ) )
    {
      if ( !Array.isArray( p.position ) )
      { throw new Error( `position is not of type Array` ); }
      else if ( p.position.length == 3 )
      {
        position = new THREE.Vector3( ...p.position );
        startTransform.setOrigin( new Ammo.btVector3( ...p.position ) );
      }
      else
      { throw new Error( `position does not contain 3 elements` ); return; }
    }
    else
    { position = new THREE.Vector3( ); }

    // set rotation and quaternion
    let rotation;
    let quaternion;
    if ( p.hasOwnProperty( 'rotation' ) )
    {
      if ( !Array.isArray( p.rotation ) )
      { throw new Error( `rotation is not of type Array` ); }
      else if ( p.rotation.length == 3 )
      {
        rotation = new THREE.Euler( ...p.rotation );
        quaternion = new THREE.Quaternion( ).setFromEuler( rotation );
        startTransform.setRotation( new Ammo.btQuaternion( ...quaternion.toArray( ) ) );
      }
      else if ( p.rotation.length == 4 )
      {
        quaternion = new THREE.Quaternion( ...p.rotation );
        rotation = new THREE.Euler( ).setFromQuaternion( quaternion );
        startTransform.setRotation( new Ammo.btQuaternion( ...quaternion.toArray( ) ) );
      }
      else
      { throw new Error( `position does not contain 3 or 4 elements` ); return; }
    }
    else
    { rotation = new THREE.Euler( ); quaternion = new THREE.Quaternion( ); }

    let motionState = new Ammo.btDefaultMotionState( startTransform );
    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, intertia );

    super( rbInfo );

    // this.setCollisionFlags( )
    this.uuid = UUID( ); // generates uuid for rigid body
    this.position = position; // stores Three.Vector3 of body position
    this.quaternion = quaternion; // stores Three.Quaternion of body quaternion
    this.rotation = rotation; // stores Three.Euler from body quaternion
    this.transform = new Ammo.btTransform( ); // stores transform buffer for physics system
    this.isDynamic = isDynamic;
    this.hasChanged = true;
  }
  /*
  applyForce ( f, o )
  {

  }
  */

  getTransform ( )
  {
    this.getMotionState( ).getWorldTransform( this.transform );
    this.transform.position = this.transform.getOrigin( );
    this.transform.quaternion = this.transform.getRotation( );

    this.position.set(
      this.transform.position.x( ),
      this.transform.position.y( ),
      this.transform.position.z( ),
    );

    this.quaternion.set(
      this.transform.quaternion.x( ),
      this.transform.quaternion.y( ),
      this.transform.quaternion.z( ),
      this.transform.quaternion.w( ),
    );

    this.rotation.setFromQuaternion( this.quaternion );

    if ( this.hasOwnProperty( 'boundGraphicsElement' ) )
    {
      this.boundGraphicsElement.position.copy( this.position );
      this.boundGraphicsElement.quaternion.copy( this.quaternion );
    }

    this.hasChanged = false;
    return this;
  }

  setTransform ( p ) // { position: [x,y,z], rotation: [x,y,z] || [x,y,z,w] }
  {
    this.transform = this.getCenterOfMassTransform( );

    if ( p.hasOwnProperty( 'position' ) )
    {
      if ( !Array.isArray( p.position ) )
      { throw new Error( `position is not of type Array` ); }
      else if ( p.position.length == 3 )
      { this.transform.setOrigin( new Ammo.btVector3( ...p.position ) ); }
      else
      { throw new Error( `position does not contain 3 elements` ); return; }
    }

    if ( p.hasOwnProperty( 'rotation' ) )
    {
      if ( !Array.isArray( p.rotation ) )
      { throw new Error( `rotation is not of type Array` ); }
      else if ( p.rotation.length == 3 )
      {
        this.transform.setRotation( new Ammo.btQuaternion(
          ...new THREE.Quaternion( ).setFromEuler( new THREE.Euler(
            ...p.rotation
          ) ).toArray( ) ) );
      }
      else if ( p.rotation.length == 4 )
      { this.transform.setRotation( new Ammo.btQuaternion( ...p.rotation ) ); }
      else
      { throw new Error( `position does not contain 3 or 4 elements` ); return; }
    }

    this.setCenterOfMassTransform( this.transform );

    if ( this.isDynamic )
    { this.setCenterOfMassTransform( this.transform ); }
    else
    { this.setMotionState( new Ammo.btDefaultMotionState( this.transform ) ); }

    this.hasChanged = true;
    return this;
  }
}

module.exports = PhysicsBody;

},{}],12:[function(require,module,exports){
'use strict';

class World extends THREE.Scene
{
  constructor ( ) // { physics: @Engine.PhysicsSystem }
  {
    super( );

    this.chunks = [ ];
  }

  activateChunks ( p ) // [ ...@Core.Chunk ]
  {
    for ( let o of p )
    {
      if ( o.constructor.name == 'Chunk' )
      { o.activate( this ); }
      else
      { throw new Error( `chunk "${o.uuid}" is not an instance of Core.Chunk` ); }
    }
    return this;
  }

  deactivateChunks ( p ) // [ ...@Core.Chunk ]
  {
    for ( let o of p )
    {
      if ( o.constructor.name == 'Chunk' )
      { o.deactivate( this ); }
      else
      { throw new Error( `chunk "${o.uuid}" is not an instance of Core.Chunk` ); }
    }
    return this;
  }

  loadChunks ( p ) // [ ...@Core.Chunk ]
  {
    for ( let o of p )
    {
      if ( this.chunks.filter( c => o.uuid == c.uuid ).length > 0 )
      { throw new Error( `chunk "${o.uuid}" already exists in World ${this.uuid} chunks` ); }
      else if ( o.constructor.name == 'Chunk' )
      { this.chunks.push( o ); }
      else
      { throw new Error( `chunk "${o.uuid}" is not an instance of Core.Chunk` ); }
    }
    return this;
  }
}

module.exports = World;

},{}],13:[function(require,module,exports){
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

    this.events = { };

    // import private modules
    this.modules = {
      "Output": require( './systems/output.js' ),
      "Input": require( './systems/input.js' ),
      "Physics": require( './systems/physics.js' ),
    };

    // initialize systems
    this.systems = { };
    this.systems.output = new this.modules.Output( );
    this.systems.input = new this.modules.Input( { "element": this.systems.output.renderer.domElement } );
    this.systems.physics = new this.modules.Physics( );

    // declare public objects
    this.Entity = require( './classes/entity.js' );
    this.Chunk = require( './classes/chunk.js' );
    this.PhysicsChunk = require( './systems/physics/physics-chunk.js' );
    this.GraphicsChunk = require( './classes/chunk/graphics-chunk.js' );
    this.World = require( './classes/world.js' );
    this.Geometry = require( './classes/geometry.js' );
    this.Material = require( './classes/material.js' );
    this.Mesh = require( './classes/mesh.js' );
    this.View = require( './classes/View.js' );
    this.PhysicsBody = require( './classes/physics-body.js' );

    // expose math
    /*
    this.Math =
    {
      "PhysicsVector3": require( './classes/math/physics-vector-3.js' ),
      "PhysicsQuaternion": require( './classes/math/physics-quaternion.js' )
    };
    */

    this.stats.ready = true;
  }

  loadWorld ( p ) // @Core.World
  {
    this.world = p;
    this.systems.physics.children = this.world.chunks;
    this.systems.output.loadWorld( this.world );
  }

  unloadWorld ( )
  {
    this.world = null;
    this.systems.physics.children.length = 0;
    this.systems.graphics.world = null;
  }

  start ( )
  {
    this.stats.running = true;
    this.systems.physics.start( );
    this.step( );
  }

  stop ( )
  { this.stats.running = false; }

  step ( )
  {
    if ( this.stats.running && this.stats.ready )
    { window.requestAnimationFrame( ( ) => { this.step( ); } ); }
    this.stats.dt = performance.now( ) - this.stats.dtl;
    this.stats.dtl = performance.now( );

    this.emit( 'update', this.stats.dt );

    this.systems.physics.step( this.stats.dt );
    this.systems.output.update( );

    this.systems.input.clearAnalog( );
  }

  on ( e, f )
  {
    if ( typeof( f ) == 'function' ) { this.events[e] = f; }
    else { throw 'f is not a function'; }
  }

  emit ( e, p = { } )
  {
    for ( let f of Object.keys( this.events ) )
    { if ( e == f ) { this.events[ e ]( p ); } }
  }

}

module.exports = ArcCore;

},{"./classes/View.js":3,"./classes/chunk.js":4,"./classes/chunk/graphics-chunk.js":5,"./classes/entity.js":7,"./classes/geometry.js":8,"./classes/material.js":9,"./classes/mesh.js":10,"./classes/physics-body.js":11,"./classes/world.js":12,"./systems/input.js":14,"./systems/output.js":20,"./systems/physics.js":22,"./systems/physics/physics-chunk.js":23}],14:[function(require,module,exports){
'use strict';

class InputSystem
{
  constructor ( p = { } ) // { element:@html }
  {
    // import modules
    this.Keyboard = require( './input/keyboard.js' );
    this.Mouse = require( './input/mouse.js' );
    this.Pad = require( './input/pad.js' );
    this.InputInstance = require( './input/input-instance.js' );

    // import reference
    this.reference = require( './input/reference.js' );

    // set variables
    this.instances = { };
    this.element = p.element;
    this.stats = {
      "pl": false // pointer lock
    };

    // init reference
    for ( let r of this.reference )
    { this.instances[r.code] = new this.InputInstance( r ); }

    // init devices
    this.keyboard = new this.Keyboard( { "instances": this.instances } );
    this.mouse = new this.Mouse( { "instances": this.instances, "element": p.element, "stats": this.stats } );

    // init events
    document.addEventListener( 'keydown', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'keyup', ( e ) => { this.handleEvent( e ); } );

    document.addEventListener( 'mousemove', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'mousedown', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'mouseup', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'mousewheel', ( e ) => { this.handleEvent( e ); } );
    document.addEventListener( 'pointerlockchange', ( e ) => { this.handlePointerLock( e ); } );
    document.addEventListener( 'mozpointerlockchange', ( e ) => { this.handlePointerLock( e ); } );
  }

  get ( p ) // @input.code
  {
    if ( this.instances.hasOwnProperty( p ) )
    { return this.instances[p]; }
    else
    { this.instances[p] = new this.InputInstance( { "code": p } ); return this.instances[p]; }
  }

  handleEvent ( p )
  {
    if ( this.stats.pl || p.type == 'mousedown' )
    {
      if ( p.constructor.name == 'KeyboardEvent' && this.stats.pl )
      { this.keyboard.handle( p ); }
      else if ( p.constructor.name == 'MouseEvent' )
      { this.mouse.handle( p ); }
    }

    if ( this.stats.pl == true ) { p.preventDefault( ); }
  }

  handlePointerLock ( p )
  {
    if (document.pointerLockElement === this.element || document.mozPointerLockElement === this.element )
    { this.stats.pl = true; }
    else
    { this.stats.pl = false; }
  }

  clearAnalog ( )
  {
    this.mouse.clearAnalog( );
  }
}

module.exports = InputSystem;

},{"./input/input-instance.js":15,"./input/keyboard.js":16,"./input/mouse.js":17,"./input/pad.js":18,"./input/reference.js":19}],15:[function(require,module,exports){
'use strict';

class InputInstance
{
  constructor ( p = { } )
  {
    this.value = p.value || 0;
    this.name = p.name || String.fromCharCode( p.code.replace( /^\D+/g, '') ).toUpperCase( );
    this.code = p.code;
  }
}

module.exports = InputInstance;

},{}],16:[function(require,module,exports){
'use strict';

class Keyboard
{
  constructor ( p = { } ) // { "instances":{...} }
  {
    this.instances = p.instances;

    this.InputInstance = require( './input-instance.js' );
  }

  handle ( p )
  {
    if ( p.type == "keydown" ) { this.handleKeyDown( p ); }
    if ( p.type == "keyup" ) { this.handleKeyUp( p ); }
  }

  handleKeyDown ( p )
  {
    if ( this.instances.hasOwnProperty( `k${p.keyCode}` ) )
    { this.instances[`k${p.keyCode}`].value = 1; }
    else
    {
      this.instances[`k${p.keyCode}`] = new this.InputInstance( {
        "value": 1,
        "name": p.key.toUpperCase( ),
        "code": `k${p.keyCode}`
      } );
    }
  }

  handleKeyUp ( p )
  {
    if ( this.instances.hasOwnProperty( `k${p.keyCode}` ) )
    { this.instances[`k${p.keyCode}`].value = 0; }
    else
    {
      this.instances[`k${p.keyCode}`] = new this.InputInstance( {
        "value": 0,
        "name": p.key.toUpperCase( ),
        "code": `k${p.keyCode}`
      } );
    }
  }
}

module.exports = Keyboard;

},{"./input-instance.js":15}],17:[function(require,module,exports){
'use strict';

class Mouse
{
  constructor ( p = { } )
  {
    this.instances = p.instances;
    this.stats = p.stats;
    this.element = p.element;

    this.InputInstance = require( './input-instance.js' );
  }

  handle ( p )
  {
    if ( p.type == "mousemove" ) { this.handleMouseMove( p ); }
    if ( p.type == "mousedown" ) { this.handleMouseDown( p ); }
    if ( p.type == "mouseup" ) { this.handleMouseUp( p ); }
    if ( p.type == "mousewheel" ) { this.handleKeyUp( p ); }
  }

  handleMouseMove ( p )
  {
    this.instances['mmy+'].value += p.movementY * 0.02;
    this.instances['mmy-'].value -= p.movementY * 0.02;
    this.instances['mmx+'].value += p.movementX * 0.02;
    this.instances['mmx-'].value -= p.movementX * 0.02;

    if ( this.instances['mmy+'].value < 0 ) { this.instances['mmy+'].value = 0; }
    if ( this.instances['mmy-'].value < 0 ) { this.instances['mmy-'].value = 0; }
    if ( this.instances['mmx+'].value < 0 ) { this.instances['mmx+'].value = 0; }
    if ( this.instances['mmx-'].value < 0 ) { this.instances['mmx-'].value = 0; }
  }

  handleMouseWheel ( p )
  {
    this.instances['mwy+'].value += p.wheelDeltaY / 120;
    this.instances['mwy-'].value -= p.wheelDeltaY / 120;
    this.instances['mwx+'].value += p.wheelDeltaX / 120;
    this.instances['mwx-'].value -= p.wheelDeltaX / 120;

    if ( this.instances['mwy+'].value < 0 ) { this.instances['mwy+'].value = 0; }
    if ( this.instances['mwy-'].value < 0 ) { this.instances['mwy-'].value = 0; }
    if ( this.instances['mwx+'].value < 0 ) { this.instances['mwx+'].value = 0; }
    if ( this.instances['mwx-'].value < 0 ) { this.instances['mwx-'].value = 0; }
  }

  handleMouseDown ( p )
  {
    if ( this.stats.pl == false )
    {
      this.element.requestPointerLock = this.element.requestPointerLock || this.element.mozRequestPointerLock;
      this.element.requestPointerLock( );
    }
    if ( this.instances.hasOwnProperty( `mb${p.button}` ) )
    { this.instances[`mb${p.button}`].value = 1; }
  }

  handleMouseUp ( p )
  {
    if ( this.instances.hasOwnProperty( `mb${p.button}` ) )
    { this.instances[`mb${p.button}`].value = 0; }
  }

  clearAnalog ( )
  {
    this.instances['mmy+'].value = 0;
    this.instances['mmy-'].value = 0;
    this.instances['mmx+'].value = 0;
    this.instances['mmx-'].value = 0;

    this.instances['mwy+'].value = 0;
    this.instances['mwy-'].value = 0;
    this.instances['mwx+'].value = 0;
    this.instances['mwx-'].value = 0;
  }
}

module.exports = Mouse;

},{"./input-instance.js":15}],18:[function(require,module,exports){
'use strict';

class Pad
{
  constructor ( )
  {

  }
}

module.exports = Pad;

},{}],19:[function(require,module,exports){
module.exports = [
  { "code": "mmy-", "name": "MOUSE MOVE UP" },
  { "code": "mmy+", "name": "MOUSE MOVE DOWN" },
  { "code": "mmx-", "name": "MOUSE MOVE LEFT" },
  { "code": "mmx+", "name": "MOUSE MOVE RIGHT" },
  { "code": "mwy+", "name": "MOUSE WHEEL DOWN" },
  { "code": "mwy-", "name": "MOUSE WHEEL UP" },
  { "code": "mwx+", "name": "MOUSE WHEEL RIGHT" },
  { "code": "mwx-", "name": "MOUSE WHEEL LEFT" },
  { "code": "mb0", "name": "MOUSE BUTTON LEFT" },
  { "code": "mb1", "name": "MOUSE BUTTON AUX" },
  { "code": "mb2", "name": "MOUSE BUTTON RIGHT" }
];

},{}],20:[function(require,module,exports){
'use strict';

class OutputSystem
{
  constructor ( p = { } ) // { element:@element }
  {
    this.stats = { };
    this.world;

    this.Renderer = require( './output/renderer.js' );

    this.renderer = new this.Renderer( );
  }

  update ( )
  {
    if ( this.hasOwnProperty( 'world' ) )
    { this.renderer.update( { "scene": this.world } ); }
  }

  loadWorld ( p ) // @Engine.World
  { this.world = p; }

  loadView ( p ) // @ae.View
  {
    if ( p.constructor.name == 'View' )
    { this.renderer.load( p ); }
  }

  unload ( )
  {

  }
}

module.exports = OutputSystem;

},{"./output/renderer.js":21}],21:[function(require,module,exports){
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

  update ( p = { } ) // { scene:@scene }
  {
    if ( this.views.length == 1 )
    { this.render( p.scene, this.views[0] ); }
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

        this.render( p.scene, this.views[v] );
      }
    }
  }

  setDimensions ( p = { } ) // { width:#, height:# }
  {
    this.setSize( p.width, p.height );
    for ( let v in this.views )
    { this.views[v].setViewPort( p ); }
  }

  load ( p = { } )
  {
    this.views.push( p );
    this.setDimensions( this.getSize( ) )
  }

  unload ( p = { } )
  { }
}

module.exports = Renderer;

},{}],22:[function(require,module,exports){
'use strict';

class PhysicsSystem
{
  constructor ( )
  {
    this.stats =
    {
      "ready": false,
      "running": false,
      "dt": 0
    };

    this.children = [ ];

    this.stats.ready = true;
  }

  loadPhysicsChunk ( p ) // @Core.PhysicsChunk
  {
    if ( p.constructor.name != 'PhysicsChunk' )
    { throw new Error( `parameter is not of type PhysicsChunk` ); }
    else if ( this.children.filter( c => p.uuid == c.uuid ).length > 0 )
    { throw new Error( `PhysicsChunk "${p.uuid}" already exists in physics system's active physics chunks`); }
    else
    { this.children.push( p ); return p; }
  }

  unloadPhysicsChunk ( p ) // @Core.PhyicsChunk
  {
    if ( p.constructor.name != 'PhysicsChunk' )
    { throw new Error( `parameter is not of type PhysicsChunk` ); }
    else if ( this.children.filter( c => p.uuid == c.uuid ).length < 1 )
    { throw new Error( `PhysicsChunk "${p.uuid}" doesn't exists in physics system's physics chunks`); }
    else
    { this.children = this.children.filter( c => p.uuid != c.uuid ); return p; }
  }

  getPhysicsChunkByUUID ( p = "" ) // "", uuid
  { return this.children.find( c => p == c.uuid ) }

  getPhysicsChunkByName ( p = "" ) // "", name
  { return this.children.find( c => p == c.name ); }

  start ( )
  { this.stats.running = true; }

  stop ( )
  { this.stats.running = false; }

  step ( dt )
  {
    if ( this.stats.ready && this.stats.running )
    {
      for ( let c of this.children )
      {
        if ( c.stats.isActive )
        {
          c.physicsChunk.step( dt );
        }
      }
    }
    else
    { return; }
  }
}

module.exports = PhysicsSystem;

},{}],23:[function(require,module,exports){
'use strict';

class PhysicsChunk
{
  constructor ( p = { } ) // { gravity: [x,y,z] }
  {

    this.stats =
    {
      "isActive": false
    };

    this.uuid = UUID( );

    // set up instance of physics chunk
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration( );
    let dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    let overlappingPairCache = new Ammo.btDbvtBroadphase( );
    let solver = new Ammo.btSequentialImpulseConstraintSolver( );

    // initialize Ammo world
    this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );

    // generate gravity
    if ( p.hasOwnProperty( 'gravity' ) )
    { this.dynamicsWorld.setGravity( new Ammo.btVector3( ...p.gravity ) ); }

    this.entities = { }; // holds all entities
    this.statics = [ ]; // holds static entities
    this.dynamics = [ ]; // holds dynamic entities
  }

  loadPhysicsElement ( p ) // @Ammo.btRigidBody
  {
    p.physicsChunk = this;
    this.entities[p.uuid] = p;
    if ( p.isDynamic )
    { this.dynamics.push( p ); }
    else
    { this.statics.push( p ); }
  }

  step ( dt )
  { this.dynamicsWorld.stepSimulation( dt / 1000, 10 ); }
}

module.exports = PhysicsChunk;

},{}],24:[function(require,module,exports){
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

},{}]},{},[1]);
