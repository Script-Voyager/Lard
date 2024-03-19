<template>
  <ul class="list-reset btnTagList flex">
    <li class="btnTagList-item">
      <button
        @click.prevent="setActiveTag(defaultBtn.id)"
        :style="`--defaultBtn-color: ${defaultBtn.color}; --defaultBtn-bg_color: ${defaultBtn.bg_color};`"
        class="btnTagList-item-btn default-btn"
        :class="{
          '--active-defaultBtnTag': activeTags.includes(defaultBtn.id),
        }"
      >
        {{ defaultBtn.title }}
      </button>
    </li>
    <li v-for="status in staffTags" :key="status.id" class="btnTagList-item">
      <button
        @click.prevent="setActiveTag(status.id)"
        class="btnTagList-item-btn"
        :style="`--btn-color: ${status.color}; --btn-bg_color: ${status.bg_color};`"
        :class="{ '--active-btnTag': activeTags.includes(status.id) }"
      >
        {{ status.slug }}
      </button>
    </li>
  </ul>
</template>

<script setup>
import { ref, reactive } from "vue";
import { staffTags } from "@/data/initialData";

const emit = defineEmits(['filtered-tag']);
const defaultBtn = reactive({
  id: 1,
  title: "Весь список",
  bg_color: "#DDE0E2",
  color: "#b0bcc7",
});
const activeTags = ref([defaultBtn.id]);

const filterTag = () => {
  emit('filtered-tag', activeTags.value);
}

const setActiveTag = (id) => {
  if (id === defaultBtn.id) {
    activeTags.value = [defaultBtn.id];
  } else {
    const defaultIndex = activeTags.value.indexOf(defaultBtn.id);
    if (defaultIndex !== -1) {
      activeTags.value.splice(defaultIndex, 1);
    }
    const index = activeTags.value.indexOf(id);
    if (index !== -1) {
      activeTags.value.splice(index, 1);
    } else {
      activeTags.value.push(id);
    }
  }
  filterTag();
};

</script>

<style>
.btnTagList {
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  gap: 10px;
}

.btnTagList-item-btn {
  border: 1px solid var(--btn-color);
  border-radius: 30px;
  padding: 8px 15px;
  background-color: var(--btn-bg_color);

  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: var(--btn-color);
}

.default-btn {
  color: var(--defaultBtn-color);
  background-color: var(--defaultBtn-bg_color);
  border-color: var(--defaultBtn-color);
}

.--active-defaultBtnTag {
  color: #fff;
  background-color: var(--defaultBtn-color);
}

.--active-btnTag {
  color: #fff;
  background-color: var(--btn-color);
}
</style>
