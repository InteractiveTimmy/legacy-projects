'use strict';

module.exports = class Counter
{
  constructor ( )
  {
    this.r = 0; // Rate
    this.t = 0; // Tics
    this.p = new Date( ).getSeconds( ); // prev
    this.n = new Date( ).getSeconds( ); // next
    this.s = 1; // skips
    this.d = 0; // drop ratio
    this.count = 0;
  }

  tick ( )
  {
    this.t++;
    this.s++;
    if ( this.s > 6 ) { this.s = 1; }
    this.n = new Date( ).getSeconds( );
    if ( this.n != this.p )
    {
      this.count = 0;
      this.r = this.t;
      this.t = 0;
      this.p = this.n;
      this.s = this.r;
      this.d = Math.floor( this.r / 10 );
      // this.d += 1;
    }
    if ( this.s > ( this.t % this.d ) ) { this.count++; }
  }

  getTPS ( )
  {
    return this.r;
  }

  getShouldSkip ( )
  {
    // console.log( this.s > ( this.t % this.d ));
    return this.s > ( this.t % this.d );
  }

};
