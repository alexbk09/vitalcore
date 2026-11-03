<template>
    <div class="container-fluid py-7 mt-4">
        <div class="bg-white p-3 border rounded shadow-sm">
            <!-- Botón para ir hacia atrás -->
            <button class="btn btn-danger mb-3" @click="goBack">
                <i class="fa fa-arrow-left"></i> 
            </button>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <span class="me-2 text-secondary small">ORDENAR POR</span>
                    <button class="btn btn-sm btn-outline-secondary mt-2 py-1 me-1" @click="sortByStatus">ESTADO</button>
                    <button class="btn btn-sm btn-outline-secondary mt-2 py-1 me-1" @click="sortByCreatedAt">INGRESADO</button>
                    <button class="btn btn-sm btn-outline-secondary mt-2 py-1" @click="sortByContractNumber">NÚMERO</button>
                </div>
                <button class="btn btn-sm btn-primary" @click="goNavigateToAgreements()">
                    <i class="bi bi-plus"></i> AGREGAR NUEVO CONTRATO
                </button>
            </div>

            <h6 class="text-center text-secondary mb-3 ">{{ listAgreementsDetails.name_agreements }}</h6>

            <table class="table table-borderless table-hover text-center">
                <thead class="text-secondary small">
                    <tr>
                        <th>NÚMERO DEL CONTRATO</th>
                        <th>ESTADO</th>
                        <th>VIGENCIA DESDE</th>
                        <th>VIGENCIA HASTA</th>
                        <th>INGRESADO</th>
                        <th>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contract, index) in listContracted" :key="index">
                        <td>{{ contract.contract_number }}</td>
                        <td>
                            <span v-if="contract.is_active === true" class="badge bg-success">ACTIVO</span>
                            <span v-else class="badge bg-danger">INACTIVO</span>
                        </td>
                        <td>{{ contract.billing_from_day }}</td>
                        <td class="align-middle text-center text-sm">
                            <span class="text-secondary text-xs font-weight-bold">
                                {{ moment(contract.billing_to_day).format('DD/MM/YYYY') }}
                            </span>
                            <br>
                            <div
                                class="badge bg-danger text-white"
                                v-if="isExpired(contract.billing_to_day)"
                                role="alert"
                            >
                                Este contrato ha caducado
                            </div>
                        </td>
                        <td>{{ moment(contract.created_at).format('DD/MM/YYYY') }}</td>
                        <td>
                            <span class="me-2 icons-actions" @click="goNavigateTo(contract.id)">
                                <img src="../../../assets/img/ver.png" alt="Ver" width="20" class="hover-effect mr-2" />
                            </span>
                            <span class="me-2 icons-actions" @click="goNavigateToAgreements()">
                                <img src="../../../assets/img/editar.png" alt="Editar" width="20" class="hover-effect mr-2" />
                            </span>
                            <span class="me-2 icons-actions">
                                <img src="../../../assets/img/copiar.png" alt="Copiar" width="20" class="hover-effect mr-2" />
                            </span>
                            <span class="icons-actions" @click="deleteContrated(contract)">
                                <img src="../../../assets/img/eliminar.png" alt="Eliminar" width="20" class="hover-effect mr-2" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert";
import moment from "moment";
export default {
    data() {
        return {
            key_trade_agreement_id: this.$route.params.id,
        };
    },
    computed: {
        ...mapGetters("TradeAgreement", ["listAgreementsDetails","listContracted"]),
    },
    mounted() {
        this.getAgreementsDetails(this.key_trade_agreement_id);
        this.getContracted(this.key_trade_agreement_id);
        
    },
    methods: {
        moment,
        ...mapActions("TradeAgreement", ["getAgreementsDetails","getContracted","deleteContracted"]),
        goNavigateTo(id) {
            this.$router.push('/tradeAgreement/contract/config/'+id);
        },
        goNavigateToAgreements() {
            this.$router.push('/tradeAgreement/edit/'+this.key_trade_agreement_id)
        },
        isExpired(validity_until) {
            if (!validity_until) return false;
            const today = moment().startOf('day');
            const until = moment(validity_until, 'YYYY-MM-DD').endOf('day');
            return until.isBefore(today);
        },
        goBack() {
            this.$router.go(-1);
        },
        // funcion de eliminar contrato
        deleteContrated(data) {
            AlertUtils.confirm(
                "¿Eliminar producto?",
                `¿Está seguro de que desea eliminar el "${data.contract_number}"?`
            ).then(result => {
                if (result.isConfirmed) {
                this.deleteContracted(data.id)
                    .then(() => {
                    AlertUtils.success("El contrato se ha eliminado correctamente.");
                    this.getProductData(this.formProducto.contracted_id);
                    })
                    .catch(() => {
                    AlertUtils.error("Error al eliminar el contrato.");
                    });
                }
            });
            },
        // Ordenar por número de contrato
        sortByContractNumber() {
            this.$store.state.TradeAgreement.contract = [...this.listContracted].sort((a, b) => {
                if (a.contract_number < b.contract_number) return -1;
                if (a.contract_number > b.contract_number) return 1;
                return 0;
            });
        },
        // Ordenar por fecha de ingreso
        sortByCreatedAt() {
            this.$store.state.TradeAgreement.contract = [...this.listContracted].sort((a, b) => {
                return new Date(a.created_at) - new Date(b.created_at);
            });
        },
        // Ordenar por estado (activos primero)
        sortByStatus() {
            this.$store.state.TradeAgreement.contract = [...this.listContracted].sort((a, b) => {
                return (a.is_active === b.is_active) ? 0 : a.is_active ? -1 : 1;
            });
        }
    },
};
</script>

<style scoped>
.hover-effect {
    transition: transform 0.2s ease-in-out;
}

.hover-effect:hover {
    transform: scale(1.2);
}

.mr-2 {
    margin-right: 0.5rem;
}

.icons-actions{
    cursor: pointer;
}
</style>