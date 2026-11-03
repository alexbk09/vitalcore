<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <form action="" v-on:submit.prevent="AggUsers(user)">
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
                <p class="text-uppercase text-sm">INFORMACION DEL USUARIO </p>
                <div class="row">
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Nombre de usuario</label
                    >
                    <input type="text" class="form-control"  name="user_name" v-model="user.user_name" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Dirección de correo electrónico</label
                    >
                    <input type="email" class="form-control"  name="email" v-model="user.email"  />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Telefono</label
                    >
                    <input type="text" class="form-control"  name="phone" v-model="user.phone" />
                  </div>
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >Contraseña</label
                    >
                    <input type="text" class="form-control"  name="password"  v-model="user.password" />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Nombres</label
                    >
                    <input type="text" class="form-control"  name="name" v-model="user.name"  />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Apellidos</label
                    >
                    <input type="text" class="form-control"  name="last_name"  v-model="user.last_name" />
                  </div>
                  
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Tipo de Identificacion</label
                    >
                    <select class="form-select"  name="t_identication"  v-model="user.t_identication" aria-label="Default select example">
                      <option selected>Seleccione una opción</option>
                      <option value="Cedula de Ciudadania">Cedula de Ciudadania</option>
                      <option value="Tarjetas de Identidad">Tarjetas de Identidad</option>
                      <option value="Cédulas de extranjería">Cédulas de extranjería</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Numero de Identificacion</label
                    >
                    <input type="text" class="form-control"  name="identication" v-model="user.identication"  />
                  </div>
                </div>
                <hr class="horizontal dark" />
                <p class="text-uppercase text-sm">INFORMACIÓN DEL CONTACTO</p>
                <div class="row">
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >Dirección</label
                    >
                    <input
                      type="text"
                      name="direction"
                      class="form-control"
                      v-model="user.direction"
                    />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Ciudad</label
                    >
                    <input type="text" class="form-control" name="city"  v-model="user.city" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >País</label
                    >
                    <input type="text" class="form-control"  name="country" v-model="user.country" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >código postal</label
                    >
                    <input type="text" class="form-control"  name="p_code" v-model="user.p_code" />
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
        <div class="col-md-4">
          <profile-card />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "./../assets/js/nav-pills.js";
import setTooltip from "./../assets/js/tooltip.js";
import ProfileCard from "./components/ProfileCard.vue";
//import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "./../components/ArgonButton.vue";
import ArgonCheckbox from "./../components/ArgonCheckbox.vue";
//import auth from './../auth/auth'

const body = document.getElementsByTagName("body")[0];

export default {
  name: "Profile",
  data() {
    return {
      showMenu: false,
      user:{},
      msg_error:{
				user_name:'',
				email:'',
				password:'',
        name:'',
        last_name:'',
        t_identication:'',
        identication:'',
			},
			show:false,
      searchuser:this.$route.params.id,
    };
    
  },
  components: { 
    ProfileCard, 
    ArgonCheckbox, 
    //ArgonInput, 
    ArgonButton },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    this.Getuser();
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
    
    
  }
};
</script>
