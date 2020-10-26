const URI = require('urijs');

var url = new URI("http://example.org/foo?bar=baz");
url.addQuery("foo", "bar");
console.log(url);
console.log((new URI("wanufawjfeioawmcaw.comjuifwe")).host());
console.log((new URI()).host());
