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

    // TEMP: Floor
    this.entities.push( new Entity( {
      "mesh":
      {
        "geometry":{ "type":"BoxGeometry", "params":[ 10, 1, 10 ] },
        "material":{ "type":"MeshBasicMaterial", "params":{ "color":0x666666 } },
      },
      "oimo":
      {
        "world":this.world,
        "type":"box",
        "size":[ 10, 1, 10 ],
        "pos":[ 0, -2, 0 ]
      }
    } ) );

    console.log( this.world );
    console.log( this.entities );
  }

  update ( )
  {
    if ( this.stats.running == true )
    {
      this.stats.tps.r = 1000 / ( performance.now( ) - this.stats.tps.tl ) || 1000 / 120;
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

  generateRandomEntities ( params )
  {
    if ( !params.count ) { params.count = 10; }
    if ( !params.type ) { params.type = "box"; }
    for ( let x = 0; x < params.count; x++ )
    {
      this.entities.push( new Entity( {
        "mesh":
        {
          "geometry":{ "type":"BoxGeometry", "params":[ 0.1, 0.1, 0.1 ] },
          "material":{ "type":"MeshBasicMaterial", "params":{ "color":0x66aaff } },
        },
        "oimo":
        {
          "world":this.world,
          "type":params.type,
          "size":[ 0.1, 0.1, 0.1 ],
          "pos":[ Math.random( ) * 3 -1.5, Math.random( ) * 3 + 2, Math.random( ) * 3 - 5 ],
          "move":true
        }
      } ) );
    }

  }

  generatePlayer ( m )
  {
    this.players.push( new Player( { "input":m, "world":this.world } ) );
    this.entities.push( this.players[ this.players.length - 1].entity );
    console.log( this.players );
  }

  updateInput ( m )
  { // NOTE: Complete
    for ( let x in m )
    {
      for ( let y in this.players )
      {
        if ( m[x].type )
        {
          if ( this.players[y].input[m[x].code] == m[x].type )
          { this.players[y].actions[m[x].code].active = m[x].active; }
        }
        else
        {
          if ( this.players[y].input[m[x].code] )
          { this.players[y].actions[this.players[y].input[m[x].code].action].active = m[x].active; }
        }
      }
    }
  }

  sendEntities ( )
  {
    let output = [];
    for ( let x in this.entities )
    {
      if ( !this.entities[x].oimo.isStatic )
      {
        output.push( {
          "name":`MESH-${this.entities[x].uuid}`,
          "position":this.entities[x].oimo.getPosition(),
          "quaternion":this.entities[x].oimo.getQuaternion()
        } );
      }
    }

    postMessage( {
      "to":"graphics",
      "from":"engine",
      "command":"updateEntities",
      "data":output
    } );
  }

  processMessage ( m )
  { /* TODO */
    if ( this[m.command] )
    { this[m.command]( m.data ); }
    else
    { console.log( `Command Not Found`, m ); }
  }

}
