<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
import logo from "../assets/images/country-club.svg";
const { locale } = useI18n();
</script>

<template>
  <!-- <h1 class="bg-primary">{{ $t("bienvenida.dos") }}</h1> -->
  <h1 class="">Country Club Pals</h1>
  <img :src="logo" alt="" />
</template>
