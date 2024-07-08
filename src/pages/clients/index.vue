<template>
  <v-card title="Clients">
    <v-card-text>
      <v-row v-for="client in appStore.clients" :kley="client.username">
        <v-col>
          <ClientPreview :client="client" />
        </v-col>
      </v-row>
      <v-row v-if="!appStore.clients.length">
        <v-col> No client available </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
//
</script>
