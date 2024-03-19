<template>
  <ul class="list-reset employeeList flex">
    <li
      v-for="employee in employeeList"
      :key="employee.id"
      class="employeeList-item flex"
    >
      <div class="employeeList-item-rowUp flex">
        <h3 class="employeeList-item-rowUp-name">{{ employee.full_name }}</h3>
        <h4 class="employeeList-item-rowUp-inn">ИНН: {{ employee.inn }}</h4>
        <h4 class="employeeList-item-rowUp-typeContract">
          {{ employee.type_contract.slug }}
        </h4>
        <h4 class="employeeList-item-rowUp-position">
          {{ employee.position.title }}
        </h4>
      </div>
      <div class="employeeList-item-rowMidle flex">
        <div class="employeeList-item-rowMidle-country border-rowMidle flex">
          <img
            :src="employee.country.icon"
            :alt="employee.country.slug"
            class="employeeList-item-rowMidle-country-img"
          />
          <h4 class="rowMidle-title employeeList-item-rowMidle-country-title">
            {{ employee.country.slug }} {{ employee.country.id }}
          </h4>
        </div>
        <h4
          class="rowMidle-title employeeList-item-rowMidle-address border-rowMidle"
        >
          {{ employee.address }}
        </h4>
        <h4
          class="rowMidle-title employeeList-item-rowMidle-date_birth border-rowMidle"
        >
          Дата рождения: {{ employee.date_birth }}
        </h4>
        <h4
          class="rowMidle-title employeeList-item-rowMidle-age border-rowMidle"
        >
          Возраст: {{ employee.age }}
        </h4>
        <h4 class="rowMidle-title employeeList-item-rowMidle-gender">
          Пол: {{ employee.gender.title }}
        </h4>
      </div>
      <div class="employeeList-item-rowDown">
        <h4 class="employeeList-item-rowDown-status"
        :style="`--status-color: ${employee.status.tag.color}`"
        >{{ employee.status.tag.title }}</h4>
      </div>
    </li>
  </ul>
</template>

<script setup>
const { employeeList } = defineProps({
  employeeList: Array,
});
</script>

<style>

.employeeList {
  flex-direction: column;
  gap: 15px;
}

.employeeList-item {
  flex-direction: column;
  border-radius: 4px;
  padding: 25px;
  background: #e7f3ff;
}

.flexList {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.employeeList-item-rowUp {
  gap: 20px;
  margin-bottom: 16px;
}

.employeeList-item-rowUp-name {
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  color: #2a358c;
}

.employeeList-item-rowUp-inn {
  border-radius: 4px;
  padding: 4px 8px;
  background-color: #fff;

  font-weight: 500;
  font-size: 13px;
  line-height: 120%;
  color: #84909b;
}

.employeeList-item-rowUp-typeContract {
  border-radius: 4px;
  padding: 4px;
  background: #00ae5b;

  font-weight: 600;
  font-size: 13px;
  line-height: 120%;
  color: #fff;
}

.employeeList-item-rowMidle {
  gap: 15px;
  margin-bottom: 16px;
}

.border-rowMidle {
  padding-right: 15px;
  border-right: 1px solid #cedae5;
}

.employeeList-item-rowMidle-country {
  gap: 10px;
  align-items: center;
}

.rowMidle-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #041423;
}

.employeeList-item-rowDown-status {
  display: inline-block;
  border-radius: 4px;
  padding: 4px 8px;
  background: var(--status-color);
  color: #fff;

  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: #fff;
}
</style>
