<template>
    <div class="container mt-4">
        <div class="h-75 ">
            <h5 class="mb-3 text-secondary">DOCUMENTOS DEL CONTRATO</h5>
            
            <div class="text-center">
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#documents">
                    Cargar Documentos <i class="fa fa-plus ms-2"></i>
                </button>
            </div>
        </div>
        <div class="modal fade" id="documents" tabindex="-1" aria-labelledby="documentsLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Documento</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <input
                            type="file"
                            class="form-control d-inline-block w-auto"
                            @change="onFileChange"
                            ref="fileInput"
                        />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" ref="CloseModalDocuments" data-bs-dismiss="modal">cerrar</button>
                    <button type="button" class="btn btn-primary" @click="guardarDocumento">Guardar</button>
                </div>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <h6 class="text-secondary">Archivos cargados</h6>
            <div class="row justify-content-center" v-if="listDocuments && listDocuments.length">
                <div v-for="doc in listDocuments" :key="doc.id" class="d-flex col-5 align-items-center m-3 border rounded px-2 mb-2 bg-light">
                    <i class="fa fa-file-upload fa-lg text-secondary me-2"></i>
                    <span class="flex-grow-1">{{ doc.file }}</span>
                    <button class="btn btn-link text-danger p-0 ms-2" @click="eliminarDocumento(doc.id)">
                        <i class="fa fa-times-circle fa-lg mt-4"></i>
                    </button>
                </div>
            </div>
            <div v-else class="text-muted">No hay documentos cargados.</div>
        </div>
    </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert.ts";
export default {
    props: {
        listContractId: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            contracted_id: this.$route.params.id,
            file: null,
        };
    },
    computed: {
        ...mapGetters("TradeAgreement", ["listDocuments"]),
    },
    mounted() {
        this.getDocumentsData(this.contracted_id);
    },
    methods: {
        ...mapActions("TradeAgreement", ["saveDocuments", "getDocumentsData", "deleteDocumentsData"]),
        onFileChange(event) {
            this.file = event.target.files[0];
        },
        async guardarDocumento() {
            if (!this.file) {
                AlertUtils.error("Debes seleccionar un archivo.");
                return;
            }

            const formData = new FormData();
            formData.append("file", this.file);
            formData.append("contracted_id", this.contracted_id);

            const result = await this.saveDocuments(formData);
            if (result && result.status === true) {
                AlertUtils.success("Documento guardado correctamente.");
                this.file = null;
                this.$refs.fileInput.value = "";
                this.getDocumentsData(this.contracted_id);
                // Cierra el modal simulando un clic en el botón de cerrar
                this.$refs.CloseModalDocuments.click();
            } else {
                AlertUtils.error("Error al guardar el documento.");
            }
        },
        async eliminarDocumento(id) {
            try {
                await this.deleteDocumentsData(id);
                AlertUtils.success("Documento eliminado correctamente.");
                this.getDocumentsData(this.contracted_id);
            } catch (error) {
                AlertUtils.error("Error al eliminar el documento.");
            }
        }
    }
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
.btn-primary i {
    font-size: 1rem;
}
</style>