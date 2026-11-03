<template>
    <div>
        <form action="" @submit.prevent="saveProduct">
            <div class="row p-2">
                <div class="col-6">
                    <div class="mb-3">
                        <label for="productCategory" class="form-label">Categoría</label>
                        <select v-model="productCategory" class="form-select" id="productCategory">
                            <option v-for="(row, index) in getCategory" :key="index" :value="row.id">{{
                                row.description }}</option>
                        </select>
                        <span v-if="errors.productCategory" class="text-danger">{{
                            errors.productCategory }}</span>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6 ">
                        <div class="mb-3">
                            <label for="codigo" class="form-label">Código</label>
                            <input type="text" v-model="productCode" class="form-control" id="productCode">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 ">
                        <div class="mb-3">
                            <label for="codigoBarras" class="form-label">Código de Barras</label>
                            <input type="text" v-model="productBarCode" class="form-control" id="productBarCode">
                        </div>
                    </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label for="productDescription" class="form-label">Descripción</label>
                        <input type="text" v-model="productDescription" class="form-control" id="productDescription">
                        <span v-if="errors.productDescription" class="text-danger">{{
                            errors.productDescription }}</span>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 ">
                    <div class="mb-3">
                        <label for="productUnits" class="form-label">Unidades</label>
                        <input type="number" v-model="productUnits" class="form-control" id="productUnits">
                        <span v-if="errors.productUnits" class="text-danger">{{ errors.productUnits
                            }}</span>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 ">
                    <div class="mb-3">
                        <label for="productTax" class="form-label">Impuesto</label>
                        <input type="number" v-model="productTax" class="form-control" id="productTax"
                            name="productTax">
                        <span v-if="errors.productTax" class="text-danger">{{ errors.productTax }}</span>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 ">
                    <div class="mb-3">
                        <label for="productStock" class="form-label">Stock</label>
                        <input type="number" v-model="productStock" class="form-control" id="productStock"
                            name="productStock">
                        <span v-if="errors.productStock" class="text-danger">{{ errors.productStock
                            }}</span>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 ">
                    <div class="mb-3">
                        <label for="productMinStock" class="form-label">Min Stock</label>
                        <input type="number" v-model="productMinStock" class="form-control" id="productMinStock"
                            name="productMinStock">
                        <span v-if="errors.productMinStock" class="text-danger">{{
                            errors.productMinStock
                        }}</span>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 ">
                    <div class="mb-3">
                        <label for="productReference" class="form-label">Referencia</label>
                        <input type="text" name="productReference" v-model="productReference" class="form-control"
                            id="productReference">
                        <span v-if="errors.productReference" class="text-danger">{{
                            errors.productReference
                        }}</span>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 ">
                    <div class="mb-3">
                        <label for="productStore" class="form-label">Bodega</label>
                        <select name="productStore" class="form-select" v-model="productStore" id="productStore">
                            <option :value="row.id" v-for="row in getStores" :key="index">{{ row.name }}</option>
                        </select>
                        <span v-if="errors.productStore" class="text-danger">{{ errors.productStore
                            }}</span>
                    </div>
                </div>

                <!-- Campos condicionales para Medicamentos -->
                <template v-if="productCategory === 3">
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="factorConversion" class="form-label">Factor de
                                Conversión</label>
                            <input type="number" v-model="productConversionFactor" class="form-control"
                                id="productConversionFactor">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="nombreDCI" class="form-label">Nombre DCI</label>
                            <input type="text" v-model="productDCIName" class="form-control" id="productDCIName">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="nombreComercial" class="form-label">Nombre Comercial</label>
                            <input type="text" v-model="productTradeName" class="form-control" id="productTradeName">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="cantidad" class="form-label">Cantidad</label>
                            <input type="number" v-model="productAmount" class="form-control" id="productAmount">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="precio" class="form-label">Precio</label>
                            <input type="number" v-model="productPrice" class="form-control" id="productPrice">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="lote" class="form-label">Lote</label>
                            <input type="text" v-model="productLote" class="form-control" id="productLote">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="fechaFabricacion" class="form-label">Fecha de Fabricación</label>
                            <input type="date" v-model="productManufacturingDate" class="form-control" id="productManufacturingDate">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="fechaVencimiento" class="form-label">Fecha de Vencimiento</label>
                            <input type="date" v-model="productExpirationDate" class="form-control" id="productExpirationDate">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productDescription_commercial" class="form-label">Descripción Comercial</label>
                            <input type="text" v-model="productDescription_commercial" class="form-control" id="productDescription_commercial">
                        </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productHealth_registration" class="form-label">Registro Sanitario</label>
                            <input type="text" v-model="productHealth_registration" class="form-control" id="productHealth_registration">
                        </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productHealth_registration_expiration" class="form-label">Vencimiento Registro Sanitario</label>
                            <input type="date" v-model="productHealth_registration_expiration" class="form-control" id="productHealth_registration_expiration">
                        </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productManufacturing_laboratory" class="form-label">Laboratorio de Fabricación</label>
                            <input type="text" v-model="productManufacturing_laboratory" class="form-control" id="productManufacturing_laboratory">
                        </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productCode_atc" class="form-label">Código ATC</label>
                            <input type="text" v-model="productCode_atc" class="form-control" id="productCode_atc">
                        </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productDescription_atc" class="form-label">Descripción ATC</label>
                            <input type="text" v-model="productDescription_atc" class="form-control" id="productDescription_atc">
                        </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productCode_cum" class="form-label">Código CUM</label>
                            <input type="text" v-model="productCode_cum" class="form-control" id="productCode_cum">
                        </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                        <div class="mb-3">
                            <label for="productCode_cups" class="form-label">Código CUPS</label>
                            <input type="text" v-model="productCode_cups" class="form-control" id="productCode_cups">
                        </div>
                        </div>
                    <div class="col-12 col-md-6 col-lg-4 pt-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="productLassa" id="productLassa" checked>
                            <label class="form-check-label" for="flexCheckChecked">
                                Marcacion Lasa
                            </label>
                            </div>

                    </div>
                </template>

                <!-- Campos condicionales para Dispositivos Médicos -->
                <template v-if="productCategory === 2">
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="cantidad" class="form-label">Cantidad</label>
                            <input type="number" v-model="productAmount" class="form-control" id="productAmount">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="precio" class="form-label">Precio</label>
                            <input type="number" v-model="productPrice" class="form-control" id="productPrice">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="lote" class="form-label">Lote</label>
                            <input type="text" v-model="productLote" class="form-control" id="productLote">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="fechaFabricacion" class="form-label">Fecha de
                                Fabricación</label>
                            <input type="date" v-model="productManufacturingDate" class="form-control"
                                id="productManufacturingDate">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="fechaVencimiento" class="form-label">Fecha de
                                Vencimiento</label>
                            <input type="date" v-model="productExpirationDate" class="form-control"
                                id="productExpirationDate">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 ">
                        <div class="mb-3">
                            <label for="riesgo" class="form-label">Riesgo</label>
                            <input type="text" v-model="productRisk" class="form-control" id="productRisk">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 pt-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="productLassa" id="productLassa" checked>
                            <label class="form-check-label" for="flexCheckChecked">
                                Marcacion Lasa
                            </label>
                            </div>

                    </div>
                </template>
                <div class="modal-footer">
                    <button type="button" @click="clearForm()" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </form>
        <!-- <pre>{{ productData }}</pre> -->
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { mapActions, mapGetters } from "vuex";

