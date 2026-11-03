<template>
    <div>
      <Loading v-if="this.isLoading" :valuetitle="title" />
      <div class="" v-else>
        <form action="" v-on:submit.prevent="sendFormsgynecology()">
          <div class="row mb-4">

            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Embarazo:</label>
              <input type="number" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="pregnant" v-model="gynecology.pregnant"/>
              <b-alert v-if="msg_error.pregnant" class="text-danger text-alert" variant="danger" show>{{ msg_error.pregnant }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Edad Gestacional:</label>
              <input type="number" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="gestational_age" v-model="gynecology.gestational_age"/>
              <b-alert v-if="msg_error.gestational_age" class="text-danger text-alert" variant="danger" show>{{ msg_error.gestational_age }}</b-alert>
            </div>

            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Menarquia:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="menarche" v-model="gynecology.menarche"/>
              <b-alert v-if="msg_error.menarche" class="text-danger text-alert" variant="danger" show>{{ msg_error.menarche }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">N° Cesáreas:</label>
              <input type="number" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="caesareanSections" v-model="gynecology.caesareanSections"/>
              <b-alert v-if="msg_error.caesareanSections" class="text-danger text-alert" variant="danger" show>{{ msg_error.caesareanSections }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Ciclos:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="cycles" v-model="gynecology.cycles"/>
              <b-alert v-if="msg_error.cycles" class="text-danger text-alert" variant="danger" show>{{ msg_error.cycles }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">N° Mortinatos:</label>
              <input type="number" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="stillbirths" v-model="gynecology.stillbirths"/>
              <b-alert v-if="msg_error.stillbirths" class="text-danger text-alert" variant="danger" show>{{ msg_error.stillbirths }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Gravida:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="gravida" v-model="gynecology.gravida"/>
              <b-alert v-if="msg_error.gravida" class="text-danger text-alert" variant="danger" show>{{ msg_error.gravida }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">N° Hijos Vivos:</label>
              <input type="number" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="livingChildren" v-model="gynecology.livingChildren"/>
              <b-alert v-if="msg_error.livingChildren" class="text-danger text-alert" variant="danger" show>{{ msg_error.livingChildren }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">N° Partos:</label>
              <input type="number" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="deliveries" v-model="gynecology.deliveries"/>
              <b-alert v-if="msg_error.deliveries" class="text-danger text-alert" variant="danger" show>{{ msg_error.deliveries }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Fechas de Ultima Menstruacción:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="datesLastMenstruation" v-model="gynecology.datesLastMenstruation"/>
              <b-alert v-if="msg_error.datesLastMenstruation" class="text-danger text-alert" variant="danger" show>{{ msg_error.datesLastMenstruation }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">N° de Abortos:</label>
              <input type="number" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="abortions" v-model="gynecology.abortions"/>
              <b-alert v-if="msg_error.abortions" class="text-danger text-alert" variant="danger" show>{{ msg_error.abortions }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Planificación:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" name="planning" v-model="gynecology.planning"/>
              <b-alert v-if="msg_error.planning" class="text-danger text-alert" variant="danger" show>{{ msg_error.planning }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Fecha de menopausia:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4 " name="menopausedate" v-model="gynecology.menopausedate"/>
              <b-alert v-if="msg_error.menopausedate" class="text-danger text-alert" variant="danger" show>{{ msg_error.menopausedate }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Fecha de ultima Citología:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4 " name="date_cytology" v-model="gynecology.date_cytology"/>
              <b-alert v-if="msg_error.date_cytology" class="text-danger text-alert" variant="danger" show>{{ msg_error.date_cytology }}</b-alert>
            </div>
            <div class="col-md-6 p-1">
              <label for="example-text-input" class="form-control-label">Observación de Citología:</label>
              <input type="text" class="form-control form-control-sm" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4 " name="cytology_observation" v-model="gynecology.cytology_observation"/>
              <b-alert v-if="msg_error.cytology_observation" class="text-danger text-alert" variant="danger" show>{{ msg_error.cytology_observation }}</b-alert>
            </div>
          </div>
          <div class="row" v-if="this.valueStatus.key_status === 3">
            <div class="col-md-12 text-end">
              <argon-button type="submit" color="success " :disabled="spiner === true" size="sm" class="ms-auto">
                <span v-if="spiner === false">Guardar</span>
                <div class="d-flex align-items-center" v-if="spiner === true">
                  <strong class="me-2">Guardando Datos</strong>
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
  import ArgonButton from "@/components/ArgonButton.vue";
  import { mapActions, mapGetters } from "vuex";
  import Swal from 'sweetalert2'
  import 'sweetalert2/src/sweetalert2.scss'
  import moment from 'moment'
  import Loading from '../Utils/Loading.vue';
  
  export default {
    name: "formHistory",
    props:{
      valueStatus:Object
    },
    data() {
      return {
        userValidate: {},
        fecha: new Date().toLocaleDateString(),
        showMenu: false,
        gynecology: {
            menarche:'',
            caesareanSections:'',
            cycles:'',
            stillbirths:'',
            gravida:'',
            livingChildren:'',
            deliveries:'',
            datesLastMenstruation:'',
            abortions:'',
            planning:'',
            IDHistory:'',
            IDPatient:'',
            ID_Patient:'',
            menopauseoption:'Si',
            menopausedate:'',
            pregnant:'',
            gestational_age:'',
            date_cytology:'',
            cytology_observation:'',
        },
        msg_error: {
            menarche:'',
            caesareanSections:'',
            cycles:'',
            stillbirths:'',
            gravida:'',
            livingChildren:'',
            deliveries:'',
            datesLastMenstruation:'',
            abortions:'',
            planning:'',
            menopauseoption:'',
            menopausedate:'',
            pregnant:'',
            gestational_age:''
        },
        show: false,
        searchserviceOrder: this.valueStatus.id,
        searchKeyPatient: this.valueStatus.key_patient,
        keyHistory: '',
        spiner: false,
        keyPatient: '',
        KeyTypeCare: '',
        isLoading: true,
        title: 'Ginecología',
      };
  
    },
    components: {
      ArgonButton,
      Loading
    },
    
  watch: {
    async getGynecology() { 
      this.isLoading = true
      if (this.valueStatus.id !== '' && this.valueStatus.id !== null && this.valueStatus.id !== undefined && this.valueStatus.genre == 'F') {
        this.gynecology = this.getGynecology
        this.isLoading = false
      }
      
    }
  },
    async mounted() {
      this.$store.state.isAbsolute = true;
  
      this.validateUser()
      if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined && this.valueStatus.genre == 'F') {
        await this.loadingActive()
        this.gynecology = this.getGynecology
      }
    },
    methods: {
      ...mapActions('History', ["addGynecology", "searchGynecology", "updateGynecology"]),
      async getStoreserviceOrder() {
        if (this.searchserviceOrder != undefined) {
          const searchOrder = {
            keyHistory: this.searchserviceOrder,
            keyPatient: this.searchKeyPatient
          }
          await this.searchGynecology(searchOrder)
        }
      },
      async loadingActive() {
        this.isLoading = true
        await this.getStoreserviceOrder()
        this.isLoading = false
      },
      validateUser() {
        this.userValidate = JSON.parse(localStorage.getItem('user'))
      },
      clearErrors(){
        this.msg_error.menarche = ''
        this.msg_error.caesareanSections = ''
        this.msg_error.cycles = ''
        this.msg_error.stillbirths = ''
        this.msg_error.gravida = ''
        this.msg_error.livingChildren = ''
        this.msg_error.deliveries = ''
        this.msg_error.datesLastMenstruation = ''
        this.msg_error.abortions = ''
        this.msg_error.planning = ''
        this.msg_error.menopauseoption = ''
        this.msg_error.menopausedate = ''
      },
      async sendFormsgynecology() {
        this.gynecology.IDHistory = this.searchserviceOrder
        this.gynecology.IDPatient = this.searchKeyPatient
        
        this.clearErrors()
        if (!this.$validatePropertyEmpty(this.gynecology.menarche)) {
          this.msg_error.menarche = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.caesareanSections)) {
          this.msg_error.caesareanSections = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.cycles)) {
          this.msg_error.cycles = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.stillbirths)) {
          this.msg_error.stillbirths = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.gravida)) {
          this.msg_error.gravida = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.livingChildren)) {
          this.msg_error.livingChildren = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.deliveries)) {
          this.msg_error.deliveries = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.datesLastMenstruation)) {
          this.msg_error.datesLastMenstruation = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.abortions)) {
          this.msg_error.abortions = 'Este campo es obligatorio'
          return
        }
        if (!this.$validatePropertyEmpty(this.gynecology.planning)) {
          this.msg_error.planning = 'Este campo es obligatorio'
          return
        }
        if (this.gynecology.menopauseoption == 'Si') {
          if (!this.$validatePropertyEmpty(this.gynecology.menopausedate)) {
          this.msg_error.menopausedate = 'Este campo es obligatorio'
          return
        }
        }

        // Asignar valores por defecto si los campos están vacíos
        if (!this.$validatePropertyEmpty(this.gynecology.date_cytology)) {
          this.gynecology.date_cytology = null; // o usa "" si tu backend lo acepta
        }
        if (!this.$validatePropertyEmpty(this.gynecology.cytology_observation)) {
          this.gynecology.cytology_observation = 'Sin observación';
        }
        
        this.spiner = true
        if(this.getGynecology.ID_Patient){
          const response = await this.updateGynecology(this.gynecology)
          if (response === true) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Datos actualizados',
              showConfirmButton: false,
              timer: 1500
            })
            this.spiner = false
            this.getStoreserviceOrder()
          }else {
            this.spiner = false
            Swal.fire({
              icon: 'error',
              title: 'Lo siento, los datos no se pudieron agregar',
              text: response, 
            })
          }
        }else{
          const response = await this.addGynecology(this.gynecology)
          if (response === true) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Datos agregado con exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.spiner = false
            this.getStoreserviceOrder()
          }else {
            this.spiner = false
            Swal.fire({
              icon: 'error',
              title: 'Lo siento, los datos no se pudieron agregar',
              text: response, 
            })
          }
        }

        
      },
      moment,
  
    },
    computed: {
      ...mapGetters('History', ['getGynecology']),
    }
  };
  </script>