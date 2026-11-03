<template>
    <div>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-header">
                    <div class="row justify-content-end mb-4">
                        <div class="col text-start mt-1">
                            <p class="h5">MANUALES</p>
                        </div>
                        <div class="col-12 col-md-2">
                            <div class="input-group mb-3">
                                <span class="input-group-text " id="basic-addon2">
                                    <i class="fa fa-search text-secondary"></i>
                                </span>
                                <input type="text" class="form-control" placeholder="Buscar" aria-label="Buscar"
                                    aria-describedby="basic-addon2" v-model="searchQuery">
                            </div>
                        </div>
                        <div class="col-auto text-end">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                @click="prepareModal('Agregar')">
                                Agregar +
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive text-center">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Manual</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Estado</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Opciones</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Modelo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Usa la lista filtrada en el v-for -->
                                    <tr v-for="item in filteredManualList" :key="item.id">
                                        <td>{{ item.name }}</td>
                                        <td style="width: 300px;">
                                            <button v-if="item.status" class="btn btn-true-state">Activo</button>
                                            <button v-else class="btn btn-false-state">Inactivo</button>
                                        </td>
                                        <td style="width: 300px;">
                                            <span class="px-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                @click="prepareModal('Editar', item)">
                                                <img style="width: 20px;" class="icons-option"
                                                    src="../../../assets/img/image 31.png" alt="Editar">
                                            </span>
                                            <span class="px-2" @click="deleteItems(item.id)">
                                                <img style="width: 20px;" class="icons-option"
                                                    src="../../../assets/img/image 29.png" alt="">
                                            </span>
                                        </td>
                                        <td style="width: 100px;">
                                            <button class="btn btn-primary"
                                                @click="downloadManual(item.path)">Descargar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="description" class="form-label">Descripción</label>
                                <input type="text" class="form-control" id="description"
                                    v-model="modalData.description">
                            </div>
                            <!-- Mostrar el campo de estado solo si no es "Agregar" -->
                            <div class="mb-3" v-if="modalTitle !== 'Agregar Nuevo Acuerdo'">
                                <label for="state" class="form-label">Estado</label>
                                <select class="form-select" id="state" v-model="modalData.state">
                                    <option :value="true">Activo</option>
                                    <option :value="false">Inactivo</option>
                                </select>
                            </div>
                            <!-- Campo para subir el documento -->
                            <div class="mb-3">
                                <label for="file" class="form-label">Documento</label>
                                <input type="file" class="form-control" id="file" @change="handleFileUpload">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary " data-bs-dismiss="modal"
                            id="closeModalButton">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="saveChanges">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            agreements: [],
            searchQuery: '', // Nueva propiedad para el texto de búsqueda
            modalTitle: '',
            modalData: {
                id: null,
                description: '',
                state: true,
                file: null
            }
        };
    },
    computed: {
        ...mapGetters('ConfigAgreements', ['listContentManual']),
        selectedAgreement() {
            return this.$store.state.ConfigAgreements.selectedAgreement || null;
        },
        filteredManualList() {
            // Filtra la lista según el texto de búsqueda
            return this.listContentManual.filter(item =>
                item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        ...mapActions('ConfigAgreements', ['setSelectedAgreement', 'SaveManual', 'getManual', 'deleteManual']),
        async fetchCoverage() {
            try {
                this.agreements = await this.getManual(); // Consultar los coverage creados
            } catch (error) {
                console.error("Error al obtener los coverage:", error);
            }
        },
        async prepareModal(action, item = null) {
            this.modalTitle = action === 'Agregar' ? 'Agregar Nuevo Acuerdo' : 'Editar Acuerdo';
            if (item) {
                // Mapear los datos del ítem seleccionado al modal
                this.modalData = {
                    id: item.id,
                    description: item.name || '', // Mapeo de 'name' a 'description'
                    state: item.status !== undefined ? item.status : true, // Mapeo de 'status' a 'state'
                    file: null
                };
            } else {
                // Limpiar los datos del modal para agregar un nuevo coverage
                this.modalData = { id: null, description: '', state: true, file: null };
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.modalData.file = file;
            }
        },
        async saveChanges() {
            const query = {
                name: this.modalData.description,
                status: this.modalData.state,
                file: this.modalData.file
            };
            if (this.modalData.id) {
                query.id = this.modalData.id;
            }
            this.SaveManual(query)
            .then((response) => {
                if (response) {
                    // Mostrar mensaje de éxito
                    Swal.fire("Éxito!", "Los cambios se han guardado correctamente.", "success");
                    this.fetchCoverage(); // Actualizar la lista de coverage
                    const closeModalButton = document.getElementById('closeModalButton');
                    if (closeModalButton) {
                        closeModalButton.click(); // Simula un clic en el botón
                    }
                } else {
                    // Mostrar mensaje de error
                    Swal.fire("Error!", "No se pudo guardar los cambios.", "error");
                }
            })
            .catch((error) => {
                console.error("Error al guardar los cambios:", error);
                Swal.fire("Error!", "Ocurrió un error al guardar los cambios.", "error");
            });
        },
        deleteItems(index) {
            Swal.fire({
                title: "¿Está seguro de eliminarlo?",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                icon: "warning",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteManual(index)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Eliminado",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.fetchCoverage(); // Actualizar la lista de coverage
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ocurrió un error al eliminar.",
                        });
                    });
                }
            });
        },
        async downloadManual(manualId) {
            window.open(manualId, "_blank"); // Abre el enlace en una nueva pestaña
        },

        goBack() {
            this.$router.go(-1); // Retrocede a la página anterior
        },

    },
    async mounted() {
        await this.fetchCoverage(); // Consultar los coverage al cargar el componente
    }
};
</script>

<style>
.icons-option:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.btn-true-state {
    background-color: rgba(47, 206, 191, 1) !important;
    color: rgba(251, 251, 251, 1) !important;
}

.btn-false-state {
    background-color: rgba(245, 54, 92, 1) !important;
    color: rgba(251, 251, 251, 1) !important;
}
</style>