export default {
    name: "app-category",
    
    props: {
        dataProduct: {
            type: Object,
            default: () => ({}) // Un objeto vacío como valor predeterminado
        }
    },
    watch: {
        dataProduct: {
            deep: true,
            handler(newVal) {
                this.productData = { ...newVal }; // Clonar para evitar modificar la prop directamente
                this.consulterProduct(this.productData); // Actualizar los campos del formulario
            }
        }
    },
    data() {
        return {
            productData: { ...this.dataProduct },
            productDescription: '',
            productReference: '',
            productUnits: '',
            productCategory: '',
            productTax: '',
            productStock: '',
            productMinStock: '',
            productStore: '',
            productId: '',
            productCode :'',
            productAmount:'',
            productPrice :'',
            productManufacturingDate:'',
            productExpirationDate:'',
            productRisk:'',
            productLote:'',
            productBarCode:'',
            productConversionFactor:'',
            productDCIName:'',
            productTradeName:'',
            productBatch:'',
            productLassa: false,
            productUsefulLife: '', 
            productDescription_commercial: '',
            productHealth_registration: '',
            productHealth_registration_expiration: '',
            productManufacturing_laboratory: '',
            productCode_atc: '',
            productDescription_atc: '',
            productCode_cum: '',
            productCode_cups: '',
            errors: {
                productDescription: '',
                productReference: '',
                productUnits: '',
                productCategory: '',
                productAmount: '',
                productTax: '',
                productStock: '',
                productMinStock: '',
                productStore: '',
            },
            dataProduct: '',
            selectedFile: {},

        };
    },
    mounted() {
        this.category()
        /* this.product()*/
        this.storeGet() 
        if (this.dataProduct && Object.keys(this.dataProduct).length > 0) {
            //console.log("🚀 ~ mounted ~ this.dataProduct:", this.dataProduct)
            this.consulterProduct(this.dataProduct);
        }
            
    },
    methods: {
        ...mapActions('Inventory', ["addProduct", "updateProduct", "product", "deleteProduct", "category", "productMass", "storeGet"]),

        validateForm() {
            let isValid = true;

            if (!this.productDescription) {
                this.errors.productDescription = 'La descripción es obligatoria';
                isValid = false;
            } else {
                this.errors.productDescription = '';
            }

            if (!this.productReference) {
                this.errors.productReference = 'La referencia es obligatoria';
                isValid = false;
            } else {
                this.errors.productReference = '';
            }

            if (!this.productUnits) {
                this.errors.productUnits = 'Las unidades son obligatorias';
                isValid = false;
            } else {
                this.errors.productUnits = '';
            }

            if (!this.productCategory) {
                this.errors.productCategory = 'La categoría es obligatoria';
                isValid = false;
            } else {
                this.errors.productCategory = '';
            }

            if (!this.productAmount) {
                this.errors.productAmount = 'La cantidad es obligatoria';
                isValid = false;
            } else {
                this.errors.productAmount = '';
            }

            if (!this.productTax) {
                this.errors.productTax = 'El impuesto es obligatorio';
                isValid = false;
            } else {
                this.errors.productTax = '';
            }

            if (!this.productStock) {
                this.errors.productStock = 'El stock es obligatorio';
                isValid = false;
            } else {
                this.errors.productStock = '';
            }

            if (!this.productMinStock) {
                this.errors.productMinStock = 'El minimo stock es obligatorio';
                isValid = false;
            } else {
                this.errors.productMinStock = '';
            }

            if (!this.productStore) {
                this.errors.productStore = 'El almacen es obligatorio';
                isValid = false;
            } else {
                this.errors.productStore = '';
            }

            return isValid;
        },
        consulterProduct(data) {
            //console.log(data);
            this.productDescription = data.description;
            this.productReference = data.reference;
            this.productUnits = data.unit;
            this.productCategory = data.category.id || '';
            this.productAmount = data.amount;
            this.productTax = data.tax;
            this.productStock = data.stock;
            this.productMinStock = data.min_stock;
            this.productStore = data.store;
            this.dataProduct = data;
            this.productId = data.id;

            this.productCode = data.Code;
            this.productPrice = data.Price;
            this.productManufacturingDate = data.ManufacturingDate;
            this.productExpirationDate = data.ExpirationDate;
            this.productRisk = data.Risk;
            this.productLote = data.Lote;
            this.productBarCode = data.BarCode;
            this.productConversionFactor = data.ConversionFactor;
            this.productDCIName = data.DCIName;
            this.productTradeName = data.TradeName;
            this.productBatch = data.Batch;

            this.productDescription_commercial = data.description_commercial;
            this.productHealth_registration = data.health_registration;
            this.productHealth_registration_expiration = data.health_registration_expiration;
            this.productManufacturing_laboratory = data.manufacturing_laboratory;
            this.productCode_atc = data.code_atc;
            this.productDescription_atc = data.description_atc;
            this.productCode_cum = data.code_cum;
            this.productCode_cups = data.code_cups;
        },
        async saveProduct() {
            if (this.validateForm()) {
                const query = {
                    id: this.productId,
                    description: this.productDescription,
                    reference: this.productReference,
                    unit: this.productUnits,
                    key_category: this.productCategory,
                    amount: this.productAmount,
                    tax: this.productTax,
                    stock: this.productStock,
                    min_stock: this.productMinStock,
                    store: this.productStore,
                    Code : this.productCode,
                    Price : this.productPrice,
                    ManufacturingDate: this.productManufacturingDate,
                    ExpirationDate: this.productExpirationDate,
                    Risk: this.productRisk,
                    Lote: this.productLote,
                    BarCode: this.productBarCode,
                    ConversionFactor: this.productConversionFactor,
                    DCIName: this.productDCIName,
                    TradeName: this.productTradeName,
                    Batch: this.productBatch,
                    lasa: this.productLassa,
                    description_commercial: this.productDescription_commercial,
                    health_registration: this.productHealth_registration,
                    health_registration_expiration: this.productHealth_registration_expiration,
                    manufacturing_laboratory: this.productManufacturing_laboratory,
                    code_atc: this.productCode_atc,
                    description_atc: this.productDescription_atc,
                    code_cum: this.productCode_cum,
                    code_cups: this.productCode_cups,
                }

                let response;
                if (this.productId) {
                    response = await this.updateProduct(query);
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'El producto se ha actualizado',
                            text: 'El producto se ha actualizado exitosamente.'
                        });
                    }
                } else {
                    response = await this.addProduct(query);
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto Guardado',
                            text: 'El producto se ha guardado exitosamente.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un problema al guardar el producto. Por favor, inténtalo de nuevo.'
                        });
                        return;
                    }
                }

                // Emitimos el evento al padre para recargar la lista y cerrar el modal
                this.$emit('productSaved');
                
                this.clearForm();
            }
        },

        clearForm() {
            this.productDescription = '',
            this.productReference = '',
            this.productUnits = '',
            this.productCategory = '',
            this.productAmount = '',
            this.productTax = '',
            this.productStock = '',
            this.productMinStock = '',
            this.productStore = '',
            this.dataProduct = '',
            this.productId = '',
            this.productCode = '',
            this.productPrice = '',
            this.productManufacturingDate = '',
            this.productExpirationDate = '',
            this.productRisk = '',
            this.productLote = '',
            this.productBarCode = '',
            this.productConversionFactor = '',
            this.productDCIName = '',
            this.productTradeName = '',
            this.productBatch = '',
            this.productDescription_commercial = '',
            this.productHealth_registration = '',
            this.productHealth_registration_expiration = '',
            this.productManufacturing_laboratory = '',
            this.productCode_atc = '',
            this.productDescription_atc = '',
            this.productCode_cum = '',
            this.productCode_cups = '',
            this.productLassa = false
        },

    },

    computed: {
        ...mapGetters('Inventory', ["getCategory", "getProducts", "getStores"]),

    }
};
</script>

<style scoped>
/* Estilos para el campo de vida útil */
input[readonly] {
    background-color: #f8f9fa; /* Color de fondo por defecto */
    cursor: not-allowed; /* Cambiar el cursor */
}
</style>