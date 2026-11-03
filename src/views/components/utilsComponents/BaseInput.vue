<!-- filepath: d:\Trabajos - Git\Frontend---AudidSalud\src\components\BaseInput.vue -->
<template>
    <div class="mb-3">
        <label :for="id" class="form-label small text-secondary">{{ label }}</label>
        <input
            :type="type"
            class="form-control "
            :id="id"
            :placeholder="placeholder"
            :value="value || modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :disabled="disabled"
            :class="{ 'is-invalid': error }" />
    </div>
</template>

<script>
export default {
    name: "BaseInput",
    props: {
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        id: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        value: {
            type: [String, Number],
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["update:modelValue"],
};
</script>

<style scoped>
/* Estilos específicos para el componente si es necesario */
.is-invalid {
    border: 1px solid red !important;
}
</style>