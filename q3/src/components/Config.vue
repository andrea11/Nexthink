<template>
  <div>
    <p>Requests captured: {{ countRequests }}</p>
    <b-button type="submit" variant="primary" v-on:click="wipeData()">Clear</b-button>
  </div>
</template>
<script>
import { request, gql } from 'graphql-request'
import { graphqlServerEndpoint } from '@/config'

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
    this.counter = setInterval(function () {
      chrome.storage.local.get(['count_requests'], function (result) {
        if (result != null && result.count_requests != null) {
          self.countRequests = result.count_requests
        }
      })
    }, 300)
  },
  unmounted: function () {
    if (this.counter != null) {
      clearTimeout(this.counter)
    }
  },
  methods: {
    wipeData () {
      const mutation = gql`
        mutation delete_requests {
          delete_requests (
            where: { }
          ) {
            affected_rows
          }
        }`
      request(graphqlServerEndpoint, mutation).then(
        function () {
          chrome.storage.local.set({ requests: [] })
          chrome.storage.local.set({ count_requests: 0 })
        }
      )
    }
  }
}
</script>
