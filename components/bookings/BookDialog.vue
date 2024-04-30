<template>
  <Dialog
    header="Your book"
    :visible="visible"
    modal
    position="center"
    :style="{ width: '80%', height: '80%' }"
  >
    <div>
      {{ data }}
    </div>
    <div class="grid grid-cols-2">
      <Stepper linear>
        <StepperPanel header="Personal information">
          <template #content="{ nextCallback }">
            <form class="col-span-1" @submit.prevent="submitBooking">
              <div class="p-fluid flex flex-col gap-4">
                <div class="p-field">
                  <label for="name">Name</label>
                  <InputText v-model="formData.name" id="name"></InputText>
                </div>
                <div class="p-field">
                  <label for="phone">Phone</label>
                  <InputText v-model="formData.phone" id="phone"></InputText>
                </div>
                <div class="p-field">
                  <label for="email">Email</label>
                  <InputText v-model="formData.email" id="email"></InputText>
                </div>
                <div class="p-field">
                  <label for="discount_code">Discount Code</label>
                  <InputText
                    v-model="formData.discount_code"
                    id="discount_code"
                  ></InputText>

                  <Button
                    class="mt-4 bg-primary-normal"
                    :disabled="formData.discount_code === '' ? true : false"
                    label="validate"
                    @click="validateDiscountCode(formData.discount_code)"
                  />
                  <div v-if="discountData.code" class="text-green-500 my-2">
                    Apply {{ discountData.percentage }}%
                  </div>
                  <div v-else-if="discountData.error" class="text-red-500 my-2">
                    {{ discountData.error }}
                  </div>
                </div>
              </div>
              <Button
                class="bg-primary-normal my-4"
                @click="nextCallback"
                type="submit"
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
              ></Button>
            </form>
          </template>
        </StepperPanel>
        <StepperPanel header="Payment">
          <template #content="{ prevCallback, nextCallback }">
            <div class="flex flex-column h-12rem">
              <div
                class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
              >
                Content II
              </div>
            </div>
            <div class="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="prevCallback"
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="nextCallback"
              />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel header="Summary">
          <template #content="{ prevCallback }">
            <div class="flex flex-column h-12rem">
              <div
                class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
              >
                Content III
              </div>
            </div>
            <div class="flex pt-4 justify-content-start">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="prevCallback"
              />
            </div>
          </template>
        </StepperPanel>
      </Stepper>

      <div></div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../../api/axios'

const { visible, data, property } = defineProps(['visible', 'data', 'property'])

const formData = ref({
  name: '',
  phone: '',
  email: '',
  discount_code: '',
})

const discountData = ref({})
const finalPrice = ref()

async function validateDiscountCode(code) {
  try {
    const response = await axios.get('/discounts/' + code)
    discountData.value = response.data
  } catch (error) {
    discountData.value = { error: error.response.data.error }
  }
}

async function submitBooking() {
  try {
    // Enviar los datos al endpoint de reservas
    const response = await axios.post('/bookings', {
      ...formData.value,
      adults: data.adults,
      children: data.children,
      property_id: property?.id,
      start_date: data.dates[0],
      end_date: data.dates[1],
    })
    console.log('Booking created:', response.data)
    // Cerrar el modal después de enviar la reserva
    // modalData.value.visible = false;
  } catch (error) {
    console.error('Error creating booking:', error)
  }
}
</script>
