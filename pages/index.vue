<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
const { locale } = useI18n();
</script>

<template>
  <h1 class="bg-primary">{{ $t("bienvenida") }}</h1>
</template>
