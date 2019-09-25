import axios from 'axios'

describe('This test', function () {
  // @ts-ignore
  const nock = global.nock // See the 'Gotcha' section above

  it('will pass', async function () {
    nock('http://test.invalid')
      .get('/data.json')
      .reply(200, { name: 'Hairy Potter' })

    const result = await axios.get('http://test.invalid/data.json')
    expect(result.data).toEqual({ name: 'Hairy Potter' })
  })

  it('will fail', async function () {
    // ...because the host is not mocked
    await axios.get('http://news.ycombinator.com')
  })

  it('will fail if the above "setupFilesAfterEnv" hook is configured', async function () {
    await nock('http://test.invalid')
      .get('/no-data.json')
      .reply(200, {})

    // The mocked endpoint is never requested.
  })
})
