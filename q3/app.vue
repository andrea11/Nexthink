<script>
  import Vue from 'vue';
  import whitelistUrlTable from './whitelist-url-table'
  import urlBuilder from './url-builder'
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
</script>