<template>
  <footer class="bg-white">
    <div
      class="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8 flex justify-between"
    >
      <div>
        <div>
          <img src="../assets/images/book2stay.png" class="w-20" />
        </div>

        <p class="mt-4 max-w-xs text-gray-500">Book2Stay</p>

        <p class="text-xs text-gray-500">
          &copy; 2024. Book2Stay. All rights reserved.
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4"
      >
        <div>
          <p class="font-medium text-gray-900">Helpful Links</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" class="text-gray-700 transition hover:opacity-75">
                Contact
              </a>
            </li>

            <li>
              <a href="#" class="text-gray-700 transition hover:opacity-75">
                FAQs
              </a>
            </li>

            <li>
              <button
                class="text-gray-700 transition hover:opacity-75"
                @click="showLogin = true"
              >
                Login
              </button>
              <Login
                :modelValue="showLogin"
                @update:modelValue="showLogin = $event"
              />
            </li>
          </ul>
        </div>

        <div>
          <p class="font-medium text-gray-900">Legal</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" class="text-gray-700 transition hover:opacity-75">
                Accessibility
              </a>
            </li>

            <li>
              <a href="#" class="text-gray-700 transition hover:opacity-75">
                Returns Policy
              </a>
            </li>

            <li>
              <a href="#" class="text-gray-700 transition hover:opacity-75">
                Refund Policy
              </a>
            </li>

            <li>
              <a href="#" class="text-gray-700 transition hover:opacity-75">
                Hiring Statistics
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const showLogin = ref(false)
</script>
