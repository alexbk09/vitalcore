<template>
    <div>
        <div class="container-fluid">
            <form action="" v-on:submit.prevent="sendFormCommercialData()">
                <div class="row">
                  <div class="col-md-12 col-xl-6">
                    <label for="example-text-input" class="form-control-label">Nombre Contacto (Representante Legal, gerente o encargado):</label>
                    <input type="text" class="form-control form-control-sm" name="ItemsNameContact" v-model="commercial.ItemsNameContact" />
                    <b-alert v-if="msg_error.ItemsNameContact" class="text-danger" variant="danger" show>{{ msg_error.ItemsNameContact }}</b-alert>
                  </div>
                  <div class="col-md-6 col-xl-6">
                    <label for="example-text-input" class="form-control-label">Cargo o Informacion Relevante:</label>
                    <input type="text" class="form-control form-control-sm" name="ItemsPost" v-model="commercial.ItemsPost" />
                    <b-alert v-if="msg_error.ItemsPost" class="text-danger" variant="danger" show>{{ msg_error.ItemsPost }}</b-alert>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Telefono:</label>
                    <input type="text" class="form-control form-control-sm" name="ItemsPhone" v-model="commercial.ItemsPhone" />
                    <b-alert v-if="msg_error.ItemsPhone" class="text-danger" variant="danger" show>{{ msg_error.user_charge }}</b-alert>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Correo Electronico:</label>
                    <input type="email" class="form-control form-control-sm" name="ItemsEmail" v-model="commercial.ItemsEmail" />
                    <b-alert v-if="msg_error.ItemsEmail" class="text-danger" variant="danger" show>{{ msg_error.ItemsEmail }}</b-alert>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Fecha de Cumpleaños:</label>
                    <input type="date" class="form-control form-control-sm" name="ItemsDate" v-model="commercial.ItemsDate" />
                    <b-alert v-if="msg_error.ItemsDate" class="text-danger" variant="danger" show>{{ msg_error.ItemsDate }}</b-alert>
                  </div>
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
                          <th scope="col">Nombre Contacto</th>
                          <th scope="col">Cargo</th>
                          <th scope="col">Telefono</th>
                          <th scope="col">Correo</th>
                          <th scope="col">Fecha de Cumpleaños</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr :key="row.id"  v-for="row in getCommercialData">
                          <td>{{ row.name }}</td>
                          <td>{{ row.charge }}</td>
                          <td>{{ row.phone }}</td>
                          <td>{{ row.email }}</td>
                          <td>{{ row.birthdate }}</td>
                          <td><button type="button"
                            class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-1 btn-outline-info mt-2"
                            @click="searchCommercial(row.id)"
                            >Editar</button><button  type="button"
                            class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2"
                            @click="deleteCommercial(row.id)"
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
    name: "FormCommercial",
    props: {
      valueAgreements:String
    },
    data(){
        return{
            showMenu: false,
            commercial:{
                ItemsNameContact:'',
                ItemsPost:'',
                ItemsPhone:'',
                ItemsEmail:'',
                ItemsDate:'',
                id:'',
                key:'',
            },
            msg_error:{
                ItemsNameContact:'',
                ItemsPost:'',
                ItemsPhone:'',
                ItemsEmail:'',
                ItemsDate:'',
                id:'',
                key:'',
            },
            searchagreements:this.$route.params.id,
            commercialIdKey:'',
            show:false,
            spiner: false

        } 
    },
    components: { 
        ArgonButton
    },
    async mounted(){
      const valueAgreements = this.valueAgreements;
        if(valueAgreements !== '' && valueAgreements !== null && valueAgreements !== undefined){
            this.clearCommercial()
            this.getCommercial(valueAgreements)
            this.commercial = this.getCommercialDataID
        }
    },
    methods:{
        ...mapActions('Agreements',["get","AddCommercialData","getCommercial","searchCommercialId","destroyCommercial","UpdateCommercialData","clearCommercial"]),
        resetFormCommercialData(){
            this.commercial.ItemsNameContact = '',
            this.commercial.ItemsPost = '',
            this.commercial.ItemsPhone = '',
            this.commercial.ItemsEmail = '',
            this.commercial.ItemsDate = ''
        },
        validateForm(){
          if(!this.$validatePropertyEmpty(this.commercial.ItemsNameContact)){
            this.msg_error.ItemsNameContact = "El nombre del contacto es obligatorio"
            return
          }
          if(!this.$validatePropertyEmpty(this.commercial.ItemsPost)){
            this.msg_error.ItemsPost = "El cargo es obligatorio"
            return
          }
          if(!this.$validatePropertyEmpty(this.commercial.ItemsPhone)){
            this.msg_error.ItemsPhone = "El telefono es obligatorio"
            return
          }
          if(!this.$validatePropertyEmpty(this.commercial.ItemsEmail)){
            this.msg_error.ItemsEmail = "El el correo es obligatorio"
            return
          }
          if(!this.$validatePropertyEmpty(this.commercial.ItemsDate)){
            this.msg_error.ItemsDate = "La fecha de cumpleaños es obligatorio"
            return
          }
        },
        async searchCommercial(commercialId){
            this.resetFormCommercialData()
            await this.searchCommercialId(commercialId)
            this.commercial = this.getCommercialDataID
            return this.commercialIdKey = commercialId
            
        },
        async sendFormCommercialData(){
          const valueAgreements = this.valueAgreements;
            this.commercial.id = valueAgreements
            this.commercial.key = this.commercialIdKey
            if (this.commercialIdKey != '') {
              this.spiner = true
              const response = await this.UpdateCommercialData(this.commercial)
              if(response){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'El Contacto se modifico con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.spiner = false
                this.commercialIdKey = ''
              }
              if(response === false){
                this.spiner = false
                Swal.fire({
                  icon: 'error',
                    title: 'Lo siento, el Contacto no pudo ser modificado',
                    text: 'Intentalo de nuevo',
                })
              }


            }else{
              if(!this.$validatePropertyEmpty(this.commercial.ItemsNameContact)){
                this.msg_error.ItemsNameContact = "El nombre del contacto es obligatorio"
                return
              }
              if(!this.$validatePropertyEmpty(this.commercial.ItemsPost)){
                this.msg_error.ItemsPost = "El cargo es obligatorio"
                return
              }
              if(!this.$validatePropertyEmpty(this.commercial.ItemsPhone)){
                this.msg_error.ItemsPhone = "El telefono es obligatorio"
                return
              }
              if(!this.$validatePropertyEmpty(this.commercial.ItemsEmail)){
                this.msg_error.ItemsEmail = "El el correo es obligatorio"
                return
              }
              if(!this.$validatePropertyEmpty(this.commercial.ItemsDate)){
                this.msg_error.ItemsDate = "La fecha de cumpleaños es obligatorio"
                return
              }
              this.spiner = true
              const response = await this.AddCommercialData(this.commercial)
              if(response){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'El Contacto se agrego con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.spiner = false
                this.commercialIdKey = ''
              }
              if(response === false){
                this.spiner = false
                Swal.fire({
                  icon: 'error',
                    title: 'Lo siento, el Contacto no se pudo agregar',
                    text: 'Intentalo de nuevo',
                })
              }
            }
            this.getCommercial(valueAgreements)
            this.resetFormCommercialData()
        },
        deleteCommercial(id){
          const valueAgreements = this.valueAgreements;
            Swal.fire({
                title: '¿Está seguro que deseas eliminar contacto comercial?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.commercial.key = valueAgreements
                  this.commercial.id = id
                  const response = this.destroyCommercial(this.commercial)
                  this.getCommercial(valueAgreements)
                  Swal.fire(
                    '¡Eliminado!',
                    'El contacto comercial ha sido eliminado.',
                    'success'
                  )
                  if(response){
                    this.getCommercial(valueAgreements)
                  }
                }
              })
          },
    },
    computed:{
      ...mapGetters('Agreements',['getagreements','getCommercialData','getCommercialDataID']),
      ...mapGetters('Cups',['getCups']),
    }
}

</script>