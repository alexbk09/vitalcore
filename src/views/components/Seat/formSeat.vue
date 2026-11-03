<template>
    <main>
      <div class="py-7 container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card">
              <form action="" v-on:submit.prevent="sendFormSeat()">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">{{ this.$route.name}}</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DE LA SEDE </p>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre de la sede</label
                      >
                      <input type="text" class="form-control form-control-sm" name="name_seat" v-model="seat.name_seat" />
                      <b-alert v-if="msg_error.name_seat" class="text-danger" variant="danger" show>{{ msg_error.name_seat }}</b-alert>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Estado de la sede</label
                      >
                      <select class="form-select form-select-sm"  name="state"  v-model="seat.state" aria-label="Default select example">
                        <option value="1">Activo</option>
                        <option value="2">Desactivado</option>
                      </select>
                      <b-alert v-if="msg_error.state" class="text-danger" variant="danger" show>{{ msg_error.state }}</b-alert>
                    </div>
                    <div class="col-md-12 col-xl-3">
                      <label for="">Dirección</label>
                      <input type="text" class="form-control form-control-sm" name="address" v-model="seat.address">
                    </div>
                    <div class="col-md-12 col-xl-3">
                      <label for="">Habilitación</label>
                      <input type="text" class="form-control form-control-sm" name="qualification" v-model="seat.qualification">
                    </div>
                    <div class="col-md-12 col-xl-3">
                      <label for="">Telefono</label>
                      <input type="text" class="form-control form-control-sm" name="phone" v-model="seat.phone">
                    </div>
                    <div class="col-md-12 col-xl-3">
                      <label for="">Celular</label>
                      <input type="text" class="form-control form-control-sm" name="cellphone" v-model="seat.cellphone">
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
    name: "formSeat",
    data() {
      return {
        showMenu: false,
        seat:{
          name_seat:'',
          state:'',
          address:'',
          location:'',
          qualification:'',
          phone:'',
          cellphone:'',
        },
        msg_error:{
          name_seat:'',
          state:'',
          address:'',
          location:'',
          qualification:'',
          phone:'',
          cellphone:'',
        },
        show:false,
        searchseat:this.$route.params.id,
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
      await this.getStoreseat();

      if(this.searchseat !== '' && this.searchseat !== null && this.searchseat !== undefined){
        this.seat = this.getseat
      }
    },
    methods:{
        ...mapActions('Seat',['get',"AggSeat","Search"]),
      async getStoreseat(){
        if(this.searchseat != undefined){
          await this.Search(this.searchseat)
        }
      },
      async sendFormSeat(){
        this.msg_error = {}
        if(this.seat.name_seat.length  === 3 || this.seat.name_seat.length  === 0){
          this.msg_error.name_seat = "El nombre de la sede tiene que ser mayor a 3 caracteres"
          return
        }
        if(this.seat.state.length  == 0){
          this.msg_error.state = "El estado de la sede es obligatorio"
          return
        }
        if(this.seat.qualification.length  == 0){
          this.msg_error.qualification = "La habilitación de la sede es obligatoria"
          return
        }
        this.spiner = true
        const response = await this.AggSeat(this.seat)
        if(response){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El registro fue exitoso',
              showConfirmButton: false,
              timer: 1500
            })
          this.$router.push('/seat')
        }
        if(response === false){
          this.spiner = false
          Swal.fire({
            icon: 'error',
              title: 'Lo siento, la sede no pudo ser registrada',
              text: 'Intentalo nuevamente',
          })
        }
      }
    },
    computed:{
        ...mapGetters('Seat',['getseat']),
    }
  };
  </script>
  