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
