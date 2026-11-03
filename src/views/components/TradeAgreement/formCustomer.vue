<template>
    <div>
        <div class="mb-4">
            <h6 class="text-secondary mb-3">DATOS DEL CLIENTE</h6>
            <div class="row g-3">
                <div class="col-md-4">
                    <BaseInput id="name_agreements" label="EPS O ENTIDAD ADMINISTRADORA (PARA GENERAR RIPS):" v-model="form.name_agreements" />
                </div>
                <div class="col-md-3">
                    <BaseSelect id="type_ID_client" label="TIPO:" v-model="form.type_ID_client" :options="listTypeDocuments" />
                </div>
                <div class="col-md-5">
                    <BaseInput id="number_ID_client" label="NÚMERO DE IDENTIFICACIÓN"
                        v-model="form.number_ID_client" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="surname_client" label="PRIMER APELLIDO:"
                        v-model="form.surname_client" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="second_surname_client" label="SEGUNDO APELLIDO:"
                        v-model="form.second_surname_client" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="name_client" label="PRIMER NOMBRE:" v-model="form.name_client" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="second_name_client" label="OTROS NOMBRES:" v-model="form.second_name_client" />
                </div>
                <div class="col-md-4">
                    <BaseSelect id="department_client" label="DEPARTAMENTO:" v-model="form.department_client" :options="listDepartaments" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="city_client:" label="CIUDAD:" v-model="form.city_client" />
                </div>
                <div class="col-md-4">
                    <BaseSelect id="zone_client" label="ZONA:" v-model="form.zone_client" :options="[
                        { value: 'urbana', text: 'Urbana' },
                        { value: 'rural', text: 'Rural' }
                    ]" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="precinct_client" label="BARRIO:" v-model="form.precinct_client" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="direction_client" label="DIRECCIÓN:" v-model="form.direction_client" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="email_client_client" label="CORREO ELECTRÓNICO:" type="email"
                        v-model="form.email_client_client" />
                </div>
                <div class="col-md-6">
                    <BaseInput id="mobile_client" label="CELULAR:" type="tel" v-model="form.mobile_client" />
                </div>
                <div class="col-md-6">
                    <BaseInput id="phone_client" label="TELÉFONO:" type="tel" v-model="form.phone_client" />
                </div>
            </div>
        </div>
        <hr>
        <div>
            <h6 class="text-secondary mb-3">DATOS DEL VENDEDOR</h6>
            <div class="row g-3">
                <div class="col-md-3">
                    <BaseInput id="surname_seller" label="PRIMER APELLIDO:"
                        v-model="form.surname_seller" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="second_surname_seller" label="SEGUNDO APELLIDO:"
                        v-model="form.second_surname_seller" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="name_seller" label="PRIMER NOMBRE:" v-model="form.name_seller" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="second_name_seller" label="OTROS NOMBRES:" v-model="form.second_name_seller" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="number_ID_seller" label="CÉDULA:" v-model="form.number_ID_seller" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="email_seller" label="CORREO ELECTRÓNICO:" type="email"
                        v-model="form.email_seller" />
                </div>
                <div class="col-md-4">
                    <BaseInput id="phone_seller" label="TELÉFONO:" type="tel" v-model="form.phone_seller" />
                </div>
            </div>
        </div>
        <hr>
        <div class="">
            <h6 class="text-secondary mb-3">DATOS PARA FACTURACIÓN ELECTRÓNICA</h6>
            <div class="row g-3">
                <!-- Campos de tamaño col-md-4 -->
                <div class="col-md-4">
                    <BaseInput
                        id="email_billing"
                        label="CORREO ELECTRÓNICO:"
                        type="email"
                        v-model="form.email_billing"
                    />
                </div>
                <div class="col-md-4">
                    <BaseInput
                        id="tuition_billing"
                        label="MATRÍCULA MERCANTIL:"
                        v-model="form.tuition_billing"
                    />
                </div>
                <div class="col-md-4">
                    <BaseSelect
                        id="taxpayer_billing"
                        label="TIPO DE CONTRIBUYENTE:"
                        v-model="form.taxpayer_billing"
                        :options="[
                            { value: 'personaNatural', text: 'Persona Natural' },
                            { value: 'personaJuridica', text: 'Persona Jurídica' }
                        ]"
                    />
                </div>

                <!-- Campos de tamaño col-md-6 -->
                <div class="col-md-6">
                    <BaseInput
                        id="tax_details"
                        label="DETALLES TRIBUTARIOS:"
                        v-model="form.tax_details"
                    />
                </div>
                <div class="col-md-6">
                    <BaseInput
                        id="tax_customer_exchange"
                        label="INFORMACIÓN TRIBUTARIA, ADUANERA Y CAMBIARIA:"
                        v-model="form.tax_customer_exchange"
                    />
                </div>
            </div>
        </div>
        <button class="btn btn-primary mt-4" @click="handleSaveAgreements">
            Guardar Acuerdo
        </button>
    </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert"; // Ajusta la ruta si es necesario

