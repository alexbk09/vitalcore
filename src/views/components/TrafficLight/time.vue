<template>
    <div class="d-flex justify-content-between gap-2">
        <div :key="t + index" v-for="(t, index) in time"
            class="bg-primary bg-gradient text-white  container-item__with min_with" style="min-width: 150px !important;">
            <small class="text-center">{{ t }}</small>
        </div>
    </div>
</template>

<script>
//import { Container, Draggable } from 'vue3-smooth-dnd'
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Componente",
    components: {
        /* Draggable,
          Container */

    },
    data() {
        return {
            items: [

            ],
            professionals: [],
            time: [], // Inicialmente vacío
            hours: 24,
            initialConfigHours: 0,
            date: new Date(),
            agenda: [],
            tiempo: '',
            itemActive: {
                professional: null,
                time: null,
                position: null
            },
            patientInfo: '',
            timeInfo: '',

        };
    },
    async mounted() {
        this.getDoctor();
        this.getLocalStore();
        this.generateTime();
    },
    methods: {
        ...mapActions('Traffic', ["gettrafficType", "searchDoctor"]),
        async getDoctor() {
            await this.searchDoctor()
        },
        async getLocalStore() {
            this.items = JSON.parse(localStorage.getItem('user'))
            //await this.gettrafficType(this.items.id)
        },
        generateTime() {
            const startHour = this.initialConfigHours;
            const endHour = this.hours;
            const timeArray = [];

            for (let hour = startHour; hour <= endHour; hour++) {
                const hourString = hour < 10 ? '0' + hour : hour; // Agregar un cero al principio si la hora es menor que 10
                const timeString = `${hourString}:00`; // No necesitas agregar AM/PM en formato militar
                timeArray.push(timeString);
            }

            this.time = timeArray;
        },
        viewPatient(patient, time) {
            this.patientInfo = patient,
                this.timeInfo = time
        },

        selectItem(_professional, _time, id) {
            this.itemActive = id
        },


    },
    computed: {
        ...mapGetters('Traffic', ['gettraffic', 'getDoctorData']),
    }

};
</script>

<style></style>