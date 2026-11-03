<template>
    <div class="container mt-4">
        <div>
            <h5 class="mb-3 text-secondary">DATOS DE CONTACTO Y/O COMERCIALES</h5>
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <BaseInput id="nombreContacto" name="name" label="NOMBRE CONTACTO (PERSONA RESPONSABLE):"
                        v-model="dataContant.name" type="text" :error="errors.name" />
                </div>
                <div class="col-md-6 mb-2">
                    <BaseInput id="telefonoContacto" name="phone" label="TELÉFONO:" v-model="dataContant.phone"
                        type="number" :error="errors.phone" />
                </div>
                <div class="col-md-6 mb-2">
                    <BaseInput id="cargoContacto" name="charge" label="CARGO O INFORMACIÓN RELEVANTE:"
                        v-model="dataContant.charge" type="text" :error="errors.charge" />
                </div>
                <div class="col-md-6 mb-2">
                    <BaseInput id="correoContacto" name="email" label="CORREO ELECTRÓNICO:" v-model="dataContant.email"
                        type="email" :error="errors.email" />
                </div>
            </div>
            <div class="d-flex justify-content-end mb-3">
                <button class="btn btn-success btn-sm" @click="guardarContacto">AGREGAR CONTACTO</button>
            </div>

            <table class="table table-borderless table-hover text-center">
                <thead class="text-secondary small bg-info text-white">
                    <tr>
                        <th>NOMBRE CONTACTO</th>
                        <th>CARGO</th>
                        <th>TELÉFONO</th>
                        <th>CORREO</th>
                        <th>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contacto, index) in listContact" :key="index">
                        <td>{{ contacto.name }}</td>
                        <td>{{ contacto.charge }}</td>
                        <td>{{ contacto.phone }}</td>
                        <td>{{ contacto.email }}</td>
                        <td>
                            <span class="icon" @click="deleteContact(contacto)">
                                <img src="../../../assets/img/eliminar.png" alt="Eliminar" width="20"
                                    class="hover-effect mr-2" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert.ts";
export default {
    components: { BaseInput },
    data() {
        return {
            key_trade_agreement: this.listContractId.trade_agreement.id_transfer,
            contracted_id: this.$route.params.id,
            dataContant: {
                name: "",
                charge: "",
                phone: "",
                email: "",
            },
            errors: {
                name: false,
                charge: false,
                phone: false,
                email: false,
            },
        };
    },
    props: {
        listContractId: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters("TradeAgreement", ["listContact"]),
    },
    mounted() {
        this.getContactData(this.contracted_id);
    },
    methods: {
        ...mapActions("TradeAgreement", ["saveContact", "getContactData", "deleteContactData"]),
        async guardarContacto() {
            // Validación de campos obligatorios y seteo de errores
            this.errors = {
                name: !this.dataContant.name,
                charge: !this.dataContant.charge,
                phone: !this.dataContant.phone,
                email: !this.dataContant.email,
            };

            if (this.errors.name || this.errors.charge || this.errors.phone || this.errors.email) {
                AlertUtils.error("Todos los campos son obligatorios.");
                return;
            }

            const nuevoContacto = {
                key_trade_agreement: this.key_trade_agreement,
                contracted_id: this.contracted_id,
                name: this.dataContant.name,
                charge: this.dataContant.charge,
                phone: this.dataContant.phone,
                email: this.dataContant.email,
            };
            try {
                const response = await this.saveContact(nuevoContacto);
                AlertUtils.success("Contacto guardado exitosamente");
                this.getContactData(this.contracted_id);
                this.dataContant = {
                    name: "",
                    charge: "",
                    phone: "",
                    email: "",
                };
                this.errors = {
                    name: false,
                    charge: false,
                    phone: false,
                    email: false,
                };
            } catch (error) {
                AlertUtils.error("Error al guardar el contacto");
            }
        },
        deleteContact(data) {
            console.log("🚀 ~ deleteContact ~ data:", data)
            // Busca el registro a eliminar


            AlertUtils.confirm(
                "¿Eliminar CONTACTO Y/O COMERCIALES?",
                `¿Está seguro de que desea eliminar la CONTACTO Y/O COMERCIALES del contrato: "${data.name}"?`
            ).then(result => {
                if (result.isConfirmed) {
                    this.deleteContactData(data.id)
                        .then(() => {
                            AlertUtils.success("Georeferenciación eliminada correctamente.");
                            this.getContactData(this.contracted_id);
                        })
                        .catch(() => {
                            AlertUtils.error("Error al eliminar la georeferenciación.");
                        });
                }
            });
        },
    },
};
</script>

<style scoped>
.icon:hover {
    cursor: pointer;
    color: #007bff;
    transition: color 0.3s;
}
</style>