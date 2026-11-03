<template>
    <div>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-header">
                    <div class="row justify-content-end">
                        <div class="col-12 col-md-3">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Buscar"
                                    aria-label="Recipient's username" aria-describedby="basic-addon2">
                                <span class="input-group-text bg-primary" id="basic-addon2"><i
                                        class="fa fa-search text-white"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive text-center">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ACUERDO COMERCIAL</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">FECHA DE ACTUALIZACIÓN</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in agreements" :key="item.id">
                                        <td>{{ item.description }}</td>
                                        <td style="width: 300px;">{{ item.date }}</td>
                                        <td style="width: 300px;">
                                            <span class="px-2" @click="selectAgreement(item)"><img style="width: 20px;" class="icons-option" src="../../../assets/img/image 30.png" alt=""></span>
                                            <span class="px-2" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="prepareModal('Editar', item)"><img style="width: 20px;" class="icons-option" src="../../../assets/img/image 31.png" alt=""></span>
                                            <span class="px-2"><img style="width: 20px;" class="icons-option" src="../../../assets/img/image 29.png" alt=""></span>
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
                                <label for="date" class="form-label">Fecha</label>
                                <input type="date" class="form-control" id="date" v-model="modalData.date">
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
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            agreements: [
                { id: 1, description: "COBERTURA O PLAN BENEFICIOS", date: "2023-10-01" },
                { id: 2, description: "MODALIDAD DE CONTRATACIÓN Y PAGO", date: "2023-10-02" },
                { id: 3, description: "MANUALES", date: "2023-10-03" }
            ],
            modalTitle: '',
            modalData: {
                id: null,
                description: '',
                date: ''
            }
        };
    },
    methods: {
        ...mapActions('ConfigAgreements', ['setSelectedAgreement']),
        selectAgreement(item) {
            this.setSelectedAgreement(item); 
            this.$router.push('/configurationItems'); // Redirige a la vista de detalle
        },
        prepareModal(action, item = null) {
            this.modalTitle = action === 'Editar' ? 'Editar Acuerdo' : '';
            if (item) {
                this.modalData = { ...item }; // Copiar datos del acuerdo seleccionado
            }
        },
        saveChanges() {
            // Aquí puedes implementar la lógica para guardar los cambios
            console.log('Datos guardados:', this.modalData);
            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
            modal.hide();
        }
    },
};
</script>

<style>
.icons-option:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;

}
</style>