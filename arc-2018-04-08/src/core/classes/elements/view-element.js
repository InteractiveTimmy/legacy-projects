'use strict';

class ViewElement
{
  constructor ( p = { } ) // { entity:@ae.Entity, config:{ } }
  {
    this.entity = p.entity;
    this.limit = p.config.limit;

    this.entity.add( p.config.view );
  }

  update ( )
  {
    // keep rotation between PI * 2 and -PI * 2
    if ( this.entity.rotation.x > Math.PI * 2 ) { this.entity.rotation.x -= ( Math.PI * 2 ); }
    if ( this.entity.rotation.x < -Math.PI * 2 ) { this.entity.rotation.x += ( Math.PI * 2 ); }
    if ( this.entity.rotation.y > Math.PI * 2 ) { this.entity.rotation.y -= ( Math.PI * 2 ); }
    if ( this.entity.rotation.y < -Math.PI * 2 ) { this.entity.rotation.y += ( Math.PI * 2 ); }
    if ( this.entity.rotation.z > Math.PI * 2 ) { this.entity.rotation.z -= ( Math.PI * 2 ); }
    if ( this.entity.rotation.z < -Math.PI * 2 ) { this.entity.rotation.z += ( Math.PI * 2 ); }

    // apply limits
    if ( this.limit.hasOwnProperty( 'x+' ) )
    {
      if ( this.entity.rotation.x + this.entity.velocity.rotational.x > this.limit['x+'] )
      { this.entity.rotation.x = this.limit['x+']; this.entity.velocity.rotational.x = 0; }
    }
    if ( this.limit.hasOwnProperty( 'x-' ) )
    {
      if ( this.entity.rotation.x + this.entity.velocity.rotational.x < this.limit['x-'] )
      { this.entity.rotation.x = this.limit['x-']; this.entity.velocity.rotational.x = 0; }
    }

    if ( this.limit.hasOwnProperty( 'y+' ) )
    {
      if ( this.entity.rotation.y + this.entity.velocity.rotational.y > this.limit['y+'] )
      { this.entity.rotation.y = this.limit['y+']; this.entity.velocity.rotational.y = 0; }
    }
    if ( this.limit.hasOwnProperty( 'y-' ) )
    {
      if ( this.entity.rotation.y + this.entity.velocity.rotational.y < this.limit['y-'] )
      { this.entity.rotation.y = this.limit['y-']; this.entity.velocity.rotational.y = 0; }
    }

    if ( this.limit.hasOwnProperty( 'z+' ) )
    {
      if ( this.entity.rotation.z + this.entity.velocity.rotational.z > this.limit['z+'] )
      { this.entity.rotation.z = this.limit['z+']; this.entity.velocity.rotational.z = 0; }
    }
    if ( this.limit.hasOwnProperty( 'z-' ) )
    {
      if ( this.entity.rotation.z + this.entity.velocity.rotational.z < this.limit['z-'] )
      { this.entity.rotation.z = this.limit['z-']; this.entity.velocity.rotational.z = 0; }
    }
  }
}

module.exports = ViewElement;
