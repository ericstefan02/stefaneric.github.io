<template>
    <div>
      <label :class="lclass" :for="id">{{ label }}</label>
      <textarea v-if="isTextarea" :value="modelValue" @input="updateValue" :name="name" :class="iclass" :id="id" :placeholder="placeholder"></textarea>
      <input v-else :value="modelValue" @input="updateValue" :type="type" :name="name" :class="iclass" :id="id" :placeholder="placeholder">
    </div>
    <div v-if="error" class="px-5 py-2 mb-2 bg-red d-flex text-caption rounded">
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        {{ error }}
    </div>
  </template>
  
  <script>
  export default {
    name: "TextComponent",
    props: {
      type: {
        type: String,
        default: "text"
      },
      name: String,
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      modelValue: String, // Changed from 'value' to 'modelValue'
      placeholder: String,
      lclass: String,
      iclass: String,
      error:String
    },
    data() {
      return {
        isTextarea: false
      }
    },
    computed: {
      localValue: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit("update:modelValue", value);
        }
      }
    },
    methods: {
      updateValue(event) {
        this.localValue = event.target.value;
      }
    },
    mounted() {
      this.isTextarea = this.type === 'textarea';
    }
  }
  </script>
  