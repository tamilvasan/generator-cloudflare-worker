<% if (isWindows) { %>
/// <reference path='../node_modules/@types/mocha/index.d.ts' />
<% } %>
import { <%= className %> } from '../src/<%= fileName %>';
import * as chai from 'chai';
import { Request } from 'node-fetch';
import { MockFetch } from '../mock';
const expect = chai.expect;

describe("Cloudflare <%= className %>", ()=>{
  MockFetch.mock();
  it('Should have <%= className %> available', () => {
    expect(<%= className %>).to.not.be.undefined;
  });
  it('Should say hello world', async () => {
    const worker = new <%= className %>();
    const request = new Request("https://www.cloudflare.com");
    const response = await worker.handle(request);
    let data = await response.text();
    expect(data).to.have.string('Hello, world!');
  });
});