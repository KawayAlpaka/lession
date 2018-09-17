// Configures BrowserFS to use the LocalStorage file system.
BrowserFS.configure({
  fs: "LocalStorage"
}, function(e) {
  if (e) {
    // An error happened!
    throw e;
  }
  // Otherwise, BrowserFS is ready-to-use!
});

var fs = require('fs');
fs.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
  fs.readFile('/test.txt', function(err, contents) {
    console.log(contents.toString());
  });
});