<template>
    <div class="container mt-4">
        <div class="">
            <h5 class="mb-3 text-secondary">PAQUETES POR CARGO</h5>
            <div class="row mb-3 align-items-center">
                <div class="col-md-3">
                    <button class="btn btn-primary" @click="alert()" type="button">
                        CARGA MASIVA
                    </button>
                </div>
                <div class="col-md-3 offset-md-1">
                    <button class="btn btn-outline-secondary w-100">ACTUALIZAR</button>
                </div>
            </div>
            <div class="row mb-3">
                <!-- Campos en col-md-4 -->
                <div class="col-md-3">
                    <BaseInput id="codigoPaquete" label="CÓDIGO:" placeholder="Ingrese el código del paquete" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="nombrePaquete" label="NOMBRE DEL PAQUETE:" v-model="nombrePaquete" placeholder="Ingrese el nombre del paquete" />
                </div>
                <div class="col-md-3">
                    <BaseSelect id="" name="" label="ESTADO DEL PAQUETE:" v-model="estadoPaquete" :options="typeStatus" option-label="label" option-value="value" />
                </div>
                <div class="col-md-3">
                    <BaseInput id="valorPaquete" label="VALOR DEL PAQUETE:" v-model="valorPaquete" placeholder="Ingrese el valor del paquete" />
                </div>
            </div>

            <!-- Buscador y agregador de productos -->
            <div class="row mb-3">
                <div class="col">
                    <BaseSelect id="" name="TIPO DE SERVICIO:" label="TIPO DE SERVICIO:" v-model="typeSelect"  :options="typeService"
                        option-label="label" option-value="value" />
                </div>
                <div class="col-auto">
                    <div class="row">
                        <div class="col">
                            <!-- Código del producto -->
                            <BaseInput
                                id="codigoProducto"
                                label="CÓDIGO:"
                                placeholder="Ingrese el código del producto"
                                v-model="packages.key_code"
                                @input="buscarProducto"
                            />
                        </div>
                        <div class="col">
                            <!-- Nombre del producto -->
                            <BaseInput
                                id="nombreProducto"
                                label="NOMBRE PRODUCTO:"
                                placeholder="Ingrese el nombre del producto"
                                v-model="packages.name"
                                @input="buscarProducto"
                            />
                        </div>
                    </div>
                    <!-- Autocompletado -->
                    <ul v-if="productosBuscados.length" class="dropdown-buscador">
                        <li v-for="(producto, idx) in productosBuscados" :key="idx"
                            class="list-group-item list-group-item-action"
                            @click="seleccionarProducto(producto)"
                            style="cursor:pointer">
                            {{ producto.codigo || producto.code }} - {{ producto.nombre || producto.description }}
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <!-- Precio -->
                    <BaseInput
                        id="precioProducto"
                        label="PRECIO:"
                        placeholder="Ingrese el precio"
                        v-model="packages.price"
                        type="number"
                        @input="addTotal"
                    />
                </div>
                <div class="col">
                    <!-- Cantidad -->
                    <BaseInput
                        id="cantidadProducto"
                        label="CANTIDAD:"
                        placeholder="Ingrese la cantidad"
                        v-model="packages.qty"
                        type="number"
                        @input="addTotal"
                    />
                </div>
                <div class="col">
                    <!-- Total -->
                    <BaseInput
                        id="totalProducto"
                        label="TOTAL:"
                        placeholder="Ingrese el total"
                        v-model="packages.total"
                        readonly
                    />
                </div>
                <div class="col-12 text-end mt-3">
                    <button class="btn btn-primary" @click="agregarElemento">AGREGAR PRODUCTO</button>
                </div>
            </div>

            <!-- Tabla de productos agregados -->
            <div class="mt-3 mb-3">
                <table class="table table-borderless table-hover text-center">
                    <thead class="text-secondary small bg-primary text-white">
                        <tr>
                            <th>TIPO SERVICIO</th>
                            <th>CÓDIGO</th>
                            <th>PRODUCTO</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>TOTAL</th>
                            <th>OPCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in elementos" :key="idx">
                            <td>{{ item.typeSelect }}</td>
                            <td>{{ item.key_code }}</td>
                            <td>{{ item.name ? item.name.slice(0,30) : '' }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.total }}</td>
                            <td>
                                <span>
                                    <img src="../../../assets/img/eliminar.png" alt="Eliminar" width="20"
                                        class="hover-effect mr-2" @click="deleteElement(idx)" style="cursor:pointer;" />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-end mt-5 mb-3">
                    <button class="btn btn-primary" @click="guardarPaquete">AGREGAR PAQUETE</button>
                </div>
            </div>

            <!-- Tabla de paquetes (ejemplo estático, puedes reemplazar por datos reales) -->
            <table class="table table-borderless table-hover text-center">
                <thead class="text-secondary small bg-info text-white">
                    <tr>
                        <th>CÓDIGO</th>
                        <th>NOMBRE PAQUETE</th>
                        <th>ESTADO</th><!-- 
                        <th>SUB-TOTAL</th> -->
                        <th>TOTAL</th>
                        <th>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, idx) in listPackages" :key="idx">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td v-if="item.status == 1">ACTIVO</td>
                        <td v-else>INACTIVO</td><!-- 
                        <td>123456789</td> -->
                        <td>{{ item.amount_manual }}</td>
                        <td>
                            <span class="me-2" @click="editarPaquete(item)">
                                <img src="../../../assets/img/editar.png" alt="Editar" width="20"
                                    class="hover-effect mr-2" />
                            </span>
                            <!-- <span class="me-2" >
                                <img src="../../../assets/img/ver.png" alt="Ver" width="20" class="hover-effect mr-2" />
                            </span> -->
                            <span @click="deletePackage(item)">
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
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import { AlertUtils } from "../../../utils/alert.ts";

