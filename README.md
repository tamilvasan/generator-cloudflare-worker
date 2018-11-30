# Cloudflare Worker Generator

I'm a minimal [Yeoman](http://yeoman.io) generator for creating [Cloudflare Worker](https://developers.cloudflare.com/workers/) using NodeJS packages and TypeScript. I let you quickly setup a project with latest available tools and best practices.

I use:

- _npm_ - as task runner.
- _jest_ - as [testing and coverage framework](https://facebook.github.io/jest/) to write specs in **TypeScript** itself. You can choose to use _mocha_ instead.
s asked and then quiety get out of the way!

## Usage

Install `generator-cloudflare-worker` globally.

```sh
$npm i -g generator-cloudflare-worker
```

Create a new directory and `cd` into it.

```sh
$mkdir my-worker && cd $_

```

Run the generator.

```sh
$yo cloudflare-worker
```

You can choose to use _mocha_ as your test framework using command - `$yo cloudflare-worker --mocha`


Generate a new worker class and test file.

```sh
$yo cloudflare-worker:classlib MyWorker [--mocha]
```

Test the worker
```sh
$npm run test
```

Get the test coverage
```sh
$npm run coverage
```

Build the worker
```sh
$npm run build
```



## License

MIT
