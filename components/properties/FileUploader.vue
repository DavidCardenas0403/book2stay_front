<template>
    <div class="mx-5 mb-10">
        <FileUpload customUpload @uploader="handleUpload"
            :multiple="true" accept="image/*"
            :maxFileSize="1000000">
            <template #empty>
                <p>Drag and drop files to here to upload.
                </p>
            </template>
        </FileUpload>

        <div v-if="images.length > 0" class="mt-6">
            <Label class="label mb-2 block">Uploaded
                images</Label>

            <div class="grid grid-cols-4 gap-6">
                <img v-for="image in images"
                    :src="`${BACKEND_URL}${image.url}`" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { BACKEND_URL } from '~/CONSTS'
import { uploadFiles } from '~/api/properties/uploadFiles.js'

const { images } = defineProps(["images"])

const emits = defineEmits(['uploadImages'])

const handleUpload = async (event) => {
    emits('uploadImages', await uploadFiles(event))
}
</script>
