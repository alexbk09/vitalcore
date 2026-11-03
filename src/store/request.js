import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Request = {
    namespaced:true,
    state:{
        request:[]
    },
    getters:{
        getrequest(state){
            return state.request
        }
    },
    mutations:{
        setrequests(state,data){
            if(data.status){
                state.request = data.content
            }
        },
        setrequest(state,data){
            if(data.status){
                state.request = data.content
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
            await fetch(`${API_URL}get/request`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setrequest',data)
                })
            })
        },
        async getrequests({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/request`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setrequest',data)
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
            fetch(`${API_URL}get/request`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setrequests',data)
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
            const response = await fetch(`${API_URL}get/request/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setrequest',json)
            }
        },
        async Aggrequest({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_request !== null && data.id_request !== undefined && data.id_request !== ''){
                formData.append('id_request',data.id_request)
                url = `update/request/${data.id_request}`
            }else{
                url = 'create/request'
            }
            formData.append('name_request',data.name_request)
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
                commit('setrequests',json)
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
            const response = await fetch(`${API_URL}delete/request/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setrequest',json)
                return json.status
            }
        },
    },
    
}

export default Request