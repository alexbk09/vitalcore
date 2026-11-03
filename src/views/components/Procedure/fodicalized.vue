<template>
    <main>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-body">
                    <div class="col">
                        <h3>Procedimientos Focalizados</h3>
                    </div>
                    <div class="row justify-content-end g-3">
                        
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#addProcedure">
                                <i class="fa fa-plus me-2"></i>Agregar Procedimiento
                            </button>
                        </div>
                    </div>
                    <div class="row p-5">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table text-center">
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Codigo</td>
                                            <td>Descripción</td>
                                            <td>Tipo</td>
                                            <!-- <td>Acciones</td> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in getProcedureFodicalized" :key="index">
                                            <td>{{ row.id }}</td>
                                            <td>{{ row.code }}</td>
                                            <td>{{ row.description }}</td>
                                            <td>{{ row.type_rips }}</td>
                                           <!--  <td>
                                                <button type="button" class="btn btn-danger btn-sm py-1 px-2"
                                                    @click="procedureDelete(row.id)"><i class="fa fa-trash"></i></button>
                                            </td> -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addProcedure" tabindex="-1" aria-labelledby="addProcedureLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addProcedureLabel">Agregar Procedimiento</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form action="" v-on:submit.prevent="saveProcedure()">
                                <div class="mb-3">
                                    <label for="procedureDescription" class="form-label">Descripción</label>
                                    <input type="text" class="form-control form-control-sm" placeholder="Buscar"  autocomplete="off" name="busquedacups"   @input="searchCupss"  v-model="busquedacups" />
                                    <ul id="resultList" v-if="busquedacups">
                                        <li :key="items.id_cups" v-for="items in getCups" @click="selectCups(items)">
                                            {{ items.code }} - {{ items.description }}
                                        </li>
                                    </ul>
                                    <span v-if="errors.procedureDescription" class="text-danger">{{
                                            errors.procedureDescription }}</span>
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
            busquedacups: '',
            procedure: {
                procedureDescription: '',
                procedureCode: '',
                procedureType: '',
            },
            errors: {
                procedureDescription: '',
            },
        };
    },
    mounted() {
        this.procedureFodicalized()
    },
    methods: {
        ...mapActions('History', ["addProcedureFodicalized", "procedureFodicalized"]),
        ...mapActions('Cups',["get","search","destroy","searchCups",'cleadCups']),
        async searchCupss(){
            await this.searchCups(this.busquedacups)
          },
        selectCups(cups){
           //console.log("🚀 ~ selectCups ~ cups:", cups)
           this.procedure.procedureDescription = cups.description
           this.busquedacups = cups.description
           this.procedure.procedureCode = cups.code
           this.procedure.procedureType = cups.type_rips
           this.cleadCups()
        },
        async saveProcedure() {
            try {
                // Llamada a la función de Vuex
                const response = await this.addProcedureFodicalized(this.procedure);

                if (response.success) {
                    // Procedimiento guardado con éxito
                    this.procedure.procedureDescription = '';
                    this.procedure.procedureCode = '';
                    this.procedure.procedureType = '';
                    this.procedureFodicalized(); // Recarga la tabla
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'El procedimiento se agregó correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                } else {
                    // Manejo de errores
                    const errorMessages = Array.isArray(response.errors)
                        ? response.errors.join('<br>')
                        : response.errors;

                    Swal.fire({
                        title: 'Error al guardar',
                        html: `Ocurrieron los siguientes errores:<br>${errorMessages}`,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            } catch (error) {
                // Error inesperado
                Swal.fire({
                    title: 'Error inesperado',
                    text: 'Algo salió mal. Intenta nuevamente más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        },
        async procedureDelete(id) {
            const response = await this.destroy(id)
            if (response.status === 200) {
                this.procedureFodicalized()
            }
        },
 
    },

    computed: {
        ...mapGetters('History', ["getProcedureFodicalized"]),
        ...mapGetters('Cups',['getCups']), 
    }
};
</script>

<style>
#resultList {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    z-index: 1000;
}

#resultList li {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    transition: background-color 0.3s, color 0.3s;
}

#resultList li:last-child {
    border-bottom: none;
}

#resultList li:hover {
    background-color: #007bff;
    color: #fff;
}

#resultList li:active {
    background-color: #0056b3;
    color: #fff;
}

/* Estilo para el scroll */
#resultList::-webkit-scrollbar {
    width: 6px;
}

#resultList::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
}

#resultList::-webkit-scrollbar-thumb {
    background: #007bff;
    border-radius: 8px;
}

#resultList::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
}
</style>