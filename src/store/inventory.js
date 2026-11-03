import auth from "../auth/auth";
import { API_URL } from "./../config/global.js";
const Inventory = {
  namespaced: true,
  state: {
    inventory: [],
    category: [],
    provider: [],
    products: [],
    stores: [],
    storesID: [],
  },
  getters: {
    getProducts(state) {
      return state.inventory;
    },
    getCategory(state) {
      return state.category;
    },
    getProvider(state) {
      return state.provider;
    },
    getProducts(state) {
      return state.products;
    },
    getStores(state) {
      return state.stores;
    },
    getStoresID(state) {
      return state.storesID;
    },
  },
  mutations: {
    setCategorys(state, data) {
      if (data.status) {
        state.category = data.content.data;
      }
    },
    setProviders(state, data) {
      if (data.status) {
        state.provider = data.content.data;
      }
    },
    setProducts(state, data) {
      if (data.status) {
        state.products = data.content.data;
      }
    },
    setProductsEmpty(state) {
      state.products = [];
    },
    setStores(state, data) {
      if (data.status) {
        state.stores = data.content.data;
      }
    },
    setStoreID(state, data) {
      if (data.status) {
        state.storesID = data.content;
      }
    },
  },
  actions: {
    async category({ commit }) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      await fetch(`${API_URL}category`, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setCategorys", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    async addCategory(_object, data) {
      this.show = true;
      let formData = new FormData();
      /* formData.append('name',data.name) */
      formData.append("description", data.description);
      let config = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}category`, config);
      const json = await response.json();
      if (json.status) {
        //commit('setrequests',json)
        return json.status;
      }
      return false;
    },
    async updateCategory(_object, data) {
      this.show = true;
      let formData = new FormData();
      /* formData.append('name',data.name) */
      formData.append("description", data.description);
      const body = new URLSearchParams(formData);
      let config = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}category/${data.id}?${body}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        //commit('setrequests',json)
        return json.status;
      }
      return false;
    },
    async deleteCategory({ commit }, data) {
      if (data === null || data === "") {
        return false;
      }
      this.show = true;
      let config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}category/${data}`, config);
      const json = await response.json();
      if (json) {
        commit("setCategorys", json);
        return json.status;
      }
    },
    async categoryFilter({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      await fetch(`${API_URL}category?description=` + data, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setCategorys", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    async provider({ commit }) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      await fetch(`${API_URL}provider`, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setProviders", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    async addProvider(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("identification", data.identification);
      formData.append("key_department", data.key_department);
      formData.append("active", data.active);
      formData.append("priority", 1);
      let config = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}provider`, config);
      const json = await response.json();
      if (json.status) {
        return json.status;
      }
      return false;
    },
    async updateProvider(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("identification", data.identification);
      formData.append("key_department", data.key_department);
      formData.append("active", data.active);
      formData.append("priority", 1);
      const body = new URLSearchParams(formData);
      let config = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}provider/${data.id}?${body}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        return json.status;
      }
      return false;
    },
    async deleteProvider({ commit }, data) {
      if (data === null || data === "") {
        return false;
      }
      this.show = true;
      let config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}provider/${data}`, config);
      const json = await response.json();
      if (json) {
        commit("setProviders", json);
        return json.status;
      }
    },
    async product({ commit }) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      await fetch(`${API_URL}inventory/all/products`, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setProducts", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    async addProduct(_object, data) {
      this.show = true;
      let formData = new FormData();
      // ... dentro de tu función donde construyes formData ...

if (data.description) {
  formData.append("description", data.description);
}

if (data.reference) {
  formData.append("reference", data.reference);
}

if (data.unit) {
  formData.append("unit", data.unit);
}

if (data.key_category) {
  formData.append("key_category", data.key_category);
}

if (data.amount) { // Considera usar isNaN() si 'amount' puede ser un número
  formData.append("amount", data.amount);
}

if (data.tax) { // Considera usar isNaN() si 'tax' puede ser un número
  formData.append("tax", data.tax);
}

if (data.stock) {  // Considera usar isNaN() si 'stock' puede ser un número
  formData.append("stock", data.stock);
}

if (data.min_stock) { // Considera usar isNaN() si 'min_stock' puede ser un número
  formData.append("min_stock", data.min_stock);
}

if (data.store) {
  formData.append("store", data.store);
}

if (data.Code) {
  formData.append("Code", data.Code);
}

if (data.Price) { // Considera usar isNaN() si 'Price' puede ser un número
  formData.append("Price", data.Price);
}

if (data.ManufacturingDate) {
  formData.append("ManufacturingDate", data.ManufacturingDate);
}

if (data.ExpirationDate) {
  formData.append("ExpirationDate", data.ExpirationDate);
}

if (data.Risk) {
  formData.append("Risk", data.Risk);
}

if (data.Lote) {
  formData.append("Lote", data.Lote);
}

if (data.BarCode) {
  formData.append("BarCode", data.BarCode);
}

if (data.ConversionFactor) { // Considera usar isNaN() si 'ConversionFactor' puede ser un número
  formData.append("ConversionFactor", data.ConversionFactor);
}

if (data.DCIName) {
  formData.append("DCIName", data.DCIName);
}

if (data.TradeName) {
  formData.append("TradeName", data.TradeName);
}

if (data.Batch) {
  formData.append("Batch", data.Batch);
}

if (data.lasa !== undefined && data.lasa !== null) { // Para booleanos, verifica undefined o null
  formData.append("lasa", data.lasa);
}

if (data.description_commercial) {
  formData.append("description_commercial", data.description_commercial);
}

if (data.health_registration) {
  formData.append("health_registration", data.health_registration);
}

if (data.health_registration_expiration) {
  formData.append("health_registration_expiration", data.health_registration_expiration);
}

if (data.manufacturing_laboratory) {
  formData.append("manufacturing_laboratory", data.manufacturing_laboratory);
}

if (data.code_atc) {
  formData.append("code_atc", data.code_atc);
}

if (data.description_atc) {
  formData.append("description_atc", data.description_atc);
}

if (data.code_cum) {
  formData.append("code_cum", data.code_cum);
}

if (data.code_cups) {
  formData.append("code_cups", data.code_cups);
}
      let config = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}inventory`, config);
      const json = await response.json();
      if (json.status) {
        return json.status;
      }
      return false;
    },
    async updateProduct(_object, data) {
      this.show = true;
      let formData = new FormData();
      // ... dentro de tu función donde construyes formData ...

if (data.description) {
  formData.append("description", data.description);
}

if (data.reference) {
  formData.append("reference", data.reference);
}

if (data.unit) {
  formData.append("unit", data.unit);
}

if (data.key_category) {
  formData.append("key_category", data.key_category);
}

if (data.amount) { // Considera usar isNaN() si 'amount' puede ser un número
  formData.append("amount", data.amount);
}

if (data.tax) { // Considera usar isNaN() si 'tax' puede ser un número
  formData.append("tax", data.tax);
}

if (data.stock) {  // Considera usar isNaN() si 'stock' puede ser un número
  formData.append("stock", data.stock);
}

if (data.min_stock) { // Considera usar isNaN() si 'min_stock' puede ser un número
  formData.append("min_stock", data.min_stock);
}

if (data.store) {
  formData.append("store", data.store);
}

if (data.Code) {
  formData.append("Code", data.Code);
}

if (data.Price) { // Considera usar isNaN() si 'Price' puede ser un número
  formData.append("Price", data.Price);
}

if (data.ManufacturingDate) {
  formData.append("ManufacturingDate", data.ManufacturingDate);
}

if (data.ExpirationDate) {
  formData.append("ExpirationDate", data.ExpirationDate);
}

if (data.Risk) {
  formData.append("Risk", data.Risk);
}

if (data.Lote) {
  formData.append("Lote", data.Lote);
}

if (data.BarCode) {
  formData.append("BarCode", data.BarCode);
}

if (data.ConversionFactor) { // Considera usar isNaN() si 'ConversionFactor' puede ser un número
  formData.append("ConversionFactor", data.ConversionFactor);
}

if (data.DCIName) {
  formData.append("DCIName", data.DCIName);
}

if (data.TradeName) {
  formData.append("TradeName", data.TradeName);
}

if (data.Batch) {
  formData.append("Batch", data.Batch);
}

if (data.lasa !== undefined && data.lasa !== null) { // Para booleanos, verifica undefined o null
  formData.append("lasa", data.lasa);
}


if (data.description_commercial) {
  formData.append("description_commercial", data.description_commercial);
}

if (data.health_registration) {
  formData.append("health_registration", data.health_registration);
}

if (data.health_registration_expiration) {
  formData.append("health_registration_expiration", data.health_registration_expiration);
}

if (data.manufacturing_laboratory) {
  formData.append("manufacturing_laboratory", data.manufacturing_laboratory);
}

if (data.code_atc) {
  formData.append("code_atc", data.code_atc);
}

if (data.description_atc) {
  formData.append("description_atc", data.description_atc);
}

if (data.code_cum) {
  formData.append("code_cum", data.code_cum);
}

if (data.code_cups) {
  formData.append("code_cups", data.code_cups);
}

      const body = new URLSearchParams(formData);
      let config = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}inventory/${data.id}?${body}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        return json.status;
      }
      return false;
    },
    async deleteProduct({ commit }, data) {
      if (data === null || data === "") {
        return false;
      }
      this.show = true;
      let config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}inventory/${data}`, config);
      const json = await response.json();
      if (json) {
        commit("setProducts", json);
        return json.status;
      }
    },
    async productMass(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("file", data.file);
      formData.append("store", data.idStore);
      let config = {
        method: "POST",
        body: formData,
        redirect: "follow",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}inventory/import`, config);
      const json = await response.json();
      if (json.status) {
        return json.status;
      }
      return false;
    },
    async storeGet({ commit }) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      await fetch(`${API_URL}stores`, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setStores", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    async addStore(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("municipality", data.municipality);
      formData.append("type_store", data.type_store);
      if (data.type_store == 2) {
        formData.append("key_store", data.key_store);
        formData.append(
          "key_user_id_responsibility",
          data.key_user_id_responsibility
        );
      }
      let config = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}stores`, config);
      const json = await response.json();
      if (json.status) {
        return json.status;
      }
      return false;
    },
    async updateStore(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("municipality", data.municipality);
      formData.append("type_store", data.type_store);
      if (data.type_store == 2) {
        formData.append("key_store", data.key_store);
        formData.append(
          "key_user_id_responsibility",
          data.key_user_id_responsibility
        );
      }
      const body = new URLSearchParams(formData);
      let config = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}stores/${data.id}?${body}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        return json.status;
      }
      return false;
    },
    getConsulterStore({ commit }, data) {
      this.show = true;
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      fetch(`${API_URL}inventory?store=${data}`, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setProducts", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    ConsulterStore({ commit }, data) {
      this.show = true;
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      fetch(`${API_URL}stores/${data}`, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setStoreID", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    clearProducts({ commit }) {
      commit("setProductsEmpty", []);
    },
    async seandTranferProduct(_object, data) {
        this.show = true;
        let formData = new FormData();
        formData.append("items", JSON.stringify(data));
        let config = {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Bearer " + auth.getUserLogged(),
            },
        };
        try {
            const response = await fetch(`${API_URL}inventory/move/item`, config);
            const json = await response.json();
            if (json.status) {
                //console.log("Datos enviados al servidor exitosamente.");
                return { status: true, message: json.message || 'Traslado realizado exitosamente.' };
            } else {
                console.error("Errores en la respuesta del servidor:", json.errors);
                return { status: false, message: json.errors || 'Hubo un problema al realizar el traslado.' };
            }
        } catch (error) {
            return { status: false, message: json.errors };
        }
    },
  },
};

export default Inventory;
