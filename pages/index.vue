<script setup lang="ts">
definePageMeta({
    layout: "landing",
});
import logo from "../assets/images/country-club.svg";

import { fetchFeaturedProperties } from "../api/fetchProperties";
import SimplePropertyCard from "~/components/properties/SimplePropertyCard.vue";

const { locale } = useI18n();

const properties = ref([]);

onMounted(async () => {
    properties.value = await fetchFeaturedProperties();
});

//OLD
const dates = ref();
const guests = ref();

function findProperties() {
    console.log("searching");
}
</script>

<template>
    <!-- <h1 class="bg-primary">{{ $t("bienvenida.dos") }}</h1> -->

    <!-- hero -->
    <section class="h-screen w-full bg-center bg-cover"
        style="
            background-image: url('https://apartments-country-club-playa-de-pals-con01387-dya-begur.hotelmix.es/data/Photos/OriginalPhoto/11065/1106546/1106546628/Apartments-Country-Club-Playa-De-Pals-Con01387-Dya-Begur-Exterior.JPEG');
        ">
        <div
            class="bg-black bg-opacity-55 h-full w- px-6 pt-4 pb-20 flex flex-col justify-between">
            <header class="flex gap-3 items-center">
                <img :src="logo" alt="Logo" class="h-28 md:h-32" />
                <h1 class="text-white">Country Club Pals</h1>
            </header>

            <h2 class="text-white md:w-2/5">
                {{$t("index.yourUltimateRetreatOnTheCostaBrava")}}
            </h2>

            <div class="w-full flex justify-center">
                <form
                    class="md:w-1/2 form gap-3 bg-gray-50 p-3 rounded-lg mt-6">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-calendar"></i>
                        </InputGroupAddon>
                        <Calendar v-model="dates"
                            selectionMode="range"
                            :manualInput="false"
                            format="dd/mm/yyyy"
                            placeholder="From - To"
                            class="w-full" />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-users"></i>
                        </InputGroupAddon>
                        <InputNumber v-model="guests"
                            placeholder="Guests" />
                    </InputGroup>

                    <Button label="Buscar"
                        @click="findProperties" />
                </form>
            </div>
        </div>
    </section>

    <!-- FEATURED APARTMENTS -->
    <section class="container mt-16">
        <h3>Featured Apartments</h3>
        <div v-if="properties.length > 0"
            class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <SimplePropertyCard
                v-for="property in properties"
                :key="property?.id" :property="property" />
        </div>
        <div v-else
            class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div v-for="i in 4">
                <Skeleton height="350px"
                    class="h-64 w-full"></Skeleton>
            </div>
        </div>
    </section>
</template>

<style scoped>
.form {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
}
</style>
