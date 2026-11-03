import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Attention = {
    namespaced:true,
    state:{
        attention:[]
    },
    getters:{
        getattention(state){
            return state.attention
        }
    },
    mutations:{
        setattentions(state,data){
            if(data.status){
                state.attention = data.content.data
            }
        },
        setattention(state,data){
            if(data.status){
                state.attention = data.content.data
            }
        },
        setattentionId(state,data){
            if(data.status){
                state.attention = data.content
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
            await fetch(`${API_URL}get/attention`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setattention',data)
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
                    commit('setattentions',data)
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
            const response = await fetch(`${API_URL}get/attention/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setattentionId',json)
            }
        },
        async Aggattention({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_attention !== null && data.id_attention !== undefined && data.id_attention !== ''){
                formData.append('id_attention',data.id_attention)
                url = `update/attention/${data.id_attention}`
            }else{
                url = 'create/attention'
            }
            formData.append('name_attention',data.name_attention)
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
                commit('setattentions',json)
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
            const response = await fetch(`${API_URL}delete/attention/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setattention',json)
                return json.status
            }
        },
    },
    
}

export default Attention