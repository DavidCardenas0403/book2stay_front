<template class="ps-5">
  <FileUpload
    customUpload
    @uploader="handleUpload"
    :multiple="true"
    accept="image/*"
    :maxFileSize="1000000"
  >
    <template #empty>
      <p>Drag and drop files to here to upload.</p>
    </template>
  </FileUpload>

  <div v-if="images.length > 0">
    <Label class="label">Uploaded images</Label>
    <img v-for="image in images" :src="`${BACKEND_URL}${image.url}`" />
  </div>
</template>

<script setup>
import axios from '~/api/axios'
import { BACKEND_URL } from '~/CONSTS'
import { uploadFiles } from '~/api/properties/uploadFiles.js'

const images = ref([])
const emits = defineEmits(['uploadImages'])

const handleUpload = async (event) => {
  images.value.push(...(await uploadFiles(event)))
  emits('uploadImages', images.value)
}
</script>
