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
