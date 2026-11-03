<template>
    <div class="container-fluid py-5">
        <div class="row">
            <div class="col-md-3 ">
                <div class="card">
                    <div class="card-body">
                        <h6 class="text-secondary mb-3">DATOS DEL ACUERDO COMERCIAL</h6>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'customer' }" @click="setActiveModule('customer')">
                                1 Datos del cliente
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'contract' }" @click="setActiveModule('contract')">
                                2 Contratos
                            </button>
                        </div>
<!--                         <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'invoicing' }" @click="setActiveModule('invoicing')">
                                3 Datos para facturación electrónica
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-body">
                        <div v-if="activeModule === 'customer'">
                            <FormCustomer />
                        </div>
                        <div v-if="activeModule === 'contract'">
                            <FormContract />
                        </div>
                        <!-- <div v-if="activeModule === 'invoicing'">
                            <FormElectronicInvoicing />
                        </div> -->

                        <div class="d-flex justify-content-end mt-4">
                            <button
                                class="btn btn-secondary me-2"
                                v-if="activeModule === 'contract'"
                                @click="previousModule"
                            >
                                ATRÁS
                            </button>
                            <button
                                class="btn btn-primary"
                                v-if="activeModule === 'customer'"
                                @click="nextModule"
                            >
                                SIGUIENTE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import FormCustomer from "./formCustomer.vue";
import FormContract from "./formContract.vue";
import FormElectronicInvoicing from "./formElectronicInvoicing.vue";

export default {
    data() {
        return {
            activeModule: "customer", // Módulo activo por defecto
            modules: ["customer", "contract"], // Lista de módulos
        };
    },
    methods: {
        setActiveModule(module) {
            this.activeModule = module;
        },
        nextModule() {
            const currentIndex = this.modules.indexOf(this.activeModule);
            if (currentIndex < this.modules.length - 1) {
                this.activeModule = this.modules[currentIndex + 1];
            }
        },
        previousModule() {
            const currentIndex = this.modules.indexOf(this.activeModule);
            if (currentIndex > 0) {
                this.activeModule = this.modules[currentIndex - 1];
            }
        },
    },
    components: {
        BaseInput,
        BaseSelect,
        FormCustomer,
        FormContract,
        FormElectronicInvoicing,
    },
};
</script>

<style scoped>
.active {
    font-weight: bold;
    color: #007bff;
    text-decoration: underline;
}
</style>