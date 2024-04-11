<template>
    <h1 class="text-center">Propiedades</h1>

    <section class="mt-12">
        <div class="flex justify-end">
            <NuxtLink
                :to="localePath('/admin/properties/create')">
                <Button label="Añadir" />
            </NuxtLink>

        </div>
        <DataTable :value="propiedades"
            class="rounded-md overflow-hidden">
            <Column :field="p => p.idiomas[0].name"
                header="Nombre"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img src="https://placehold.co/150x75"
                        alt="Imagen propiedad"
                        class="mx-auto border-round" />
                </template>
            </Column>
            <Column header="Estado">
                <template #body="slotProps">
                    <Badge
                        :value="slotProps.data.booked ? 'Reservada' : 'Libre'"
                        :severity="slotProps.data.booked ? 'danger' : 'success'"
                        class="block w-full"></Badge>
                </template>
            </Column>
            <template #footer> Hay un total de {{
                    propiedades ? propiedades.length : 0 }}
                propiedades. </template>
        </DataTable>
    </section>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';                 // optional

import propiedades from "@/data/propiedades"

definePageMeta({
    layout: "admin",
});
</script>