<template>
  <b-form role="form" v-on:submit.prevent="onSubmit">
    <b-form-group id="url-group" label-for="url" label="Url" description="Wildcard * is accepted">
      <b-input type="url" class="form-control" required id="url" v-model="url.url"
               placeholder="E.g. https://www.goo*"/>
    </b-form-group>
    <b-form-group id="title-group" label-for="title" label="Title">
      <b-input type="text" class="mb-3" required id="title" v-model="url.title"
               placeholder="E.g. Google"/>
    </b-form-group>
    <b-form-group id="description-group" label-for="description" label="Description">
      <b-input type="text" class="form-control mb-3" id="description" v-model="url.description"/>
      <b-button type="submit" variant="primary">Add</b-button>
    </b-form-group>
  </b-form>
</template>
<script>
import { v4 as uuid } from 'uuid'
import { chromeStorageApi } from '@/api/chrome-storage-api'

export default {
  name: 'UrlBuilder',
  watch: {
    url: {
      handler: function (value) {
        chromeStorageApi.local.set({ form_url: value })
      },
      deep: true
    }
  },
  props: {
    url: Object
  },
  methods: {
    onSubmit () {
      this.url.id = uuid()
      this.$parent.urls.push({ ...this.url })
      this.$parent.clearNewUrl()
    }
  }
}
</script>
