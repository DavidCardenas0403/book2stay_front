<template>
  <header class="border-b border-b-primary mb-10">
    <div class="container flex justify-between items-center">
      <div class="flex gap-3 items-center">
        <img :src="logo" alt="Logo" class="h-28 md:h-32" />
        <h1 class="text-black">
          <NuxtLink to="/"> Country Club Pals </NuxtLink>
        </h1>
      </div>

      <LangSwitcher />
    </div>
  </header>
  <div v-if="property" class="container">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <img
        :src="`${BACKEND_URL}${property?.Images[0].url}`"
        class="h-full w-full"
      />
      <div class="flex flex-row md:grid grid-cols-2 gap-4">
        <img
          v-for="image in property?.Images.slice(1, 4)"
          :src="BACKEND_URL + image?.url"
          class="h-full w-full"
        />

        <div
          class="h-full w-full cursor-pointer"
          :style="{
            backgroundImage: `url(${BACKEND_URL + property?.Images[0]?.url})`,
          }"
          @click="toggleImagesGallery"
        >
          <div
            class="w-full h-full bg-black bg-opacity-70 flex flex-col gap-3 justify-center items-center text-white text-xl"
          >
            <i class="pi pi-camera text-2xl"></i>
            <span> +{{ property?.Images.length }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="grid grid-cols-2 gap-12 mt-8">
      <section class="flex flex-col gap-8">
        <h3>{{ getPropertyText(property)?.name }}</h3>
        <p class="text-primary text-4xl">
          {{ property.price }}€
          <span class="text-gray-500 text-xl lowercase"
            >/{{ $t('variables.night') }}</span
          >
        </p>
        <div v-html="getPropertyText(property)?.description"></div>
      </section>

      <div class="bg-blue-300"></div>
    </section>
  </div>

  <ImagesGallery
    :visible="imagesGalleryShown"
    :toggle="toggleImagesGallery"
    :images="property?.Images"
  />
</template>

<script setup>
import { onMounted } from 'vue'
import { fetchProperty } from '../../api/fetchProperties'
import { getPropertyText } from '../../helpers/lang'

import ImagesGallery from '~/components/properties/ImagesGallery.vue'

import logo from '../assets/images/country-club.svg'
import LangSwitcher from '~/components/LangSwitcher.vue'
import { BACKEND_URL } from '~/CONSTS'

const property = ref(null)
const imagesGalleryShown = ref(false)
function toggleImagesGallery() {
  imagesGalleryShown.value = !imagesGalleryShown.value
}

onMounted(async () => {
  property.value = await fetchProperty(useRoute().params?.id)
})
</script>
