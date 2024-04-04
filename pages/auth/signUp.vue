<template>

    <div class="bg-white dark:bg-gray-900">
        <div class="flex justify-center h-screen">
            <div class="hidden lg:block lg:w-2/3 relative">
                <img src="../../assets/images/IMG_9050.JPG" alt="background image"
                    class="absolute inset-0 w-full h-full object-cover">

                <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-30 relative z-10">
                </div>
            </div>


            <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div class="flex-1">
                    <div class="text-center">
                        <div class="flex justify-center mx-auto">
                            <img class="w-auto h-60 sm:h-50" src="../../assets/images/country-club.svg" alt="">
                        </div>

                        <p class="mt-3 text-gray-500 dark:text-gray-300">{{ $t('signup.create') }}</p>
                    </div>

                    <div class="mt-8">
                        <form>

                            <div class="mt-6">

                                <FloatLabel>
                                    <InputText v-model="name"
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    <label for="name">{{ $t('variables.name') }}</label>
                                </FloatLabel>
                            </div>

                            <div class="mt-6">
                                <FloatLabel>
                                    <InputText type="email" v-model="email"
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    <label for="email">{{ $t('variables.email') }}</label>
                                </FloatLabel>
                            </div>
                            <div class="mt-6">
                                <FloatLabel>
                                    <Password v-model="password" toggleMask class="w-full" id="password"
                                        inputClass="block w-full text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    <label for="password">{{ $t('variables.password') }}</label>
                                </FloatLabel>

                            </div>
                            <div class="mt-6">
                                <FloatLabel>
                                    <Password v-model="confirmPassword" toggleMask :feedback="false" class="w-full"
                                        id="confirmPassword"
                                        inputClass="block w-full text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    <label for="confirmPassword">{{ $t('signup.repeat') }}</label>
                                </FloatLabel>

                            </div>

                            <p v-if="password !== '' && confirmPassword !== '' && password !== confirmPassword"
                                style="color: red;">{{ $t('signup.equal') }}</p>


                            <div class="mt-6">
                                <Button type="submit" :label="$t('login.login')"
                                    class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50" />
                            </div>

                            <div
                                class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                                <p class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    OR
                                </p>
                            </div>

                            <a href="#"
                                class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <div class="px-4 py-2">
                                    <svg class="w-6 h-6" viewBox="0 0 40 40">
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#FFC107" />
                                        <path
                                            d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                            fill="#FF3D00" />
                                        <path
                                            d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                            fill="#4CAF50" />
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#1976D2" />
                                    </svg>
                                </div>

                                <span class="w-5/6 px-4 py-3 font-bold text-center">{{ $t('login.oauth') }}</span>
                            </a>
                        </form>

                        <p class="mt-6 text-sm text-center text-gray-400">{{ $t('signup.noAccount') }}<a href="login"
                                class="text-blue-500 focus:outline-none focus:underline hover:underline">{{
                            $t('login.login') }}</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<script setup>
const { locale } = useI18n();
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
</script>