<template>
    <div>
        <div class="container-fluid">
            <form action="" v-on:submit.prevent="sendFormCompanyData()">
                <div class="row">
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label">Nombre de la empresa en mision:</label>
                    <input type="text" class="form-control form-control-sm" name="name" v-model="mission.name" />
                    <b-alert v-if="msg_error.name" class="text-danger" variant="danger" show>{{
                            msg_error.name }}</b-alert>
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label">Tipo de documento:</label>
                    <select class="form-select form-select-sm" name="type_id"
                      v-model="mission.type_id" id="inlineFormCustomSelectPref">
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
                  </div>

                  <div class="col-md-4">
                          <label for="example-text-input"
                            class="form-control-label">N° de Identificacion:</label>
                          <!-- <label for="example-text-input" v-if="this.mission.type_id == 2"
                            class="form-control-label">Razon Social:</label> -->
                            <input type="text" class="form-control form-control-sm" name="document" v-model="mission.document" />
                          <b-alert v-if="msg_error.document" class="text-danger" variant="danger" show>{{
                            msg_error.document }}</b-alert>
                        </div>
                  <!-- 
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label">dirección:</label>
                    <input type="text" class="form-control form-control-sm" name="address" v-model="mission.address" />
                  </div> -->
                  <div class="col-md-12 text-end mt-4">
                    <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm"  class="ms-auto">
                      <span v-if="spiner === false">Agregar</span>
                      <div class="d-flex align-items-center" v-if="spiner === true">
                        <strong class="me-2">Agregando</strong>
                        <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                      </div>
                    </argon-button>
                  </div>
                </div>
              </form>
              <div class="row">
                <div class="col-md-12 mt-4">
                  <div class="table-responsive">
                    <table class="table table-striped border text-center">
                      <thead class="table-info">
                        <tr>
                          <th scope="col">Nombre</th>
                          <th scope="col">Tipo de Documento</th>
                          <th scope="col">Documento</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr :key="row.id"  v-for="row in getCompanyData">
                          <td>{{ row.name }}</td>
                          <td v-if="row.type_id === 0">Tipo de Documento</td>
                          <td v-if="row.type_id === 1">CC</td>
                          <td v-if="row.type_id === 2">NIT</td>
                          <td v-if="row.type_id === 3">RC</td>
                          <td v-if="row.type_id === 4">TI</td>
                          <td v-if="row.type_id === 5">NUIP</td>
                          <td v-if="row.type_id === 6">CE</td>
                          <td v-if="row.type_id === 7">PA</td>
                          <td v-if="row.type_id === 8">PE</td>
                          <td v-if="row.type_id === 9">SV</td>
                          <td v-if="row.type_id === 10">CD</td>
                          <td v-if="row.type_id === 11">CN</td>
                          <td v-if="row.type_id === 12">MS</td>
                          <td v-if="row.type_id === 13">AS</td>
                          <td>{{ row.document }}</td>
                          <td><button type="button"
                            class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-1 btn-outline-info mt-2"
                            @click="searchCompany(row.id)"
                            >Editar</button><button  type="button"
                            class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2"
                            @click="deleteCompany(row.id)"
                            >Borrar</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
        </div>
    </div>
</template>

<script>

import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss' 


export default {
    name: "FormCompanyMission",
    props: {
      parametro: {
        type: String,
        required: true
      },
      valueAgreements:String
    },
    data(){
        return{
            showMenu: false,
            mission:{
                name:'',
                document:'',
                address:'',
                id:'',
                key:'',
                type_id:''
            },
            msg_error:{
              document:'',
              name:'',
            },
            searchagreements:this.$route.params.id,
            companyIdKey:'',
            spiner: false
            
        } 
    },
    components: { 
        ArgonButton
    },
    async mounted() {
      const valueAgreements = this.valueAgreements;
    if (valueAgreements !== '' && valueAgreements !== null && valueAgreements !== undefined) {
        this.clearCompany()
        this.getCompany(valueAgreements)
        this.mission = this.getCompanylDataID
      }
    },
    methods:{
        ...mapActions('Agreements',["get","AddCompanyData","getCompany","searchCompanyId","destroyCompany","UpdateCompanyData","clearCompany"]),
        resetFormCompanyData(){
            this.mission.name = '',
            this.mission.document = '',
            this.mission.address = '',
            this.mission.type_id = '',
            this.msg_error.document = '',
            this.msg_error.name = ''
        },
        async sendFormCompanyData(){
          const valueAgreements = this.valueAgreements;
          if (this.$route.params.id !== '' || this.$route.params.id !== null || this.$route.params.id !== undefined) {
            this.searchagreements = this.parametro
          }
          if (!this.$validatePropertyEmpty(this.mission.name)) {
            if (!/^\d{9}|\d{1,3}(?:\.\d{3})*-\d{1}$/.test(this.mission.name)) {
              this.msg_error.name = "El nombre de la copañia es obligatorio"
              return
            }
          }
          if (this.mission.type_id == 2) {
            if (!/^\d{9}|\d{1,3}(?:\.\d{3})*-\d{1}$/.test(this.mission.document)) {
              this.msg_error.document = "El formato del nit debe ser exacto, ejemplo 123456789-2"
              return
            }
          }
          if (this.mission.type_id != 2) {
            if (!this.$validatePropertyEmpty(this.mission.document)) {
              this.msg_error.document = "El numero de identificación del vendedor es obligatorio"
              return
            }
            if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.mission.document)) {
              this.msg_error.document = "Este campos solo acepta formatos numericos"
              return
            }
          }

            this.mission.id = valueAgreements
            this.mission.key = this.companyIdKey
            if (this.companyIdKey != '') {
              this.spiner = true
              await this.UpdateCompanyData(this.mission)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La empresa se modifico con exito',
                showConfirmButton: false,
                timer: 1500
              })
              this.spiner = false
              this.companyIdKey = ''
            }else{
              this.spiner = true
              await this.AddCompanyData(this.mission)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La empresa se agrego con exito',
                showConfirmButton: false,
                timer: 1500
              })
              this.spiner = false
            }
            this.getCompany(valueAgreements)
            this.resetFormCompanyData()
        },
        async searchCompany(companyId){
          this.resetFormCompanyData()
          await this.searchCompanyId(companyId)
          this.mission = this.getCompanylDataID
          return this.companyIdKey = companyId
        },
       
        deleteCompany(id){
          const valueAgreements = this.valueAgreements;
            Swal.fire({
                title: '¿Está seguro que deseas eliminar esta empresa en mision?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.mission.key = valueAgreements
                  this.mission.id = id
                  const response = this.destroyCompany(this.mission)
                  this.getCompany(valueAgreements)
                  Swal.fire(
                    '¡Eliminado!',
                    'La empresa en mision ha sido eliminado.',
                    'success'
                  )
                  if(response){
                    this.getCompany(valueAgreements)
                  }
                }
              })
          },
    },
    computed:{
      ...mapGetters('Agreements',['getCompanyData','getCompanylDataID']),
      ...mapGetters('Cups',['getCups']),
    }
}
 
</script>