var Inflector = require('inflected');

console.log(Inflector.pluralize('Category') ); // => 'Categories'
console.log(Inflector.classify('poSt') );
console.log(Inflector.camelize('fooBar') );