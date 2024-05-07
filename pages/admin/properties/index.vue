<template>
  <h1 class="text-center">Properties</h1>

  <section class="mt-12">
    <div class="flex justify-end">
      <NuxtLink :to="localePath('/admin/properties/create')">
        <Button label="Add" />
      </NuxtLink>
    </div>

    <DataTable :value="properties" class="rounded-md overflow-hidden mt-6">
      <Column :field="(p) => p.PropertyTexts[0].name" header="Name"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="BACKEND_URL + slotProps.data?.Images[0].url"
            alt="Property Image"
            class="mx-auto border-round h-16"
          />
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2 justify-center">
            <NuxtLink
              class="btn bg-primary-normal text-white"
              :to="`/admin/properties/${slotProps.data.id}`"
            >
              Edit</NuxtLink
            >
            <button
              class="btn bg-red-500 text-white"
              @click="handleDelete(slotProps.data.id)"
            >
              Delete
            </button>
          </div>
        </template>
      </Column>
      <!-- <Column header="Estado">
                <template #body="slotProps">
                    <Badge
                        :value="slotProps.data.booked ? 'Reservada' : 'Libre'"
                        :severity="slotProps.data.booked ? 'danger' : 'success'"
                        class="block w-full"></Badge>
                </template>
            </Column> -->
      <Spinner v-if="!properties" />
      <template #footer v-if="properties">
        There are {{ properties ? properties?.length : 0 }} properties.
      </template>
    </DataTable>
  </section>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column' // optional
import { fetchProperties } from '~/api/fetchProperties'
import { BACKEND_URL } from '~/CONSTS'

import { deleteProperty } from '~/api/properties/deleteProperty'

definePageMeta({
  layout: 'admin',
})

const properties = ref()

function handleDelete(id) {
  deleteProperty(id)
  properties.value = properties.value.filter((p) => p.id != id)
}

onMounted(async () => {
  properties.value = await fetchProperties()
})
</script>
