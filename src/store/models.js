import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Models = {
    namespaced:true,
    state:{
        models:[]
    },
    getters:{
        modelsget(state){
            return state.models
        }
    },
    mutations:{
        setModels(state,data){
            if(data.status){
                state.models = data.content
            }
        }
    },
    actions:{
        async getmodels({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/models`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setModels',data)
                    
                })
            })
        },
    },
    
}

export default Models