<template>
  <div class="card flex justify-content-center">
    <Dialog
      class="rounded-none"
      :visible="visible"
      @update:visible="visible = $event"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
      }"
    >
      <template #container="{ closeCallback }">
        <form @submit.prevent="handleLogin">
          <div class="flex flex-col md:w-96 px-5 py-5 pb-10 gap-4 items-center">
            <button type="button" @click="closeLoginModal" class="self-end">
              <svg
                class="w-8 h-8 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>

            <img src="~/assets/images/country-club.svg" class="w-auto" alt="" />
            <div class="mt-2">
              <FloatLabel class="mt-2">
                <InputText
                  type="email"
                  v-model="email"
                  class="text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-none dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label for="email">{{ $t("variables.email") }}</label>
              </FloatLabel>
            </div>
            <div class="mt-2">
              <FloatLabel>
                <InputText
                  type="password"
                  v-model="password"
                  class="placeholder-gray-400 bg-white border border-gray-200 rounded-none dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label for="email">{{ $t("variables.password") }}</label>
              </FloatLabel>
              <a
                href="#"
                class="text-sm text-gray-400 focus:text-primary-focus hover:text-primary-hover hover:underline"
              >
                {{ $t("login.forgotPassword") }}
              </a>
            </div>

            <div class="mt-2">
              <Button
                type="submit"
                :label="$t('login.login')"
                class="bg-primary-normal hover:bg-primary-hover rounded-none border-primary-normal"
              />
            </div>

            <!-- <div
              class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
              <p class="mx-4 mb-0 text-center font-bold dark:text-neutral-200">
                OR
              </p>
            </div>
            <div class="flex justify-center items-center color-scheme: auto">
              <GoogleSignInButton  @success="handleLoginSuccess" @error="handleLoginError" class="shadow-lg"/>
            </div>     -->
          </div>
        </form>
        <!-- <p class="mb-6 text-sm text-center text-gray-400">
              {{ $t('login.noAccount')
              }}<a
                class="text-blue-500 focus:outline-none focus:underline hover:underline"
                >{{ $t('variables.signUp') }}</a
              >.
            </p> -->
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { login } from "~/api/auth/login.js";
import { ref, onMounted, onUnmounted } from "vue";

// import { showLoginModal } from '~/middleware/auth';

const email = ref("");
const password = ref("");

let visible = ref(false);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isFixed: {
    type: Boolean,
    default: true,
  },
});

watchEffect(() => {
  visible.value = props.modelValue;
});

const closeLoginModal = () => {
  visible.value = false;
  emit("update:modelValue", false); // Restablecer el valor de showLogin a false
};
const showLoginModal = () => {
  visible.value = true;
  emit("update:modelValue", true); // Restablecer el valor de showLogin a false
};

const emit = defineEmits(["update:modelValue"]);

const handleKeyup = (event) => {
  if (event.key === "Escape") {
    console.log("press");
    closeLoginModal();
  }
};

onMounted(() => {
  window.addEventListener("keyup", handleKeyup);
});

onUnmounted(() => {
  window.removeEventListener("keyup", handleKeyup);
});

const handleLogin = async () => {
  // Aquí puedes llamar a la función checkLogin pasando email y password como argumentos
  console.log(email.value);
  console.log(password.value);
  try {
    const loggedIn = await login(email.value, password.value);
    if (loggedIn) {
      if (process.client)
        localStorage.setItem("userInfo", JSON.stringify(loggedIn));
      console.log("SI");
      console.log(loggedIn);
      navigateTo("/admin");
      // Aquí puedes redirigir al usuario a la página de inicio de sesión exitosa
    } else {
      console.log("NO");
      showLoginModal();
      console.log(loggedIn);
      // Aquí puedes manejar el caso en el que el inicio de sesión falla
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
  }
};

import { GoogleSignInButton } from "vue3-google-signin";

// handle success event
const handleLoginSuccess = (response) => {
  const { credential } = response;
  console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
