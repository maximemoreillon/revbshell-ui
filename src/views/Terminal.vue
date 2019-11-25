<template>
  <div class="terminal_view">

    <div
      class="target_info"
      v-on:click="open_terminal_for_client()"
      >

      <div class=""><span class="mdi mdi-target"/> {{client.username}}</div>
      <div class=""><span class="mdi mdi-timer"/> {{time_difference}}</div>

    </div>

    <div class="terminal" ref="terminal" v-on:click="focus_input()">
      <div class="" v-for="(entry, index) in client.history" v-bind:key="index">
        <div class="command"><pre>> {{entry.command}}</pre></div>
        <div class="output"><pre>{{entry.response}}</pre></div>
      </div>
    </div>

    <form class="input" v-on:submit.prevent="sendCommand(client)">
      <span>></span>
      <input type="text" ref="command_input" v-model="new_command">
      <!-- submit is invisible -->
      <input type="submit" value="send">
    </form>

  </div>
</template>

<script>

export default {
  name: 'SingleClient',
  components: {

  },
  props: {
    client: Object,
  },
  data(){
    return{
      time_difference: 0,
      new_command: "",
    }
  },
  mounted(){
    // scan for alive on regular interval
    setInterval(() => {
      this.time_difference = Math.round((new Date() - new Date(this.client.last_seen))/1000 + 17)
    }, 1000);
  },
  methods: {
    sendCommand(){

      // add command to history
      this.client.history.push({command: this.new_command, response: "waiting..."})

      // send command to server
      this.$socket.client.emit("new_command", {
        username: this.client.username,
        command: this.new_command
      })

      // scrollto bottom
      setTimeout(() => {
        this.$refs.terminal.scrollTo({
          top: this.$refs.terminal.scrollHeight,
          left: 0,
        });
      },100)

      // clear command input
      this.new_command = "";
    },
    focus_input(){
      this.$refs.command_input.focus();
    }
  }
}
</script>


<style scoped>

.terminal_view {

}

.terminal_view > * {
  padding: 5px;

}

.target_info {

  background-color: #c00000;
  color: white;

  display: flex;
  justify-content: space-between;
}

.input {
  display: flex;
  background-color: #222222;
  color: white;
}

.input > * {
  padding: 5px;
}
.input input[type="text"] {
  flex-grow: 1;
  background-color: #222222;
  color: white;
  border: none;
  outline: none;
}

.input input[type="submit"] {
  /* hide submit button */
  display: none;
}

.terminal {
  background-color: #222222;
  color: white;
  max-height: 60vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}




</style>
