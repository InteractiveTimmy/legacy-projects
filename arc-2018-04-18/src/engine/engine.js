'use strict';

class ArcEngine
{
  constructor ( )
  {
    // private module objects
    this.modules =
    {
      "Output": require( './systems/output.js' ),
      "Input": require( './systems/input.js' )
    };

    // declare systems
    this.systems =
    {
      "output":
    }

    // public objects
    this.View;
    this.Entity;
    this.Chunk;
    this.World;
  }
}

module.exports = ArcEngine;
