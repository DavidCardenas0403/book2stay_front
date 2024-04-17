<template>
    <div v-if="languages">
        <button v-for="lang in languages"
            @click="locale = lang.code"
            class="flex gap-2 items-center"
            :class="locale == lang.code ? 'border-2 border-black' : ''">
            <img :src="`https://flagicons.lipis.dev/flags/1x1/${lang.flag}.svg`"
                :alt="lang.name" class="h-6 w-6">
            {{ lang.name }}

        </button>
    </div>
</template>

<script setup>
import { fetchLanguages } from '~/api/fetchLanguages';
import { useI18n } from '#imports';

const {
    locale
} = useI18n()

const languages = ref()

onMounted(async () => {
    languages.value = await fetchLanguages()
})

</script>