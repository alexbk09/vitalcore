<template>
    <div class="mb-3">
        <label :for="id" class="form-label small text-secondary">{{ label }}</label>
        <select
            :id="id"
            class="form-select "
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            :disabled="disabled"
            :class="{ 'is-invalid': error }"
        >
            <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
            <option v-for="(option, index) in options" :key="index" :value="option.id || option.value">
                {{ option.text || option.name || option.description || option.contract_number }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "BaseSelect",
    props: {
        label: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
            default: () => [],
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        placeholder: {
            type: String,
            default: "Seleccione una opción",
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