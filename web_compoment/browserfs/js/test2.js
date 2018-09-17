// Note: This is the new fetch API in the browser. You can use XHR too.
fetch('./_test_files/仙剑奇侠传.zip').then(function(response) {
  console.log(response);
  return response.arrayBuffer();
}).then(function(zipData) {
  var Buffer = BrowserFS.BFSRequire('buffer').Buffer;

  BrowserFS.configure({
    fs: "MountableFileSystem",
    options: {
      "/zip": {
        fs: "ZipFS",
        options: {
          // Wrap as Buffer object.
          zipData: Buffer.from(zipData)
        }
      },
      // "/tmp": { fs: "InMemory" },
      // "/home": { fs: "IndexedDB" }
    }
  }, function(e) {
    if (e) {
      // An error occurred.
      throw e;
    }
    // Otherwise, BrowserFS is ready to use!
    var fs = require('fs');
    fs.readFile('/zip/PLAY.BAT', function(err, contents) {
      console.log(contents.toString());
    });
    fs.readFile('/zip/SETUP.DAT', function(err, contents) {
      // console.log(contents);
      console.log(contents.toString());
    });
  });



});