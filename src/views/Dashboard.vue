<template>
  <div class="py-4 pt-7 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12" v-if="this.$validateUser('3') && this.typeusers.type_user !== 3">
            <card 
              :title="stats.money.title"
              :value="getUsers.length"
              :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12" v-if="this.$validateUser('7')  && this.typeusers.type_user !== 3">
            <card 
              :title="stats.users.title"
              :value="getseat.length"
              :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12" v-if="this.$validateUser('8')  && this.typeusers.type_user !== 3">
            <card 
              :title="stats.vehicles.title"
              :value="getvehicle.length"
              :percentage="stats.vehicles.percentage"
              :iconClass="stats.vehicles.iconClass"
              :iconBackground="stats.vehicles.iconBackground"
              :detail="stats.vehicles.detail"
              directionReverse
            ></card>
          </div> 
    <!--  <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.clients.title"
              :value="stats.clients.value"
              :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              :detail="stats.clients.detail"
              directionReverse
            ></card>
          </div>-->
           <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.sales.title"
              :value="getserviceOrder.length"
              :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass"
              :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div> -->
        <!-- <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Sales by Country</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Country:</p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                          <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                          <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-card />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
/* import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue"; */
import { mapActions,mapGetters } from 'vuex';
//import CategoriesCard from "./components/CategoriesCard.vue";



export default {
  name: "dashboard-default",
  data() {
    return {
      stats: {
        money: {
          title: "Usuarios",
          value: "150",
          iconClass: "ni ni-single-02",
          detail: "",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Sedes Registradas",
          value: "10",
          iconClass: "fa fa-home",
          iconBackground: "bg-gradient-danger",
          detail: "",
        },
        vehicles: {
          title: "Vehiculos Registrados",
          value: "10",
          iconClass: "fa fa-ambulance",
          iconBackground: "bg-gradient-success",
          detail: "",
        },
        sales: {
          title: "Consultas Asignadas",
          value: "5",
          percentage: "",
          iconClass: "fa fa-user-md",
          iconBackground: "bg-gradient-warning",
          detail: "",
        },
        
      },
      typeusers:''
    };
  },
  methods: {
    ...mapActions('Users',["get","Search"]),
    ...mapActions('Seat',["getpanel","Search"]),
    ...mapActions('Vehicle',["getvehiclepanel","Search"]),
    ...mapActions('ServiceOrder',["getPanelOrder"]),
    Update(updateuser){
      this.$router.push('/agguser/'+updateuser)
    },
    async getUserId(user){
      //console.log(user)
      this.userDetail = user
      this.stateModal = true
    },
    getValidate() {
      this.typeusers = JSON.parse(localStorage.getItem('user'))
    }
  },
  components: {
    Card,
    /* GradientLineChart,
    Carousel, */
    //CategoriesCard,
  },
  computed:{
      ...mapGetters('Users',['getUsers']),
      ...mapGetters('Seat',['getseat']),
      ...mapGetters('Vehicle',['getvehicle']),
      ...mapGetters('ServiceOrder',['getserviceOrder']),
  },
  async mounted() {
      await this.get();
      await this.getpanel();
      await this.getPanelOrder();
      await this.getvehiclepanel();
      await this.getValidate();
  },
};
</script>
