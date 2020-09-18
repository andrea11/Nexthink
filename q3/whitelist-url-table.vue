<template>
  <table class="table table-hover">
    <thead class="thead-light">
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Url</th>
      <th scope="col">Description</th>
      <th scope="col">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lightning" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/>
        </svg>
      </th>
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
  import whitelistUrlRow from './whitelist-url-row';
  export default {
    props: {
      'urls': Array
    },
    methods: {
      edit(url, index) {
        this.$parent.newUrl = url;
        this.$parent.urls.splice(index, 1);
      }
    },
    components: {
      'whitelist-url-row': whitelistUrlRow
    }
  }
</script>