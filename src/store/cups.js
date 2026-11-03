import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Cups = {
    namespaced:true,
    state:{
        cups:[]
    },
    getters:{
        getCups(state){
            return state.cups
        }
    },
    mutations:{
        setCupss(state,data){
            if(data.status){
                state.cups = data.content.data
            }
        },
        setCups(state,data){
            if(data.status){
                state.cups = data.content.data
            }
        },
        setCupsEmpty(state){
            state.cups = []
        },
        setCupsID(state,data){
            if(data.status){
                state.cups = data.content
            }
        },
    },
    actions:{
        async get({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            await fetch(`${API_URL}get/cups`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setCups',data)
                })
            })
        },
        Search: async function ({commit}, data) {
            if(data === null || data === '' ){
                return false
            }
            let config = {
                method:'POST',
                body:{},
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}get/cups/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setCupsID',json)
            }
        },
        async addcups({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_cups !== null && data.id_cups !== undefined && data.id_cups !== ''){
                formData.append('id_cups',data.id_cups)
                url = `update/cups/${data.id_cups}`
            }else{
                url = 'create/cups'
            }
            formData.append('name_cups',data.name_cups)
            formData.append('state',data.state)
            formData.append('typecups',data.typecups)
            
            let config = {
                method:'POST',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}${url}`,config)
            const json = await response.json()
            if(json.status){
                commit('setCupss',json)
                return json.status
            }
            return false
        },
        destroy: async function ({commit}, data) {
            if(data === null || data === '' ){
                return false
            }
            let config = {
                method:'POST',
                body:{},
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}delete/cups/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setCups',json)
                return json.status
            }
        },
        async searchCups({ commit }, { busqueda }) {
            //console.log("🚀 ~ searchCups ~ busqueda:", busqueda);
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            };
            const respuesta = await fetch(`${API_URL}get/consultercups?busquedaCups=${busqueda}`, config);
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setCups', datos);
            } else {
                commit('setCupsEmpty');
            }
        },
        async searchCupsAgreements({commit},data) {

            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}contracted/services/commercial/${data.key_agreements}?description=${data.data_cups}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setCups',datos)
                return
            }else{
                commit('setCupsEmpty')
            }
                
        },
        cleadCups({commit}){
            commit('setCupsEmpty')
        }
    },
    
}

export default Cups