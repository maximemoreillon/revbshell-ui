<template>
  <v-card :to="`/clients/${client.username}`" variant="outlined">
    <v-card-title>{{ client.username }}</v-card-title>
    <v-card-text>
      Last seen {{ Math.round(timeSinceLastSeen / 1000) }}s ago
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { type Client } from "@/stores/app";
const props = defineProps<{ client: Client }>();

const curTime = ref(new Date());

setInterval(() => {
  curTime.value = new Date();
});
const timeSinceLastSeen = computed(() => curTime.value - props.client.lastSeen);
</script>
