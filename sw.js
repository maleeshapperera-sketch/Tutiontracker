const CACHE='tt-v1';
const SHELL=['./index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>{if(r)return r;return fetch(e.request).then(res=>{if(!res||res.status!==200||res.type==='opaque')return res;const clone=res.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return res;}).catch(()=>r);}).catch(()=>fetch(e.request)));});
