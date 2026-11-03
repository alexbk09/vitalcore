<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'
import viewHistory from './formView.vue'
import Swal from 'sweetalert2'
import Loading from '../Utils/Loading.vue';
import 'sweetalert2/src/sweetalert2.scss'
import buttonStatus from '../TrafficLight/buttonStatus.vue'
import PaginationComponent from './../../../components/common/PaginationComponent.vue'
import { API_URL } from '../../../config/global';

export default {
    name: 'HistoryList',
    data() {
        return {
            stateModal: false,
            document: '',
            key_trade_agreement: '',
            key_mission_company: '',
            agreements: '',
            service: {
                id: '',
                company: '',
                id_mision: ''
            },
            fecha: '',
            hora: '',
            ids: [1, 2, 3], // Aquí puedes agregar los IDs que recibas
            showModal: null,
            historyState: '',
            state: {
                id_history: '',
                state: '',
                text: 'CONFIRMAR LLEGADA'
            },
            isLoading: true,
            title: 'Ordenes',
            view: false,
            showFilters: true,
            showButtonFilters: false,
            start_date: '', // Definir start_date
            end_date: '' // Definir end_date


        }
    },
    created() {
        this.actualizarFechaHora();
        // Actualizar fecha y hora cada segundo
        setInterval(this.actualizarFechaHora, 1000);

        window.addEventListener('resize', this.checkScreenSize);

        this.checkScreenSize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenSize);
    },
    
    methods: {
        ...mapActions('ServiceOrder', ["get", "search", "searchCompany", "cleadCompany", "updateState", "getCompany"]),
        ...mapActions('Agreements', ["getagreement", "getgeoreferencing"]),
        ...mapActions('History', ["generatePdf", "generateDiagnosis", "generateMedicines", "generateRemisions", "generateIncapacities", "generateRecommendations", "genetareSummary", "generateConsent","generateMedicineFocalized","searchProcedure"]),
        checkScreenSize() {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 768) {
                this.showFilters = false;  // Ocultar filtros en pantallas pequeñas
                this.showButtonFilters = true;
            } else {
                this.showFilters = true;  // Mostrar filtros en pantallas grandes
                this.showButtonFilters = false;
            }
        },
        Update(updateorder, key_patient) {
            this.$router.push('/add/serviceOrder/' + updateorder + '/' + key_patient)
        },
        async generar(history, patient) {
            if (history !== undefined) {
                const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient
                };
                Swal.fire({
                    title: 'Generando PDF',
                    html: 'Por favor, espera un momento...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.generatePdf(searchHistory);
                    Swal.close();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al generar el PDF.',
                    });
                }
            }
        },
        async generarDiagnosis(history, patient) {
            if (history != undefined) {
                const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient
                }
                Swal.fire({
                    title: 'Generando PDF',
                    html: 'Por favor, espera un momento...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.generateDiagnosis(searchHistory)
                    Swal.close();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al generar el PDF.',
                    });
                }
            }
        },
        async generarMedicine(history, patient) {
            if (history != undefined) {
                const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient,
                    IDMedicine: []
                }
                Swal.fire({
                    title: 'Generando PDF',
                    html: 'Por favor, espera un momento...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.generateMedicines(searchHistory)
                    Swal.close();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al generar el PDF.',
                    });
                }
            }
        },
        async generarMedicineFocalized(history, patient) {
            if (history != undefined) {
                const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient,
                    IDMedicine: []
                }
                Swal.fire({
                    title: 'Generando PDF',
                    html: 'Por favor, espera un momento...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.generateMedicineFocalized(searchHistory)
                    Swal.close();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al generar el PDF.',
                    });
                }
            }
        },
        async generarRemison(history, patient) {
            if (history != undefined) {
                const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient
                }
                Swal.fire({
                    title: 'Generando PDF',
                    html: 'Por favor, espera un momento...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.generateRemisions(searchHistory)
                    Swal.close();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al generar el PDF.',
                    });
                }
            }
        },
        async generarIncapacidad(history, patient) {
            if (history != undefined) {
                const searchHistory = {
                keyHistory: history,
                keyPatient: patient
                };
                Swal.fire({
                title: 'Generando PDF',
                html: 'Por favor, espera un momento...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
                });
                try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const result = await this.generateIncapacities(searchHistory);
                Swal.close();
                if (result !== "Incapacidad generada exitosamente") {
                    Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result,
                    });
                }
                } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al generar el PDF.',
                });
                }
            }
        },


        async generarRecommendation(history, patient) {
            if (history != undefined) {
                const searchHistory = {
                keyHistory: history,
                keyPatient: patient
                };
                Swal.fire({
                title: 'Generando PDF',
                html: 'Por favor, espera un momento...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
                });
                try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const result = await this.generateRecommendations(searchHistory);
                Swal.close();
                if (result !== "Recomendaciones generadas exitosamente") {
                    Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result,
                    });
                }
                } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Ocurrió un error al generar el PDF.',
                });
                }
            }
            },
        async summaryGenerate(history, patient) {
            if (history != undefined) {
                const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient
                }
                Swal.fire({
                    title: 'Generando PDF',
                    html: 'Por favor, espera un momento...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.genetareSummary(searchHistory)
                    Swal.close();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al generar el PDF.',
                    });
                }
            }
        },
        async searchOrder() {
            const searchDataFilter = {
                document: this.document !== undefined && this.document !== null ? this.document : '',
                key_trade_agreement: this.key_trade_agreement !== undefined && this.key_trade_agreement !== null ? this.key_trade_agreement : '',
                key_mission_company: this.key_mission_company !== undefined && this.key_mission_company !== null ? this.key_mission_company : '',
                key_start_date: this.start_date !== undefined && this.start_date !== null ? this.start_date : '',
                key_end_date: this.end_date !== undefined && this.end_date !== null ? this.end_date : ''
            };

            const params = new URLSearchParams(searchDataFilter);
            const url = `${API_URL}orders?${params.toString()}`;
            await this.search(url);
        },
        async clean() {
            this.document = ''
            this.key_mission_company = ''
            this.start_date = ''
            this.end_date = ''
            await this.cleadCompany()
            await this.search()
        },
        SearchAgreements(id) {
            return this.agreements = id
        },
        async SearchCompanys(id) {
            await this.getCompany(id)
        },
        selecClickCompanny(id, name) {
            this.service.company = name
            this.service.id_mision = id
            return
        },
        createHistory(id, key_status) {
            if (key_status != 3) {
                this.sendFormStateHistory(3, id)
                this.$router.push('/add/formHistory/' + id)
            } else {
                this.$router.push('/add/formHistory/' + id)
            }

        },
        createHistoryClose(id) {

            this.$router.push('/add/formHistory/' + id)

        },
        createHistoryAttention(id) {
            this.$router.push('/add/formHistory/' + id)
        },
        stateHistory(id) {
            //console.log("🚀 ~ stateHistory ~ id:", id)

            Swal.fire({
                title: '¿Desea confimar la llegada?',
                text: this.fecha + ' ' + this.hora,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'La llegada ha sido registrada!',
                        text: 'El estado ha sido actualizado',
                        icon: "success"
                    });
                    this.sendFormStateHistory(2, id)
                }
            });


            return
        },
        async sendFormStateHistory(state, id) {
            this.state.id_history = id
            this.state.state = state
            //console.log('🚀 ~ sendFormStateHistory ~ this.state:', this.state);
            const response = await this.updateState(this.state)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Estado Actualizado',
                showConfirmButton: false,
                timer: 1500
            })
            if (response) {
                await this.get();
            }
        },
        async loadingActive() {
            this.isLoading = true
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            await this.search(`${API_URL}orders?key_start_date=${formattedDate}`)
            this.isLoading = false
        },
        moment,
        actualizarFechaHora() {
            const ahora = new Date();

            // Obtener la fecha
            const dia = ahora.getDate();
            const mes = this.obtenerNombreMes(ahora.getMonth());
            const año = ahora.getFullYear();
            this.fecha = `${dia} de ${mes} de ${año}`;

            // Obtener la hora
            const horas = ahora.getHours();
            const minutos = ahora.getMinutes();
            const segundos = ahora.getSeconds();
            this.hora = `${horas}:${minutos}:${segundos}`;
        },
        obtenerNombreMes(numeroMes) {
            const meses = [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre'
            ];
            return meses[numeroMes];
        },
        validateUser() {
            this.userValidate = JSON.parse(localStorage.getItem('user'))
        },
        //Revisar historial del paciente en el modal
        async viewHistoryID(key_history, key_patient) {
            const query = {
                key_history: key_history,
                key_patient: key_patient,
            }
            return this.view = query

        },
        async changePage(page) {
            //console.log("🚀 ~ changePage ~ page:", page)
            this.isLoading = true;
            await this.search(page);
            this.isLoading = false;
        },
        async generarTodosLosConsentimientos(history) {
            try {
                await this.searchProcedure(history);
                const procedures = this.getProceduresHistory;
                
                if (!procedures || procedures.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin consentimientos',
                    text: 'No se encontraron consentimientos para esta historia.',
                });
                return;
                }
                Swal.fire({
                title: 'Generando Consentimientos',
                html: 'Por favor, espera mientras se generan los consentimientos...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
                });
                for (const procedure of procedures) {
                const consentData = {
                    keyHistory: history,
                    keyPatient: procedure.id, // ID del consentimiento
                };
                try {
                    await this.generateConsent(consentData);
                } catch (error) {
                    console.error(`Error al generar el consentimiento con ID ${procedure.id}:`, error);
                }
                }
                Swal.close();
                Swal.fire({
                icon: 'success',
                title: 'Consentimientos generados',
                text: 'Todos los consentimientos se han generado correctamente.',
                });
            } catch (error) {
                Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al generar los consentimientos.',
                });
                console.error('Error al generar los consentimientos:', error);
            }
        }
    },
    computed: {
        ...mapGetters('Agreements', ['getagreements']),
        ...mapGetters('ServiceOrder', ['getserviceOrder', 'getCompanyData', 'getCurrentPage', 'getTotalPages', 'getNextPageUrl', 'getPrevPageUrl', 'getLinks']),
        ...mapGetters('History', ['getProceduresHistory']),
        currentPage() {
            return this.getCurrentPage || 1;
        },
        totalPages() {
            return this.getTotalPages || 0;
        },

    },
    async mounted() {
        await this.loadingActive();
        await this.getagreement();
        await this.validateUser();
    },
    components: {
        /* ArgonButton */
        Loading,
        buttonStatus,
        viewHistory,
        PaginationComponent
    }
}
</script>
<style>
ul.autocompleteCompañia {
    background: white;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 15%;
    position: absolute;
    z-index: 101;
}

