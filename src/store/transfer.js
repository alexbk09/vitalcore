import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Transfer = {
    namespaced:true,
    state:{
        transfer:[]
    },
    getters:{
        gettransfer(state){
            return state.transfer
        }
    },
    mutations:{
        settransfers(state,data){
            if(data.status){
                state.transfer = data.content
            }
        },
        settransfer(state,data){
            if(data.status){
                state.transfer = data.content
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
            fetch(`${API_URL}get/transfer`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('settransfer',data)
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
            const response = await fetch(`${API_URL}get/transfer/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('settransfer',json)
            }
        },
    },
    
}

export default Transfer