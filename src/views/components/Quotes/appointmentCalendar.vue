<template>
    <div class="container-fluid py-5">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-8">
                        <div class="row">
                            <div class="col-5">
                                <label>SEDE</label>
                                <BaseSelect v-model="selectedSede">
                                    <option value="">SELECCIONE</option>
                                    <option v-for="sede in sedes" :key="sede.id" :value="sede.id">{{ sede.nombre }}
                                    </option>
                                </BaseSelect>
                            </div>
                            <div class="col-5">
                                <label>MÉDICO</label>
                                <BaseSelect v-model="selectedMedico">
                                    <option value="">SELECCIONE</option>
                                    <option v-for="medico in medicos" :key="medico.id" :value="medico.id">{{
                                        medico.nombre
                                    }}</option>
                                </BaseSelect>
                            </div>
                            <div class="col-2 align-self-end">
                                <div class="btn-group" role="group" aria-label="Acciones de búsqueda">
                                    <button type="button" class="btn btn-primary" @click="searchQuotes"
                                        aria-label="Buscar citas">
                                        <i class="fas fa-search"></i>
                                    </button>
                                    <button type="button" class="btn btn-secondary" @click="clearFilters"
                                        aria-label="Limpiar filtros">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-5">
                                <BaseInput type="text" placeholder="BUSCAR PACIENTE" v-model="searchPaciente" />
                            </div>
                        </div>

                        <div class="col-12">
                            <FullCalendar :options="calendarOptions" />
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-header header-color text-center py-2">
                                CITA TELEMEDICINA
                            </div>
                            <div class="card-body">
                                <BaseInput type="text" class="" label="NOMBRE PACIENTE"
                                    :value="selectedCita ? selectedCita.nombre : ''" disabled />
                                <BaseInput type="text" class="" label="DOCUMENTO IDENTIDAD"
                                    :value="selectedCita ? selectedCita.documento : ''" disabled />
                                <BaseInput type="text" class="" label="FECHA DE LA CITA"
                                    :value="selectedCita ? selectedCita.fecha : ''" disabled />
                                <BaseInput type="text" class="" label="HORA DE LA CITA"
                                    :value="selectedCita ? selectedCita.hora : ''" disabled />
                                <BaseInput type="text" class="" label="DOCTOR QUE ATIENDE"
                                    :value="selectedCita ? selectedCita.medico : ''" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import BaseInput from '../utilsComponents/BaseInput.vue'
import BaseSelect from '../utilsComponents/BaseSelect.vue'

export default {
    name: 'appointmentCalendar',
    components: { FullCalendar, BaseInput, BaseSelect },
    data() {
        return {
            selectedSede: '',
            selectedMedico: '',
            searchPaciente: '',
            sedes: [
                { id: 1, nombre: 'Sede Principal' },
                { id: 2, nombre: 'Sede Virtual' }
            ],
            medicos: [
                { id: 1, nombre: 'Luis' },
                { id: 2, nombre: 'Ana María' }
            ],
            selectedCita: null,
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: 'es',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                events: [
                    {
                        id: 1,
                        title: 'CC 1098123446 - MÉDICO: LUIS',
                        start: '2025-04-08T10:00:00',
                        end: '2025-04-08T10:20:00',
                        extendedProps: {
                            documento: 'CC 1098123446',
                            medico: 'LUIS',
                            tipo: 'telemedicina',
                        }
                    },
                    {
                        id: 2,
                        title: 'CC 1098123446 - MÉDICO: LUIS',
                        start: '2025-04-14T10:00:00',
                        end: '2025-04-14T10:20:00',
                        extendedProps: {
                            documento: 'CC 1098123446',
                            medico: 'LUIS',
                            tipo: 'telemedicina',
                        }
                    },
                    {
                        id: 3,
                        title: 'CC 1098123446 - MÉDICO: LUIS',
                        start: '2025-04-21T10:00:00',
                        end: '2025-04-21T10:20:00',
                        extendedProps: {
                            documento: 'CC 1098123446',
                            medico: 'LUIS',
                            tipo: 'telemedicina',
                        }
                    },
                    {
                        id: 4,
                        title: 'CC 1098123446 - MÉDICO: LUIS',
                        start: '2025-04-28T14:00:00',
                        end: '2025-04-28T14:20:00',
                        extendedProps: {
                            documento: 'CC 1098123446',
                            medico: 'LUIS',
                            tipo: 'telemedicina',
                        }
                    },
                    {
                        id: 5,
                        title: 'CC 1098123423 - MÉDICO: LUIS',
                        start: '2025-04-28T14:00:00',
                        end: '2025-04-28T14:20:00',
                        extendedProps: {
                            documento: 'CC 1098123446',
                            medico: 'LUIS',
                            tipo: 'telemedicina',
                        }
                    },
                ],
                eventClick: (info) => this.handleEventClick(info),
                eventContent: (arg) => this.customEventContent(arg),
                eventClassNames: () => ['evento-personalizado'],
                dayMaxEventRows: 2,
                moreLinkClassNames: ['evento-personalizado'],
            },
        }
    },
    methods: {
        handleEventClick(info) {
            // Guardar la cita seleccionada para mostrarla en la tarjeta
            const event = info.event;
            this.selectedCita = {
                nombre: event.title.split('- MÉDICO:')[0].trim(),
                documento: event.extendedProps.documento,
                fecha: event.start ? event.start.toLocaleDateString('es-CO') : '',
                hora: event.start && event.end ? `${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '',
                medico: event.extendedProps.medico,
            };
        },
        customEventContent(arg) {
            // Obtener todos los eventos del mismo día
            const events = arg.view.calendar.getEvents();
            const currentDate = arg.event.start;
            const sameDayEvents = events.filter(ev => {
                return ev.start &&
                    ev.start.getFullYear() === currentDate.getFullYear() &&
                    ev.start.getMonth() === currentDate.getMonth() &&
                    ev.start.getDate() === currentDate.getDate();
            });
            if (sameDayEvents.length === 1) {
                // Mostrar detalle completo
                const doc = arg.event.extendedProps.documento;
                const medico = arg.event.extendedProps.medico;
                const hora = arg.event.start && arg.event.end ? `${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${arg.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '';
                return { html: `<div class='evento-personalizado'><strong>${doc}</strong><br>${hora}<br>MÉDICO: ${medico}</div>` };
            } else {
                // Solo la cédula
                const doc = arg.event.extendedProps.documento;
                return { html: `<div class='evento-personalizado'><strong>${doc}</strong></div>` };
            }
        },
    }
}
</script>

<style scoped>
.header-color {
    background-color: #C6FFCD;
    color: #767676;
    font-family: Inter;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;

}

.evento-personalizado {
    background-color: #C6FFCD !important;
    color: #333 !important;
    border: 1px solid #A3E4B7 !important;
    padding: 6px 10px !important;
    border-radius: 6px !important;
    font-size: 14px;
    margin-bottom: 2px;
    box-sizing: border-box;
}

.fc-daygrid-event-harness{
    background-color: #fd0000 !important;
}

.fc-popover {
  background: #C6FFCD !important;
  border-radius: 8px !important;
}
.fc-popover .fc-event {
  background: #C6FFCD !important;
  color: #333 !important;
  border: 1px solid #A3E4B7 !important;
}
</style>