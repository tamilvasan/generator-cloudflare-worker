addEventListener('fetch', event => {
    let worker = new <%= className %>();
    event.respondWith(worker.handle(event.request));
});