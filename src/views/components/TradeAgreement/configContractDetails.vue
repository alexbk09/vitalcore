<template>
    <div class="container-fluid py-7">
        <div class="row">
            <div class="col-md-3 ">
                <div class="card">
                    <div class="card-body">
                        <h6 class="text-secondary mb-3">DATOS DEL ACUERDO COMERCIAL</h6>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'Headquarters' }" @click="setActiveModule('Headquarters')">
                                1 Sedes
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'georeferencing' }" @click="setActiveModule('georeferencing')">
                                2 Georreferenciación
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'contactData' }" @click="setActiveModule('contactData')">
                               3 Datos de contacto y/o comerciales
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'contractedProducts' }" @click="setActiveModule('contractedProducts')">
                                4 Productos contratados
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'suppliesAndMedicines' }" @click="setActiveModule('suppliesAndMedicines')">
                                5 Insumos y medicamentos
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'packagesByCharge' }" @click="setActiveModule('packagesByCharge')">
                                6 Paquetes por cargo
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'missionCompanies' }" @click="setActiveModule('missionCompanies')">
                                7 Empresas en misión
                            </button>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-light text-start w-100"
                                :class="{ active: activeModule === 'contractDocuments' }" @click="setActiveModule('contractDocuments')">
                                8 Documentos del contrato
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-body">
                        <button class="btn btn-danger mb-3" @click="goBack">
                            <i class="fa fa-arrow-left"></i> 
                        </button>
                        <div class="row">
                            <div class="col-md-7">
                                <BaseInput id="modalidadContratacionPago" placeholder="SANITAS" :value="listContractId?.trade_agreement?.name_agreements" disabled label="EPS O ENTIDAD ADMINISTRADORA (PARA GENERAR RIPS):" />
                            </div>
                            <div class="col-md-5">
                                <BaseInput id="modalidadContratacionPago" placeholder="1234567890" :value="listContractId.contract_number" disabled label="NÚMERO DE CONTRATO:" />
                            </div>
                        </div>
                        <hr>
                        <div v-if="activeModule === 'Headquarters'">
                            <formHeadquarters :listContractId="listContractId" />
                        </div>
                        <div v-if="activeModule === 'georeferencing'">
                            <formGeoreferencing :listContractId="listContractId" />
                        </div>
                        <div v-if="activeModule === 'contactData'">
                            <formBusinessContantInformation :listContractId="listContractId" />
                        </div>
                        <div v-if="activeModule === 'contractedProducts'">
                            <formContractedProducts :listContractId="listContractId" />
                        </div>
                        <div v-if="activeModule === 'suppliesAndMedicines'">
                            <formSuppliesAndMedicines :listContractId="listContractId" />
                        </div>
                        <div v-if="activeModule === 'packagesByCharge'">
                            <formPackagesByCharge :listContractId="listContractId" />
                        </div>
                        <div v-if="activeModule === 'missionCompanies'">
                            <formMissionCompanies :listContractId="listContractId" />
                        </div>
                        <div v-if="activeModule === 'contractDocuments'">
                            <formContractDocuments :listContractId="listContractId" />
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
import formHeadquarters from "./formHeadquarters.vue";
import formGeoreferencing from "./formGeoreferencing.vue";
import formBusinessContantInformation from "./formBusinessContantInformation.vue";
import formContractedProducts from "./formContractedProducts.vue";
import formSuppliesAndMedicines from "./formSuppliesAndMedicines.vue";
import formPackagesByCharge from "./formPackagesByCharge.vue";
import formMissionCompanies from "./formMissionCompanies.vue";
import formContractDocuments from "./formContractDocuments.vue";
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            activeModule: "Headquarters", // Módulo activo por defecto
            modules: ["Headquarters"], // Lista de módulos
            contracted_id: this.$route.params.id,
        };
    },
    computed: {
        ...mapGetters("TradeAgreement", ["listContractId"]),
    },
    mounted() {
        this.getContractedtData(this.contracted_id);
    },
    methods: {
        ...mapActions("TradeAgreement", ["getContractedtData"]),
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
        goBack() {
            this.$router.go(-1);
        },
    },
    components: {
        BaseInput,
        BaseSelect,
        formHeadquarters,
        formGeoreferencing,
        formBusinessContantInformation,
        formContractedProducts,
        formSuppliesAndMedicines,
        formPackagesByCharge,
        formMissionCompanies,
        formContractDocuments,
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