<template>
  <div>
    <p>Requests captured: {{ countRequests }}</p>
    <b-button type="submit" variant="primary" v-on:click="wipeData()">Clear</b-button>
  </div>
</template>
<script>
import { request, gql } from 'graphql-request'
import { graphqlServerEndpoint } from '@/config'
import { chromeStorageApi } from '@/api/chrome-storage-api'

export default {
  name: 'Config',
  data: function () {
    return {
      countRequests: 0,
      counter: null
    }
  },
  mounted: function () {
    const self = this
    this.counter = window.setInterval(function () {
      chromeStorageApi.local.get(['count_requests'], function (result) {
        if (result != null && result.count_requests != null) {
          self.countRequests = result.count_requests
        }
      })
    }, 300)
  },
  beforeDestroy: function () {
    if (this.counter != null) {
      window.clearInterval(this.counter)
    }
  },
  methods: {
    async wipeData () {
      const mutation = gql`
        mutation delete_requests {
          delete_requests (
            where: { }
          ) {
            affected_rows
          }
        }`
      await request(graphqlServerEndpoint, mutation)
      chromeStorageApi.local.set({ requests: [] })
      chromeStorageApi.local.set({ count_requests: 0 })
    }
  }
}
</script>
