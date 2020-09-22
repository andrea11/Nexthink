<template>
  <b-container fluid="" id="popup" class="my-3">
    <transition name="fade">
      <b-row v-if="visible">
        <b-col>
          <div class="card">
            <div class="card-body table-wrapper-scroll-y container">
              <h5 class="card-title">Whitelisted URLs</h5>
              <p class="card-text">All requests sent to these URLs will not be captured</p>
              <whitelist-url-table v-bind:urls="urls"></whitelist-url-table>
            </div>
          </div>
        </b-col>
      </b-row>
    </transition>
    <b-row class="mt-3">
      <b-col>
        <b-card>
          <b-card-body>
            <b-card-title class="h5">New URL to whitelist</b-card-title>
            <b-card-text>Add an URL to prevent this extension to capture any request sent to this
              url
            </b-card-text>
            <url-builder v-bind:url="newUrl"></url-builder>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-card>
          <b-card-body>
            <config></config>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import UrlBuilder from '@/components/UrlBuilder.vue'
import WhitelistUrlTable from '@/components/WhitelistUrlTable.vue'
import Config from '@/components/Config.vue'
import { chromeStorageApi } from '@/api/chrome-storage-api'

export default {
  name: 'App',
  data: function () {
    return {
      urls: [],
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
    UrlBuilder,
    Config
  },
  watch: {
    urls: {
      handler: function (value) {
        chromeStorageApi.local.set({ urls: value })
      },
      deep: true
    }
  },
  beforeCreate: function () {
    const self = this
    chromeStorageApi.local.get(['urls'], function (result) {
      if (result != null && result.urls != null) {
        self.urls = result.urls
      }
    })
    chromeStorageApi.local.get(['form_url'], function (result) {
      if (result != null && result.form_url != null) {
        self.newUrl = result.form_url
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
  transition: all 500ms;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.fade-move {
  transition: all 500ms;
}

body {
  width: 800px;
}
</style>
