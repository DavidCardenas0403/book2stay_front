<template>
    <Dialog
        header="Your book"
        :visible="visible"
        modal
        position="center"
        :style="{ width: '80%', height: '80%' }"
    >
        <form @submit.prevent="submitBooking">
            <div class="p-fluid">
                <div>
                    {{ data }}
                </div>
                <div class="p-field">
                    <label for="name">Name</label>
                    <InputText v-model="formData.name" id="name"></InputText>
                </div>
                <div class="p-field">
                    <label for="phone">Phone</label>
                    <InputText v-model="formData.phone" id="phone"></InputText>
                </div>
                <div class="p-field">
                    <label for="email">Email</label>
                    <InputText v-model="formData.email" id="email"></InputText>
                </div>
                <div class="p-field">
                    <label for="discount_code">Discount Code</label>
                    <InputText
                        v-model="formData.discount_code"
                        id="discount_code"
                    ></InputText>

                    <Button label="validate" @click="validateDiscountCode(formData.discount_code)" />
                    <div v-if="discountData.code" class="text-green-500">Apply {{ discountData.percentage }}%</div>
                    <div v-else-if="discountData.error" class="text-red-500">{{discountData.error}}</div>
                </div>
            </div>
            <Button type="submit" label="Submit"></Button>
        </form>
    </Dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../api/axios";

const { visible, data, property } = defineProps([
    "visible",
    "data",
    "property",
]);

const formData = ref({
    name: "",
    phone: "",
    email: "",
    discount_code: "",
});

const discountData = ref({})

async function validateDiscountCode(code) {
    try {
        const response = await axios.get("/discounts/" + code);
        discountData.value = response.data
    } catch(error) {
        discountData.value = {error: error.response.data.error}
    }


}

async function submitBooking() {
    try {
        // Enviar los datos al endpoint de reservas
        const response = await axios.post("/bookings", {
            ...formData.value,
            adults: data.adults,
            children: data.children,
            property_id: property?.id,
            start_date: data.dates[0],
            end_date: data.dates[1],
        });
        console.log("Booking created:", response.data);
        // Cerrar el modal después de enviar la reserva
        // modalData.value.visible = false;
    } catch (error) {
        console.error("Error creating booking:", error);
    }
}
</script>
