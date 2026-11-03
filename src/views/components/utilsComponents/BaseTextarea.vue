<template>
  <div class="form-group">
    <label :for="id" class="form-label small text-secondary">{{ label }}</label>
    <textarea
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      class="form-control"
      :value="modelValue"
      :class="{ 'is-invalid': error }"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "BaseTextarea",
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 3,
    },
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.form-control {
  resize: none; /* Evita que el usuario cambie el tamaño del textarea */
}

.is-invalid {
  border: 1px solid red !important; /* Estilo para el borde rojo */
}
</style>