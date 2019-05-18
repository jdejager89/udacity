/*
 service_worker.js
 Employs a service worker to cache pages for the Restaurant Reviews App
 Author: Steve Prager
*/

const currentCacheName = 'restaurant-reviews-app-v2';

// Once install phase complete, add all URLs to the cache
self.addEventListener('install', function(event) {
  // console.log('service worker installing');

  const cacheURLs = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive-index.css',
    '/css/responsive-rest.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
  ];

  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      // console.log('cache time');
      return cache.addAll(cacheURLs);
    })
  );
});


// Respond to fetch requests with a page from the cache.
// If there's nothing in the cache, go to the network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Delete old caches upon activation of a new SW if there is a new one specified
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-reviews-app') && cacheName != currentCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
	// console.log('cache deleted');
});
