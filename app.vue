<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/ca'
import 'dayjs/locale/fr'
import 'dayjs/locale/nl'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('primevue/resources/themes/aura-light-green/theme.css');
</style>
