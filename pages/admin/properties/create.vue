<template>
    <h1 class="text-center">Añadir propiedad</h1>

    <form
        class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 w-full border border-gray-800 dark:border-white">
        <div>
            <label for="name">Name</label>
            <InputText type="text" id="name"
                v-model="data.name" class="w-full" />
        </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue';

definePageMeta({
    layout: "admin",
});


const data = reactive({
    name: ""
})
</script>