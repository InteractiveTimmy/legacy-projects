'use strict';

module.exports = {
  "assets":{
    "entity":require( './classes/entity.js' ),
    "character":require( './classes/character.js' ),
    "player":require( './classes/player.js' )
  },
  "graphics":require( './classes/graphics.js'),
  "input":require( './classes/input.js'),
  "config":require( '../config.json' ),
  "utils":{
    "generateUUID":require( './utils/uuid-generator.js' ),
    "ajax":require( './utils/ajax.js' )
  },
  "external":{
    "three":require( 'three' )
  }
};
