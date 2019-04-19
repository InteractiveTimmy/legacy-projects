'use strict';

class InfluenceElement
{
  constructor ( p ) // { entity:@ae.Entity, config:{ } }
  {
    this.entity = p.entity;

    this.relative =
    {
      "directional": ( p.config.relative.hasOwnProperty( 'directional' ) ) ? p.config.relative.directional : [ ],
      "rotational": ( p.config.relative.hasOwnProperty( 'rotational' ) ) ? p.config.relative.rotational : [ ],
    }
    this.ignore = ( p.config.hasOwnProperty( 'ignore' ) ) ? p.config.ignore : [ ]; // axes to ignore when adjusting relative
    this.directional = new THREE.Vector3( 0, 0, 0 );
    this.directionalBuffer = new THREE.Vector3( 0, 0, 0 );
    this.rotational = new THREE.Euler( 0, 0, 0, 'YXZ' );
    this.rotationalBuffer = new THREE.Euler( 0, 0, 0, 'YXZ' );

    this.entity.influence = {
      "directional": this.directional,
      "rotational": this.rotational
    };
  }

  clear ( )
  {
    this.directional.set( 0, 0, 0 );
    this.directionalBuffer.set( 0, 0, 0 );
    this.rotational.set( 0, 0, 0 );
    this.rotationalBuffer.set( 0, 0, 0 );
  }

  update ( )
  {
    this.rotationalBuffer.copy( this.entity.rotation );

    // set rotational influences
    if ( this.entity.elements.input.hasOwnProperty( 'pitch+' ) )
    { this.rotational.x += this.entity.elements.input['pitch+'].value; }
    if ( this.entity.elements.input.hasOwnProperty( 'pitch-' ) )
    { this.rotational.x -= this.entity.elements.input['pitch-'].value; }

    if ( this.entity.elements.input.hasOwnProperty( 'yaw+' ) )
    { this.rotational.y += this.entity.elements.input['yaw+'].value; }
    if ( this.entity.elements.input.hasOwnProperty( 'yaw-' ) )
    { this.rotational.y -= this.entity.elements.input['yaw-'].value; }

    if ( this.entity.elements.input.hasOwnProperty( 'roll+' ) )
    { this.rotational.z += this.entity.elements.input['roll+'].value; }
    if ( this.entity.elements.input.hasOwnProperty( 'roll-' ) )
    { this.rotational.z -= this.entity.elements.input['roll-'].value; }

    // set directional influences
    if ( this.entity.elements.input.hasOwnProperty( 'truck+' ) )
    { this.directional.x += this.entity.elements.input['truck+'].value; }
    if ( this.entity.elements.input.hasOwnProperty( 'truck-' ) )
    { this.directional.x -= this.entity.elements.input['truck-'].value; }

    if ( this.entity.elements.input.hasOwnProperty( 'pedestal+' ) )
    { this.directional.y += this.entity.elements.input['pedestal+'].value; }
    if ( this.entity.elements.input.hasOwnProperty( 'pedestal-' ) )
    { this.directional.y -= this.entity.elements.input['pedestal-'].value; }

    if ( this.entity.elements.input.hasOwnProperty( 'dolly+' ) )
    { this.directional.z += this.entity.elements.input['dolly+'].value; }
    if ( this.entity.elements.input.hasOwnProperty( 'dolly-' ) )
    { this.directional.z -= this.entity.elements.input['dolly-'].value; }

    // handle relative directional
    for ( let a of this.relative.directional )
    {
      this.directionalBuffer[a] += this.directional[a];
      this.directional[a] = 0;
    }

    // handle relative rotational
    for ( let a of this.relative.rotational )
    { this.rotationalBuffer[a] = 0; }

    // apply rotation euler of entity to relatives
    if ( this.relative.directional.length > 0 )
    { this.directionalBuffer.applyEuler( this.rotationalBuffer ); }

    // combine relatives into final
    this.directional.add( this.directionalBuffer );
  }
}

module.exports = InfluenceElement;
