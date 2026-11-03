import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Permit = {
    namespaced:true,
    state:{
        permit:[]
    },
    getters:{
        getpermit(state){
            return state.permit
        }
    },
    mutations:{
        setPermit(state,data){
            if(data.status){
                state.permit = data.content
            }
        }
    },
    actions:{
        async getpermises({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}get/privilegies`,config)
            const data = await response.json()
            commit('setPermit',data)
        },
    },
    
}

export default Permit