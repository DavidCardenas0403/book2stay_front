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
            class="h-full w-full h-250px"
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
        <section class="flex flex-col gap-8 col-span-5 md:col-span-3">
          <h3>{{ getPropertyText(property)?.name }}</h3>
          <p class="text-primary text-4xl">
            {{ property.price }}€
            <span class="text-gray-500 text-xl lowercase"
              >/{{ $t('variables.night') }}</span
            >
          </p>

          <div v-html="getPropertyText(property)?.description"></div>

          <section class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
              v-if="property.beds"
              v-tooltip.bottom="$t('property.size')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <p>{{ `${property.size} m` }}</p>
              <sup>2</sup>
            </div>
            <div
              v-if="property.beds"
              v-tooltip.bottom="$t('property.beds')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <p class="pr-6">{{ property.beds }}</p>
              <img
                class="text-xl"
                src="../../assets/images/bed.svg"
                width="24"
              />
            </div>
            <div
              v-if="property.rooms"
              v-tooltip.bottom="$t('property.rooms')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <p class="pr-6">{{ property.rooms }}</p>
              <i class="pi pi-home text-xl"></i>
            </div>
            <div
              v-if="property.bathrooms"
              v-tooltip.bottom="$t('property.bathrooms')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <p class="pr-6">{{ property.bathrooms }}</p>
              <img
                class="text-xl"
                src="../../assets/images/bathroom.svg"
                width="24"
              />
            </div>
            <div
              v-if="property.capacity"
              v-tooltip.bottom="$t('property.capacity')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <p class="pr-6">{{ property.capacity }}</p>
              <i class="pi pi-users text-xl"></i>
            </div>
            <div
              v-if="property.wifi"
              v-tooltip.bottom="$t('property.wifi')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <i class="pi pi-wifi text-xl"></i>
            </div>
            <div
              v-if="property.parking"
              v-tooltip.bottom="$t('property.parking')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <i class="pi pi-car text-xl"></i>
            </div>
            <div
              v-if="property.swimming_pool"
              v-tooltip.bottom="$t('property.swimmingPool')"
              class="text-2xl border bg-gray-300 p-4 flex justify-center items-center"
            >
              <img
                class="text-xl"
                src="../../assets/images/MaterialSymbolsPool.svg"
                width="24"
              />
            </div>
            <div
              v-if="property.terrace"
              v-tooltip.bottom="$t('property.terrace')"
              class="border bg-gray-300 p-4 flex justify-center items-center"
            >
              <img
                class="text-xl"
                src="../../assets/images/CbiRoomsbalcony.svg"
                width="24"
              />
            </div>
          </section>
        </section>

        <div
          class="bg-gray-200 py-8 px-6 xl:gap-2 gap-10 grid grid-cols-2 col-span-5 md:col-span-2 self-start"
        >
          <InputGroup class="col-span-2 xl:col-span-1">
            <InputGroupAddon>
              <i class="pi pi-calendar"></i>
            </InputGroupAddon>
            <FloatLabel>
              <Calendar
                inputId="booking_dates"
                v-model="data.dates"
                selectionMode="range"
                dateFormat="dd/mm/yy"
                class="custom-calendar"
                :disabled-dates="reservedDates.map((date) => new Date(date))"
              >
                <template #date="slotProps">
                  <strong
                    v-if="
                      reservedDates.includes(
                        slotProps.date.year +
                          '-' +
                          (slotProps.date.month + 1) +
                          '-' +
                          slotProps.date.day
                      )
                    "
                    class="line-through"
                    >{{ `${slotProps.date.day}` }}</strong
                  >
                  <template v-else>{{ `${slotProps.date.day}` }}</template>
                </template>
              </Calendar>
              <label class="text-neutral-400" for="booking_dates">{{
                $t('searchBar.bookingDate')
              }}</label>
            </FloatLabel>
          </InputGroup>
          <div class="grid grid-cols-2 gap-2 col-span-2 xl:col-span-1">
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
                <label class="text-neutral-400" for="adults">{{
                  $t('searchBar.adults')
                }}</label>
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
                <label class="text-neutral-400" for="children">{{
                  $t('searchBar.children')
                }}</label>
              </FloatLabel>
            </InputGroup>
          </div>

          <Button
            type="button"
            :label="$t('searchBar.book')"
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
      @close-modal="modalData.visible = false"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { fetchProperty } from '../../api/fetchProperties'
import { getPropertyText } from '../../helpers/lang'

import ImagesGallery from '~/components/properties/ImagesGallery.vue'
import BookDialog from '~/components/bookings/BookDialog.vue'

import logo from '../assets/images/book2stay.png'
import LangSwitcher from '~/components/LangSwitcher.vue'
import { BACKEND_URL } from '~/CONSTS'

import dayjs from 'dayjs'
import { formatSimpleDate } from '~/helpers/dates'

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
const reservedDates = ref(null)
const texts = ref(null)
const imagesGalleryShown = ref(false)
function toggleImagesGallery() {
  imagesGalleryShown.value = !imagesGalleryShown.value
}

onMounted(async () => {
  const response = await fetchProperty(useRoute().params?.id)
  property.value = response.property
  reservedDates.value = response.reservedDates.map((date) =>
    dayjs(date).format('YYYY-M-D')
  )

  if (useRoute().query?.start_date) {
    data.dates.push(dayjs(useRoute().query.start_date).toDate())
    data.dates.push(dayjs(useRoute().query.end_date).toDate())
    data.adults = useRoute().query.adults
    data.children = useRoute().query.children
  }

  loading.value = false
})
</script>
