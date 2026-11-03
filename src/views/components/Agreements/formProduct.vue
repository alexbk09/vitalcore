<template>
  <div>
    <div class="container-fluid">
      <form action="" v-on:submit.prevent="sendFormProductData()">
        <div class="row">
          <div class="col-md-12 col-xl-6">
            <label for="example-text-input" class="form-control-label">Nombre del producto o servicio:</label>
            <div class="row">
              <div class="col-3">
                <input type="text" class="form-control form-control-sm" placeholder="Buscar por codigo" autocomplete="off"
                  name="busquedacupscode" @input="searchCupss" v-model="product.busquedacupscode" />
              </div>
              <div class="col">
                <input type="text" class="form-control form-control-sm" placeholder="Buscar por descripcion" autocomplete="off"
                  name="busquedacups" @input="searchCupss" v-model="product.busquedacups" />
              </div>
            </div>
            <ul class="autocompleteProductA" v-if="getCups.length">
              <li :key="row.id_cups" v-for="row in getCups" @click="selecClick(row.id_cups, row.code, row.description, row.price)">
                <span class="text-busqueda">{{ row.code }} {{ row.description }}</span>
              </li>
            </ul>
          </div>
          <div class="col-md-4 col-xl-2">
            <label for="example-text-input" class="form-control-label">Precio:</label>
            <input type="text" class="form-control form-control-sm" name="price" v-model="product.price" />
          </div>
          <div class="col-md-4 col-xl-2">
            <label for="example-text-input" class="form-control-label">Porcentaje:</label>
            <input type="text" class="form-control form-control-sm" name="percentage" @input="calculate(product.percentage)" v-model="product.percentage" />
          </div>
          <div class="col-md-4 col-xl-2">
            <label for="example-text-input" class="form-control-label">Valor a pagar:</label>
            <input type="text" class="form-control form-control-sm" name="amount" v-model="product.amount" />
          </div>
          <div class="col-md-12 text-end mt-4">
            <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm" class="ms-auto">
              <span v-if="spiner === false">Agregar</span>
              <div class="d-flex align-items-center" v-if="spiner === true">
                <strong class="me-2">Agregando</strong>
                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
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
                  <th scope="col">Codigo</th>
                  <th scope="col">Nombre del producto o servicio</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Valor a pagar</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                <tr :key="row.id" v-for="row in getProductData">
                  <td>{{ row.code }}</td>
                  <td>{{ row.description }}</td>
                  <td class="">{{ row.current_price.toLocaleString("es-ES") }}</td>
                  <td class="">{{ row.amount.toLocaleString("es-ES") }}</td>
                  <td>
                    <button type="button" class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2" @click="deleteProduct(row.id)">Borrar</button>
                  </td>
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
  name: "FormProduct",
  props: {
    valueAgreements: String
  },
  data() {
    return {
      showMenu: false,
      product: {
        itemscode: '',
        itemsdescription: '',
        price: '',
        amount: '',
        key_payment_option: '',
        busquedacups: '',
        busquedacupscode: '',
        id: '',
        key: '',
        percentage: '',
      },
      searchagreements: this.$route.params.id,
      id_cups: '',
      codecups: '',
      descriptionc: '', 
      commercialId: '',
      busquedacups: '',
      busquedacupscode: '',
      spiner: false,
      searchConsulter: '',
    }
  },
  components: {
    ArgonButton
  },
  async mounted() {
    const valueAgreements = this.valueAgreements;
    if (valueAgreements !== '' && valueAgreements !== null && valueAgreements !== undefined) {
      this.clearProduct()
      this.getProduct(valueAgreements)
      this.getPaymentMethod()
    }
  },
  methods: {
    ...mapActions('Agreements', ['getProduct', "AddProductData", "Search", "destroyProduct", "clearProduct"]),
    ...mapActions('Cups', ["searchCups", "cleadCups"]),
    ...mapActions('PaymentMethod', ["getPaymentMethod"]),
    resetFormCompanyData() {
      this.product.code = '',
        this.product.description = '',
        this.product.price = '',
        this.product.amount = '',
        this.product.percentage = '',
        this.product.busquedacups = ''
        this.product.busquedacupscode = ''
    },
    selecClick(id_cups, code, description, price) {
      this.id_cups = id_cups
      this.product.price = price
      this.product.busquedacups = code + description
      this.product.itemscode = code
      this.product.busquedacupscode = code
      this.product.itemsdescription = description
      this.cleadCups()
    },
    async sendFormProductData() {
      const valueAgreements = this.valueAgreements;
      this.product.id = valueAgreements
      this.spiner = true
      const response = await this.AddProductData(this.product)
      if (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El producto se agrego con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.spiner = false
        this.getProduct(valueAgreements)
        this.resetFormCompanyData()
        await this.cleadCups()
        this.getCups = ''
      }
      if (response === false) {
        this.spiner = false
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, el producto no pudo ser agregado',
          text: 'Intentalo de nuevo',
        })
      }
    },
    async searchCupss() {
      if (this.product.busquedacups) {
        this.searchConsulter = this.product.busquedacups;
        await this.searchCups({ busqueda: this.searchConsulter });
      } else if (this.product.busquedacupscode) {
        this.searchConsulter = this.product.busquedacupscode;
        await this.searchCups({ busqueda: this.searchConsulter });
      }
    },
    async calculate(items) {
        this.product.amount = ((parseFloat(items) / 100) + 1) * parseFloat(this.product.price);
    },
    deleteProduct(id) {
      const valueAgreements = this.valueAgreements;
      Swal.fire({
        title: '¿Está seguro que deseas eliminar producto?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.product.key = valueAgreements
          this.product.id = id
          const response = this.destroyProduct(this.product)
          this.getProduct(valueAgreements)
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          )
          if (response) {
            this.getProduct(valueAgreements)
          }
        }
      })
    },
  },
  computed: {
    ...mapGetters('Agreements', ['getProductData']),
    ...mapGetters('Cups', ['getCups']),
    ...mapGetters('PaymentMethod', ['getPaymentMethodId']),
  }
}
</script>

<style>
.content {
  margin-top: -50px !important;
  border-top: 1px solid #F8F8F8;
  border-radius: 10px;
}

.contentState {
  cursor: pointer;
}

ul.autocompleteProductA {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 47%;
  z-index: 101;
  background-color: white;
  max-height: 200px; /* Limitar la altura */
  overflow-y: auto; /* Agregar scroll vertical */
}

ul.autocompleteProductA>li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

ul.autocompleteProductA>li:hover {
  background: #d2d2d24d;
}

.text-busqueda {
  font-size: 13px;
  text-transform: capitalize;
}
</style>