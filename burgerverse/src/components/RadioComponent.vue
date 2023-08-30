<template>
    <div class="form-group">
      <label :class="mainLabelClass">{{ label }}</label>
      <div v-for="(option, index) in options" :key="index">
        <input
            :class="iClass"
          type="radio"
          :id="getOptionId(option)"
          :value="option.value"
          :name="name"
          :checked="modelValue === option.value"
          @change="updateSelected(option.value)"
        >
        <label :class="lClass" :for="getOptionId(option)">{{ option.label }}</label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RadioGroup',
    props: {
      options: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      name:{
        type: String,
        required:true
      },
      modelValue: { // Changed from 'value' to 'modelValue'
        type: String,
        required: true,
      },
      mainLabelClass:{
        type: String
      },
      iClass:{
        type:String
      },
      lClass:{
        type:String
      }
    },
    methods: {
      getOptionId(option) {
        return `radio-${option.value}`;
      },
      updateSelected(newValue){
        this.$emit('update:modelValue', newValue);
      }
    },
  };
  </script>
  