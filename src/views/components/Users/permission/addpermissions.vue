<template>
    <main>
      <div class="py-4 container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <form action="" v-on:submit.prevent="AggPermit(rol)">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">Agregar Usuario</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                    <argon-button type="submit" color="success" size="sm" class="ms-auto"
                      >Guardar</argon-button
                    >
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DEL ROL </p>
                  <div class="row">
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre del Rol</label
                      >
                      <input type="text" class="form-control" v-model="rol.name_rol" />
                    </div>
                  </div>
                  <hr class="horizontal dark" />
                  <p class="text-uppercase text-sm">Permisos concedidos</p>
                  <div class="row">
                    <div class="col-md-2">
                      <argon-checkbox id="checkboxId">Administrador</argon-checkbox>
                    </div>
                    <div class="col-md-2">
                      <argon-checkbox id="checkboxId">Administrador</argon-checkbox>
                    </div>
                    <div class="col-md-2">
                      <argon-checkbox id="checkboxId">Administrador</argon-checkbox>
                    </div>
                    <div class="col-md-2">
                      <argon-checkbox id="checkboxId">Administrador</argon-checkbox>
                    </div>
                    <div class="col-md-2">
                      <argon-checkbox id="checkboxId">Administrador</argon-checkbox>
                    </div>
                    <div class="col-md-2">
                      <argon-checkbox id="checkboxId">Administrador</argon-checkbox>
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
    import setNavPills from "@/assets/js/nav-pills.js";
    import setTooltip from "@/assets/js/tooltip.js";
    //import ArgonInput from "@/components/ArgonInput.vue";
    import ArgonButton from "@/components/ArgonButton.vue";
    import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
    import { mapActions, mapGetters } from "vuex";
  
  const body = document.getElementsByTagName("body")[0];
  
  export default {
    name: "addRol",
    data() {
      return {
        showMenu: false,
        permit:{},
        show:false,
        searchuser:this.$route.params.id,
      };
      
    },
    components: { 
      ArgonCheckbox, 
      ArgonButton },
  
    mounted() {
      this.$store.state.isAbsolute = true;
      setNavPills();
      setTooltip();
    },
    beforeMount() {
      this.$store.state.imageLayout = "profile-overview";
      this.$store.state.showNavbar = false;
      this.$store.state.showFooter = true;
      this.$store.state.hideConfigButton = true;
      body.classList.add("profile-overview");
    },
    beforeUnmount() {
      this.$store.state.isAbsolute = false;
      this.$store.state.imageLayout = "default";
      this.$store.state.showNavbar = true;
      this.$store.state.showFooter = true;
      this.$store.state.hideConfigButton = false;
      body.classList.remove("profile-overview");
    },
    methods:{
        ...mapActions('Permit',['getpermit',"AggPermit"])
    },
    computed:{
        ...mapGetters('Permit',['getpermit'])
    }
  };
  </script>
  