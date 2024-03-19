// Employee.js
export class Employee {
  constructor ({ name = '', email = '', country = null, gender = null, position = null, position_id = null, gender_id = null } = {}) {
    this.name = name;
    this.email = email;
    this.country = country; // Это будет объект Country
    this.gender = gender;
    this.position = position;
    this.position_id = position_id;
    this.gender_id = gender_id;
  }
}
