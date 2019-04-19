'use strict';

function PreFlightCheck ( )
{
  let errors = [];

  if ( !window.Worker )
  { errors.push( `Web Worker` ) }

  if (
    !'pointerLockElement' in document &&
    !'mozPointerLockElement' in document &&
    !'webkitPointerLockElement' in document
  )
  { errors.push( 'Pointer Lock' ); }

  if ( errors.length > 0 )
  { return [ false, errors ]; }
  else
  { return [ true ]; }
}
