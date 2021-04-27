function checkDevTools(options) {
  const isFF = ~navigator.userAgent.indexOf("Firefox");
  let toTest = '';
  if (isFF) {
    toTest = /./;
    toTest.toString = function () {
      options.opened();
    }
  } else {
    toTest = new Image();
    toTest.__defineGetter__('id', function () {
      options.opened();
    });
  }
  setInterval(function () {
    options.offed();
    console.log(toTest);
    console.clear && console.clear();
  }, 1000);
}

checkDevTools({
  opened: function () {
    document.getElementById("msg").innerHTML = 'Dev Tools is on';
  },
  offed: function () {
    document.getElementById("msg").innerHTML = 'Dev Tools is off';
  }
});
