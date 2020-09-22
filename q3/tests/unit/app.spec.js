import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '@/popup/App'
import { chromeStorageApi } from '@/api/chrome-storage-api'
import BootstrapVue from 'bootstrap-vue'

jest.mock('@/api/chrome-storage-api')
jest.mock('graphql-request', () => ({
  request: jest.fn(() => Promise.resolve()),
  gql: jest.fn(() => {
  })
}))

describe('App.vue', () => {
  let wrapper
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    jest.clearAllTimers()
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    wrapper = shallowMount(App, {
      localVue
    })
  })

  it('should retrieve the list of urls and the state of the form from the storage', () => {
    expect(chromeStorageApi.local.get).toHaveBeenCalledTimes(2)
    expect(chromeStorageApi.local.get).nthCalledWith(1, ['urls'], expect.any(Function))
    expect(chromeStorageApi.local.get).nthCalledWith(2, ['form_url'], expect.any(Function))
  })

  it('should correctly mark whenever display the list of urls', () => {
    expect(wrapper.vm.urls).toStrictEqual([])
    expect(wrapper.vm.visible).toBeFalsy()
    wrapper.vm.urls = [
      {
        url: '',
        title: '',
        description: ''
      }
    ]
    expect(wrapper.vm.visible).toBeTruthy()
  })

  it('should initialize newUrl whenever its method is called', () => {
    expect(wrapper.vm.newUrl).toStrictEqual({
      url: '',
      title: '',
      description: ''
    })
    wrapper.vm.newUrl = {
      url: 'url',
      title: 'title',
      description: 'description'
    }
    wrapper.vm.clearNewUrl()
    expect(wrapper.vm.newUrl).toStrictEqual({
      url: '',
      title: '',
      description: ''
    })
  })

  it('should update the storage when the list of urls is updated', async () => {
    const expectedUrls = [
      {
        id: 'id',
        url: 'url',
        title: 'title',
        description: 'description'
      }
    ]
    wrapper.vm.urls = expectedUrls
    await wrapper.vm.$nextTick()
    expect(chromeStorageApi.local.set).toHaveBeenCalledWith({ urls: expectedUrls })
  })
})
