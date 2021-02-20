import msg from './contents.js';

var div = document.createElement('div');
div.id = 'app';
div.innerHTML = msg;

document.body.appendChild(div);

console.log();