export default {
    props: {
        listContractId: {
        type: Object,
        required: true
        }
    },
    data() {
        return {
            packages: {
                key_code: "",
                name: "",
                price: "",
                qty: "",
                total: "",
                typeSelect: "",
                id: "",
            },
            searchType: "",
            searchCode: "",
            descriptionItems: "",
            productosBuscados: [],
            elementos: [],
            nuevoElemento: {
                key_code: "",
                name: "",
                qty: 0,
                price: 0,
                total: 0,
                typeSelect: "",
            },
            typeService: [
                { id: 1, name: "CUPS" },
                { id: 2, name: "Medicamentos" },
            ],
            typeStatus: [
                { id: 1, name: "Activo" },
                { id: 2, name: "Inactivo" },
            ],
            typeSelect: "",
            key_trade: "", // Asigna el valor correcto al cargar el componente
            nombrePaquete: "",
            estadoPaquete: "",
            valorPaquete: "",
            key_trade_agreement: this.listContractId.trade_agreement.id_transfer,
            contracted_id: this.$route.params.id,
            
        }
    },
    components: {
        BaseInput,
        BaseSelect
    },
    computed: {
        ...mapGetters("ContentConsultations", ["listConsulterProductOrCups","listMedicines"]),
        ...mapGetters("TradeAgreement", ["listPackages"]),
        valorTotalPaquete() {
            return this.elementos.reduce((total, item) => total + Number(item.total), 0);
        }
    },
    watch: {
        elementos: {
            handler() {
                this.valorPaquete = this.valorTotalPaquete;
            },
            deep: true
        }
    },
    mounted() {
        this.getPackagesData(this.contracted_id);
    },
    methods: {
        ...mapActions("ContentConsultations", ["getConsulterProductOrCups","getMedicines"]),
        ...mapActions("TradeAgreement", ["savePackages", "getPackagesData", "deletePackagesData"]),
        alert() {
            AlertUtils.info("Carga masiva de Paquetes por cargos para Contratados desarrollo.");
        },
        editarPaquete(paquete) {
            console.log("🚀 ~ editarPaquete ~ paquete:", paquete)
            this.nombrePaquete = paquete.name;
            this.estadoPaquete = paquete.status;
            this.valorPaquete = paquete.amount_manual;
            this.elementos = paquete.children || [];
            this.packages.id = paquete.id;
        },
        buscarProducto() {
            // Validar que se haya seleccionado un tipo de servicio
            if (!this.typeSelect) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Seleccione el tipo de servicio',
                    text: 'Debe seleccionar CUPS o Medicamentos antes de buscar.',
                });
                this.productosBuscados = [];
                return;
            }
            // Solo busca si hay algo en código o nombre
            if (!this.packages.key_code && !this.packages.name) {
                this.productosBuscados = [];
                return;
            }
            const query = this.packages.key_code || this.packages.name;
            if (this.typeSelect == 1) {
                this.getConsulterProductOrCups(query).then(() => {
                    this.productosBuscados = this.listConsulterProductOrCups || [];
                });
            } else {
                this.getMedicines(query).then(() => {
                    this.productosBuscados = this.listMedicines || [];
                });
            }
        },

        seleccionarProducto(producto) {
            this.packages.key_code = producto.code || "";
            this.packages.name = producto.description || "";
            this.addTotal();
            this.productosBuscados = [];
            this.packages.key_service = this.typeSelect.id;
            this.packages.typeSelect = this.typeSelect.name;
        },
        agregarElemento() {
            if (this.packages.key_code && this.packages.name && this.packages.qty && this.packages.price) {
                this.elementos.push({ ...this.packages });
                this.limpiarCampos();
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor, complete todos los campos antes de agregar el producto.',
                });
            }
        },
        limpiarCampos() {
            this.packages = {
                key_code: "",
                name: "",
                price: "",
                qty: "",
                total: ""
            };
        },
        deleteElement(index) {
            this.elementos.splice(index, 1);
        },
        addTotal() {
            const cantidad = Number(this.packages.qty) || 0;
            const precio = Number(this.packages.price) || 0;
            this.packages.total = cantidad * precio;
        },
        guardarPaquete() {
            // Validación antes de guardar
            if (!this.nombrePaquete || !this.estadoPaquete || !this.valorPaquete || this.elementos.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor, complete todos los campos obligatorios y agregue al menos un producto.',
                });
                return;
            }

            const paquete = {
                key_trade: this.key_trade_agreement,
                name: this.nombrePaquete,
                status: this.estadoPaquete,
                amount_manual: this.valorPaquete,
                items: JSON.stringify(this.elementos),
                contracted_id: this.contracted_id,
            };
            if (this.packages.id) {
                paquete.id = this.packages.id;
            }

            // Llama a la acción para guardar el paquete
            this.savePackages(paquete).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Paquete guardado',
                    text: 'El paquete se guardó correctamente.',
                });
                this.getProductData(this.formProducto.contracted_id);
                // Limpia el formulario si lo deseas
                this.limpiarCampos();
                this.elementos = [];
                this.nombrePaquete = "";
                this.estadoPaquete = "";
                this.valorPaquete = "";
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar el paquete.',
                });
            });
        },
        deletePackage(data) {
            console.log("🚀 ~ deletePackage ~ data:", data)
            AlertUtils.confirm(
            "¿Eliminar paquete?",
            `¿Está seguro de que desea eliminar el paquete "${data.name}" del contrato?`
            ).then(result => {
            if (result.isConfirmed) {
                const dataContent = {
                    id: data.id,
                }
                this.deletePackagesData(dataContent)
                .then((response) => {
                    if (response && response.status) {
                        AlertUtils.success("El paquete ha sido eliminado correctamente.");
                        this.getProductData(this.formProducto.contracted_id);
                    } else {
                        AlertUtils.error("Error al eliminar el paquete.");
                    }
                });
            }
            });
        },
    },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */

.icon:hover {
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s;
}
.dropdown-buscador {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 20;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
</style>