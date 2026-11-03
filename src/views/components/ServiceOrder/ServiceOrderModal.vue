<script>
import moment from 'moment';
import html2canvas from "html2canvas";
import Swal from 'sweetalert2';

export default {
    name: 'ServiceOrderModal',
    props: {
        serviceOrder: {
            type: Object,
            required: true
        },
        dataDepartaments: {
            type: Array,
            default: () => []
        },
        dataMunicipalities: {
            type: Array,
            default: () => []
        },
        getLocalities: {
            type: Array,
            default: () => []
        },
        getseat: {
            type: Array,
            default: () => []
        },
        getagreements: {
            type: Array,
            default: () => []
        },
        getgeoreferencingData: {
            type: Array,
            default: () => []
        },
        getvehicle: {
            type: Array,
            default: () => []
        },
        getevent: {
            type: Array,
            default: () => []
        },
        getrequest: {
            type: Array,
            default: () => []
        },
        getHistoryData: {
            type: Array,
            default: () => []
        },
        getCompanyData: {
            type: Array,
            default: () => []
        },
        getProducts: {
            type: Array,
            default: () => []
        },
        getDoctorData: {
            type: Array,
            default: () => []
        },
        userValidate: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            checkboxActivado: false,
            checkboxTraslate: false,
            fecha: '',
            hora: '',
            // Listas de datos
            listTypeDocuments: [
                { id: 1, name: 'CC' },
                { id: 2, name: 'NIT' },
                { id: 3, name: 'RC' },
                { id: 4, name: 'TI' },
                { id: 5, name: 'NUIP' },
                { id: 6, name: 'CE' },
                { id: 7, name: 'PA' },
                { id: 8, name: 'PE' },
                { id: 9, name: 'SV' },
                { id: 10, name: 'CD' },
                { id: 11, name: 'CN' },
                { id: 12, name: 'MS' },
                { id: 13, name: 'AS' }
            ],
            genderTypes: [
                { value: 'F', label: 'Femenino' },
                { value: 'M', label: 'Masculino' }
            ],
            zonePatient: [
                { value: 2, label: 'Urbana' },
                { value: 1, label: 'Rural' }
            ],
            timeOptions: [
                { value: '10', label: '10 Minutos' },
                { value: '30', label: '30 Minutos' },
                { value: '60', label: '60 Minutos' },
                { value: '90', label: '90 Minutos' },
                { value: '100', label: '100 Minutos' },
                { value: '110', label: '110 Minutos' },
                { value: '120', label: '120 Minutos' },
                { value: '130', label: '130 Minutos' },
                { value: '140', label: '140 Minutos' },
                { value: '150', label: '150 Minutos' },
                { value: '160', label: '160 Minutos' },
                { value: '170', label: '170 Minutos' },
                { value: '180', label: '180 Minutos' },
                { value: '190', label: '190 Minutos' },
                { value: '200', label: '200 Minutos' },
                { value: '210', label: '210 Minutos' },
                { value: '220', label: '220 Minutos' },
                { value: '230', label: '230 Minutos' },
                { value: '240', label: '240 Minutos' }
            ]
        };
    },
    created() {
        this.actualizarFechaHora();
        setInterval(this.actualizarFechaHora, 1000);
        this.initializeData();
    },
    methods: {
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
        initializeData() {
            // Inicializar los checkboxes basados en los datos del servicio
            this.checkboxActivado = this.serviceOrder.copago ? true : false;
            this.checkboxTraslate = this.serviceOrder.transfer_code ? true : false;
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
    watch: {
        serviceOrder: {
            handler(newVal) {
                if (newVal) {
                    this.initializeData();
                }
            },
            deep: true
        }
    }
};
</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">VISTA PREVIA DE ORDEN DE SERVICIO</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card-body" id="capture-area">
                        <!-- Datos del Paciente -->
                        <p class="text-uppercase text-sm">Datos del Paciente</p>
                        <div class="row">
                            <div class="col-3">
                                <label for="example-text-input" class="form-control-label">COORDINADOR DE OPERACIÓN:</label>
                                <input type="text" class="form-control form-control-sm" readonly disabled name=""
                                    :value="userValidate?.name" />
                            </div>
                            <div class="col-3">
                                <label for="example-text-input" class="form-control-label">FECHA:</label>
                                <input type="text" class="form-control form-control-sm" readonly disabled name="date" :value="fecha" />
                            </div>
                            <div class="col-3">
                                <label for="example-text-input" class="form-control-label">Nº DE ORDEN:</label>
                                <input type="text" class="form-control form-control-sm" readonly disabled name="n_order"
                                    :value="serviceOrder.n_order" />
                            </div>
                            <div class="col-3">
                                <label for="example-text-input" class="form-control-label">ESTADO:</label>
                                <input type="text" class="form-control form-control-sm" readonly disabled name="state" 
                                    :value="serviceOrder.key_status == 1 ? 'Pendiente' :
                                            serviceOrder.key_status == 2 ? 'Activo' :
                                            serviceOrder.key_status == 3 ? 'En Atención' :
                                            serviceOrder.key_status == 4 ? 'Finalizado' :
                                            'Cancelado'" />
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="example-text-input" class="form-control-label">Nº DE IDENTIFICACIÓN:</label>
                                <input type="text" class="form-control form-control-sm" name="document" readonly disabled
                                    :value="serviceOrder.document" />
                            </div>
                            <div class="col-md-4">
                                <label for="example-text-input" class="form-control-label">TIPO DE DOCUMENTO:</label>
                                <select class="form-select form-select-sm" name="key_type_document" disabled
                                    :value="serviceOrder.key_type_document" id="inlineFormCustomSelectPref">
                                    <option :value="items.id" :key="items.id" v-for="items in listTypeDocuments">
                                        {{ items.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="example-text-input" class="form-control-label">GÉNERO:</label>
                                <select class="form-select form-select-sm" name="genre" disabled
                                    :value="serviceOrder.genre" id="inlineFormCustomSelectPref">
                                    <option :value="items.value" :key="items.value" v-for="items in genderTypes">
                                        {{ items.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">PRIMER APELLIDO:</label>
                                <input type="text" class="form-control form-control-sm" name="first_surname" readonly disabled
                                    :value="serviceOrder.first_surname" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">SEGUNDO APELLIDO:</label>
                                <input type="text" class="form-control form-control-sm" name="second_surname" readonly disabled
                                    :value="serviceOrder.second_surname" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">PRIMER NOMBRE:</label>
                                <input type="text" class="form-control form-control-sm" name="firstname" readonly disabled
                                    :value="serviceOrder.firstname" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">OTROS NOMBRES:</label>
                                <input type="text" class="form-control form-control-sm" name="second_name_patient" readonly disabled
                                    :value="serviceOrder.second_name_patient" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">CELULAR:</label>
                                <input type="tel" class="form-control form-control-sm" name="contact_phone" readonly disabled
                                    :value="serviceOrder.contact_phone" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">TELÉFONO:</label>
                                <input type="tel" class="form-control form-control-sm" name="patient_cell" readonly disabled
                                    :value="serviceOrder.patient_cell" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">CORREO ELECTRÓNICO:</label>
                                <input type="email" class="form-control form-control-sm" name="email" readonly disabled
                                    :value="serviceOrder.email" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">CORREO ACOMPAÑANTE:</label>
                                <input type="email" class="form-control form-control-sm" name="companions_email" readonly disabled
                                    :value="serviceOrder.companions_email" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">DIRECCIÓN:</label>
                                <input type="text" class="form-control form-control-sm" name="address" readonly disabled
                                    :value="serviceOrder.address" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">BARRIO:</label>
                                <input type="text" class="form-control form-control-sm" name="patient_ward" readonly disabled
                                    :value="serviceOrder.patient_ward" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">SEDE DE ATENCIÓN:</label>
                                <select class="form-select form-select-sm" name="patient_campus" disabled
                                    :value="serviceOrder.patient_campus" id="inlineFormCustomSelectPref">
                                    <option :value="items.id" :key="items.id" v-for="items in getseat">
                                        {{ items.name_seat }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">EPS:</label>
                                <input type="text" class="form-control form-control-sm" name="eps" readonly disabled
                                    :value="serviceOrder.eps" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">DEPARTAMENTO:</label>
                                <select class="form-select form-select-sm" name="key_department" disabled
                                    :value="serviceOrder.key_department" id="inlineFormCustomSelectPref">
                                    <option :value="items.id" :key="items.id" v-for="items in dataDepartaments">
                                        {{ items.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">MUNICIPIO:</label>
                                <select class="form-select form-select-sm" name="key_municipality" disabled
                                    :value="serviceOrder.key_municipality" id="inlineFormCustomSelectPref">
                                    <option :value="items.id" :key="items.id" v-for="items in dataMunicipalities">
                                        {{ items.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-3" v-if="serviceOrder.key_department == 5">
                                <label for="example-text-input" class="form-control-label">LOCALIDAD:</label>
                                <select class="form-select form-select-sm" name="key_locality" disabled
                                    :value="serviceOrder.key_locality" id="inlineFormCustomSelectPref">
                                    <option :value="items.id" :key="items.id" v-for="items in getLocalities">
                                        {{ items.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">ZONA:</label>
                                <select class="form-select form-select-sm" name="zone_patient" disabled
                                    :value="serviceOrder.zone_patient" id="inlineFormCustomSelectPref">
                                    <option :value="items.value" :key="items.value" v-for="items in zonePatient">
                                        {{ items.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="example-text-input" class="form-control-label">CAUSAL DE SOLICITUD:</label>
                                <textarea class="form-control form-control-sm" id="" rows="3" name="patient_diagnosis" readonly disabled
                                    :value="serviceOrder.patient_diagnosis"></textarea>
                            </div>
                        </div>

                        <!-- Datos del Registro -->
                        <p class="text-uppercase text-sm">Datos del Registro</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">ACUERDO COMERCIAL - PAGADOR:</label>
                                <select class="form-select form-select-sm" name="key_trade_agreement" disabled
                                    :value="serviceOrder.key_trade_agreement" id="">
                                    <option :value="items.id_transfer" :key="items.id_transfer" v-for="items in getagreements">
                                        {{ items.name_agreements }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Contrato:</label>
                                <select class="form-select form-select-sm" name="contracted_id" disabled
                                    :value="serviceOrder.contracted_id" id="">
                                    <option :value="items.id" :key="items.id" v-for="items in getCompanyData">
                                        {{ items.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-12">
                                <label for="example-text-input" class="form-control-label">GEOREFERENCIACIÓN:</label>
                                <select class="form-select form-select-sm" name="company_geolocation" disabled
                                    :value="serviceOrder.company_geolocation" id="">
                                    <option :value="items.id" :key="items.id" v-for="items in getgeoreferencingData">
                                        {{ items.description }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">VEHÍCULO:</label>
                                <select class="form-select form-select-sm" name="key_vehicle" disabled
                                    :value="serviceOrder.key_vehicle" id="">
                                    <option :value="items.id_vehicle" :key="items.id_vehicle" v-for="items in getvehicle">
                                        {{ items.name_vehicle }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">CONDUCTOR ASIGNADO:</label>
                                <select class="form-select form-select-sm" name="responsible_director" disabled
                                    :value="serviceOrder.responsible_director" id="">
                                    <option :value="items.id" :key="items.id" v-for="items in getDoctorData">
                                        {{ items.name + ' ' + items.last_name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">TIPO DE EVENTO:</label>
                                <select class="form-select form-select-sm" name="key_event_type" disabled
                                    :value="serviceOrder.key_event_type" id="">
                                    <option :value="items.id_event" :key="items.id_event" v-for="items in getevent">
                                        {{ items.name_event }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">TIPO DE SOLICITUD:</label>
                                <select class="form-select form-select-sm" name="key_request" disabled
                                    :value="serviceOrder.key_request" id="">
                                    <option :value="items.id_request" :key="items.id_request" v-for="items in getrequest">
                                        {{ items.name_request }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Datos Adicionales -->
                        <p class="text-uppercase text-sm">Datos Adicionales</p>
                        <div class="row align-items-end">
                            <div class="col-md-4">
                                <label for="example-text-input" class="form-control-label">EMPRESA EN MISIÓN:</label>
                                <select class="form-select form-select-sm" name="key_mission_company" disabled
                                    :value="serviceOrder.key_mission_company" id="">
                                    <option :value="items.id" :key="items.id" v-for="items in getCompanyData">
                                        {{ items.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="example-text-input" class="form-control-label">TIPO EVALUACIÓN MÉDICA O PROCEDIMIENTO:</label>
                                <select class="form-select form-select-sm" name="services" disabled
                                    :value="serviceOrder.services" id="">
                                    <option :value="items.id" :key="items.id" v-for="items in getProducts">
                                        {{ items.description }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="example-text-input" class="form-control-label">PROFESIONAL ASIGNADO:</label>
                                <select class="form-select form-select-sm" name="key_doctor" disabled
                                    :value="serviceOrder.key_doctor" id="">
                                    <option :value="items.id" :key="items.id" v-for="items in getDoctorData">
                                        {{ items.name + ' ' + items.last_name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">NOMBRE DE QUIEN REPORTA:</label>
                                <input type="text" class="form-control form-control-sm" name="reporting_user" readonly disabled
                                    :value="serviceOrder.reporting_user" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">CARGO:</label>
                                <input type="text" class="form-control form-control-sm" name="user_charge" readonly disabled
                                    :value="serviceOrder.user_charge" />
                            </div>
                            <div class="col-md-2">
                                <label for="example-text-input" class="form-control-label">CELULAR:</label>
                                <input type="tel" class="form-control form-control-sm" name="user_phone" readonly disabled
                                    :value="serviceOrder.user_phone" />
                            </div>
                            <div class="col-md-2">
                                <label for="example-text-input" class="form-control-label">TELÉFONO:</label>
                                <input type="tel" class="form-control form-control-sm" name="user_phone_2" readonly disabled
                                    :value="serviceOrder.user_phone_2" />
                            </div>
                            <div class="col-md-1 d-flex align-items-center">
                                <div class="form-check form-switch mt-3">
                                    <input class="form-check-input" type="checkbox" id="copagoSwitch" disabled
                                        :checked="checkboxActivado">
                                    <label class="form-check-label small text-secondary" for="copagoSwitch">COPAGO:</label>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <label for="example-text-input" class="form-control-label">VALOR:</label>
                                <input type="number" class="form-control form-control-sm" name="valorCopago" readonly disabled
                                    :value="serviceOrder.copago" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">CÓDIGO DE AUTORIZACIÓN:</label>
                                <input type="text" class="form-control form-control-sm" name="code_authorization" readonly disabled
                                    :value="serviceOrder.code_authorization" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">¿QUIÉN AUTORIZA?:</label>
                                <input type="text" class="form-control form-control-sm" name="who_authorizes" readonly disabled
                                    :value="serviceOrder.who_authorizes" />
                            </div>
                            <div class="col-md-3">
                                <label for="example-text-input" class="form-control-label">TIEMPO DE ESPERA:</label>
                                <select class="form-select form-select-sm" name="time" disabled
                                    :value="serviceOrder.time" id="">
                                    <option :value="items.value" :key="items.value" v-for="items in timeOptions">
                                        {{ items.label }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-1 d-flex align-items-center">
                                <div class="form-check form-switch mt-3">
                                    <input class="form-check-input" type="checkbox" id="trasladoSwitch" disabled
                                        :checked="checkboxTraslate">
                                    <label class="form-check-label small text-secondary" for="trasladoSwitch">TRASLADO:</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <label for="example-text-input" class="form-control-label">CÓDIGO DE AUTORIZACIÓN:</label>
                                <input type="text" class="form-control form-control-sm" name="transfer_code" readonly disabled
                                    :value="serviceOrder.transfer_code" />
                            </div>
                        </div>
                        <hr>
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <label for="example-text-input" class="form-control-label">OBSERVACIONES:</label>
                                <textarea class="form-control form-control-sm" id="" rows="3" name="observation_general" readonly disabled
                                    :value="serviceOrder.observation_general"></textarea>
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
</template>

<style scoped>
/* Estilos específicos del modal */
.modal-content {
    border-radius: 0.5rem;
}

.form-control-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.form-select-sm,
.form-control-sm {
    font-size: 0.875rem;
}

.text-uppercase {
    font-weight: 600;
}

hr {
    margin: 1rem 0;
}

.form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
}

/* Estilos para los campos readonly */
input[readonly],
select[disabled] {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

/* Estilos para el área de captura */
#capture-area {
    padding: 1rem;
    background-color: white;
}
</style> 