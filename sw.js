const C='grr-v14';
const A=['./','./index.html','./jszip.min.js','./pdf-lib.min.js','./pdf.min.js','./pdf.worker.min.js','./fontkit.umd.min.js','./LiberationSansNarrow-Regular.ttf','./LiberationSansNarrow-Bold.ttf','./LiberationSans-Regular.ttf','./LiberationSans-Bold.ttf','./icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  const isDoc = e.request.mode==='navigate' || u.pathname.endsWith('/index.html');
  if(isDoc){
    e.respondWith(fetch(e.request).then(n=>{const cl=n.clone();caches.open(C).then(c=>c.put(e.request,cl));return n;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cl=n.clone();caches.open(C).then(c=>c.put(e.request,cl));return n;})));
  }
});
