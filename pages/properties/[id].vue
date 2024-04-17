<template>
    <header class="flex gap-3 items-center border-b border-b-primary mb-10">
        <img :src="logo" alt="Logo" class="h-28 md:h-32" />
        <h1 class="text-black">Country Club Pals</h1>
    </header>
    <div v-if="property" class="container">
        <section class="grid grid-cols-2 gap-4">
            <img :src="property.image"
                class="h-full w-full">
            <div class="grid grid-cols-2 gap-4">
                <img v-for="i in 4" :src="property.image"
                    alt="">
            </div>
        </section>
        <section class="grid grid-cols-2 gap-12 mt-8">
            <section class="flex flex-col gap-8">
                <h3>{{ getPropertyText(property)?.name }}
                </h3>
                <p class="text-primary text-4xl">{{
            property.price }}€ <span
                        class="text-gray-500 text-xl">/night</span>
                </p>
                <div>
                    {{
            getPropertyText(property)?.description
                    }}
                </div>
            </section>

            <div class="bg-blue-300">

            </div>
        </section>

    </div>


</template>

<script setup>
import { onMounted } from "vue";
import { fetchProperty } from "../../api/fetchProperties"
import { getPropertyText } from "../../helpers/lang"

import logo from "../assets/images/country-club.svg";

const property = ref(null)

onMounted(async () => {
    property.value = await fetchProperty(useRoute().params?.id[0]);
});
</script>