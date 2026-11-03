<template>
    <main>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-body">
                    <div class="row p-5">
                        <div class="col">
                            <h3>Provedores</h3>
                        </div>
                        <div class="col text-end">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#addProvider">
                                <i class="fa fa-plus me-2"></i>Nuevo Provedor
                            </button>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <!-- {{ getCategory }} -->
                                <table class="table text-center">
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Nombre</td>
                                            <td>Descripción</td>
                                            <td>Identificación</td>
                                            <td>Estado</td>
                                            <td>Acciones</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in getProvider" :key="index">
                                            <td>{{ row.id }}</td>
                                            <td>{{ row.name }}</td>
                                            <td>{{ row.description }}</td>
                                            <td>{{ row.identification }}</td>
                                            <td v-if="row.active == 0"><button type="button" class="btn btn-success btn-sm py-1 px-2">Activo</button></td>
                                            <td v-else><button type="button" class="btn btn-danger btn-sm py-1 px-2">Inactivo</button></td>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-sm py-1 px-2"
                                                    data-bs-toggle="modal" data-bs-target="#addProvider"
                                                    @click="consulterProvider(row)"><i class="fa fa-edit"></i></button>
                                                <button type="button" class="btn btn-danger btn-sm py-1 px-2"
                                                    @click="providerDelete(row.id)"><i class="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addProvider" tabindex="-1" aria-labelledby="addProviderLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addProviderLabel">Agregar Proveedor</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form action="" v-on:submit.prevent="saveProvider()">
                                <div class="mb-3">
                                    <label for="providerName" class="form-label">Nombre</label>
                                    <input v-model="providerName" class="form-control" id="providerName"
                                        rows="3"></input>
                                    <span v-if="errors.providerName" class="text-danger">{{
                                            errors.providerName }}</span>
                                </div>
                                <div class="mb-3">
                                    <label for="providerDescription" class="form-label">Descripción</label>
                                        <textarea class="form-control" name="providerDescription" v-model="providerDescription" id="providerDescription" cols="30" rows="10"></textarea>
                                    <span v-if="errors.providerDescription" class="text-danger">{{
                                            errors.providerDescription }}</span>
                                </div>
                                <div class="mb-3">
                                    <label for="providerIdentification" class="form-label">Identificación</label>
                                    <input v-model="providerIdentification" class="form-control" id="providerIdentification"
                                        rows="3"></input>
                                    <span v-if="errors.providerIdentification" class="text-danger">{{
                                            errors.providerIdentification }}</span>
                                </div>
                                <div class="mb-3">
                                    <label for="providerDepartment" class="form-label">Departamento</label> 
                                        <select class="form-select form-select-sm" name="providerDepartment" v-model="providerDepartment">
                                            <option :value="items.id" :key="items.id" v-for="items in dataDepartaments">{{ items.name }}
                                            </option>
                                        </select>
                                    <span v-if="errors.providerDepartment" class="text-danger">{{
                                            errors.providerDepartment }}</span>
                                </div>
                                <div class="mb-3">
                                    <label for="providerStatus" class="form-label">Status</label>
                                    <select name="providerStatus" v-model="providerStatus" class="form-select form-select-sm" id="providerStatus">
                                        <option value="0">Activo</option>
                                        <option value="1">Inactivo</option>
                                    </select>
                                    <span v-if="errors.providerStatus" class="text-danger">{{
                                            errors.providerStatus }}</span>
                                </div>
                                <!-- <div class="mb-3">
                                    <label for="providerDescription" class="form-label">Descripción</label>
                                    <input v-model="providerDescription" class="form-control" id="providerDescription"
                                        rows="3"></input>
                                    <span v-if="errors.providerDescription" class="text-danger">{{
                                            errors.providerDescription }}</span>
                                </div> -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" class="btn btn-primary"
                                        data-bs-dismiss="modal">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<!-- <script setup lang="ts">
import { ref } from 'vue';
import ArgonInput from './../../../components/ArgonInput.vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

const categoryName = ref('');
const categoryDescription = ref('');
const errors = ref({
    categoryName: '',
    categoryDescription: ''
});

