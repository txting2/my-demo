// the cache name is also the version number
// change the name everytime changes are made
let cacheName = 'wad-day-7-01';
// let caches;
let filesToCache = [
'bird.jpg',
'data.txt',
'gallery.html',
'gallery.json',
'index.html',
'mona-lisa.jpg',
'package-lock.json',
'pikachu.png',
'registerServiceWorker.js',
'script.js',
'starry.jpg',
'manifest.json',
'style.css',
]

/* 
start the service worker, when the user access
the website online. This will add the all the files 
listed in filesToCache to the browser cache.

*/
self.addEventListener('install', function(e){
  console.log("on install")
    console.log(cacheName);
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log("Adding files to cache")
      return cache.addAll(filesToCache)
    })
  )
})

/*
If offline or if the file exists in the cache, then it will fetch the files from cache
*/
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request,{
        cacheName: cacheName
    }).then(function(response){
        console.log(response);
        console.log("Fetching "+e.request.url);
      return response || fetch (e.request)
    })
  )
})

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});