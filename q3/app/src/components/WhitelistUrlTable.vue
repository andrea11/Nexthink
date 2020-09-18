<template>
  <table class="table table-hover">
    <thead class="thead-light">
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Url</th>
      <th scope="col">Description</th>
      <th class="text-right pr-4" scope="col">Actions</th>
    </tr>
    </thead>
    <tbody name="fade" is="transition-group" tag="tbody">
    <tr is="whitelist-url-row"
        v-for="(url, index) in urls"
        v-bind:key=index
        v-bind:url=url
        v-on:remove="urls.splice(index, 1)"
        v-on:clone="urls.splice(index, 0, {...url})"
        v-on:edit="edit(url, index)"
        class="list-url">
    </tr>
    </tbody>
  </table>
</template>
<script>
import WhitelistUrlRow from '@/components/WhitelistUrlRow.vue'

export default {
  name: 'WhitelistUrlTable',
  props: {
    urls: Array
  },
  methods: {
    edit (url, index) {
      this.$parent.newUrl = url
      this.$parent.urls.splice(index, 1)
    }
  },
  components: {
    WhitelistUrlRow
  }
}
</script>
<style>
  table {
    table-layout: fixed;
  }
</style>
