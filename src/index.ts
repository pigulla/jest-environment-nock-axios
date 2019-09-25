import nock from 'nock'
import axios, { AxiosAdapter } from 'axios'

// @ts-ignore
import httpAdapter from 'axios/lib/adapters/http'

import NodeEnvironment from 'jest-environment-node'

export default class NockAxiosEnvironment extends NodeEnvironment {
  private axiosAdapter: AxiosAdapter | undefined = undefined

  public async setup (): Promise<void> {
    await super.setup()

    this.axiosAdapter = axios.defaults.adapter
    axios.defaults.adapter = httpAdapter

    nock.disableNetConnect()
  }

  public async teardown (): Promise<void> {
    nock.cleanAll()
    nock.enableNetConnect()

    axios.defaults.adapter = this.axiosAdapter

    await super.teardown()
  }
}
