<template class="ps-5">
  <FileUpload
    customUpload
    @uploader="uploadFiles"
    :multiple="true"
    accept="image/*"
    :maxFileSize="1000000"
  >
    <template #empty>
      <p>Drag and drop files to here to upload.</p>
    </template>
  </FileUpload>
</template>

<script setup>
import axios from '~/api/axios'
const uploadFiles = async (event) => {
  const formData = new FormData()

  for (const file of event.files) {
    formData.append('images', file)
  }

  try {
    const { data } = await axios.post('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {}
}
</script>
