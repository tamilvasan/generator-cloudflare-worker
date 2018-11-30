import { <%= className %> } from '../src/<%= fileName %>';
import { Request } from 'node-fetch';
import { MockFetch } from '../mock';

test('Should have <%= className %> available', () => {
  expect(<%= className %>).toBeTruthy();
});

describe("Cloudflare <%= className %>", ()=>{
  MockFetch.mock();
  it('Should say hello world', async () => {
    const worker = new <%= className %>();
    const request = new Request("https://www.cloudflare.com");
    const response = await worker.handle(request);
    let data = await response.text();
    expect(data).toContain('Hello, world!');
  });
});