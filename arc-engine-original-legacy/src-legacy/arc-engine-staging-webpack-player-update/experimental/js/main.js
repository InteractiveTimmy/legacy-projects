'use strict';

let htmlCanvas = document.getElementById( 'app' );
let offscreen = htmlCanvas.transferControlToOffscreen( );

let worker = new Worker( "js/worker.js" );
worker.postMessage( { "canvas":offscreen, "status":"init" }, [offscreen] );
