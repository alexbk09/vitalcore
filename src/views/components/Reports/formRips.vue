<template>
    <div class="container-fluid mt-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Generar RIPS</h5>
                <form @submit.prevent="consulterAgreements">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="periodoInicio" class="form-label">Periodo Inicio</label>
                            <input type="date" class="form-control" id="periodoInicio" v-model="periodoInicio">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="periodoFin" class="form-label">Periodo Fin</label>
                            <input type="date" class="form-control" id="periodoFin" v-model="periodoFin">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="factura" class="form-label">Factura No.</label>
                        <input type="text" class="form-control" id="factura" v-model="factura" placeholder="No.">
                    </div>
                    <div class="mb-3">
                        <label for="acuerdoComercial" class="form-label">Acuerdo Comercial</label>
                        <select id="acuerdoComercial" class="form-select" v-model="acuerdoComercial">
                            <option v-if="getagreements" :value="items.id_transfer" :key="items.id_transfer" v-for="items in getagreements">
                                {{ items.name_agreements }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="tipoCuenta" class="form-label">Tipo Cuenta</label>
                        <select class="form-select" id="tipoCuenta" v-model="tipoCuenta">
                            <option selected>Seleccione...</option>
                            <option value="1">Cuenta 1</option>
                            <option value="2">Cuenta 2</option>
                            <option value="3">Cuenta 3</option>
                        </select>
                    </div>
                    <div class="text-end"><button type="submit" class="btn btn-primary">Filtrar</button></div>
                </form>
            </div>

            <div class="card-body" v-if="loading">
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>

            <div class="card-body" v-if="!loading && noResults">
                <div class="alert alert-warning" role="alert">
                    No tenemos RIPS para generar en la consulta actual.
                </div>
            </div>

            <div class="card-body" v-if="!loading && !noResults && getGenerateAccount.length">
                <div class="alert alert-warning" role="alert">
                    Confirme las cuentas que serán generadas
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th><input type="checkbox" v-model="selectAll" @change="toggleSelectAll"> </th>
                                <th>Historia</th>
                                <th>Paciente</th>
                                <th>Factura</th>
                                <th>Acuerdo Comercial</th>
                                <th>Valor</th>
                                <th>Fecha Creación</th>
                                <th>Fecha De Vencimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in getGenerateAccount" :key="index">
                                <td><input type="checkbox" v-model="selectedItems" :value="item.id_invoice"></td>
                                <td>{{ item.key_history }}</td>
                                <td>{{ item.id_patient }} <br> <span>{{ item.history.patient.firstname + ' ' +
                                        item.history.patient.first_surname}}</span></td>
                                <td>{{ item.id_invoice }}</td>
                                <td>{{ item.history.get_trade_agreement.name_agreements }}</td>
                                <td>COP {{ formatAmount(item.amount) }}</td>
                                <td>{{ moment(item.created_at).format('DD/MM/YYYY') }}</td>
                                <td>{{ moment(item.filing).format('DD/MM/YYYY') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-center mt-3">
                    <button type="button" class="btn btn-primary" @click="saveSelectedItems">Generar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'
export default {
    name: 'formRips',
    data() {
        return {
            title: 'Generar RIPS',
            currentDate: moment().format("YYYY-MM-DD"),
            periodoInicio: '',
            periodoFin: '',
            factura: '',
            acuerdoComercial: '',
            tipoCuenta: '',
            selectAll: true,
            selectedItems: [],
            loading: false,
            noResults: false
        }
    },
    async mounted() {
        this.get()
    },
    methods: {
        ...mapActions('Agreements', ["get", "Search"]),
        ...mapActions('BillingStore', ["agreementsConsulter"]),
        FormGenerateRips() {
            this.$router.push('/rips/generate/')
        },
        formatAmount(amount) {
            return new Intl.NumberFormat('es-CO').format(amount);
        },
        async consulterAgreements() {
            this.loading = true;
            this.noResults = false;
            const data = {
                periodoInicio: this.periodoInicio,
                periodoFin: this.periodoFin,
                factura: this.factura,
                acuerdoComercial: this.acuerdoComercial,
                tipoCuenta: this.tipoCuenta
            };
            //console.log("🚀 ~ consulterAgreements ~ data:", data)
            await this.agreementsConsulter(data);
            this.loading = false;
            this.noResults = this.getGenerateAccount.length === 0;
        },
        toggleSelectAll() {
            this.selectedItems = this.selectAll ? this.getGenerateAccount.map(item => item.id_invoice) : [];
        },
        saveSelectedItems() {
            //console.log('Selected items:', this.selectedItems);
        },
        moment
    },
    computed: {
        ...mapGetters('Agreements', ['getagreements']),
        ...mapGetters('BillingStore', ['getGenerateAccount']),
    },
    watch: {
        getGenerateAccount: {
            handler(newVal) {
                this.selectedItems = newVal.map(item => item.id_invoice);
                setTimeout(() => {
                    this.selectAll = true;
                    this.toggleSelectAll();
                }, 3000);
            },
            immediate: true
        }
    }
}
</script>

<style scoped>
.alert-warning {
    background-color: #fff9c4;
    border-color: #fff3e0;
    color: #664d03;
}
.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>