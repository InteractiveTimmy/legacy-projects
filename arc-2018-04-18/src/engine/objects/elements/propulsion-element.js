'use strict';

class PropulsionElement
{
  constructor ( p = { } ) // { entity:@ae.Entity, config:{ } }
  {
    this.entity = p.entity;

    this['directional+'] = p.config.directional || p.config['directional+'] || [ 0, 0, 0 ];
    this['directional-'] = p.config.directional || p.config['directional-'] || [ 0, 0, 0 ];

    this['rotational+'] = p.config.rotational || p.config['rotational+'] || [ 0, 0, 0 ];
    this['rotational-'] = p.config.rotational || p.config['rotational-'] || [ 0, 0, 0 ];
  }

  update ( dt )
  {
    // modify influence of directional influence based on propulsion values
    if ( this.entity.influence.directional.x > 0 )
    { this.entity.influence.directional.x *= ( this['directional+'][0] / dt ); }
    if ( this.entity.influence.directional.x < 0 )
    { this.entity.influence.directional.x *= ( this['directional-'][0] / dt ); }

    if ( this.entity.influence.directional.y > 0 )
    { this.entity.influence.directional.y *= ( this['directional+'][1] / dt ); }
    if ( this.entity.influence.directional.y < 0 )
    { this.entity.influence.directional.y *= ( this['directional-'][1] / dt ); }

    if ( this.entity.influence.directional.z > 0 )
    { this.entity.influence.directional.z *= ( this['directional+'][2] / dt ); }
    if ( this.entity.influence.directional.z < 0 )
    { this.entity.influence.directional.z *= ( this['directional-'][2] / dt ); }

    // modify influence of rotational influence based on propulsion values
    if ( this.entity.influence.rotational.x > 0 )
    { this.entity.influence.rotational.x *= ( this['rotational+'][0] / dt ); }
    if ( this.entity.influence.rotational.x < 0 )
    { this.entity.influence.rotational.x *= ( this['rotational-'][0] / dt ); }

    if ( this.entity.influence.rotational.y > 0 )
    { this.entity.influence.rotational.y *= ( this['rotational+'][1] / dt ); }
    if ( this.entity.influence.rotational.y < 0 )
    { this.entity.influence.rotational.y *= ( this['rotational-'][1] / dt ); }

    if ( this.entity.influence.rotational.z > 0 )
    { this.entity.influence.rotational.z *= ( this['rotational+'][2] / dt ); }
    if ( this.entity.influence.rotational.z < 0 )
    { this.entity.influence.rotational.z *= ( this['rotational-'][2] / dt ); }
  }
}

module.exports = PropulsionElement;
