<script setup lang="ts">
definePageMeta({
    layout: "landing",
});
import logo from "../assets/images/country-club.svg";

import { fetchFeaturedProperties } from "../api/fetchProperties";
import SimplePropertyCard from "~/components/properties/SimplePropertyCard.vue";
import searchBar from "~/components/SearchBar.vue";
import { ref, onMounted } from "vue";
import { PhotoService } from '@/services/PhotoService';

const { locale } = useI18n();

const properties = ref([]);

onMounted(async () => {
    properties.value = await fetchFeaturedProperties();
    PhotoService.getImages().then((data) => (images.value = data));
});

//OLD
const dates = ref();
const guests = ref();

function findProperties() {
    console.log("searching");

}

const images = ref();
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);
</script>




<template>
    <section class="h-screen w-full bg-center bg-cover" style="
            background-image: url('https://apartments-country-club-playa-de-pals-con01387-dya-begur.hotelmix.es/data/Photos/OriginalPhoto/11065/1106546/1106546628/Apartments-Country-Club-Playa-De-Pals-Con01387-Dya-Begur-Exterior.JPEG');
        ">
        <!-- hero -->
        <div
            class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-between px-6 pt-4 pb-20">
            <header class="flex items-center justify-between">
                <div class="flex gap-3 items-center">
                    <img :src="logo" alt="Logo" class="h-28 md:h-32" />
                    <h1 class="text-white">
                        <NuxtLink to="/">
                            Country
                            Club Pals
                        </NuxtLink>
                    </h1>
                </div>


                <div class="flex gap-3 items-center">
                    <NuxtLink to="/properties" class="text-white">Discover properties</NuxtLink>
                    <LangSwitcher
                    class="text-white border p-2" />
                </div>
   
            </header>


            <h2 class="text-white md:w-2/5">
                {{
                    $t("index.yourUltimateRetreatOnTheCostaBrava")
                }}
            </h2>

            <div class="w-full flex justify-center">
                <searchBar />
            </div>
        </div>
    </section>
    <section class="container mt-16">
    <div style="display: flex; align-items: center;">
        <div style="flex: 1">
            <img src="/assets/images/IMG_2.png" class="border-none" style=" width: 100%; height: 100%;">
        </div>
        <div style="flex: 1; margin-left: 20px;">
            <h3 style="">Where tranquillity Meets the Horizon on the Costa Brava.</h3>

            <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eff icitur
ullamcorper dictum. Fusce velit justo, auctor in eros a, tincidunt laoreet
felis. Maecenas sit amet condimentum justo. Nullam tincidunt vel felis a
finibus. Vivamus hendrerit, orci vel rutrum laoreet, ipsum orci convallis
risus, nec sodales augue eros ut elit. Ut pellentesque vitae augue sit amet
aliquam. Suspendisse ac commodo mi. Donec ligula ante, pellentesque eget
cursus sit amet, mattis malesuada neque. Nam nec aliquam sapien. Mauris
non justo viverra, ultrices dui dapibus, f inibus odio. Vivamus feugiat sem
dictum erat vulputate aliquam.</p>
        </div>
    </div>
</section>




    <!-- FEATURED APARTMENTS -->
    <section class="container mt-16">
        <h3>Featured Apartments</h3>
        <div v-if="properties.length > 0" class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <SimplePropertyCard v-for="property in properties" :key="property?.id" :property="property" />
        </div>
        <div v-else class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div v-for="i in 4">
                <Skeleton height="350px" class="h-64 w-full"></Skeleton>
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