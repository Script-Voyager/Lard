<template>
  <div class="filterEmpList">
    <h3 class="filterEmpList-title">Фильтр</h3>
    <form @submit.prevent="submit" class="filterEmpList-form flex">
      <div class="filterEmpList-form-selects flex">
        <div class="filterEmpList-form-selects-country">
          <h4 class="title-select">Гражданство</h4>
          <v-select
            class="filterEmpList-form-selects-country-select filterEmpList-select"
            v-model="country"
            :items="countries"
            item-text="title"
            item-value="id"
            label="Все страны"
          ></v-select>
        </div>

        <div class="filterEmpList-form-selects-gender">
          <h4 class="title-select">Пол</h4>
          <v-select
            class="filterEmpList-form-selects-gender-select filterEmpList-select"
            v-model="gender"
            :items="genders"
            item-text="title"
            item-value="id"
            label="Без разницы"
          ></v-select>
        </div>
      </div>

      <h4 class="title-select">Должность</h4>
      <v-select
        class="filterEmpList-select"
        v-model="position"
        :items="positions"
        item-text="title"
        item-value="id"
        label="Должность"
      ></v-select>

      <ul class="list-reset filterEmpList-form-checkList flex">
        <h4 class="title-select">Тип договора</h4>
        <li
          v-for="contract in typeContracts"
          :key="contract.id"
          class="filterEmpList-form-checkList-item flex"
        >
          <input
            class="filterEmpList-form-checkList-item-input"
            v-model="type_contract"
            type="checkbox"
            :id="`contract-${contract.id}`"
            :name="contract.title"
            :value="contract.id"
          />
          <label
            class="filterEmpList-form-checkList-item-lable"
            :for="`contract-${contract.id}`"
            >{{ contract.slug }}</label
          >
        </li>
      </ul>

      <div class="filterEmpList-form-button flex">
        <button
          class="filterEmpList-form-button-submit btn-submit"
          type="submit"
        >
          Добавить
        </button>

        <button
          @click="handleReset"
          class="filterEmpList-form-button-clear btn-clear"
        >
          Очистить
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  genders,
  positions,
  countries,
  typeContracts,
} from "@/data/initialData";

const emit = defineEmits(['filtered-employees']);
const country = ref(null);
const position = ref(null);
const gender = ref(null);
const type_contract = ref([]);

const submit = () => {
  const filterData = {
    country: country.value,
    position: position.value,
    gender: gender.value,
    type_contract: type_contract.value,
  }
  emit('filtered-employees', filterData);
};

const handleReset = () => {
  country.value = null;
  position.value = null;
  gender.value = null;
  type_contract.value = [];
};
</script>

<style>
.title-select {
  font-weight: 500;
  font-size: 15px;
  line-height: 120%;
  color: #041423;
}

.filterEmpList {
  padding: 30px 30px 0;
}

.filterEmpList-title {
  margin-bottom: 20px;
}

.filterEmpList-form {
  flex-direction: column;
}

.filterEmpList-form-selects {
  justify-content: space-between;
  gap: 20px;
}

.filterEmpList-form-selects-country,
.filterEmpList-form-selects-gender {
  width: 50%;
}

.filterEmpList-select {
  margin-top: 10px;
}

.filterEmpList-form-checkList {
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dbe4ed;
}

.filterEmpList-form-checkList-item {
  align-items: center;
}

.filterEmpList-form-checkList-item-input {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 12px 16px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.filterEmpList-form-checkList-item-lable {
  font-weight: 400;
  font-size: 15px;
  line-height: 135%;
  color: #041423;
}

.filterEmpList-form-button {
  padding-top: 20px;
  gap: 20px;
  justify-content: space-between;
}

.filterEmpList-form-button-submit,
.filterEmpList-form-button-clear {
  width: 50%;
}
</style>
