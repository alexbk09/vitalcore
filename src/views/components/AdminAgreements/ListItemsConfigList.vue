<template>
    <div>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-header">
                    <div class="row justify-content-end mb-4">
                        <div class="col-auto text-start">
                            <button class="btn btn-danger" @click="goBack"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                        </div>
                        <div class="col text-start mt-1">
                            <p class="h5">{{ selectedAgreement?.description }}</p>
                        </div>
                        <div class="col-12 col-md-2">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Buscar"
                                    aria-label="Buscar" aria-describedby="basic-addon2">
                                <span class="input-group-text bg-primary" id="basic-addon2"><i
                                        class="fa fa-search text-white"></i></span>
                            </div>
                        </div>
                        <div class="col-auto text-end">
                            <button 
                                class="btn btn-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal" 
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
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{{ selectedAgreement?.description }}</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estado</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                        <th v-if="selectedAgreement.id === 3" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Modelo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in agreements" :key="item.id">
                                        <td>{{ item.description }}</td>
                                        <td style="width: 300px;">
                                            <button v-if="item.state" class="btn btn-true-state">Activo</button>
                                            <button v-else class="btn btn-false-state">Inactivo</button>
                                        </td>
                                        <td style="width: 300px;">
                                            <span class="px-2"><img style="width: 20px;" class="icons-option" src="../../../assets/img/image 30.png" alt=""></span>
                                            <span class="px-2" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="prepareModal('Editar', item)"><img style="width: 20px;" class="icons-option" src="../../../assets/img/image 31.png" alt=""></span>
                                            <span class="px-2"><img style="width: 20px;" class="icons-option" src="../../../assets/img/image 29.png" alt=""></span>
                                        </td>
                                        <td v-if="selectedAgreement.id === 3" style="width: 100px;">
                                            <button class="btn btn-primary">Descargar</button>
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
                                <input type="text" class="form-control" id="description" v-model="modalData.description">
                            </div>
                            <div class="mb-3">
                                <label for="state" class="form-label">Estado</label>
                                <select class="form-select" id="state" v-model="modalData.state">
                                    <option :value="true">Activo</option>
                                    <option :value="false">Inactivo</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="saveChanges">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            agreements: [
                { id: 1, description: "Contenido 1", state: true },
                { id: 2, description: "Contenido 2", state: false },
                { id: 3, description: "Contenido 3", state: true }
            ],
            modalTitle: '',
            modalData: {
                id: null,
                description: '',
                state: true
            }
        };
    },
    computed: {
        ...mapGetters('ConfigAgreements', ['selectedAgreement']),
    },
    methods: {
        ...mapActions('ConfigAgreements', ['setSelectedAgreement']),
        prepareModal(action, item = null) {
            this.modalTitle = action === 'Agregar' ? 'Agregar Nuevo Acuerdo' : 'Editar Acuerdo';
            if (item) {
                this.modalData = { ...item }; // Copiar datos del acuerdo seleccionado
            } else {
                this.modalData = { id: null, description: '', state: true }; // Limpiar datos para agregar
            }
        },
        saveChanges() {
            if (this.modalData.id) {
                // Editar acuerdo existente
                const index = this.agreements.findIndex(a => a.id === this.modalData.id);
                if (index !== -1) {
                    this.agreements[index] = { ...this.modalData };
                }
            } else {
                // Agregar nuevo acuerdo
                const newId = this.agreements.length + 1;
                this.agreements.push({ ...this.modalData, id: newId });
            }
            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
            modal.hide();
        },
        goBack() {
            this.$router.go(-1); // Retrocede a la página anterior
        }
    },
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