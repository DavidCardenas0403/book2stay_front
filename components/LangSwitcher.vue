<template>
    <div v-if="languages" >
        <button @click="toggleDropdown"
            class="flex gap-2 items-center">
            <img :src="`https://flagicons.lipis.dev/flags/1x1/${getSelectedLang()?.flag}.svg`"
                class="h-6 w-6">
            {{
        getSelectedLang()?.name }}

        </button>

        <Menu ref="dropdown"  class="rounded-none" :model="languages"
            :popup="true">
            <template #item="{ item, props }">
                <button @click="locale = item.code"
                    v-if="item.code != locale"
                    class="flex gap-2 items-center mb-2 w-full">
                    <img :src="`https://flagicons.lipis.dev/flags/1x1/${item.flag}.svg`"
                        :alt="item.name" class="h-6 w-6">
                    {{ item.name }}

                </button>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { fetchLanguages } from '~/api/fetchLanguages';
import { useI18n } from '#imports';

const {
    locale
} = useI18n()

const languages = ref()

function getSelectedLang() {
    return languages.value.find(l => l.code == locale.value)
}

const dropdown = ref(false)
function toggleDropdown(event) {
    dropdown.value.toggle(event)
}

onMounted(async () => {
    languages.value = await fetchLanguages()
})

</script>