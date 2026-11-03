<template>
    <div>
        <div class="mb-4">
            <h6 class="text-secondary mb-3">DATOS DEL CONTRATO</h6>
            <div class="row g-3">
                <div class="col-md-4">
                    <BaseInput id="contract_number" label="NÚMERO DE CONTRATO:" v-model="form.contract_number" />
                </div>
                <div class="col-md-4">
                    <BaseSelect id="is_active" label="ESTADO:" v-model="form.is_active" :options="status" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="email" label="CORREO ELECTRÓNICO:" type="email"
                        v-model="form.email" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="billing_close_day" label="FECHA DE CORTE DE FACTURACIÓN:" type="date"
                        v-model="form.billing_close_day" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="billing_from_day" label="VIGENCIA DESDE:" type="date" v-model="form.billing_from_day" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="billing_to_day" label="VIGENCIA HASTA:" type="date" v-model="form.billing_to_day" />
                </div>
                <div class="col-md-4">
                    <BaseSelect id="plan_cover_benefits_id" label="COBERTURA O PLAN BENEFICIOS:" v-model="form.plan_cover_benefits_id" :options="listContentCoverage" />
                </div>
                <div class="col-md-4">
                    <BaseSelect id="modality_hiring_payment_id" label="MODALIDAD DE CONTRATACIÓN Y PAGO:" v-model="form.modality_hiring_payment_id" :options="listContentContracting" />
                </div>
                <div class="col-md-4">
                    <BaseSelect id="is_date_control" label="¿INCLUYE CITA CONTROL?" v-model="form.is_date_control" :options="status" />
                </div>
                <div class="col-12 text-center">
                    <button class="btn btn-primary btn-sm" @click="handleSaveContract">AGREGAR NUEVO CONTRATO <i class="fa fa-plus ms-2"
                        aria-hidden="true"></i></button>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <table class="table table-borderless table-hover text-center">
                        <thead class="text-secondary small">
                            <tr>
                                <th>#</th>
                                <th>CLIENTE</th>
                                <th>NÚMERO DE CONTRATOS</th>
                                <th>OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(contract, index) in listContracted" :key="index">
                                <td>{{ contract.id }}</td>
                                <td>{{ contract.key_trade_agreement_id }}</td>
                                <td>{{ contract.contract_number }}</td>
                                <td>
                                    <span class="me-2" @click="editContract(contract)">
                                        <i class="fa fa-edit text-primary" aria-hidden="true"></i>
                                    </span>
                                    <span @click="deleteContrated(contract)">
                                        <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert"; // Ajusta la ruta si es necesario

export default {
    data() {
        return {
            form: {
                contract_number: "",
                is_active: "",
                email: "",
                billing_close_day: "",
                billing_from_day: "",
                billing_to_day: "",
                plan_cover_benefits_id: "",
                modality_hiring_payment_id: "",
                is_date_control: "",
                key_trade_agreement_id: this.$route.params.id,
            },
            status:[
                { value: true, text: 'Activo' },
                { value: false, text: 'Inactivo' }
            ]
        };
    },
    mounted() {
        this.getCoverage();
        this.getContracting();
        this.getContracted(this.form.key_trade_agreement_id);
    },
    components: {
        BaseInput,
        BaseSelect,
    },
    computed: {
        ...mapGetters("TradeAgreement", ["listAgreements","listContracted"]),
        ...mapGetters("ConfigAgreements", ["listContentCoverage","listContentContracting"]),

    },
    methods: {
        ...mapActions("ConfigAgreements", ["getCoverage","getContracting"]),
        ...mapActions("TradeAgreement", ["SaveContracted","getContracted","deleteContracted"]),

        async handleSaveContract() {
            try {
                // Validación simple de campos obligatorios
                if (!this.form.contract_number || !this.form.email) {
                    AlertUtils.error("Por favor complete los campos obligatorios.");
                    return;
                }

                // Asegura que los valores sean booleanos
                const isActive = this.form.is_active === true || this.form.is_active === "true";
                const isDateControl = this.form.is_date_control === true || this.form.is_date_control === "true";

                const query = {
                    contract_number: this.form.contract_number,
                    is_active: isActive,
                    email: this.form.email,
                    billing_close_day: this.form.billing_close_day,
                    billing_from_day: this.form.billing_from_day,
                    billing_to_day: this.form.billing_to_day,
                    plan_cover_benefits_id: this.form.plan_cover_benefits_id,
                    modality_hiring_payment_id: this.form.modality_hiring_payment_id,
                    is_date_control: isDateControl,
                    key_trade_agreement_id: this.form.key_trade_agreement_id,
                };

                if (this.form.id) {
                    query.id = this.form.id;
                }
                
                await this.SaveContracted(query)
                .then((response) => {
                    if (response) {
                        AlertUtils.success("Contrato guardado exitosamente.");
                        this.getContracted(this.form.key_trade_agreement_id);
                    } else {
                        AlertUtils.error("Error al guardar el contrato.");
                    }
                });
                
                // Opcional: limpiar formulario o actualizar lista
            } catch (error) {
                AlertUtils.error("Error al guardar el contrato.");
                console.error(error);
            }
        },
        deleteContrated(data) {
            AlertUtils.confirm(
                "¿Eliminar producto?",
                `¿Está seguro de que desea eliminar el "${data.contract_number}"?`
            ).then(result => {
                if (result.isConfirmed) {
                this.deleteContracted(data.id)
                    .then(() => {
                    AlertUtils.success("El contrato se ha eliminado correctamente.");
                    this.getProductData(this.formProducto.contracted_id);
                    })
                    .catch(() => {
                    AlertUtils.error("Error al eliminar el contrato.");
                    });
                }
            });
        },
        editContract(contract) {
            this.form = {
                contract_number: contract.contract_number || "",
                is_active: contract.is_active,
                email: contract.email || "",
                billing_close_day: contract.billing_close_day || "",
                billing_from_day: contract.billing_from_day || "",
                billing_to_day: contract.billing_to_day || "",
                plan_cover_benefits_id: contract.plan_cover_benefits_id || "",
                modality_hiring_payment_id: contract.modality_hiring_payment_id || "",
                is_date_control: contract.is_date_control,
                key_trade_agreement_id: contract.key_trade_agreement_id || this.$route.params.id,
                id: contract.id // Guarda el id para saber si es edición
            };
            this.getCoverage(this.form.plan_cover_benefits_id);
            this.getContracting(this.form.modality_hiring_payment_id);
        },
    },
};
</script>