const validateForm = () => {
    let isValid = true;

    if (!categoryName.value) {
        errors.value.categoryName = 'El nombre es obligatorio';
        isValid = false;
    } else {
        errors.value.categoryName = '';
    }

    if (!categoryDescription.value) {
        errors.value.categoryDescription = 'La descripción es obligatoria';
        isValid = false;
    } else {
        errors.value.categoryDescription = '';
    }

    return isValid;
};
const store = useStore();
const saveCategory = () => {
    if (validateForm()) {
        store.dispatch('Inventory/addCategory', {
            /* name: categoryName.value, */
            description: categoryDescription.value
        })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Categoría Guardada',
                text: 'La categoría se ha guardado exitosamente.'
            });
            /* categoryName.value = ''; */
            categoryDescription.value = '';
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar la categoría. Por favor, inténtalo de nuevo.'
            });
        });
    }
};

</script> -->

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { mapActions, mapGetters } from "vuex";
export default {
    name: "app-provider",

    data() {
        return {
            providerName: '',
            providerDescription: '',
            providerId: '',
            providerStatus: '',
            providerDepartment: '',
            providerIdentification: '',
            errors: {
                providerName: '',
                providerDescription: '',
                providerStatus: '',
                providerDepartment: '',
                providerIdentification: ''

            },
            dataprovider: '',
        };
    },
    mounted() {
        this.provider(),
        this.getDepartaments()
    },
    methods: {
        ...mapActions('Inventory', ["addProvider", "updateProvider", "provider", "deleteProvider"]),
        ...mapActions('Municipality', ["getDepartaments"]),

        validateForm() {
            let isValid = true;
            if (!this.providerDescription) {
                this.errors.providerDescription = 'La descripción es obligatoria';
                isValid = false;
            } else {
                this.errors.providerDescription = '';
            }

            if (!this.providerStatus) {
                this.errors.providerStatus = 'El estado es obligatorio';
                isValid = false;
            } else {
                this.errors.providerStatus = '';
            }

            if (!this.providerDepartment) {
                this.errors.providerDepartment = 'El departamento es obligatorio';
                isValid = false;
            } else {
                this.errors.providerDepartment = '';
            }

            if (!this.providerIdentification) {
                this.errors.providerIdentification = 'La identificación es obligatoria';
                isValid = false;
            } else {    
                this.errors.providerIdentification = '';
            }

            if (!this.providerName) {
                this.errors.providerName = 'El nombre es obligatorio';
                isValid = false;
            } else {   
                this.errors.providerName = '';
            }


            return isValid;
        },
        consulterProvider(data) {
            //console.log(data);
            this.providerDescription = data.description;
            this.providerId = data.id;
            this.providerStatus = data.active;
            this.providerDepartment = data.key_department;
            this.providerIdentification = data.identification;
            this.providerName = data.name
        },
        async saveProvider() {
            if (this.validateForm()) {
                if (this.providerId) {
                    const query = {
                        id: this.providerId,
                        description: this.providerDescription,
                        active: this.providerStatus,
                        key_department: this.providerDepartment,
                        identification: this.providerIdentification,
                        name: this.providerName
                    }
                    const response = await this.updateProvider(query)
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'El proveedor se ha Actualizado',
                            text: 'El proveedor se ha actualizado exitosamente.'
                        });
                        this.providerDescription = '';
                        this.providerId = '';
                        this.providerStatus = '';
                        this.providerDepartment = '';
                        this.providerIdentification = '';
                        this.providerName = '';
                        await this.provider()
                    }
                } else {
                    const query = {
                        description: this.providerDescription,
                        active: this.providerStatus,
                        key_department: this.providerDepartment,
                        identification: this.providerIdentification,
                        name: this.providerName
                    }
                    const response = await this.addProvider(query)
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Proveedor Guardado',
                            text: 'El proveedor se ha guardado exitosamente.'
                        });
                        this.providerDescription = '';
                        this.providerId = '';
                        this.providerStatus = '';
                        this.providerDepartment = '';
                        this.providerIdentification = '';
                        this.providerName = '';
                        await this.provider()
                    }
                    if (response === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un problema al guardar el proveedor. Por favor, inténtalo de nuevo.'
                        });
                    }
                }

            }
        },
        providerDelete(id) {
            Swal.fire({
                title: '¿Estas seguro de eliminar este proveedor?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteProvider(id)
                    Swal.fire(
                        'Eliminado!',
                        'El proveedor ha sido eliminada.',
                        'success'
                    )
                    this.provider()
                }
            })
        }
    },

    computed: {
        ...mapGetters('Inventory', ["getProvider"]),
        ...mapGetters('Municipality', ['dataDepartaments']),
    }
};
</script>