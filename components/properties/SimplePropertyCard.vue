<template>
    <div
        class="shadow hover:scale-105 transition-all duration-300 ease-in-out"
        v-if="property"
    >
        <div
            :style="{ backgroundImage: `url(${property.image})` }"
            class="w-full h-64 bg-cover"
        ></div>
        <div class="p-2">
            <p class="text-primary font-bold text-2xl">
                {{ property.price }} €
            </p>
            {{ getPropertyText(property)?.name }}
        </div>
    </div>
</template>

<script setup>
import {getPropertyText} from "../../helpers/lang"

const { property } = defineProps({
    property: Object,
});
</script>
../../lang/helpers../../helpers/helpers