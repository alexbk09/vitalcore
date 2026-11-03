<template>
    <main>
      <div class="py-4 container-fluid py-7">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card">
              <form action="" v-on:submit.prevent="sendFormattention()">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">{{ this.$route.name}}</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DE LA ATENCION </p>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre de la Atencion</label
                      >
                      <input type="text" class="form-control form-control-sm" name="name_attention" v-model="attention.name_attention" />
                      <b-alert v-if="msg_error.name_attention" class="text-danger" variant="danger" show>{{ msg_error.name_attention }}</b-alert>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Estado de la Atencion</label
                      >
                      <select class="form-select form-select-sm"  name="state"  v-model="attention.state" aria-label="Default select example">
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
    name: "formattention",
    data() {
      return {
        showMenu: false,
        attention:{
          name_attention:'',
          state:''
        },
        msg_error:{
          name_attention:'',
          state:''
        },
        show:false,
        searchattention:this.$route.params.id,
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
      await this.getStoreattention();

      if(this.searchattention !== '' && this.searchattention !== null && this.searchattention !== undefined){
        this.attention = this.getattention
      }
    },
    methods:{
        ...mapActions('Attention',['get',"Aggattention","Search"]),
      async getStoreattention(){
        if(this.searchattention != undefined){
          await this.Search(this.searchattention)
        }
      },
      async sendFormattention(){
        this.msg_error = {}
        if(this.attention.name_attention.length  == 0){
          this.msg_error.name_attention = "El nombre de la Atencion es obligatorio"
          return
        }
        if(this.attention.state.length  == 0){
          this.msg_error.state = "El estado de la Atencion es obligatorio"
          return
        }
        this.spiner = true
        const response = await this.Aggattention(this.attention)
        if(response){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El registro fue exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/attention')
        }
        if(response === false){
          this.spiner = false
          Swal.fire({
            icon: 'error',
              title: 'Lo siento, la Atencion ya se encuentra registrado',
          })
        }
      }
    },
    computed:{
        ...mapGetters('Attention',['getattention']),
    }
  };
  </script>
  