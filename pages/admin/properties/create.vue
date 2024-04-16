<template>
  <h1 class="text-center">Add property</h1>
  <Spinner v-if="loading" />

  <form
    v-else
    class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 w-full border border-gray-800 dark:border-white"
  >
    <div class="flex mb-2 gap-2 justify-end">
      <Button
        v-for="(lang, index) in languages"
        @click="active = index"
        rounded
        class="w-7 h-7 p-0"
        :outlined="active !== index"
        :class="active == index ? 'opacity-100' : 'opacity-50'"
        :style="{
          backgroundImage: `url('https://flagicons.lipis.dev/flags/1x1/${lang.flag}.svg')`,
        }"
      />
    </div>

    <TabView v-model:activeIndex="active">
      <TabPanel v-for="lang in languages" :header="lang.name">
        <div>
          <Label for="name" class="label" :required="true">Name</Label>
          <InputText
            type="text"
            id="name"
            v-model="data.name[lang.code]"
            class="w-full"
          />
        </div>
        <div class="mt-4">
          <Label for="description" class="label" :required="true"
            >Description</Label
          >
          <Editor
            itemid="description"
            id="description"
            v-model="data.description[lang.code]"
            editorStyle="height: 320px"
          >
            <template v-slot:toolbar>
              <span class="ql-formats">
                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                <button
                  v-tooltip.bottom="'Underline'"
                  class="ql-underline"
                ></button>
                <button v-tooltip.bottom="'Header'" class="ql-list"></button>
                <button v-tooltip.bottom="'Link'" class="ql-link"></button>
              </span>
            </template>
          </Editor>
        </div>
      </TabPanel>
    </TabView>
    <div class="ps-5 gap-6 grid justify-end grid-cols-1 lg:grid-cols-2">
      <div>
        <Label for="rooms" class="label" required="true">Rooms</Label>
        <InputNumber
          inputClass="w-full"
          v-model="data.rooms"
          inputId="rooms"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          min="1"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div>
        <Label for="size" class="label" :required="true">Size</Label>
        <InputNumber
          inputClass="w-full"
          v-model="data.size"
          inputId="size"
          showButtons
          buttonLayout="horizontal"
          :step="5"
          min="1"
          suffix=" m&sup2;"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div>
        <Label for="price" class="label" :required="true"
          >Price <span class="text-gray-400">per night</span></Label
        >
        <InputNumber
          v-model="data.price"
          inputId="price"
          showButtons
          buttonLayout="horizontal"
          :step="5"
          min="1"
          mode="currency"
          currency="EUR"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div>
        <Label for="capacity" class="label" :required="true">Capacity</Label>
        <InputNumber
          v-model="data.capacity"
          inputId="capacity"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          min="1"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div>
        <Label for="beds" class="label" :required="true">Beds</Label>
        <InputNumber
          v-model="data.beds"
          inputId="beds"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          min="1"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div>
        <Label for="bathrooms" class="label" :required="true">Bathrooms</Label>
        <InputNumber
          v-model="data.bathrooms"
          inputId="bathrooms"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          min="1"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div>
        <Label for="parking" class="label" :required="true">Parking</Label>
        <InputSwitch id="parking" v-model="data.parking" />
      </div>
      <div>
        <Label for="wifi" class="label" :required="true">Wi-Fi</Label>
        <InputSwitch id="wifi" v-model="data.wifi" />
      </div>
      <div>
        <Label for="swimming_pool" class="label" :required="true"
          >Swimming Pool</Label
        >
        <InputSwitch id="swimming_pool" v-model="data.swimming_pool" />
      </div>
      <div>
        <Label for="terrace" class="label" :required="true">Terrace</Label>
        <InputSwitch id="terrace" v-model="data.terrace" />
      </div>
    </div>

    <Button
      type="submit"
      label="Create"
      @click.prevent="createProperty(data)"
    />
  </form>
</template>

<script setup>
import { reactive } from "vue";
import Editor from "primevue/editor";
import { fetchLanguages } from "~/api/fetchLanguages.js";
import { createProperty } from "../../../api/properties/createProperty.js";

const loading = ref(true);
const languages = ref({});

onMounted(async () => {
  languages.value = await fetchLanguages();
  loading.value = false;
});

definePageMeta({
  layout: "admin",
});

const active = ref(0);

const data = reactive({
  name: {},
  description: {},
  rooms: 1,
  size: 50,
  price: 200,
  capacity: 1,
  beds: 1,
  bathrooms: 1,
  parking: false,
  wifi: false,
  swimming_pool: false,
  terrace: false,
});
</script>

<style scoped>
.label {
  @apply font-bold block mb-2;
}
</style>
