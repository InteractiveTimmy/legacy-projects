'use strict';

let ajax = {};

ajax.get = function ( myURL ) { return new Promise( ( resolve, reject ) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', myURL);
  xhr.onload = () => resolve(xhr.responseText);
  xhr.onerror = () => reject(xhr.statusText);
  xhr.send();
} ); };

module.exports = ajax;
