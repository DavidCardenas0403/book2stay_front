<script setup lang="ts">
definePageMeta({
    layout: "landing",
});
import logo from "../assets/images/country-club.svg";
const { locale } = useI18n();

const dates = ref()
const guests = ref()

function findProperties() {
    console.log("searching")
}
</script>

<template>
    <!-- <h1 class="bg-primary">{{ $t("bienvenida.dos") }}</h1> -->


    <!-- hero -->
    <section class="hero w-full bg-center bg-cover"
        style="background-image: url('https://i.pinimg.com/originals/b9/11/61/b911615d90cea1302e4d630bbc5414bb.jpg');">
        <div
            class="bg-black bg-opacity-65 h-full w-full flex flex-col justify-center items-center">
            <img :src="logo" alt="Logo" />
            <h1 class="text-white font-bold">Country Club
                Pals</h1>

            <form
                class="md:w-1/2 form gap-3 bg-gray-50 p-3 rounded-lg mt-6">

                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-calendar"></i>
                    </InputGroupAddon>
                    <Calendar v-model="dates"
                        selectionMode="range"
                        :manualInput="false"
                        format="dd/mm/yyyy"
                        placeholder="From - To"
                        class="w-full" />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-users"></i>
                    </InputGroupAddon>
                    <InputNumber v-model="guests" placeholder="Guests"/>
                </InputGroup>

                <Button label="Buscar" @click="findProperties" />
            </form>
        </div>
    </section>
</template>

<style scoped>
.hero {
    height: 800px;
}

.form {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
}
</style>
