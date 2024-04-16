<template>
  <label
    ><slot /><span v-if="props.required" class="text-red-500 font-normal ms-1"
      >*</span
    >
  </label>
</template>

<script setup>
const props = defineProps({
  required: Boolean,
});
</script>
