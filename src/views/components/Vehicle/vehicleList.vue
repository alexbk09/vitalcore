<template>
    <div>
        <Loading v-if="this.isLoading" :valuetitle="title" />
        <div class="container-fluid py-7" v-else>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="card-body px-0 pt-0 pb-2 mt-5">
                                <div class="container-fluid text-end">
                                    <div class="row justify-content-end">
                                        <div class="col-md-2">
                                            <div class="input-group">
                                                <span class="input-group-text text-body">
                                                    <i class="fas fa-search" aria-hidden="true"></i>
                                                </span>
                                                <input type="text" class="form-control form-control-sm"
                                                    placeholder="Buscar" autocomplete="off" name="vehicleSearch"
                                                    @input="searchVehicles" v-model="vehicleSearch" />
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <router-link to="/add/vehicle" class="btn mb-0 btn-outline-success btn-sm"
                                                title="Agregar Vehiculo"><i class="fa fa-plus"
                                                    aria-hidden="true"></i></router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Vehiculos</th>
                                                <th>Contacto</th>
                                                <th>Sede</th>
                                                <th>Tipo de Vehiculo</th>
                                                <th>ESTADO</th>
                                                <th>INGRESADO</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="items in getvehicle" :key="items.id_vehicle">
                                                <td>{{ items.id_vehicle }}</td>
                                                <td>{{ items.name_vehicle }}</td>
                                                <td>{{ items.contact_phone }}</td>
                                                <td>{{ items.seat.name_seat }}</td>
                                                <td>{{ items.typevehicle == 1 ? 'Carro Particular' : 'Ambulancia' }}
                                                </td>
                                                <td><span
                                                        :class="items.state == 1 ? 'badge bg-success' : 'badge bg-secondary'">{{
                                                            items.state == 1 ? 'Activo' : 'Desactivado' }}</span></td>
                                                <td>{{ moment(items.created_at).format('DD/MM/YYYY') }}</td>
                                                <td>
                                                    <button v-if="this.$validateUser('16')"
                                                        class="text-secondary font-weight-bold text-xs btn btn-sm p-2 btn-outline-danger mt-2"
                                                        @click="deleteVehicle(items.id_vehicle)">Borrar</button>
                                                    <button v-if="this.$validateUser('15')"
                                                        class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-outline-info mt-2"
                                                        data-toggle="tooltip" data-original-title="Edit user"
                                                        @click="Update(items.id_vehicle)">Editar</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="text-center p-5">
                                        <ErrorsMessage v-if="!this.$validatePropertyEmpty(getvehicle)"
                                            valueError="No tenemos resultados disponible para"
                                            :valueinput="vehicleSearch" />
                                    </div>
                                </div>
                                <!-- Paginador -->
                                <nav aria-label="Page navigation">
                                    <ul class="pagination justify-content-end">
                                        <li class="page-item" :class="{ disabled: !getPrevPageUrl }">
                                            <button class="page-link" @click="changePage(currentPage - 1)"
                                                :disabled="!getPrevPageUrl"><i class="fas fa-angle-left"></i></button>
                                        </li>

                                        <!-- Renderizar las páginas -->
                                        <li v-for="page in visiblePages()" :key="page" class="page-item"
                                            :class="{ active: currentPage === page }">
                                            <button v-if="page !== '...'" class="page-link" @click="changePage(page)">{{
                                                page }}</button>
                                            <span v-else class="page-link">...</span>
                                        </li>

                                        <li class="page-item" :class="{ disabled: !getNextPageUrl }">
                                            <button class="page-link" @click="changePage(currentPage + 1)"
                                                :disabled="!getNextPageUrl"><i class="fas fa-angle-right"></i></button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import ErrorsMessage from '../Utils/ErrorsMessage.vue';
import Loading from '../Utils/Loading.vue';
import Swal from 'sweetalert2';

export default {
    name: 'vehicleList',
    data() {
        return {
            stateModal: false,
            userValidate: {},
            isLoading: true,
            title: 'Vehiculos',
            vehicleSearch: ''
        };
    },
    methods: {
        ...mapActions('Vehicle', ["get", "destroy", "searchVehicle"]),
        async searchVehicles() {
            await this.searchVehicle(this.vehicleSearch)
        },
        async deleteVehicle(id) {
            const result = await Swal.fire({
                title: '¿Está seguro que deseas eliminar este vehiculo?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
            });
            if (result.isConfirmed) {
                await this.destroy(id);
                Swal.fire('¡Eliminado!', 'El vehiculo ha sido eliminado.', 'success');
                this.loadingActive();
            }
        },

        visiblePages() {
            const total = this.totalPages || 0;
            const current = this.currentPage || 1; 
            const pages = [];
            if (isNaN(total) || isNaN(current)) {
                return pages;
            }
            if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (current > 4) {
                    pages.push('...');
                }
                for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
                    pages.push(i);
                }
                if (current < total - 3) {
                    pages.push('...');
                }
                pages.push(total);
            }
            return pages;
        },

        async changePage(page) {
            if (page !== '...' && page !== this.currentPage) {
                this.isLoading = true;
                await this.get(page);
                this.isLoading = false;
            }
        },

        moment,
        async loadingActive() {
            this.isLoading = true;
            await this.get();
            this.isLoading = false;
        }
    },
    computed: {
        ...mapGetters('Vehicle', ['getvehicle', 'getCurrentPage', 'getTotalPages', 'getNextPageUrl', 'getPrevPageUrl']),
        currentPage() {
            return this.getCurrentPage || 1;
        },
        totalPages() {
            return this.getTotalPages || 0;
        },
    },
    async mounted() {
        await this.loadingActive();
    },
    components: {
        ErrorsMessage,
        Loading
    }
};

</script>