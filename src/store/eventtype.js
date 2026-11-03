import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const EventType = {
    namespaced:true,
    state:{
        event:[]
    },
    getters:{
        getevent(state){
            return state.event
        }
    },
    mutations:{
        setevents(state,data){
            if(data.status){
                state.event = data.content.data
            }
        },
        setevent(state,data){
            if(data.status){
                state.event = data.content.data
            }
        },
        seteventID(state,data){
            if(data.status){
                state.event = data.content
            }
        }
    },
    actions:{
        async get({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            await fetch(`${API_URL}get/event`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setevent',data)
                })
            })
        },
        async getevents({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/event`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setevent',data)
                })
            })
        },
        async getpanel({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/seats`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setevents',data)
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
            const response = await fetch(`${API_URL}get/event/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('seteventID',json)
            }
        },
        async Aggevent({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_event !== null && data.id_event !== undefined && data.id_event !== ''){
                formData.append('id_event',data.id_event)
                url = `update/event/${data.id_event}`
            }else{
                url = 'create/event'
            }
            formData.append('name_event',data.name_event)
            formData.append('state',data.state)
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
                commit('setevents',json)
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
            const response = await fetch(`${API_URL}delete/event/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setevent',json)
                return json.status
            }
        },
        async searchEvent({commit},busqueda) {
            this.event = []
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}get/consulterevent?busquedaEvent=`+busqueda,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setevent',datos)
                return
            }
                
        },
    },
    
}

export default EventType