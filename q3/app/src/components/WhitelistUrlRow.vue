<template>
  <tr>
    <td>
      <p v-bind:title="url.title" v-b-tooltip.position.bottom class="text-truncate">{{ url.title }}</p>
    </td>
    <td>
      <p v-bind:title="url.url" v-b-tooltip.position.bottom class="text-truncate">{{ url.url }}</p>
    </td>
    <td>
      <p v-bind:title="url.description" v-b-tooltip.position.bottom class="text-truncate">{{ url.description }}</p>
    </td>
    <td>
      <button v-on:click="$emit('edit')" type="button" class="close" aria-label="Edit">
        <b-icon-pencil></b-icon-pencil>
      </button>
      <button v-on:click="$emit('clone')" type="button" class="close mx-2" aria-label="Clone">
        <b-icon-files></b-icon-files>
      </button>
      <button v-on:click="$emit('remove')" type="button" class="close" aria-label="Remove">
        <b-icon-trash></b-icon-trash>
      </button>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'WhitelistUrlRow',
  props: { url: Object }
}
</script>
