<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { socket } from "@/io";
import { useAppStore } from "@/stores/app";
import { type Client } from "@/stores/app";
const appStore = useAppStore();

onMounted(() => {
  socket.on("client", (client) => {
    const { username } = client;
    let foundClient = appStore.clients.find((c) => c.username === username);
    if (!foundClient) appStore.clients.push(client);
    else foundClient = client;
  });
  socket.on("response", (payload) => {
    const { username, response } = payload;
    const foundClient: Client | undefined = appStore.clients.find(
      (c) => c.username === username
    );
    if (!foundClient) return;
    if (!foundClient.history || foundClient.history.length < 1) return;

    foundClient.history[foundClient.history.length - 1].response = response;
  });
});

onBeforeUnmount(() => {
  socket.off("client");
  socket.off("response");
});
</script>
