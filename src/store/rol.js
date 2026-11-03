import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Rol = {
    namespaced:true,
    state:{
        rol:[]
    },
    getters:{
        getrols(state){
            return state.rol
        }
    },
    mutations:{
        setRol(state,data){
            if(data.status){
                state.rol = data.content.data
            }
        },
        setRoll(state,data){
            if(data.status){
                state.rol = data.content.data
            }
        },
        setRollId(state,data){
            if(data.status){
                state.rol = data.content
            }
        },
        setRollEmpty(state){
            state.rol = []
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
            await fetch(`${API_URL}get/rol`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setRol',data)
                    
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
            const response = await fetch(`${API_URL}get/rol/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setRollId',json)
            }
        },
        async AggRols({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_rol !== null && data.id_rol !== undefined && data.id_rol !== ''){
                formData.append('id_rol',data.id_rol)
                url = `update/rol/${data.id_rol}`
            }else{
                url = 'create/rol'
            }
            formData.append('name_rol',data.name_rol)
            formData.append('state',data.state)
            formData.append('rol_key',data.checkedPrivilegies)
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
                commit('setRol',json)
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
            const response = await fetch(`${API_URL}delete/rol/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setRol',json)
                return json.status
            }
        },
        async searchRol({commit},busqueda) {
            this.rol = []
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}get/consulterrol?busquedaRol=`+busqueda,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setRol',datos)
                return
            }else{
                commit('setRollEmpty')
            }
                
        },

    },
    
}

export default Rol