<template>
    <main>
      <div class="py-7 container-fluid">
        <div class="row justify-content-center">
          <div class="col-10">
            <div class="card">
              <form action="" v-on:submit.prevent="saveFormRol">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">{{ this.$route.name}}</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                    
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DEL ROL </p>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre del Rol</label
                      >
                      <input type="text" class="form-control form-control-sm" v-model="rols.name_rol" />
                      <b-alert v-if="msg_error.name_rol" class="text-danger" variant="danger" show>{{ msg_error.name_rol }}</b-alert>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Estado del rol</label
                      >
                      <select class="form-select form-select-sm"  name="state"  v-model="rols.state">
                        <option value="1">Activo</option>
                        <option value="2">Desactivado</option>
                      </select>
                      <b-alert v-if="msg_error.state" class="text-danger" variant="danger" show>{{ msg_error.state }}</b-alert>
                    </div>
                  </div>

                  <div class="row mt-5">
                    <b-alert v-if="msg_error.checkedPrivilegies" class="text-danger" variant="danger" show>{{ msg_error.checkedPrivilegies }}</b-alert>
                    <div class="col-md-6 col-xl-4 mb-4" :key="models.id_models" v-for="models in modelsget">
                      <div class="card">
                        <div class="card-header bg-secondary p-0">
                          <div class="row p-2 mt-1">
                            <div class="col-md-6"><h6 class="fw-bold text-white text-center mt-2">{{ models.name_seat }}</h6></div>
                            <div class="col-md-5 text-end text-white mt-2">
                              <input type="checkbox" class="me-2 form-check-input" @click="selectAll(models.id_models)" />Todos</div>
                          </div>
                        </div>
                        <div class="card-body">
                          <blockquote class="text-center">
                            <div class="col-md-12" :key="items.id_privilegies" v-for="items in filterModule(models.id_models,getpermit)" >
                              <div class="form-check"> 
                                <input class="form-check-input" type="checkbox" name="checkedPrivilegies" v-model="checkedPrivilegies" @change="viewResult" :value="items.id_privilegies" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                  {{items.privilegies}}
                                </label>
                              </div>
                            </div>
                          </blockquote>
                        </div>
                      </div>
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
  <style>
    .margin-rols{
      margin-bottom:0px
    }
  </style>
  <script>
    import setNavPills from "./../../../../assets/js/nav-pills.js";
    import setTooltip from "./../../../../assets/js/tooltip.js";
    import ArgonButton from "./../../../../components/ArgonButton.vue";
    import { mapActions, mapGetters } from "vuex";
    import Swal from 'sweetalert2'
    import 'sweetalert2/src/sweetalert2.scss'
  
  
  export default {
    name: "addRol",
    data() {
      return {
        showMenu: false,
        rols:{
          name_rol:'',
          state:'',
          id_privilegies:''
        },
        msg_error:{
          name_rol:'',
          state:'',
          id_privilegies:''
        },

        show:false,
        searchrol:this.$route.params.id,
        checkedPrivilegies:[],
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
      await this.getmodels();
      await this.getStoreRol();
      await this.getpermises();
      this.rols = this.getrols;
      //this.filterModule()

    },
    methods:{
      ...mapActions('Permit',["getpermises"]),
      ...mapActions('Models',["getmodels"]),
      ...mapActions('Rol',['GetRol',"AggRols","Search","get"]),
      filterModule(id_module,arr_privilegies){
          return arr_privilegies.filter(x => parseInt(x.id_models) === id_module)
      },
      async getStoreRol(){
        if(this.searchrol != undefined){
          await this.Search(this.searchrol)
          if(this.getrols && this.getrols.rol_privileges){
            this.checkedPrivilegies = this.getrols.rol_privileges.map(privilege => privilege.rol_privilegies)
          }
        }
      },
      async selectAll(id_module){
        const selected = this.filterModule(id_module,this.getpermit);
        selected.map(x => {
          const position = this.searchElement(x.id_privilegies)
          if (position !== -1){
            this.deleteElement(position)
            return
          }
            this.checkedPrivilegies.push(x.id_privilegies)
        })
      },
      searchElement(params){
        return this.checkedPrivilegies.indexOf(params);
      },
      deleteElement(position){
        this.checkedPrivilegies.splice(position, 1);
      },
      async saveFormRol(){
        this.msg_error = {}
        if(!this.$validatePropertyEmpty(this.rols.name_rol)){
          this.msg_error.name_rol = "El nombre del rol debe contener minimo 4 caracteres"
          return
        }
        if(!this.$validatePropertyEmpty(this.rols.state)){
          this.msg_error.state = "El estado del rol es obligatorio"
          return
        }
        if(!this.$validatePropertyEmpty(this.checkedPrivilegies)){
          this.msg_error.checkedPrivilegies = "Debes seleccionar por lo menos un permiso"
          return
        }
        this.spiner = true
        this.rols.checkedPrivilegies = this.checkedPrivilegies
        const response = this.AggRols(this.rols)
        if(response){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El registro fue exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/rols')
        }
        if(response === false){
          this.spiner = false
          Swal.fire({
            icon: 'error',
              title: 'Lo siento, el rol no pudo ser registrado',
              text: 'Intentalo nuevamente',
          })
        }
      },
      viewResult(){
        
      }
    },
    computed:{
        ...mapGetters('Rol',['getrols']),
        ...mapGetters('Permit',['getpermit']),
        ...mapGetters('Models',['modelsget']),
    }
  };
  </script>
  