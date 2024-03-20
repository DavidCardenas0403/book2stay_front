<template>
    <div class="flex justify-center items-center h-screen flex-col space-y-6">
        <div>
            <FloatLabel>
                <InputText id="username" v-model="username" />
                <label for="username">Username</label>
            </FloatLabel>
        </div>
        <div>
            <FloatLabel>
                <InputText v-model="email" type="email" />
                <label for="email">Email</label>
            </FloatLabel>
        </div>
        <div>
            <!-- <FloatLabel> -->

            <Password v-model="password1">
                <template #header>
                    <h6>Pick a password</h6>
                </template>
                <template #footer>
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 8 characters</li>
                    </ul>
                </template>
            </Password>
            <!-- <label for="email">Password</label> -->
        <!-- </FloatLabel> -->

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const email = ref('');
</script>