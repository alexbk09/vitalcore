import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const DocumentType = {
    namespaced:true,
    state:{
        documentType:[],
        documentTypeId:[],
        
    },
    getters:{
        getDocument(state){
            return state.documentType
        },
        

    },
    mutations:{
        setDocumentType(state,data){
            if(data.status){
                state.documentType = data.content
            }
        },
        setDocumentTypeEmpty(state){
            state.documentTypeId = []
        },
        
    },
    actions:{
        async getDocumentType({commit}){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}type_document`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setDocumentType',datos)
                return
            }else{
                commit('setDocumentTypeEmpty')
            }
        },

    }
}

export default DocumentType