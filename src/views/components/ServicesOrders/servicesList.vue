<script>
import { mapGetters } from 'vuex/dist/vuex.cjs.js';
import buttonStatus from '../TrafficLight/buttonStatus.vue';
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import { mapActions } from "vuex";
import moment from 'moment';

export default {
    name: 'HistoryList',
    data() {
        return {
            filters: {
                fechaDesde: new Date().toISOString().split('T')[0], // Fecha actual por defecto
                fechaHasta: '',
                identificacion: '',
                acuerdosComerciales: '', // Aquí se almacenará el ID del acuerdo comercial seleccionado
                empresaMision: '' // Aquí se almacenará el ID de la empresa en misión seleccionada
            },
            filteredMissionCompanies: [] // Opciones filtradas para "EMPRESA EN MISIÓN"
        };
    },
    watch: {
        // Observa cambios en el filtro de acuerdos comerciales
        'filters.acuerdosComerciales'(newVal) {
            if (newVal) {
                // Encuentra el acuerdo comercial seleccionado
                const selectedAgreement = this.listAgreements.find(
                    agreement => agreement.id === parseInt(newVal)
                );
                // Actualiza las opciones de empresas en misión
                this.filteredMissionCompanies = selectedAgreement
                    console.log("🚀 ~ this.filteredMissionCompanies:", this.filteredMissionCompanies)
                    ? selectedAgreement.mission_company.map(company => ({
                          id: company.id,
                          name: company.name
                      }))
                    : [];
            } else {
                // Si no hay selección, limpia las opciones
                this.filteredMissionCompanies = [];
            }
        }
    },
    mounted() {
        this.applyFilters();
        this.getAgreementsSelect();
    },
    computed: {
        ...mapGetters('OrderService', ['getServiceOrder']),
        ...mapGetters('TradeAgreement', ['listAgreements']),
    },
    methods: {
        moment,
        ...mapActions('OrderService', ["getOrderServiceFilters"]),
        ...mapActions('TradeAgreement', ["getAgreementsSelect"]),
        getStatusStyle(status) {
            const statusMap = {
                1: { text: 'Pendiente', style: 'background-color: #FFCB00; color: white !important; font-weight:500' },
                2: { text: 'Activo', style: 'background-color: #FEAB3D; color: white !important; font-weight:500' },
                3: { text: 'En Atención', style: 'background-color: rgb(255, 196, 0); color: white; font-weight:500' },
                4: { text: 'Finalizado', style: 'background-color: rgb(67, 160, 71); color: white !important; font-weight:500' },
                5: { text: 'Cancelado', style: 'background-color: rgb(229, 57, 53); color: white !important; font-weight:500' }
            };
            return statusMap[status] || { text: 'Desconocido', style: '' };
        },

        async applyFilters() {
            // Crear un objeto con los filtros no vacíos y mapear los nombres requeridos
            const activeFilters = {
                key_start_date: this.filters.fechaDesde || new Date().toISOString().split('T')[0], // Fecha actual por defecto
                key_end_date: this.filters.fechaHasta || undefined,
                document: this.filters.identificacion || undefined,
                key_trade_agreement: this.filters.acuerdosComerciales || undefined,
                key_mission_company: this.filters.empresaMision || undefined
            };
            // Eliminar campos undefined
            Object.keys(activeFilters).forEach(key => {
                if (!activeFilters[key]) {
                    delete activeFilters[key];
                }
            });
            try {
                // Llamar a la acción Vuex con los filtros activos
                await this.getOrderServiceFilters(activeFilters);
            } catch (error) {
                console.error('Error al aplicar filtros:', error);
            }
        },

        clearFilters() {
            // Restablecer los filtros a sus valores predeterminados
            this.filters = {
                fechaDesde: new Date().toISOString().split('T')[0],
                fechaHasta: '',
                identificacion: '',
                acuerdosComerciales: '',
                empresaMision: ''
            };
            this.filteredMissionCompanies = []; // Limpiar las opciones de empresas en misión
            this.applyFilters(); // Llamar a applyFilters para actualizar los datos
        },

        create() {
            this.$router.push('/ServiceOrder/add');
        },
        UpdateOrderService(id_order_services, key_patient) {
            this.$router.push('/ServiceOrder/edit/' + key_patient + '/' + id_order_services);
        },
    },
    components: {
        buttonStatus,
        BaseInput,
        BaseSelect,
    }
};
</script>

