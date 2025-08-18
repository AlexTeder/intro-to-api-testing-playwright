import { test as base } from '@playwright/test'
import { ApiHelper } from '../../helpers/api.helpers'

type TestFixtures = {
  api: ApiHelper
}

export const test = base.extend<TestFixtures>({
  api: async ({ request, baseURL }, use) => {
    const api = new ApiHelper(request, baseURL!)
    await use(api)
  },
})

export { expect } from '@playwright/test'
