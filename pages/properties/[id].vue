<template>
  <div>
    <div v-if="!loading" class="container">
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
            :key="image?.url"
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

          <section class="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div
              v-if="property.wifi"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <i class="pi pi-wifi"></i>
            </div>
            <div
              v-if="property.parking"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <i class="pi pi-car"></i>
            </div>
            <div
              v-if="property.swimming_pool"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <img
                src="../../assets/images/MaterialSymbolsPool.svg"
                width="24"
              />
            </div>
            <div
              v-if="property.terrace"
              class="border bg-gray-300 p-4 flex justify-center items-center"
            >
              <img src="../../assets/images/CbiRoomsbalcony.svg" width="24" />
            </div>
          </section>
        </section>

        <div
          class="bg-gray-200 py-8 px-6 gap-2 grid grid-cols-2 col-span-2 self-start"
        >
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

    <BookDialog
      v-if="!loading"
      :visible="modalData.visible"
      :data="data"
      :property="property"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { fetchProperty } from '../../api/fetchProperties'
import { getPropertyText } from '../../helpers/lang'

import ImagesGallery from '~/components/properties/ImagesGallery.vue'
import BookDialog from '~/components/bookings/BookDialog.vue'

import logo from '../assets/images/country-club.svg'
import LangSwitcher from '~/components/LangSwitcher.vue'
import { BACKEND_URL } from '~/CONSTS'

const { locale } = useI18n()

const loading = ref(true)

const data = reactive({
  dates: [],
  adults: 0,
  children: 0,
})

const modalData = reactive({
  visible: false,
  step: 1,
})

const property = ref(null)
const texts = ref(null)
const imagesGalleryShown = ref(false)
function toggleImagesGallery() {
  imagesGalleryShown.value = !imagesGalleryShown.value
}

onMounted(async () => {
  property.value = await fetchProperty(useRoute().params?.id)

  if (useRoute().query?.start_date) {
    data.dates.push(dayjs(useRoute().query.start_date).toDate())
    data.dates.push(dayjs(useRoute().query.end_date).toDate())
    data.adults = useRoute().query.adults
    data.children = useRoute().query.children
  }

  loading.value = false
})
</script>
