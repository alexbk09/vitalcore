<template>
  <div>
    <div class="container-fluid">
      <form action="" v-on:submit.prevent="sendFormgeoreferencingData()">
        <div class="row">
          <div class="col-md-12 col-xl-6">
            <label for="example-text-input" class="form-control-label">Nombre de la Georeferenciacion:</label>
            <input type="text" class="form-control form-control-sm" name="description"
              v-model="georeferencing.description" />
          </div>
          <div class="col-md-12 col-xl-6">
            <label for="example-text-input" class="form-control-label">Sede:</label>
            <select name="sede_id" id="" class="form-select form-select-sm" v-model="georeferencing.sede_id">
              <option :value="items.id_seat" :key="items.id_seat" v-for="items in getseat">{{ items.name_seat }}</option>
            </select>
          </div>
          <div class="col-md-12 text-end mt-4">
            <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm" class="ms-auto">
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
                  <th scope="col">Sede</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="row.id" v-for="row in getgeoreferencingData">
                  <td>{{ row.description }}</td>
                  <td>{{ row.name_seat }}</td>
                  <td><button type="button"
                      class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-1 btn-outline-info mt-2"
                      @click="searchgeoreferencing(row.id)">Editar</button><button type="button"
                      class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2"
                      @click="deletegeoreferencing(row.id)">Borrar</button></td>
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
  name: "formGeoreferencing",
  props: {
    valueAgreements:String
  },
  data() {
    return {
      showMenu: false,
      georeferencing: {
        description: '',
        id: '',
        key: '',
        sede_id: ''
      },
      searchagreements: this.$route.params.id,
      georeferencingIdKey: '',
      spiner: false
    }
  },
  components: {
    ArgonButton
  },
  async mounted() {
    const valueAgreements = this.valueAgreements;
    if (valueAgreements !== '' && valueAgreements !== null && valueAgreements !== undefined) {
      this.clearGeoreferencing()
      this.getgeoreferencing(valueAgreements)
      this.georeferencing = this.getgeoreferencinglDataID
      this.get()
    }
  },
  methods: {
    ...mapActions('Agreements', ["get", "AddgeoreferencingData", "getgeoreferencing", "searchgeoreferencingId", "destroygeoreferencing", "UpdategeoreferencingData","clearGeoreferencing"]),
    ...mapActions('Seat',["get"]),
    resetFormgeoreferencingData() {
      this.georeferencing.description = ''
      this.georeferencing.sede_id = ''
    },
    async sendFormgeoreferencingData() {
      const valueAgreements = this.valueAgreements;
      this.georeferencing.id = valueAgreements
      this.georeferencing.key = this.georeferencingIdKey
      if (this.georeferencingIdKey != '') {
        this.spiner = true
        const response = await this.UpdategeoreferencingData(this.georeferencing)
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La georeferenciacion se modifico con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.spiner = false
          this.georeferencingIdKey = ''
        }
        if (response === false) {
          this.spiner = false
          Swal.fire({
            icon: 'error',
            title: 'Lo siento, la georeferenciacion no pudo ser modificada',
            text: 'Intentalo de nuevo',
          })
        }
      } else {
        this.spiner = true
        const response = await this.AddgeoreferencingData(this.georeferencing)
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La georeferenciacion se agrego con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.spiner = false
          this.georeferencingIdKey = ''
        }
        if (response === false) {
          this.spiner = false
          Swal.fire({
            icon: 'error',
            title: 'Lo siento, la georeferenciacion no pudo ser agregada',
            text: 'Intentalo de nuevo',
          })
        }

      }
      this.getgeoreferencing(valueAgreements)
      this.resetFormgeoreferencingData()
    },
    async searchgeoreferencing(georeferencingId) {
      this.resetFormgeoreferencingData()
      await this.searchgeoreferencingId(georeferencingId)
      this.georeferencing = this.getgeoreferencinglDataID
      return this.georeferencingIdKey = georeferencingId
    },
    deletegeoreferencing(id) {
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
          const response = this.destroygeoreferencing(id)
          this.getgeoreferencing(this.searchagreements)
          Swal.fire(
            '¡Eliminado!',
            'La empresa en mision ha sido eliminado.',
            'success'
          )
          if (response) {
            this.getgeoreferencing(this.searchagreements)
          }
        }
      })
    },
  },
  computed: {
    ...mapGetters('Agreements', ['getgeoreferencingData', 'getgeoreferencinglDataID']),
    ...mapGetters('Seat',['getseat']),
  }
}

</script>