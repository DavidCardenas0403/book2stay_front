<template>
  <div>
    <h1 class="text-center">Find your booking</h1>
    <form class="flex flex-col items-center mt-6 gap-3">
      <Label class="block">Your booking code</Label>
      <InputMask v-model="bookingId" mask="999999" />
      <Button class="btn bg-primary" @click.prevent="findBookingById"
        >Find</Button
      >
    </form>

    <section class="mt-6 flex flex-col items-center justify-center">
      <div v-if="loading">
        <Spinner />
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else-if="bookingData?.id" class="md:w-1/2 border-2 border-dashed p-4">
        <div>
          <p class="font-bold">Booking Data</p>
          <p>
            {{
              formatSimpleDate(bookingData?.start_date, "D MMMM") +
              " - " +
              formatSimpleDate(bookingData?.end_date, "D MMMM")
            }}
          </p>

          <p>{{ `${bookingData?.adults} adults - ${bookingData?.children} children` }}</p>
        </div>

        <div class="mt-4">
          <p class="font-bold">Personal data</p>
          <p>Name: {{ bookingData?.name }}</p>
          <p>Phone: {{ bookingData?.phone }}</p>
          <p>Email: {{ bookingData?.email }}</p>
        </div>

        <p class="text-end">
          Total Price:
          <span class="text-primary font-bold"
            >{{ bookingData?.final_price }}€</span
          >
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import Label from "../components/Label.vue";
import axios from "../api/axios";
import { getPropertyText } from "../helpers/lang";
import { formatSimpleDate } from "~/helpers/dates";

const loading = ref(false);

const bookingId = ref();
const bookingData = ref();
const error = ref();

async function findBookingById() {
  loading.value = true;
  try {
    bookingData.value = null;
    error.value = null;
    const { data } = await axios.get(`bookings/${bookingId.value}`);
    bookingData.value = data;
  } catch (e) {
    error.value = e.response.data.error;
  }
  loading.value = false;
}
</script>