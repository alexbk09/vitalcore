<template>
    <div class="container mt-4">
        <div>
            <h5 class="mb-3 text-secondary">EMPRESAS EN MISIÓN</h5>
            <div class="row mb-3 align-items-center">
                <div class="col-md-3">
                    <button class="btn btn-primary w-100" @click="alert()" type="button">
                        CARGA MASIVA
                    </button>
                </div>
                <div class="col-md-3 offset-md-1">
                    <button class="btn btn-outline-secondary w-100">ACTUALIZAR</button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-4 mb-2">
                    <BaseInput
                        id="nombreEmpresa"
                        name="name"
                        label="NOMBRE DE LA EMPRESA EN MISIÓN:"
                        v-model="empresa.name"
                        type="text"
                        :error="errors.name"
                    />
                </div>
                <div class="col-md-4 mb-2">
                    <BaseSelect
                        id="tipoDocumento"
                        name="type_id"
                        label="TIPO DE DOCUMENTO:"
                        v-model="empresa.type_id"
                        :options="listTypeDocuments"
                        option-label="name"
                        option-value="id"
                        :error="errors.type_id"
                    />
                </div>
                <div class="col-md-4 mb-2">
                    <BaseInput
                        id="numeroIdentificacion"
                        name="document"
                        label="Nº DE IDENTIFICACIÓN:"
                        v-model="empresa.document"
                        type="text"
                        :error="errors.document"
                    />
                </div>
            </div>
            <div class="d-flex justify-content-end mb-3">
                <button class="btn btn-success btn-sm" @click="guardarEmpresa">AGREGAR EMPRESA</button>
            </div>

            <table class="table table-borderless table-hover text-center">
                <thead class="text-secondary small bg-info text-white">
                    <tr>
                        <th>NOMBRE EMPRESA</th>
                        <th>TIPO DE DOCUMENTO</th>
                        <th>Nº IDENTIFICACIÓN</th>
                        <th>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in listMissionC" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ getTipoDocumentoNombre(item.type_id) }}</td>
                        <td>{{ item.document }}</td>
                        <td>
                            <!-- <span class="me-2">
                                <img src="../../../assets/img/editar.png" alt="Editar" width="20"
                                    class="hover-effect mr-2" />
                            </span> -->
                            <span class="icon" @click="deleteMissions(item)">
                                <img src="../../../assets/img/eliminar.png"  alt="Eliminar" width="20"
                                    class="hover-effect mr-2" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert.ts";
export default {
    props: {
        listContractId: {
            type: Object,
            required: true
        }
    },
    components: { BaseInput, BaseSelect },
    data() {
        return {
            key_trade_agreement: this.listContractId.trade_agreement.id_transfer,
            contracted_id: this.$route.params.id,
            empresa: {
                name: "",
                type_id: "",
                document: "",
            },
            errors: {
                name: false,
                type_id: false,
                document: false,
            },
        };
    },
    computed: {
        ...mapGetters("ContentConsultations", ["listTypeDocuments"]),
        ...mapGetters("TradeAgreement", ["listMissionC"]),
    },
    mounted() {
        this.getTypeDocuments();
        this.getMissionCompaniesData(this.contracted_id);
    },
    methods: {
        ...mapActions("ContentConsultations", ["getTypeDocuments"]),
        ...mapActions("TradeAgreement", ["saveMissionCompanies", "getMissionCompaniesData", "deleteMissionCompaniesData"]),
        alert() {
            AlertUtils.info("Carga masiva de Empresa en misión esta en desarrollo.");
        },
        getTipoDocumentoNombre(id) {
            const tipo = this.listTypeDocuments.find(t => t.id == id);
            return tipo ? tipo.description : "";
        },
        async guardarEmpresa() {
            // Validación
            this.errors = {
                name: !this.empresa.name,
                type_id: !this.empresa.type_id,
                document: !this.empresa.document,
            };
            if (this.errors.name || this.errors.type_id || this.errors.document) {
                AlertUtils.error("Todos los campos son obligatorios.");
                return;
            }
            // Construye el objeto con los campos requeridos
            const nuevaEmpresa = {
                name: this.empresa.name,
                type_id: this.empresa.type_id,
                document: this.empresa.document,
                contracted_id: this.contracted_id,
                key_trade_agreement: this.key_trade_agreement,
            };
            try {
                await this.saveMissionCompanies(nuevaEmpresa);
                AlertUtils.success("Empresa guardada correctamente.");
                this.getMissionCompaniesData(this.contracted_id);
                this.empresa = {
                    name: "",
                    type_id: "",
                    document: "",
                };
                this.errors = {
                    name: false,
                    type_id: false,
                    document: false,
                };
            } catch (e) {
                AlertUtils.error("Error al guardar la empresa.");
            }
        },
        deleteMissions(data) {
            AlertUtils.confirm(
                "¿Eliminar EMPRESAS EN MISIÓN?",
                `¿Está seguro de que desea eliminar la EMPRESA EN MISIÓN "${data.name}" del contrato ?`
            ).then(result => {
                if (result.isConfirmed) {
                this.deleteMissionCompaniesData(data.id)
                    .then(() => {
                    AlertUtils.success("Georeferenciación eliminada correctamente.");
                    this.getMissionCompaniesData(this.contracted_id);
                    })
                    .catch(() => {
                    AlertUtils.error("Error al eliminar la georeferenciación.");
                    });
                }
            });
        },
    },
};
</script>

<style scoped>
.icon:hover {
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s;
}
</style>