<template>
    <main>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-body">
                    <div class="col">
                        <h3>Categorías</h3>
                    </div>
                    <div class="row justify-content-end g-3">
                        <div class="col-3">
                            <div class="search-container">
                                <input type="text" class="form-control form-control-sm" id="searchInput" placeholder="Buscar..." @input="filterResults()" name="dataFilter" v-model="dataFilter">
                                <ul id="resultList">
                                    <!-- Aquí se mostrarán los resultados -->
                                </ul>
                            </div>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#addCategory">
                                <i class="fa fa-plus me-2"></i>Nueva Categoría
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
                                            <td>Acciones</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in getCategory" :key="index">
                                            <td>{{ row.id }}</td>
                                            <td>{{ row.description }}</td>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-sm py-1 px-2"
                                                    data-bs-toggle="modal" data-bs-target="#addCategory"
                                                    @click="consulterCategory(row)"><i class="fa fa-edit"></i></button>
                                                <button type="button" class="btn btn-danger btn-sm py-1 px-2"
                                                    @click="categoryDelete(row.id)"><i class="fa fa-trash"></i></button>
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
                            <h1 class="modal-title fs-5" id="addCategoryLabel">Agregar Categoría</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form action="" v-on:submit.prevent="saveCategory()">
                                <div class="mb-3">
                                    <label for="categoryDescription" class="form-label">Descripción</label>
                                    <input v-model="categoryDescription" class="form-control" id="categoryDescription"
                                        rows="3"></input>
                                    <span v-if="errors.categoryDescription" class="text-danger">{{
                                            errors.categoryDescription }}</span>
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
            categoryName: '',
            categoryDescription: '',
            categoryId: '',
            errors: {
                categoryName: '',
                categoryDescription: ''
            },
            dataCategory: '',
            dataFilter: '',
        };
    },
    mounted() {
        this.category()
    },
    methods: {
        ...mapActions('Inventory', ["addCategory", "updateCategory", "category", "deleteCategory","categoryFilter"]),
        filterResults() {
            if (this.dataFilter != '' || this.dataFilter != null || this.dataFilter > 3) {
                this.categoryFilter(this.dataFilter)
            }         
        },
        validateForm() {
            let isValid = true;
            if (!this.categoryDescription) {
                this.errors.categoryDescription = 'La descripción es obligatoria';
                isValid = false;
            } else {
                this.errors.categoryDescription = '';
            }

            return isValid;
        },
        consulterCategory(data) {
           // console.log(data);
            this.categoryDescription = data.description;
            this.categoryId = data.id;
        },
        async saveCategory() {
            if (this.validateForm()) {
                if (this.categoryId) {
                    const query = {
                        id: this.categoryId,
                        description: this.categoryDescription
                    }
                    const response = await this.updateCategory(query)
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Categoría Actualizada',
                            text: 'La categoría se ha actualizado exitosamente.'
                        });
                        this.categoryDescription = '';
                        this.categoryId = '';
                        await this.category()
                    }
                } else {
                    const query = {
                        description: this.categoryDescription
                    }
                    const response = await this.addCategory(query)
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Categoría Guardada',
                            text: 'La categoría se ha guardado exitosamente.'
                        });
                        this.categoryDescription = '';
                        await this.category()
                    }
                    if (response === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un problema al guardar la categoría. Por favor, inténtalo de nuevo.'
                        });
                    }
                }

            }
        },
        categoryDelete(id) {
            Swal.fire({
                title: '¿Estas seguro de eliminar esta categoría?',
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
                        'La categoría ha sido eliminada.',
                        'success'
                    )
                    this.category()
                }
            })
        }
    },

    computed: {
        ...mapGetters('Inventory', ["getCategory"]),
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