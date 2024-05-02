<template>
    <Header :isFixed="false"></Header>

    <h3 class="text-center mb-8">{{ $t("general.ourProperties") }}</h3>

    <FilterBar></FilterBar>

    <div v-if="properties.length > 0"
        class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SimplePropertyCard v-for="property in properties"
            :key="property?.id" :property="property" />
    </div>
    <Spinner v-else />
</template>

<script setup>
import { onMounted } from 'vue';
import { fetchProperties } from "../../api/fetchProperties"
import SimplePropertyCard from "../../components/properties/SimplePropertyCard.vue"

const properties = ref([])

onMounted(async () => {
    properties.value = await fetchProperties()
})

</script>