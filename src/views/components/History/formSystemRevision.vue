<template>
    <div>
        <Loading v-if="this.isLoading" :valuetitle="title" />
        <div class="" v-else>
            <form action="" v-on:submit.prevent="sendFormsSystemRevision()">
                <div class="row px-4">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            NOMBRE DEL SISTEMA</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            HALLAZGO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >OSTEOARTICULAR</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="osteoarticular"
                                                v-model="systemRevision.osteoarticular"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span
                                                class="text-secondary text-xs font-weight-bold" >GASTROINTESTINAL</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="gastrointestinal"
                                                v-model="systemRevision.gastrointestinal"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >CARDIOVASCULAR</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="cardiovascular"
                                                v-model="systemRevision.cardiovascular"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >RESPIRATORIO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="respiratory"
                                                v-model="systemRevision.respiratory"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >MUSCULAR</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="muscular"
                                                v-model="systemRevision.muscular"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >URINARIO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="urinary"
                                                v-model="systemRevision.urinary"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >PIEL Y FANERAS</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="skin_fan"
                                                v-model="systemRevision.skin_fan"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >LINFÁTICO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="lymphatic"
                                                v-model="systemRevision.lymphatic"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >NEUROLÓGICO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="neurological"
                                                v-model="systemRevision.neurological"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >ENDOCRINO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="endocrine"
                                                v-model="systemRevision.endocrine"
                                            />
                                        </td>
                                    </tr>
                                    <tr class="align-middle p-0">
                                        <td class="align-middle "><span
                                                class="text-secondary text-xs font-weight-bold" >APARATO DIGESTIVO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="digestive_system"
                                                v-model="systemRevision.digestive_system"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >APARATO
                                                LOCOMOTOR</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="locomotor_system"
                                                v-model="systemRevision.locomotor_system"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >DERMATOLÓGICO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="dermatological"
                                                v-model="systemRevision.dermatological"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold" >GINOCOLÓGICO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="gynecological"
                                                v-model="systemRevision.gynecological"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span
                                                class="text-secondary text-xs font-weight-bold" >OTORRINOLARINGOLÓGICO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="otorhinolaryngological"
                                                v-model="systemRevision.otorhinolaryngological"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold text-uppercase">PSIQUIÁTRICO  y PSICOLÓGICO</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="psychiatric_psychological"
                                                v-model="systemRevision.psychiatric_psychological"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold text-uppercase">Odontológico</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="dental"
                                                v-model="systemRevision.dental"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle p-0">
                                            <span class="text-secondary text-xs font-weight-bold text-uppercase">Otros</span>
                                        </td>
                                        <td class="align-middle text-center p-0">
                                            <BaseInput
                                                :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                name="others"
                                                v-model="systemRevision.others"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="this.valueStatus.key_status === 3">
                    <div class="col-md-12 text-end">
                        <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm"
                            class="ms-auto">
                            <span v-if="spiner === false">Guardar</span>
                            <div class="d-flex align-items-center" v-if="spiner === true">
                                <strong class="me-2">Guardando Datos</strong>
                                <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                            </div>
                        </argon-button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Loading from '../Utils/Loading.vue';
import BaseInput from "../utilsComponents/BaseInput.vue";

