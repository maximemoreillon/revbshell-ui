<template>
  <div class="client_list">
    <Client
      v-for="(client, index) in $store.state.clients"
      v-bind:client="client"
      v-bind:key="index"/>
  </div>
</template>

<script>

import Client from '@/components/Client.vue'


export default {
  name: 'ClientList',
  components: {
    Client,
  }
}
</script>
