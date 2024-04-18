<template>
    <header class="border-b border-b-primary mb-10">
        <div
            class="container flex justify-between items-center">
            <div class="flex gap-3 items-center">
                <img :src="logo" alt="Logo"
                    class="h-28 md:h-32" />
                <h1 class="text-black">
                    <NuxtLink to="/">
                        Country
                        Club Pals
                    </NuxtLink>
                </h1>

            </div>

            <LangSwitcher />
        </div>

    </header>

    <main class="container">
        <slot></slot>
    </main>
    <Footer> </Footer>
</template>

<script setup>
import logo from "../assets/images/country-club.svg";
import LangSwitcher from "~/components/LangSwitcher.vue";
</script>