//Reference http://www.wheresrhys.co.uk/fetch-mock/
const fetchMock = require('fetch-mock').sandbox();
const nodeFetch = require('node-fetch');
nodeFetch.default = fetchMock;

export class MockFetch {
    public static mock(){
        fetchMock.mock("*",`<!DOCTYPE html>
        <html>
        <title>Hello World</title>
        <head></head>
        <body>Hello, world!</body>
        </html>
        `);
      }
}
