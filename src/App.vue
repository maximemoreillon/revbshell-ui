<template>
  <div id="app">
    <RouterView></RouterView>
  </div>
</template>

<script>
// import AppTemplate from "@moreillon/vue_application_template"
// import { RouterView } from "vue-router"
export default {
  name: "app",
  components: {
    // AppTemplate,
  },
  data() {
    return {
      options: {
        title: "Reverse shell UI",
      },
    }
  },
  methods: {
    sendCommand(client) {
      this.$socket.client.emit("new_command", client)
    },
  },
  sockets: {
    connect() {
      console.log("[WS] connected")
    },
    disconnect() {
      console.log("[WS] connected")
    },
    request(payload) {
      this.$store.commit("request", payload)
    },
    response(payload) {
      this.$store.commit("response", payload)
    },
  },
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

<style></style>
