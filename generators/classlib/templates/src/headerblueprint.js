addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request))
});

async function fetchAndApply(request) {
    let worker = new <%= className %>();
    await worker.handle(request)
};