<template>
    <div class="container-fluid py-7 mt-4">
        <div class="card p-4 border rounded shadow-sm">
            <div class="align-self-end py-4">
                <buttonStatus />
            </div>
            <div class="row mb-3 ">
                <div class="col-auto">
                    <BaseInput 
                        id="fechaDesde" 
                        label="DESDE" 
                        type="date" 
                        placeholder="" 
                        class="form-control-sm" 
                        v-model="filters.fechaDesde" 
                    />
                </div>
                <div class="col-auto">
                    <BaseInput 
                        id="fechaHasta" 
                        label="HASTA" 
                        type="date" 
                        placeholder="" 
                        class="form-control-sm" 
                        v-model="filters.fechaHasta" 
                    />
                </div>
                <div class="col-md-2">
                    <BaseInput 
                        id="identificacion" 
                        label="IDENTIFICACIÓN" 
                        type="text" 
                        placeholder="BUSCAR DOCUMENTO" 
                        class="form-control-sm" 
                        v-model="filters.identificacion" 
                    />
                </div>
                <div class="col-md-2">
                    <BaseSelect 
                        id="acuerdosComerciales" 
                        label="ACUERDOS COMERCIALES" 
                        placeholder="SELECCIONE" 
                        :options="listAgreements" 
                        v-model="filters.acuerdosComerciales" 
                        class="form-select-sm" 
                    />
                </div>
                <div class="col-md-2">
                    <BaseSelect 
                        id="empresaMision" 
                        label="EMPRESA EN MISIÓN" 
                        placeholder="SELECCIONE" 
                        :options="filteredMissionCompanies.mission_company" 
                        v-model="filters.empresaMision" 
                        class="form-select-sm" 
                    />
                </div>
                <div class="col-md-2">
                    <div class="btn-group mt-3" role="group" aria-label="Basic example">
                        <button class="btn btn-primary btn-sm py-0" @click="applyFilters">
                            <i class="fas fa-filter me-2"></i> FILTRAR
                        </button>
                        <button class="btn btn-primary btn-sm py-0" @click="clearFilters">
                            <i class="fas fa-trash me-2"></i> Limpiar
                        </button>
                        <button class="btn btn-primary btn-sm py-2" @click="create">
                            NUEVA ORDEN 
                        </button>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table text-center table-borderless table-hover">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Tipo de Evaluación</th>
                            <th>N° de identificación</th>
                            <th>Nombre</th>
                            <th>Acuerdo comercial</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in getServiceOrder.data" :key="index">
                            <td>{{ moment(item.created_at).format('DD/MM/YYYY') }}</td>
                            <td>
                                <span
                                    class="badge"
                                    :style="getStatusStyle(item.key_status).style"
                                >
                                    {{ getStatusStyle(item.key_status).text }}
                                </span>
                            </td>
                            <td>
                                <span class="text-secondary text-xs font-weight-bold"
                                    v-if="item.services == 1">EXTRAMURAL DOMICILIARIA</span>
                                <span class="text-secondary text-xs font-weight-bold"
                                    v-if="item.services == 2">TELEMEDICINA INTERACTIVA</span>
                            </td>
                            <td>{{ item.document }}</td>
                            <td>{{ item.firstname }} {{ item.first_surname }}</td>
                            <td>{{ item.get_trade_agreement.name_agreements }}</td>
                            <td class="align-middle">
                                <button
                                    class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-link mt-2"
                                    data-toggle="tooltip" v-if="this.$validateUser('46')"
                                    data-original-title="Edit user"
                                    @click="UpdateOrderService(item.id_patient, item.id_order_services)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button type="button"
                                    class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-link mt-2"
                                    @click="consulterOrder(item)" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"><i class="fas fa-search"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>