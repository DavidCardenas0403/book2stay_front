<template>
  <header
    :class="{
      'fixed top-0 left-0 w-full': isFixed,
      'border-b': !isFixed,
      'bg-white transition duration-300 ease-in-out': isScrolled,
      'bg-opacity-70 transition duration-300 ease-in-out': !isScrolled,
    }"
    class="flex items-center justify-between px-6 py-4 z-50 mb-10"
  >
    <div>
      <a href="/">
        <div class="flex items-center">
          <img :src="logo" alt="Logo de la empresa" class="w-20" />
          <h1
            :class="{
              'text-black': isScrolled || isFixed,
              'text-white': !isScrolled && isFixed,
            }"
            class="text-lg font-semibold pl-5 transition-colors duration-300 ease-in-out"
          >
            Country Club Pals
          </h1>
        </div>
      </a>
    </div>

    <!-- Botón de menú para dispositivos móviles -->
    <button @click="toggleMenu" class="block md:hidden">
      <svg
        class="h-6 w-6"
        fill="none"
        :class="{
          ' stroke-black': isScrolled || isFixed,
          ' stroke-white': !isScrolled && isFixed,
        }"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>

    <!-- Menú principal -->
    <div class="hidden md:flex items-center gap-6">
      <a
        href="/properties"
        :class="{
          'text-black': isScrolled || isFixed,
          'text-white': !isScrolled && isFixed,
        }"
        class="font-semibold transition-colors duration-300 ease-in-out hover:text-primary-hover"
      >
        {{$t("property.apartmentList")}}
      </a>

      <a
        href="/find-booking"
        :class="{
          'text-black': isScrolled || isFixed,
          'text-white': !isScrolled && isFixed,
        }"
        class="font-semibold transition-colors duration-300 ease-in-out hover:text-primary-hover"
      >
        {{$t("booking.findBooking")}}
      </a>

      <LangSwitcher
        :class="{
          'text-black': isScrolled || isFixed,
          'text-white': !isScrolled && isFixed,
          'hover:bg-black': isScrolled || isFixed,
          'hover:text-white': isScrolled,
        }"
        class="bg-transparent border border-solid hover:bg-white hover:text-black transition-colors duration-300 ease-in-out flex items-center px-3 py-2"
      />
    </div>

    <!-- Menú desplegable para dispositivos móviles -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden absolute top-0 right-0 bg-white w-full p-4 z-50"
    >
      <a href="/properties" class="block py-2">{{$t("property.apartmentList")}}</a>
      <a href="/booking" class="block py-2">{{$t("booking.findBooking")}}</a>
      <LangSwitcher
        
        class="bg-transparent border border-solid w-52 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out flex items-center px-3 py-2"
      />
      
      <!-- Icono de cruz para cerrar el menú móvil -->
      <button @click="toggleMenu" class="absolute  top-4 right-5 p-2">
        <svg
          class="h-6 w-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Capa transparente para cerrar el menú móvil al hacer clic fuera de él -->
    <div
      v-if="mobileMenuOpen"
      @click="toggleMenu"
      class="md:hidden fixed inset-0 bg-black opacity-25 z-40"
    ></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import logo from "../assets/images/country-club.svg";
import Login from "./Login.vue";

let showLogin = ref(false);

const props = defineProps({
  isFixed: {
    type: Boolean,
    default: true,
  },
});

const openLoginModal = () => {
  showLogin.value = true;
  console.log(showLogin.value);
};

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
