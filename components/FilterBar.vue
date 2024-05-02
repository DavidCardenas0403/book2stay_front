<template>
  <div class="flex justify-normal items-center bg-gray-200 p-4 mb-5">

    <!-- PRICE -->
    <div class="mr-4">
      <Button type="button" icon="pi pi-euro" label="Price" @click="toggle_price"
        class="rounded-none bg-primary-normal border-primary-normal" />
      <OverlayPanel ref="op_price" class="rounded-none">
        <div class="flex flex-column items-center gap-3 w-25rem"> <!-- Centering items -->
          <div class="">
            <span class="font-medium text-900 block mb-2">Filter by price for night</span>
            <Slider v-model="price" range max="1000" class="w-14rem mt-3" />
            <div class="mt-4 flex justify-center gap-2"> <!-- Centering horizontally -->
              <InputNumber suffix="€" v-model.number="price[0]" inputClass="rounded-none w-20" />
              <InputNumber suffix="€" v-model.number="price[1]" inputClass="rounded-none w-20" />
            </div>
          </div>
        </div>
      </OverlayPanel>
    </div>


    <!-- BEDS -->
    <div class="mr-4">

      <Button type="button" icon="pi pi-filter" label="Beds" @click="toggle_bed"
        class="rounded-none bg-primary-normal border-primary-normal" />
      <OverlayPanel ref="op_bed" class="rounded-none">
        <div class="flex flex-column items-center gap-3 w-25rem ">
          <div class="card flex justify-content-center ">
            <SelectButton v-model="beds" :options="number_beds" optionLabel="name" aria-labelledby="multiple"
              class="" />
          </div>
        </div>
      </OverlayPanel>
    </div>

    <div class="card flex justify-content-center">
      <SelectButton v-model="value" :options="items" optionLabel="name" multiple aria-labelledby="multiple" />
    </div>

    <div class="flex-grow" /> <!-- This will push the search bar to the right -->
    <IconField iconPosition="left">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText placeholder="Search" />
    </IconField>

  </div>




</template>


<script setup>
import { ref } from "vue";

const price = ref([0, 1000]);


//Filter components
const op_price = ref();
const toggle_price = (event) => op_price.value.toggle(event);

const op_bed = ref();
const toggle_bed = (event) => op_bed.value.toggle(event);



const beds = ref(null);
const number_beds = ref([]);
for (let i = 1; i <= 10; i++) {
  number_beds.value.push({ name: i.toString(), value: i });
}

const value = ref(null);
const items = ref([
  { name: 'Terrace', value: 1 },
  { name: 'Swiming pool', value: 2 },
  { name: 'Garden', value: 3 }
]);
</script>
<style>
.p-slider .p-slider-range {
  background: #293D9B;
}

.p-selectbutton .p-button::before {
  border-radius: 0;
}

.p-selectbutton .p-button.p-highlight::before {
  background: #293D9B;
  border-color: #ffffff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04);
}

.p-button.p-highlight .p-button-label {
  color: white;
}
</style>
