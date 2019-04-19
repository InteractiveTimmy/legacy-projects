'use strict';

class Engine
{
  constructor ( params )
  { /* TODO */

    this.uuid = generateUUID( );

    this.stats = {
      "running":true, // TEMP
      "tps":{ "t":120 }, // target [t], current [c], timelast [tl], timenow [tn], delta [d], elapsed [e], pause [p], rate [r]
    };

    this.world = new OIMO.World( {
      timestep:1 / this.stats.tps.t,
      worldscale:1,
      info:false
    } );

    this.input = {};
    this.entities = [];
    this.graphics = [];
    this.players = [];

    console.log( this.world );
    console.log( this.entities );

    // postMessage( [ 'graphics', [ 'updateCamera', this.camera ] ] );
  }

  update ( )
  {
    if ( this.stats.running == true )
    {
      this.stats.tps.r = 1000 / ( performance.now( ) - this.stats.tps.tl );
      this.world.timeStep = 1 / this.stats.tps.r;

      this.stats.tps.tl = performance.now( );
      this.world.step( );
      this.stats.tps.tn = performance.now( );

      this.stats.tps.e = this.stats.tps.tn - this.stats.tps.tl
      this.stats.tps.c = 1000 / this.stats.tps.e;
      this.stats.tps.d = 1000 / ( this.stats.tps.t - this.stats.tps.e );

      for ( let x in this.players )
      {
        this.players[x].update( { "tps":this.stats.tps.r } );
      }


    }
  }

  initInput ( myInput )
  {
    this.input.name = myInput;
  }

  initGraphics ( myGraphics )
  {
    this.graphics.push( myGraphics );

    this.entities.push( new Entity( {
      "mesh":
      {
        "graphics":this.graphics[0],
        "geometry":{ "type":"box", "dimensions":[ 10, 1, 10 ] },
        "material":{ "type":"basic", "params":{ "color":0x666666 } },
      },
      "oimo":
      {
        "world":this.world,
        "type":"box",
        "size":[ 10, 1, 10 ],
        "pos":[ 0, -2, 0 ]
      }
    } ) );

    for ( let x = 0; x < 1; x++ )
    {
      this.entities.push( new Entity( {
        "mesh":
        {
          "graphics":this.graphics[0],
          "geometry":{ "type":"box", "dimensions":[ 0.1, 0.1, 0.1 ] },
          "material":{ "type":"basic", "params":{ "color":0x66aaff } },
        },
        "oimo":
        {
          "world":this.world,
          "type":"box",
          "size":[ 0.1, 0.1, 0.1 ],
          "pos":[ Math.random( ) * 3 -1.5, Math.random( ) * 3 + 2, Math.random( ) * 3 - 5 ],
          "move":true
        }
      } ) );
    }
  }

  generatePlayer ( myPlayer )
  {
    this.players.push( new Player( { "player":myPlayer, "input":this.input.name, "graphics":myPlayer.graphics } ) );
    console.log( this.players );
  }

  updateInput ( myMessage )
  {
    if ( myMessage.action == 'look' )
    {
      this.getPlayerByName( myMessage.player ).actions.look.active.x += myMessage.active.x;
      this.getPlayerByName( myMessage.player ).actions.look.active.y += myMessage.active.y;
    }
    else if ( myMessage.action == 'move' )
    {
      this.getPlayerByName( myMessage.player ).actions.move.active.x += myMessage.active.x;
      this.getPlayerByName( myMessage.player ).actions.move.active.y += myMessage.active.y;
    }
    else
    {
      this.getPlayerByName( myMessage.player ).actions[myMessage.action].active = myMessage.active;
    }
  }

  getPlayerByName ( myName )
  {
    for ( let x in this.players )
    {
      if ( this.players[x].name == myName ) { return this.players[x]; }
    }
  }

  getEntities ( )
  {
    let output = [];
    for ( let x in this.entities )
    {
      output.push( {
        "mesh":`MESH-${this.entities[x].uuid}`,
        "position":this.entities[x].oimo.getPosition(),
        "quaternion":this.entities[x].oimo.getQuaternion()
      } );
    }
    return output;
  }

  processMessage ( myMessage )
  { /* TODO */
    switch ( myMessage.command )
    {
      case 'initGraphics':
        this.initGraphics( myMessage.from );
        break;

      case 'initInput':
        this.initInput( myMessage.from );
        break;

      case 'run':
        // this.stats.running = false;
        break;

      case 'getEntities':
        postMessage( { "to":myMessage.from, "from":"engine", "command":"updateMeshes", "message":this.getEntities( ) } );
        break;

      case 'updateInput':
        this.updateInput( myMessage.message );
        break;

      case 'generatePlayer':
        this.generatePlayer( myMessage.message );
        break;

      default:
        console.log( `Command Not Found`, myMessage );
        break;
    }
  }

}
