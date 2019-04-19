'use strict';

class Input
{
  constructor ( p )
  {
    this.states = { };
    this.clears = [ ];
    this.stats = {
      "enabled":false
    }

    this.initStates( { "keycodes":p.keycodes } );

    this.keyboard = new pc.Keyboard( window );
    this.keyboard.on( "keydown", this.eventKeyboard, this );
    this.keyboard.on( "keyup", this.eventKeyboard, this );

    this.mouse = new pc.Mouse( p.element );
    this.mouse.on( "mousedown", this.eventMouse, this );
    this.mouse.on( "mouseup", this.eventMouse, this );
    this.mouse.on( "mousemove", this.eventMouse, this );
    this.mouse.on( "mousewheel", this.eventMouse, this );

    this.pads = new pc.GamePads( );
    this.pads.count = 0;
    this.pads.read = [ ];
    this.pads.states = [ ];
  }

  initStates ( p ) // { keycodes:{ } }, inits all states
  {
    // generate keyboard states
    for ( let k = 0; k < 256; k++ )
    {
      this.setNewState( {
        "state":( 'k' + k ),
        "name":( p.keycodes.hasOwnProperty( k ) ? p.keycodes[k].toUpperCase( ) : "" )
      } );
    }

    // generate mouse states
    this.setNewState( { "state":"mmy+", "name":"MOUSE MOVE UP", "clear":true } );
    this.setNewState( { "state":"mmy-", "name":"MOUSE MOVE DOWN", "clear":true } );
    this.setNewState( { "state":"mmx+", "name":"MOUSE MOVE RIGHT", "clear":true } );
    this.setNewState( { "state":"mmx-", "name":"MOUSE MOVE LEFT", "clear":true } );
    this.setNewState( { "state":"mw+", "name":"MOUSE WHEEL UP", "clear":true } );
    this.setNewState( { "state":"mw-", "name":"MOUSE WHEEL DOWN", "clear":true } );
    this.setNewState( { "state":"mb0", "name":"MOUSE BUTTON LEFT" } );
    this.setNewState( { "state":"mb1", "name":"MOUSE BUTTON MIDDLE" } );
    this.setNewState( { "state":"mb2", "name":"MOUSE BUTTON RIGHT" } );

    // generate gamepad states
    for ( let x = 0; x < 4; x++ )
    {
      this.setNewState( { "state":( 'j' + x + 'b0' ), "name":"A" } );
      this.setNewState( { "state":( 'j' + x + 'b1' ), "name":"B" } );
      this.setNewState( { "state":( 'j' + x + 'b2' ), "name":"X" } );
      this.setNewState( { "state":( 'j' + x + 'b3' ), "name":"Y" } );
      this.setNewState( { "state":( 'j' + x + 'b4' ), "name":"LB" } );
      this.setNewState( { "state":( 'j' + x + 'b5' ), "name":"RB" } );
      this.setNewState( { "state":( 'j' + x + 'b6' ), "name":"LS" } );
      this.setNewState( { "state":( 'j' + x + 'b7' ), "name":"RS" } );
      this.setNewState( { "state":( 'j' + x + 'b8' ), "name":"START" } );
      this.setNewState( { "state":( 'j' + x + 'b9' ), "name":"BACK" } );
      this.setNewState( { "state":( 'j' + x + 'b10' ), "name":"MENU" } );
      this.setNewState( { "state":( 'j' + x + 'b11' ), "name":"DPAD UP" } );
      this.setNewState( { "state":( 'j' + x + 'b12' ), "name":"DPAD DOWN" } );
      this.setNewState( { "state":( 'j' + x + 'b13' ), "name":"DPAD LEFT" } );
      this.setNewState( { "state":( 'j' + x + 'b14' ), "name":"DPAD RIGHT" } );
      this.setNewState( { "state":( 'j' + x + 'b15' ), "name":"LT" } );
      this.setNewState( { "state":( 'j' + x + 'b16' ), "name":"RT" } );
      this.setNewState( { "state":( 'j' + x + 'a1y+' ), "name":"LS UP" } );
      this.setNewState( { "state":( 'j' + x + 'a1y-' ), "name":"LS DOWN" } );
      this.setNewState( { "state":( 'j' + x + 'a1x+' ), "name":"LS RIGHT" } );
      this.setNewState( { "state":( 'j' + x + 'a1x-' ), "name":"LS LEFT" } );
      this.setNewState( { "state":( 'j' + x + 'a2y+' ), "name":"RS UP" } );
      this.setNewState( { "state":( 'j' + x + 'a2y-' ), "name":"RS DOWN" } );
      this.setNewState( { "state":( 'j' + x + 'a2x+' ), "name":"RS RIGHT" } );
      this.setNewState( { "state":( 'j' + x + 'a2x-' ), "name":"RS LEFT" } );
    }

    console.log( this.states );
  }

  update ( ) // { dt:# }
  {
    this.setClears( );
    this.stats.enabled = pc.Mouse.isPointerLocked( );
  }

