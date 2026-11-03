<template>
  <main>
    <div class="container-fluid px-2 px-md-4 py-7">
      <div class="row g-0">
        <div class="card w-100">
          <form action="" v-on:submit.prevent="sendFormUser()">
            <div class="card-body p-3 p-md-4">
              <p class="text-uppercase text-sm mb-3">Datos de usuario</p>
              <div class="row g-3">
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Nombre de usuario</label>
                  <input type="text" class="form-control form-control-sm" name="user_name" v-model="user.user_name" />
                  <b-alert v-if="msg_error.user_name" class="text-danger" variant="danger" show>{{ msg_error.user_name
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Correo Personal</label>
                  <input type="email" class="form-control form-control-sm" name="email" v-model="user.email" />
                  <b-alert v-if="msg_error.email" class="text-danger" variant="danger" show>{{ msg_error.email
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Correo Corporatico</label>
                  <input type="email" class="form-control form-control-sm" name="corporate_mail"
                    v-model="user.corporate_mail" />
                  <b-alert v-if="msg_error.corporate_mail" class="text-danger" variant="danger" show>{{
                    msg_error.corporate_mail
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Contraseña</label>
                  <input type="password" id="password" class="form-control form-control-sm" name="password"
                    autocomplete="off" v-model="user.password" />
                  <b-alert v-if="msg_error.password" class="text-danger" variant="danger" show>{{ msg_error.password
                  }}</b-alert>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Ingresa una letra en mayuscula
                      <span class="badge bg-primary rounded-pill">{{ validatePasswordLetter(user.password) ? "Si" : "No"
                      }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Ingresa una letra en minuscula
                      <span class="badge bg-primary rounded-pill">{{ validatePasswordLowercase(user.password) ? "Si" :
                        "No" }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Ingresa una valor numerico
                      <span class="badge bg-primary rounded-pill">{{ validatePasswordNumber(user.password) ? "Si" : "No"
                      }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Ingresa una caracter especial
                      <span class="badge bg-primary rounded-pill">{{ validatePasswordSpecials(user.password) ? "Si" :
                        "No" }}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Celular</label>
                  <input type="text" class="form-control form-control-sm" name="cellphone" v-model="user.cellphone" />
                  <b-alert v-if="msg_error.cellphone" class="text-danger" variant="danger" show>{{ msg_error.cellphone
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Telefono</label>
                  <input type="text" class="form-control form-control-sm" name="phone" v-model="user.phone" />
                  <b-alert v-if="msg_error.phone" class="text-danger" variant="danger" show>{{ msg_error.phone
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Estado del usuario</label>
                  <select class="form-select form-select-sm" name="state" v-model="user.state">
                    <option value="1">Activo</option>
                    <option value="2">Desactivado</option>
                    <option value="0">Bloqueado</option>
                  </select>
                  <b-alert v-if="msg_error.state" class="text-danger" variant="danger" show>{{ msg_error.state
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Tipo de usuario</label>
                  <select class="form-select form-select-sm" name="type_user" v-model="user.type_user">
                    <option v-for="row in getUsersType" :key="row.id" :value="row.id">{{ row.name }}</option>
                  </select>
                  <b-alert v-if="msg_error.type_user" class="text-danger" variant="danger" show>{{ msg_error.type_user
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3" >
                  <label for="example-text-input" class="form-control-label">Compañia</label>
                  <select class="form-select form-select-sm" name="key_trade_agreement" v-model="user.key_trade_agreement">
                    <option value="0">No Aplica</option>
                    <option v-for="row in getagreements" :key="row.id_transfer" :value="row.id_transfer">{{ row.name_agreements }}</option>
                  </select>
                  <b-alert v-if="msg_error.key_trade_agreement" class="text-danger" variant="danger" show>{{ msg_error.key_trade_agreement
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3" v-if="user.type_user == 2">
                  <label for="example-text-input" class="form-control-label">Tipo de Servicio</label>
                  <select class="form-select form-select-sm" name="key_product" v-model="user.key_product">
                    <option v-for="row in listProduct" :key="row.id" :value="row.id">{{ row.description }}</option>
                  </select>
                  <b-alert v-if="msg_error.key_product" class="text-danger" variant="danger" show>{{ msg_error.key_product
                  }}</b-alert>
                </div>
                <!-- roles campos -->
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Roles</label>
                  <select class="form-select form-select-sm" name="rol" v-model="user.rol"
                    aria-label="Default select example">
                    <option :key="items.id" v-for="items in getrols" :value="items.id_rol">{{ items.name_rol }}</option>
                  </select>
                  <b-alert v-if="msg_error.rol" class="text-danger" variant="danger" show>{{ msg_error.rol }}</b-alert>
                </div>
                <div class="col-12">
                  <hr class="horizontal dark" />
                  <p class="text-uppercase text-sm">Datos Personales</p>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Primer Nombre</label>
                  <input type="text" class="form-control form-control-sm" name="name" v-model="user.name" />
                  <b-alert v-if="msg_error.name" class="text-danger" variant="danger" show>{{ msg_error.name
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Segundo Nombre</label>
                  <input type="text" class="form-control form-control-sm" name="second_name"
                    v-model="user.second_name" />
                  <b-alert v-if="msg_error.second_name" class="text-danger" variant="danger" show>{{
                    msg_error.second_name
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Primer Apellido</label>
                  <input type="text" class="form-control form-control-sm" name="last_name" v-model="user.last_name" />
                  <b-alert v-if="msg_error.last_name" class="text-danger" variant="danger" show>{{ msg_error.last_name
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Segundo Apellido</label>
                  <input type="text" class="form-control form-control-sm" name="second_surname"
                    v-model="user.second_surname" />
                  <b-alert v-if="msg_error.second_surname" class="text-danger" variant="danger" show>{{
                    msg_error.second_surname
                  }}</b-alert>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Tipo de Identificacion</label>
                  <select class="form-select form-select-sm" name="t_identication" v-model="user.t_identication"
                    aria-label="Default select example">
                    <option value="1">CC</option>
                    <option value="2">NIT</option>
                    <option value="3">RC</option>
                    <option value="4">TI</option>
                    <option value="5">NUIP</option>
                    <option value="6">CE</option>
                    <option value="7">PA</option>
                    <option value="8">PE</option>
                    <option value="9">SV</option>
                    <option value="10">CD</option>
                    <option value="11">CN</option>
                    <option value="12">MS</option>
                    <option value="13">AS</option>
                  </select>
                  <b-alert v-if="msg_error.t_identication" class="text-danger" variant="danger" show>{{
                    msg_error.t_identication }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">N° de
                    Identificacion:</label>
                  <input type="text" class="form-control form-control-sm" name="identication"
                    v-model="user.identication" />
                  <b-alert v-if="msg_error.identication" class="text-danger" variant="danger" show>{{
                    msg_error.identication }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">
                    Lugar de Expedición:</label>
                  <input type="text" class="form-control form-control-sm" name="expiration_place"
                    v-model="user.expiration_place" />
                  <b-alert v-if="msg_error.expiration_place" class="text-danger" variant="danger" show>{{
                    msg_error.expiration_place }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">
                    Fecha de Expedición:</label>
                  <input type="date" class="form-control form-control-sm" name="expedition_date"
                    v-model="user.expedition_date" />
                  <b-alert v-if="msg_error.expedition_date" class="text-danger" variant="danger" show>{{
                    msg_error.expedition_date }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Genero</label>
                  <select name="gender" class="form-select form-select-sm" v-model="user.gender" id="">
                    <option value="1">Masculino</option>
                    <option value="2">Femenino</option>
                  </select>
                  <b-alert v-if="msg_error.gender" class="text-danger" variant="danger" show>{{ msg_error.gender
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Estado Civil</label>
                  <select name="civil_status" class="form-select form-select-sm" v-model="user.civil_status" id="">
                    <option value="1">Soltero</option>
                    <option value="2">Casado</option>
                    <option value="2">Divorciado</option>
                    <option value="2">Viudo</option>
                    <option value="2">Union Libre</option>
                    <option value="2">Separado</option>
                  </select>
                  <b-alert v-if="msg_error.civil_status" class="text-danger" variant="danger" show>{{ msg_error.civil_status
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Fecha de nacimiento</label>
                  <input type="date" class="form-control form-control-sm" name="birthdate" v-model="user.birthdate" />
                  <b-alert v-if="msg_error.birthdate" class="text-danger" variant="danger" show>{{ msg_error.birthdate
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Fecha de inicio</label>
                  <input type="date" class="form-control form-control-sm" name="start_date" v-model="user.start_date" />
                  <b-alert v-if="msg_error.start_date" class="text-danger" variant="danger" show>{{ msg_error.start_date
                  }}</b-alert>
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Datos de ubicación</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">Dirección Residencial</label>
                  <input type="text" name="direction" class="form-control form-control-sm" v-model="user.direction" />
                  <b-alert v-if="msg_error.direction" class="text-danger" variant="danger" show>{{ msg_error.direction
                  }}</b-alert>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Ciudad</label>
                  <input type="text" class="form-control form-control-sm" name="city" v-model="user.city" />
                  <b-alert v-if="msg_error.city" class="text-danger" variant="danger" show>{{ msg_error.city
                  }}</b-alert>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">País</label>
                  <input type="text" class="form-control form-control-sm" name="country" v-model="user.country" />
                  <b-alert v-if="msg_error.country" class="text-danger" variant="danger" show>{{ msg_error.country
                  }}</b-alert>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">código postal</label>
                  <input type="text" class="form-control form-control-sm" name="p_code" v-model="user.p_code" />
                  <b-alert v-if="msg_error.p_code" class="text-danger" variant="danger" show>{{ msg_error.p_code
                  }}</b-alert>
                </div>

                <hr class="horizontal dark" />
                <p class="text-uppercase text-sm">Cargar Firma</p>
                <div class="col-12">
                  <img :src="'https://ayudamedica-api.aytec.com.co/storage/'+user.signature" class="" width="200" height="100" alt="">
                </div>
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">Firma</label>
                  <input type="file" class="form-control form-control-sm" name="signature" @change="handleFileUpload($event)" />
                  <b-alert v-if="msg_error.signature" class="text-danger" variant="danger" show>{{ msg_error.signature}}</b-alert>
                </div>

                <div class="col-md-12 text-end">
                  <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm"
                    class="ms-auto">
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
  </main>
</template>
  
<script>
import setNavPills from "./../../../../assets/js/nav-pills.js";
    import setTooltip from "./../../../../assets/js/tooltip.js";
    import ArgonButton from "./../../../../components/ArgonButton.vue";
//import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
//import auth from './../auth/auth'
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  name: "AddUser",
  data() {
    return {
      showMenu: false,
      userValidate: {},
      user: {
        user_name: '',
        email: '',
        corporate_mail: '',
        phone: 0,
        cellphone: '',
        password: '',
        rol: '',
        name: '',
        last_name: '',
        second_name: '',
        second_surname: '',
        t_identication: '',
        identication: '',
        direction: '',
        city: '',
        country: '',
        p_code: '',
        state: '',
        start_date: '',
        gender:'',
        birthdate:'',
        civil_status:'',
        expedition_date: '',
        expiration_place: '',
        signature: '',
        signatureBase64: '',
        type_user:null,
        key_trade_agreement: '',
        key_product: ''
      },
      userDetail: {},
      msg_error: {
        user_name: '',
        email: '',
        corporate_mail: '',
        phone: '',
        cellphone: '',
        password: '',
        rol: '',
        name: '',
        last_name: '',
        second_name: '',
        second_surname: '',
        t_identication: '',
        identication: '',
        direction: '',
        city: '',
        country: '',
        p_code: '',
        state: '',
        start_date: '',
        gender:'',
        birthdate:'',
        civil_status:'',
        expedition_date: '',
        expiration_place: '',
        signature: '',
        urlActiva:'',
        type_user:'',
        key_trade_agreement: '',
        key_product: ''
      },
      show: false,
      searchuser: this.$route.params.id,
      spiner: false
    };
  },
  components: {
    //ArgonCheckbox,
    ArgonButton
  },
  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    await this.get();
    await this.getTypeUsers()
    await this.getagreement()
    await this.getProduct()
    if (this.searchuser !== '' && this.searchuser !== null && this.searchuser !== undefined) {
      await this.getStoreUsers()
      this.user = this.getUsers
    }
  },
  methods: {
    ...mapActions('Rol', ["get"]),
    ...mapActions('Users', ['GetRol', "AggUsers", "Search", "UpdateUsers","getTypeUsers"]),
    ...mapActions('Agreements', ["getagreement"]),
    ...mapActions('ContentConsultations', ["getProduct"]),
    async getRolId(rol) {
      this.rolDetail = rol
    },
    // obtener url de .ENV
   
    async getStoreUsers() {
      if (this.searchuser != undefined) {
        await this.Search(this.searchuser)
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.msg_error.signature = ''
      if (file && file.type === 'image/png') {
        const reader = new FileReader();

        reader.onload = () => {
          this.user.signatureBase64 = reader.result; 
        };
        reader.readAsDataURL(file);
      } else {
        this.msg_error.signature = 'Por favor, seleccione un archivo PNG.'
      }
    },
    async sendFormUser() {

      this.msg_error = {}

      if (!this.$validatePropertyEmpty(this.user.user_name)) {
        this.msg_error.user_name = "El nombre de usuario es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.user.email)) {
        this.msg_error.email = "El correo electronico es obligatorio"
        return
      }
      if (this.user.phone !== '' && this.user.phone !== null && this.user.phone !== undefined) {
        if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.user.phone)) {
          this.msg_error.phone = "Este campo solo acepta caracteres numericos"
          return
        }
      }
      
      if (!this.$validatePropertyEmpty(this.user.cellphone)) {
        this.msg_error.cellphone = "El numero de contacto obligatorio "
        return
      }
      if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.user.cellphone)) {
        this.msg_error.cellphone = "Este campo solo acepta caracteres numericos"
        return
      }
      if (this.searchuser === '' && this.searchuser === null && this.searchuser === undefined) {
        if (!this.$validatePropertyEmpty(this.user.password)) {
          this.msg_error.password = "La contraseña es obligatoria"
          return
        }
      }
      if (!this.$validatePropertyEmpty(this.user.type_user)) {
        this.msg_error.type_user = "El tipo de usuario es obligatorio"
      }

      if (this.user.type_user == 2 && !this.$validatePropertyEmpty(this.user.key_product)) {
        this.msg_error.key_product = "El tipo de servicio es obligatorio"
        return
      }

      if (!this.$validatePropertyEmpty(this.user.start_date)) {
        this.msg_error.start_date = "La fecha de inicio es obligatoria"
        return
      }

      if (!this.$validatePropertyEmpty(this.user.birthdate)) {
        this.msg_error.birthdate = "La fecha de nacimiento es obligatoria"
        return
      }

      if (!this.$validatePropertyEmpty(this.user.civil_status)) {
        this.msg_error.civil_status = "El estado civil es obligatorio"
        return
      }

      if (!this.$validatePropertyEmpty(this.user.gender)) {
        this.msg_error.gender = "El genero es obligatorio"
        return
      }

      if (!this.$validatePropertyEmpty(this.user.expedition_date)) {
        this.msg_error.expedition_date = "La fecha de expedicion es obligatoria"
        return
      }

      if (!this.$validatePropertyEmpty(this.user.expiration_place)) {
        this.msg_error.expiration_place = "El lugar de expedicion es obligatorio"
        return
      }

      
      
      /* if (!this.$validatePropertyEmpty(this.user.rol)) {
        this.msg_error.rol = "El rol es obligatorio"
        return
      } */
      if (!this.$validatePropertyEmpty(this.user.name)) {
        this.msg_error.name = "El Nombre es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.user.last_name)) {
        this.msg_error.last_name = "El Apellido es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.user.t_identication)) {
        this.msg_error.t_identication = "El tipo de documento es obligatorio"
        return
      }

      if (!this.$validatePropertyEmpty(this.user.identication)) {
          this.msg_error.identication = "El numero de identificacion es obligatorio"
          return
        }
        if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.user.identication)) {
          this.msg_error.identication = "Este campos solo acepta formatos numericos"
          return
        }

      if (!this.$validatePropertyEmpty(this.user.direction)) {
        this.msg_error.direction = "La direccion es obligatorio"
        return
      }
      
      if (!this.$validatePropertyEmpty(this.user.city)) {
        this.msg_error.city = "La ciudad es obligatoria"
        return
      }
      if (!this.$validatePropertyEmpty(this.user.country)) {
        this.msg_error.country = "El pais es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.user.state)) {
        this.msg_error.state = "El estado es obligatorio"
        return
      }
      if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.user.p_code)) {
        this.msg_error.p_code = "Este campo solo acepta caracteres numericos"
        return
      }
      if (this.searchuser === '' && this.searchuser === null && this.searchuser === undefined) {
        if (!this.validatePassword(this.user.password)) {
          this.msg_error.password = "El formato de la contraseña no es correcto"
          return false
        }
      }
      this.show = true
      this.spiner = true
      const response = await this.AggUsers(this.user)

      if (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El registro fue exitoso',
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push('/users')
      }
      if (response === false) {
        this.spiner = false
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, el usuario ya se encuentra registrado',
          text: 'Prueba cambiando el correo o el numero de identificación',
        })
      }
    },
    validatePassword(password) {
      var pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,16}/;
      return pattern.test(password);
    },
    validatePasswordLetter(password) {
      var pattern = /^(?=.*[A-Z]).{1,16}/;
      return pattern.test(password);
    },
    validatePasswordLowercase(password) {
      var pattern = /^(?=.*[a-z]).{1,16}/;
      return pattern.test(password);
    },
    validatePasswordNumber(password) {
      var pattern = /^(?=.*[0-9]).{1,16}/;
      return pattern.test(password);
    },
    validatePasswordSpecials(password) {
      var pattern = /^(?=.*[!@#$%^&*]).{1,16}/;
      return pattern.test(password);
    },


  },
  computed: {
    ...mapGetters('Users', ['getUsers','getUsersType']),
    ...mapGetters('Rol', ['getrols']),
    ...mapGetters('Agreements', ['getagreements']),
    ...mapGetters("ContentConsultations", ["listProduct"]),
  },
};
</script>
  
<style>
.list-group-item {
  font-size: 11px;
}

.list-group {
  display: none !important;
  width: 100% !important;
  position: absolute;
  z-index: 1000;
  max-width: 300px;
}

#password:focus~.list-group {
  display: block !important;
}

@media (max-width: 768px) {
  .container-fluid {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  .card-body {
    padding: 1rem !important;
  }
  
  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .col-md-6, .col-md-12, .col-md-4, .col-md-3 {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
}
</style>
  
