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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDNkY2VmNTY1ODRjMDY5ZDFlOGEiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wscUJBQXFCLFFBQVE7QUFDN0I7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLGFBQWEsVUFBVSxJQUFJO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLGlCQUFpQiIsImZpbGUiOiIuL2J1aWxkL2FyYy1lbmdpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwM2RjZWY1NjU4NGMwNjlkMWU4YSIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgR2FtZVxue1xuICBjb25zdHJ1Y3RvciAoIHAgKVxuICB7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCApLmdldFNlY29uZHMoICk7XG5cbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBwLmNhbnZhcyApO1xuICAgIHRoaXMuYXBwID0gbmV3IHBjLkFwcGxpY2F0aW9uKCB0aGlzLmNhbnZhcywgeyB9ICk7XG4gICAgdGhpcy5hcHAuc3RhcnQoICk7XG5cbiAgICAvLyBGaWxsIHNjcmVlblxuICAgIHRoaXMuYXBwLnNldENhbnZhc0ZpbGxNb2RlKCBwYy5GSUxMTU9ERV9GSUxMX1dJTkRPVyApO1xuICAgIHRoaXMuYXBwLnNldENhbnZhc1Jlc29sdXRpb24oIHBjLlJFU09MVVRJT05fQVVUTyApO1xuXG4gICAgLy8gU2V0IHNjZW5lXG4gICAgdGhpcy5hcHAuc2NlbmUuYW1iaWVudExpZ2h0ID0gbmV3IHBjLkNvbG9yKCAwLjIsIDAuMiwgMC4yICk7XG5cbiAgICAvLyBTZXQgZ3Jhdml0eVxuXG4gICAgLy8gQXV0byByZXNpemVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsICggKSA9PiB7XG4gICAgICB0aGlzLmFwcC5yZXNpemVDYW52YXMoICk7XG4gICAgfSApO1xuXG4gICAgLy8gQWRkIGNhbWVyYVxuICAgIHRoaXMuY2FtZXJhID0gbmV3IHBjLkVudGl0eSggJ3BsYXllcicgKTtcbiAgICB0aGlzLmNhbWVyYS5hZGRDb21wb25lbnQoICdjYW1lcmEnLCB7XG4gICAgICBcImNsZWFyQ29sb3JcIjpuZXcgcGMuQ29sb3IoIDAuMSwgMC4xLCAwLjEgKSxcbiAgICAgIFwiZmFyQ2xpcFwiOjEwMDAsXG4gICAgICBcIm5lYXJDbGlwXCI6MC4wMDEsXG4gICAgICBcInJlY3RcIjpuZXcgcGMuVmVjNCggMCwgMC41LCAxLCAwLjUgKVxuICAgIH0gKTtcbiAgICB0aGlzLmNhbWVyYS5zZXRQb3NpdGlvbiggMCwgMCwgMjAgKTtcbiAgICB0aGlzLmFwcC5yb290LmFkZENoaWxkKCB0aGlzLmNhbWVyYSApO1xuXG4gICAgdGhpcy5jYW1lcmFCID0gbmV3IHBjLkVudGl0eSggJ3BsYXllcicgKTtcbiAgICB0aGlzLmNhbWVyYUIuYWRkQ29tcG9uZW50KCAnY2FtZXJhJywge1xuICAgICAgXCJjbGVhckNvbG9yXCI6bmV3IHBjLkNvbG9yKCAwLjEsIDAuMSwgMC4xICksXG4gICAgICBcImZhckNsaXBcIjoxMDAwLFxuICAgICAgXCJuZWFyQ2xpcFwiOjAuMDAxLFxuICAgICAgXCJyZWN0XCI6bmV3IHBjLlZlYzQoIDAsIDAsIDEsIDAuNSApXG4gICAgfSApO1xuICAgIHRoaXMuY2FtZXJhQi5zZXRQb3NpdGlvbiggLTIwLCAwLCAyMCApO1xuICAgIHRoaXMuY2FtZXJhQi5yb3RhdGVMb2NhbCggMCwgLTQ1LCAwICk7XG4gICAgdGhpcy5hcHAucm9vdC5hZGRDaGlsZCggdGhpcy5jYW1lcmFCICk7XG5cbiAgICAvLyBUZXN0aW5nIGFyZWEgLS0gQmVnaW5cbiAgICBsZXQgb2JqZWN0O1xuICAgIG9iamVjdCA9IG5ldyBwYy5FbnRpdHkoICdsaWdodCcgKTtcbiAgICBvYmplY3QuYWRkQ29tcG9uZW50KCAnbGlnaHQnICk7XG4gICAgb2JqZWN0LnNldEV1bGVyQW5nbGVzKCA0NSwgMCwgMCApO1xuICAgIHRoaXMuYXBwLnJvb3QuYWRkQ2hpbGQoIG9iamVjdCApO1xuXG4gICAgb2JqZWN0ID0gbmV3IHBjLkVudGl0eSggJ2Zsb29yJyApO1xuICAgIG9iamVjdC5hZGRDb21wb25lbnQoICdtb2RlbCcsIHtcbiAgICAgIFwidHlwZVwiOlwiYm94XCJcbiAgICB9ICk7XG4gICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ3JpZ2lkYm9keScsIHtcbiAgICAgIFwidHlwZVwiOlwic3RhdGljXCIsXG4gICAgICBcIm1hc3NcIjo1MFxuICAgIH0gKTtcbiAgICBvYmplY3QuYWRkQ29tcG9uZW50KCAnY29sbGlzaW9uJywge1xuICAgICAgXCJ0eXBlXCI6XCJib3hcIixcbiAgICAgIFwiaGFsZkV4dGVudHNcIjpuZXcgcGMuVmVjMyggNSwgMC41LCA1IClcbiAgICB9ICk7XG4gICAgb2JqZWN0LnNldFBvc2l0aW9uKCAwLCAtNSwgMCApO1xuICAgIG9iamVjdC5zZXRMb2NhbFNjYWxlKCAxMCwgMSwgMTAgKTtcbiAgICB0aGlzLmFwcC5yb290LmFkZENoaWxkKCBvYmplY3QgKTtcblxuICAgIG9iamVjdCA9IG5ldyBwYy5FbnRpdHkoICdmbG9vcicgKTtcbiAgICBvYmplY3QuYWRkQ29tcG9uZW50KCAnbW9kZWwnLCB7XG4gICAgICBcInR5cGVcIjpcImJveFwiXG4gICAgfSApO1xuICAgIGZvciAoIGxldCB4ID0gLTM7IHggPD0gMzsgeCsrIClcbiAgICB7XG4gICAgICBmb3IgKCBsZXQgeSA9IC0zOyB5IDw9IDM7IHkrKyApXG4gICAgICB7XG4gICAgICAgIGZvciAoIGxldCB6ID0gLTM7IHogPD0gMzsgeisrIClcbiAgICAgICAge1xuICAgICAgICAgIG9iamVjdCA9IG5ldyBwYy5FbnRpdHkoICdjdWJlJyApO1xuICAgICAgICAgIG9iamVjdC5hZGRDb21wb25lbnQoICdtb2RlbCcsIHtcbiAgICAgICAgICAgIFwidHlwZVwiOlwiYm94XCJcbiAgICAgICAgICB9ICk7XG4gICAgICAgICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ3JpZ2lkYm9keScsIHtcbiAgICAgICAgICAgIFwidHlwZVwiOlwiZHluYW1pY1wiLFxuICAgICAgICAgICAgXCJtYXNzXCI6NTBcbiAgICAgICAgICB9ICk7XG4gICAgICAgICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ2NvbGxpc2lvbicsIHtcbiAgICAgICAgICAgIFwidHlwZVwiOlwiYm94XCIsXG4gICAgICAgICAgICBcImhhbGZFeHRlbnRzXCI6bmV3IHBjLlZlYzMoIDAuNSwgMC41LCAwLjUgKVxuICAgICAgICAgIH0gKTtcbiAgICAgICAgICBvYmplY3Quc2V0UG9zaXRpb24oIHgsIHksIHogKTtcbiAgICAgICAgICB0aGlzLmFwcC5yb290LmFkZENoaWxkKCBvYmplY3QgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBUZXN0aW5nIGFyZWEgLS0gRW5kXG5cbiAgICAvLyBVcGRhdGUgaGFuZGxlclxuICAgIHRoaXMuYXBwLm9uKCAndXBkYXRlJywgKCBkdCApID0+IHsgdGhpcy5zdGVwKCB7IFwiZHRcIjpkdCB9ICkgfSApO1xuICB9XG5cbiAgc3RlcCAoIHAgKVxuICB7XG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGxldCBub3cgPSBuZXcgRGF0ZSggKS5nZXRTZWNvbmRzKCApO1xuICAgIGlmICggbm93ICE9IHRoaXMubGFzdFRpbWUgKVxuICAgIHtcbiAgICAgIHRoaXMubGFzdFRpbWUgPSBub3c7XG4gICAgICBjb25zb2xlLmxvZyggdGhpcy5jb3VudCApO1xuICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgfVxuICAgIC8qXG4gICAgaWYgKCB0aGlzLmNvdW50ID49IDEwIClcbiAgICB7XG4gICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgIGxldCBvYmplY3QgPSBuZXcgcGMuRW50aXR5KCAnY3ViZScgKTtcbiAgICAgIG9iamVjdC5hZGRDb21wb25lbnQoICdtb2RlbCcsIHtcbiAgICAgICAgXCJ0eXBlXCI6XCJib3hcIlxuICAgICAgfSApO1xuICAgICAgb2JqZWN0LmFkZENvbXBvbmVudCggJ3JpZ2lkYm9keScsIHtcbiAgICAgICAgXCJ0eXBlXCI6XCJkeW5hbWljXCIsXG4gICAgICAgIFwibWFzc1wiOjUwXG4gICAgICB9ICk7XG4gICAgICBvYmplY3QuYWRkQ29tcG9uZW50KCAnY29sbGlzaW9uJywge1xuICAgICAgICBcInR5cGVcIjpcImJveFwiLFxuICAgICAgICBcImhhbGZFeHRlbnRzXCI6bmV3IHBjLlZlYzMoIDAuNSwgMC41LCAwLjUgKVxuICAgICAgfSApO1xuICAgICAgb2JqZWN0LnNldFBvc2l0aW9uKCBNYXRoLnJhbmRvbSggKSAqIDEwIC0gNSwgTWF0aC5yYW5kb20oICkgKiAxMCAtIDUsIE1hdGgucmFuZG9tKCApICogMTAgLSA1ICk7XG4gICAgICB0aGlzLmFwcC5yb290LmFkZENoaWxkKCBvYmplY3QgKTtcbiAgICB9XG4gICAgKi9cbiAgfVxufVxuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKCB7IFwiY2FudmFzXCI6XCJhcHBcIiB9ICk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9