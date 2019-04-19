'use strict';

class CollisionElement
{
  constructor ( p ) // { entity:@ae.Entity, config:{ } }
  {
    this.entity = p.entity;
    this.geometry = p.config.geometry;
    console.log( this.geometry );

    this.rays = { };

    this.rays.x = new THREE.Raycaster(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 1, 0, 0 ),
      0,
      1
    );

    this.rays.y = new THREE.Raycaster(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 0, -1, 0 ),
      0,
      1
    );

    this.rays.z = new THREE.Raycaster(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 0, 0, 1 ),
      0,
      1
    );

    this.ray = new THREE.Raycaster(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 0, -1, 0 ),
      0,
      1
    );
    this.intersections;
  }

  update ( w, dt )
  {
    /*
    // console.log( this.ray.far );
    this.ray.ray.origin.copy( this.entity.position );
    this.ray.far = 1 - ( this.entity.velocity.directional.y / dt );
    this.intersections = this.ray.intersectObjects( w.children, true );
    if ( this.intersections.length > 0 ) {
      console.log( this.intersections[0].point );
      if ( this.entity.velocity.directional.y < 0 )
      {
        this.entity.velocity.directional.y = 0;
        this.entity.position.y = this.intersections[0].point.y + 1;
      }
      // this.entity.velocity.directional.y = 0;
    }
    */
    this.rays.x.ray.origin.copy( this.entity.position );
    this.rays.x.far = 1 + Math.abs( this.entity.velocity.directional.x / dt );
    this.rays.x.intersections = this.rays.x.intersectObjects( w.children, true );

    if ( this.entity.velocity.directional.x > 0 )
    { this.rays.x.ray.direction.x = 1; }
    else if ( this.entity.velocity.directional.x <= 0 )
    { this.rays.x.ray.direction.x = -1; }

    if ( this.rays.x.intersections.length > 0 )
    {
      // console.log( this.rays.x.intersections[0].point );

      if ( this.rays.x.intersections[0].point.x < this.entity.position.x )
      {
        if ( this.entity.velocity.directional.x < 0 )
        {
          this.entity.velocity.directional.x = 0;
          this.entity.position.x = this.rays.x.intersections[0].point.x + 1;
        }
      }
      else if ( this.rays.x.intersections[0].point.x > this.entity.position.x )
      {
        if ( this.entity.velocity.directional.x > 0 )
        {
          this.entity.velocity.directional.x = 0;
          this.entity.position.x = this.rays.x.intersections[0].point.x - 1;
        }
      }
    }

    this.rays.y.ray.origin.copy( this.entity.position );
    this.rays.y.far = 1 + Math.abs( this.entity.velocity.directional.y / dt );
    this.rays.y.intersections = this.rays.y.intersectObjects( w.children, true );

    if ( this.entity.velocity.directional.y > 0 )
    { this.rays.y.ray.direction.y = 1; }
    else if ( this.entity.velocity.directional.y <= 0 )
    { this.rays.y.ray.direction.y = -1; }

    if ( this.rays.y.intersections.length > 0 )
    {
      // console.log( this.rays.y.intersections[0] );

      if ( this.rays.y.intersections[0].point.y < this.entity.position.y )
      {
        if ( this.entity.velocity.directional.y < 0 )
        {
          this.entity.velocity.directional.y = 0;
          this.entity.position.y = this.rays.y.intersections[0].point.y + 1;
        }
      }
      else if ( this.rays.y.intersections[0].point.y > this.entity.position.y )
      {
        if ( this.entity.velocity.directional.y > 0 )
        {
          this.entity.velocity.directional.y = 0;
          this.entity.position.y = this.rays.y.intersections[0].point.y - 1;
        }
      }
    }

    this.rays.z.ray.origin.copy( this.entity.position );
    this.rays.z.far = 1 + Math.abs( this.entity.velocity.directional.z / dt );
    this.rays.z.intersections = this.rays.z.intersectObjects( w.children, true );

    if ( this.entity.velocity.directional.z > 0 )
    { this.rays.z.ray.direction.z = 1; }
    else if ( this.entity.velocity.directional.z <= 0 )
    { this.rays.z.ray.direction.z = -1; }

    if ( this.rays.z.intersections.length > 0 )
    {
      // console.log( this.rays.z.intersections[0].point );

      if ( this.rays.z.intersections[0].point.z < this.entity.position.z )
      {
        if ( this.entity.velocity.directional.z < 0 )
        {
          this.entity.velocity.directional.z = 0;
          this.entity.position.z = this.rays.z.intersections[0].point.z + 1;
        }
      }
      else if ( this.rays.z.intersections[0].point.z > this.entity.position.z )
      {
        if ( this.entity.velocity.directional.z > 0 )
        {
          this.entity.velocity.directional.z = 0;
          this.entity.position.z = this.rays.z.intersections[0].point.z - 1;
        }
      }
    }

      /*
      if ( this.entity.velocity.directional.y < 0 )
      {
        this.entity.velocity.directional.y = 0;
        this.entity.position.y = this.rays.y.intersections[0].point.y + 1;
      }
      */

    /*
    for ( let r of Object.keys( this.rays ) )
    {
      if ( r == 'y' )
      {
      this.rays[r].ray.origin.copy( this.entity.position );
      this.rays[r].far = 1 + Math.abs( this.entity.velocity.directional[r] / dt );
      if ( this.entity.velocity.directional[r] > 0 )
      { this.rays[r].ray.direction[r] = 1; }
      else if ( this.entity.velocity.directional[r] <= 0 )
      { this.rays[r].ray.direction[r] = -1; }

      this.rays[r].intersections = this.ray.intersectObjects( w.children, true );
      if ( this.rays[r].intersections.length > 0 )
      {
        console.log( 'collision', this.rays[r].intersections[0].point );

        if ( this.rays[r].intersections[0].point[r] < this.entity.position[r] )
        {
          if ( this.entity.velocity.directional[r] < 0 )
          {
            this.entity.velocity.directional[r] = 0;
            this.entity.position[r] = this.rays[r].intersections[0].point[r] + 1;
          }
        }
        else if ( this.rays[r].intersections[0].point[r] > this.entity.position[r] )
        {
          if ( this.entity.velocity.directional[r] > 0 )
          {
            this.entity.velocity.directional[r] = 0;
            this.entity.position[r] = this.rays[r].intersections[0].point[r] - 1;
          }
        }
      }
      }
    }
    */

    // console.log( this.entity.velocity.directional );



    /*
    this.rays.x.ray.origin.copy( this.entity.position );
    this.rays.x.far = 1 + Math.abs( this.entity.velocity.directional.x / dt );

    if ( this.entity.velocity.directional.x >= 0 )
    { this.rays.x.far = 1 + ( this.entity.velocity.directional.x / dt ); }
    else if ( this.entity.velocity.directional.x < 0 )
    { this.rays.x.far = 1 }
    */

  }
}

module.exports = CollisionElement;
