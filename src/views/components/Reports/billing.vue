<template>
    <div>
        <div class="container-fluid py-7">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col"><input type="text" class="form-control form-control-sm" placeholder="Identificación" aria-label="Identificación" v-model="key_document"></div>
                        <div class="col"><input type="text" class="form-control form-control-sm" placeholder="Historia Clinica" aria-label="Historia Clinica" v-model="key_history"></div>
                        <div class="col"><input type="text" class="form-control form-control-sm" placeholder="Factura" aria-label="Factura" v-model="key_billing"></div>
    
                        <div class="col"><input type="text" class="form-control form-control-sm" placeholder="Paciente"
                                aria-label="Paciente" v-model="key_patient"></div>
                        <div class="col">
                            <select name="" id="" class="form-select form-select-sm" v-model="key_status">
                                <option :value="option.id" v-for="option in getState" :key="option.id">{{ option.description }}</option>
                            </select>
                        </div>
                        <div class="col"><input type="date" class="form-control form-control-sm" placeholder="Fecha de ingreso"
                                aria-label="Fecha de ingreso" v-model="key_date"></div>
                        <div class="col"><input type="date" class="form-control form-control-sm" placeholder="Fecha de ingreso"
                                aria-label="Fecha de ingreso" v-model="end_date"></div>
                        <div class="col text-center">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-primary btn-sm" @click="searchData()"><i class="fa fa-search"
                                        aria-hidden="true" ></i></button>
                                <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-print"
                                        aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-5">
                        <div class="table-responsive">
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Identificación</th>
                                        <th scope="col">Historia Clinica</th>
                                        <th scope="col">Factura</th>
                                        <th scope="col">Estado de la factura</th>
                                        <th scope="col">Paciente</th>
                                        <th scope="col">Estado de la historia</th>
                                        <th scope="col">Fecha de Ingreso</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="items.id" v-for="items in getserviceOrder">
                                        <td>{{ items.id }}</td>
                                        <td>{{ items.document }}</td>
                                        <td>{{ items.num_order }}</td>
                                        <td v-if="items.get_billing">{{ items.get_billing.id_invoice }}</td>
                                        <td v-else>0000</td>
                                        <td v-if="items.get_billing">
                                            <span class="badge badge-sm bg-gradient-secondary" v-if="items.get_billing.status_invoice == 1">Pendiente</span>
                                            <span class="badge badge-sm bg-gradient-primary" v-if="items.get_billing.status_invoice == 2">Activo</span>
                                            <span class="badge badge-sm bg-gradient-warning" v-if="items.get_billing.status_invoice == 3">En Procesando</span>
                                            <span class="badge badge-sm bg-gradient-success" v-if="items.get_billing.status_invoice == 'INVOICED'">Facturada</span>
                                            <span class="badge badge-sm bg-gradient-danger" v-if="items.get_billing.status_invoice == 5">Cancelado</span>
                                        </td>
                                        <td v-else><span class="badge badge-sm bg-gradient-secondary">Pendiente</span></td>
                                        <td>{{ items.firstname + ' ' + items.first_surname  }}</td>
                                        <td>
                                            <span class="badge badge-sm bg-gradient-secondary" v-if="items.key_status == 1">Pendiente</span>
                                            <span class="badge badge-sm bg-gradient-primary" v-if="items.key_status == 2">Activo</span>
                                            <span class="badge badge-sm bg-gradient-warning" v-if="items.key_status == 3">En Procesando</span>
                                            <span class="badge badge-sm bg-gradient-success" v-if="items.key_status == 4">Finalizada</span>
                                            <span class="badge badge-sm bg-gradient-danger" v-if="items.key_status == 5">Cancelado</span>
                                        </td>
                                        <td>{{ moment(items.startdate).format('DD/MM/YYYY') }}</td>
                                        <td>
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" class="btn btn-primary btn-sm" @click="dateils(items.key_patient,items.id)"><i class="fa fa-search"
                                                        aria-hidden="true"></i></button>
                                                <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-print"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            key_document:'',
            key_history:'',
            key_billing:'',
            key_patient:'',
            key_status:'',
            key_date:'',
            end_date:'',
        }
    },
    computed: {
        ...mapGetters('State',['getState']),
        ...mapGetters('BillingStore',['getserviceOrder']),
    },
    methods: {
        ...mapActions('State',['getStateType']),
        ...mapActions('BillingStore',["search","cleadSearch"]),
        async getStateList(){
            await this.getStateType()
        },
        moment,
        dateils(key_patient,id){
            this.cleadSearch()
            this.$router.push('/details/billing'+'/'+key_patient+'/'+id)
        },
        async searchData(){
            const searchDataFilter = {
                key_document:this.key_document,
                key_history:this.key_history,
                key_billing:this.key_billing,
                key_patient:this.key_patient,
                key_status:this.key_status,
                key_date:this.key_date,
                end_date:this.end_date,
            }
            await this.search(searchDataFilter)            
        },
    },
    async mounted(){
        await this.getStateList()
        
    }
}

</script>