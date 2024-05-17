<template>
  <div>
    <!-- header copmponent -->
    <Header :isFixed="true" />

    <section
      class="h-screen w-full bg-center bg-cover"
      style="
        background-image: url('https://apartments-country-club-playa-de-pals-con01387-dya-begur.hotelmix.es/data/Photos/OriginalPhoto/11065/1106546/1106546628/Apartments-Country-Club-Playa-De-Pals-Con01387-Dya-Begur-Exterior.JPEG');
      "
    >
      <div
        class="bg-black py-28 bg-opacity-60 h-full w-full flex flex-col justify-between items-center"
      >
        <div></div>
        <h2 class="text-white md:w-1/2 self-start ml-10 md:ml-20">
          {{ $t('index.h2') }}
        </h2>
        <div class="flex justify-center">
          <searchBar @search="handleSearch" />
        </div>
      </div>
    </section>

    <section class="container mt-10 flex flex-col lg:flex-row">
      <div class="lg:w-1/2">
        <img
          src="/assets/images/IMG_2.png"
          class="border-none w-full h-full"
          alt="Costa Brava"
        />
      </div>
      <div class="lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
        <!-- <h3 class="text-lg font-bold mb-4">Where tranquillity Meets the Horizon on the Costa Brava.</h3> -->
        <h3 class="text-lg font-bold mb-4">{{ $t('index.tranquillity') }}</h3>
        <p class="text-gray-700">
          {{ $t('index.def') }}
        </p>
      </div>
    </section>
    <section class="container mt-16">
      <h3 class="text-center mb-10">{{ $t('index.relax') }}</h3>

      <div class="grid grid-cols-5 grid-rows-2 gap-4 text-center">
        <div class="col-span-2 relative flex-grow group">
          <img
            class="object-cover w-full h-80"
            src="../assets/images/image_14.png"
            alt="Imagen 1"
          />
          <div
            class="absolute inset-0 bg-trasparent bg-opacity-50 group-hover:bg-opacity-50 group-hover:bg-black transition duration-500"
          ></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-white text-3xl font-bold">
              {{ $t('index.golf') }}
            </p>
          </div>
        </div>
        <div class="col-span-3 col-start-1 row-start-2">
          <div class="col-span-2 relative flex-grow group">
            <img
              class="object-cover w-full h-80"
              src="../assets/images/image_16.png"
              alt="Imagen 1"
            />
            <div
              class="absolute inset-0 bg-trasparent bg-opacity-50 group-hover:bg-opacity-50 group-hover:bg-black transition duration-500"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-white text-3xl font-bold">
                {{ $t('index.islands') }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-span-3 col-start-3 row-start-1">
          <div class="col-span-2 relative flex-grow group">
            <img
              class="object-cover w-full h-80"
              src="../assets/images/image_15.png"
              alt="Imagen 1"
            />
            <div
              class="absolute inset-0 bg-trasparent bg-opacity-50 group-hover:bg-opacity-50 group-hover:bg-black transition duration-500"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-white text-3xl font-bold">
                {{ $t('index.enjoy') }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-span-2 col-start-4 row-start-2">
          <div class="col-span-2 relative flex-grow group">
            <img
              class="object-cover w-full h-80"
              src="../assets/images/image_17.png"
              alt="Imagen 1"
            />
            <div
              class="absolute inset-0 bg-trasparent bg-opacity-50 group-hover:bg-opacity-50 group-hover:bg-black transition duration-500"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-white text-3xl font-bold p-5">
                {{ $t('index.pals') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED APARTMENTS -->
    <section class="container mt-16">
      <h3>{{ $t('index.featured') }}</h3>
      <div
        v-if="properties.length > 0"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        <SimplePropertyCard
          v-for="property in properties"
          :key="property?.id"
          :property="property"
        />
      </div>
      <div
        v-else
        class="mt-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-6"
      >
        <div v-for="i in 4">
          <Skeleton height="350px" class="h-64 w-full"></Skeleton>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.form {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
}

.text-neutral-400 {
  color: rgb(94, 94, 94);
}
</style>

<script setup>
definePageMeta({
  layout: 'landing',
})

import { fetchFeaturedProperties } from '../api/fetchProperties'
import SimplePropertyCard from '~/components/properties/SimplePropertyCard.vue'
import searchBar from '~/components/SearchBar.vue'
import { ref, onMounted } from 'vue'
import { PhotoService } from '@/services/PhotoService'

import Header from '~/components/Header.vue'

const { locale } = useI18n()

const properties = ref([])

onMounted(async () => {
  properties.value = await fetchFeaturedProperties()
  PhotoService.getImages().then((data) => (images.value = data))
})

function findProperties() {
  console.log('searching')
}

const images = ref()
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
])
</script>
