<template>
    <main>
      <div class="container-fluid py-7">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card">
              <form action="" v-on:submit.prevent="sendFormevaluation()">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">{{ this.$route.name}}</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DE LA EVALUACION </p>
                  <div class="row">
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre de la Evaluacion</label
                      >
                      <input type="text" class="form-control form-control-sm" name="name_evaluation" v-model="evaluation.name_evaluation" />
                      <b-alert v-if="msg_error.name_evaluation" class="text-danger" variant="danger" show>{{ msg_error.name_evaluation }}</b-alert>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label"
                        >Tipo de Traslado</label
                      >
                      <select class="form-select form-select-sm"  name="transfer"  v-model="evaluation.transfer" aria-label="Default select example">
                        <option :value="items.id_transfer" :key="items.id_transfer"  v-for="items in gettransfer">{{items.description}}</option>
                      </select>
                      <b-alert v-if="msg_error.id_transfer" class="text-danger" variant="danger" show>{{ msg_error.id_transfer }}</b-alert>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label"
                        >Estado de la Evaluacion</label
                      >
                      <select class="form-select form-select-sm"  name="state"  v-model="evaluation.state" aria-label="Default select example">
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
    name: "formevaluation",
    data() {
      return {
        showMenu: false,
        evaluation:{
          name_evaluation:'',
          state:'',
          transfer:'',
        },
        msg_error:{
          name_evaluation:'',
          state:'',
          transfer:'',
        },
        show:false,
        searchevaluation:this.$route.params.id,
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
      await this.getStoreevaluation();

      if(this.searchevaluation !== '' && this.searchevaluation !== null && this.searchevaluation !== undefined){
        this.evaluation = this.getevaluation
      }
    },
    methods:{
        ...mapActions('Evaluation',['get',"Aggevaluation","Search"]),
        ...mapActions('Transfer',['get']),
      async getStoreevaluation(){
        if(this.searchevaluation != undefined){
          await this.Search(this.searchevaluation)
        }
      },
      async sendFormevaluation(){
        this.msg_error = {}
        if(this.evaluation.name_evaluation.length  == 0){
          this.msg_error.name_evaluation = "El nombre de la Evaluacion es obligatorio"
          return
        }
        if(this.evaluation.state.length  == 0){
          this.msg_error.state = "El estado de la Evaluacion es obligatorio"
          return
        }
        if(this.evaluation.transfer.length  == 0){
          this.msg_error.transfer = "Debe Selecionar un tipo de traslado"
          return
        }
        this.spiner = true
        const response = await this.Aggevaluation(this.evaluation)
        if(response){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El registro fue exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/evaluation')
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
        ...mapGetters('Evaluation',['getevaluation']),
        ...mapGetters('Transfer',['gettransfer']),
    }
  };
  </script>
  