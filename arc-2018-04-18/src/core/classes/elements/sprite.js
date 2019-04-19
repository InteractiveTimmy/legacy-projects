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
