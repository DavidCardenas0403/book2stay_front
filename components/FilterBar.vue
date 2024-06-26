<!-- FilterBar.vue -->
<template>
  <div class="flex justify-normal items-center bg-gray-200 p-4 mb-5">
    <!-- PRICE -->
    <div class="mr-4">
      <Button type="button" icon="pi pi-euro" :label="$t('variables.price')" @click="toggle_price"
        class="rounded-none bg-primary-normal border-primary-normal" />
      <OverlayPanel ref="op_price" class="rounded-none">
        <div class="flex flex-column items-center gap-3 w-25rem"> <!-- Centering items -->
          <div class="">
            <span class="font-medium text-900 block mb-2">{{ $t("property.price_night") }}</span>
            <Slider v-model="price" range :min="100" :max="500" class="w-14rem mt-3" />
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
      <Button type="button" icon="pi pi-filter" :label="$t('variables.beds')" @click="toggle_bed"
        class="rounded-none bg-primary-normal border-primary-normal" />
      <OverlayPanel ref="op_bed" class="rounded-none">
        <div class="flex flex-column items-center gap-3 w-25rem ">
          <div class="card flex justify-content-center ">
            <SelectButton v-model="beds" :options="number_beds" optionLabel="name" aria-labelledby="multiple" />
          </div>
        </div>
      </OverlayPanel>
    </div>




    <div class="card flex justify-content-center">
  <SelectButton v-for="(item, index) in items" :key="index" :class="{ 'no_color': true }" v-model="moreInfo" :options="[item]" optionLabel="name" multiple aria-labelledby="multiple">
    <template v-slot:item="option">
      <div :class="{ 'no_color': moreInfo.includes(option.item.moreInfo) }">
        {{ option.item.name }}
      </div>
    </template>
  </SelectButton>
</div>


    <!-- Search Bar -->
    <div class="flex-grow" /> <!-- This will push the search bar to the right -->
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText v-model="searchTerm" :placeholder="$t('searchBar.search')" />
      </IconField>


  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";

// Define custom events to emit filter information
const emitFilter = defineEmits(['filterPrice', 'filterBeds', 'filterItems', 'filterSearch']);

const searchTerm = ref("");

// Data and methods for Price filter
const price = ref([100, 500]);
const op_price = ref();
const toggle_price = (event) => op_price.value.toggle(event);

// Data and methods for Beds filter
const beds = ref(null);
const number_beds = ref([]);
for (let i = 1; i <= 10; i++) {
  number_beds.value.push({ name: '+' + i.toString(), beds: i });
}
const op_bed = ref();
const toggle_bed = (event) => op_bed.value.toggle(event);

const moreInfo = ref(null);
const items = ref([
  { name: 'Terrace', moreInfo: "terrace" },
  { name: 'Swimming pool', moreInfo: "swimming_pool" },
  { name: 'Wifi', moreInfo: "wifi" },
  { name: 'Parking', moreInfo: "parking" }
]);

// Watchers for filter changes
watch(price, (newValue) => emitFilter('filterPrice', newValue));
watch(beds, (newValue) => emitFilter('filterBeds', newValue));
watch(moreInfo, (newValue) => emitFilter('filterItems', newValue));
watch(searchTerm, (newValue) => emitFilter('filterSearch', newValue));
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
.p-button.p-component{
  border-color: transparent;
}
</style>
