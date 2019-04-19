'use strict';

class Entity
{
  constructor ( p = { } )
  {
    this.name = ( p.hasOwnProperty( 'name' ) ? p.name : UTILS.uuid( ) );
    this.elements = [ ];
    this.position = ( p.hasOwnProperty( 'position' ) ? new THREE.Vector3( ...p.position ) : new THREE.Vector3( ) );
    this.rotation = ( p.hasOwnProperty( 'rotation' ) ? new THREE.Euler( ...p.rotation, 'YXZ' ) : new THREE.Euler( 0, 0, 0, 'YXZ' ) );
    this.direction = ( p.hasOwnProperty( 'direction' ) ? new THREE.Vector3( ...p.direction ) : new THREE.Vector3( 0, 0, -1 ) );

    this.target = new THREE.Object3D( );
    this.target.position.copy( this.position );

    this.initial = {
      "direction":new THREE.Vector3( ).copy( this.direction ),
      "rotation":new THREE.Euler( ).copy( this.rotation )
    };

    this.previous = {
      "position":new THREE.Vector3( ).copy( this.position ),
      "rotation":new THREE.Euler( ).copy( this.rotation )
    }
  }

  updateElementPosition ( p )
  {
    if ( p.hasOwnProperty( 'position' ) )
    {
      if ( !p.position.equals( this.position ) )
      {
        if ( p.offset.relative )
        {
          p.offset.position.copy( p.offset.initial.position );
          p.offset.position.applyEuler( this.rotation );
          p.position.copy( this.position ).add( p.offset.position );
        }
        else
        {
          p.position.copy( this.position ).add( p.offset.position );
        }
      }
    }
  }

  updateElementRotation ( p )
  {
    if ( p.hasOwnProperty( 'rotation' ) )
    {
      if ( !p.rotation.equals( this.rotation ) )
      { p.rotation.copy( this.rotation )/*.add( this.elements[e].offset.rotation )*/; }
    }
  }

  update ( )
  {
    this.target.position.copy( this.position );
    if ( !this.position.equals( this.previous.position ) )
    {
      for ( let e in this.elements )
      {
        this.updateElementPosition( this.elements[e] );
        this.updateElementRotation( this.elements[e] );
      }
    }


    this.previous.position.copy( this.position );
    this.previous.rotation.copy( this.rotation );
  }

  loadElement ( t, p, o )
  {
    let e = require( `./element/element.js` )( this, t, p, o );
    this.elements.push( e );
    console.log( `Added ${t} Element`, this );
    return e;
  }

  unloadElement ( p )
  {

  }
}

module.exports = Entity;
