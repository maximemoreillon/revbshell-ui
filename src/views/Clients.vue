<template>
  <div>
    <h1>Hosts</h1>

    <div class="client_list">
      <RouterLink
        v-for="(client, index) in $store.state.clients"
        :to="{ name: 'client', params: { username: client.username } }"
        v-bind:key="index"
      >
        {{ client.username }}
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientList",
  components: {},
}
</script>
