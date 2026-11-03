<template>
    <main>
      <div class="container-fluid py-7">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card">
              <form action="" v-on:submit.prevent="sendFormEvent()">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">{{ this.$route.name}}</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DEL EVENTO </p>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre del Evento</label
                      >
                      <input type="text" class="form-control form-control-sm" name="name_event" v-model="event.name_event" />
                      <b-alert v-if="msg_error.name_event" class="text-danger" variant="danger" show>{{ msg_error.name_event }}</b-alert>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Estado del Evento</label
                      >
                      <select class="form-select form-select-sm"  name="state"  v-model="event.state" aria-label="Default select example">
                        <option value="1">Activo</option>
                        <option value="2">Desactivado</option>
                      </select>
                      <b-alert v-if="msg_error.state" class="text-danger" variant="danger" show>{{ msg_error.state }}</b-alert>
                    </div>
                    <div class="col-md-12 text-end">
                      <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm" class="ms-auto">
                        <span v-if="spiner === false">Guardar</span> 
                        <div class="d-flex align-items-center" v-if="spiner === true">
                            <strong class="me-2">Registrando</strong>
                            <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                        </div>
                      </argon-button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
    import setNavPills from "./../../../assets/js/nav-pills.js";
    import setTooltip from "./../../../assets/js/tooltip.js";
    import ArgonButton from "./../../../components/ArgonButton.vue";
    import { mapActions, mapGetters } from "vuex";
    import Swal from 'sweetalert2'
    import 'sweetalert2/src/sweetalert2.scss' 
  
  
  export default {
    name: "formevent",
    data() {
      return {
        showMenu: false,
        event:{
          name_event:'',
          state:''
        },
        msg_error:{
          name_event:'',
          state:''
        },
        show:false,
        searchevent:this.$route.params.id,
        spiner: false
      };
      
    },
    components: { 
      ArgonButton
    },
  
    async mounted() {
      this.$store.state.isAbsolute = true;
      setNavPills();
      setTooltip();
      await this.get();
      await this.getStoreevent();

      if(this.searchevent !== '' && this.searchevent !== null && this.searchevent !== undefined){
        this.event = this.getevent
      }
    },
    methods:{
        ...mapActions('EventType',['get',"Aggevent","Search"]),
      async getStoreevent(){
        if(this.searchevent != undefined){
          await this.Search(this.searchevent)
        }
      },
      async sendFormEvent(){
        this.msg_error = {}
        if(this.event.name_event.length  == 0){
          this.msg_error.name_event = "El nombre del Evento es obligatorio"
          return
        }
        if(this.event.state.length  == 0){
          this.msg_error.state = "El estado del evento es obligatorio"
          return
        }
        this.spiner = true
        const response = await this.Aggevent(this.event)
        if(response){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El registro fue exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/event')
        }
        if(response === false){
          this.spiner = false
          Swal.fire({
            icon: 'error',
              title: 'Lo siento, el evento no pudo ser registrado',
          })
        }
      }
    },
    computed:{
        ...mapGetters('EventType',['getevent']),
    }
  };
  </script>
  