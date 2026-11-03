<template>
    <div>
        <div class="mb-4">
            <h6 class="text-secondary mb-3">DATOS PARA FACTURACIÓN ELECTRÓNICA</h6>
            <div class="row g-3">
                <!-- Campos de tamaño col-md-4 -->
                <div class="col-md-4">
                    <BaseInput
                        id="email_billing"
                        label="CORREO ELECTRÓNICO:"
                        type="email"
                        v-model="form.email_billing"
                    />
                </div>
                <div class="col-md-4">
                    <BaseInput
                        id="tuition_billing"
                        label="MATRÍCULA MERCANTIL:"
                        v-model="form.tuition_billing"
                    />
                </div>
                <div class="col-md-4">
                    <BaseSelect
                        id="taxpayer_billing"
                        label="TIPO DE CONTRIBUYENTE:"
                        v-model="form.taxpayer_billing"
                        :options="[
                            { value: 'personaNatural', text: 'Persona Natural' },
                            { value: 'personaJuridica', text: 'Persona Jurídica' }
                        ]"
                    />
                </div>

                <!-- Campos de tamaño col-md-6 -->
                <div class="col-md-6">
                    <BaseInput
                        id="tax_details"
                        label="DETALLES TRIBUTARIOS:"
                        v-model="form.tax_details"
                    />
                </div>
                <div class="col-md-6">
                    <BaseInput
                        id="tax_customer_exchange"
                        label="INFORMACIÓN TRIBUTARIA, ADUANERA Y CAMBIARIA:"
                        v-model="form.tax_customer_exchange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";

export default {
    data() {
        return {
            form: {
                email_billing: "",
                tuition_billing: "",
                taxpayer_billing: "",
                tax_details: "",
                tax_customer_exchange: "",
            },
        };
    },
    components: {
        BaseInput,
        BaseSelect,
    },
};
</script>