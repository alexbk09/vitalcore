<script>
import html2canvas from "html2canvas";
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import Swal from 'sweetalert2';
import Loading from '../Utils/Loading.vue';
import 'sweetalert2/src/sweetalert2.scss';
import buttonStatus from '../TrafficLight/buttonStatus.vue';
import PaginationComponent from './../../../components/common/PaginationComponent.vue';
import { API_URL } from '../../../config/global';

export default {
    name: 'HistoryList',
    components: {
        Loading,
        buttonStatus,
        PaginationComponent,
    },
    data() {
        return {
            stateModal: false,
            document: '',
            key_trade_agreement: '',
            key_mission_company: '',
            start_date: '',
            end_date: '',
            agreements: '',
            serviceOrderr: {
                operator_coordinator: '',
                time: '',
                date: '',
                n_order: 'Por Asignar',
                state: '',
                type_ID_patient: '',
                number_ID_patient: '',
                first_name: '',
                second_surname: '',
                name_patient: '',
                second_name_patient: '',
                patient_gender: '',
                contact_phone: '',
                patient_cell: '',
                zone_patient: '',
                direction_patient: '',
                patient_ward: '',
                patient_location: '',
                patient_campus: '',
                patient_municipality: '',
                patient_department: '',
                patient_diagnosis: '',
                company: '',
                company_geolocation: '',
                company_vehicle: '',
                company_event: '',
                company_request: '',
                company_payer: '',
                company_procedure: '',
                reporting_user: '',
                user_charge: '',
                user_phone_2: '',
                user_phone: '',
                authorizing_user: '',
                type_transfer: '',
                transfer_code: '',
                authorize: '',
                observation: '',
                busquedacups: '',
                id: '',
                id_mision: '',
                amount: '',
                code: '',
                descri: '',
                curren: '',
                type_cups: '',
                type_rips: '',
                id_history: '',
                copago: 0,
                email_patient: '',
                codeTraslate: '',
                company_type: 0,
                companions_email: '',
                key_status: '',
                key_history: '',
            },
            service: {
                id: '',
                company: '',
                id_mision: ''
            },
            isLoading: true,
            title: 'Ordenes',
            checkboxActivado: false,
            checkboxTraslate: false,
            fecha: '',
            hora: '',
            userValidate: null
        };
    },
    computed: {
        ...mapGetters('ServiceOrder', ['getserviceOrder', 'getCompanyData', 'getCurrentPage', 'getTotalPages', 'getNextPageUrl', 'getPrevPageUrl', 'getLinks', 'getserviceOrderID', 'getDoctorData', 'getPatientData', 'getHistoryData']),
        ...mapGetters('Cups', ['getCups']),
        ...mapGetters('Vehicle', ['getvehicle']),
        ...mapGetters('EventType', ['getevent']),
        ...mapGetters('Request', ['getrequest']),
        ...mapGetters('Seat', ['getseat']),
        ...mapGetters('DocumentType', ['getDocument']),
        ...mapGetters('Municipality', ['dataDepartaments', 'getLocalities', 'dataMunicipalities']),
        ...mapGetters('Agreements', ['getagreements', 'getCompanyData', 'getgeoreferencingData', 'getgeoreferencinglDataID']),
        ...mapGetters('Products', ['getProducts']),
        currentPage() {
            return this.getCurrentPage || 1;
        },
        totalPages() {
            return this.getTotalPages || 0;
        },
    },
    created() {
        this.actualizarFechaHora();
        setInterval(this.actualizarFechaHora, 1000);
    },
    methods: {
        ...mapActions('ServiceOrder', ["get", "search", "searchCompany", "cleadCompany", "updateState", "getCompany", "searchDoctor", "SearchOrder"]),
        ...mapActions('History', ["generatePdf", "generateDiagnosis", "generateMedicines", "generateRemisions", "generateIncapacities", "generateRecommendations"]),
        ...mapActions('Cups', ["searchCupsAgreements", "cleadCups"]),
        ...mapActions('Vehicle', ["getvehicleSeat"]),
        ...mapActions('EventType', ["getevents"]),
        ...mapActions('Request', ["getrequests"]),
        ...mapActions('Seat', ["getpanel"]),
        ...mapActions('DocumentType', ["getDocumentType"]),
        ...mapActions('Municipality', ["getDepartaments", "getLocalitiesType", "getMunicipalities"]),
        ...mapActions('Agreements', ["getagreement", "Search", "searchCompany", "cleadCompany", "getgeoreferencing", "getCompany"]),
        
        Update(id_order_services, key_patient) {
            this.$router.push('/ServiceOrder/edit/' + id_order_services + '/' + key_patient);
        },
        
        create() {
            this.$router.push('/serviceOrder/add');
        },
        
        async searchOrder() {
            try {
                const searchDataFilter = {
                    document: this.document || null,
                    key_trade_agreement: this.key_trade_agreement || null,
                    key_mission_company: this.key_mission_company || null,
                    key_start_date: this.start_date || null,
                    key_end_date: this.end_date || null
                };

                const filteredSearchDataFilter = Object.fromEntries(
                    Object.entries(searchDataFilter).filter(([_, v]) => v != null)
                );

                const params = new URLSearchParams(filteredSearchDataFilter);
                const url = `${API_URL}orders?${params.toString()}`;
                await this.search(url);
            } catch (error) {
                console.error('Error al buscar órdenes:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al buscar las órdenes'
                });
            }
        },
        
        async clean() {
            this.document = '';
            this.key_trade_agreement = '';
            this.key_mission_company = '';
            this.start_date = '';
            this.end_date = '';
            await this.cleadCompany();
            await this.get();
        },
        
        SearchAgreements(id) {
            return this.agreements = id;
        },
        
        async SearchCompanys(id) {
            try {
                await this.getCompany(id);
            } catch (error) {
                console.error('Error al buscar compañías:', error);
            }
        },
        
        async loadingActive() {
            this.isLoading = true;
            try {
                await this.get();
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                this.isLoading = false;
            }
        },
        
        moment,
        
        actualizarFechaHora() {
            const ahora = new Date();
            const dia = ahora.getDate();
            const mes = this.obtenerNombreMes(ahora.getMonth());
            const año = ahora.getFullYear();
            this.fecha = `${dia} de ${mes} de ${año}`;
            
            const horas = String(ahora.getHours()).padStart(2, '0');
            const minutos = String(ahora.getMinutes()).padStart(2, '0');
            const segundos = String(ahora.getSeconds()).padStart(2, '0');
            this.hora = `${horas}:${minutos}:${segundos}`;
        },
        
        obtenerNombreMes(numeroMes) {
            const meses = [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];
            return meses[numeroMes];
        },
        
        validateUser() {
            try {
                this.userValidate = JSON.parse(localStorage.getItem('user'));
            } catch (error) {
                console.error('Error al validar usuario:', error);
                this.userValidate = null;
            }
        },
        
        async changePage(page) {
            this.isLoading = true;
            try {
                await this.search(page);
            } catch (error) {
                console.error('Error al cambiar página:', error);
            } finally {
                this.isLoading = false;
            }
        },
        
        async consulterOrder(data) {
            if (!data.id_order_services) return;
            
            try {
                const searchOrders = {
                    keyHistory: data.id_order_services,
                    keyPatient: data.id_patient
                };
                
                await this.SearchOrder(searchOrders);
                this.serviceOrderr = this.getserviceOrderID;
                
                await Promise.all([
                    this.SearchAgreementsID(this.getserviceOrderID.company_payer),
                    this.SearchDepartments(this.serviceOrderr.patient_department),
                    this.SearchGeoreferencingData(this.getserviceOrderID.patient_campus),
                    this.getMunicipalities(this.serviceOrderr.patient_municipality),
                    this.searchDoctor()
                ]);
            } catch (error) {
                console.error('Error al consultar orden:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al consultar la orden'
                });
            }
        },
        
        async SearchAgreementsID(id) {
            if (!id) return;
            
            try {
                this.getCompanyData = '';
                await Promise.all([
                    this.getCompany(id),
                    this.getgeoreferencing(id)
                ]);
                return this.agreements = id;
            } catch (error) {
                console.error('Error al buscar acuerdos:', error);
            }
        },
        
        SearchGeoreferencingData(id) {
            if (!id) return;
            this.getvehicleSeat(id);
        },
        
        async SearchDepartments(id) {
            if (!id) return;
            
            try {
                await Promise.all([
                    this.getLocalitiesType(id),
                    this.getMunicipalities(id)
                ]);
            } catch (error) {
                console.error('Error al buscar departamentos:', error);
            }
        },
        
        async captureAndCopy() {
            await this.$nextTick();
            const captureArea = document.querySelector("#capture-area");
            
            if (!captureArea) {
                console.error("El área de captura no fue encontrada");
                return;
            }
            
            try {
                const canvas = await html2canvas(captureArea, {
                    scale: 2,
                    useCORS: true,
                    width: captureArea.scrollWidth,
                    height: captureArea.scrollHeight
                });

                canvas.toBlob(async (blob) => {
                    try {
                        if (navigator.clipboard && navigator.clipboard.write) {
                            const item = new ClipboardItem({ "image/png": blob });
                            await navigator.clipboard.write([item]);
                            Swal.fire({
                                icon: "success",
                                title: "Imagen copiada al portapapeles",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            throw new Error('Clipboard API no soportada');
                        }
                    } catch (error) {
                        console.error("Error al copiar al portapapeles: ", error);
                        Swal.fire({
                            icon: "error",
                            title: "Error al copiar la imagen",
                            text: "Tu navegador no soporta esta función",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            } catch (error) {
                console.error("Error al capturar la pantalla: ", error);
                Swal.fire({
                    icon: "error",
                    title: "Error al capturar",
                    text: "Hubo un problema al capturar la pantalla",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    },
    async mounted() {
        try {
            await Promise.all([
                this.loadingActive(),
                this.getagreement(),
                this.validateUser(),
                this.get(),
                this.getpanel(),
                this.getDocumentType(),
                this.getevents(),
                this.getrequests(),
                this.getDepartaments(),
                this.getagreement()
            ]);
        } catch (error) {
            console.error('Error al inicializar componente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al cargar los datos iniciales'
            });
        }
    }
};
</script>

<style>
/* Estilos generales */
.container-fluid {
    padding: 1rem;
}

.card {
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* Estilos para autocompletado */
ul.autocompleteCompañia {
    background: white;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 15%;
    position: absolute;
    z-index: 101;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-radius: 4px;
}

ul.autocompleteCompañia > li {
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s;
}

ul.autocompleteCompañia > li:hover {
    background: #f8f9fa;
}

.text-busqueda {
    font-size: 13px;
    text-transform: capitalize;
}

/* Estilos responsivos */
@media (max-width: 768px) {
    .container-fluid {
        padding: 0.5rem;
    }
    
    .card {
        margin-bottom: 1rem;
    }
    
    .table-responsive {
        margin: 0 -0.5rem;
    }
    
    ul.autocompleteCompañia {
        width: 100%;
    }
}

/* Mejoras de accesibilidad */
.form-control:focus,
.form-select:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

.btn:focus {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

/* Animaciones suaves */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

<template>
    <div>
        <Loading v-if="isLoading" :valuetitle="title" />
        <div class="container-fluid py-7" v-else>
            <div class="card">
                <div class="align-self-end py-4">
                    <buttonStatus />
                </div>
                <div class="card-body">
                    <!-- Filtros de búsqueda -->
                    <div class="row g-3">
                        <div class="col-md-6 col-xl-2">
                            <label for="start_date">Desde</label>
                            <input type="date" class="form-control" id="start_date" v-model="start_date" />
                        </div>
                        <div class="col-md-6 col-xl-2">
                            <label for="end_date">Hasta</label>
                            <input type="date" class="form-control" id="end_date" v-model="end_date" />
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <label for="document">Identificación</label>
                            <input type="text" class="form-control" id="document" placeholder="Buscar documento" 
                                autocomplete="off" v-model="document" />
                        </div>
                        <div class="col-md-6 col-xl-2">
                            <label for="key_trade_agreement">Acuerdos Comerciales</label>
                            <select class="form-select" id="key_trade_agreement" v-model="key_trade_agreement"
                                @change="SearchCompanys(key_trade_agreement)">
                                <option value="">Seleccione</option>
                                <option v-for="items in getagreements" :key="items.id_transfer" 
                                    :value="items.id_transfer">
                                    {{ items.name_agreements }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 col-xl-2">
                            <label for="key_mission_company">Empresa en Misión</label>
                            <select class="form-select" id="key_mission_company" v-model="key_mission_company">
                                <option value="">Seleccione</option>
                                <option v-for="row in getCompanyData" :key="row.id" :value="row.id">
                                    {{ row.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 col-xl-1 mt-4">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary" @click="clean()"
                                    v-if="start_date || end_date || document || key_trade_agreement || key_mission_company">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Botones de acción -->
                    <div class="row mt-4">
                        <div class="col-6">
                            <button type="button" class="btn btn-primary" @click="searchOrder()">
                                <i class="fas fa-filter me-2"></i> Filtrar
                            </button>
                        </div>
                        <div class="col-6 text-end">
                            <button type="button" class="btn btn-primary" @click="create()">
                                <i class="fa fa-plus me-2"></i> Nueva Orden
                            </button>
                        </div>
                    </div>

                    <!-- Tabla de resultados -->
                    <div class="table-responsive mt-4" style="height: 60vh;">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Fecha
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Estado
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Tipo de Evaluación
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        N° de identificación
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Nombre
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Acuerdo comercial
                                    </th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="items in getserviceOrder" :key="items.id">
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">
                                                    {{ moment(items.created_at).format('DD/MM/YYYY') }}
                                                </h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm" :style="{
                                            'background-color': items.key_status == 1 ? 'rgb(255, 255, 0)' :
                                                              items.key_status == 2 ? 'rgb(87, 225, 158)' :
                                                              items.key_status == 3 ? 'rgb(255, 196, 0)' :
                                                              items.key_status == 4 ? 'rgb(67, 160, 71)' :
                                                              'rgb(229, 57, 53)',
                                            'color': 'black',
                                            'font-weight': '500 !important'
                                        }">
                                            {{ 
                                                items.key_status == 1 ? 'Pendiente' :
                                                items.key_status == 2 ? 'Activo' :
                                                items.key_status == 3 ? 'En Atención' :
                                                items.key_status == 4 ? 'Finalizado' :
                                                'Cancelado'
                                            }}
                                        </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">
                                            {{ items.services == 1 ? 'EXTRAMURAL DOMICILIARIA' : 'TELEMEDICINA INTERACTIVA' }}
                                        </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">
                                            {{ items.document }}
                                        </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">
                                            {{ items.firstname }} {{ items.first_surname }}
                                        </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">
                                            {{ items.get_trade_agreement.name_agreements }}
                                        </span>
                                    </td>
                                    <td class="align-middle">
                                        <button v-if="$validateUser('46')"
                                            class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-link mt-2"
                                            @click="Update(items.id, items.id_patient)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button type="button"
                                            class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-link mt-2"
                                            @click="consulterOrder(items)"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="!getserviceOrder.length">
                                    <td colspan="7" class="text-center">No tenemos resultados</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Paginación -->
                <pagination-component 
                    class="p-3"
                    @changePage="changePage"
                    :getCurrentPage="currentPage"
                    :getTotalPages="totalPages"
                    :getNextPageUrl="getNextPageUrl"
                    :getPrevPageUrl="getPrevPageUrl"
                    :getLinks="getLinks">
                </pagination-component>
            </div>
        </div>

        <!-- Modal de vista previa -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">VISTA PREVIA DE ORDEN DE SERVICIO</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card-body" id="capture-area">
                            <p class="text-uppercase text-sm">Datos del Paciente</p>
                            <hr>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Tipo de documento:</label>
                                    <select class="form-select form-select-sm" name="type_ID_patient" disabled
                                        v-model="serviceOrderr.type_ID_patient" id="inlineFormCustomSelectPref" readonly>
                                        <option value="1">CC</option>
                                        <option value="2">NIT</option>
                                        <option value="3">RC</option>
                                        <option value="4">TI</option>
                                        <option value="5">NUIP</option>
                                        <option value="6">CE</option>
                                        <option value="7">PA</option>
                                        <option value="8">PE</option>
                                        <option value="9">SV</option>
                                        <option value="10">CD</option>
                                        <option value="11">CN</option>
                                        <option value="12">MS</option>
                                        <option value="13">AS</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">N° de Identificación:</label>
                                    <input type="text" @input="searchPatient" class="form-control form-control-sm"
                                        name="number_ID_patient" v-model="serviceOrderr.number_ID_patient" readonly />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Primer Apellido:</label>
                                    <input type="text" class="form-control form-control-sm" name="first_name" readonly
                                        v-model="serviceOrderr.first_name" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Segundo Apellido:</label>
                                    <input type="text" class="form-control form-control-sm" name="second_surname" readonly
                                        v-model="serviceOrderr.second_surname" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Primer Nombre:</label>
                                    <input type="text" class="form-control form-control-sm" name="name_patient" readonly
                                        v-model="serviceOrderr.name_patient" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Otros Nombres:</label>
                                    <input type="text" class="form-control form-control-sm" name="second_name_patient" readonly
                                        v-model="serviceOrderr.second_name_patient" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Genero:</label>
                                    <select class="form-select form-select-sm" name="patient_gender" readonly disabled
                                        v-model="serviceOrderr.patient_gender" id="inlineFormCustomSelectPref">
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Celular:</label>
                                    <input type="text" class="form-control form-control-sm" name="contact_phone" readonly
                                        v-model="serviceOrderr.contact_phone" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Otro numero de celular:</label>
                                    <input type="text" class="form-control form-control-sm" name="patient_cell" readonly
                                        v-model="serviceOrderr.patient_cell" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Zona:</label>
                                    <select class="form-select form-select-sm" name="zone_patient" disabled
                                        v-model="serviceOrderr.zone_patient" id="inlineFormCustomSelectPref">
                                        <option value="2">Urbana</option>
                                        <option value="1">Rural</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Correo Electronico:</label>
                                    <input type="email" class="form-control form-control-sm" name="email_patient" readonly
                                        v-model="serviceOrderr.email_patient" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Correo Acompañante:</label>
                                    <input type="email" class="form-control form-control-sm" name="companions_email" readonly
                                        v-model="serviceOrderr.companions_email" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label">Dirección:</label>
                                    <input type="text" class="form-control form-control-sm" name="direction_patient" readonly
                                        v-model="serviceOrderr.direction_patient" />
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Barrio:</label>
                                    <input type="text" class="form-control form-control-sm" name="patient_ward" readonly
                                        v-model="serviceOrderr.patient_ward" />
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Departamento:</label>
                                    <select class="form-select form-select-sm" name="patient_department" disabled
                                        v-model="serviceOrderr.patient_department"
                                        @click="SearchDepartments(serviceOrderr.patient_department)"
                                        id="inlineFormCustomSelectPref">
                                        <option :value="items.id" :key="items.id" v-for="items in dataDepartaments">
                                            {{ items.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Municipio:</label>
                                    <select class="form-select form-select-sm" name="patient_municipality" disabled
                                        v-model="serviceOrderr.patient_municipality" id="inlineFormCustomSelectPref">
                                        <option :value="items.id" :key="items.id" v-for="items in dataMunicipalities">
                                            {{ items.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6" v-if="serviceOrderr.patient_department === 5">
                                    <label for="example-text-input" class="form-control-label">Localidad:</label>
                                    <select class="form-select form-select-sm" name="patient_location" disabled
                                        v-model="serviceOrderr.patient_location" id="inlineFormCustomSelectPref">
                                        <option :value="items.id" :key="items.id" v-for="items in getLocalities">
                                            {{ items.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Sede de atención:</label>
                                    <select class="form-select form-select-sm" name="patient_campus" disabled
                                        @change="SearchGeoreferencingData(serviceOrderr.patient_campus)"
                                        v-model="serviceOrderr.patient_campus" id="inlineFormCustomSelectPref">
                                        <option :value="items.id_seat" :key="items.id_seat" v-for="items in getseat">
                                            {{ items.name_seat }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label">Causal de solicitud:</label>
                                    <textarea class="form-control form-control-sm" id="" cols="20" rows="3" disabled
                                        name="patient_diagnosis" v-model="serviceOrderr.patient_diagnosis"></textarea>
                                </div>
                            </div>

                            <p class="text-uppercase text-sm mt-4">Datos del Registro</p>
                            <hr>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Acuerdo Comercial - Pagador:</label>
                                    <select class="form-select form-select-sm" name="company_payer" disabled
                                        v-model="serviceOrderr.company_payer"
                                        @change="SearchAgreements(serviceOrderr.company_payer)" id="">
                                        <option :value="items.id_transfer" :key="items.id_transfer"
                                            v-for="items in getagreements">
                                            {{ items.name_agreements }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Georeferenciación:</label>
                                    <select class="form-select form-select-sm" name="company_geolocation"
                                        v-model="serviceOrderr.company_geolocation" disabled id="">
                                        <option :value="items.id" :key="items.id"
                                            v-for="items in getgeoreferencingData">
                                            {{ items.description }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Vehículos:</label>
                                    <select class="form-select form-select-sm" name="company_vehicle" disabled
                                        v-model="serviceOrderr.company_vehicle" id="">
                                        <option :value="items.id_vehicle" :key="items.id_vehicle"
                                            v-for="items in getvehicle">
                                            {{ items.name_vehicle }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Tipo de evento:</label>
                                    <select class="form-select form-select-sm" name="company_event" disabled
                                        v-model="serviceOrderr.company_event" id="">
                                        <option :value="items.id_event" :key="items.id_event" v-for="items in getevent">
                                            {{ items.name_event }}
                                        </option>
                                    </select>
                                </div>
                                <div :class="serviceOrderr.company_request == 2 || serviceOrderr.company_request == 3 ? 'col-md-4' : 'col-md-4'">
                                    <label for="example-text-input" class="form-control-label">Tipo de solicitud:</label>
                                    <select class="form-select form-select-sm" name="company_request" disabled
                                        @change="consulterHistory()" v-model="serviceOrderr.company_request" id="">
                                        <option :value="items.id_request" :key="items.id_request"
                                            v-for="items in getrequest">
                                            {{ items.name_request }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4" v-if="serviceOrderr.company_request == 2 || serviceOrderr.company_request == 3">
                                    <label for="example-text-input" class="form-control-label">Seleccione una historia:</label>
                                    <select name="key_history" v-model="serviceOrderr.key_history"
                                        class="form-select form-select-sm" disabled id="">
                                        <option v-for="row in getHistoryData" :key="row.id" :value="row.id">
                                            Orden {{ row.num_order }} - {{ moment(row.date).format('DD-MM-YYYY') }}
                                        </option>
                                    </select>
                                </div>
                                <div :class="serviceOrderr.company_request == 2 || serviceOrderr.company_request == 3 ? 'col-md-4' : 'col-md-4'">
                                    <label for="example-text-input" class="form-control-label">Empresa en misión:</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select name="id_mision" class="form-select form-select-sm" readonly
                                                v-model="serviceOrderr.id_mision" disabled>
                                                <option :key="row.id" v-for="row in getCompanyData" :value="row.id">
                                                    {{ row.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Tipo Evaluación médica o Procedimiento:</label>
                                    <select name="company_procedure" id="" class="form-select form-select-sm" readonly
                                        v-model="serviceOrderr.company_procedure" disabled>
                                        <option :value="items.id" :key="items.id" v-for="items in getProducts">
                                            {{ items.description }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Profesional Asignado:</label>
                                    <select class="form-select form-select-sm" name="operator_coordinator" readonly
                                        v-model="serviceOrderr.operator_coordinator" disabled>
                                        <option :value="items.id" :key="items.id" v-for="items in getDoctorData"
                                            class="px-5">
                                            {{ items.name + ' ' + items.last_name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Nombre de Quien Reporta:</label>
                                    <input type="text" class="form-control form-control-sm" name="reporting_user" readonly
                                        v-model="serviceOrderr.reporting_user" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Cargo:</label>
                                    <input type="text" class="form-control form-control-sm" name="user_charge"
                                        v-model="serviceOrderr.user_charge" disabled />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Celular:</label>
                                    <input type="text" class="form-control form-control-sm" name="user_phone"
                                        v-model="serviceOrderr.user_phone" readonly />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Otro Celular:</label>
                                    <input type="text" class="form-control form-control-sm" name="user_phone_2"
                                        v-model="serviceOrderr.user_phone_2" readonly />
                                </div>
                                <div class="col-md-1">
                                    <label for="example-text-input text-center" class="form-control-label">Copago:</label>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" readonly
                                            v-model="checkboxActivado">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label for="example-text-input" class="form-control-label">Valor:</label>
                                    <input type="text" class="form-control form-control-sm" readonly
                                        :disabled="!checkboxActivado" name="copago" v-model="serviceOrderr.copago" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Codigo de Autorización:</label>
                                    <input type="text" class="form-control form-control-sm" name="authorization_code" readonly
                                        v-model="serviceOrderr.authorization_code" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">¿Quien Autoriza?:</label>
                                    <input type="text" class="form-control form-control-sm" name="authorizing_user" readonly
                                        v-model="serviceOrderr.authorizing_user" />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label">Tiempo de Espera:</label>
                                    <select class="form-select form-select-sm" name="time" v-model="serviceOrderr.time" disabled
                                        id="inlineFormCustomSelectPref">
                                        <option value="10">10 Minutos</option>
                                        <option value="30">30 Minutos</option>
                                        <option value="60">60 Minutos</option>
                                        <option value="90">90 Minutos</option>
                                        <option value="100">100 Minutos</option>
                                        <option value="110">110 Minutos</option>
                                        <option value="120">120 Minutos</option>
                                        <option value="130">130 Minutos</option>
                                        <option value="140">140 Minutos</option>
                                        <option value="150">150 Minutos</option>
                                        <option value="160">160 Minutos</option>
                                        <option value="170">170 Minutos</option>
                                        <option value="180">180 Minutos</option>
                                        <option value="190">190 Minutos</option>
                                        <option value="200">200 Minutos</option>
                                        <option value="210">210 Minutos</option>
                                        <option value="220">220 Minutos</option>
                                        <option value="230">230 Minutos</option>
                                        <option value="240">240 Minutos</option>
                                    </select>
                                </div>
                                <div class="col-md-1">
                                    <label for="example-text-input text-center" class="form-control-label">Traslado:</label>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" readonly
                                            v-model="checkboxTraslate">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label for="example-text-input" class="form-control-label">Codigo de Autorización:</label>
                                    <input type="text" class="form-control form-control-sm" readonly
                                        :disabled="!checkboxTraslate" name="codeTraslate"
                                        v-model="serviceOrderr.codeTraslate" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label">Observaciones:</label>
                                    <textarea class="form-control form-control-sm" id="" cols="30" rows="3" readonly
                                        name="observation" v-model="serviceOrderr.observation"></textarea>
                                </div>
                            </div>

                            <p class="text-uppercase text-sm mt-4">Información Adicional</p>
                            <hr>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Fecha</label>
                                    <input type="text" class="form-control" v-model="fecha" readonly>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Hora</label>
                                    <input type="text" class="form-control" v-model="hora" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="captureAndCopy()" data-bs-dismiss="modal">
                            Capturar
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>