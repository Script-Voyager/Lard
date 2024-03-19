// Utilities
import { defineStore } from 'pinia'
import { Employee } from '@/models/Employee';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: JSON.parse(localStorage.getItem('employees')) || [],
  }),
  getters: {
    getEmployees: (state) => state.employees,
  },
  actions: {
    addEmployee(employeeData) {
      const newEmployee = new Employee(employeeData);
      this.employees.unshift(newEmployee);
      localStorage.setItem('employees', JSON.stringify(this.employees));
    },
  },
})
