'use strict';

class Entity extends THREE.Object3D
{
  constructor ( p = { } ) // { static:bool }
  {
    super( );

    this.modules =
    {
      "InputElement": require( './elements/input-element.js' ),
      "InfluenceElement": require( './elements/influence-element.js' ),
      "PropulsionElement": require( './elements/propulsion-element.js' ),
      "VelocityElement": require( './elements/velocity-element.js' ),
      "ViewElement": require( './elements/view-element.js' ),
      "CollisionElement": require( './elements/collision-element-new.js' ),
      "MeshElement": require( './elements/mesh-element.js' ),
      "AtmosphereElement": require( './elements/atmosphere-element.js' )
    };

    this.elements = { };

    this.rotation.set( 0, 0, 0, 'YXZ' );
  }

  loadElement ( t, p = { } ) // "", { }
  {
    if ( this.modules.hasOwnProperty( `${t}Element` ) )
    { this.elements[t.toLowerCase( )] = new this.modules[`${t}Element`]( { "entity": this, "config": p } ); }
    else
    { throw new Error( `element type "${t}" not found` ); }
  }

  unloadElement ( p ) // "", element name
  { delete this.elements[p]; }

  update ( dt, f, g, w )
  {
    if ( this.isReady == true )
    {
      this.elements.atmosphere.update( );
      this.elements.influence.update( );
      this.elements.propulsion.update( dt );
      this.elements.velocity.update( );
      this.elements.view.update( );

      this.velocity.directional.multiply( f );

      /* NOTE gravity
      this.velocity.directional.x += g.x / dt;
      this.velocity.directional.y += g.y / dt;
      this.velocity.directional.z += g.z / dt;
      */
      this.elements.collision.update( w, dt );

      this.position.x += this.velocity.directional.x * ( 1 / dt );
      this.position.y += this.velocity.directional.y * ( 1 / dt );
      this.position.z += this.velocity.directional.z * ( 1 / dt );

      this.rotation.set(
        this.rotation.x + this.velocity.rotational.x,
        this.rotation.y + this.velocity.rotational.y,
        this.rotation.z + this.velocity.rotational.z
      );

      // floor reset
      /*
      if ( this.position.y < -3 )
      { this.position.y = 0; this.velocity.directional.y = 0; }
      */

      this.elements.influence.clear( );
    }
  }
}

module.exports = Entity;
