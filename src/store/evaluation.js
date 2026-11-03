import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Evaluation = {
    namespaced:true,
    state:{
        evaluation:[]
    },
    getters:{
        getevaluation(state){
            return state.evaluation
        }
    },
    mutations:{
        setevaluations(state,data){
            if(data.status){
                state.evaluation = data.content.data
            }
        },
        setevaluation(state,data){
            if(data.status){
                state.evaluation = data.content.data
            }
        },
        setevaluationID(state,data){
            if(data.status){
                state.evaluation = data.content
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
            await fetch(`${API_URL}get/evaluation`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setevaluation',data)
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
                    commit('setevaluations',data)
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
            const response = await fetch(`${API_URL}get/evaluation/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setevaluationID',json)
            }
        },
        async Aggevaluation({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_evaluation !== null && data.id_evaluation !== undefined && data.id_evaluation !== ''){
                formData.append('id_evaluation',data.id_evaluation)
                url = `update/evaluation/${data.id_evaluation}`
            }else{
                url = 'create/evaluation'
            }
            formData.append('name_evaluation',data.name_evaluation)
            formData.append('id_transfer',data.transfer)
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
                commit('setevaluations',json)
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
            const response = await fetch(`${API_URL}delete/evaluation/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setevaluation',json)
                return json.status
            }
        },
    },
    
}

export default Evaluation