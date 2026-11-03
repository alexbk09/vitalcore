<template>
    <div class="container-fluid py-7 ">
        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-4 align-self-center text-center">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="BUSCAR CLIENTE"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                v-model="searchText"
                                @input="filterAgreements"
                            >
                        </div>
                    </div>
                    <div class="col-4 mt-0 pt-0">
                        Ordenar por
                        <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm mt-3"
                            @click="sortByContracts"
                        >
                            NÚMERO DE CONTRATOS
                        </button>
                    </div>
                    <div class="col-4 text-end">
                        <button class="btn btn-primary btn-sm" @click="goNavigateTo()">AGREGAR ACUERDO COMERCIAL <i class="fa fa-plus ms-2"
                                aria-hidden="true"></i></button>
                    </div>
                </div>

                <table class="table table-borderless table-hover text-center">
                    <thead class="text-secondary small">
                        <tr>
                            <th>#</th>
                            <th>CLIENTE</th>
                            <th>NÚMERO DE CONTRATOS</th>
                            <th>OPCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(agreement, index) in filteredAgreements" :key="index">
                            <td>{{ agreement.id_transfer }}</td>
                            <td>{{ agreement.name_agreements }}</td>
                            <td>{{ agreement.contracted ? agreement.contracted.length : 0 }}</td>
                            <td>
                                <span class="icons-actions me-2" @click="goNavigateToContract(agreement.id_transfer)">
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                </span>
                                <!-- <span class="icons-actions"><i class="fa fa-trash" aria-hidden="true"></i></span> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex/dist/vuex.cjs.js';
export default {
    data() {
        return {
            searchText: "",
            sortContractsDesc: false,
            filteredAgreements: [],
        };
    },
    mounted() {
        this.getAgreements().then(() => {
            this.filteredAgreements = this.listAgreements;
        });
    },
    methods: {
        ...mapActions('TradeAgreement', ['getAgreements']),
        goNavigateTo() {
            this.$router.push('/tradeAgreement/add');
        },
        goNavigateToContract(id) {
            this.$router.push('/tradeAgreement/contract/' + id);
        },
        filterAgreements() {
            const text = this.searchText.toLowerCase();
            this.filteredAgreements = this.listAgreements.filter(a =>
                a.name_agreements.toLowerCase().includes(text)
            );
        },
        sortByContracts() {
            this.sortContractsDesc = !this.sortContractsDesc;
            this.filteredAgreements.sort((a, b) => {
                const countA = a.contracted ? a.contracted.length : 0; // Asumiendo que 'contracted' es un array
                const countB = b.contracted ? b.contracted.length : 0;
                return this.sortContractsDesc ? countB - countA : countA - countB;
            });
            },
            getContractsCount(contracts) {
            return Array.isArray(contracts) ? contracts.length : 0;
            }
    },
    computed: {
        ...mapGetters('TradeAgreement', ['listAgreements']),
    },
    watch: {
        listAgreements(newVal) {
            this.filteredAgreements = newVal;
        }
    }
};
</script>

<style scoped>
.icons-actions{
    cursor: pointer;
}
</style>