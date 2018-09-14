var VERSION = 'v7';

// 缓存
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        './index.html',
        './static/jquery.min.js',
        // './static/mm1.jpg'
      ]);
    })
  );
});

// 缓存更新
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {
  var p1 = caches.match(event.request);
  event.respondWith(p1.catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    caches.open(VERSION).then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('./static/mm1.jpg');
  }));
  // 就算从caches获取成功，也要更新caches
  p1.then(function(){
    caches.open(VERSION).then(function(cache) {
      fetch(event.request)
        .then(function(response){
          cache.put(event.request, response);
        },function(){});
    });
  });
});