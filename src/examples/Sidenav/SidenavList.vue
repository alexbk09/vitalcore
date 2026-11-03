<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav" style="overflow-x: hidden;" v-if="this.typeusers.type_user != 3">
      <li class="nav-item">
        <sidenav-item url="/home" :class="getRoute() === 'home' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Inicio'"
          :isHovered="isHovered">
          <template v-slot:icon>
            <i class="fa fa-home text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
  
      <li class="nav-item">
        <sidenav-item url="/dashboard-default" :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Administración'" data-bs-toggle="collapse"
          data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <template v-slot:icon>
            <i class="fa fa-building text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        <div :class="section === 'Administracion' ? 'show' : ''" class="collapse" id="collapseExample">
          <div class="card card-body">
            <ul class="navbar-nav">
              <li class="nav-item" v-if="this.$validateModule('3')">

                <sidenav-item url="/users" :class="getRoute() === 'users' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Usuarios'">
                  <template v-slot:icon>
                    <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li>
              <li class="nav-item" v-if="this.$validateModule('4')">
                <sidenav-item url="/rols" :class="getRoute() === 'rols' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Roles'">
                  <template v-slot:icon>
                    <i class="fa fa-user-secret text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li>
              <li class="nav-item" v-if="this.$validateModule('7')">
                <sidenav-item url="/seat" :class="getRoute() === 'seat' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Sedes'">
                  <template v-slot:icon>
                    <i class="fa fa-home text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li>
              <li class="nav-item" v-if="this.$validateModule('8')">
                <sidenav-item url="/vehicle" :navText="this.$store.state.isRTL ? 'الجداول' : 'vehículos'"
                  data-bs-toggle="collapse" data-bs-target="#collapseVehicle" aria-expanded="false"
                  aria-controls="collapseVehicle">
                  <template v-slot:icon>
                    <i class="fa fa-bus text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
                <div :class="section === 'vehicle' ? 'show' : ''" class="collapse card py-3" id="collapseVehicle">
                  <ul class="navbar-nav ">
                    <li class="nav-item" v-if="this.$validateModule('7')">
                      <sidenav-item url="/vehicle" :class="getRoute() === 'vehicle' ? 'active' : ''"
                        :navText="this.$store.state.isRTL ? 'الجداول' : 'vehículos'">
                        <template v-slot:icon>
                          <i class="fa fa-list text-dark text-sm opacity-10"></i>
                        </template>
                      </sidenav-item>
                      <sidenav-item url="/destination" :class="getRoute() === 'destination' ? 'active' : ''"
                        :navText="this.$store.state.isRTL ? 'الجداول' : 'Destino del vehículos'">
                        <template v-slot:icon>
                          <i class="fa fa-map-marker text-dark text-sm opacity-10"></i>
                        </template>
                      </sidenav-item>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item" v-if="this.$validateModule('9')">
                <sidenav-item url="/event" :class="getRoute() === 'event' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Tipos de Eventos'">
                  <template v-slot:icon>
                    <i class="fa fa-file-text text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li>
              <li class="nav-item" v-if="this.$validateModule('10')">
                <sidenav-item url="/request" :class="getRoute() === 'request' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Tipos de Solicitud'">
                  <template v-slot:icon>
                    <i class="fa fa-list-alt text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li>
             <!--  <li class="nav-item" v-if="this.$validateModule('11')">
                <sidenav-item url="/attention" :class="getRoute() === 'attention' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Tipos de Atención'">
                  <template v-slot:icon>
                    <i class="fa fa-user-md text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li> -->
              <li class="nav-item" v-if="this.$validateModule('12')">
                <sidenav-item url="/evaluation" :class="getRoute() === 'evaluation' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Tipos de Evaluación'">
                  <template v-slot:icon>
                    <i class="fa fa-ambulance text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li>
              <li class="nav-item" v-if="this.$validateModule('17')">
                <sidenav-item url="/cups" :class="getRoute() === 'cups' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Cups'">
                  <template v-slot:icon>
                    <i class="fa fa-code text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li>
              <li class="nav-item" v-if="this.$validateModule('22')">
                <sidenav-item url="/inventory" :navText="this.$store.state.isRTL ? 'الجداول' : 'Acuerco Comercial'"
                  data-bs-toggle="collapse" data-bs-target="#collapseiventory" aria-expanded="false"
                  aria-controls="collapseiventory">
                  <template v-slot:icon>
                    <i class="fa fa-th-list  text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
                <div :class="section === 'inventory' ? 'show' : ''" class="collapse card py-3" id="collapseiventory">
                  <ul class="navbar-nav ">
                    <li class="nav-item" v-if="this.$validateModule('19')">
                      <sidenav-item url="/coverage" :class="getRoute() === 'coverage' ? 'active' : ''"
                        :navText="this.$store.state.isRTL ? 'الفواتیر' : 'COBERTURA O PLAN BENEFICIOS'">
                        <template v-slot:icon>
                          <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
                        </template>
                      </sidenav-item>
                    </li>
                    <li class="nav-item" v-if="this.$validateModule('20')">
                      <sidenav-item url="/contracting" :class="getRoute() === 'contracting' ? 'active' : ''"
                        :navText="this.$store.state.isRTL ? 'الفواتیر' : 'MODALIDAD DE CONTRATACIÓN Y PAGO'">
                        <template v-slot:icon>
                          <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
                        </template>
                      </sidenav-item>
                    </li>
                    <li class="nav-item" v-if="this.$validateModule('20')">
                      <sidenav-item url="/manual" :class="getRoute() === 'manual' ? 'active' : ''"
                        :navText="this.$store.state.isRTL ? 'الفواتیر' : 'MANUALES'">
                        <template v-slot:icon>
                          <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
                        </template>
                      </sidenav-item>
                    </li>
                  </ul>
                </div>
              </li>
             <!--  <li class="nav-item" v-if="this.$validateModule('3')">
                <sidenav-item url="/procedure" :class="getRoute() === 'procedure' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : 'Procedimientos F'">
                  <template v-slot:icon>
                    <i class="fa fa-list text-dark text-sm opacity-10"></i>
                  </template>
                </sidenav-item>
              </li> -->
            </ul>
          </div>
        </div>
      </li>
      <li class="nav-item" v-if="this.$validateModule('14')">
        <sidenav-item url="/tradeAgreement" :class="getRoute() === 'tradeAgreement' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Acuerdos Comerciales'">
          <template v-slot:icon>
            <i class="fa fa-file text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-if="this.$validateModule('16')">
        <sidenav-item url="/serviceOrder" :class="getRoute() === 'serviceOrder' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Ordenes de Servicios'">
          <template v-slot:icon>
            <i class="fa fa-list text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-if="this.$validateModule('18') || this.$validateModule('18')">
        <sidenav-item url="/history-pdf" :class="getRoute() === 'history-pdf' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'PDF Historias Clínica '">
          <template v-slot:icon>
            <i class="fa fa-file text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-if="this.$validateModule('18') || this.$validateModule('18')">
        <sidenav-item url="/history" :class="getRoute() === 'history' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Historias Clínica '">
          <template v-slot:icon>
            <i class="fa fa-user-md text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-if="this.$validateModule('7')">
        <sidenav-item url="/traffic" :class="getRoute() === 'traffic' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Semaforización'">
          <template v-slot:icon>
            <i class="fa fa-tasks text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      
      <li class="nav-item" v-if="this.$validateModule('22')">
        <sidenav-item url="/inventory" :navText="this.$store.state.isRTL ? 'الجداول' : 'Inventario'"
          data-bs-toggle="collapse" data-bs-target="#collapseiventory" aria-expanded="false"
          aria-controls="collapseiventory">
          <template v-slot:icon>
            <i class="fa fa-th-list  text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        <div :class="section === 'inventory' ? 'show' : ''" class="collapse card py-3" id="collapseiventory">
          <ul class="navbar-nav ">
            <li class="nav-item" v-if="this.$validateModule('19')">
              <sidenav-item url="/category" :class="getRoute() === 'category' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Categoria'">
                <template v-slot:icon>
                  <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item" v-if="this.$validateModule('20')">
              <sidenav-item url="/suppliers" :class="getRoute() === 'suppliers' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Proveedores'">
                <template v-slot:icon>
                  <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item" v-if="this.$validateModule('21')">
              <sidenav-item url="/products" :class="getRoute() === 'products' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Productos'">
                <template v-slot:icon>
                  <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item" v-if="this.$validateModule('22')">
              <sidenav-item url="/stores" :class="getRoute() === 'stores' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Bodegas'">
                <template v-slot:icon>
                  <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item" v-if="this.$validateModule('8')">
        <sidenav-item url="/billing" :navText="this.$store.state.isRTL ? 'الجداول' : 'Informes'"
          data-bs-toggle="collapse" data-bs-target="#collapsebilling" aria-expanded="false"
          aria-controls="collapsebilling">
          <template v-slot:icon>
            <i class="fa fa-file text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        <div :class="section === 'billing' ? 'show' : ''" class="collapse card py-3" id="collapsebilling">
          <ul class="navbar-nav ">
            <li class="nav-item" v-if="this.$validateModule('7')">
              <sidenav-item url="/billing-list" :class="getRoute() === 'billing-list' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الجداول' : 'Facturacion '">
                <template v-slot:icon>
                  <i class="fa fa-file-o text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item" v-if="this.$validateModule('7')">
              <sidenav-item url="/wait-time" :class="getRoute() === 'wait-time' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الجداول' : 'Tiempo de Espera'">
                <template v-slot:icon>
                  <i class="fa fa-file-o text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item" v-if="this.$validateModule('7')">
              <sidenav-item url="/history-list" :class="getRoute() === 'history-list' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الجداول' : 'Historia Clinicas'">
                <template v-slot:icon>
                  <i class="fa fa-file-o text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
          </ul>
        </div>
      </li> 
      <li class="nav-item" v-if="this.$validateModule('8')">
        <sidenav-item url="/reports" :navText="this.$store.state.isRTL ? 'الجداول' : 'Financiero'"
          data-bs-toggle="collapse" data-bs-target="#collapsereports" aria-expanded="false"
          aria-controls="collapsereports">
          <template v-slot:icon>
            <i class="fa fa-print  text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        <div :class="section === 'reports' ? 'show' : ''" class="collapse card py-3" id="collapsereports">
          <ul class="navbar-nav ">
            <li class="nav-item" v-if="this.$validateModule('7')">
              <sidenav-item url="/billing" :class="getRoute() === 'billing' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الجداول' : 'Facturación'">
                <template v-slot:icon>
                  <i class="fa fa-file text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item" v-if="this.$validateModule('7')">
              <sidenav-item url="/rips" :class="getRoute() === 'rips' ? 'active' : ''"
                :navText="this.$store.state.isRTL ? 'الجداول' : 'Rips'">
                <template v-slot:icon>
                  <i class="fa fa-file text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
          </ul>
        </div>
      </li> 
      <li class="nav-item" >
        <sidenav-item url="/guide" :class="getRoute() === 'guide' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Manual de Uso'">
          <template v-slot:icon>
            <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/errors" :class="getRoute() === 'errors' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Panel de Errores'">
          <template v-slot:icon>
            <i class="fa fa-bug text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!-- <li class="nav-item">
        <sidenav-item url="/abulance" :class="getRoute() === 'abulance' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Mapa'">
          <template v-slot:icon>
            <i class="fa fa-th-list text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
      <!-- Menú Cita Control -->
      <li class="nav-item">
        <sidenav-item url="#" :navText="$store.state.isRTL ? 'الفواتیر' : 'Cita Control'" data-bs-toggle="collapse" data-bs-target="#collapseCitaControl" aria-expanded="false" aria-controls="collapseCitaControl">
          <template v-slot:icon>
            <i class="fa fa-calendar-check text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        <div :class="section === 'citaControl' ? 'show' : ''" class="collapse card py-3" id="collapseCitaControl">
          <ul class="navbar-nav">
            <li class="nav-item">
              <sidenav-item url="/control-appointments" :navText="$store.state.isRTL ? 'الفواتیر' : 'Citas de Control'">
                <template v-slot:icon>
                  <i class="fa fa-calendar-alt text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item">
              <sidenav-item url="/telemedicine-appointments" :navText="$store.state.isRTL ? 'الفواتیر' : 'Citas de Telemedicina'">
                <template v-slot:icon>
                  <i class="fa fa-video text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item">
              <sidenav-item url="/in-person-appointments" :navText="$store.state.isRTL ? 'الفواتیر' : 'Citas Presenciales'">
                <template v-slot:icon>
                  <i class="fa fa-user-md text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item">
              <sidenav-item url="/medical-schedule" :navText="$store.state.isRTL ? 'الفواتیر' : 'Agenda Médica'">
                <template v-slot:icon>
                  <i class="fa fa-calendar text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item">
              <sidenav-item url="/business-contact" :navText="$store.state.isRTL ? 'الفواتیر' : 'Contacto Empresarial'">
                <template v-slot:icon>
                  <i class="fa fa-building text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
            <li class="nav-item">
              <sidenav-item url="/at-registration" :navText="$store.state.isRTL ? 'الفواتیر' : 'Registro AT'">
                <template v-slot:icon>
                  <i class="fa fa-clipboard-list text-dark text-sm opacity-10"></i>
                </template>
              </sidenav-item>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav" style="overflow-x: hidden;" v-if="this.typeusers.type_user === 3">
      <li class="nav-item">
        <sidenav-item url="/home" :class="getRoute() === 'home' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Inicio'">
          <template v-slot:icon>
            <i class="fa fa-home text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/company/history" :class="getRoute() === 'company/history' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Historia de Compañia'">
          <template v-slot:icon>
            <i class="fa fa-user-md text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
//import SidenavCard from "./SidenavCard.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
      section: '',
      userValidate: {},
      typeusers: '',
    };
  },
  components: {
    SidenavItem,
    //SidenavCard
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    getValidate() {
      this.typeusers = JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted() {
    this.getValidate()
  },
  async beforeUpdate() {
    this.section = this.$route.meta.section
  }
};
</script>

<style>
.footer{
  position: absolute;
  bottom: 0px;
  width: 100%;
  margin: 10px;
  font-size: 12px;
  overflow-x: hidden;
}
</style>