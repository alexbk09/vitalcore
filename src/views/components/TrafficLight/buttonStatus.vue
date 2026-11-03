<template>
    <div>
        <div class="col-md-12 col-xl-6 text-end">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button 
                    type="button" 
                    v-for="(status, index) in filteredStatus"  
                    :key="status.id" 
                    class="btn text-dark btn-sm fw-normal" 
                    :style="`background-color: ${colors[index]};color: ${colorFont[index]} !important;`"
                >
                    {{ status.description }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "buttonStatus",
    data() {
        return {
            status:[],
            colors:[
                '#FFCB00',
                '#FEAB3D',
                'rgb(67, 160, 71)',
                'rgb(229, 57, 53)'
            ],
            colorFont: [
                'white',
                'white',
                'white',
                'white'
            ]
        }
    },
    async mounted() {
        await this.searchStatus();
    },
    methods: {
        ...mapActions('History', ["searchStatus"]),
    },
    computed: {
        ...mapGetters('History', ['getStatus']),
        filteredStatus() {
            return this.getStatus.filter(status => status.description !== 'Activo');
        }
    }
}
</script>