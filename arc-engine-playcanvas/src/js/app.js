'use strict';

class Game
{
  constructor ( p )
  {
    this.canvas = document.getElementById( p.canvas );

    this.utils = { };
    this.utils.uuid = require( './utils/uuid.js' );

    // TEMP: config -- begin
    this.config = {
      "input":{
        "keycodes":{
          0:"That key has no keycode",
          3:"break",
          8:"backspace / delete",
          9:"tab",
          12:'clear',
          13:"enter",
          16:"shift",
          17:"ctrl",
          18:"alt",
          19:"pause/break",
          20:"caps lock",
          21:"hangul",
          25:"hanja",
          27:"escape",
          28:"conversion",
          29:"non-conversion",
          32:"spacebar",
          33:"page up",
          34:"page down",
          35:"end",
          36:"home",
          37:"left arrow",
          38:"up arrow",
          39:"right arrow",
          40:"down arrow",
          41:"select",
          42:"print",
          43:"execute",
          44:"Print Screen",
          45:"insert",
          46:"delete",
          47:"help",
          48:"0",
          49:"1",
          50:"2",
          51:"3",
          52:"4",
          53:"5",
          54:"6",
          55:"7",
          56:"8",
          57:"9",
          58:":",
          59:"semicolon (firefox), equals",
          60:"<",
          61:"equals (firefox)",
          63:"ß",
          64:"@ (firefox)",
          65:"a",
          66:"b",
          67:"c",
          68:"d",
          69:"e",
          70:"f",
          71:"g",
          72:"h",
          73:"i",
          74:"j",
          75:"k",
          76:"l",
          77:"m",
          78:"n",
          79:"o",
          80:"p",
          81:"q",
          82:"r",
          83:"s",
          84:"t",
          85:"u",
          86:"v",
          87:"w",
          88:"x",
          89:"y",
          90:"z",
          91:"Windows Key / Left ⌘ / Chromebook Search key",
          92:"right window key",
          93:"Windows Menu / Right ⌘",
          95: "sleep",
          96:"numpad 0",
          97:"numpad 1",
          98:"numpad 2",
          99:"numpad 3",
          100:"numpad 4",
          101:"numpad 5",
          102:"numpad 6",
          103:"numpad 7",
          104:"numpad 8",
          105:"numpad 9",
          106:"multiply",
          107:"add",
          108:"numpad period (firefox)",
          109:"subtract",
          110:"decimal point",
          111:"divide",
          112:"f1",
          113:"f2",
          114:"f3",
          115:"f4",
          116:"f5",
          117:"f6",
          118:"f7",
          119:"f8",
          120:"f9",
          121:"f10",
          122:"f11",
          123:"f12",
          124:"f13",
          125:"f14",
          126:"f15",
          127:"f16",
          128:"f17",
          129:"f18",
          130:"f19",
          131:"f20",
          132:"f21",
          133:"f22",
          134:"f23",
          135:"f24",
          144:"num lock",
          145:"scroll lock",
          160:"^",
          161:'!',
          163:"#",
          164:'$',
          165:'ù',
          166:"page backward",
          167:"page forward",
          168:"refresh",
          169:"closing paren (AZERTY)",
          170:'*',
          171:"~ + * key",
          172:"home key",
          173:"minus (firefox), mute/unmute",
          174:"decrease volume level",
          175:"increase volume level",
          176:"next",
          177:"previous",
          178:"stop",
          179:"play/pause",
          180:"e-mail",
          181:"mute/unmute (firefox)",
          182:"decrease volume level (firefox)",
          183:"increase volume level (firefox)",
          186:"semi-colon / ñ",
          187:"equal sign",
          188:"comma",
          189:"dash",
          190:"period",
          191:"forward slash / ç",
          192:"grave accent / ñ / æ / ö",
          193:"?, / or °",
          194:"numpad period (chrome)",
          219:"open bracket",
          220:"back slash",
          221:"close bracket / å",
          222:"single quote / ø / ä",
          223:"`",
          224:"left or right ⌘ key (firefox)",
          225:"altgr",
          226:"< /git >, left back slash",
          230:"GNOME Compose Key",
          231:"ç",
          233:"XF86Forward",
          234:"XF86Back",
          240:"alphanumeric",
          242:"hiragana/katakana",
          243:"half-width/full-width",
          244:"kanji",
          255:"toggle touchpad"
        },
        "keyboard-and-mouse":{
          "look-up":"mmy+",
          "look-down":"mmy-",
          "look-left":"mmx-",
          "look-right":"mmx+",
          "forward":"k87",
          "backwards":"k83",
          "left":"k65",
          "right":"k68",
          "up":"k32",
          "down":"k67",
          "primary":"mb0",
          "secondary":"mb2",
          "refresh":"k82",
          "menu":"k81",
          "hud":"k9",
          "weapon-a":"k49",
          "weapon-b":"k50",
          "weapon-c":"k51",
          "weapon-d":"k52",
          "util-a":"k53",
          "util-b":"k54",
          "util-c":"k55",
          "util-d":"k56"
        }
      }
    };
    // TEMP: config -- end

    // TEMP: status -- begin
    this.stats = {
      "ready":true,
      "active":false
    }
    // TEMP: status -- end

    this.input = require( './classes/input.js' )( {
      "element":this.canvas,
      "keycodes":this.config.input.keycodes
    } );
    // this.loader = require( './classes/loader.js' )( { "directory":"../assets/" } );

    this.app = new pc.Application( this.canvas, { } );
    this.app.start( );

    this.players = [ ];

    // Fill screen
    this.app.setCanvasFillMode( pc.FILLMODE_FILL_WINDOW );
    this.app.setCanvasResolution( pc.RESOLUTION_AUTO );

    // set gravity
    // this.app.systems.rigidbody.setGravity( 0, 0, 0 );

    // Auto resize
    window.addEventListener( 'resize', ( ) => {
      this.app.resizeCanvas( );
    } );

    // Set scene
    this.app.scene.ambientLight = new pc.Color( 0.2, 0.2, 0.2 );

    // Add camera
    this.camera = new pc.Entity( 'player' );
    this.camera.addComponent( 'camera', {
      "clearColor":new pc.Color( 0.1, 0.1, 0.1 ),
      "farClip":1000,
      "nearClip":0.1// , // Any less than this, you receive visual artifacts
      // "rect":new pc.Vec4( 0, 0.5, 1, 0.5 ) // ( locationX, locationY, sizeX, sizeY ) location is bottom left corner, size extends up and right
    } );
    /*
    this.camera.addComponent( 'model', {
      "type":"box"
    } );
    this.camera.addComponent( 'rigidbody', {
      "type":"kinematic",
      "mass":50
    } );
    this.camera.addComponent( 'collision', {
      "type":"box",
      "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
    } );
    */
    this.camera.setPosition( 0, 0, 20 );

    console.log( this.camera.camera );
    // this.camera.camera.rect = new pc.Vec4( 0, 0.25, 0.5, 0.5 );
    this.app.root.addChild( this.camera );

    this.cameraB = new pc.Entity( 'player' );
    this.cameraB.addComponent( 'camera', {
      "clearColor":new pc.Color( 0.1, 0.1, 0.1 ),
      "farClip":1000,
      "nearClip":0.001//,
      // "rect":new pc.Vec4( 0, 0, 1, 0.5 )
    } );
    this.cameraB.addComponent( 'rigidbody', {
      "type":"kinematic",
      "mass":50
    } );
    this.cameraB.addComponent( 'collision', {
      "type":"box",
      "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
    } );
    this.cameraB.addComponent( 'model', {
      "type":"box"
    } );
    this.cameraB.setLocalScale( 1, 1, 1 );
    this.cameraB.setPosition( -20, 0, 20 );
    this.cameraB.rotateLocal( 0, -45, 0 );
    // this.app.root.addChild( this.cameraB );

    // Testing area -- Begin
    this.players.push( require( './classes/player.js' )( {
      "name":`player-${this.utils.uuid( )}`
    } ) );
    // this.players[0].setInput( )
    console.log( this.players );

    /*
    this.assets = [ ];
    this.app.assets.loadFromUrl( './assets/worlds/test.json', "model", ( err, asset ) => {
      game.assets.push( { } );
      game.assets[game.assets.length - 1].resource = asset.resource;
      game.assets[game.assets.length - 1].entity = new pc.Entity( 'world' );
      game.assets[game.assets.length - 1].entity.addComponent( 'model' );
      game.assets[game.assets.length - 1].entity.model.asset = game.assets[game.assets.length - 1].resource;
      game.assets[game.assets.length - 1].entity.setPosition( 0, 0, 0 );
      game.app.root.addChild( game.assets[game.assets.length - 1].entity );
      console.log( asset.resource );
    } );
    console.log( this.assets );
    */

    console.log( this.app.assets );
    this.app.assets.loadFromUrl("./assets/worlds/test.json", "model", function (err, asset) {
      let loadedModel = new pc.Entity( 'loadedmodel' );
      loadedModel.addComponent( 'model', {
        "asset":asset,
        "receiveShadows":true,
        "castShadows":false,
        "castShadowsLightmap":false
      } );
      /*
      loadedModel.addComponent( 'rigidbody', {
        "type":"static",
        "mass":50
      } );
      loadedModel.addComponent( 'collision', {
        "type":"mesh",
        "asset":asset
      } );
      */
      // console.log( 'loaded asset', asset.resources[0] );
      game.app.root.addChild( loadedModel );
    } );

    let object;

    object = new pc.Entity( 'light' );
    object.addComponent( 'light', {
      "castShadows":false,
      "shadowDistance":128, // Should range from 256 and 1024
      "shadowResolution":2048, // Should range from 2048 and 16384, 32768
      "shadowBias":0.5,
      "shadowType":pc.SHADOW_PCF5, //pc.SHADOW_VSM32, //pc.SHADOW_PCF5,
      "vsmBlurSize":1
    } );
    object.setEulerAngles( 45, -45, 0 );
    this.app.root.addChild( object );

    /* // FLOOR
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
      "halfExtents":new pc.Vec3( 10, 0.5, 10 ),
      //"receiveShadows":true
    } );
    object.setPosition( 0, -5, 0 );
    object.setLocalScale( 20, 1, 20 );
    this.app.root.addChild( object );
    */



    this.pObjects = [ ];
    object = new pc.Entity( 'floor' );
    object.addComponent( 'model', {
      "type":"box"
    } );

    let bcount = 0;
    for ( let x = 0; x <= 3; x++ )
    {
      for ( let y = 0; y <= 5; y++ )
      {
        for ( let z = 0; z <= 3; z++ )
        {
          bcount++;
          object = new pc.Entity( 'cube' );
          object.addComponent( 'model', {
            "type":"box",
            "castShadows":true,
            "castShadowsLightmap":true
          } );
          let material = new pc.BasicMaterial( );
          material.color.set( Math.random( ), Math.random( ), Math.random( ) );
          // object.model.material = material;
          /*
          object.addComponent( 'rigidbody', {
            "type":"dynamic",
            "mass":50
          } );
          object.addComponent( 'collision', {
            "type":"box",
            "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
          } );
          */
          object.setPosition( x, y, z );
          this.pObjects.push( object );
          this.app.root.addChild( this.pObjects[this.pObjects.length - 1] );
        }
      }
    }
    console.log( bcount );


    this.testObject = new pc.Entity( 'cap' );
    this.testObject.addComponent( 'model', {
      "type":"capsule"
    } );
    this.testObject.addComponent( 'rigidbody', {
      "type":"dynamic",
      "mass":50
    } );
    this.testObject.addComponent( 'collision', {
      "type":"capsule",
      "height":2,
      "radius":0.5
    } );
    this.testObject.setPosition( 0, 5, 0 );
    this.app.root.addChild( this.testObject );

    console.log( 'app.root.children', this.app.root.children );

    // this.cameraSpecs = [ 0, 0.5, 0.1, 0.5 ];
    // Testing area -- End
    this.colCount = 0;
    this.isColCounting = true;
    this.testObject.collision.on( 'contact', ( e ) => {
      if ( this.isColCounting )
      {
        this.isColCounting = false;
        console.log( this.colCount );
      }
    } );

    // Update handler
    this.app.on( 'update', ( dt ) => { this.step( { "dt":dt } ) } );
  }

