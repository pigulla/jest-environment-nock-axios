// @ts-ignore
const nock = global.nock

afterEach(function () {
  const pendingMocks = nock.pendingMocks()

  if (pendingMocks.length > 0) {
    throw new Error(`There are still ${pendingMocks.length} pending mocks: ${pendingMocks.join()}`)
  }
})
