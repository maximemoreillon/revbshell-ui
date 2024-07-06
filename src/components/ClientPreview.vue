<template>
  <v-card
    :to="`/clients/${client.username}`"
    :title="client.username"
    variant="outlined"
  >
  </v-card>
</template>

<script lang="ts" setup>
import { type Client } from "@/stores/app";
defineProps<{ client: Client }>();
</script>
