'use strict';

self.status = 'initializing';
self.name = 'worker-loader';

onmessage = function ( m )
{ console.log( m ); }
