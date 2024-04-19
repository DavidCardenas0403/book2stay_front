<template>
  <Dialog
    :visible="visible"
    :closable="false"
    :closeOnEscape="true"
    modal
    :style="{ width: '40rem' }"
  >
    <template #header>
      <div class="w-full flex justify-end">
        <Button
          icon="pi pi-times"
          severity="secondary"
          rounded
          outlined
          aria-label="Cancel"
          @click="toggle"
        />
      </div>
    </template>

    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      containerStyle="max-width: 640px"
    >
      <template #item="slotProps">
        <img :src="BACKEND_URL + slotProps.item.url" class="w-full h-full" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="BACKEND_URL + slotProps.item.url" />
      </template>
    </Galleria>
  </Dialog>
</template>

<script setup>
import { BACKEND_URL } from '~/CONSTS'
const { visible, toggle, images } = defineProps(['visible', 'toggle', 'images'])

const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
])
</script>
