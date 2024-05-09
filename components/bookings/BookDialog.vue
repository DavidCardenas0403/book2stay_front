<template v-if="!loading">
  <Dialog
    @update:visible="$emit('closeModal')"
    header="Your book"
    :visible="visible"
    modal
    position="center"
    class="md:w-2/3 md:h-5/6 w-full h-full"
  >
    <div
      class="flex flex-col-reverse md:grid lg:grid-cols-2 gap-x-10 h-full sm:p-5"
    >
      <Stepper linear>
        <StepperPanel header="Contact">
          <template #content="{ nextCallback }">
            <form @submit.prevent="nextCallback" class="flex flex-col">
              <div class="p-fluid flex flex-col gap-4">
                <div class="p-field">
                  <label for="name">Name</label>
                  <InputText
                    required
                    v-model="formData.name"
                    id="name"
                  ></InputText>
                </div>
                <div class="p-field">
                  <label for="phone">Phone</label>
                  <InputMask
                    required
                    v-model="formData.phone"
                    id="phone"
                    mask="+99 999 999 999"
                    placeholder="+34 672 542 908"
                  ></InputMask>
                </div>
                <div class="p-field">
                  <label for="email">Email</label>
                  <InputText
                    type="email"
                    required
                    v-model="formData.email"
                    id="email"
                  ></InputText>
                </div>
              </div>
              <Button
                type="submit"
                class="btn bg-primary-normal my-4"
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
              ></Button>
            </form>
          </template>
        </StepperPanel>

        <StepperPanel header="Payment">
          <template #content="{ prevCallback, nextCallback }">
            <form class="col-span-1" @submit.prevent="submitBooking">
              <div class="p-fluid flex flex-col gap-4">
                <div>
                  <div class="grid grid-cols-4 gap-2 items-end">
                    <div class="p-field w-full col-span-4 2xl:col-span-3">
                      <label for="discount_code">{{
                        $t('booking.discountCode')
                      }}</label>
                      <InputText
                        v-model="formData.discount_code"
                        id="discount_code"
                      ></InputText>
                    </div>

                    <Button
                      class="bg-primary-normal col-span-4 2xl:col-span-1"
                      :disabled="formData.discount_code === '' ? true : false"
                      :label="$t('booking.apply')"
                      @click="validateDiscountCode(formData.discount_code)"
                    />
                  </div>
                  <div v-if="discountData.code" class="text-green-500 my-2">
                    Apply {{ discountData.percentage }}%
                  </div>
                  <div v-else-if="discountData.error" class="text-red-500 my-2">
                    {{ discountData.error }}
                  </div>
                </div>
              </div>
              <Paypal :price="calculateTotal()" class="mt-10"></Paypal>
            </form>

            <div class="flex gap-2 pt-4 justify-content-between items-center">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="prevCallback"
              />

              <button @click="pay(nextCallback)">simular pago</button>
            </div>
          </template>
        </StepperPanel>

        <StepperPanel header="Summary">
          <template #content="{}">
            <div class="flex flex-col justify-center items-center min-h-96">
              <div v-if="loadingPayment" class="w-full">
                <Spinner></Spinner>
                <p class="text-center">{{ $t('booking.wait') }}</p>
              </div>
              <div
                v-else-if="paymentError"
                class="w-full text-center text-xl text-red-500"
              >
                <i
                  class="pi pi-times text-3xl border rounded-full p-3 border-2 border-red-500"
                ></i>
                <p class="mt-3">
                  {{ $t('booking.paymentError') }}
                </p>
              </div>
              <div
                v-else-if="payedBooking"
                class="w-full text-center text-xl text-green-500"
              >
                <i
                  class="pi pi-check text-3xl border rounded-full p-3 border-2 border-green-500"
                ></i>
                <p class="mt-3">
                  {{ $t('booking.successPayment') }}
                </p>
              </div>
            </div>
          </template>
        </StepperPanel>
      </Stepper>

      <div class="h-full flex flex-col gap-3">
        <img
          class="md:h-1/2 w-full object-cover pt-2"
          :src="`${BACKEND_URL}${property.Images[0].url}`"
          alt=""
        />
        <div class="gap-4">
          <div class="flex flex-col gap-3">
            <h3>
              {{ getPropertyText(property).name }}
            </h3>
            <p>
              {{
                formatSimpleDate(data.dates[0], 'D MMMM') +
                ' - ' +
                formatSimpleDate(data.dates[1], 'D MMMM')
              }}
            </p>
            <p>{{ `${data.adults} adults - ${data.children} children` }}</p>
          </div>

          <div class="p-4 border border-dashed mt-3">
            <p class="font-bold">Checkout</p>

            <div class="mt-5 grid grid-cols-2">
              <p>
                {{ calculateNights(data.dates[0], data.dates[1]) }} nights x
                {{ property.price }}€
              </p>
              <p class="justify-self-end">
                {{
                  calculateNights(data.dates[0], data.dates[1]) *
                  property.price
                }}€
              </p>
            </div>

            <div class="mt-5 grid grid-cols-2" v-if="discountData.code">
              <p class="text-green-500">
                {{ discountData.code }}
              </p>

              <p class="justify-self-end text-green-500">
                -{{ calculateDiscountQuantity() }}€
              </p>
            </div>

            <p class="text-3xl font-bold text-primary mt-4 text-end">
              {{ calculateTotal() }}€
            </p>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
