const URI = require('urijs');

var url = new URI("http://example.org/foo?bar=baz&key-key=value");
url.addQuery("foo", "bar");
console.log(url.query());
console.log(url.query(true));
console.log(url.search(true));
// console.log(url);
console.log((new URI("wanufawjfeioawmcaw.comjuifwe")).host());
console.log((new URI()).host());
