<template>
    <div>
        <div class="d-flex flex-column gap-3">
            <div class="container-item__horizontal container-item__gap grid-12">
                <div class="bg-primary bg-gradient text-white container-item__with container-item__center container-item__gap container-item__padding sticky-bar"
                    style="min-width: 150px !important;">
                    <small>Profesionales</small>
                </div>
                <TimeAgenda />
            </div>
            <div class="container-item__horizontal container-item__gap" :key="professional.name"
                v-for="professional in getDoctorData">
                <div class="bg-primary bg-gradient text-white mb-2 container-item__with container-item__padding sticky-bar"
                    style="min-width: 150px;">
                    <small style="font-size: 10px;">{{ professional.name }}</small> <br>
                    <small style="font-size: 10px;">{{ professional.specialty }}</small>
                </div>

                <div v-for="t in time" :key="professional.id + '-' + t"
                    class="bg-gradient text-white mb-2 container-item__with container-item__padding p-0 min_with"
                    style="min-width: 150px !important;"
                    :class="itemStatusColor(getPatient(professional.id, t)?.status || 0)" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" @dragover.prevent="onDragOver"
                    @drop.prevent="onDrop(professional.id, t)">
                    <template v-if="getPatient(professional.id, t)">
                        <div v-for="patient in getPatient(professional.id, t)" :key="patient.id"
                            class="mt-2 px-2 rounded" :style="patient.info.key_status == 1 ? 'background-color: #FFCB00; color: white' : ''
                                || patient.info.key_status == 2 ? 'background-color: #FEAB3D; color: white' : ''
                                    || patient.info.key_status == 3 ? 'background-color: #FEAB3D; color: white' : ''
                                        || patient.info.key_status == 4 ? 'background-color: #43a047; color: white' : ''
                                            || patient.info.key_status == 5 ? 'background-color: #e53935; color: white' : ''"
                            draggable="true"
                            @dragstart="selectItem(professional.name, t, patient.id, patient)"
                            @click="viewPatient(patient.info)">
                            <small class="">{{ patient.patient }} </small><br>
                            <small class="">{{ patient.info.patient.document }}</small><br>
                            <small class="">{{ 'N° ' + patient.info.num_order }}</small>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title" id="exampleModalLabel">Ventana Informativa</p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="" v-on:submit.prevent="sendFollowUp()">
                        <div class="modal-body">
                            <div class="row" v-if="this.patientInfo != ''">
                                <div class="col-5">
                                    <label for="">Nombre del paciente</label>
                                    <input type="text" readonly :value="this.patientInfo.patient.middlename + ' ' + this.patientInfo.patient.firstname + ' ' + this.patientInfo.patient.second_surname + ' ' + this.patientInfo.patient.first_surname" class="form-control">
                                </div>
                                <div class="col-3">
                                    <label for="">Documento</label>
                                    <input type="text" readonly :value="this.patientInfo.document" class="form-control">
                                </div>
                                <div class="col-4">
                                    <label for="">Edad</label>
                                    <input type="text" readonly :value="this.patientInfo.patient.age" class="form-control">
                                </div>
                                <div class="col-3">
                                    <label for="">Estado Civil</label>
                                    <input type="text" readonly :value="this.patientInfo.patient.marital_status" class="form-control">
                                </div>
                                <div class="col-3">
                                    <label for="">Celular</label>
                                    <input type="text" readonly :value="this.patientInfo.user_phone" class="form-control">
                                </div>
                                <div class="col-3">
                                    <label for="">Correo Electronico</label>
                                    <input type="text" readonly :value="this.patientInfo.patient.email" class="form-control">
                                </div>
                                <div class="col-3">
                                    <label for="">Dirección</label>
                                    <input type="text" readonly :value="this.patientInfo.patient.address" class="form-control">
                                </div>
                                <div class="col-12">
                                    <label for="">Tipo Evaluación médica o Procedimiento:</label>
                                    <input type="text" readonly v-if="this.patientInfo.services == 1" :value="'EXTRAMURAL DOMICILIARIA'" class="form-control">
                                    <input type="text" readonly v-if="this.patientInfo.services == 2" :value="'TELEMEDICINA INTERACTIVA'" class="form-control">
                                </div>

                                <div class="col-12 col-md-3 col-xl-4">
                                    <label for="">Fecha de Orden</label>
                                    <input type="text" readonly :value="this.patientInfo.startdate" class="form-control">
                                </div>
                                <div class="col-12 col-md-3 col-xl-4" v-if="this.patientInfo.key_status != 1">
                                    <label for="">Llegada</label>
                                    <input type="text" readonly :value="this.patientInfo.startappointment" class="form-control">
                                </div>
                                <div class="col-12 col-md-43 col-xl-4" v-if="this.patientInfo.key_status != 1 && this.patientInfo.key_status != 2">
                                    <label for="">Apertura</label>
                                    <input type="text" readonly :value="this.patientInfo.agenda_process_date" class="form-control">
                                </div>
                                <div class="col-12 col-md-43 col-xl-4" v-if="this.patientInfo.end_consultation != null">
                                    <label for="">Finalizacion</label>
                                    <input type="text" readonly :value="this.patientInfo.end_consultation" class="form-control">
                                </div>
                                <div class="col-12 col-md-43 col-xl-4" v-if="this.patientInfo.key_status == 4 || this.patientInfo.key_status == 5">
                                    <label for="" v-if="this.patientInfo.key_status == 4">Aprobado</label>
                                    <label for="" v-if="this.patientInfo.key_status == 5">Fallida</label>
                                    <input type="text" readonly :value="this.patientInfo.endappointment" class="form-control">
                                </div>
                                <div class="col-12" v-if="this.patientInfo.codeTraslate != 0 && this.patientInfo.codeTraslate != null && this.patientInfo.codeTraslate != ''">
                                    <label for="">Código de Tranlado</label>
                                    <input type="text" readonly :value="this.patientInfo.codeTraslate" class="form-control">
                                </div>
                                <div class="col-12">
                                    <label for="">Observación</label>
                                    <textarea type="text" readonly :value="this.patientInfo.observations" class="form-control"></textarea>
                                </div>
                                <div class="col-12 mt-3 mb-3">
                                    <div class="table-responsive" style="overflow-y: scroll; max-height: 200px;">
                                        <table class="table table-striped border text-center">
                                            <thead>
                                                <tr>
                                                    <th>Comentarios</th>
                                                    <th>Fecha y hora</th>
                                                    <th>Responsable</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in getFollow" :key="index">
                                                    <td class="text-wrap">{{ item.conversation }}</td>
                                                    <td>{{ moment(item.created_at).format('DD/MM/YYYY hh:mm A') }}</td>
                                                    <td>{{ item.user.name }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="">Comentario</label>
                                    <textarea type="text" name="conversation" v-model="follow.conversation" class="form-control"> </textarea>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary">Agregar Comentario</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TimeAgenda from './time.vue'
import moment from 'moment'
export default {
    name: "Componente",
    components: {
        TimeAgenda

    },
    data() {
        return {
            items: [],
            professionals: [],
            time: [], // Inicialmente vacío
            hours: 24,
            initialConfigHours: 0,
            agenda: [],
            tiempo: '',
            itemActive: {
                professional: null,
                time: null,
                position: null
            },
            follow: {
                conversation: '',
                key_history: ''
            },
            patientInfo: '',
            timeInfo: '',
            currentSelectItem: null

        };
    },
    props: {
        date: {
            type: Date,
            required: true
        }
    },
    async mounted() {
        this.getDoctor();
        this.getLocalStore();
        this.generateTime();
    },
    methods: {
        ...mapActions('Traffic', ["gettrafficType", "searchDoctor", "addFollowUp", "getFollowUp"]),
        moment,
        async sendFollowUp() {
            this.follow.key_history = this.patientInfo.id;
            await this.addFollowUp(this.follow);
            this.follow.conversation = '';
            await this.getFollowUp(this.patientInfo.id);
        },
        async getFollowUp(patientId) {
            const followUpData = await this.$store.dispatch('Traffic/getFollowUp', patientId);
            this.$store.commit('Traffic/setFollowUp', followUpData);
        },
        async getDoctor() {
            await this.searchDoctor()
        },
        async getLocalStore() {
            this.items = JSON.parse(localStorage.getItem('user'))

            const privilegies = JSON.parse(localStorage.getItem('privilegies'))
            if (privilegies.filter(item => item.id == 52).length > 0) {
                await this.gettrafficType('')
                await this.getCitas()
                return
            }

            await this.gettrafficType(this.items.id)
            await this.getCitas()
        },
        getCitas() {
            const citas = this.gettraffic.map(item => {
                const startdate = item.start_date;
                const [fecha, hora] = startdate.split(' ');
                const [anio, mes, dia] = fecha.split('-');
                const [horas, minutos, segundos] = hora.split(':');
                const startDateObj = new Date(anio, mes - 1, dia, horas, minutos, segundos);
                const currentDate = new Date();
                const diffInSeconds = Math.floor((startDateObj - currentDate) / 1000);
                return {
                    id: item.id,
                    key_doctor: item.key_doctor,
                    startdate: item.start_date,
                    fecha: fecha,
                    hora: hora,
                    segundos: diffInSeconds,
                    patient: item.patient.firstname + ' ' + item.patient.first_surname,
                    identification: item.document,
                    info: item,
                    status: item.status
                };
            });

            citas.sort((a, b) => {
                if (a.fecha !== b.fecha) {
                    return new Date(a.fecha) - new Date(b.fecha);
                } else if (a.hora !== b.hora) {
                    return a.hora.localeCompare(b.hora);
                } else {
                    return a.segundos - b.segundos;
                }
            });
            this.agenda = citas;
        },
        setFormatDateToMiliseconds(date) {
            return new Date(date).getTime();
        },
        setFormatDate(date) {
            const [fecha, hora] = date.split(' ');
            const [anio, mes, dia] = fecha.split('-');
            const [horas, minutos, segundos] = hora.split(':');
            return new Date(anio, mes - 1, dia, horas, minutos, segundos);
        },
        generateTime() {
            const startHour = this.initialConfigHours;
            const endHour = this.hours;
            const timeArray = [];

            for (let hour = startHour; hour <= endHour; hour++) {
                const hourString = hour < 10 ? '0' + hour : hour;
                const timeString = `${hourString}:00`;
                timeArray.push(timeString);
            }
            this.time = timeArray;
        },
        viewPatient(data) {
            this.patientInfo = data
            this.getFollowUp(this.patientInfo.id)
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(professionalId, time) {
            const patientId = event.dataTransfer.getData("text/plain");
            this.changeTimeProfessional(professionalId, time, patientId);
            this.currentSelectItem = null
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 2)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        },
        selectItem(_professional, _time, id, patient) {
            if (patient.info.key_status != 1) {
                alert('No se puede cambiar la hora de una cita a menos que este en estado pendiente')
                return
            }
            this.currentSelectItem = patient
            this.itemActive = id
        },
        splitDate(date) {
            return date.split(' ')[0]
        },
        changeTimeProfessional(professional, time) {
            const validateBooking = this.agenda.filter((item) => item.professional === professional && item.time === time)
            if (validateBooking.length > 0) {
                alert('Ya existe una cita en este horario')
                return
            }
            const formateo = this.agenda.map((item) => {
                if (item.id === this.itemActive) {
                    return {
                        ...item,
                        startdate: item.fecha + ' ' + time + ':00',
                        hora: time + ':00',
                        segundos: this.setFormatDate(item.fecha + ' ' + time + ':00').getTime(),
                        key_doctor: professional
                    }
                }
                return item
            })
            this.agenda = formateo
            this.itemActive = {
                professional: null,
                time: null,
                position: null
            }

            this.updateHourBooking(this.currentSelectItem, professional, time)
        },
        getPatient(professional, time) {
            let fecha = this.date.getFullYear() + '-' + (this.date.getMonth() + 1).toString().padStart(2, '0') + '-' + this.date.getDate().toString().padStart(2, '0') + ' ' + time
            let fechaFin = new Date(fecha).getTime() + 60 * 60 * 1000
            fecha = new Date(fecha).getTime()
            let patient = this.agenda.filter((item) => {
                return item.key_doctor === professional && this.setFormatDateToMiliseconds(item.startdate) >= fecha && this.setFormatDateToMiliseconds(item.startdate) < fechaFin
            })
            if (professional == 3) {
            }
            return patient
        },
        itemStatusColor(status) {
            switch (status) {
                case 1:
                    return 'bg-success'
                case 2:
                    return 'bg-warning'
                case 3:
                    return 'bg-danger'
                case 4:
                    return 'bg-info'
                default:
                    return 'bg-light'
            }
        },
        rangerCompare() {
        },
        updateHourBooking(currentSelectItem, professional, time) {
            const data = {
                key_doctor: professional,
                key_history: currentSelectItem.info.id,
                startDate: this.date.getFullYear() + '-' + (this.date.getMonth() + 1).toString().padStart(2, '0') + '-' + this.date.getDate().toString().padStart(2, '0') + ' ' + time + ':00',
            }
            this.$store.dispatch('Traffic/updateHourBooking', data)

        }
    },
    computed: {
        ...mapGetters('Traffic', ['gettraffic', 'getDoctorData', 'getFollow']),
    }
};
</script>

<style>
.container-item__horizontal {
    display: flex;
    width: 100%;
}

.container-item__with {
    width: 100%;
    text-align: center;
    font-size: 13px;
    border-radius: 5px;

}

.container-item__gap {
    gap: 0.5rem;
}

.container-item__center {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
}

.container-item__padding {
    padding: 5px 10px;
}

.grid-12 {
    display: grid !important;
    grid-template-columns: 1fr 24fr !important;
}

.sticky-bar {
    position: sticky;
    left: 0;
    z-index: 10;
}

.table-responsive {
    overflow-x: auto;
}

.table td.text-wrap {
    white-space: normal;
    word-break: break-word;
}
</style>
