// @include ../src/<%=whfileName%>.js
// @exclude
import fetch, { Request, Response } from 'node-fetch';
import { URL } from 'url';
// @endexclude

export class <%= className %> {
  public async handle(request: Request) {
    const url = new URL(request.url);
    console.log('Got request', url.pathname);
    const response = await fetch(request);
    console.log('Got response', request.url, response);
    return response;
  }
}
