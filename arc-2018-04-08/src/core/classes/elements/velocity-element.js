'use strict';

class VelocityElement
{
  constructor ( p = { } ) // { entity:@ae.Entity, config:{ } }
  {
    this.entity = p.entity;

    this.lock = ( p.config.hasOwnProperty( 'lock' ) ) ? p.config.lock : { };
    this.directional = new THREE.Vector3( 0, 0, 0 );
    this.rotational = new THREE.Euler( 0, 0, 0, 'YXZ' );

    this.entity.velocity = {
      "directional": this.directional,
      "rotational": this.rotational
    };
  }

  update ( dt )
  {
    // check locked directional velocity, then apply
    if ( !this.lock.directional )
    { this.directional.add( this.entity.influence.directional ); }
    else
    { this.directional.copy( this.entity.influence.directional ); }

    // check locked rotational velocity, then apply
    if ( !this.lock.rotational )
    {
      this.rotational.x += this.entity.influence.rotational.x;
      this.rotational.y += this.entity.influence.rotational.y;
      this.rotational.z += this.entity.influence.rotational.z;
    }
    else
    { this.rotational.copy( this.entity.influence.rotational ); }
  }
}

module.exports = VelocityElement;
