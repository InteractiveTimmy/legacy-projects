'use strict';

class ViewHandler
{
  constructor ( p = { } )
  {
    this.views = [ ];
  }

  update ( )
  {

  }

  set ( p )
  {

  }

  setViewPort( p )
  {
    for ( let v in this.views )
    {
      this.views[v].aspect =
      ( p.dimensions.width * ( this.views[v].vp.w ) ) /
      ( p.dimensions.height * ( this.views[v].vp.h ) );

      this.views[v].fov = this.calcFOV( {
        "cr":this.views[v].aspect,
        "tr":this.views[v].vp.tr,
        "tf":this.views[v].vp.tf
      } );

      this.views[v].updateProjectionMatrix( );
    }
  }

  calcFOV ( p ) // { cr:#, tr:#, tf:# }
  { return ( 2 * Math.atan( p.cr / p.tr * Math.tan( ( p.tf / 2) * Math.PI / 180 ) ) ) / Math.PI * 180; }

  get ( )
  {
    return this.views;
  }

  load ( p ) // { }
  {
    let myView = new THREE.PerspectiveCamera(
      p.fov || 90,
      p.aspect || document.body.clientWidth / document.body.clientHeight,
      p.near || 0.001,
      p.far || 1000
    );
    myView.vp = p.vp || { "x":0, "y":0, "w":1, "h":1, "tf":myView.fov, "tr":myView.aspect };
    this.views.push( myView );
  }

  unload( p )
  {

  }
}

module.exports = ( p ) => { return new ViewHandler( p ); }
