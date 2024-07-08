<template></template>

<script lang="ts" setup>
const router = useRouter();

onMounted(() => {
  router.replace("/clients");
});
</script>
