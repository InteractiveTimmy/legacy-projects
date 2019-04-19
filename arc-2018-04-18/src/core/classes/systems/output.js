'use strict';

class OutputSystem
{
  constructor ( )
  {
    this.uuid = UUID( );
    this.stats = { };
    this.space = new THREE.Scene( );
    this.children = [ ];
  }

  setRenderer ( r ) // @ArcCore.Renderer
  {
    if ( r.constructor.name == 'Renderer' )
    { this.renderer = r; this.stats.ready = true; return this; }
    else
    { throw new Error( `received object type "${r.constructor.name}", expected object type "Renderer"` ); }
  }

  loadEntities ( e ) // @ArcCore.OutputElement
  {
    for ( let i of e )
    {
      this.space.add( i );
    }
  }

  unloadEntities ( e ) // @ArcCore.OutputElement
  {

  }

  start ( )
  { this.stats.running = true; this.step( ); }

  stop ( )
  { this.stats.running = false; }

  step ( )
  {
    if ( this.stats.running && this.stats.ready )
    { window.requestAnimationFrame( ( ) => { this.step( ); } ); }

    this.stats.dt = ( this.stats.hasOwnProperty( 'dtl' ) ? performance.now( ) - this.stats.dtl : 0 );
    this.stats.dtl = performance.now( );

    for ( let i of this.children )
    {
      if ( i.hasOwnProperty( 'physicsElements' ) )
      {
        for ( let e of i.physicsElements )
        { e.getTransform( ); }
      }
    }

    this.renderer.update( this.space );
  }
}

module.exports = OutputSystem;