const { locale } = useI18n()
import 'dayjs'
import { ref } from 'vue'
import axios from '../../api/axios'
import { BACKEND_URL } from '~/CONSTS'
import { getPropertyText } from '~/helpers/lang'
import dayjs from 'dayjs'
import { formatSimpleDate } from '~/helpers/dates'

const emit = defineEmits(['closeModal'])

const { visible, data, property } = defineProps([
  'visible',
  'data',
  'property',
  'loading',
])
/* console.log(
  property.PropertyTexts.filter((text) => text.languageCode == locale?.value)[0]
    .name
) */
//console.log(property)
const formData = ref({
  name: '',
  phone: '',
  email: '',
  discount_code: '',
})

const discountData = ref({})
const finalPrice = ref()

const loadingPayment = ref(false)
const showPaymentError = ref(false)

const payedBooking = ref(false)

async function pay(nextCallback) {
  loadingPayment.value = true
  showPaymentError.value = false
  console.log('Proceso de pago')
  setTimeout(() => {
    loadingPayment.value = false
    payedBooking.value = true
  }, 4000)
  const paymentResponse = 'Aquí va la petición a la API de Paypal'

  nextCallback()
  if (paymentResponse.data) {
  } else {
    showPaymentError.value = true
  }
}

watch(payedBooking, submitBooking)

function calculateNights(start_date, end_date) {
  const start = dayjs(start_date)
  const end = dayjs(end_date)
  const nights = end.diff(start, 'day')
  return nights
}

async function validateDiscountCode(code) {
  try {
    const response = await axios.get('/discounts/' + code)
    discountData.value = response.data
  } catch (error) {
    discountData.value = { error: error.response.data.error }
  }
}

function calculateDiscountQuantity() {
  return (
    calculateNights(data.dates[0], data.dates[1]) *
    property.price *
    (discountData.value.percentage / 100)
  )
}

function calculateTotal() {
  let total = calculateNights(data.dates[0], data.dates[1]) * property.price

  if (discountData.value?.code) {
    total -= calculateDiscountQuantity()
  }

  return total
}

async function submitBooking() {
  console.log('booking petición')
  if (process.client) {
    try {
      // Enviar los datos al endpoint de reservas
      const response = await axios.post('/bookings', {
        ...formData.value,
        adults: data.adults,
        children: data.children,
        property_id: property?.id,
        start_date: data.dates[0],
        end_date: data.dates[1],
        hostname: `http://${window.location.host}`,
      })
      console.log('Booking created:', response.data)

      if (response.data)
        useRouter().push(`/find-booking?id=${response.data.id}`)
      // Cerrar el modal después de enviar la reserva
      // modalData.value.visible = false;
    } catch (error) {
      console.error('Error creating booking:', error)
    }
  }
}
</script>
