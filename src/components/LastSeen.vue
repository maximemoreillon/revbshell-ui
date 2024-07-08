<template>
  <span> Last seen {{ Math.round(timeSinceLastSeen / 1000) }}s ago </span>
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
