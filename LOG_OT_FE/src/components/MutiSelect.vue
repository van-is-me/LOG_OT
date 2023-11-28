<template>
    <div class="relative" v-click-outside-element="hideDropdown">
      <div
        class="w-full bg-[#dbdbdb] py-[10px] my-[10px] text-black px-[10px] border border-gray-300 rounded-md cursor-pointer"
        :class="{ 'bg-[#dbdbdb]': isDropdownOpen }"
        @click="toggleDropdown"
      >
        <template v-if="selectedOptions.length === 0">
          <span class="text-black">Chọn một hoặc nhiều</span>
        </template>
        <template v-else>
          <span
            class="inline-block max-w-full overflow-hidden overflow-ellipsis"
            v-for="option in selectedOptions"
            :key="option.id"
          >
            - {{ option.name }} -
          </span>
        </template>
      </div>
  
      <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md">
        <div v-for="option in options" :key="option.id" @click="toggleOption(option)">
          <label class="flex items-center px-3 cursor-pointer">
            <input type="checkbox" class="mr-2 form-checkbox" :checked="isSelected(option)" @change="toggleOption(option)" />
            <span>{{ option.name }}</span>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      modelValue: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        isDropdownOpen: false,
        selectedOptions: [],
        selectedOptionNames: [],
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal) {
          this.selectedOptions = newVal.map((id) => this.options.find((option) => option.id === id));
          this.selectedOptionNames = this.selectedOptions.map((option) => option.name);
        },
      },
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      isSelected(option) {
        return this.selectedOptions.some((selectedOption) => selectedOption.id === option.id);
      },
      toggleOption(option) {
        const index = this.selectedOptions.findIndex((selectedOption) => selectedOption.id === option.id);
  
        if (index > -1) {
          this.selectedOptions.splice(index, 1);
          this.selectedOptionNames.splice(index, 1);
        } else {
          this.selectedOptions.push(option);
          this.selectedOptionNames.push(option.name);
        }
  
        this.$emit('update:modelValue', this.selectedOptions.map((option) => option.id));
      },
      hideDropdown() {
        this.isDropdownOpen = false;
      },
    },
  };
  </script>
  
  <style>
  .form-checkbox:checked {
    @apply bg-blue-500 border-blue-500;
  }
  </style>
  