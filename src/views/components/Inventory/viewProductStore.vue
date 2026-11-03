<template>
    <div class="container-fluid py-5">
        <div class="card">
            <div class="card-body">
                <div class="row p-5">
                    <div class="col">
                        <h3>{{ getStoresID.name }}</h3>
                    </div>
                    <div class="col text-end">
                        <button type="button" class="btn btn-primary btn-sm me-4" @change="clearDataConsulter()"
                            data-bs-toggle="modal" data-bs-target="#addProduct">
                            <i class="fa fa-plus me-2"></i>Nuevo Producto
                        </button>
                        <button type="button" class="btn btn-primary btn-sm me-4" data-bs-toggle="modal"
                            data-bs-target="#moveProduct">
                            <i class="fa fa-send me-2"></i>Trasladar Producto
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                            data-bs-target="#Massproduct">
                            <i class="fa fa-plus me-2"></i>Carga Masivasss
                        </button>
                    </div>
                    <div class="col-12 mt-5">
                        <div class="table-responsive text-center">
                            <div v-if="loading" class="text-center my-3">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                                <p>Cargando productos...</p>
                            </div>
                            <table v-else class="table">
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Descripción</td>
                                        <td>Referencia</td>
                                        <td>Unidad</td>
                                        <td>Categoría</td>
                                        <td>Cantidad</td>
                                        <td>Impuesto</td>
                                        <td>Stock</td>
                                        <td>Min Stock</td>
                                        <td>Almacén</td>
                                        <td>Fecha de Fabricación</td>
                                        <td>Fecha de Vencimiento</td>
                                        <td>Vida Útil</td>
                                        <td>Lasa</td>
                                        <td>Acciones</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in getProducts" :key="index">
                                        <td>{{ product.id }}</td>
                                        <td>{{ product.description }}</td>
                                        <td>{{ product.reference }}</td>
                                        <td>{{ product.unit }}</td>
                                        <td>{{ product.category.description }}</td>
                                        <td>{{ product.amount }}</td>
                                        <td>{{ product.tax }}</td>
                                        <td>{{ product.total_quantity }}</td>
                                        <td
                                            :style="product.total_quantity <= product.min_stock ? 'color: red; font-weight:500 !important' : ''">
                                            {{ product.min_stock }}</td>
                                        <td>{{ product.store }}</td>
                                        <td>{{ product.ManufacturingDate }}</td>
                                        <td>{{ product.ExpirationDate }}</td>
                                        <td class="life-status">
                                            <span class="status-circle"
                                                :class="getLifeColor(product.ManufacturingDate, product.ExpirationDate)"
                                                :title="getLifeStatus(product.ManufacturingDate, product.ExpirationDate)">
                                            </span>
                                        </td>
                                        <td class="life-status">
                                            <span :class="product.lasa === 1 ? 'status-lasa' : 'status-lasa-inactive'">
                                            </span>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-primary btn-sm py-1 px-2"
                                                data-bs-toggle="modal" data-bs-target="#addProduct"
                                                @click="consulterProduct(product)"><i class="fa fa-edit"></i></button>
                                            <button type="button" class="btn btn-danger btn-sm py-1 px-2"
                                                @click="productDelete(product.id)"><i class="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="Massproduct" tabindex="-1" aria-labelledby="MassproductLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="MassproductLabel">Carga Masiva de Productos</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="" @submit.prevent="saveProductMass">
                            <div class="row p-5">
                                <div class="col-12">
                                    <label for="file">Arrastra o selecciona el archivo</label>
                                    <input type="file" name="file" class="form-control" id="file" ref="fileInput"
                                        @change="onFileChange" />
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Subir
                                    archivo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addProduct" tabindex="-1" aria-labelledby="addProductLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addProductLabel">Agregar producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <productForm :dataProduct="contentProduct"></productForm>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="moveProduct" tabindex="-1" aria-labelledby="moveProductLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="moveProductLabel">Trasladar Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveTransfer">
                            <div class="row">
                                <!-- Selección de bodegas -->
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label">Actual bodega</label>
                                        <select name="storeCurrent" class="form-select mt-3" v-model="storeCurrent">
                                            <option value="">Seleccionar</option>
                                            <option :value="items.id" v-for="items in getStores" :key="items.id">{{
                                                items.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label">Destino bodega</label>
                                        <select name="storDestination" class="form-select mt-3"
                                            v-model="storDestination">
                                            <option value="">Seleccionar</option>
                                            <option :value="items.id" v-for="items in getStores" :key="items.id">{{
                                                items.name }}</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Buscador de producto y cantidad -->
                                <div class="row">
                                    <div class="col-6">
                                        <label class="form-label">Producto</label>
                                        <input type="text" class="form-control" v-model="searchQuery"
                                            @input="filterProducts" placeholder="Buscar producto..." />
                                        <ul v-if="filteredProducts.length" class="product-list">
                                            <li v-for="product in filteredProducts" :key="product.id"
                                                @click="selectProduct(product)" class="product-item">
                                                {{ product.description }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-4">
                                        <label class="form-label">Cantidad</label>
                                        <input type="number" class="form-control" v-model.number="productQty" min="1" />
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-primary mt-4"
                                            @click="addProduct">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table text-center">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(product, index) in selectedProducts" :key="index">
                                            <td>{{ product.description }}</td>
                                            <td>{{ product.qty }}</td>
                                            <td>
                                                <button type="button" class="btn btn-danger btn-sm py-1 px-2"
                                                    @click="removeProduct(index)"><i class="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Lista de productos seleccionados -->
                            <!-- <div v-if="selectedProducts.length" class="selected-products mt-3">
                                <h5>Productos seleccionados:</h5>
                                <div v-for="(product, index) in selectedProducts" :key="index" class="product-item">
                                    <span>{{ product.description }}</span>
                                    <span class="mx-2">Cantidad: {{ product.qty }}</span>
                                    <button class="btn btn-danger btn-sm"
                                        @click="removeProduct(index)">Eliminar</button>
                                </div>
                            </div> -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { mapActions, mapGetters } from "vuex";
import productForm from './saveProductInventory.vue'
export default {
    name: "app-category",

    data() {
        return {
            dataProduct: '',
            selectedFile: {},
            contentProduct: null,

            searchQuery: '',
            filteredProducts: [],
            selectedProducts: [],
            productId: '',
            storeCurrent: this.$route.params.id,
            storDestination: '',
            loading: false
        };

    },
/*     watch: {
        $route(to, from) {
            if (to.name === 'Productos') {
                this.clearProducts();
                this.product();
            }
            if (to.name === 'Listado de Bodegas') {
                this.clearProducts();
                if (this.storeCurrent) {
                    this.getConsulterStore(this.storeCurrent);
                    this.ConsulterStore(this.storeCurrent);
                }
            }
        }
    }, */
    async mounted() {
        this.clearProducts();
             
        if (this.storeCurrent) {
        this.loading = true;  
        await this.getConsulterStore(this.storeCurrent);
        await this.ConsulterStore(this.storeCurrent);
        
        // Espera 6 segundos antes de ocultar el loading
        setTimeout(() => {
            this.loading = false;
        }, 6000);
    }
            
        
        
    },
    methods: {
        ...mapActions('Inventory', ["addProduct", "updateProduct", "product", "deleteProduct", "category", "productMass", "storeGet", "clearProducts", "ConsulterStore", "getConsulterStore", "seandTranferProduct"]),
        async changeStore(store) {
            this.clearProducts();
            this.storeCurrent = store;
            await this.getConsulterStore(store);
            await this.ConsulterStore(store);
        },
        consulterProduct(data) {
            this.contentProduct = { ...data }; // Clonar el objeto para evitar modificar el original
        },
        clearDataConsulter() {
            this.contentProduct = ''
        },
        calculateLifeInMonths(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const today = new Date();

            // Si alguna fecha es inválida, devolvemos 0
            if (isNaN(start) || isNaN(end)) return 0;

            // Calcular la diferencia en meses desde la fecha actual hasta la fecha de vencimiento
            const diffTime = end.getTime() - today.getTime();
            const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30); // Aproximado a meses

            return diffMonths;
        },
        getLifeColor(manufacturingDate, expirationDate) {
            const currentDate = new Date();
            const startDate = new Date(manufacturingDate);
            const endDate = new Date(expirationDate);
            const totalLife = (endDate - startDate) / (1000 * 60 * 60 * 24 * 30);
            const remainingLife = (endDate - currentDate) / (1000 * 60 * 60 * 24 * 30);
            if (remainingLife < 9) return 'red';
            if (remainingLife >= 9 && remainingLife <= 12) return 'yellow';
            return 'green';
        },
        getLifeStatus(manufacturingDate, expirationDate) {
            const currentDate = new Date();
            const endDate = new Date(expirationDate);
            const remainingMonths = (endDate - currentDate) / (1000 * 60 * 60 * 24 * 30); // Convertir a meses

            if (remainingMonths < 9) return 'Menos de 9 meses de vida útil';
            if (remainingMonths >= 9 && remainingMonths <= 12) return 'Entre 9 - 12 meses de vida útil';
            return 'Más de 12 meses de vida útil';
        },
        productDelete(id) {
            Swal.fire({
                title: '¿Estas seguro de eliminar este producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteProduct(id)
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminada.',
                        'success'
                    )
                    this.product()
                }
            })
        },
        onFileChange(event) {
            const file = event.target.files[0];
            //console.log("🚀 ~  419:", this.$refs.fileInput.target);
            if (
                file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")
            ) {
                return this.selectedFile = file;
            } else {
                alert("Por favor selecciona un archivo Excel válido.");
                this.selectedFile = null;
            }
        },
        async saveProductMass() {
            if (!this.selectedFile) {
                //alert("No se ha seleccionado un archivo.");
                return;
            }
            //console.log("🚀 ~ saveProductMass ~ this.selectedFile:", document.querySelector('#file').target, '430');
            const response = await this.productMass(this.selectedFile);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Se han cargado los productos',
                    text: 'Se han cargado los productos exitosamente.'
                })
                this.selectedFile = null;
                this.product()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al cargar los productos. Por favor, inténtalo de nuevo.'
                })
            }
        },
        filterProducts() {
            // Filtrar productos por la consulta
            this.filteredProducts = this.getProducts.filter(product =>
                product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        selectProduct(product) {
            // Seleccionar producto y limpiar el buscador
            this.searchQuery = product.description;
            this.filteredProducts = [];
        },
        addProduct() {
            if (!this.searchQuery || !this.productQty || !this.storeCurrent || !this.storDestination) {
                Swal.fire('Error', 'Completa todos los campos antes de agregar un producto.', 'error');
                return;
            }

            const product = this.getProducts.find(p => p.description === this.searchQuery);
            if (!product) {
                Swal.fire('Error', 'Producto no encontrado.', 'error');
                return;
            }

            this.selectedProducts.push({
                id: product.id,
                description: product.description,
                qty: this.productQty,
                key_store: this.storeCurrent,
                destination_store: this.storDestination
            });

            // Limpiar los campos después de agregar
            this.searchQuery = '';
            this.productQty = 1;
        },
        removeProduct(index) {
            this.selectedProducts.splice(index, 1);
        },
        async saveTransfer() {
            if (!this.selectedProducts.length) {
                Swal.fire('Error', 'Agrega al menos un producto antes de guardar.', 'error');
                return;
            }
            const items = this.selectedProducts.map(product => ({
                id: product.id,
                key_store: product.key_store,
                destination_store: product.destination_store,
                qty: product.qty,
            }));
            //console.log("🚀 ~ saveTransfer ~ response:", items)
            const response = await this.seandTranferProduct(items);
            if (response) {
                Swal.fire('Traslado guardado', 'Los productos se trasladaron exitosamente.', 'success');
                this.selectedProducts = [];
                this.storeCurrent = '';
                this.storDestination = '';
            } else {
                Swal.fire('Error', 'Hubo un problema al guardar el traslado.', 'error');
            }
        },
        productDelete(id) {
            Swal.fire({
                title: '¿Estas seguro de eliminar este producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteProduct(id)
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminada.',
                        'success'
                    )
                    this.getConsulterStore(this.storeCurrent)
                }
            })
        },
    },
    computed: {
        ...mapGetters('Inventory', ["getCategory", "getProducts", "getStores", "getStoresID"]),
    },
    components: {
        productForm
    }
};
</script>

<style>
.life-status {
    position: relative;
    text-align: center;
}

.status-circle {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
}

.status-lasa {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #f5b041;
}

.status-lasa-inactive {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: gray;
    /* Color inactivo */
}


.red {
    background-color: #FF0000;
}

.yellow {
    background-color: #FFD700;
}

.green {
    background-color: #008000;
}

.product-list {
    list-style: none;
    padding: 0;
    margin: 10px 0;
}

.product-item {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    border-radius: 4px;
}

.product-item:hover {
    background-color: #f0f0f0;
}
</style>