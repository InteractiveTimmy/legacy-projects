'use strict';

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

function generateUUID( myType ) {
  return myType.concat('-', ( [1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) ) ).toUpperCase( );
}


/* TODO: Make this a class with promises */
let ObjectLoader = new THREE.ObjectLoader( );
let loadObject = function ( myResource ) { return new Promise( (resolve, reject) => {
  ObjectLoader.load(
    myResource,
    function ( obj )
    { resolve( obj ); console.log( obj ); }
  )
} ); }

let JSONLoader = new THREE.JSONLoader( );
let loadJSON = function ( myResource ) { return new Promise( (resolve, reject) => {
  JSONLoader.load(
    myResource,
    function ( obj )
    { resolve( obj ); console.log( obj ); }
  )
} ); }


let ajax = {};
ajax.x = function ( ) {
    if ( typeof XMLHttpRequest !== 'undefined' ) {
        return new XMLHttpRequest( );
    }
    let versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    let xhr;
    for ( let i = 0; i < versions.length; i++ ) {
        try {
            xhr = new ActiveXObject( versions[i] );
            break;
        } catch ( e ) {
        }
    }
    return xhr;
};

ajax.send = function ( url, callback, method, data, async ) {
    if ( async === undefined ) {
        async = true;
    }
    let x = ajax.x( );
    x.open( method, url, async );
    x.onreadystatechange = function ( ) {
        if ( x.readyState == 4 ) {
            callback( x );
        }
    };
    if ( method == 'POST' ) {
        x.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    }
    x.send( data )
};

ajax.get = function ( url, data, callback, async ) {
    let query = [];
    for ( let key in data ) {
        query.push(encodeURIComponent( key ) + '=' + encodeURIComponent( data[key] ) );
    }
    ajax.send( url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async )
};

ajax.post = function ( url, data, callback, async ) {
    let query = [];
    for ( let key in data ) {
        query.push( encodeURIComponent( key ) + '=' + encodeURIComponent( data[key] ) );
    }
    ajax.send( url, callback, 'POST', query.join('&'), async )
};
