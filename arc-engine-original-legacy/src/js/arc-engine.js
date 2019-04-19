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


class Game
{
  constructor ( p )
  {
    this.count = 0;
    this.lastTime = new Date( ).getSeconds( );

    this.canvas = document.getElementById( p.canvas );
    this.app = new pc.Application( this.canvas, { } );
    this.app.start( );

    // Fill screen
    this.app.setCanvasFillMode( pc.FILLMODE_FILL_WINDOW );
    this.app.setCanvasResolution( pc.RESOLUTION_AUTO );

    // Set scene
    this.app.scene.ambientLight = new pc.Color( 0.2, 0.2, 0.2 );

    // Set gravity

    // Auto resize
    window.addEventListener( 'resize', ( ) => {
      this.app.resizeCanvas( );
    } );

    // Add camera
    this.camera = new pc.Entity( 'player' );
    this.camera.addComponent( 'camera', {
      "clearColor":new pc.Color( 0.1, 0.1, 0.1 ),
      "farClip":1000,
      "nearClip":0.001,
      "rect":new pc.Vec4( 0, 0.5, 1, 0.5 )
    } );
    this.camera.setPosition( 0, 0, 20 );
    this.app.root.addChild( this.camera );

    this.cameraB = new pc.Entity( 'player' );
    this.cameraB.addComponent( 'camera', {
      "clearColor":new pc.Color( 0.1, 0.1, 0.1 ),
      "farClip":1000,
      "nearClip":0.001,
      "rect":new pc.Vec4( 0, 0, 1, 0.5 )
    } );
    this.cameraB.setPosition( -20, 0, 20 );
    this.cameraB.rotateLocal( 0, -45, 0 );
    this.app.root.addChild( this.cameraB );

    // Testing area -- Begin
    let object;
    object = new pc.Entity( 'light' );
    object.addComponent( 'light' );
    object.setEulerAngles( 45, 0, 0 );
    this.app.root.addChild( object );

    object = new pc.Entity( 'floor' );
    object.addComponent( 'model', {
      "type":"box"
    } );
    object.addComponent( 'rigidbody', {
      "type":"static",
      "mass":50
    } );
    object.addComponent( 'collision', {
      "type":"box",
      "halfExtents":new pc.Vec3( 5, 0.5, 5 )
    } );
    object.setPosition( 0, -5, 0 );
    object.setLocalScale( 10, 1, 10 );
    this.app.root.addChild( object );

    object = new pc.Entity( 'floor' );
    object.addComponent( 'model', {
      "type":"box"
    } );
    for ( let x = -3; x <= 3; x++ )
    {
      for ( let y = -3; y <= 3; y++ )
      {
        for ( let z = -3; z <= 3; z++ )
        {
          object = new pc.Entity( 'cube' );
          object.addComponent( 'model', {
            "type":"box"
          } );
          object.addComponent( 'rigidbody', {
            "type":"dynamic",
            "mass":50
          } );
          object.addComponent( 'collision', {
            "type":"box",
            "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
          } );
          object.setPosition( x, y, z );
          this.app.root.addChild( object );
        }
      }
    }
    // Testing area -- End

    // Update handler
    this.app.on( 'update', ( dt ) => { this.step( { "dt":dt } ) } );
  }

  step ( p )
  {
    this.count++;
    let now = new Date( ).getSeconds( );
    if ( now != this.lastTime )
    {
      this.lastTime = now;
      console.log( this.count );
      this.count = 0;
    }
    /*
    if ( this.count >= 10 )
    {
      this.count = 0;
      let object = new pc.Entity( 'cube' );
      object.addComponent( 'model', {
        "type":"box"
      } );
      object.addComponent( 'rigidbody', {
        "type":"dynamic",
        "mass":50
      } );
      object.addComponent( 'collision', {
        "type":"box",
        "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
      } );
      object.setPosition( Math.random( ) * 10 - 5, Math.random( ) * 10 - 5, Math.random( ) * 10 - 5 );
      this.app.root.addChild( object );
    }
    */
  }
}

