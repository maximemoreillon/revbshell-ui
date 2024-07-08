<template>
  <v-card :loading="!client">
    <v-toolbar>
      <v-btn icon="mdi-arrow-left" to="/clients" exact />
      <v-toolbar-title>
        {{
          // @ts-ignore
          route.params.username
        }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <LastSeen :client="client" v-if="client" />
      </v-col>
      <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div
      class="terminal"
      ref="terminal"
      v-if="client"
      @click="terminalInput.focus()"
    >
      <!-- Command history -->
      <div class="command_history">
        <div v-for="(entry, index) in client.history" v-bind:key="index">
          <div class="command">
            <pre>> {{ entry.command }}</pre>
          </div>
          <div class="output" v-if="entry.response">
            <pre>{{ entry.response }}</pre>
          </div>
        </div>
      </div>

      <!-- Command input -->
      <form class="terminal_input_form" @:submit.prevent="sendCommand()">
        <span>></span>
        <input type="text" ref="terminalInput" v-model="command" />
        <input type="submit" style="display: none" />
        <v-progress-circular
          size="15"
          indeterminate
          v-if="waitingForResponse"
        />
      </form>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { socket } from "@/io";
import { type Client } from "@/stores/app";

const route = useRoute();
const appStore = useAppStore();

const command = ref();
const terminal = ref();
const terminalInput = ref();

const client = computed(() =>
  // @ts-ignore
  appStore.clients.find((c: Client) => c.username === route.params.username)
);

const lastHistoryItem = computed(() => client.value?.history?.at(-1));
const waitingForResponse = computed(
  () => lastHistoryItem.value && !lastHistoryItem.value.response
);

watch(
  () => lastHistoryItem.value?.response,
  () => {
    setTimeout(() => {
      terminal.value.scrollTo({
        top: terminal.value.scrollHeight,
        left: 0,
      });
    }, 10);
  }
);

function sendCommand() {
  if (waitingForResponse.value) return;

  const client = appStore.clients.find(
    // @ts-ignore
    (c: Client) => c.username === route.params.username
  );
  if (!client) return;
  if (!client.history) client.history = [];

  client.history.push({
    command: command.value,
  });

  socket.emit("command", {
    username: client.username,
    command: command.value,
  });

  command.value = "";
}

function handle_keydown(e: KeyboardEvent) {
  if (e.keyCode === 38) {
    e.preventDefault();
    command.value = client.value?.history?.at(-1)?.command;
  }
}

onMounted(() => {
  document.addEventListener("keydown", handle_keydown);
});

onBeforeMount(() => {
  document.removeEventListener("keydown", handle_keydown);
});
</script>

<style scoped>
.terminal {
  height: 60vh;
  padding: 1em;
  /* display: flex;
  flex-direction: column;
  gap: 1em; */

  overflow-y: auto;

  background-color: #222222;
  color: white;
  font-family: monospace;
}
.terminal_input_form {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.terminal_input_form input[type="text"] {
  flex-grow: 1;
  /* background-color: #222222;
  color: white; */
  border: none;
  outline: none;
  font-family: monospace;
}
</style>
