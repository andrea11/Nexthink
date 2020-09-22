import { createLocalVue, shallowMount } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import WhitelistUrlTable from '@/components/WhitelistUrlTable'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'new id')
}))

describe('WhiteListUrlTable.vue', () => {
  let wrapper
  let dummyParent
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    jest.clearAllTimers()
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    localVue.use(BootstrapVueIcons)
    dummyParent = {
      data: function () {
        return { urls: [], newUrl: {} }
      }
    }
    wrapper = shallowMount(WhitelistUrlTable, {
      localVue,
      parentComponent: dummyParent,
      propsData: {
        urls: []
      }
    })
  })

  it('should be correctly initialized', () => {
    expect(wrapper.vm.fields.filter(field => field.key === 'title')[0]).toStrictEqual({ key: 'title', sortable: true })
    expect(wrapper.vm.fields.filter(field => field.key === 'url')[0]).toStrictEqual({ key: 'url', sortable: true })
    expect(wrapper.vm.fields.includes('description')).toBeTruthy()
    expect(wrapper.vm.fields.includes('actions')).toBeTruthy()
    expect(wrapper.vm.transitionProperties.name).toBe('fade')
  })

  it('should remove the element by id', () => {
    wrapper.setProps({
      urls: [
        {
          id: 'id1',
          title: 'firstElement',
          url: 'url1'
        }, {
          id: 'id2',
          title: 'elementToRemove',
          url: 'url2'
        }, {
          id: 'id3',
          title: 'lastElement',
          url: 'url3'
        }]
    })
    wrapper.vm.remove('id2')
    expect(wrapper.vm.urls.length).toBe(2)
    expect(wrapper.vm.urls.includes('elementToRemove')).toBeFalsy()
  })

  it('should clone the element by id', () => {
    wrapper.setProps({
      urls: [
        {
          id: 'id1',
          title: 'firstElement',
          url: 'url1'
        }, {
          id: 'id2',
          title: 'elementToRemove',
          url: 'url2'
        }, {
          id: 'id3',
          title: 'lastElement',
          url: 'url3'
        }]
    })
    wrapper.vm.clone('id2')
    expect(wrapper.vm.urls.length).toBe(4)
    const expectedNewUrl = wrapper.vm.urls.filter(url => url.id === 'new id')[0]
    expect(expectedNewUrl).toBeDefined()
    expect(expectedNewUrl.id).toBe('new id')
    expect(expectedNewUrl.title).toBe('elementToRemove')
    expect(expectedNewUrl.url).toBe('url2')
  })

  it('should edit the element by id', () => {
    wrapper.setProps({
      urls: [
        {
          id: 'id1',
          title: 'firstElement',
          url: 'url1'
        }, {
          id: 'id2',
          title: 'elementToEdit',
          url: 'url2'
        }, {
          id: 'id3',
          title: 'lastElement',
          url: 'url3'
        }]
    })
    wrapper.vm.edit('id2')
    expect(wrapper.vm.urls.length).toBe(2)
    expect(wrapper.vm.urls.includes('elementToEdit')).toBeFalsy()
    expect(wrapper.vm.$parent.newUrl).toStrictEqual({
      id: 'id2',
      title: 'elementToEdit',
      url: 'url2'
    })
  })

  //
  // it('should retrieve the config from the storage after 300ms', () => {
  //   chromeStorageApi.local.get.mockImplementation((_, callback) => {
  //     callback({ count_requests: 1 })
  //   })
  //   expect(wrapper.vm.countRequests).toBe(0)
  //   jest.runTimersToTime(300)
  //   expect(chromeStorageApi.local.get).toHaveBeenCalledTimes(1)
  //   expect(chromeStorageApi.local.get).toHaveBeenCalledWith(['count_requests'], expect.anything())
  //   expect(wrapper.vm.countRequests).toBe(1)
  // })
  //
  // it('should retrieve the config from the storage every 300ms', () => {
  //   jest.runTimersToTime(3000)
  //   expect(chromeStorageApi.local.get).toHaveBeenCalledTimes(10)
  // })
  //
  // it('should create an interval and destroy it', () => {
  //   const setIntervalSpy = jest.spyOn(window, 'setInterval')
  //   const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
  //   const counter = wrapper.vm.counter
  //   expect(counter).not.toBeNull()
  //   expect(setIntervalSpy).toBeCalledWith(expect.anything(), 300)
  //   wrapper.vm.$destroy()
  //   expect(clearIntervalSpy).toBeCalledWith(counter)
  // })
})
