'use strict';

class Utilities
{
  constructor ( )
  {
    this.log = require( './logger.js' )( );
  }
}

module.exports = new Utilities( );
