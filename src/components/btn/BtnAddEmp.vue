<template>
  <div class="btnAddEmp flex">
    <button @click.prevent="dialogModal = true" class="btnAddEmp-btn flex">
      Добавить нового сотрудника
    </button>
    <v-dialog v-model="dialogModal" width="auto">
      <div class="modal flex">
        <div class="modal-btn">
          <button @click.prevent="closeModal" class="modal-btn-close">
            <svg
              class="modal-btn-close-svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33334 11.8333L0.166672 10.6667L4.83334 5.99999L0.166672 1.33332L1.33334 0.166656L6 4.83332L10.6667 0.166656L11.8333 1.33332L7.16667 5.99999L11.8333 10.6667L10.6667 11.8333L6 7.16666L1.33334 11.8333Z"
                fill="#37515B"
              />
            </svg>
          </button>
        </div>
        <h3 class="modal-title">Заполните форму сотрудника</h3>
        <form @submit.prevent="submit" class="modal-form flex">
          <v-text-field
            v-model="full_name.value.value"
            :error-messages="full_name.errorMessage.value"
            label="ФИО*"
          ></v-text-field>
          <div class="modal-form-box-info flex">
            <v-text-field
              v-model="inn.value.value"
              :error-messages="inn.errorMessage.value"
              label="ИНН*"
            ></v-text-field>

            <VueDatePicker
              class="modal-form-box-info-birthday"
              v-model="birthDate"
              locale="ru"
              :enable-time-picker="false"
              placeholder="Дата рождения"
              select-text="Выбрать"
              cancel-text="Отмена"
              :format="format"
            />

            <v-text-field v-model="age" label="Возраст*"></v-text-field>
          </div>
          <v-text-field
            v-model="address.value.value"
            :error-messages="address.errorMessage.value"
            label="Адрес*"
          ></v-text-field>

          <div class="modal-form-select-item flex">
            <v-select
              v-model="country.value.value"
              :error-messages="country.errorMessage.value"
              :items="countries"
              item-text="title"
              item-value="id"
              label="Страна"
            ></v-select>
            <v-select
              v-model="gender.value.value"
              :error-messages="gender.errorMessage.value"
              :items="genders"
              item-text="title"
              item-value="id"
              label="Пол"
            ></v-select>
            <v-select
              v-model="staffTag.value.value"
              :error-messages="staffTag.errorMessage.value"
              :items="staffTags"
              item-text="title"
              item-value="id"
              label="Тег сотрудника"
            ></v-select>
          </div>
          <div class="modal-form-select-item flex">
            <v-select
              v-model="position.value.value"
              :error-messages="position.errorMessage.value"
              :items="positions"
              item-text="title"
              item-value="id"
              label="Должность"
            ></v-select>
            <v-select
              v-model="type_contract.value.value"
              :error-messages="type_contract.errorMessage.value"
              :items="typeContracts"
              item-text="title"
              item-value="id"
              label="Тип контракта"
            ></v-select>
          </div>

          <div class="modal-form-button">
            <button
              class="me-4 modal-form-button-submit btn-submit"
              type="submit"
            >
              Добавить
            </button>

            <button
              @click="handleReset"
              class="modal-form-button-clear btn-clear"
            >
              Очистить
            </button>
          </div>
        </form>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import {
  countries,
  genders,
  positions,
  typeContracts,
  staffTags,
} from "@/data/initialData";
import { Employee } from "@/models/Employee";

