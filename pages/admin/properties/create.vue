<template>
  <div>
    <h1 class="text-center">{{ propertyId ? 'Edit' : 'Add' }} property</h1>
    <Spinner v-if="loading" />

    <form
      v-else
      class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 w-full border border-gray-800 dark:border-white"
      @submit.prevent="handleSubmit"
    >
    <TabView v-model:activeIndex="active">
        <TabPanel
          v-for="lang in languages"
          :header="lang.name"
          :key="lang.code"
        >
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
              class="break-all"
              v-model="data.description[lang.code]"
              editorStyle="height: 200px; width: 100%;"
              v-if="propertyId ? data.description[lang.code] : true"
            >
              <template v-slot:toolbar>
                <span class="ql-formats">
                  <button class="ql-bold"></button>
                  <button class="ql-italic"></button>
                  <button class="ql-underline"></button>
                  <button class="ql-link"></button>
                </span>
                <span class="ql-formats">
                  <button class="ql-list" value="ordered"></button>
                  <button class="ql-list" value="bullet"></button>
                </span>

                <span class="ql-formats">
                  <select class="ql-size">
                    <option value="small"></option>
                    <!-- Note a missing, thus falsy value, is used to reset to default -->
                    <option selected></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                  </select>
                </span>

                <span class="ql-formats">
                  <select class="ql-color"></select>
                  <select class="ql-background"></select>
                </span>
              </template>
            </Editor>
          </div>
        </TabPanel>
      </TabView>

      <FileUploader
        @uploadImages="(newImages) => data.images.push(...newImages)"
        :images="data.images"
      >
      </FileUploader>
      <div class="ps-5 gap-6 grid justify-end grid-cols-1 lg:grid-cols-2">
        <div>
          <Label for="rooms" class="label" :required="true">Rooms</Label>
          <InputNumber
            inputClass="w-full"
            v-model="data.rooms"
            inputId="rooms"
            showButtons
            buttonLayout="horizontal"
            :step="1"
            :min="1"
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
            :min="1"
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
            :min="1"
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
            :min="1"
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
            :min="1"
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
          <Label for="bathrooms" class="label" :required="true"
            >Bathrooms</Label
          >
          <InputNumber
            v-model="data.bathrooms"
            inputId="bathrooms"
            showButtons
            buttonLayout="horizontal"
            :step="1"
            :min="1"
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
        class="w-full mt-6"
        type="submit"
        :label="propertyId ? 'Update' : 'Create'"
      />
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import Editor from 'primevue/editor'
import { fetchLanguages } from '~/api/fetchLanguages.js'

import { createProperty } from '../../../api/properties/createProperty.js'
import { updateProperty } from '../../../api/properties/updateProperty.js'
import { fetchProperty } from '~/api/fetchProperties.js'

import FileUploader from '../../components/properties/FileUploader.vue'
// import axios from 'axios';

// Importa la función para traducir el nombre
// import { translateName } from '~/api/deeplTranslate.js'

definePageMeta({
  layout: 'admin',
})

const propertyId = ref(useRoute().params?.id)

const loading = ref(true)
const active = ref(0)

const languages = ref({})

function handleSubmit() {
  try {
    if (!propertyId.value) {
      createProperty(data)
    } else {
      updateProperty(data, propertyId.value)
    }
    useRouter().push('/admin/properties')
  } catch (error) {
    console.error(error)
  }
}

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
  images: [],
})


// async function translateAndApply() {
//   const fromLang = 'ca'; // Catalan language code
//   const fromText = data.name[fromLang];
  
//   try {
//     for (const lang of languages.value) {
//       if (lang.code !== fromLang && fromText) {
//         const translatedText = await translateName(fromText, lang.code);

//         // traduce translated text
        
//         data.name[lang.code] = translatedText;
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// // npm 

// const translate = require('node-deepl');
 
// translate("Hello there, what's going on?", "EN", "DE", (err, res) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log('Result: ', res);
// });

async function assignPropertyData(propertyData) {
  propertyData.PropertyTexts.forEach((propertyText) => {
    data.name[propertyText.languageCode] = propertyText.name
    data.description[propertyText.languageCode] = propertyText.description
  })

  data.rooms = propertyData.rooms
  data.size = propertyData.size
  data.price = propertyData.price
  data.capacity = propertyData.capacity
  data.beds = propertyData.beds
  data.bathrooms = propertyData.bathrooms
  data.parking = propertyData.parking
  data.wifi = propertyData.wifi
  data.swimming_pool = propertyData.swimming_pool
  data.terrace = propertyData.terrace

  data.images = propertyData.Images
}

onMounted(async () => {
  languages.value = await fetchLanguages()

  if (propertyId.value) {
    const propertyData = await fetchProperty(propertyId.value)
    fillPropertyData(propertyData.property)
  }

  loading.value = false
})
</script>

<style scoped>
.label {
  @apply font-bold block mb-2;
}
</style>
