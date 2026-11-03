<template>
    <main>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-body">
                    <div class="col">
                        <h3>Bodegas</h3>
                    </div>
                    <div class="row justify-content-end g-3">
                        <div class="col-3">
                            <!-- <div class="search-container">
                                <input type="text" class="form-control form-control-sm" id="searchInput" placeholder="Buscar..." @input="filterResults()" name="dataFilter" v-model="dataFilter">
                                <ul id="resultList">
                                    
                                </ul>
                            </div> -->
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#addCategory">
                                <i class="fa fa-plus me-2"></i>Nueva Bodega
                            </button>
                        </div>
                    </div>
                    <div class="row p-5">
                        <div class="col-12">
                            <div class="table-responsive">
                                <!-- {{ getCategory }} -->
                                <table class="table text-center">
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Descripción</td>
                                            <td>Ubicación</td>
                                            <td>Acciones</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in getStores" :key="row.id">
                                            <td>{{ row.id }}</td>
                                            <td>{{ row.name }}</td>
                                            <td>{{ row.department?.name }}</td>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-sm py-1 px-2 me-2"
                                                    @click="viewStoreProduct(row.id)"><i class="fa fa-eye"></i></button>
                                                <button type="button" class="btn btn-primary btn-sm py-1 px-2 me-2"
                                                    data-bs-toggle="modal" data-bs-target="#addCategory"
                                                    @click="consulterStore(row)"><i class="fa fa-edit"></i></button>
                                                <!-- <button type="button" class="btn btn-danger btn-sm py-1 px-2"
                                                    @click="storeDelete(row.id)"><i class="fa fa-trash"></i></button> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addCategory" tabindex="-1" aria-labelledby="addCategoryLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addCategoryLabel">Agregar Bodega</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form action="" v-on:submit.prevent="saveStore()">
                                <div class="mb-3">
                                    <label for="storeDescription" class="form-label">Descripción</label>
                                    <input v-model="storeDescription" class="form-control" id="storeDescription"
                                        rows="3"></input>
                                    <span v-if="errors.storeDescription" class="text-danger">{{
                                        errors.storeDescription }}</span>
                                    <label for="" class="form-label mt-3">Tipo</label>
                                    <select name="storeType" id="" class="form-select" v-model="storeType">
                                        <option value="">Seleccione</option>
                                        <option value="1">Bodega</option>
                                        <option value="2">Lonchera</option>
                                    </select>
                                    <label for="" class="form-label mt-3" v-if="storeType == 2">Bodega</label>
                                    <select name="storeId" id="" class="form-select mt-3" v-model="storeId" v-if="storeType == 2">
                                        <option value="">Seleccionar</option>
                                        <option :value="items.id" v-for="items in getStores" :key="items.id">{{ items.name }}</option>
                                    </select>
                                    <label for="" class="form-label mt-3" v-if="storeType == 2">Medico</label>
                                    <select name="storeDoctor" id="" class="form-select mt-3" v-model="storeDoctor" v-if="storeType == 2">
                                        <option value="">Seleccionar</option>
                                        <option :value="items.id" :key="items.id" v-for="items in getDoctorData" class="px-5 text-uppercase">{{ items.name + ' ' + items.last_name }}</option>
                                    </select>
                                    <label for="" class="form-label mt-3">Ubicación</label>
                                    <select class="form-select mt-3" name="storeLocation"
                                        v-model="storeLocation"
                                        ref="patient_department">
                                        <option value="">Seleccionar Departamento</option>
                                        <option :value="items.id" :key="items.id" v-for="items in dataDepartaments">{{ items.name }}</option>
                                    </select>
                                    <span v-if="errors.storeLocation" class="text-danger">{{
                                        errors.storeLocation }}</span>

                                </div>
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

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { mapActions, mapGetters } from "vuex";
export default {
    name: "app-category",

    data() {
        return {
            storeName: '',
            storeDescription: '',
            storeLocation: '',
            storeId: '',
            storeType: '',
            storeDoctor: '',
            IdStoreValidate: '',
            IDStore: '',
            errors: {
                storeName: '',
                storeDescription: '',
                storeLocation: '',
                storeType: '',
                storeDoctor: '',
            },
            dataStore: '',
            dataFilter: '',
        };
    },
    mounted() {
        this.storeGet()
        this.getDepartaments();
        this.searchDoctor();
    },
    methods: {
        ...mapActions('Inventory', ["storeGet", "addStore", "updateStore", "deleteCategory", "categoryFilter"]),
        ...mapActions('Municipality', ["getDepartaments"]),
        ...mapActions('ServiceOrder', ["searchDoctor"]),
        filterResults() {
            if (this.dataFilter != '' || this.dataFilter != null || this.dataFilter > 3) {
                this.categoryFilter(this.dataFilter)
            }
        },
        validateForm() {
            let isValid = true;
            if (!this.storeDescription) {
                this.errors.storeDescription = 'La descripción es obligatoria';
                isValid = false;
            } else {
                this.errors.storeDescription = '';
            }
            if (!this.storeLocation) {
                this.errors.storeLocation = 'La ubicación es obligatoria';
                isValid = false;
            } else {
                this.errors.storeLocation = '';
            }
            return isValid;
        },
        consulterStore(data) {
            //console.log("🚀 ~ consulterStore ~ data:", data)
            /* console.log(data); */
            this.storeDescription = data.name;
            this.storeId = data.key_store;
            this.storeLocation = data.department?.id || null;
            this.IdStoreValidate = data.id;
            this.storeType = data.type_store;
            this.storeDoctor = data.key_user_id_responsibility;

        },
        viewStoreProduct(id) {
            this.$router.push('/storesView/' + id)
        },
        async saveStore() {
            if (this.validateForm()) {
                if (this.IdStoreValidate) {
                    const query = {
                        name: this.storeDescription,
                        municipality: this.storeLocation,
                        type_store: this.storeType,
                        key_store: this.storeId,
                        key_user_id_responsibility: this.storeDoctor,
                        id: this.IdStoreValidate
                    }
                    const response = await this.updateStore(query)
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'La bodega Actualizada',
                            text: 'La bodega se ha actualizado exitosamente.'
                        });
                        this.storeDescription = '';
                        this.storeId = '';
                        this.storeLocation = '';
                        this.IdStoreValidate = '';
                        this.storeType = '';
                        this.storeDoctor = '';
                        await this.storeGet()
                    }
                } else {
                    const query = {
                        name: this.storeDescription,
                        municipality: this.storeLocation,
                        type_store: this.storeType,
                        key_store: this.storeId,
                        key_user_id_responsibility: this.storeDoctor
                    }
                    const response = await this.addStore(query)
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'La bodega Guardada',
                            text: 'La bodega se ha guardado exitosamente.'
                        });
                        this.storeDescription = '';
                        this.storeId = '';
                        this.storeLocation = '';
                        this.IdStoreValidate = '';
                        this.storeType = '';
                        this.storeDoctor = '';
                        await this.storeGet()
                    }
                    if (response === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un problema al guardar la bodega. Por favor, inténtalo de nuevo.'
                        });
                    }
                }

            }
        },
        storeDelete(id) {
            Swal.fire({
                title: '¿Estas seguro de eliminar esta bodega?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteCategory(id)
                    Swal.fire(
                        'Eliminado!',
                        'La bodega ha sido eliminada.',
                        'success'
                    )
                    this.category()
                }
            })
        }
    },

    computed: {
        ...mapGetters('Inventory', ["getCategory", "getStores"]),
        ...mapGetters('Municipality', ['dataDepartaments', 'getLocalities', 'dataMunicipalities']),
        ...mapGetters('ServiceOrder', ['getDoctorData']),
    }
};
</script>

<style>
#resultList {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

#resultList li {
    padding: 8px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    cursor: pointer;
}

#resultList li:hover {
    background-color: #f0f8ff;
}
</style>