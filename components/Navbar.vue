<script setup>
import { capitalizeFirstLetter } from "../helpers/index.js";
import catalan from "../assets/images/catalan.svg";
import logo from "../assets/images/country-club.svg";
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

function selectLanguage(language) {
  selectedLanguage.value = language;
}

const selectedLanguage = ref(locale.value);
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <nuxt-link
        :to="localePath('/')"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img :src="logo" class="h-8" alt="Country Club Pals Logo" />
      </nuxt-link>
      <div
        class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse"
      >
        <button
          type="button"
          data-dropdown-toggle="language-dropdown-menu"
          class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <!-- <img :src="selectedLanguage" alt="Bandera del lenguaje" /> -->
          <svg
            class="w-5 h-5 rounded-full me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3900 3900"
          >
            <path fill="#b22234" d="M0 0h7410v3900H0z" />
            <path
              d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
              stroke="#fff"
              stroke-width="300"
            />
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            <g fill="#fff">
              <g id="d">
                <g id="c">
                  <g id="e">
                    <g id="b">
                      <path
                        id="a"
                        d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                      />
                      <use xlink:href="#a" y="420" />
                      <use xlink:href="#a" y="840" />
                      <use xlink:href="#a" y="1260" />
                    </g>
                    <use xlink:href="#a" y="1680" />
                  </g>
                  <use xlink:href="#b" x="247" y="210" />
                </g>
                <use xlink:href="#c" x="494" />
              </g>
              <use xlink:href="#d" x="988" />
              <use xlink:href="#c" x="1976" />
              <use xlink:href="#e" x="2470" />
            </g>
          </svg>
          {{ capitalizeFirstLetter($t("languages.english")) }}
        </button>
        <!-- Dropdown -->
        <div
          class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          id="language-dropdown-menu"
        >
          <ul class="py-2 font-medium" role="none">
            <li @click="changeLanguage('english')">
              <nuxt-link
                :to="switchLocalePath('en')"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-us"
                    viewBox="0 0 512 512"
                  >
                    <g fill-rule="evenodd">
                      <g stroke-width="1pt">
                        <path
                          fill="#bd3d44"
                          d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                        <path
                          fill="#fff"
                          d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                      </g>
                      <path
                        fill="#192f5d"
                        d="M0 0h98.8v70H0z"
                        transform="scale(3.9385)"
                      />
                      <path
                        fill="#fff"
                        d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                        transform="scale(3.9385)"
                      />
                    </g>
                  </svg>
                  {{ capitalizeFirstLetter($t("languages.english")) }}
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="switchLocalePath('nl')"
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    class="h-3.5 w-3.5 rounded-full me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-de"
                    viewBox="0 0 512 512"
                  >
                    <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                    <path d="M0 0h512v170.7H0z" />
                    <path fill="#d00" d="M0 170.7h512v170.6H0z" />
                  </svg>
                  {{ capitalizeFirstLetter($t("languages.dutch")) }}
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="switchLocalePath('es')"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    class="h-3.5 w-3.5 rounded-full me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-it"
                    viewBox="0 0 512 512"
                  >
                    <g fill-rule="evenodd" stroke-width="1pt">
                      <path fill="#fff" d="M0 0h512v512H0z" />
                      <path fill="#009246" d="M0 0h170.7v512H0z" />
                      <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
                    </g>
                  </svg>
                  {{ capitalizeFirstLetter($t("languages.spanish")) }}
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="switchLocalePath('ca')"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <img class="logo" :src="catalan" alt="" />
                  {{ capitalizeFirstLetter($t("languages.catalan")) }}
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="switchLocalePath('fr')"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    class="h-3.5 w-3.5 rounded-full me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    id="flag-icon-css-cn"
                    viewBox="0 0 512 512"
                  >
                    <defs>
                      <path
                        id="a"
                        fill="#ffde00"
                        d="M1-.3L-.7.8 0-1 .6.8-1-.3z"
                      />
                    </defs>
                    <path fill="#de2910" d="M0 0h512v512H0z" />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(76.8 0 0 76.8 128 128)"
                      xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-121 142.6 -47) scale(25.5827)"
                      xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-98.1 198 -82) scale(25.6)"
                      xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-74 272.4 -114) scale(25.6137)"
                      xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(16 -19.968 19.968 16 256 230.4)"
                      xlink:href="#a"
                    />
                  </svg>
                  {{ capitalizeFirstLetter($t("languages.french")) }}
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-language"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-language"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-language"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >About</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >Services</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >Pricing</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style type="text/css">
.st0 {
  fill: #ffffff;
}
.st1 {
  fill: #c60c30;
}
.st2 {
  fill: #003478;
}
.st3 {
  fill: #ff9933;
}
.st4 {
  fill: #128807;
}
.st5 {
  fill: #000088;
}
.st6 {
  fill: #032774;
}
.st7 {
  fill: #df0333;
}
.st8 {
  fill: #ee2b2c;
}
.st9 {
  fill: #032767;
}
.st10 {
  fill: #006747;
}
.st11 {
  fill: #cd1225;
}
.st12 {
  fill: #fbc942;
}
.st13 {
  fill: #bd9b37;
}
.st14 {
  fill: #9ba068;
}
.st15 {
  fill: #707633;
}
.st16 {
  fill: #006748;
}
.st17 {
  fill: #cc2029;
}
.st18 {
  fill: #30c1db;
}
.st19 {
  fill: #f7c740;
}
.st20 {
  fill: #0c72a6;
}
.st21 {
  fill: #f8a952;
}
.st22 {
  fill: #943120;
}
.st23 {
  fill: #231f20;
}
.st24 {
  fill: #0b8388;
}
.st25 {
  fill: #8bbdbe;
}
.st26 {
  fill: #05534e;
}
.st27 {
  fill: none;
  stroke: #39b54a;
  stroke-width: 0.25;
  stroke-miterlimit: 10;
}
.st28 {
  fill: none;
  stroke: #00a651;
  stroke-miterlimit: 10;
}
.st29 {
  fill: none;
  stroke: #00a651;
  stroke-width: 0.5;
  stroke-miterlimit: 10;
}
.st30 {
  fill: url(#SVGID_1_);
}
.st31 {
  fill: url(#SVGID_2_);
}
.st32 {
  fill: url(#SVGID_3_);
}
.st33 {
  fill: url(#SVGID_4_);
}
.st34 {
  fill: url(#SVGID_5_);
}
.st35 {
  fill: url(#SVGID_6_);
}
.st36 {
  fill: url(#SVGID_7_);
}
.st37 {
  fill: url(#SVGID_8_);
}
.st38 {
  fill: url(#SVGID_9_);
}
.st39 {
  fill: url(#SVGID_10_);
}
.st40 {
  fill: url(#SVGID_11_);
}
.st41 {
  fill: url(#SVGID_12_);
}
.st42 {
  fill: url(#SVGID_13_);
}
.st43 {
  fill: url(#SVGID_14_);
}
.st44 {
  fill: url(#SVGID_15_);
}
.st45 {
  fill: #f8c73e;
}
.st46 {
  fill: #77722f;
}
.st47 {
  fill: #a7ab71;
}
.st48 {
  fill: #949457;
}
.st49 {
  fill: #ae6f2a;
}
.st50 {
  fill: #fff200;
}
.st51 {
  fill: #c5c6a6;
}
.st52 {
  fill: #a3a395;
}
.st53 {
  fill: #4c2915;
}
.st54 {
  fill: #8e4520;
}
.st55 {
  fill: #d1a467;
}
.st56 {
  fill: #aa6c2a;
}
.st57 {
  fill: #daac6d;
}
.st58 {
  fill: #8f4620;
}
.st59 {
  fill: #bc7e2f;
}
.st60 {
  fill: #e6e7e8;
}
.st61 {
  fill: #f06d19;
}
.st62 {
  fill: #19b43d;
}
.st63 {
  fill: #07a3dc;
}
.st64 {
  fill: #fbd023;
}
.st65 {
  fill: #ec2938;
}
.st66 {
  fill: #f9df47;
}
.st67 {
  fill: #0967c4;
}
.st68 {
  fill: #c5a310;
}
.st69 {
  clip-path: url(#SVGID_17_);
}
.st70 {
  fill: #6fd7f2;
}
.st71 {
  clip-path: url(#SVGID_19_);
}
.st72 {
  fill: #ff0303;
}
.st73 {
  fill: #ff6407;
}
.st74 {
  fill: #fdfe1f;
}
.st75 {
  fill: #00fe1e;
}
.st76 {
  fill: #08ccfe;
}
.st77 {
  fill: #120ffd;
}
.st78 {
  fill: #810480;
}
.st79 {
  fill: #0642a1;
}
.st80 {
  fill: #02275f;
}
.st81 {
  fill: #80a0d1;
}
.st82 {
  fill: #fb3b3a;
}
.st83 {
  fill: #ff0302;
}
.st84 {
  fill: #520200;
}
.st85 {
  fill: #940101;
}
.st86 {
  clip-path: url(#SVGID_21_);
}
.st87 {
  fill: #91bb35;
}
.st88 {
  fill: #ece62b;
}
.st89 {
  fill: #c5ca2c;
}
.st90 {
  fill: #95c82b;
}
.st91 {
  fill: #009d4a;
}
.st92 {
  fill: #bf0a30;
}
.st93 {
  fill: #002868;
}
.st94 {
  fill: #028832;
}
.st95 {
  fill: #fbdc1d;
}
.st96 {
  fill: #d91219;
}
.st97 {
  fill: #0738a6;
}
.st98 {
  fill: #fd0302;
}
.st99 {
  fill: #060593;
}
.st100 {
  fill: #115ead;
}
.st101 {
  fill: #c50c1e;
}
.st102 {
  fill: #fec315;
}
.st103 {
  fill: #c7b011;
}
.st104 {
  fill: #ac1518;
}
.st105 {
  fill: #028e6e;
}
.st106 {
  fill: #cbcbcb;
}
.st107 {
  fill: #095bbd;
}
.st108 {
  fill: #c7b013;
}
.st109 {
  fill: #00aeef;
}
.st110 {
  fill: #c7b112;
}
.st111 {
  fill: #fed592;
}
.st112 {
  fill: #028d6e;
}
.st113 {
  fill: #c7b012;
}
.st114 {
  fill: #c6b011;
}
.st115 {
  fill: #103bee;
}
.st116 {
  fill: #db4445;
}
.st117 {
  fill: #ec72a9;
}
.st118 {
  fill: #006133;
}
.st119 {
  fill: #d11133;
}
.st120 {
  fill: #042b7d;
}
.st121 {
  fill: #fec527;
}
.st122 {
  fill: #bf920d;
}

.logo {
  height: 20px;
  width: 30px;
}
</style>
