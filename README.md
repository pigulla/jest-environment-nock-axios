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

### Tips

It's a good idea to verify test that no mocked requests are pending. One way to do that is to run the
following code after each test (e.g. using Jest's
[`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration#setupFilesAfterEnv-array)) config option:
```javascript
import nock = require('nock');

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
import nock from 'nock';

describe('This test', function () {
    it('will pass', async function () {
        nock('http://test.invalid')
            .get('data.json')
            .reply(200, { name: 'Hairy Potter' });
        
        await result = axios.get('http://test.invalid/data.json');
        expect(result).toEqual({ name: 'Hairy Potter' });
    });

    it('will fail', function () {
        // ...because the host is not mocked
        await axios.get('http://news.ycombinator.com');
    });
    
    it('will fail if the above "setupFilesAfterEnv" hook is configured')
        nock('http://test.invalid')
            .get('no-data.json')
            .reply(200, {});

        // The mocked endpoint is never requested.
    }); 
})
```
