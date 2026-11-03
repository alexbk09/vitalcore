<template>
    <main>
      <div class="py-7 container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card">
              <form action="" v-on:submit.prevent="sendFormrequest()">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">{{ this.$route.name}}</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DE LA SOLICITUD </p>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre de la solicitud</label
                      >
                      <input type="text" class="form-control form-control-sm" name="name_request" v-model="request.name_request" />
                      <b-alert v-if="msg_error.name_request" class="text-danger" variant="danger" show>{{ msg_error.name_request }}</b-alert>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Estado del solicitud</label
                      >
                      <select class="form-select form-select-sm"  name="state"  v-model="request.state" aria-label="Default select example">
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
    name: "formrequest",
    data() {
      return {
        showMenu: false,
        request:{
          name_request:'',
          state:''
        },
        msg_error:{
          name_request:'',
          state:''
        },
        show:false,
        searchrequest:this.$route.params.id,
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
      await this.getStorerequest();

      if(this.searchrequest !== '' && this.searchrequest !== null && this.searchrequest !== undefined){
        this.request = this.getrequest
      }
    },
    methods:{
        ...mapActions('Request',['get',"Aggrequest","Search"]),
      async getStorerequest(){
        if(this.searchrequest != undefined){
          await this.Search(this.searchrequest)
        }
      },
      async sendFormrequest(){
        this.msg_error = {}
        if(this.request.name_request.length  == 0){
          this.msg_error.name_request = "El nombre de la Solicitud es obligatorio"
          return
        }
        if(this.request.state.length  == 0){
          this.msg_error.state = "El estado de la Solicitud es obligatorio"
          return
        }
        this.spiner = true
        const response = await this.Aggrequest(this.request)
        if(response){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El registro fue exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/request')
        }
        if(response === false){
          this.spiner = false
          Swal.fire({
            icon: 'error',
              title: 'Lo siento, la Atencion no pudo ser registrada',
          })
        }
      }
    },
    computed:{
        ...mapGetters('Request',['getrequest']),
    }
  };
  </script>
  