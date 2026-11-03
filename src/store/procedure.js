import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Procedures = {
    namespaced:true,
    state:{
        procedure:[],
        procedureId:[],
        
    },
    getters:{
        procedureGet(state){
            return state.procedure
        },
        

    },
    mutations:{
        setProcedures(state,data){
            if(data.status){
                state.procedure = data.content
            }
        },
        setProceduresEmpty(state){
            state.procedureId = []
        },
        
    },
    actions:{
        async getProcedures({commit}){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}procedure`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setProcedures',datos)
                return
            }else{
                commit('setProceduresEmpty')
            }
        },

    }
}

export default Procedures