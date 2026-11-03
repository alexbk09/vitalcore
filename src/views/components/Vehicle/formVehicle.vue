<template>
  <div>
    <div class="py-7 container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <form action="" v-on:submit.prevent="sendFormVehicle()">
              <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                  <p class="mb-0">{{ this.$route.name }}</p>
                  <!-- <p class="mb-0">Edit Profile</p> -->
                </div>
              </div>
              <div class="card-body">
                <p class="text-uppercase text-sm">INFORMACION DEL VEHICULO </p>
                <div class="row">
                  <div class="col-md-6 ">
                    <label for="example-text-input" class="form-control-label">Placa del vehiculo</label>
                    <input type="text" class="form-control form-control-sm" name="name_vehicle" v-model="vehicle.name_vehicle" />
                    <b-alert v-if="msg_error.name_vehicle" class="text-danger" variant="danger" show>{{
                      msg_error.name_vehicle }}</b-alert>
                  </div>
                  <div class="col-md-6 ">
                    <label for="example-text-input" class="form-control-label">Numero Movil</label>
                    <input type="text" class="form-control form-control-sm" name="contact_phone" v-model="vehicle.contact_phone" />
                    <b-alert v-if="msg_error.contact_phone" class="text-danger" variant="danger" show>{{
                      msg_error.contact_phone }}</b-alert>
                  </div>
                  <div class="col-md-6 ">
                    <label for="example-text-input" class="form-control-label">Tipo de vehiculo</label>
                    <select class="form-select form-select-sm" name="typevehicle" v-model="vehicle.typevehicle"
                      aria-label="Default select example">
                      <option value="1">Vehiculo Especial</option>
                      <option value="2">Ambulancia</option>
                    </select>
                    <b-alert v-if="msg_error.typevehicle" class="text-danger" variant="danger" show>{{ msg_error.state
                    }}</b-alert>
                  </div>
                  <div class="col-md-6 ">
                    <label for="example-text-input" class="form-control-label">Sede del vehiculo</label>
                    <select class="form-select form-select-sm" name="seatVehicle" v-model="vehicle.seatVehicle"
                      aria-label="Default select example">
                      <option :value="items.id_seat" :key="items.id_seat" v-for="items in getseat">{{ items.name_seat }}
                      </option>

                    </select>
                    <b-alert v-if="msg_error.seatVehicle" class="text-danger" variant="danger" show>{{
                      msg_error.seatVehicle }}</b-alert>
                  </div>
                  <div class="col-md-6 ">
                    <label for="example-text-input" class="form-control-label">Estado del vehiculo</label>
                    <select class="form-select form-select-sm" name="state" v-model="vehicle.state" aria-label="Default select example">
                      <option value="1">Activo</option>
                      <option value="2">Desactivado</option>
                    </select>
                    <b-alert v-if="msg_error.state" class="text-danger" variant="danger" show>{{ msg_error.state
                    }}</b-alert>
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
  </div>
</template>
  
<script>
import setNavPills from "./../../../assets/js/nav-pills.js";
    import setTooltip from "./../../../assets/js/tooltip.js";
    import ArgonButton from "./../../../components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


export default {
  name: "formVehicle",
  data() {
    return {
      showMenu: false,
      vehicle: {
        name_vehicle: '',
        state: '',
        typevehicle: '',
        seatVehicle: '',
        id_vehicle: '',
        contact_phone:'',
      },
      msg_error: {
        name_vehicle: '',
        state: '',
        typevehicle: '',
        seatVehicle: '',
        contact_phone:'',
      },
      show: false,
      searchvehicle: this.$route.params.id,
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
    await this.getStorevehicle();

    if (this.searchvehicle !== '' && this.searchvehicle !== null && this.searchvehicle !== undefined) {
      this.vehicle = this.getvehicle
    }
  },
  methods: {
    ...mapActions('Vehicle', ['get', "addVehicle", "Search"]),
    ...mapActions('Seat', ["get"]),
    async getStorevehicle() {
      if (this.searchvehicle != undefined) {
        await this.Search(this.searchvehicle)
      }
    },
    async sendFormVehicle() {
      this.msg_error = {}
      if (this.vehicle.name_vehicle.length === 0 || this.vehicle.name_vehicle.length === 3) {
        this.msg_error.name_vehicle = "El nombre del vehiculo es obligatorio"
        return
      }
      if (this.vehicle.typevehicle.length == 0) {
        this.msg_error.typevehicle = "El Tipo de carro es obligatorio"
        return
      }
      if (this.vehicle.state.length == 0) {
        this.msg_error.state = "El estado del vehiculo es obligatorio"
        return
      }

      if (this.vehicle.seatVehicle.length == 0) {
        this.msg_error.seatVehicle = "La sede del vehiculo es obligatorio"
        return
      }
      this.vehicle.id_vehicle = this.searchvehicle
      this.spiner = true
      const response = await this.addVehicle(this.vehicle)
      if (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El registro fue exitoso',
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push('/vehicle')
      }
      if (response === false) {
        this.spiner = false
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, la placa ya se encuentra registrada',
        })
      }
    }
  },
  computed: {
    ...mapGetters('Vehicle', ['getvehicle']),
    ...mapGetters('Seat', ['getseat']),
  }
};
</script>
   