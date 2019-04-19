/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* NOTE Webworker Message Format
{ command:'contains method', data:'contains data to be passed into target method' }
*/

let app = {};

app.initWorker = function ( myWorker ) { return new Promise( ( resolve, reject ) => {

  let parent = this;
  let worker = new Worker( myWorker );

  worker.onmessage = function ( m )
  { parent.processMessage( m ); }

  worker.onerror = function ( e )
  { parent.processError( e ); }

  this.workers.push( worker );

  resolve( `Generated Worker ${myWorker}` );
  // resolve( `Worker ${worker.name} Initialized` );
} ); };

app.getWorkerByName = function ( myName )
{
  for ( let x in this.workers )
  {
    if ( this.workers[x].name == myName )
    { return this.workers[x]; }
  }
};

app.init = function ( ) { return new Promise( ( resolve, reject ) => {
    console.log( 'app.init' );

    this.name = 'app';
    this.workers = [];

    this.ajax = __webpack_require__( 1 );
    this.generateUUID = __webpack_require__( 2 );

    Promise.all( [
      this.initWorker( '/js/worker-engine.js' ),
      this.initWorker( '/js/worker-loader.js' )
    ] ).then( ( r ) => {
      console.log( r );
      resolve( 'resolved app.init' );
    } ).catch( ( e ) => {
      console.log( e );
    } );

  } );
};

app.processMessage = function ( m )
{
  console.log( 'processed message', m );
};

app.main = function ( )
{
  console.log( 'app.main' );

  this.init( ).then( ( r ) => {
    console.log( r );
    this.workers[0].postMessage( 'Message to Engine' );
    this.workers[1].postMessage( 'Message to Loader' );
  } ).catch( ( e ) => {
    console.log( e );
  } );

};

window.onload = function ( )
{
  app.main( );
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let ajax = {};

ajax.get = function ( myURL ) { return new Promise( ( resolve, reject ) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', myURL);
  xhr.onload = () => resolve(xhr.responseText);
  xhr.onerror = () => reject(xhr.statusText);
  xhr.send();
} ); };

module.exports = ajax;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function ( ) {
  return ( [1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) ).toUpperCase( );
}


/***/ })
/******/ ]);