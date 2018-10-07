/* global caches fetch self */

const cacheName = 'fetchedData';

const urlsToCache = [
  '/'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.url.includes('foursquare') || event.request.url.includes('googleapis')) {
    event.respondWith(returnRequest(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
});

function returnRequest (request) {
  return caches.match(request)
    .then(function (response) {
      if (!response) {
        return caches.open(cacheName)
          .then(function (cache) {
            return fetch(request)
              .then(function (response) {
                return cache.put(request, response)
                  .then(function () {
                    return caches.match(request);
                  });
              });
          });
      } else {
        return response;
      }
    });
}

/*
1. check cache for request
2. if request is not in cache, fetch request, put it in cache
3. return request from cache
*/
