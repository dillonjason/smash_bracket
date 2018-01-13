
import { jsdom } from 'jsdom';
import 'babel-polyfill';
import { addPath } from 'app-module-path';

// This module path is also added in webpack config, 
// but we dont compile bundles for unit tests...
addPath(`${process.cwd()}/src/client/js`);

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
