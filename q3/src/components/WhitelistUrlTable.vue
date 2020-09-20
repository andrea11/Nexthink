<template>
  <b-table id="table-whitelist-urls" hover head-variant="light" v-bind:items=urls v-bind:fields="fields"
           v-bind:tbody-transition-props="transitionProperties" responsive="sm" sort-by="url" primary-key="id">
    <template v-slot:cell(actions)="data">
      <b-button-close v-on:click="edit(data.index)" aria-label="Edit">
        <b-icon-pencil></b-icon-pencil>
      </b-button-close>
      <b-button-close v-on:click="clone(data.index)" class="mx-2" aria-label="Clone">
        <b-icon-files></b-icon-files>
      </b-button-close>
      <b-button-close v-on:click="remove(data.index)" aria-label="Remove">
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
    edit (index) {
      this.$parent.newUrl = this.urls[index]
      this.urls.splice(index, 1)
    },
    clone (index) {
      const newUrl = { ...this.urls[index] }
      newUrl.id = uuid()
      this.urls.splice(index, 0, newUrl)
    },
    remove (index) {
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
