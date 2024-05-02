<template>
  <Header :isFixed="false" />
    <main class="container">
      <slot></slot>
    </main>

  <Footer> </Footer>
</template>

<script setup>
import logo from "../assets/images/country-club.svg";
import LangSwitcher from "~/components/LangSwitcher.vue";
</script>