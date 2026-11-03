import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";

const BillingStore = {
    namespaced: true,
    state: {
        serviceOrder: [],
        serviceOrderEmty: [],
        serviceOrderID: [],
        generateAccount: []
    },
    getters: {
        getserviceOrder(state) {
            return state.serviceOrder
        },
        getserviceOrderID(state) {
            return state.serviceOrderID
        },
        getGenerateAccount(state) {
            return state.generateAccount
        }
    },
    mutations: {
        setOrders(state, data) {
            if (data.status) {
                state.serviceOrder = data.content.data
            }
        },
        setOrdersEmpty(state) {
            state.serviceOrder = []
        },
        setOrdersID(state, data) {
            if (data.status) {
                state.serviceOrderID = data.content
            }
        },
        setserviceOrderEmpty(state) {
            state.serviceOrder = []
        },
        setGenerateAccount(state, data) {
            if (data.status) {
                state.generateAccount = data.content
            }
        },
        setGenerateAccountEmpty(state) {
            state.generateAccount = []
        }
    },
    actions: {
        SearchOrder: async function ({ commit }, data) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}billing/history/${data.keyHistory}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setOrdersID', json)
            } else {
                commit('setserviceOrderEmpty')
            }
        },
        search: async function ({ commit }, data) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}billing?key_document=${data.key_document}&key_history=${data.key_history}&key_billing=${data.key_billing}&key_patient=${data.key_patient}&key_status=${data.key_status}&key_date=${data.key_date}&end_date=${data.end_date}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setOrders', json)
            }
        },
        cleadSearch: async function ({ commit }) {
            commit('setOrdersEmpty')
        },
        async addBilling(_object, data) {
            //console.log("🚀 ~ addBilling ~ data:", data)
            this.show = true
            let formData = new FormData()
            formData.append('key_trade_agreement', data.key_trade_agreement)
            formData.append('status_invoice', data.status_invoice)
            formData.append('amount', data.amount)
            formData.append('filing', data.filing)
            //formData.append('id_invoice', data.id_invoice)
            formData.append('copago', data.copago)
            formData.append('id_patient', data.id_patient)
            formData.append('key_history', data.key_history)
            formData.append('jsonIdItems', data.jsonIdItems)
            formData.append('quota_moderator', data.quotaModerator)

            let config = {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: "Bearer " + auth.getUserLogged(),
                },
            };
            try {
                const response = await fetch(`${API_URL}billing`, config)
                const json = await response.json()
                if (json.status) {
                    return { status: true, message: json.message || 'Factura agregada con éxito.' }
                } else {
                    return { status: false, message: json.errors || 'Hubo un problema al agregar la factura.' }
                }
            } catch (error) {
                return { status: false, message: 'Hubo un problema con la solicitud. Por favor, inténtalo de nuevo.' }
            }
        },
        async updateOrders({ commit }, data) {
            this.show = true
            let config = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}orders/${data.id}?quantity=${data.quantity}&amount=${data.amount}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setOrdersID', json)
            } else {
                commit('setserviceOrderEmpty')
            }
        },
        async agreementsConsulter ({ commit }, data) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            
            // Construir la URL con los parámetros que tienen valor
            let url = `${API_URL}rips?`;
            if (data.periodoInicio) url += `date_create=${data.periodoInicio}&`;
            if (data.factura) url += `num_invoice=${data.factura}&`;
            if (data.acuerdoComercial) url += `trade_agreement=${data.acuerdoComercial}&`;
            if (data.periodoFin) url += `date_end=${data.periodoFin}&`;
            
            // Eliminar el último '&' si existe
            url = url.slice(0, -1);

            const response = await fetch(url, config)
            const json = await response.json()
            if (json.status) {
                commit('setGenerateAccount', json)
            } else {
                commit('setGenerateAccountEmpty')
            }
        },
    } 
}

export default BillingStore