  setClears ( )
  {
    for ( let x in this.clears )
    {
      this.states[this.clears[x]].value = 0;
    }
  }

  setNewState ( p ) // { state:![ "" ], name:"", value:#, clear:bool }, generates a new state
  {
    this.states[p.state] =
    {
      "name":p.name, // Visible name of key / value
      "value":p.value || 0
    };
    if ( p.clear ) // set clear on frame
    { this.clears.push( p.state ); }
  }

  setNewPad ( p ) // { index }
  {
    let templateObject = this.getPadTemplate( );

    for ( let x in templateObject )
    {
      this.setNewState( {
        "state":'p' + p.index + x,
        "name":templateObject[x].name,
        "type":templateObject[x].type
      } );
    }
    console.log( this.states );
  }

  getPadValues ( )
  {
    this.pads.read = this.pads.poll( );
    // console.log( this.pads.read );
    while ( this.pads.read.length > this.pads.count )
    { this.setNewPad( { "index":this.pads.count } ); this.pads.count++; }
    for ( let p in this.pads.read )
    {
      for ( let b in this.pads.read[p].pad.buttons )
      {
        this.states['p' + p + 'b' + b].value = this.pads.read[p].pad.buttons[b].value;
        if ( this.states['p' + p + 'b' + b].value != 0 ) { console.log( 'p' + p + 'b' + b ); }
      }

      this.states['p' + p + 'a0'].value.x = this.pads.read[p].pad.axes[0];
      if ( this.states['p' + p + 'a0'].value.x < 0.2 && this.states['p' + p + 'a0'].value.x > -0.2 )
      { this.states['p' + p + 'a0'].value.x = 0; }
      this.states['p' + p + 'a0'].value.y = this.pads.read[p].pad.axes[1];
      if ( this.states['p' + p + 'a0'].value.y < 0.2 && this.states['p' + p + 'a0'].value.y > -0.2 )
      { this.states['p' + p + 'a0'].value.y = 0; }

      this.states['p' + p + 'a1'].value.x = this.pads.read[p].pad.axes[2];
      this.states['p' + p + 'a1'].value.y = this.pads.read[p].pad.axes[3];

      this.states['p' + p + 'a1'].value.x = this.pads.read[p].pad.axes[2];
      if ( this.states['p' + p + 'a1'].value.x < 0.2 && this.states['p' + p + 'a1'].value.x > -0.2 )
      { this.states['p' + p + 'a1'].value.x = 0; }
      this.states['p' + p + 'a1'].value.y = this.pads.read[p].pad.axes[3];
      if ( this.states['p' + p + 'a1'].value.y < 0.2 && this.states['p' + p + 'a1'].value.y > -0.2 )
      { this.states['p' + p + 'a1'].value.y = 0; }
      // this.states['p' + p + 't0'].value = ( this.pads.read[p].pad.axes[2] + 1 ) / 2;
      // this.states['p' + p + 't1'].value = ( this.pads.read[p].pad.axes[5] + 1 ) / 2;
    }
  }

  eventKeyboard ( e )
  {
    if ( e.event.type == 'keydown' && this.states['k' + e.event.keyCode].value == 0 )
    {
      this.states['k' + e.event.keyCode].value = 1;
      this.states['k' + e.event.keyCode].name = e.event.key.toUpperCase( );
      console.log( 'k' + e.event.keyCode, this.states['k' + e.event.keyCode] );
    }
    else if ( e.event.type == 'keyup' )
    { this.states['k' + e.event.keyCode].value = 0; }
    e.event.preventDefault( );
  }

  eventMouse ( e )
  {
    if ( e.event.type == 'mousemove' )
    {
      if ( e.event.movementX > 0 ) { this.states['mmx+'].value = e.event.movementX / 50; }
      else if ( e.event.movementX < 0 ) { this.states['mmx-'].value = e.event.movementX / 50 * -1; }
      else { this.states['mmx+'].value = 0; this.states['mmx-'].value = 0; }
      if ( e.event.movementY > 0 ) { this.states['mmy+'].value = e.event.movementY / 50; }
      else if ( e.event.movementY < 0 ) { this.states['mmy-'].value = e.event.movementY / 50 * -1; }
      else { this.states['mmy+'].value = 0; this.states['mmy-'].value = 0; }
    }
    else if ( e.event.type == 'mousewheel' )
    {
      if ( e.event.wheelDeltaY  > 0 ) // check for scroll direction
      { this.states['mw+'].value += e.event.wheelDeltaY / 120; }
      else if ( e.event.wheelDeltaY  < 0 )
      { this.states['mw-'].value += e.event.wheelDeltaY / 120 * -1; }
    }
    else if ( e.event.type == 'mousedown' )
    {
      this.mouse.enablePointerLock( ( ) => { this.stats.enabled = true; console.log( this.stats ); } );
      console.log( this.mouse );
      this.states['mb' + e.event.button].value = 1;
    }
    else if ( e.event.type == 'mouseup' )
    { this.states['mb' + e.event.button].value = 0; }
  }
}

module.exports = ( p ) => { return new Input( p ); }
