import { createLocalVue, mount } from '@vue/test-utils'
import UrlBuilder from '@/components/UrlBuilder'
import { BootstrapVue } from 'bootstrap-vue'

jest.mock('@/api/chrome-storage-api')
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'id')
}))

describe('UrlBuilder.vue', () => {
  let wrapper
  let dummyParent
  let localVue
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    jest.clearAllTimers()
    localVue = createLocalVue()
    localVue.use(BootstrapVue)
    dummyParent = {
      data: function () {
        return { urls: [] }
      },
      methods: {
        clearNewUrl: jest.fn()
      }
    }
  })

  it('should insert a new valid URL on submit', () => {
    wrapper = mount(UrlBuilder, {
      localVue,
      propsData: {
        url: {}
      },
      parentComponent: dummyParent
    })
    const expectedUrl = { id: 'id', url: 'url', title: 'title', description: 'description' }
    const urlInput = wrapper.find('#url')
    urlInput.element.value = expectedUrl.url
    urlInput.trigger('input')
    const titleInput = wrapper.find('#title')
    titleInput.element.value = expectedUrl.title
    titleInput.trigger('input')
    const descriptionInput = wrapper.find('#description')
    descriptionInput.element.value = expectedUrl.description
    descriptionInput.trigger('input')
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$parent.urls).toEqual([{ ...expectedUrl }])
    expect(dummyParent.methods.clearNewUrl).toHaveBeenCalled()
  })

  it('should validate the URL', () => {
    wrapper = mount(UrlBuilder, {
      localVue,
      propsData: {
        url: {}
      },
      parentComponent: dummyParent
    })
    const urlInput = wrapper.find('#url')
    expect(urlInput.element.checkValidity()).toBeFalsy()
    urlInput.element.value = 'invalid URL'
    expect(urlInput.element.checkValidity()).toBeFalsy()
    urlInput.element.value = 'http://*'
    expect(urlInput.element.checkValidity()).toBeTruthy()

    const titleInput = wrapper.find('#title')
    expect(titleInput.element.checkValidity()).toBeFalsy()
    titleInput.element.value = 'Title'
    expect(titleInput.element.checkValidity()).toBeTruthy()

    const descriptionInput = wrapper.find('#description')
    expect(descriptionInput.element.checkValidity()).toBeTruthy()
  })
})
