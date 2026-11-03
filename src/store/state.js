import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const StateType = {
    namespaced:true,
    state:{
        stateType:[],
        stateTypeId:[],
        
    },
    getters:{
        getState(state){
            return state.stateType
        },
        

    },
    mutations:{
        setStateType(state,data){
            if(data.status){
                state.stateType = data.content
            }
        },
        setStateTypeEmpty(state){
            state.stateTypeId = []
        },
        
    },
    actions:{
        async getStateType({commit}){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}history/statuses`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setStateType',datos)
                return
            }else{
                commit('setStateTypeEmpty')
            }
        },

    }
}

export default StateType