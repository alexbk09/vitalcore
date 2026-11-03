<template>
    <div>
        <div class="">
            <form action="" v-on:submit.prevent="sendFormsIncapacities()" @keydown.enter.prevent>
                <div class="row">
                    <div class="col-md-12 col-lg-6 ">
                        <label for="">Fecha de inicio de la incapacidad</label>
                        <input type="date" class="form-control "
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)" name="date_init"
                            v-model="incapacities.date_init" :min="getCurrentDate()" :max="getCurrentDate()">
                        <b-alert v-if="msg_error.date_init" class="text-danger" variant="danger" show>{{
                            msg_error.date_init }}</b-alert>
                    </div>
                    <div class="col-md-12 col-lg-6 ">
                        <label for="">Fecha de finalización de la incapacidad</label>
                        <input type="date" @input="calculateDays" class="form-control "
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)" name="date_end"
                            v-model="incapacities.date_end" :min="getCurrentDate()">
                        <b-alert v-if="msg_error.date_end" class="text-danger" variant="danger" show>{{
                            msg_error.date_end }}</b-alert>
                    </div>
                    <div class="col-md-12 col-lg-4 offset-md-4 ">
                        <label for="">D. de incapacidad</label>
                        <input type="text" readonly class="form-control "
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)" name="days"
                            v-model="incapacities.days">

                    </div>
                    <div class="col-md-12 col-lg-6 ">
                        <label for="">Tipo de incapacidad</label>
                        <select class="form-select " name="type"
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)" v-model="incapacities.type">
                            <option value="NO APLICA">NO APLICA...</option>
                            <option value="TEMPORAL" selected>TEMPORAL...</option>
                            <option value="PERMANENTE">PERMANENTE...</option>
                        </select>
                    </div>
                    <div class="col-md-12 col-lg-6 ">
                        <label for="">Prórroga (obligatorio)</label>
                        <select class="form-select text-uppercase" name="extension"
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)"
                            v-model="incapacities.extension">
                            <option value="" selected>Seleccionar... </option>
                            <option value="NO APLICA">NO APLICA...</option>
                            <option value="Si">Si...</option>
                            <option value="No">No...</option>
                        </select>
                        <b-alert v-if="msg_error.extension" class="text-danger" variant="danger" show>{{
                            msg_error.extension }}</b-alert>
                    </div>
                    <div class="col-md-12 col-lg-6 ">
                        <label for="">Tipo de Evento</label>
                        <select class="form-select " name="eventtype"
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)"
                            v-model="incapacities.eventtype">
                            <option value="">Seleccionar... </option>
                            <option value="NO APLICA">NO APLICA...</option>
                            <option value="CATASTRÓFICO">CATASTRÓFICO...</option>
                            <option value="TERRORISTA">TERRORISTA...</option>
                        </select>
                    </div>
                    <div class="col-md-12 col-lg-6 ">
                        <label for="">Grupo de servicios:</label>
                        <select class="form-select text-uppercase" name="eventtype"
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)"
                            v-model="incapacities.key_group_service">
                            <option value="">Seleccionar... </option>
                            <option v-for="group in getServiceGroup" :key="group.id" :value="group.id">{{
                                group.description }}</option>
                        </select>
                    </div>
                    <div class="col-md-12 col-lg-12 ">
                        <label for="">Incapacidad Retroactiva</label>
                        <select class="form-select text-uppercase" name=""
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)">
                            <option selected value="NO APLICA">NO APLICA...</option>
                            <option value="Urgencias o internación del paciente">Urgencias o internación del paciente
                            </option>
                            <option
                                value="-Trastorno de memoria, confusión mental, desorientación en persona tiempo y lugar, otras alteraciones de la esfera psíquica, orgánica o funcional según criterio médico u odontólog">
                                -Trastorno de memoria, confusión mental, desorientación en persona tiempo y lugar, <br>
                                otras alteraciones de la esfera psíquica orgánica o funcional según criterio médico u
                                odontólog</option>
                        </select>
                    </div>
                    <div class="col-12 mb-4 mt-2">
                        <label for="">Diagnosticos</label>
                        <div class="table-responsive p-0 ">
                            <table class="table text-center  mb-0">
                                <thead style="background-color: #C8E4FF;">
                                    <tr><th class="text-uppercase text-black text-xxs font-weight-bolder " style="width: 10%;">Fecha</th>
                                        <th class="text-uppercase text-black text-xxs font-weight-bolder "
                                            style="width: 10%;">CIE 10</th>
                                        <th class="text-uppercase text-black text-xxs font-weight-bolder ">
                                            Diagnostico</th>
                                            <th class="text-uppercase text-black text-xxs font-weight-bolder ">Origen</th>
                                            <th class="text-uppercase text-black text-xxs font-weight-bolder ">Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="row.id" v-for="row in getDiagnostic">
                                        <td>{{ moment(row.created_at).format('DD/MM/YYYY') }}</td>
                                        <td class="align-middle ">{{ row.code }}</td>
                                        <td class="align-middle ">{{ row.description.slice(0, 40) }}...</td>
                                        <td>{{ row.origin }}</td>
                                        <td>{{ row.type }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-12 col-xl-12 p-0">
                        <label for="">Observaciones</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1"
                            :disabled="validateStatus(valueStatus.key_status, disclaimer)" name="description"
                            v-model="incapacities.description" rows="3"></textarea>
                        <b-alert v-if="msg_error.description" class="text-danger" variant="danger" show>{{
                            msg_error.description }}</b-alert>
                    </div>
                    <div class="col-md-12 text-end mt-3  p-0"
                        v-if="(valueStatus.key_status != 5 || valueStatus.key_status != 4 || disclaimer == 4 || disclaimer == 5)">
                        <argon-button type="submit" color="success " :disabled="spiner === true" class="ms-auto">
                            <span v-if="spiner === false">Guardar</span>
                            <div class="d-flex align-items-center" v-if="spiner === true">
                                <strong class="me-2">Guardando Datos</strong>
                                <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                            </div>
                        </argon-button>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-12">
                    <!-- Vista de tarjetas para móviles -->
                    <div class="row mt-4 d-md-none">
                        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="items in getIncapacities" :key="items.id">
                            <div class="card h-100 shadow-lg bg-body rounded card-content-history">
                                <div class="card-body">
                                    <h5 class="card-title">Incapacidad #{{ items.id }}</h5>
                                    <p class="card-text">
                                        <strong>Fecha Inicial:</strong> {{ moment(items.date_init).format('DD/MM/YYYY')
                                        }}<br>
                                        <strong>Fecha Final:</strong> {{ moment(items.date_end).format('DD/MM/YYYY')
                                        }}<br>
                                        <strong>Días:</strong> {{ items.days }}<br>
                                        <strong>Tipo de incapacidad:</strong> {{ items.type }}<br>
                                        <strong>Prórroga:</strong> {{ items.extension }}<br>
                                        <strong>Tipo de Evento:</strong> {{ items.eventtype }}<br>
                                        <strong>Grupo de servicio:</strong> {{ items.group_service?.description }}<br>
                                        <strong>Descripción:</strong> {{ items.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" v-if="this.getIncapacities == ''"> No tenemos resultados</div>
                    </div>

                    <!-- Vista de tabla para pantallas grandes -->
                    <div class="table-responsive p-0 mt-5 d-none d-md-block">
                        <table class="table text-center mb-0">
                            <thead style="background-color: #C8E4FF;">
                                <tr>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">#
                                    </th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">
                                        Fecha Inicial</th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">
                                        Fecha Final</th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">Dias
                                    </th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">Tipo
                                        de incapacidad</th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">
                                        Prorroga</th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">Tipo
                                        de Evento</th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">
                                        Grupo de servicio</th>
                                    <th class="text-uppercase text-black text-xxs font-weight-bolder ">
                                        Descripción </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="items.id" v-for="items in getIncapacities">
                                    <td class="align-middle">
                                        <span class="text-secondary text-xs font-weight-bold">{{ items.id }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <span class="text-secondary text-xs font-weight-bold">{{
                                            moment(items.date_init).format('DD/MM/YYYY') }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <span class="text-secondary text-xs font-weight-bold">{{
                                            moment(items.date_end).format('DD/MM/YYYY') }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <span class="text-secondary text-xs font-weight-bold">{{ items.days }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <span class="text-secondary text-xs font-weight-bold">{{ items.type }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ items.extension
                                        }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ items.eventtype
                                        }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{
                                            items.group_service?.description }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <span class="text-secondary text-xs font-weight-bold">{{ items.description
                                        }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ArgonButton from "./../../../../components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'
export default {
    name: "formIncapacities",
    props: {
        valueStatus: Object,
        disclaimer: String
    },
    data() {
        return {
            incapacities: {
                date_init: '',
                date_end: '',
                days: '',
                description: '',
                IDHistory: '',
                IDPatient: '',
                key_group_service: '',
                type: "TEMPORAL",
                extension: '',
                eventtype: "NO APLICA",
            },
            msg_error: {
                date_init: '',
                date_end: '',
                days: '',
                description: '',
                type: '',
                extension: '',
                eventtype: '',
            },
            show: false,
            searchservicHistory: this.valueStatus.id,
            searchKeyPatient: this.valueStatus.key_patient,
            spiner: false,
        }
    },
    async mounted() {
        if (this.valueStatus.id !== '' && this.valueStatus.id !== null && this.valueStatus.id !== undefined) {
            await this.searchIncapacities(this.valueStatus.id)
            await this.getStoreserviceOrder()
            await this.serviceGroup()
        }
    },
    components: {
        ArgonButton,
    },
    methods: {
        ...mapActions('History', ["SearchOrder", "addIncapacities", "searchIncapacities", "searchDiagnostic", "serviceGroup"]),
        async getStoreserviceOrder() {
            if (this.searchservicHistory != undefined) {
                const searchOrder = {
                    keyHistory: this.valueStatus.id,
                }
                await this.searchDiagnostic(searchOrder)
            }
        },
        async loadingActive() {
            this.isLoading = true
            await this.getStoreserviceOrder()
            this.isLoading = false
        },
        getCurrentDate() {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            this.incapacities.date_init = formattedDate
            return formattedDate;
        },
        calculateDays() {
            const date_init = moment(this.incapacities.date_init, 'YYYY-MM-DD');
            const finalDate = moment(this.incapacities.date_end, 'YYYY-MM-DD');
            const dias = finalDate.diff(date_init, 'days');
            if (dias < 0) {
                this.incapacities.days = 1;
            } else if (dias > 30) {
                this.incapacities.date_end = date_init.add(30, 'days').format('YYYY-MM-DD');
                this.incapacities.days = 30;
                alert("La fecha de finalización de la incapacidad no puede exceder 30 días desde la fecha de inicio.");
            } else {
                this.incapacities.days = dias + 1;
            }
        },
        clear() {
            this.incapacities.date_init = ""
            this.incapacities.date_end = ""
            this.incapacities.days = ""
            this.incapacities.description = ""
            this.incapacities.type = ""
            this.incapacities.extension = ""
            this.incapacities.eventtype = ""
        },
        clearMsgError() {
            this.msg_error.date_init = ""
            this.msg_error.date_end = ""
            this.msg_error.days = ""
            this.msg_error.description = ""
            this.msg_error.type = ""
            this.msg_error.extension = ""
            this.msg_error.eventtype = ""
        },
        async sendFormsIncapacities() {
            this.clearMsgError()
            if (!this.$validatePropertyEmpty(this.incapacities.date_init)) {
                this.msg_error.date_init = "La Fecha de inicio de la incapacidad es obligatoria"
                return false
            }
            if (!this.$validatePropertyEmpty(this.incapacities.date_end)) {
                this.msg_error.date_end = "La Fecha de finalización de la incapacidad es obligatoria"
                return false
            }
            if (!this.$validatePropertyEmpty(this.incapacities.type)) {
                this.msg_error.type = "El Tipo de incapacidad es obligatoria"
                return false
            }
            if (!this.$validatePropertyEmpty(this.incapacities.extension)) {
                this.msg_error.extension = "La prorroga es obligatoria"
                return false
            }
            if (!this.$validatePropertyEmpty(this.incapacities.description)) {
                this.msg_error.description = "La Descripción de la incapacidad es obligatoria"
                return false
            }


            this.incapacities.IDHistory = this.searchservicHistory
            this.spiner = true
            const response = await this.addIncapacities(this.incapacities)
            if (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Datos agregado con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.spiner = false
                await this.searchIncapacities(this.searchservicHistory)
                this.clear()
            } if (response === false) {
                this.spiner = false
                Swal.fire({
                    icon: 'error',
                    title: 'Lo siento, los datos no se pudieron agregar',
                    text: 'Intentalo de nuevo',
                })
            }
        },
        validateStatus(status, disclaimer) {
            if (status == 3) {
                return false;
            }
            if (!disclaimer) {
                return true;
            }
            if (status == 5) {
                return false
            }
            if (status == 4 && !disclaimer) {
                return false
            }
            if (disclaimer == 4 || disclaimer == 5) {
                return false
            }
            return true
        },
        moment,
    },
    computed: {
        ...mapGetters('History', ['gethistory', 'getIncapacities', 'getDiagnostic', 'getServiceGroup']),
    }
}

</script>