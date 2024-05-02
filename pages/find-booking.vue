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

    <section class="mt-6">
      <div v-if="loading">
        <Spinner />
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
<div v-else>
  <span>From {{ bookingData?.start_date }}</span><br>
  <span>To {{ bookingData?.end_date }}</span><br>

  <p>Name: {{ bookingData?.name }}</p>
  <p>Adults: {{ bookingData?.adults }}</p>
  <p>Children: {{ bookingData?.children }}</p>
  <p>Phone: {{ bookingData?.phone }}</p>
  <p>Email: {{ bookingData?.email }}</p>
  <p>Total Price: {{ bookingData?.final_price }}€</p>
</div>

    </section>
  </div>
</template>

<script setup>
import Label from "../components/Label.vue";
import axios from "../api/axios";
import { getPropertyText } from "../helpers/lang";

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