export class Employee {
  constructor({
    full_name = '',
    inn = null,
    address = '',
    date_birth = '',
    age = null,
    type_contract = null,
    type_contract_id = null,
    gender = null,
    gender_id = null,
    country = null,
    country_id = null,
    position = null,
    position_id = null,
    status = null,
  }) {
    this.full_name = full_name;
    this.inn = inn;
    this.address = address;
    this.date_birth = date_birth;
    this.age = age;
    this.type_contract = type_contract;
    this.type_contract_id = type_contract_id;
    this.gender = gender;
    this.gender_id = gender_id;
    this.country = country;
    this.country_id = country_id;
    this.position = position;
    this.position_id = position_id;
    this.status = status;
  }
}
