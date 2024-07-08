<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { socket } from "@/io";
import { type Client, useAppStore } from "@/stores/app";
const appStore = useAppStore();

onMounted(() => {
  socket.on("client", (client) => {
    client.lastSeen = new Date();
    const { username } = client;
    let foundClientIndex = appStore.clients.findIndex(
      (c) => c.username === username
    );
    if (foundClientIndex < 0) appStore.clients.push(client);
    else
      appStore.clients[foundClientIndex] = {
        ...appStore.clients[foundClientIndex],
        ...client,
      };
  });
  socket.on("response", (payload) => {
    const { username, output } = payload;
    const foundClient: Client | undefined = appStore.clients.find(
      (c) => c.username === username
    );
    if (!foundClient) return;
    if (!foundClient.history || foundClient.history.length < 1) return;

    foundClient.history[foundClient.history.length - 1].response = output;
  });
});

onBeforeUnmount(() => {
  socket.off("client");
  socket.off("response");
});
</script>
