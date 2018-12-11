# Cloudflare Worker Generator

I'm a minimal [Yeoman](http://yeoman.io) generator for creating [Cloudflare Worker](https://developers.cloudflare.com/workers/) using NodeJS packages and TypeScript. I let you quickly setup a project with latest available tools and best practices.

I use:

- _npm_ - as task runner.
- _jest_ - as [testing and coverage framework](https://facebook.github.io/jest/) to write specs in **TypeScript** itself. You can choose to use _mocha_ instead.
- _gulp_ as build tool.
## Usage

Install `generator-cloudflare-worker` globally.

```
npm i -g generator-cloudflare-worker
```

Create a new directory and `cd` into it.

```
mkdir my-worker
cd my-worker
```

Run the generator.

```
yo cloudflare-worker
```

You can choose to use _mocha_ as your test framework using command - `yo cloudflare-worker --mocha`


Generate a new worker class and test file.

```
yo cloudflare-worker:classlib MyWorker [--mocha]
```

Test the worker
```
npm run test
```

Get the test coverage
```
npm run coverage
```

Build the worker
```
npm run build
```

## Publish the worker
Cloudflare provides two set of endpoint to upload the worker into Cloudflare, one for enterprise customers and one for all customers. We can completely configure worker without UI through enterprise endpoint but in cause common endpoint we need UI to map the worker and route. 

The gulp build scripts support for both types of endpoint and you can use it depend on your needs.

### Pre-Requesites:
* You required a clouflare account email and API key(global key).
    * You can get the global api key from your Cloudflare account page.
* You required Cloudfalre zone id and account id. You can get it from overview tab from the Cloudflare portal.
* You need to know your website/domain pricing tier either enterprise or other
* Once you gathered above information, create the following environment variables to hold these information
    * NODE_CF_ZONE_ID
    * NODE_CF_ACCOUNT_ID
    * NODE_CF_PRICING
    * NODE_CF_EMAIL
    * NODE_CF_AUTH_KEY

### Worker Deployment:
* Upload a worker for dev environment
```
npm run publishdev
```
* Upload a worker for production
```
npm run publish
```
_*Note:*_
_Non enterprise customer should manually configure route and mapping to uploaded worker through Cloudflare portal._

## License

MIT
