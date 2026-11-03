<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 col-xl-4">
                    <label for="">Nombre del Paquete</label>
                    <input type="text" class="form-control form-control-sm" name="namepackage" v-model="diagnostic.namepackage" autocomplete="off">
                    <b-alert v-if="msg_error.namepackage" class="text-danger" variant="danger" show>{{ msg_error.namepackage }}</b-alert>
                </div>
                <div class="col-md-12 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Estado del paquete</label>
                    <select class="form-select form-select-sm" name="status" v-model="diagnostic.status">
                      <option value="1">Activo</option>
                      <option value="2">Desactivado</option>
                    </select>
                    <b-alert v-if="msg_error.status" class="text-danger" variant="danger" show>{{ msg_error.status
                    }}</b-alert>
                </div>
                <div class="col-md-12 col-xl-1 ">
                    <label for="example-text-input" class="form-control-label">Total manual:</label>
                          <div class="form-check form-switch">
                            <input class="form-check-input " type="checkbox" role="switch" v-model="checkboxActivado">
                          </div>
                </div>
                <div class="col-md-12 col-xl-3">
                    <label for="example-text-input" class="form-control-label">Valor:</label>
                    <input type="text" class="form-control form-control-sm" :disabled="!checkboxActivado"
                            name="amount_manual" :value="totalElementos" />
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-9 col-xl-8">
                    <div class="row">
                        <div class="col-md-3 col-xl-2">
                            <label for="">Tipo de Servicio</label>
                            <select class="form-select form-select-sm" aria-label="Default select example" name="searchType" v-model="searchType">
                                <option value="PROC">DIAGNOSTICOS</option>
                                <option value="MED">MEDICAMENTO</option>
                            </select>
                        </div>
                        <div class="col-md-9 col-xl-9">
                            <label for="example-text-input" class="form-control-label">Codigo:</label>
                                <input type="text" autocomplete="off" class="form-control form-control-sm" @input="searchCode" name="code_diagnostic"
                                    v-model="diagnostic.code_diagnostic" style="" />
                                <ul class="autocompletepackage">
                                    <li :key="row.id" v-for="row in getResult"
                                        @click="selecClickcode(row.id, row.code, row.description, row.price)">
                                        <span class="text-busqueda"> {{ row.code + ' ' + row.description + ' ' + row.price }}</span>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div class="table-responsive p-0 mt-5" v-if="this.elementos.length > 0">
                        <table class="table table-striped text-center  mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        style="">Codigo</th>

                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        style="width: 50%;">
                                        Descripción</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        style="width: 10%;">Cantidad
                                    </th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        style="width: 10%;">Precio
                                    </th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        style="width: 10%;">Total
                                    </th>

                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                </tr>
                            </thead>
                            <tr :key="row.key_code" v-for="(row, index) in elementos">
                                <td class="align-middle ">{{ row.key_code }}</td>
                                <td class="align-middle ">{{ row.name }}</td>
                                <td class="align-middle ">{{ row.qty }}</td>
                                <td class="align-middle ">{{ row.price }}</td>
                                <td class="align-middle ">{{ row.total }}</td>
                                <td class="align-middle text-center">
                                    <button type="button"
                                        class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2 me-2"
                                         @click="deleteElement(index)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <b-alert v-if="msg_error.elementos" class="text-danger" variant="danger" show>{{ msg_error.elementos }}</b-alert>
                </div>
                <div class="col-md-4 col-xl-1">
                    <label for="example-text-input" class="form-control-label">Precio:</label>
                    <input type="text" class="form-control form-control-sm" v-model="diagnostic.price">
                </div>
                <div class="col-md-4 col-xl-1">
                    <label for="example-text-input" class="form-control-label">Cantidad:</label>
                    <input type="text" class="form-control  form-control-sm" @input="addTotal(nuevoElemento.catidad)" v-model="nuevoElemento.catidad">
                </div>
                <div class="col-md-4 col-xl-1">
                    <label for="example-text-input" class="form-control-label">Total:</label>
                    <input type="text" class="form-control form-control-sm" readonly v-model="nuevoElemento.total">
                </div>
                <div class="col-md-4 col-xl-1 pt-2">
                    <button type="button" class="btn btn-info btn-sm mt-4" @click="agregarElemento"><i
                            class="fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-xl-12 text-end mt-5">
                    <argon-button @click="sendFormPackage" type="button" color="success mt-4" :disabled="spiner === true" size="sm" class="ms-auto">
                        <span v-if="spiner === false">Guardar Paquete</span>
                        <div class="d-flex align-items-center" v-if="spiner === true">
                            <strong class="me-2">Guardando...</strong>
                            <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                        </div>
                    </argon-button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                      <table class="table text-center table-striped">
                          <thead>
                              <tr>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                      style="">#</th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                      style="">Nombre del Paquete</th>
                                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                      style="">Estado</th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                     >Sub-Total
                                  </th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                     >Total
                                  </th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr :key="row.id" v-for="row in getPackageData">
                                  <td class="align-middle ">{{ row.id }}</td>
                                  <td class="align-middle ">{{ row.name_package }}</td>
                                  <td class="align-middle ">
                                    <span class="badge badge-sm bg-gradient-success"   v-if="row.status === 1">Activo</span>
                                    <span class="badge badge-sm bg-gradient-secondary" v-if="row.status === 2">Desactivado</span>
                                  </td>
                                  <td class="align-middle ">{{ row.total }}</td>
                                  <td class="align-middle ">{{ row.amount_manual }}</td>
                                  <td class="align-middle text-center">
                                        <button type="button"
                                          class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2 me-2"
                                          @click="deletePackage(row.id)"><i class="fa fa-trash"
                                              aria-hidden="true"></i></button>
                                        <button  type="button"
                                          class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-info mt-2"
                                          @click="selectEdit(row)"
                                          ><i class="fa fa-pencil-square-o " aria-hidden="true"></i></button>
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
    props: {
        valueAgreements:String
    },
    data() {
        return {
            elementos: [], // Arreglo para almacenar los elementos
            nuevoElemento: {
                catidad: '',
                precio: '',
                codigo: '',
                total: ''
            }, // Variable para almacenar el nuevo elemento ingresado
            diagnostic: {
                code_diagnostic: '',
                value_diagnostic: '',
                origin_diagnostic: '',
                type_diagnostic: '',
                id_diagnostic: '',
                control_date: '',
                IDHistory: '',
                IDPatient: '',
                price: '',
                namepackage: '',
                idPackage:'',
                status: '',
                amount_manual: ''
            },
            msg_error:{
                namepackage:'',
                elementos:'',
                status:'',
                amount_manual:''
            },
            searchType: '',
            getResult: {},
            searchagreements: this.$route.params.id,
            descriptionItems:'',
            spiner: false,
            checkboxActivado: false,
        };
    },
    components: {
        ArgonButton
    },
    async mounted() {
        const valueAgreements = this.valueAgreements;
        if (valueAgreements !== '' && valueAgreements !== null && valueAgreements !== undefined) {
            this.cleadMedicine()
            this.searchPackage(valueAgreements)
            if (this.diagnostic.amount_manual != '') {
                this.checkboxActivado = true
            }
        }
    },
    methods: {
        ...mapActions('History', ["SearchOrder", "addDiagnostic", "searchDiagnostic", "searchCie10", "cleadCie10", "destroyCie10", "searchMedicine", "cleadMedicine"]),
        ...mapActions('Agreements', ["addPackage", "searchPackage","destroyPackage","updatePackage"]),
        ...mapActions('Cups', ["searchCups", "cleadCups"]),
        agregarElemento() {
            let struct = {
                key_code: this.diagnostic.code,
                qty: this.nuevoElemento.catidad,
                price: this.diagnostic.price,
                total: this.nuevoElemento.total,
                name: this.descriptionItems
            }
            this.elementos.push(struct); 
            this.nuevoElemento.catidad = '';
            this.nuevoElemento.precio = '';
            this.diagnostic.code_diagnostic = '';
            this.nuevoElemento.total = '';
            this.diagnostic.value_diagnostic = '',
            this.diagnostic.price = ''
            this.diagnostic.code = ''
        },
        getPositions(){
            const positions = this.elementos.map((elemento, index) => index);
            return positions;
        },
        deleteElement(position) {
            if (position >= 0 && position < this.elementos.length) {
                this.elementos.splice(position, 1);
                return true;
            }
            return false;
        },
        async sendFormPackage() {
            const valueAgreements = this.valueAgreements;
            if (!this.$validatePropertyEmpty(this.diagnostic.namepackage)) {
                this.msg_error.namepackage = "El nombre del paquete es obligatorio"
                return
            }
            if (!this.$validatePropertyEmpty(this.elementos)) {
                this.msg_error.elementos = "Se tiene que agregar un elemento por lo menos"
                return
            }
            if(!this.$validatePropertyEmpty(this.diagnostic.status)){
                this.msg_error.status = "El estado del paquete es obligatorio"
                return
            }
            const sendData = {
                key_trade: valueAgreements,
                items: this.elementos,
                name: this.diagnostic.namepackage,
                idPackage: this.diagnostic.idPackage,
                status: this.diagnostic.status,
                amount_manual: this.totalElementos
            }
            this.spiner = true
            if(this.diagnostic.idPackage != ''){
                const response = await this.updatePackage(sendData)
                if(response){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El paquete se actualizo con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.spiner = false
                await this.searchPackage(valueAgreements)
                this.diagnostic.namepackage = '',
                this.searchType = '',
                this.elementos = '',
                this.msg_error.namepackage = '',
                this.msg_error.elementos = '',
                this.msg_error.status = ''
                this.diagnostic.amount_manual = ''
            }
            if (response === false) {
                this.spiner = false
                Swal.fire({
                icon: 'error',
                title: 'Lo siento, el paquete no pudo ser actualizo',
                text: 'Intentalo de nuevo',
                })
            }
            }else{
               const response = await this.addPackage(sendData)
               if(response){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El paquete se agrego con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.spiner = false
                await this.searchPackage(valueAgreements)
                this.diagnostic.namepackage = '',
                this.searchType = '',
                this.elementos = ''
                this.diagnostic.amount_manual = ''
                this.msg_error.namepackage = '',
                this.msg_error.elementos = '',
                this.msg_error.status = ''
            }
            if (response === false) {
                this.spiner = false
                Swal.fire({
                icon: 'error',
                title: 'Lo siento, el paquete no pudo ser agregado',
                text: 'Intentalo de nuevo',
                })
            }
            }

        },
        async searchCode() {
            if (this.diagnostic.code_diagnostic.length > 2 && this.diagnostic.code_diagnostic != '') {
                this.searchValue = this.diagnostic.code_diagnostic
                if (this.searchType === 'PROC') {
                    await this.searchCups(this.searchValue)
                    this.getResult = this.getCups
                }
                if (this.searchType === 'MED') {
                    await this.searchMedicine(this.searchValue)
                    this.getResult = this.getmedicine
                }
                if (this.searchType === '') {
                    Swal.fire('Lo siento, selecciona que tipo de servicios deseas buscar')
                }
            } else {
                await this.cleadCups()
                this.getResult = ''
            }
        },
        async searchCieDescription() {
            if (this.diagnostic.value_diagnostic.length > 4) {
                this.searchValue = this.diagnostic.value_diagnostic
                await this.searchCups(this.diagnostic.value_diagnostic)
            }
        },
        selecClickcode(id, code, description, price) {
            this.diagnostic.id_diagnostic = id
            this.diagnostic.code = code
            this.diagnostic.code_diagnostic = code + description
            this.diagnostic.price = price
            this.descriptionItems = description
            this.cleadCups()
            this.getResult = ''
        },
        addTotal(qty) {
            var totalItems = this.diagnostic.price * qty
            this.nuevoElemento.total = totalItems
            //console.log("🚀 ~ addTotal ~ this.nuevoElemento.total:", this.nuevoElemento.total)
        },
        async deletePackage(id){ 
            const valueAgreements = this.valueAgreements;
            const query = {
                keyId: id,
                keyHistory: valueAgreements
            }
             Swal.fire({
                title: '¿Está seguro que deseas eliminar el paquete?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const response = this.destroyPackage(query)
                    Swal.fire(
                        '¡Eliminado!',
                        'El paquete ha sido eliminado.',
                        'success'
                    )
                    if (response) {
                        this.searchPackage(valueAgreements)
                    }
                }
            })
        },
        selectEdit(data){
            //console.log("🚀 ~ file: formpackage.vue:349 ~ selectEdit ~ data:", data)
            this.diagnostic.namepackage = data.name_package
            this.diagnostic.status = data.status
            this.diagnostic.amount_manual = data.amount_manual
            this.elementos = data.children.map(item => {
                return {
                    ...item,
                    name:item.name_item
                }
            })
            this.diagnostic.idPackage = data.id
            
        }

    },
    computed: {
        ...mapGetters('Agreements', ['gethistory', 'getDiagnostic', 'getCie10', 'getPackageData']),
        ...mapGetters('History', ['getmedicine']),
        ...mapGetters('Cups', ['getCups']),
        totalElementos() {
            // Calcula la suma de los totales de los elementos en 'elementos'
            return this.elementos.reduce((total, elemento) => total + parseFloat(elemento.total || 0), 0);
        }
    }
};
</script>
<style>
ul.autocompletepackage {
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 40%;
    z-index: 101;
    background-color: white;
}

ul.autocompletepackage>li {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}

ul.autocompletepackage>li:hover {
    background: #d2d2d24d;
}

ul.autocompletedescription {
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 50%;
    z-index: 101;
    background-color: white;
}

ul.autocompletedescription>li {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}

ul.autocompletedescription>li:hover {
    background: #d2d2d24d;
}
</style>
