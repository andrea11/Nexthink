<template>
  <div id="popup" class="container-fluid my-3">
    <transition name="fade">
      <div v-if="visible" class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body table-wrapper-scroll-y container">
              <h5 class="card-title">Whitelisted URLs</h5>
              <whitelist-url-table v-bind:urls="urls"></whitelist-url-table>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="row mt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">New URL</h5>
            <url-builder v-bind:url="newUrl"></url-builder>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UrlBuilder from '@/components/UrlBuilder.vue'
import WhitelistUrlTable from '@/components/WhitelistUrlTable.vue'

export default {
  name: 'App',
  data: function () {
    return {
      urls: [
        {
          url: 'http://Foo',
          title: 'Foo',
          description: ''
        },
        {
          url: 'http://Bar',
          title: 'Bar',
          description: ''
        }],
      newUrl: {
        url: '',
        title: '',
        description: ''
      }
    }
  },
  computed: {
    visible: function () {
      return this.urls != null && this.urls.length > 0
    }
  },
  components: {
    WhitelistUrlTable,
    UrlBuilder
  },
  watch: {
    urls: {
      handler: function (val) {
        chrome.storage.local.set({ urls: val })
      },
      deep: true
    }
  },
  beforeCreate: function () {
    const self = this
    chrome.storage.local.get(['urls'], function (result) {
      if (result != null && result.urls != null) {
        self.urls = result.urls
      }
    })
  },
  methods:
      {
        clearNewUrl () {
          this.newUrl = {
            url: '',
            title: '',
            description: ''
          }
        }
      }
}
</script>
<style>
  .table-wrapper-scroll-y {
    display: block;
    position: relative;
    height: 300px;
    overflow: auto;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 300ms;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }

  body {
    width: 800px;
  }
</style>