ul.autocompleteCompañia>li {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    text-align: left;
}

ul.autocompleteCompañia>li:hover {
    background: #d2d2d24d;
}

.text-busqueda {
    font-size: 13px;
    text-transform: capitalize;
}

.card-content-history{
    
}


</style>
<template>
    <div>
        <Loading v-if="this.isLoading" :valuetitle="title" />
        <div class="container-fluid py-7" v-else>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="align-self-end py-2 px-2 d-none d-md-block d-xl-block d-xxl-block">
                            <buttonStatus />
                        </div>
                        <div class="card-body px-3 pt-2 ">
                            <!-- Botón para mostrar los filtros en pantallas pequeñas (d-xl-none asegura que no se muestre en pantallas grandes) -->
                            <div class="text-end mb-3" v-if="this.showButtonFilters">
                                <button class="btn btn-secondary btn-sm" @click="showFilters = !showFilters">
                                    <i class="fas fa-filter"></i> Filtros
                                </button>
                            </div>

                            <!-- Contenedor de los filtros -->
                            <div class="row justify-content-end" v-show="showFilters || $screenLgAndUp">
                                <div class="col-md-6 col-xl-2">
                                    <label for="">Desde</label>
                                    <input type="date" class="form-control" v-model="start_date" />
                                </div>
                                <div class="col-md-6 col-xl-2">
                                    <label for="">Hasta</label>
                                    <input type="date" class="form-control" v-model="end_date" />
                                </div>
                                <div class="col-md-6 col-xl-2">
                                    <label for="">Identificación</label>

                                    <input type="text" class="form-control" placeholder="Buscar documento"
                                        autocomplete="off" name="orderSearch" @input="searchOrder" v-model="document" />

                                </div>
                                <div class="col-md-6 col-xl-2">
                                    <label for="">Acuerdos Comerciales</label>
                                    <select class="form-select" name="key_trade_agreement" v-model="key_trade_agreement"
                                        @change="SearchCompanys(key_trade_agreement)">
                                        <option value="" selected> Seleccione</option>
                                        <option :value="items.id_transfer" :key="items.id_transfer"
                                            v-for="items in getagreements">
                                            {{ items.name_agreements }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6 col-xl-2">
                                    <label for="">Empresa en Misión</label>
                                    <select name="key_mission_company" class="form-select"
                                        v-model="key_mission_company">
                                        <option value="" selected> Seleccione</option>
                                        <option :value="row.id" :key="row.id" v-for="row in getCompanyData">
                                            {{ row.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6 col-xl-2 col-xxl-2 text-center mt-4">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-primary" @click="searchOrder()">
                                            <i class="fas fa-filter"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary" @click="clean()"
                                            v-if="this.start_date || this.end_date || this.document || this.key_trade_agreement || this.key_mission_company">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Vista de tarjetas para móviles -->
                            <div class="row mt-4 d-md-none">
                                <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="items in getserviceOrder" :key="items.id">
                                    <div class="card h-100 shadow-lg bg-body rounded card-content-history">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ items.firstname }} {{ items.first_surname }}</h5>
                                            <p class="card-text">
                                                <strong>Fecha:</strong> {{ moment(items.created_at).format('DD/MM/YYYY') }}<br>
                                                <strong>Teléfono:</strong> {{ items.user_phone }}<br>
                                                <strong>Otro Teléfono:</strong> {{ items.user_phone_2 }}<br>
                                                <strong>Procedimiento:</strong> <span v-if="items.services == 1">EXTRAMURAL DOMICILIARIA</span><span v-if="items.services == 2">TELEMEDICINA INTERACTIVA</span><br>
                                                <strong>Identificación:</strong> {{ items.document }}<br>
                                                <strong>Empresa:</strong> {{ items.name_mission_company }}
                                            </p>
                                            <div class="d-grid gap-2">
                                                <button @click="stateHistory(items.id)" v-if="items.key_status === 1" class="btn btn-sm" :style="items.key_status == 1 ? 'background-color: rgb(255, 255, 0); color: black; font-weight:500 !important' : ''">Pendiente</button>
                                                <button @click="createHistory(items.id, items.id_patient, items.key_history)" v-if="items.key_status === 2" class="btn btn-sm" :style="items.key_status == 2 ? 'background-color: rgb(87 225 158); color: black; font-weight:500 !important' : ''">Atender Paciente</button>
                                                <button @click="createHistoryAttention(items.id)" v-if="items.key_status === 3 && this.$validateModule('18')" class="btn btn-sm" :style="items.key_status == 3 ? 'background-color: rgb(255, 196, 0); color: black; font-weight:500 !important' : ''">Atender Paciente</button>
                                                <button @click="createHistoryClose(items.id, items.id_patient, items.key_history, items.key_status)" v-if="items.key_status === 4" class="btn btn-sm" :style="items.key_status == 4 ? 'background-color: rgb(67, 160, 71); color: black; font-weight:500 !important' : ''">Visualizar Historia</button>
                                                <button @click="createHistory(items.id, items.id_patient, items.key_history, items.key_status)" v-if="items.key_status === 5" class="btn btn-sm" :style="items.key_status == 5 ? 'background-color: rgb(229, 57, 53); color: black; font-weight:500 !important' : ''">Visualizar Historia</button>
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle btn-sm p-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-print" aria-hidden="true"></i>
                                                </button>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <!-- <li><a class="dropdown-item" @click="generarConsentimiento(items.key_history, items.id_patient)">Consentimiento</a></li> -->
                                                    <li><a class="dropdown-item" @click="generarTodosLosConsentimientos(items.key_history)">Generar Consentimientos</a> </li>
                                                    <li><a class="dropdown-item" @click="generar(items.key_history, items.id_patient)">Historia Clinica</a></li>
                                                    <li><a class="dropdown-item" @click="summaryGenerate(items.key_history, items.id_patient)">Resumen de Atención</a></li>
                                                    <li><a class="dropdown-item" @click="generarMedicine(items.key_history, items.id_patient)">Recetario Medico</a></li>
                                                    <li><a class="dropdown-item" @click="generarMedicineFocalized(items.key_history, items.id_patient)">Medicamentos Focalizados</a></li>
                                                    <li><a class="dropdown-item" @click="generarRemison(items.key_history, items.id_patient)">Remisión o Traslado</a></li>
                                                    <li><a class="dropdown-item" @click="generarIncapacidad(items.key_history, items.id_patient)">Incapacidad</a></li>
                                                    <li><a class="dropdown-item" @click="generarRecommendation(items.key_history, items.id_patient)">Recomendaciones</a></li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12" v-if="this.getserviceOrder == ''"> No tenemos resultados</div>
                                
                            </div>

                            <!-- Vista de tabla para pantallas grandes -->
                            <table class="table table-sm align-items-center mb-0 d-none d-md-table" style="font-size:13px; table-layout: auto; width: 100%;height: 300px; overflow-y: scroll;">
                                <thead>
                                    <tr>
                                        <th class="text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1">Fecha</th>
                                        <th class="text-center text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1">Teléfono</th>
                                        <th class="text-center text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1">Otro Teléfono</th>
                                        <th class="text-center text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1">Procedimiento</th>
                                        <th class="text-center text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1">N° de identificación</th>
                                        <th class="text-center text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1">Nombre y Apellido</th>
                                        <th class="text-center text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1">Empresa</th>
                                        <th class="text-center text-secondary text-xxs font-weight-bolder opacity-7 py-2 px-1"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="items in getserviceOrder" :key="items.id">
                                        <td class="">
                                            <div class="d-flex flex-column justify-content-center">
                                                <span class="mb-0 text-sm">{{ moment(items.created_at).format('DD/MM/YYYY') }}</span>
                                            </div>
                                            <div class="d-grid gap-1 mt-1">
                                                <button @click="stateHistory(items.id)" v-if="items.key_status === 1" class="btn btn-sm py-1 px-2" :style="items.key_status == 1 ? 'background-color: #FFCB00; color: white; font-weight:500 !important' : ''">Pendiente</button>
                                                <button @click="createHistory(items.id, items.id_patient, items.key_history)" v-if="items.key_status === 2" class="btn btn-sm py-1 px-2" :style="items.key_status == 2 ? 'background-color: #FEAB3D; color: white; font-weight:500 !important' : ''">Atender Paciente</button>
                                                <button @click="createHistoryAttention(items.id)" v-if="items.key_status === 3 && this.$validateModule('18')" class="btn btn-sm py-1 px-2" :style="items.key_status == 3 ? 'background-color: rgb(254, 171, 61); color: white; font-weight:500 !important' : ''">Atender Paciente</button>
                                                <button @click="createHistoryClose(items.id, items.id_patient, items.key_history, items.key_status)" v-if="items.key_status === 4" class="btn btn-sm py-1 px-2" :style="items.key_status == 4 ? 'background-color: rgb(67, 160, 71); color: white; font-weight:500 !important' : ''">Visualizar Historia</button>
                                                <button @click="createHistory(items.id, items.id_patient, items.key_history, items.key_status)" v-if="items.key_status === 5" class="btn btn-sm py-1 px-2" :style="items.key_status == 5 ? 'background-color: rgb(229, 57, 53); color: white; font-weight:500 !important' : ''">Visualizar Historia</button>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center ">
                                            <span class="text-secondary text-xs font-weight-bold">{{ items.user_phone }}</span>
                                        </td>
                                        <td class="align-middle text-center ">
                                            <span class="text-secondary text-xs font-weight-bold">{{ items.user_phone_2 }}</span>
                                        </td>
                                        <td class="align-middle text-center ">
                                            <span class="text-secondary text-xs font-weight-bold" v-if="items.services == 1">EXTRAMURAL DOMICILIARIA</span>
                                            <span class="text-secondary text-xs font-weight-bold" v-if="items.services == 2">TELEMEDICINA INTERACTIVA</span>
                                        </td>
                                        <td class="align-middle text-center ">
                                            <span class="text-secondary text-xs font-weight-bold">{{ items.document }}</span>
                                        </td>
                                        <td class="align-middle text-center ">
                                            <span class="text-secondary text-xs font-weight-bold">{{ items.firstname }} {{ items.first_surname }}</span>
                                        </td>
                                        <td class="align-middle text-center ">
                                            <span class="text-secondary text-xs font-weight-bold">
                                                {{ items.name_mission_company.length > 20 ? items.name_mission_company.substring(0, 20) + '...' : items.name_mission_company }}
                                            </span>
                                        </td>
                                        <td class="align-middle ">
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle btn-sm py-1 px-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-print" aria-hidden="true"></i>
                                                </button>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a class="dropdown-item" @click="generarTodosLosConsentimientos(items.key_history)">Generar Consentimientos</a> </li>
                                                    <li><a class="dropdown-item" @click="generar(items.key_history, items.id_patient)">Historia Clinica</a></li>
                                                    <li><a class="dropdown-item" @click="summaryGenerate(items.key_history, items.id_patient)">Resumen de Atención</a></li>
                                                    <li><a class="dropdown-item" @click="generarMedicine(items.key_history, items.id_patient)">Recetario Medico</a></li>
                                                    <li><a class="dropdown-item" @click="generarMedicineFocalized(items.key_history, items.id_patient)">Medicamentos Focalizados</a></li>
                                                    <li><a class="dropdown-item" @click="generarRemison(items.key_history, items.id_patient)">Remisión o Traslado</a></li>
                                                    <li><a class="dropdown-item" @click="generarIncapacidad(items.key_history, items.id_patient)">Incapacidad</a></li>
                                                    <li><a class="dropdown-item" @click="generarRecommendation(items.key_history, items.id_patient)">Recomendaciones</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="this.getserviceOrder == ''">
                                        <td colspan="8" class="text-center py-2">No tenemos resultados</td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination-component class="p-3"
                        @changePage="changePage"
                        :getCurrentPage="getCurrentPage"
                        :getTotalPages="totalPages"
                        :getNextPageUrl="getNextPageUrl"
                        :getPrevPageUrl="getPrevPageUrl"
                        :getLinks="getLinks">
                    </pagination-component>
                        </div>
                        
                    </div>
                    <!-- Mueve el paginador aquí, fuera de la card -->
                    
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <form action="" v-on:submit.prevent="sendFormStateHistory(2)">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Registro de llegada</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p class="h4 text-center">{{ this.fecha }} {{ this.hora }}</p>

                            <div class="row">
                                <div class="col-md-10">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" name="text" placeholder="Confirmar"
                                            v-model="state.text">

                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-success" type="submit" data-bs-dismiss="modal"><i
                                            class="fa fa-check" aria-hidden="true"></i></button>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <!-- <button type="button" class="btn btn-primary">Enviar Correo</button> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="viewInfo" aria-hidden="true">
            <div class="modal-dialog  modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewInfo">Historia Clinica</h5>
                        <button type="button" class="close btn btn-light" data-bs-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- {{ this.view }} -->
                        <viewHistory :viewkey="this.view" v-if="this.view"> </viewHistory>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>