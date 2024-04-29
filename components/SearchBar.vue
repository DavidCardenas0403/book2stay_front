<template>
  <div class="relative bg-black bg-opacity-30 p-7">
    <div class="grid grid-cols-2 lg:flex lg:flex-row gap-7 items-center justify-center">

        <div class="flex-1">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-calendar"></i>
            </InputGroupAddon>
            <FloatLabel>
              <Calendar v-model="checkin"  dateFormat="dd/mm/yy" class="custom-calendar" />
              <label class="text-neutral-400" for="checkin">Check In</label>
            </FloatLabel>
          </InputGroup>
        </div>

        <div class="flex-1">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-calendar"></i>
            </InputGroupAddon>
            <FloatLabel>
              <Calendar v-model="checkout" selectionMode="range" dateFormat="dd/mm/yy" class="custom-calendar" />
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
          <Button type="button"  label="Search" icon="pi pi-search" class="bg-primary-normal" :loading="loading" @click="load" />
        </div>
      </div>
    </div>
</template>


<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['search']);

const checkin = ref('');
const checkout = ref('');
const adults = ref();
const children = ref();

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

watch(checkin, (newVal) => {
      checkout.value = [newVal, checkout.value[1]];
    });


const search = () => {
  const searchData = {
    checkin: formatDate(checkin.value),
    checkout: formatDate(checkout.value[1]),
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
    search();
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

.p-datepicker table td > span.p-highlight{
  background: #293d9b;
  color: white;

}

</style>