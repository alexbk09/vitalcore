<template>
    <div>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-body">
                    <form action="" v-on:submit.prevent="sendFormBilling()">


                        <div class="row">
                            <div class="col-12 col-md-12 col-xl-4">
                                <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Acuerdo Comercial</label>
                                <select class="form-select form-select-sm" name="key_trade_agreement" v-model="billing.key_trade_agreement">
                                    <option :value="items.id_transfer" :key="items.id_transfer" v-for="items in getagreements">{{
                                    items.name_agreements }}</option>
                                </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Numero de identificación</label>
                                    <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.id_patient">
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-4">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Nombre del paciente</label>
                                    <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.fullname">
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-1">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label"># Factura</label>
                                    <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.id_invoice">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Fecha de la factura</label>
                                    <input type="date" name="dateBilling" class="form-control form-control-sm" id=""
                                        v-model="billing.dateBilling">
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Fecha de vencimiento
                                        factura</label>
                                    <input type="date" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.billing">
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Fecha de ingreso</label>
                                    <input type="date" name="startdate" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.startdate">
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    
                                    <label for="exampleFormControlInput1" class="form-label">Fecha de egreso</label>
                                    <input type="date" name="enddate" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.enddate">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Valor copago</label>
                                    <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.copago" @input="calcularSuma">
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Cuota Moderadora</label>
                                    <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1"
                                        v-model="billing.quotamoderator" @input="calcularSuma">
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Valor total</label>
                                    <input type="number" name="totalAmount" class="form-control form-control-sm" 
                                        v-model="totalAmount" readonly>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-xl-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Diagnostico</label>
                                    <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" name="lote_t96"
                                        v-model="billing.lote_t96">
                                </div>
                            </div>
                            <div class="col-12">
                                <form action="">
                                    <div class="mb-3 table-responsive">
                                        <table class="table table-striped border text-center">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Codigo</th>
                                                    <th>Descripción</th>
                                                    <!-- <th>Cantidad</th>
                                                    <th>Frecuencia</th>
                                                    <th>Dias</th> -->
                                                    <th>Cantidad</th><!-- 
                                                    <th>Observación</th> -->
                                                    <th>Precio</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in getserviceOrderID.get_orders" :key="index">
                                                    <td><input type="checkbox" @change="calcularSuma()" :checked="item.invoiced" class="mt-3" name="checked" v-model="item.checked" ></td>
                                                    <td>{{ item.code }}</td>
                                                    <td>{{ item.description }}</td>
                                                    <td style="width: 200px;"><input type="number" class="form-control form-control-sm" name="quantity" v-model="item.quantity" @input="calcularSuma"></td>
                                                    <td style="width: 200px;"><input type="number" class="form-control form-control-sm" name="amount" v-model="item.amount" @input="calcularSuma"></td>
                                                    <td><input type="number" readonly rea class="form-control form-control-sm" name="" :value="multiplicaTotal(item.quantity, item.amount)"></td>
                                                    <td v-if="this.status != 'INVOICED'"><button type="button" class="btn btn-info p-2 btn-sm" @click="updateElement(item.id,item.amount,item.quantity)"><i class="fa fa-retweet" aria-hidden="true"></i></button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="row" v-if="this.status != 'INVOICED'">
                            <div class="col-12 text-end">
                                <button class="btn btn-primary">Facturar</button>
                            </div>
                        </div>
                    </form>
                    <section class="mt-5" v-if="this.status != 'INVOICED'">
                        <form action="">
                            <div class="row">
                                <div class="col-3 col-md-2 col-xl-2">
                                    <select id="" class="form-select form-select-sm" name="searchType" v-model="searchType">
                                        <option value="PROC">DIAGNOSTICOS</option>
                                        <option value="MED">MEDICAMENTO</option>
                                    </select>
                                </div>
                                <div class="col-5 col-md-5 col-xl-6">
                                    <input type="text" autocomplete="off" placeholder="COD CUPS CUMS "
                                        class="form-control form-control-sm" @input="searchCode" name="code_diagnostic"
                                        v-model="diagnostic.code_diagnostic" style="" />
                                    <ul class="autocompletepackage">
                                        <li :key="row.id" v-for="row in getResult"
                                            @click="selecClickcode(row.id, row.code, row.description, row.price)">
                                            <span class="text-busqueda"> {{ row.code + ' ' + row.description + ' ' +
                                                row.price }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control form-control-sm" placeholder="$"
                                        v-model="diagnostic.price">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control  form-control-sm" placeholder="#"
                                        @input="addTotal(nuevoElemento.catidad)" v-model="nuevoElemento.catidad">
                                </div>
                                <div class="col-1">
                                    <button type="button" class="btn btn-info btn-sm " @click="agregarElemento"><i
                                            class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="table-responsive p-0 mt-5" v-if="this.elementos.length > 0">
                                        <table class="table  text-center  mb-0">
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

                                                    <th
                                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    </th>
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
                                                        @click="deleteElement(index)"><i class="fa fa-trash"
                                                            aria-hidden="true"></i></button>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xl-12 text-end mt-5">
                                    <argon-button @click="sendFormPackage" type="button" color="success mt-4"
                                        :disabled="spiner === true" size="sm" class="ms-auto">
                                        <span v-if="spiner === false">Guardar Paquete</span>
                                        <div class="d-flex align-items-center" v-if="spiner === true">
                                            <strong class="me-2">Guardando...</strong>
                                            <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                                        </div>
                                    </argon-button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ArgonButton from "./../../../components/ArgonButton.vue";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'

export default {
    name: "billingDetails",
    data() {
        return {
            billing: {
                lote_t96: '',
                key_trade_agreement: '',
                status_invoice: '',
                amount: '',
                id_invoice: '',
                copago: '',
                quotamoderator: '', // Nuevo campo
                id_patient: '',
                date_admission: '',
                egressdate: '',
                invoice_date: '',
                due_date: '',
                enddate: '',
                startdate: '',
                billing: '',
                fullname: '',
                dateBilling: '',
            },
            elementos: [],
            nuevoElemento: {
                catidad: '',
                precio: '',
                codigo: '',
                total: ''
            },
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
                idPackage: '',
                status: '',
                amount_manual: ''
            },
            msg_error: {
                namepackage: '',
                elementos: '',
                status: '',
                amount_manual: ''
            },
            checked: false,
            status: '',
            totalPrice: 0,
            totalAmount: 0,
            spiner: false,
            searchserviceOrder: this.$route.params.id,
            searchKeyPatient: this.$route.params.key_patient,
        }
    },
    async mounted() {
        await this.getStoreserviceOrder();
        await this.getagreement();
        await this.calcularSuma();
        if (this.getserviceOrderID) {
            this.billing = this.getserviceOrderID;
            
            this.billing.enddate = this.getserviceOrderID.enddate ? moment(this.getserviceOrderID.enddate).format('YYYY-MM-DD') : '';
            
            
            
            if (this.getserviceOrderID.get_billing == null) {
                this.billing.dateBilling = '';
            } else {
                this.billing.dateBilling = this.getserviceOrderID.get_billing.filing ? moment(this.getserviceOrderID.get_billing.filing).format('YYYY-MM-DD') : '';
                this.billing.startdate = this.getserviceOrderID.get_billing.created_at ? moment(this.getserviceOrderID.get_billing.created_at).format('YYYY-MM-DD') : '';
                this.billing.billing = this.getserviceOrderID.get_billing.filing ? moment(this.getserviceOrderID.get_billing.filing).format('YYYY-MM-DD') : '';
                this.billing.quotamoderator = this.getserviceOrderID.get_billing.quota_moderator ? this.getserviceOrderID.get_billing.quota_moderator : '';
            this.billing.copago = this.getserviceOrderID.get_billing.copago ? this.getserviceOrderID.get_billing.copago : '';

            this.totalAmount = this.getserviceOrderID.get_billing.amount ? this.getserviceOrderID.get_billing.amount : '';
            }

            if (this.getserviceOrderID.patient) {
                this.billing.id_patient = this.getserviceOrderID.patient.document || '';
                this.billing.fullname = `${this.getserviceOrderID.patient.firstname || ''} ${this.getserviceOrderID.patient.middlename || ''} ${this.getserviceOrderID.patient.first_surname || ''} ${this.getserviceOrderID.patient.second_surname || ''}`;
            }

            this.billing.lote_t96 = this.getserviceOrderID.get_diagnostic ? this.getserviceOrderID.get_diagnostic.description : '';
            this.billing.id_invoice = this.getserviceOrderID.get_billing ? this.getserviceOrderID.get_billing.id_invoice : '';
            this.status = this.getserviceOrderID.get_billing ? this.getserviceOrderID.get_billing.status_invoice : '';
        }

        // Llamar a calcularSuma para asegurar que el total se calcule correctamente al cargar la vista
        
    },
    methods: {
        ...mapActions('BillingStore', ["SearchOrder", "addBilling", "updateOrders"]),
        ...mapActions('Cups', ["searchCups", "cleadCups"]),
        ...mapActions('Agreements', ["getagreement"]),
        ...mapActions('History', ["searchDiagnostic", "searchCie10", "cleadCie10", "destroyCie10", "searchMedicine", "cleadMedicine"]),
        async getStoreserviceOrder() {
            if (this.searchserviceOrder != undefined) {
                const searchOrder = {
                    keyHistory: this.searchserviceOrder,
                    keyPatient: this.searchKeyPatient
                }
                await this.SearchOrder(searchOrder)
            }
        },
        agregarElemento() {
            let struct = {
                key_code: this.diagnostic.code,
                qty: this.nuevoElemento.catidad,
                price: this.diagnostic.price,
                total: this.nuevoElemento.total,
                name: this.descriptionItems
            };
            this.elementos.push(struct); // Agrega el nuevo elemento al arreglo
            this.nuevoElemento.catidad = '';
            this.nuevoElemento.precio = '';
            this.diagnostic.code_diagnostic = '';
            this.nuevoElemento.total = '';
            this.diagnostic.value_diagnostic = '';
            this.diagnostic.price = '';
            this.diagnostic.code = '';
        },
        getPositions() {
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
        multiplicaTotal(quantity, amount) {
            return quantity * amount;
        },
        calcularSuma() {
            if (this.getserviceOrderID && this.getserviceOrderID.get_orders) {
                this.totalAmount = this.getserviceOrderID.get_orders
                    .filter((item) => item.checked)
                    .reduce((total, item) => total + (parseFloat(item.amount) * item.quantity), 0);
            } else {
                this.totalAmount = 0;
            }
            // Sumar el valor del copago y la cuota moderadora al totalAmount
            this.totalAmount += parseFloat(this.billing.copago) || 0;
            this.totalAmount += parseFloat(this.billing.quotamoderator) || 0;
            return this.totalAmount;
        },
        async sendFormBilling() {
            if (this.getserviceOrderID && this.getserviceOrderID.get_orders) {
                const items = this.getserviceOrderID.get_orders
                    .filter((item) => item.checked)
                    .map((item) => item.id);
                const query = {
                    key_trade_agreement: this.billing.key_trade_agreement,
                    status_invoice: 1,
                    amount: this.totalAmount,
                    copago: this.billing.copago,
                    quotaModerator: this.billing.quotamoderator,
                    filing: moment(this.billing.dateBilling).format('YYYY-MM-DD'),
                    id_patient: this.billing.id_patient,
                    key_history: this.getserviceOrderID.id,
                    jsonIdItems: JSON.stringify(items),
                };
                const response = await this.addBilling(query);
                if (response.status) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Factura agregada con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lo siento, los datos no se pudieron agregar',
                        text: response.message || 'Inténtalo de nuevo',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No hay órdenes de servicio disponibles para facturar.',
                });
            }
        },
        async searchCode() {
            if (this.diagnostic.code_diagnostic.length > 2 && this.diagnostic.code_diagnostic != '') {
                this.searchValue = this.diagnostic.code_diagnostic;
                if (this.searchType === 'PROC') {
                    await this.searchCups(this.searchValue);
                    this.getResult = this.getCups;
                }
                if (this.searchType === 'MED') {
                    await this.searchMedicine(this.searchValue);
                    this.getResult = this.getmedicine;
                }
                if (this.searchType === '') {
                    Swal.fire('Lo siento, selecciona qué tipo de servicios deseas buscar');
                }
            } else {
                await this.cleadCups();
                this.getResult = '';
            }
        },
        async searchCieDescription() {
            if (this.diagnostic.value_diagnostic.length > 4) {
                this.searchValue = this.diagnostic.value_diagnostic
                await this.searchCups(this.diagnostic.value_diagnostic)
            }
        },
        selecClickcode(id, code, description, price) {
            this.diagnostic.id_diagnostic = id;
            this.diagnostic.code = code;
            this.diagnostic.code_diagnostic = `${code} ${description}`;
            this.diagnostic.price = price;
            this.descriptionItems = description;
            this.cleadCups();
            this.getResult = '';
        },
        addTotal(qty) {
            var totalItems = this.diagnostic.price * qty;
            this.nuevoElemento.total = totalItems;
        },
        async deletePackage(id) {
            const query = {
                keyId: id,
                keyHistory: this.searchagreements
            };
            Swal.fire({
                title: '¿Está seguro que deseas eliminar el paquete?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await this.destroyPackage(query);
                    if (response) {
                        Swal.fire(
                            '¡Eliminado!',
                            'El paquete ha sido eliminado.',
                            'success'
                        );
                        await this.searchPackage(this.searchagreements);
                    }
                }
            });
        },
        async updateElement(id, amount, quantity) {
            const query = {
                id: id,
                amount: amount,
                quantity: quantity
            };
            await this.updateOrders(query);
            await this.getStoreserviceOrder();
        },
        selectEdit(data) {
            this.diagnostic.namepackage = data.name_package || '';
            this.diagnostic.status = data.status || '';
            this.diagnostic.amount_manual = data.amount_manual || '';
            this.elementos = data.children ? data.children.map(item => {
                return {
                    ...item,
                    name: item.name_item || ''
                };
            }) : [];
            this.diagnostic.idPackage = data.id || '';
        },
        selectEdit(data) {
            this.diagnostic.namepackage = data.name_package
            this.diagnostic.status = data.status
            this.diagnostic.amount_manual = data.amount_manual
            this.elementos = data.children.map(item => {
                return {
                    ...item,
                    name: item.name_item
                }
            })
            this.diagnostic.idPackage = data.id

        }
    },
    computed: {
        ...mapGetters('Agreements', ['gethistory', 'getDiagnostic', 'getCie10', 'getagreements']),
        ...mapGetters('BillingStore', ['getserviceOrderID']),
        ...mapGetters('History', ['getmedicine']),
        ...mapGetters('Cups', ['getCups']),
    },
    components: {
        ArgonButton
    }
}
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