<template>
  <form role="form" v-on:submit.prevent="onSubmit" v-on:add="urls.push(url)">
    <div class="form-group align-items-end">
      <label for="url">Url</label>
      <input type="url" class="form-control" required id="url" v-model="url.url"
             placeholder="E.g. https://www.google.*"/>
      <small id="urlHelp" class="form-text text-muted mb-3">Wildcard <i>*</i> is accepted</small>
      <label for="title">Title</label>
      <input type="text" class="form-control mb-3" required id="title" v-model="url.title"
             placeholder="E.g. Google"/>
      <label for="description">Description</label>
      <input type="text" class="form-control mb-3" id="description" v-model="url.description"/>
      <b-button type="submit" class="btn btn-primary" variant="primary">Add</b-button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'UrlBuilder',
  props: {
    url: Object
  },
  methods: {
    onSubmit () {
      this.$parent.urls.push({ ...this.url })
      this.$parent.clearNewUrl()
    }
  }
}
</script>
