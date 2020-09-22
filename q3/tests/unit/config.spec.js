import { createLocalVue, shallowMount } from '@vue/test-utils'
import Config from '@/components/Config.vue'
import { chromeStorageApi } from '@/api/chrome-storage-api'
import BootstrapVue from 'bootstrap-vue'

jest.mock('@/api/chrome-storage-api')
jest.mock('graphql-request', () => ({
  request: jest.fn(() => Promise.resolve()),
  gql: jest.fn(() => {
  })
}))
jest.useFakeTimers()

describe('Config.vue', () => {
  let wrapper
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    jest.clearAllTimers()
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    wrapper = shallowMount(Config, {
      localVue
    })
  })

  it('should wipe data correctly, resetting chrome storage', async () => {
    await wrapper.vm.wipeData()
    expect(chromeStorageApi.local.set).toHaveBeenCalledTimes(2)
    expect(chromeStorageApi.local.set).nthCalledWith(1, { requests: [] })
    expect(chromeStorageApi.local.set).nthCalledWith(2, { count_requests: 0 })
  })

  it('should retrieve the config from the storage after 300ms', () => {
    chromeStorageApi.local.get.mockImplementation((_, set) => {
      set({ count_requests: 1 })
    })
    expect(wrapper.vm.countRequests).toBe(0)
    jest.runTimersToTime(300)
    expect(chromeStorageApi.local.get).toHaveBeenCalledTimes(1)
    expect(chromeStorageApi.local.get).toHaveBeenCalledWith(['count_requests'], expect.anything())
    expect(wrapper.vm.countRequests).toBe(1)
  })

  it('should retrieve the config from the storage every 300ms', () => {
    jest.runTimersToTime(3000)
    expect(chromeStorageApi.local.get).toHaveBeenCalledTimes(10)
  })

  it('should create an interval and destroy it', () => {
    const setIntervalSpy = jest.spyOn(window, 'setInterval')
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const counter = wrapper.vm.counter
    expect(counter).not.toBeNull()
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.anything(), 300)
    wrapper.vm.$destroy()
    expect(clearIntervalSpy).toHaveBeenCalledWith(counter)
  })
})
