<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <aside
      v-if="sidebar"
      class="bg-gray-900 text-gray-50 shadow-md md:w-96 md:min-h-screen flex flex-col gap-6 p-8"
    >
      <h3 class="font-bold text-xl text-center">Admin</h3>
      <section class="flex flex-col">
        <NuxtLink
          :to="localePath('/admin/properties')"
          class="p-3"
          :class="
            $route.path == '/admin/properties' ? 'bg-white text-gray-900' : ''
          "
        >
          <font-awesome-icon icon="fa-solid fa-house" />
          Properties
        </NuxtLink>
        <NuxtLink
          :to="localePath('/admin/bookings')"
          class="p-3"
          :class="
            $route.path == '/admin/bookings' ? 'bg-white text-gray-900' : ''
          "
        >
          <font-awesome-icon icon="fa-solid fa-calendar" />
          Bookings
        </NuxtLink>
      </section>
    </aside>
    <div class="w-full min-h-screen bg-gray-100 dark:bg-gray-700">
      <header class="bg-gray-900 text-gray-50 shadow p-4 flex justify-between">
        <button @click="sidebar = !sidebar">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
        <div class="flex gap-2">
          <button @click="toggleMenu">
            Hello Dani <font-awesome-icon icon="fa-solid fa-angle-down" />
          </button>

          <ToggleButton
            v-model="lightMode"
            offIcon="pi pi-sun"
            onIcon="pi pi-moon"
            onLabel=""
            offLabel=""
            @change="switchTheme"
            class="w-8 h-8"
          />
        </div>

        <Menu ref="menu" :model="items" :popup="true">
          <template #item="{ item, props }">
            <button class="p-2 w-full">
              <font-awesome-icon :icon="item.icon" />
              {{ item.label }}
            </button>
          </template>
        </Menu>
      </header>
      <main class="p-8 container mx-auto text-black dark:text-white">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const sidebar = ref(true)
const menu = ref()

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

const items = ref([
  {
    label: 'Logout',
    icon: 'fa-solid fa-right-from-bracket',
    command: () => {
      if (process.client) {
        localStorage.removeItem('userInfo')
        console.log('logout')
        navigateTo('/')
      }
    },
  },
])

const lightMode = ref(false)
function switchTheme() {
  document.documentElement.classList.toggle('dark')
}
</script>
