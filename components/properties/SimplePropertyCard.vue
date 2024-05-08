<template>
    <NuxtLink :to="{path: `/properties/${property.id}`, query: search}" class="hover:scale-105 transition-all duration-300 ease-in-out"
        v-if="property">
        <div :style="{ backgroundImage: `url(${BACKEND_URL + property?.Images[0]?.url})` }"
            class="w-full h-64 bg-cover"></div>
        <div class="p-2">
            <p class="text-primary font-bold text-2xl">
                {{ property.price }} €
            </p>
            {{ getPropertyText(property)?.name }}
        </div>
    </NuxtLink>
</template>

<script setup>
import { getPropertyText } from "../../helpers/lang"
import { BACKEND_URL } from "~/CONSTS";

const { property, search } = defineProps({
    property: Object,
    search: Object
});
</script>