let game = new Game( { "canvas":"app" } );


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmI2ZWY4YmU3MWFhZDg1YmRhNmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxFQUFFO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0EsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxhQUFhLFVBQVUsSUFBSTtBQUNqRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixpQkFBaUIiLCJmaWxlIjoiLi9qcy9hcmMtZW5naW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmI2ZWY4YmU3MWFhZDg1YmRhNmQiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEdhbWVcbntcbiAgY29uc3RydWN0b3IgKCBwIClcbiAge1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSggKS5nZXRTZWNvbmRzKCApO1xuXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggcC5jYW52YXMgKTtcbiAgICB0aGlzLmFwcCA9IG5ldyBwYy5BcHBsaWNhdGlvbiggdGhpcy5jYW52YXMsIHsgfSApO1xuICAgIHRoaXMuYXBwLnN0YXJ0KCApO1xuXG4gICAgLy8gRmlsbCBzY3JlZW5cbiAgICB0aGlzLmFwcC5zZXRDYW52YXNGaWxsTW9kZSggcGMuRklMTE1PREVfRklMTF9XSU5ET1cgKTtcbiAgICB0aGlzLmFwcC5zZXRDYW52YXNSZXNvbHV0aW9uKCBwYy5SRVNPTFVUSU9OX0FVVE8gKTtcblxuICAgIC8vIFNldCBzY2VuZVxuICAgIHRoaXMuYXBwLnNjZW5lLmFtYmllbnRMaWdodCA9IG5ldyBwYy5Db2xvciggMC4yLCAwLjIsIDAuMiApO1xuXG4gICAgLy8gU2V0IGdyYXZpdHlcblxuICAgIC8vIEF1dG8gcmVzaXplXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCAoICkgPT4ge1xuICAgICAgdGhpcy5hcHAucmVzaXplQ2FudmFzKCApO1xuICAgIH0gKTtcblxuICAgIC8vIEFkZCBjYW1lcmFcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBwYy5FbnRpdHkoICdwbGF5ZXInICk7XG4gICAgdGhpcy5jYW1lcmEuYWRkQ29tcG9uZW50KCAnY2FtZXJhJywge1xuICAgICAgXCJjbGVhckNvbG9yXCI6bmV3IHBjLkNvbG9yKCAwLjEsIDAuMSwgMC4xICksXG4gICAgICBcImZhckNsaXBcIjoxMDAwLFxuICAgICAgXCJuZWFyQ2xpcFwiOjAuMDAxLFxuICAgICAgXCJyZWN0XCI6bmV3IHBjLlZlYzQoIDAsIDAuNSwgMSwgMC41IClcbiAgICB9ICk7XG4gICAgdGhpcy5jYW1lcmEuc2V0UG9zaXRpb24oIDAsIDAsIDIwICk7XG4gICAgdGhpcy5hcHAucm9vdC5hZGRDaGlsZCggdGhpcy5jYW1lcmEgKTtcblxuICAgIHRoaXMuY2FtZXJhQiA9IG5ldyBwYy5FbnRpdHkoICdwbGF5ZXInICk7XG4gICAgdGhpcy5jYW1lcmFCLmFkZENvbXBvbmVudCggJ2NhbWVyYScsIHtcbiAgICAgIFwiY2xlYXJDb2xvclwiOm5ldyBwYy5Db2xvciggMC4xLCAwLjEsIDAuMSApLFxuICAgICAgXCJmYXJDbGlwXCI6MTAwMCxcbiAgICAgIFwibmVhckNsaXBcIjowLjAwMSxcbiAgICAgIFwicmVjdFwiOm5ldyBwYy5WZWM0KCAwLCAwLCAxLCAwLjUgKVxuICAgIH0gKTtcbiAgICB0aGlzLmNhbWVyYUIuc2V0UG9zaXRpb24oIC0yMCwgMCwgMjAgKTtcbiAgICB0aGlzLmNhbWVyYUIucm90YXRlTG9jYWwoIDAsIC00NSwgMCApO1xuICAgIHRoaXMuYXBwLnJvb3QuYWRkQ2hpbGQoIHRoaXMuY2FtZXJhQiApO1xuXG4gICAgLy8gVGVzdGluZyBhcmVhIC0tIEJlZ2luXG4gICAgbGV0IG9iamVjdDtcbiAgICBvYmplY3QgPSBuZXcgcGMuRW50aXR5KCAnbGlnaHQnICk7XG4gICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ2xpZ2h0JyApO1xuICAgIG9iamVjdC5zZXRFdWxlckFuZ2xlcyggNDUsIDAsIDAgKTtcbiAgICB0aGlzLmFwcC5yb290LmFkZENoaWxkKCBvYmplY3QgKTtcblxuICAgIG9iamVjdCA9IG5ldyBwYy5FbnRpdHkoICdmbG9vcicgKTtcbiAgICBvYmplY3QuYWRkQ29tcG9uZW50KCAnbW9kZWwnLCB7XG4gICAgICBcInR5cGVcIjpcImJveFwiXG4gICAgfSApO1xuICAgIG9iamVjdC5hZGRDb21wb25lbnQoICdyaWdpZGJvZHknLCB7XG4gICAgICBcInR5cGVcIjpcInN0YXRpY1wiLFxuICAgICAgXCJtYXNzXCI6NTBcbiAgICB9ICk7XG4gICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ2NvbGxpc2lvbicsIHtcbiAgICAgIFwidHlwZVwiOlwiYm94XCIsXG4gICAgICBcImhhbGZFeHRlbnRzXCI6bmV3IHBjLlZlYzMoIDUsIDAuNSwgNSApXG4gICAgfSApO1xuICAgIG9iamVjdC5zZXRQb3NpdGlvbiggMCwgLTUsIDAgKTtcbiAgICBvYmplY3Quc2V0TG9jYWxTY2FsZSggMTAsIDEsIDEwICk7XG4gICAgdGhpcy5hcHAucm9vdC5hZGRDaGlsZCggb2JqZWN0ICk7XG5cbiAgICBvYmplY3QgPSBuZXcgcGMuRW50aXR5KCAnZmxvb3InICk7XG4gICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ21vZGVsJywge1xuICAgICAgXCJ0eXBlXCI6XCJib3hcIlxuICAgIH0gKTtcbiAgICBmb3IgKCBsZXQgeCA9IC0zOyB4IDw9IDM7IHgrKyApXG4gICAge1xuICAgICAgZm9yICggbGV0IHkgPSAtMzsgeSA8PSAzOyB5KysgKVxuICAgICAge1xuICAgICAgICBmb3IgKCBsZXQgeiA9IC0zOyB6IDw9IDM7IHorKyApXG4gICAgICAgIHtcbiAgICAgICAgICBvYmplY3QgPSBuZXcgcGMuRW50aXR5KCAnY3ViZScgKTtcbiAgICAgICAgICBvYmplY3QuYWRkQ29tcG9uZW50KCAnbW9kZWwnLCB7XG4gICAgICAgICAgICBcInR5cGVcIjpcImJveFwiXG4gICAgICAgICAgfSApO1xuICAgICAgICAgIG9iamVjdC5hZGRDb21wb25lbnQoICdyaWdpZGJvZHknLCB7XG4gICAgICAgICAgICBcInR5cGVcIjpcImR5bmFtaWNcIixcbiAgICAgICAgICAgIFwibWFzc1wiOjUwXG4gICAgICAgICAgfSApO1xuICAgICAgICAgIG9iamVjdC5hZGRDb21wb25lbnQoICdjb2xsaXNpb24nLCB7XG4gICAgICAgICAgICBcInR5cGVcIjpcImJveFwiLFxuICAgICAgICAgICAgXCJoYWxmRXh0ZW50c1wiOm5ldyBwYy5WZWMzKCAwLjUsIDAuNSwgMC41IClcbiAgICAgICAgICB9ICk7XG4gICAgICAgICAgb2JqZWN0LnNldFBvc2l0aW9uKCB4LCB5LCB6ICk7XG4gICAgICAgICAgdGhpcy5hcHAucm9vdC5hZGRDaGlsZCggb2JqZWN0ICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVGVzdGluZyBhcmVhIC0tIEVuZFxuXG4gICAgLy8gVXBkYXRlIGhhbmRsZXJcbiAgICB0aGlzLmFwcC5vbiggJ3VwZGF0ZScsICggZHQgKSA9PiB7IHRoaXMuc3RlcCggeyBcImR0XCI6ZHQgfSApIH0gKTtcbiAgfVxuXG4gIHN0ZXAgKCBwIClcbiAge1xuICAgIHRoaXMuY291bnQrKztcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoICkuZ2V0U2Vjb25kcyggKTtcbiAgICBpZiAoIG5vdyAhPSB0aGlzLmxhc3RUaW1lIClcbiAgICB7XG4gICAgICB0aGlzLmxhc3RUaW1lID0gbm93O1xuICAgICAgY29uc29sZS5sb2coIHRoaXMuY291bnQgKTtcbiAgICAgIHRoaXMuY291bnQgPSAwO1xuICAgIH1cbiAgICAvKlxuICAgIGlmICggdGhpcy5jb3VudCA+PSAxMCApXG4gICAge1xuICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICBsZXQgb2JqZWN0ID0gbmV3IHBjLkVudGl0eSggJ2N1YmUnICk7XG4gICAgICBvYmplY3QuYWRkQ29tcG9uZW50KCAnbW9kZWwnLCB7XG4gICAgICAgIFwidHlwZVwiOlwiYm94XCJcbiAgICAgIH0gKTtcbiAgICAgIG9iamVjdC5hZGRDb21wb25lbnQoICdyaWdpZGJvZHknLCB7XG4gICAgICAgIFwidHlwZVwiOlwiZHluYW1pY1wiLFxuICAgICAgICBcIm1hc3NcIjo1MFxuICAgICAgfSApO1xuICAgICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ2NvbGxpc2lvbicsIHtcbiAgICAgICAgXCJ0eXBlXCI6XCJib3hcIixcbiAgICAgICAgXCJoYWxmRXh0ZW50c1wiOm5ldyBwYy5WZWMzKCAwLjUsIDAuNSwgMC41IClcbiAgICAgIH0gKTtcbiAgICAgIG9iamVjdC5zZXRQb3NpdGlvbiggTWF0aC5yYW5kb20oICkgKiAxMCAtIDUsIE1hdGgucmFuZG9tKCApICogMTAgLSA1LCBNYXRoLnJhbmRvbSggKSAqIDEwIC0gNSApO1xuICAgICAgdGhpcy5hcHAucm9vdC5hZGRDaGlsZCggb2JqZWN0ICk7XG4gICAgfVxuICAgICovXG4gIH1cbn1cblxubGV0IGdhbWUgPSBuZXcgR2FtZSggeyBcImNhbnZhc1wiOlwiYXBwXCIgfSApO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=