export default {
    name: "formHistory",
    props: {
        valueStatus: Object
    },
    data() {
        return {
            userValidate: {},
            fecha: new Date().toLocaleDateString(),
            showMenu: false,
            systemRevision: {
                osteoarticular: '',
                gastrointestinal: '',
                cardiovascular: '',
                respiratory: '',
                muscular: '',
                urinary: '',
                skin_fan: '',
                lymphatic: '',
                neurological: '',
                vaccination_status: '',
                name_vaccination: '',
                dose: '',
                date_time_vaccination_doses: '',
                IDHistory: '',
                IDPatient: '',
                status: '',
                endocrine: '',
                others: '',
                digestive_system: '',
                locomotor_system: '',
                dermatological: '',
                gynecological: '',
                otorhinolaryngological: '',
                dental:'',
                psychiatric_psychological:''

            },
            msg_error: {

            },
            show: false,
            searchserviceOrder: this.valueStatus.id,
            searchKeyPatient: this.valueStatus.key_patient,
            spiner: false,
            keyHistory: '',
            keyPatient: '',
            KeyTypeCare: '',
            /* isLoading: true, */
            title: 'Revisión de sistema',
        };

    },
    watch: {
   /*  async getSystemRevision() {
      this.isLoading = true
      if (this.valueStatus.key_history) {
        this.systemRevision = this.getSystemRevision.content
        this.isLoading = false
      }
      
    } */
  },
    components: {
        ArgonButton,
        Loading,
        BaseInput
    },

    async mounted() {
        this.$store.state.isAbsolute = true;
        this.validateUser()
        if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
            //await this.loadingActive()
            if(this.valueStatus.revision_system){
                let struct = {
                    osteoarticular: this.valueStatus?.revision_system?.osteoarticular,
                    gastrointestinal: this.valueStatus?.revision_system?.gastrointestinal,
                    cardiovascular: this.valueStatus?.revision_system?.cardiovascular,
                    respiratory: this.valueStatus?.revision_system?.respiratory,
                    muscular: this.valueStatus?.revision_system?.muscular,
                    urinary: this.valueStatus?.revision_system?.urinary,
                    skin_fan: this.valueStatus?.revision_system?.skin_fan,
                    lymphatic: this.valueStatus?.revision_system?.lymphatic,
                    endocrine: this.valueStatus?.revision_system?.endocrine,
                    neurological: this.valueStatus?.revision_system?.neurological,
                    others: this.valueStatus?.revision_system?.others ? this.valueStatus?.revision_system?.others == "undefined" ? "NO REFIERE ALTERACIÓN" : this.valueStatus?.revision_system?.others : this.valueStatus?.revision_system?.others,
                    vaccination_status: this.valueStatus?.revision_system?.vaccination_status,
                    name_vaccination: this.valueStatus?.revision_system?.name_vaccination,
                    dose: this.valueStatus?.revision_system?.dose,
                    date_time_vaccination_doses: this.valueStatus?.revision_system?.date_time_vaccination_doses,
                    digestive_system: this.valueStatus?.revision_system?.digestive_system,
                    locomotor_system: this.valueStatus?.revision_system?.locomotor_system,
                    dermatological: this.valueStatus?.revision_system?.dermatological,
                    gynecological: this.valueStatus?.revision_system?.gynecological,
                    otorhinolaryngological: this.valueStatus?.revision_system?.otorhinolaryngological,
                    dental: this.valueStatus?.revision_system?.dental,
                    psychiatric_psychological: this.valueStatus?.revision_system?.psychiatric_psychological,
                    }
                    this.systemRevision = struct
            }else{
                let struct = {
                    osteoarticular: "NO REFIERE ALTERACIÓN",
                    gastrointestinal: "NO REFIERE ALTERACIÓN",
                    cardiovascular: "NO REFIERE ALTERACIÓN",
                    respiratory: "NO REFIERE ALTERACIÓN",
                    muscular: "NO REFIERE ALTERACIÓN",
                    urinary: "NO REFIERE ALTERACIÓN",
                    skin_fan: "NO REFIERE ALTERACIÓN",
                    lymphatic: "NO REFIERE ALTERACIÓN",
                    endocrine: "NO REFIERE ALTERACIÓN",
                    neurological: "NO REFIERE ALTERACIÓN",
                    vaccination_status: "",
                    name_vaccination: "",
                    dose: "",
                    date_time_vaccination_doses: "",
                    digestive_system: 'NO REFIERE ALTERACIÓN',
                    locomotor_system: 'NO REFIERE ALTERACIÓN',
                    dermatological: 'NO REFIERE ALTERACIÓN',
                    gynecological: 'NO REFIERE ALTERACIÓN',
                    otorhinolaryngological: 'NO REFIERE ALTERACIÓN',
                    dental: 'NO REFIERE ALTERACIÓN',
                    psychiatric_psychological: 'NO REFIERE ALTERACIÓN',
                }
                this.systemRevision = struct
            }
        }
    },
    methods: {
        ...mapActions('History', ["SearchOrder", "addSystemRevision", "searchSystemRevision", "updateSystemRevision"]),
        /* async getStoreserviceOrder() {
            if (this.searchserviceOrder != undefined) {
                const searchOrder = {
                    keyHistory: this.searchserviceOrder,
                    keyPatient: this.searchKeyPatient
                }
                await this.searchSystemRevision(searchOrder)
            }
        }, */
        /* async loadingActive() {
            this.isLoading = true
            await this.getStoreserviceOrder()
            this.isLoading = false
        }, */
        validateUser() {
            this.userValidate = JSON.parse(localStorage.getItem('user'))
        },
        async sendFormsSystemRevision() {
            this.systemRevision.IDHistory = this.searchserviceOrder;
            this.systemRevision.IDPatient = this.searchKeyPatient;
            this.spiner = true;

            try {
                let response;
                if (this.valueStatus.revision_system.id) {
                response = await this.updateSystemRevision(this.systemRevision);
                } else {
                response = await this.addSystemRevision(this.systemRevision);
                }
                if (response.status) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Datos agregado con exito',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.spiner = false;
                //this.getStoreserviceOrder();
                this.$emit('saved');
                } else {
                this.spiner = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message,
                });
                }
            } catch (error) {
                this.spiner = false;
                Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Ha ocurrido un error al enviar los datos.',
                });
            }
                
        },
    },
    computed: {
        ...mapGetters('History', ['gethistory', 'getSystemRevision']),
    }
};
</script>