<template>
  <div>
    <h1 class="text-center">Bookings</h1>

    <div class="flex gap-6">
      <section class="w-full">
        <DataTable
          :value="bookings"
          v-model:filters="filters"
          class="rounded-md overflow-hidden mt-6 w-full"
          ref="dt"
          stripedRows
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 30, 50]"
          v-model:selection="selectedBooking"
          selectionMode="single"
        >
          <template #header>
            <div class="flex justify-between" style="text-align: left">
              <Button
                icon="pi pi-external-link"
                label="Export"
                @click="exportCSV($event)"
              />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search"
              />
            </div>
          </template>
          <Column field="id" header="Booking Code" sortField="id" sortable>
            <template #body="slotProps"> #{{ slotProps.data.id }} </template>
          </Column>
          <Column
            field="start_date"
            header="Dates"
            sortable
            sortField="start_date"
          >
            <template #body="slotProps">
              {{
                formatSimpleDate(slotProps.data.start_date, 'D MMMM') +
                ' - ' +
                formatSimpleDate(slotProps.data.end_date, 'D MMMM')
              }}
            </template>
          </Column>
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Phone" />
          <Column field="canceled" header="State" sortable sortField="canceled">
            <template #body="slotProps">
              <div
                v-if="slotProps.data.canceled"
                class="bg-red-500 p-2 rounded-lg text-white"
              >
                Canceled
              </div>
              <div v-else class="bg-green-500 p-2 rounded-lg text-white">
                Active
              </div>
            </template>
          </Column>
          <Column header="Actions">
            <template #body="slotProps">
              <div class="flex gap-2 justify-center">
                <button
                  class="text-green-500"
                  @click="restoreBooking(slotProps.data.id)"
                  v-if="slotProps.data.canceled"
                >
                  Restore
                </button>

                <button
                  class="text-red-500"
                  @click="(e) => handleBookingCancel(e, slotProps.data.id)"
                  v-else
                >
                  Cancel
                </button>
              </div>
            </template>
          </Column>
          <Spinner v-if="!bookings" />
          <template #footer v-if="bookings">
            There are {{ bookings ? bookings?.length : 0 }} bookings.
          </template>
        </DataTable>
      </section>

      <ConfirmPopup></ConfirmPopup>

      <section
        v-if="selectedBooking"
        class="border-2 border-dashed p-4 min-w-96"
      >
        <div>
          <h3 class="text-center mb-6">#{{ selectedBooking.id }}</h3>
          <p class="font-bold">{{ $t('booking.data') }}</p>
          <p>
            {{
              formatSimpleDate(selectedBooking?.start_date, 'D MMMM') +
              ' - ' +
              formatSimpleDate(selectedBooking?.end_date, 'D MMMM')
            }}
          </p>

          <p>
            {{
              `${selectedBooking?.adults} ${$t('variables.adults')} - ${
                selectedBooking?.children
              } ${$t('variables.children')}`
            }}
          </p>
        </div>

        <div class="mt-4">
          <p class="font-bold">{{ $t('booking.personal') }}</p>
          <p>{{ $t('booking.name') }}: {{ selectedBooking?.name }}</p>
          <p>{{ $t('booking.phone') }}: {{ selectedBooking?.phone }}</p>
          <p>{{ $t('booking.email') }}: {{ selectedBooking?.email }}</p>
        </div>

        <p class="text-end">
          {{ $t('booking.totalPrice') }}:
          <span class="text-primary font-bold"
            >{{ selectedBooking?.final_price }}€</span
          >
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from '../../../api/axios'
import { formatSimpleDate } from '../../../helpers/dates'
import { useConfirm } from 'primevue/useconfirm'
import { FilterMatchMode } from 'primevue/api'

definePageMeta({
  layout: 'admin',
})

const dt = ref()
const bookings = ref()
const selectedBooking = ref(null)

const filters = ref()

const confirm = useConfirm()

const handleBookingCancel = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to proceed?',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'btn bg-gray-500',
    acceptClass: 'btn bg-red-500',
    rejectLabel: 'Back',
    acceptLabel: 'Cancel',
    accept: () => {
      cancelBooking(id)
    },
    reject: () => {
      //
    },
  })
}

const exportCSV = () => {
  dt.value.exportCSV()
}

async function cancelBooking(id) {
  await axios.delete('/bookings/' + id)
  const index = bookings.value.findIndex((b) => b.id == id)

  bookings.value[index].canceled = true
}

async function restoreBooking(id) {
  await axios.put('/bookings/' + id)
  const index = bookings.value.findIndex((b) => b.id == id)

  bookings.value[index].canceled = false
}

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  }
}

initFilters()

onMounted(async () => {
  const response = await axios.get('/bookings')
  bookings.value = response.data
})
</script>
