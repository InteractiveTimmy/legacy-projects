'use strict';

class CollisionElement
{
  constructor ( p ) // { entity:@ae.Entity, config:{ } }
  {
    this.entity = p.entity;
    this.geometry = p.config.geometry;
    this.rotationLimit = [ 0, 1, 0 ];
    this.rotationalEuler = new THREE.Euler( 0, 0, 0, 'YXZ' );
    this.rays = [ ];
    this.intersections = [ ];
    this.intersectingRays = [ ];
    this.mean = new THREE.Vector3( );
    this.meanTarget = new THREE.Vector3( );
    this.buffer = new THREE.Vector3( );
    this.origin = new THREE.Vector3( );

    for ( let v of this.geometry.vertices )
    {
      this.rays.push( new THREE.Raycaster(
        this.entity.position,
        new THREE.Vector3( ).copy( v ).normalize( ),
        0,
        new THREE.Vector3( ).distanceTo( v )
      ) );
      this.rays[this.rays.length - 1].target = new THREE.Vector3( ).copy( v );
      this.rays[this.rays.length - 1].buffer = new THREE.Vector3( ).copy( v );
    }
    console.log( this.rays );
  }

  update ( w, dt )
  {
    this.intersections.length = 0;
    this.intersectingRays.length = 0;

    // update direction
    for ( let r of this.rays )
    {
      r.ray.direction.copy( r.target ); // get original target
      this.rotationalEuler.copy( this.entity.rotation ); // copy entity rotation for adjustment

      // zero-out all limited axis
      this.rotationalEuler.x *= this.rotationLimit[0];
      this.rotationalEuler.y *= this.rotationLimit[1];
      this.rotationalEuler.z *= this.rotationLimit[2];

      r.ray.direction.applyEuler( this.rotationalEuler ); // rotation from original target

      // apply velocity vector
      r.ray.direction.x += this.entity.velocity.directional.x / dt;
      r.ray.direction.y += this.entity.velocity.directional.y / dt;
      r.ray.direction.z += this.entity.velocity.directional.z / dt;

      r.far = this.origin.distanceTo( r.ray.direction );
      r.ray.direction.normalize( );

      r.intersections = r.intersectObjects( w.children, true );
      if ( r.intersections.length > 0 )
      {
        this.intersections = this.intersections.concat( r.intersections );
        this.intersectingRays = this.intersectingRays.concat( r );
      }
    }

    if ( this.intersections.length > 0 )
    {
      let pMean = new THREE.Vector3( );
      let fMean = new THREE.Vector3( );
      let tMean = new THREE.Vector3( );

      for ( let r of this.intersectingRays )
      {
        tMean.add( r.target );
      }

      for ( let i of this.intersections )
      {
        pMean.add( i.point );
        fMean.add( i.face.normal );
      }

      tMean.x /= this.intersections.length;
      tMean.y /= this.intersections.length;
      tMean.z /= this.intersections.length;

      pMean.x /= this.intersections.length;
      pMean.y /= this.intersections.length;
      pMean.z /= this.intersections.length;

      fMean.x /= this.intersections.length;
      fMean.y /= this.intersections.length;
      fMean.z /= this.intersections.length;

      tMean.negate( );
      // tMean.cross( this.entity.velocity.directional );

      tMean.add( pMean );

      // this.entity.position.copy( tMean );

      console.log( 'target', tMean );
      console.log( 'point', pMean );
      // console.log( 'face', fMean );
    }
    /*
    for ( let i of this.intersections )
    {
      pMean.add( i.point );
    }

    pMean.set(

    )
    */


    /*
    this.mean.set( 0, 0, 0 );
    this.intersections.length = 0;
    this.intersectingRays.length = 0;

    for ( let r of this.rays )
    {
      r.buffer.copy( this.entity.velocity.directional );
      r.buffer.set(
        r.buffer.x / dt,
        r.buffer.y / dt,
        r.buffer.z / dt,
      );

      r.buffer.add( r.target );

      r.ray.direction.copy( r.buffer ).normalize( );
      r.far = this.origin.distanceTo( r.buffer );

      r.intersections = r.intersectObjects( w.children, true );
      if ( r.intersections.length > 0 )
      {
        this.intersections = this.intersections.concat( r.intersections );
        this.intersectingRays.push( r );
      }
    }

    if ( this.intersections.length > 0 )
    {
      let buffer = new THREE.Vector3( );
      let tmean = new THREE.Vector3( );
      let pmean = new THREE.Vector3( );
      let fmean = new THREE.Vector3( );

      buffer.copy( this.entity.position );
      for ( let i of this.intersectingRays )
      {
        tmean.add( i.target );
      }
      tmean.set(
        tmean.x / this.intersectingRays.length,
        tmean.y / this.intersectingRays.length,
        tmean.z / this.intersectingRays.length
      );

      for ( let i of this.intersections )
      {
        pmean.add( i.point );
        fmean.add( i.face.normal );
      }

      fmean.set(
        fmean.x / this.intersections.length,
        fmean.y / this.intersections.length,
        fmean.z / this.intersections.length
      );

      fmean.normalize( );

      pmean.set(
        pmean.x / this.intersections.length,
        pmean.y / this.intersections.length,
        pmean.z / this.intersections.length
      );

      buffer.copy( pmean );
      buffer.sub( tmean );

      // buffer.copy( temp );

      // temp.negate( );
      console.log( 'tmean', tmean );
      console.log( 'pmean', pmean );
      console.log( 'buffer', buffer );
      this.entity.position.copy( buffer );
      //console.log( 'fmean', fmean );
    }


    this.buffer.set( 0, 0, 0 );
    for ( let i of this.intersections )
    {
      this.buffer.add( i.point );
    }

    if ( this.intersections.length != 0 )
    {
      // console.log( this.intersections[0] );
      this.buffer.set(
        this.buffer.x / this.intersections.length,
        this.buffer.y / this.intersections.length,
        this.buffer.z / this.intersections.length
      );

      // console.log( 'buffer', this.buffer );
      this.mean.set( 0, 0, 0 );
      for ( let i of this.intersectingRays )
      {
        this.mean.add( i.target );
      }
      this.mean.set(
        this.mean.x / this.intersectingRays.length,
        this.mean.y / this.intersectingRays.length,
        this.mean.z / this.intersectingRays.length
      );
      this.buffer.sub( this.mean );
      /*
      this.buffer.set(
        this.buffer.x * 0.001,
        this.buffer.y * 0.001,
        this.buffer.z * 0.001
      );*/
      // this.entity.position.copy( this.buffer );
    //}


    /*
    if ( this.intersectingRays.length != 0 )
    {
      for ( let i of this.intersectingRays )
      {
        this.mean.add( i.target );
      }

      this.mean.set(
        this.mean.x / this.intersectingRays.length,
        this.mean.y / this.intersectingRays.length,
        this.mean.z / this.intersectingRays.length
      );

      this.entity.position.sub( this.mean );

      console.log( 'mean', this.mean );
    }
    */
    /*
    for ( let i of this.intersections )
    {
      this.buffer.copy( i.point );
      this.buffer.sub( this.entity.position );
      this.mean.add( this.buffer );
    }

    if ( this.intersections.length != 0 )
    {
      this.mean.set(
        this.mean.x / this.intersections.length,
        this.mean.y / this.intersections.length,
        this.mean.z / this.intersections.length
      );

      // console.log( 'mean', this.mean );
      // this.entity.position.add( this.mean );
      this.mean.negate( );

      // this.entity.position.add( this.mean );
      // console.log( 'pos', this.entity.position );

      this.mean.normalize( );

      this.buffer.set(
        1 - Math.abs( this.mean.x ),
        1 - Math.abs( this.mean.y ),
        1 - Math.abs( this.mean.z )
      );

      // this.entity.velocity.directional.multiply( this.buffer );
      */
    //}

  }
}

module.exports = CollisionElement;
