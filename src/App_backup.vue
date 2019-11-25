<template>
  <div id="app">
    <Client v-bind:client="client" v-for="(client, index) in clients" v-bind:key="index"/>
  </div>
</template>

<script>
import Client from '@/components/Client.vue'
export default {
  name: 'app',
  components: {
    Client
  },
  data(){
    return {
      clients: []
    }
  },
  

  methods: {
    sendCommand(client){
      this.$socket.client.emit("new_command", client)
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}
body {
  margin: 0;
}

</style>
