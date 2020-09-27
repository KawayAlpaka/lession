const hljs = require("highlight.js/lib/core");  // require only the core library
// separately require languages
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

// const highlightedCode = hljs.highlight('xml', '<span>Hello World!</span>').value;
const highlightedCode = hljs.highlight('javascript', 'var abd = "123"').value;
const highlighted = hljs.highlight('javascript', 'var abd = "123"');

console.log(highlightedCode);
console.log(highlighted);

