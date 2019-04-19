'use strict';

module.exports = function ( ) { return new Promise( ( resolve, reject ) => {
  let output = '';
  output += '<div style="display:flex; flex-wrap:wrap; align-content:center; width:100%;">\n';
  output += '<h1 style="margin:auto; padding:0px; border:0px;">ARC-Engine</h1>\n';
  output += `</div>\n`;
  output += '<div style="display:flex; flex-wrap:wrap; align-content:center; width:100%;">\n';
  output += '<canvas id="app" style="margin:auto; padding:0px; border:0px;"></canvas>\n';
  output += `</div>\n`;
  output += '<div style="display:flex; flex-wrap:wrap; align-content:center; width:100%;">\n';
  output += '<br /><br />\n';
  output += '<p id="debug"></p>\n';
  output += `</div>`;
  resolve( output );
} ); }
