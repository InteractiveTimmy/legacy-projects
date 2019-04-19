'use strict';

class Player
{
  constructor ( p )
  {
    /* test area -- begin */
    p =
    {
      "name":"TEST-USER",
      "height":2,
      "radius":0.5
    };
    /* test area -- end */

    this.name = p.name; // unique name

    this.config = p; // initial config p:{ }

    this.specs = // static values for player
    {
      "height":this.config.height,
      "radius":this.config.radius
    };

    this.stats = // dynamic values for player
    {
      "gravity":[ 0, 0, 0 ]
    };

    this.actions = { }; // player actions

    this.states = { }; // states for player

    this.entities = { }; // stores playcanvas engine values

    this.entities.model = new pc.Entity( `${p.name}-MODEL` );
    this.entities.view = new pc.Entity( `${p.name}-VIEW` );

    this.entities.model.addComponent( 'model', {
      "type":"capsule"
    } );
    this.entities.model.addComponent( 'rigidbody', {
      "type":"kinematic",
      "mass":50
    } );
    this.entities.model.addComponent( 'collision', {
      "type":"capsule",
      "height":this.config.height,
      "radius":this.config.radius
    } );

    this.entities.view.addComponent( 'camera', {
      "clearColor":new pc.Color( 0.1, 0.1, 0.1 ),
      "farClip":1000,
      "nearClip":0.1
    } );

    // TEMP: template -- begin
    this.config =
    {
      "move":"analog"
    };
    this.actions =
    {
      "move":null,
      "look":null,
      "up":{ "active":false },
      "down":{ "active":false },
      "refresh":{ "active":false },
      "modify":{ "active":false },
      "menu":{ "active":false },
      "hud":{ "active":false },
      "util-a":{ "active":false },
      "util-b":{ "active":false },
      "util-c":{ "active":false },
      "util-d":{ "active":false },
      "weapon-a":{ "active":false },
      "weapon-b":{ "active":false },
      "weapon-c":{ "active":false },
      "weapon-d":{ "active":false },
      "primary":{ "active":false },
      "secondary":{ "active":false }
    };
    // TEMP: template -- end
    console.log( 'initialized', this );
  }

  enableView ( p ) // enables view for player
  {

  }

  disableView ( p ) // disables view for player
  {
    // be sure to remove all view components here, including minimap, etc
    this.entities.view.removeComponent( `${p.name}-VIEW` );
  }

  addToRoot ( p ) // { "app":{ }, "entity":"" }, adds player to root
  {
    if ( p.hasOwnProperty( 'entity' ) && this.entities.hasOwnProperty( p.entity ) )
    { p.app.root.addChild( this.entities[p.entity] ); }
    else
    {
      for ( let ent in this.entities )
      { p.app.root.addChild( this.entities[ent] ); }
    }
  }

  setInput ( p ) // { assignments:[ { action:code } ], states: { } }
  {
    for ( let x in p.assignments )
    {
      this.actions[p.assignments[x].action] = p.states[p.code];
    }
  }
}

module.exports = ( p ) => { return new Player( p ); }
