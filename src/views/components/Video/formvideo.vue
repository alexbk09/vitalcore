<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12" v-if="this.gethistory.video != ''">
                    <!-- <video :src="this.videoUrl" height="480" controls controlslist="nodownload"></video> -->
                    <img :src="this.videoUrl" alt="">
                </div>
            </div>
            <form action="" v-on:submit.prevent="sendFormsVideo()">
                <div class="row">
                    <div class="col-12 mt-5 ">
                        <label for="">Archivo</label>
                        <div class="input-group">
                            <input type="file" class="form-control input-group-lg" aria-label="Upload" name="video"
                                id="video" v-on:change="onFileChange" :disabled="valueStatus.status == 5 || valueStatus.status == 4" />
                        </div>
                    </div>
                    <div class="col-md-12 text-end mt-5">
                        <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm"
                            class="ms-auto">
                            <span v-if="spiner === false">Cargar soporte</span>
                            <div class="d-flex align-items-center" v-if="spiner === true">
                                <strong class="me-2">Cargando soporte...</strong>
                                <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                            </div>
                        </argon-button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ArgonButton from "./../../../components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'formVideo',
    props:{
      valueStatus:String
    },
    data() {
        return {
            dataVideo: {
                video: '',
                IDHistory: '',
                IDPatient: ''
            },
            video: '',
            videoUrl: '',
            showMenu: false,
            spiner: false,
            searchserviceOrder: this.$route.params.id,
            searchKeyPatient: this.$route.params.key_patient,
            url: ''
        };
    },
    components: {
        ArgonButton
    },
    async mounted() {
        if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
            await this.getStoreserviceOrder()
        }
    },
    methods: {
        ...mapActions('History', ["addVideo", "SearchOrder"]),
        async getStoreserviceOrder() {
            if (this.searchserviceOrder != undefined) {
                const searchOrder = {
                keyHistory: this.searchserviceOrder,
                keyPatient: this.searchKeyPatient
                }
                await this.SearchOrder(searchOrder)
                this.url = process.env.VUE_APP_BASE_URL_MEDIO + 'storage/'
                if (this.gethistory && this.gethistory.video) {
                this.videoUrl = this.url + this.gethistory.video.replace('public/', '')
                } else {
                this.videoUrl = ''
                }
            }
            },
        onFileChange(event) {
            // Asignar el archivo seleccionado al v-model "video"
            this.video = event.target.files[0];
        },
        async sendFormsVideo() {
            this.dataVideo.IDHistory = this.searchserviceOrder
            this.dataVideo.video = this.video
            this.spiner = true
            const response = await this.addVideo(this.dataVideo)
            if (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Video Cargado con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.spiner = false
                await this.getStoreserviceOrder()
            }
            if (response === false) {
                this.spiner = false
                Swal.fire({
                    icon: 'error',
                    title: 'Lo siento, el video no se pudo cargar',
                    text: 'Intentalo de nuevo',
                })
            }
        }
    },
    computed: {
        ...mapGetters('History', ['gethistory']),
    }
}

</script>

<style>
video {
    width: 100%;
}
</style>