'use strict';

class Asset
{
  constructor ( t, p )
  {
    this.type = t;
    this.name = `${t.toUpperCase( )}-${UTILS.uuid( )}`;
    this.data = require( `./${t}.js` )( p );
    console.log( `generated ${t} asset`, this );
  }
}

module.exports = Asset;
