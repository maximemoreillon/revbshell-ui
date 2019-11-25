<template>
  <div id="app">
    <AppTemplate applicationName="Reverse shell dashboard"/>
  </div>
</template>

<script>
import AppTemplate from '@/components/vue_application_template/AppTemplate.vue'
export default {
  name: 'app',
  components: {
    AppTemplate
  },
  methods: {
    sendCommand(client){
      this.$socket.client.emit("new_command", client)
    }
  },
  sockets: {
    connect() {
      console.log("[WS] connected")
    },
    disconnect() {
      console.log("[WS] connected")
    },
    request(payload) {
      this.$store.commit('request', payload)
    },
    response(payload){
      this.$store.commit('response', payload)
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


<style>

</style>
