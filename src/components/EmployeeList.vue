<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <div class="employeeList">
          <div class="employeeList-search">
            <v-autocomplete
              v-model="searchEmployee"
              :items="searchList"
              class="mx-auto"
              density="comfortable"
              label="Поиск сотрудника"
              menu-icon=""
              style="max-width: 100%"
              theme="light"
              variant="solo"
              auto-select-first
              append-inner-icon="mdi-magnify"
            ></v-autocomplete>
            <span class="employeeList-search-lable"
              >Например: Ивано Иван</span
            >
          </div>
          <div class="employeeList-content flex">
            <h2 class="employeeList-content-title">Список сотрудников</h2>
            <BtnTagList @filtered-tag="filteredTags" />
            <EmpList :employee-list="visibleEmployee" />
            <div class="employeeLiat-content-showMore">
              <button
                v-if="showMoreBtn"
                @click.prevent="showMore()"
                class="employeeLiat-content-showMore-btn flex"
              >
                Показать еще
              </button>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="sidebar">
          <BtnAddEmp @add-newEmployee="addNewEmployee" />
          <FilterEmpList @filtered-employees="filteredEmployees" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import BtnTagList from "./btn/BtnTagList.vue";
import EmpList from "./List/EmpList.vue";
import { useEmployeeStore } from "@/stores/employees";
import BtnAddEmp from "./btn/BtnAddEmp.vue";
import FilterEmpList from "./Filter/FilterEmpList.vue";

const employeeStore = useEmployeeStore();
const visibleCount = ref(4);
const tagsId = ref([1]);
const filterData = ref(null);
const searchEmployee = ref('');

const searchList = computed(() =>
  employeeStore.getEmployees.map((emp) => emp.full_name)
);
const employeeList = computed(() => {
  let filteredList = employeeStore.getEmployees;

  if (filterData.value !== null) {
    filteredList = filteredList.filter(
      (emp) =>
        (filterData.value.country === null ||
          emp.country_id === filterData.value.country) &&
        (filterData.value.gender === null ||
          emp.gender_id === filterData.value.gender) &&
        (filterData.value.position === null ||
          emp.position_id === filterData.value.position) &&
        (filterData.value.type_contract.length === 0 ||
          filterData.value.type_contract.includes(emp.type_contract_id))
    );
  }

  if (!tagsId.value.includes(1) || tagsId.value.length > 1) {
    filteredList = filteredList.filter((item) =>
      tagsId.value.includes(item.status.tag_id)
    );
  }

  if (searchEmployee.value !== '' && searchEmployee.value !== null) {
    filteredList = filteredList.filter((emp) => emp.full_name === searchEmployee.value);
  }

  return filteredList;
});
const visibleEmployee = computed(() =>
  employeeList.value.slice(0, visibleCount.value)
);

const showMoreBtn = computed(
  () => visibleCount.value < employeeList.value.length
);

const addNewEmployee = (newEmployee) => {
  employeeStore.addEmployee(newEmployee);
};

const showMore = () => {
  visibleCount.value += 4;
};

const filteredTags = (tags) => {
  tagsId.value = tags;
};

const filteredEmployees = (data) => {
  filterData.value = data;
};
</script>

<style>
/* glob */
.list-reset {
  list-style: none;
}

.flex {
  display: flex;
}

.v-col-8,
.v-col-4 {
  padding: 15px !important;
}

/* employee-list */

.employeeList {
  padding: 20px 0;
  background: #fff;
}

.v-field {
  background: #e8f1f4;
  border-radius: 4px;
}

.employeeList-search {
  border-bottom: 1px solid #dbe4ed;
  padding: 0px 30px 30px 30px;
}

.employeeList-search-lable {
  font-weight: 400;
  font-size: 13px;
  line-height: 120%;
  color: #b0bcc7;
}

.employeeList-content {
  flex-direction: column;
  padding: 30px 40px;
}

.employeeList-content-title {
  margin-bottom: 20px;
}

.employeeLiat-content-showMore {
  align-self: center;
}

.employeeLiat-content-showMore-btn {
  text-align: center;
  align-items: center;
  border: 1px solid #2a358c;
  border-radius: 4px;
  padding: 14px 24px;

  font-weight: 500;
  font-size: 15px;
  line-height: 120%;
  color: #2a358c;
}

.employeeLiat-content-showMore-btn::before {
  display: inline-block;
  content: "";
  width: 16px;
  height: 16px;
  margin-right: 11px;
  background-image: url("/img/icons/showMore.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* sidebar */

.sidebar {
  padding: 30px 0;
  background-color: #fff;
}

/* btn */

.btn-submit {
  border-radius: 4px;
  padding: 14px 24px;

  box-shadow: 0 10px 20px 0 rgba(0, 174, 91, 0.2);
  background: #00ae5b;

  font-weight: 500;
  font-size: 15px;
  line-height: 80%;
  color: #fff;
}

.btn-clear {
  border-radius: 4px;
  padding: 14px 24px;

  box-shadow: 0 10px 20px 0 rgba(106, 117, 127, 0.2);
  background: #84909b;

  font-weight: 500;
  font-size: 15px;
  line-height: 80%;
  color: #fff;
}
</style>
