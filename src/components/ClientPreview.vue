<template>
  <v-card :to="`/clients/${client.username}`" variant="outlined">
    <v-card-title>{{ client.username }}</v-card-title>
    <v-card-text>
      <LastSeen :client="client" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { type Client } from "@/stores/app";

defineProps<{ client: Client }>();
</script>
