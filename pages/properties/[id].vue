<template>
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
    <section class="grid grid-cols-5 gap-12 mt-8">
      <section class="flex flex-col gap-8 col-span-3">
        <h3>{{ getPropertyText(property)?.name }}</h3>
        <p class="text-primary text-4xl">
          {{ property.price }}€
          <span class="text-gray-500 text-xl lowercase"
            >/{{ $t('variables.night') }}</span
          >
        </p>
        <div v-html="getPropertyText(property)?.description"></div>
      </section>

      <div class="bg-gray-200 py-8 px-6 gap-2 grid grid-cols-2 col-span-2">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-calendar"></i>
          </InputGroupAddon>
          <FloatLabel>
            <Calendar
              v-model="data.dates"
              selectionMode="range"
              dateFormat="dd/mm/yy"
              class="custom-calendar"
            />
            <label class="text-neutral-400" for="booking_dates"
              >Booking dates</label
            >
          </FloatLabel>
        </InputGroup>
        <div class="grid grid-cols-2 gap-2">
          <InputGroup class="flex-1">
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <FloatLabel>
              <InputNumber
                id="adults"
                v-model="data.adults"
                for="adults"
                showButtons
                :min="0"
              />
              <label class="text-neutral-400" for="adults">Adults</label>
            </FloatLabel>
          </InputGroup>

          <InputGroup class="flex-1">
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <FloatLabel>
              <InputNumber
                v-model="data.children"
                id="children"
                for="children"
                showButtons
                :min="0"
              />
              <label class="text-neutral-400" for="children">Children</label>
            </FloatLabel>
          </InputGroup>
        </div>

        <Button
          type="button"
          label="Book"
          class="bg-primary-normal col-span-2"
          :loading="loading"
          @click="modalData.visible = true"
        />
      </div>
    </section>

  </div>

  <ImagesGallery
    :visible="imagesGalleryShown"
    :toggle="toggleImagesGallery"
    :images="property?.Images"
  />

  <BookDialog :visible="modalData.visible" :data="data" :property="property" />
</template>

<script setup>
import { onMounted } from 'vue'
import { fetchProperty } from '../../api/fetchProperties'
import { getPropertyText } from '../../helpers/lang'

import ImagesGallery from '~/components/properties/ImagesGallery.vue'
import BookDialog from "~/components/bookings/BookDialog.vue"

import logo from '../assets/images/country-club.svg'
import LangSwitcher from '~/components/LangSwitcher.vue'
import { BACKEND_URL } from '~/CONSTS'

const data = reactive({
  dates: '',
  adults: 0,
  children: 0,
})

const modalData = reactive({
  visible: false,
  step: 1,
})

const property = ref(null)
const imagesGalleryShown = ref(false)
function toggleImagesGallery() {
  imagesGalleryShown.value = !imagesGalleryShown.value
}

onMounted(async () => {
  property.value = await fetchProperty(useRoute().params?.id)
})
</script>
