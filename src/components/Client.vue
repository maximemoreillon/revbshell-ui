<template>

  <div
    class="client"
    v-bind:class="{los: time_difference > 10}"
    v-on:click="open_terminal_for_client()">

    <div class="">
      {{client.username}}
    </div>
    <div class="">
      Δt: {{time_difference}}
    </div>

  </div>
</template>

<script>

export default {
  name: 'Client',
  props: {
    client: Object,
  },
  data(){
    return {
      time_difference: 0,
    }
  },
  mounted(){
    // scan for alive on regular interval
    setInterval(() => {
      this.time_difference = Math.round((new Date() - new Date(this.client.last_seen))/1000 + 17)
    }, 1000);
  },


  methods: {
    open_terminal_for_client(){
      this.$router.push({ name: 'terminal', params: { client: this.client } })
    },

  },
}
</script>

<style scoped>

.client {
  margin: 5px;
  padding: 5px;

  border: 1px solid #dddddd;
  border-radius: 5px;

  background-color: white;

  transition: background-color 0.5s;

  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.client:hover{
  background-color: #eeeeee;
}

.client.los {
  background-color: lightpink;
}








</style>
