// import Vue from 'vue';
const whitelistUrlRow = Vue.component('whitelist-url-row', {
  template: '\
    <tr>\
      <td v-bind:title="url.title" class="text-truncate" scope="row">{{ url.title }}</td>\
      <td v-bind:title="url.url" class="text-truncate">{{ url.url }}</td>\
      <td v-bind:title="url.description" class="text-truncate">{{ url.description }}</td>\
      <td>\
        <button v-on:click="$emit(\'edit\')"type="button" class="close" aria-label="Edit">\
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
            <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>\
          </svg>\
        </button>\
        <button v-on:click="$emit(\'clone\')"type="button" class="close" aria-label="Clone">\
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-files" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
            <path fill-rule="evenodd" d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>\
            <path d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z"/>\
          </svg>\
        </button>\
        <button v-on:click="$emit(\'remove\')"type="button" class="close" aria-label="Remove">\
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\
          </svg>\
        </button>\
      </td>\
    </tr>\
  ',
  props: ['url']
});

const whitelistUrlTable = Vue.component('whitelist-url-table', {
  template: '\
    <table class="table table-hover">\
      <thead class="thead-light">\
      <tr>\
        <th scope="col">Title</th>\
        <th scope="col">Url</th>\
        <th scope="col">Description</th>\
        <th scope="col">\
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lightning" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
            <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/>\
          </svg>\
        </th>\
      </tr>\
      </thead>\
      <tbody name="fade" is="transition-group" tag="tbody">\
        <tr is="whitelist-url-row"\
            v-for="(url, index) in urls"\
            v-bind:key=index\
            v-bind:url=url\
            v-on:remove="urls.splice(index, 1)"\
            v-on:clone="urls.splice(index, 0, {...url})"\
            v-on:edit="edit(url, index)"\
            class="list-url">\
        </tr>\
      </tbody>\
    </table>',
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
});

const urlBuilder = Vue.component('url-builder', {
  template: '\
    <form role="form" v-on:submit.prevent="onSubmit" v-on:add="urls.push(url)"\>\
      <div class="form-group align-items-end">\
        <label for="url">Url</label>\
        <input type="url" class="form-control" required id="url" v-model="url.url"\
               placeholder="E.g. https://www.google.*"/>\
        <small id="emailHelp" class="form-text text-muted">Wildcard <i>*</i> is accepted</small>\
        <label for="title">Title</label>\
        <input type="text" class="form-control" required id="title" v-model="url.title"\
               placeholder="E.g. Google"/>\
        <small id="emailHelp" class="form-text text-muted"></small>\
        <label for="description">Description</label>\
        <input type="text" class="form-control" id="description" v-model="url.description"/>\
        <small id="emailHelp" class="form-text text-muted"></small>\
        <button type="submit" class="btn btn-primary mt-3">Add</button>\
      </div>\
    </form>',
  props: {
    'url': Object
  },
  methods: {
    onSubmit() {
      this.$parent.urls.push({...this.url});
      this.$parent.clearNewUrl();
    }
  }
});

new Vue({
  el: '#popup',
  data: {
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
  },
  computed: {
    visible: function () {
      return this.urls != null && this.urls.length > 0
    }
  },
  components: {
    'whitelist-url-table': whitelistUrlTable,
    'url-builder': urlBuilder
  },
  watch: {
    urls: {
      handler: function (val) {
        chrome.storage.local.set({'urls': val});
      },
      deep: true
    }
  },
  beforeCreate: function () {
    const self = this;
    chrome.storage.local.get(['urls'], function (result) {
      if (result != null && result.urls != null) {
        self.urls = result.urls;
      }
    });
  },
  methods:
    {
      clearNewUrl() {
        this.newUrl = {
          url: '',
          title: '',
          description: ''
        }
      }
    }
})