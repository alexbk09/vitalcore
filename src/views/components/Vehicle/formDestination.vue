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
                  <div class="col-md-12">
                    <select class="form-select form-select-sm" aria-label="Default select example" name="seatDestination"
                      v-model="vehicleDestination.seatDestination">
                      <option :value="items.id_seat" :key="items.id_seat" v-for="items in getseat">{{ items.name_seat }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12 mt-5">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-2" :key="items.id_vehicle" v-for="items in getvehicle">
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" name="destination" :value="items.id_vehicle"
                                v-model="selectedDestinations">
                              <label class="form-check-label" for="flexCheckDefault">
                                {{ items.name_vehicle }}
                              </label>
                            </div>
                          </div>
                        </div>
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
      vehicleDestination: {
        seatDestination: '',
        destination: ''
      },
      msg_error: {

      },
      show: false,
      searchvehicle: this.$route.params.id,
      selectedDestinations: [],
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
    await this.vehicleTransfer();

    if (this.searchvehicle !== '' && this.searchvehicle !== null && this.searchvehicle !== undefined) {
      this.vehicle = this.getvehicle
    }
  },
  methods: {
    ...mapActions('Vehicle', ["get", "search", "destroy", "searchVehicle", "vehicleTransfer", "addDestination"]),
    ...mapActions('Seat', ["get", "Search", "searchSeat", "destroy"]),
    async getStorevehicle() {
      if (this.searchvehicle != undefined) {
        await this.Search(this.searchvehicle)
      }
    },
    async sendFormVehicle() {
      var query = {
        sede: this.vehicleDestination.seatDestination,
        id_vehicle: this.selectedDestinations
      };
      const vehicle = query.id_vehicle.map((item) => {
        return {
          sede: query.sede,
          id_vehicle: item
        }
      }
      )
      var jsonString = JSON.stringify(vehicle);
      this.spiner = true
      const response = await this.addDestination(jsonString)
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
          title: 'Lo siento, no se pudo hacer el cambio de sede',
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
   