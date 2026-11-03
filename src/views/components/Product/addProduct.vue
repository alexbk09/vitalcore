<template>
    <main>
      <div class="container-fluid py-7">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card">
              <form action="" v-on:submit.prevent="sendFormproduct()">
                <div class="card-header pb-0">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">{{ this.$route.name}}</p>
                    <!-- <p class="mb-0">Edit Profile</p> -->
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">INFORMACION DEL productO </p>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Nombre del producto</label
                      >
                      <input type="text" class="form-control form-control-sm" name="description" v-model="product.description" />
                      <b-alert v-if="msg_error.description" class="text-danger" variant="danger" show>{{ msg_error.description }}</b-alert>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label"
                        >Estado del producto</label
                      >
                      <select class="form-select form-select-sm"  name="state"  v-model="product.state" aria-label="Default select example">
                        <option value="1">Activo</option>
                        <option value="2">Desactivado</option>
                      </select>
                      <b-alert v-if="msg_error.state" class="text-danger" variant="danger" show>{{ msg_error.state }}</b-alert>
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
    </main>
  </template>
  
  <script>
    import setNavPills from "./../../../assets/js/nav-pills.js";
    import setTooltip from "./../../../assets/js/tooltip.js";
    import ArgonButton from "./../../../components/ArgonButton.vue";
    import { mapActions, mapGetters } from "vuex";
    import Swal from 'sweetalert2'
    import 'sweetalert2/src/sweetalert2.scss' 
  
  
  export default {
    name: "formproduct",
    data() {
      return {
        showMenu: false,
        product:{
          description:'',
          state:'',
          id_key:'',
        },
        msg_error:{
          description:'',
          state:''
        },
        show:false,
        searchproduct:this.$route.params.id,
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
      

      if(this.searchproduct !== '' && this.searchproduct !== null && this.searchproduct !== undefined){
        this.product = this.getProducts
        await this.getStoreproduct();
      }
    },
    methods:{
        ...mapActions('Products',['get',"AddProducts","Search","UpdateProducts"]),
      async getStoreproduct(){
        if(this.searchproduct != undefined){
          await this.Search(this.searchproduct)
        }
      },
      async sendFormproduct(){
        this.msg_error = {}
        if(this.product.description.length  == 0){
          this.msg_error.description = "El nombre del producto es obligatorio"
          return
        }
        if(this.product.state.length  == 0){
          this.msg_error.state = "El estado del producto es obligatorio"
          return
        }
        this.spiner = true
        
        if(this.searchproduct !== '' && this.searchproduct !== null && this.searchproduct !== undefined){
          this.product.id_key = this.searchproduct
          const response = await this.UpdateProducts(this.product)
          if(response){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El registro fue exitoso',
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push('/products')
          }
          if(response === false){
            this.spiner = false
            Swal.fire({
              icon: 'error',
                title: 'Lo siento, el producto no pudo ser registrado',
            })
          }
        }else{
          const response = await this.AddProducts(this.product)
          if(response){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El registro fue exitoso',
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push('/products')
          }
          if(response === false){
            this.spiner = false
            Swal.fire({
              icon: 'error',
                title: 'Lo siento, el producto no pudo ser registrado',
            })
          }
        }
      }
    },
    computed:{
        ...mapGetters('Products',['getProducts']),
    }
  };
  </script>
  