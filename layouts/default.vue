<template>
  <Header :isFixed="false" />
  <main class="container">
    <slot></slot>
  </main>

  <Footer> </Footer>
</template>

<script setup>
import logo from '../assets/images/book2stay.png'
import LangSwitcher from '~/components/LangSwitcher.vue'
</script>
