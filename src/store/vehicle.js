import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";

const Vehicle = {
    namespaced: true,
    state: {
        vehicle: [],
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
        nextPageUrl: null,
        prevPageUrl: null
    },
    getters: {
        getvehicle(state) {
            return state.vehicle;
        },
        getCurrentPage(state) {
            return state.currentPage;
        },
        getTotalPages(state) {
            return state.totalPages;
        },
        getNextPageUrl(state) {
            return state.nextPageUrl;
        },
        getPrevPageUrl(state) {
            return state.prevPageUrl;
        }
    },
    mutations: {
        setVehicles(state, data) {
            if (data.status) {
                state.vehicle = data.content.data;
                state.currentPage = data.content.current_page;
                state.totalPages = data.content.last_page;
                state.perPage = data.content.per_page;
                state.nextPageUrl = data.content.next_page_url;
                state.prevPageUrl = data.content.prev_page_url;
            }
        },
        setVehicleEmpty(state) {
            state.vehicle = [];
        },
    },
    actions: {

        async vehicleTransfer({ commit },) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            };
            await fetch(`${API_URL}get/consultervehicle`, config)
                .then((response) => {
                    response.json().then((data) => {
                        commit('setVehicles', data);
                    });
                });
        },
        async get({ commit }, page = 1) {
            let config = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            };
            await fetch(`${API_URL}get/vehicle?page=${page}`, config)
                .then((response) => {
                    response.json().then((data) => {
                        commit('setVehicles', data);
                    });
                });
        }
        ,
        async getvehicles({ commit }) {
            let config = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/vehicle`, config)
                .then((response) => {
                    response.json().then((data) => {
                        commit('setVehicle', data)
                    })
                })
        },
        async getvehiclepanel({ commit }) {
            let config = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/vehicle`, config)
                .then((response) => {
                    response.json().then((data) => {
                        commit('setVehicles', data)
                    })
                })
        },
        async getvehicleSeat({ commit }, data) {
            let config = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/vehicle?key_sede=${data}`, config)
                .then((response) => {
                    response.json().then((data) => {
                        commit('setVehicles', data)
                    })
                })
        },
        Search: async function ({ commit }, data) {
            if (data === null || data === '') {
                return false
            }
            let config = {
                method: 'POST',
                body: {},
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}get/vehicle/${data}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setVehicleID', json)
            }
        },
        async addVehicle({ commit }, data) {
            this.show = true
            let formData = new FormData()
            var url
            if (data.id_vehicle !== null && data.id_vehicle !== undefined && data.id_vehicle !== '') {
                formData.append('id_vehicle', data.id_vehicle)
                url = `update/vehicle/${data.id_vehicle}`
            } else {
                url = 'create/vehicle'
            }
            formData.append('name_vehicle', data.name_vehicle)
            formData.append('state', data.state)
            formData.append('typevehicle', data.typevehicle)
            formData.append('sede', data.seatVehicle)
            formData.append('contact_phone', data.contact_phone)
            let config = {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}${url}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setVehicles', json)
                return json.status
            }
            return false
        },
        destroy: async function ({ commit }, data) {
            if (data === null || data === '') {
                return false
            }
            let config = {
                method: 'POST',
                body: {},
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}delete/vehicle/${data}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setVehicle', json)
                return json.status
            }
        },
        async searchVehicle({ commit }, busqueda) {
            this.vehicle = []
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}get/consultervehicle?busquedaVehicle=` + busqueda, config)
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setVehicles', datos)
                return
            } else {
                commit('setVehicleEmpty')
            }

        },
        async addDestination({ commit }, data) {
            this.show = true
            let formData = new FormData()
            formData.append('vehicles', data)
            const body = new URLSearchParams(formData);
            let config = {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}update/seat/vehicle?${body}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setVehicle', json)
                return json.status
            }
            return false

        },
    },

}

export default Vehicle 