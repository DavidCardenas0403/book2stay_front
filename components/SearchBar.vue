<template>
  <div class="relative bg-black bg-opacity-30 p-7">
    <div class="grid grid-cols-2 lg:flex lg:flex-row gap-7 items-center justify-center">

        <div class="flex-1">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-calendar"></i>
            </InputGroupAddon>
            <FloatLabel>
              <Calendar v-model="checkin" class="custom-calendar" />
              <label class="text-neutral-400" for="checkout">Check In</label>
            </FloatLabel>
          </InputGroup>
        </div>

        <div class="flex-1">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-calendar"></i>
            </InputGroupAddon>
            <FloatLabel>
              <Calendar v-model="checkout" class="custom-calendar" />
              <label class="text-neutral-400" for="checkout">Check Out</label>
            </FloatLabel>
          </InputGroup>
        </div>

        <div class="flex-1">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <FloatLabel>
              <InputNumber id="adults" v-model="adults" for="adults" showButtons  :min="0" />
              <label class="text-neutral-400" for="adults">Adults</label>
            </FloatLabel>
          </InputGroup>
        </div>

        <div class="flex-1">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <FloatLabel>
              <InputNumber v-model="children" id="children" for="children" showButtons  :min="0" />
              <label class="text-neutral-400" for="children">Children</label>
            </FloatLabel>
          </InputGroup>
        </div>

        <div>
          <Button type="button" label="Search" icon="pi pi-search" class="bg-primary-normal" :loading="loading" @click="load" />
        </div>
      </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';

const checkin = ref('');
const checkout = ref('');
const adults = ref();
const children = ref();

const search = () => {
  // Aquí puedes emitir un evento con los datos de búsqueda para que el componente padre los maneje
  const searchData = {
    checkin: checkin.value,
    checkout: checkout.value,
    adults: adults.value,
    children: children.value
  };
  emit('search', searchData);
};

const loading = ref(false);

const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
</script>

<style>
.custom-calendar, .p-datepicker, .p-button {
  border-radius: 0;
  border: none;

  
}



.p-inputtext,
.p-inputgroup-addon {
  border-radius: 0;
}
</style>