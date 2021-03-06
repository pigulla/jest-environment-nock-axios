# jest-environment-nock-axios

> Mock all network requests in tests using [nock](https://github.com/nock/nock).

### Purpose

This environment ensures that no unmocked network requests are made (by calling nock's [disableNetConnect](https://github.com/nock/nock#disabling-requests)). 
It also takes care of some additional setup required to [support axios](https://github.com/nock/nock#disabling-requests). 
 
### Installation

Install as usual with `npm install -D jest-environment-nock-axios` (or the `yarn` equivalent). Both
[nock](https://github.com/nock/nock) and [axios](https://github.com/axios/axios) are required as peer dependencies.

To run a test in this environment set the [testEnvironment](https://jestjs.io/docs/en/configuration#testenvironment-string)
option.

### Gotchas

Jest by design [doesn't implement the require cache](https://github.com/facebook/jest/issues/5120#issuecomment-352547897). This means that the nock module configured by the environment is different from the module your tests get. To solve this that instance is injected into the global scope (see the example below).

### Tips

It's a good idea to verify test that no mocked requests are pending. One way to do that is to run the
following code after each test (e.g. using Jest's
[`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration#setupFilesAfterEnv-array)) config option:
```javascript
const nock = global.nock; // See the 'Gotcha' section above

afterEach(function () {
    const pendingMocks = nock.pendingMocks();

    if (pendingMocks.length > 0) {
        throw new Error(`There are still ${pendingMocks.length} pending mocks: ${pendingMocks.join()}`);
    }
});
```

### Example
```typescript
/**
 * @jest-environment nock-axios
 */
import axios from 'axios';

describe('This test', function () {
    const nock = global.nock; // See the 'Gotcha' section above

    it('will pass', async function () {
        nock('http://test.invalid')
            .get('/data.json')
            .reply(200, { name: 'Hairy Potter' });
        
        const result = await axios.get('http://test.invalid/data.json');
        expect(result.data).toEqual({ name: 'Hairy Potter' });
    });

    it('will fail', async function () {
        // ...because the host is not mocked
        await axios.get('http://news.ycombinator.com');
    });
    
    it('will fail if the above "setupFilesAfterEnv" hook is configured', async function () {
        await nock('http://test.invalid')
            .get('/no-data.json')
            .reply(200, {});

        // The mocked endpoint is never requested.
    }); 
})
```
