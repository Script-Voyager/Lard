import { Country } from "@/models/country";
import { Gender } from "@/models/gender";
import { Position } from "@/models/position";
import { StaffTag } from "@/models/staffTag";
import { TypeContract } from "@/models/typeContract";

export const countries = [
  new Country({ id: 4002571654, icon: "/img/icons/RU.svg", title: "Россия", slug: "RU" }),
  new Country({ id: 4040202628, icon: "/img/icons/TJ.svg", title: "Таджикистан", slug: "TJ" }),
  new Country({ id: 4047281563, icon: "/img/icons/UZ.svg", title: "Узбекистан", slug: "UZ" }),
];

export const genders = [
  new Gender({ id: 1, title: 'Мужской', slug:'М' }),
  new Gender({ id: 2, title: 'Женский', slug:'Ж' }),
];

export const positions = [
  new Position({ id:1, title: 'Промышленный альпинист' }),
  new Position({ id:2, title: 'Токарь' }),
  new Position({ id:3, title: 'Пекарь' }),
];

export const typeContracts = [
  new TypeContract({ id: 1, title: 'Трудовой договор', slug: 'ТД' }),
  new TypeContract({ id: 2, title: 'гражданско-правового характера', slug: 'ГПХ' }),
  new TypeContract({ id: 3, title: 'Самозанятый', slug: 'СМЗ' }),
  new TypeContract({ id: 4, title: 'Кандидат', slug: 'Кандидат' }),
];

export const staffTags = [
  new StaffTag({ id: 2, title: 'Истекает патент', slug: 'Проблемные', color: '#e2bd06', bg_color: '#fff8f8', }),
  new StaffTag({ id: 3, title: 'Истекают все документы', slug: 'Критические', color: '#e52e2e', bg_color: '#fffdf1', }),
  new StaffTag({ id: 4, title: 'Пропустил медосмотр', slug: 'Есть замечания', color: '#00b6ed', bg_color: '#f3fcff', }),
  new StaffTag({ id: 5, title: 'Прошел все процедуры', slug: 'Выполнено', color: '#00ae5b', bg_color: '#f2fff9', }),
];