  step ( p )
  { // TODO
    // console.log( p.dt );
    // this.input.getPadValues( );

    // this.colCount += 1;
    // this.testObject.rigidbody.applyForce( 0, -9.8 * 2000 * p.dt, 0 ); // Accurate Gravity, not sure why this is accurate to 9.8m/s^2
    /*
    for ( let x in this.pObjects )
    {
      if ( this.pObjects[x].getPosition( ).y < -20 )
      {
        this.pObjects[x].removeComponent( 'rigidbody' );
        this.pObjects[x].removeComponent( 'collision' );

        this.pObjects[x].setPosition( 0, 20, 0 );

        this.pObjects[x].addComponent( 'rigidbody', {
          "type":"dynamic",
          "mass":50
        } );
        this.pObjects[x].addComponent( 'collision', {
          "type":"box",
          "halfExtents":new pc.Vec3( 0.5, 0.5, 0.5 )
        } );
      }
    }
    */
    /*
    if ( this.cameraSpecs[2] < 1.5 )
    {
      this.cameraSpecs[2] += 0.001;
    }
    this.camera.camera.rect = new pc.Vec4( 0, 0.5, this.cameraSpecs[2], 0.5 );
    */

    // this.camera.translateLocal( this.input.states['p0a0'].value.x * 0.5, 0, this.input.states['p0a0'].value.y * 0.5 );
      this.camera.translateLocal( this.input.states['k68'].value - this.input.states['k65'].value, 0, this.input.states['k83'].value - this.input.states['k87'].value );
      this.camera.rotate( 0, ( this.input.states['mmx+'].value - this.input.states['mmx-'].value ) * -4, 0 );
      this.camera.rotateLocal( ( this.input.states['mmy+'].value - this.input.states['mmy-'].value ) * -4, 0, 0 );
      // this.camera.rotateLocal( this.input.states['mm'].value.y * -4, 0, 0 );
      /*
      if ( this.input.pads.count > 0 )
      {
        this.camera.translateLocal( this.input.states['p0a0'].value.x * 0.5, 0, this.input.states['p0a0'].value.y * 0.5 );
        this.camera.rotate( 0, this.input.states['p0a1'].value.x * -1, 0 );
        this.camera.rotateLocal( this.input.states['p0a1'].value.y, 0, 0 );
      }

      if ( this.input.pads.count > 1 )
      {
        this.cameraB.translateLocal( this.input.states['p1a0'].value.x * 0.5, this.input.states['p1b0'].value * 0.5 - this.input.states['p1b1'].value * 0.5 , this.input.states['p1a0'].value.y * 0.5 );
        this.cameraB.rotate( 0, this.input.states['p1a1'].value.x * -1, 0 );
        this.cameraB.rotateLocal( this.input.states['p1a1'].value.y, 0, 0 );
      }
      */
    this.input.update( );
  }
}

let game = new Game( { "canvas":"app" } );
