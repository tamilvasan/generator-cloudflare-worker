## A Sample Worker
```js
addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request))
});

async function fetchAndApply(request) {
    let worker = new Worker();
    await worker.handle(request)
};
class Worker {
    async handle(request) {
        const url = new URL(request.url);
        console.log("Got request", url.pathname);
        const response = await fetch(request);
        console.log("Got response", request.url, response);
        return response;
    }
}
```