const emit = defineEmits(["add-newEmployee"]);
const dialogModal = ref(false);

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    full_name(value) {
      if (value?.length >= 2) return true;

      return "Необходимо заполнить поле!";
    },
    inn(value) {
      if (value?.length === 10 && /^[0-9]+$/.test(value)) return true;

      return "Необходимо заполнить поле!";
    },
    address(value) {
      if (value?.length >= 2) return true;

      return "Необходимо заполнить поле!";
    },
    // age(value) {
    //   if (/^[0-9]+$/.test(value)) return true;

    //   return "Необходимо заполнить поле!";
    // },
    country(value) {
      if (value) return true;

      return "Необходимо выбрать страну!";
    },
    type_contract(value) {
      if (value) return true;

      return "Необходимо выбрать тип договора!";
    },
    gender(value) {
      if (value) return true;

      return "Необходимо выбрать пол!";
    },
    position(value) {
      if (value) return true;

      return "Необходимо выбрать должность!";
    },
    staffTag(value) {
      if (value) return true;

      return "Необходимо выбрать Тег!";
    },
  },
});

const full_name = useField("full_name");
const inn = useField("inn");
const address = useField("address");
const birthDate = ref();
const date_birth = ref("");
const age = ref("");
const country = useField("country");
const gender = useField("gender");
const position = useField("position");
const type_contract = useField("type_contract");
const staffTag = useField("staffTag");

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const todayDate = new Date();
  const today = todayDate.getDate();
  const toMonth = todayDate.getMonth();
  const toYear = todayDate.getFullYear();

  let ageNow = toYear - year;
  if (toMonth < month || (toMonth === month && today < day)) {
    ageNow--;
  }

  const formattedDate = `${day < 10 ? `0${day}` : day}.${
    month < 10 ? `0${month}` : month
  }.${year}`;
  age.value = ageNow;
  date_birth.value = formattedDate;
  return `${day}.${month}.${year}`;
};

const submit = handleSubmit((data) => {
  const employeeData = new Employee({
    full_name: data.full_name,
    inn: data.inn,
    address: data.address,
    date_birth: date_birth.value,
    age: age.value,
    country: countries.find((c) => c.id === data.country) || {},
    country_id: data.country,
    gender: genders.find((g) => g.id === data.gender) || {},
    gender_id: data.gender,
    position: positions.find((p) => p.id === data.position) || {},
    position_id: data.position,
    type_contract:
      typeContracts.find((tc) => tc.id === data.type_contract) || {},
    type_contract_id: data.type_contract,
    status: {
      tag_id: data.staffTag,
      tag: staffTags.find((st) => st.id === data.staffTag) || {},
      description: data.staffTag,
    },
  });
  emit("add-newEmployee", employeeData);
  dialogModal.value = false;
  date_birth.value = '';
  age.value = '',
  handleReset();
});

const closeModal = () => {
  dialogModal.value = false;
  date_birth.value = '';
  age.value = '',
  handleReset();
};
</script>

<style>
.btnAddEmp {
  justify-content: center;
  align-items: center;
  padding: 0 30px 30px;
  border-bottom: 1px solid #dbe4ed;
}

.btnAddEmp-btn {
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 20px 34px;
  width: 100%;

  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: #fff;

  box-shadow: 0 10px 20px 0 rgba(0, 182, 237, 0.2);
  background: #00b6ed;
}

.btnAddEmp-btn::before {
  display: inline-block;
  content: "";
  width: 21px;
  height: 20px;
  margin-right: 10px;

  background-image: url("/img/icons/Icon_add.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

/* modal */

.modal {
  flex-direction: column;
  width: 70vh;
  padding: 30px;
  background-color: #fff;
}

.modal-btn {
  align-self: flex-end;
  margin-bottom: 20px;
}

.modal-title {
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 26px;
  line-height: 120%;
  color: #041423;
}

.modal-btn-close-svg {
  width: 20px;
  height: 20px;
}

.modal-form {
  flex-direction: column;
  /* gap: 5px; */
}

.modal-form-box-info {
  gap: 10px;
}

.modal-form-box-info-birthday {
  width: 30%;
}

.dp__input {
  padding: 15px 0 16px 40px;
  background-color: #dfe8ea;
  border-bottom: 1px solid gray;
}

.modal-form-select-item {
  max-width: 100%;
  gap: 10px;
}

.modal-form-button {
  align-self: center;
}

</style>