export default {
    data() {
        return {
            form: {
                name_agreements: "",
                type_ID_client: "",
                number_ID_client: "",
                surname_client: "",
                second_surname_client: "",
                name_client: "",
                second_name_client: "",
                department_client: "",
                city_client: "",
                precinct_client: "",
                direction_client: "",
                email_client_client: "",
                mobile_client: "",
                phone_client: "",
                zone_client: "",
                surname_seller: "",
                second_surname_seller: "",
                name_seller: "",
                second_name_seller: "",
                number_ID_seller: "",
                email_seller: "",
                phone_seller: "",
                state: 1,
                email_billing: "",
                tuition_billing: "",
                taxpayer_billing: "",
                tax_details: "",
                tax_customer_exchange: "",
                id_transfer: null,
            },
            lastAgreementResponse: null,
            lastAgreementSent: null,
            searchagreements: this.$route.params.id,
        };
    },
    mounted() {
        this.getTypeDocuments();
        this.getDepartaments();
        if (this.searchagreements) {
            this.getAgreementsDetails(this.searchagreements).then(() => {
                // Asigna una copia para evitar referencias reactivas no deseadas
                this.form = { ...this.listAgreementsDetails };
            });
        }
    },
    components: {
        BaseInput,
        BaseSelect,
    },
    computed: {
        ...mapGetters('ContentConsultations', ['listTypeDocuments','listDepartaments']),
        ...mapGetters('TradeAgreement', ['listAgreementsDetails']),
    },
    methods: {
        ...mapActions('ContentConsultations', ['getTypeDocuments','getDepartaments']),
        ...mapActions('TradeAgreement', ['SaveAgreements','getAgreementsDetails']),
        async handleSaveAgreements() {
            try {
                if (!this.form.name_agreements || !this.form.number_ID_client) {
                    AlertUtils.error("Por favor complete los campos obligatorios.");
                    return;
                }
                if(this.searchagreements){
                    this.form.id_transfer = this.searchagreements
                }
                // Llama a la acción de Vuex y espera la respuesta
                const response = await this.SaveAgreements(this.form);

                // Muestra la respuesta y los datos enviados en la vista
                if (response.status && !response.errors) {
                    AlertUtils.success(response.message || "Acuerdo guardado exitosamente.");
                    // Aquí puedes mostrar los datos en la vista como desees
                    console.log("Respuesta del servidor:", response);
                    this.$router.push('/tradeAgreement/edit/'+response.agreements.id_transfer)
                    // Puedes guardar la respuesta en una variable del componente si quieres mostrarla en el template
                    this.searchagreements = response.agreements.id_transfer
                    this.getAgreementsDetails(this.searchagreements);
                } else {
                    AlertUtils.error(response?.message || "Error al guardar el acuerdo.");
                }
            } catch (error) {
                AlertUtils.error("Error al guardar el acuerdo.");
                console.error(error);
            }
        },
    },
};
</script>