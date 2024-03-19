<template>
  <VueDatePicker v-model="date" locale="ru" :enable-time-picker="false" select-text="Выбрать" cancel-text="Отмена" />
</template>

<script setup>
import { ref } from 'vue';

const date = ref(new Date());
</script>
