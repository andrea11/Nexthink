<template>
  <b-table id="table-whitelist-urls" hover head-variant="light" v-bind:items=urls v-bind:fields="fields"
           v-bind:tbody-transition-props="transitionProperties" responsive="sm" sort-by="url" primary-key="id">
    <template v-slot:cell(actions)="data">
      <b-button-close v-bind:id="'button-edit-' + data.index" v-on:click="edit(data.item.id)" aria-label="Edit">
        <b-icon-pencil></b-icon-pencil>
      </b-button-close>
      <b-button-close v-bind:id="'button-clone-' + data.index" v-on:click="clone(data.item.id)" class="mx-2" aria-label="Clone">
        <b-icon-files></b-icon-files>
      </b-button-close>
      <b-button-close v-bind:id="'button-remove-' + data.index" v-on:click="remove(data.item.id)" aria-label="Remove">
        <b-icon-trash></b-icon-trash>
      </b-button-close>
    </template>
  </b-table>
</template>
<script>
import { v4 as uuid } from 'uuid'

export default {
  name: 'WhitelistUrlTable',
  data: function () {
    return {
      fields: [
        { key: 'title', sortable: true },
        { key: 'url', sortable: true },
        'description',
        'actions'
      ],
      transitionProperties: {
        name: 'fade'
      }
    }
  },
  props: {
    urls: Array
  },
  methods: {
    edit (id) {
      const index = this.urls.findIndex(url => url.id === id)
      this.$parent.newUrl = this.urls[index]
      this.urls.splice(index, 1)
    },
    clone (id) {
      const index = this.urls.findIndex(url => url.id === id)
      const newUrl = { ...this.urls[index] }
      newUrl.id = uuid()
      this.urls.splice(index, 0, newUrl)
    },
    remove (id) {
      const index = this.urls.findIndex(url => url.id === id)
      this.urls.splice(index, 1)
    }
  }
}
</script>
<style>
  table#table-whitelist-urls {
    table-layout: fixed;
  }
</style>
