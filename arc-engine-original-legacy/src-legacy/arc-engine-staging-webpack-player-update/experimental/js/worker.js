importScripts( './external/three.js' );

let graphics;
let canvas;
let gl;

onmessage = function(evt) {
  if ( evt.data.status == "init" )
  {
    console.log( evt.data.canvas );
    canvas = evt.data.canvas;
    gl = canvas.getContext( 'webgl' );

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.clearColor(0, 0, 0, 0.3);

    console.log( gl );
    // graphics = new Graphics( evt.data.canvas );

    gl.commit();
  }
};

class Graphics
{
  constructor ( element )
  {
    this.element = element;

    this.renderer = new THREE.WebGLRenderer( { canvas:this.element, antialias:true } );
    this.scene = new THREE.Scene( );
    this.camera = new THREE.PerspectiveCamera( 60, 16/9, 0.001, 2000000 );
  }
}
