import auth from '../auth/auth'
import { API_URL } from "./../config/global.js";
const Products = {
    namespaced:true,
    state:{
        products:[]
    },
    getters:{
        getProducts(state){
            return state.products
        }
    },
    mutations:{
        setProducts(state,data){
            if(data.status){
                state.products = data.content
            }
        },
        setProduct(state,data){
            if(data.status){
                state.products = data.content
            }
        },
        setProductEmpty(state){
            state.Products = {}
        }
    },
    actions:{
        async get({commit}){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            await fetch(`${API_URL}products`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setProducts',data)
                })
            })
        },
        Search: async function ({commit}, data) {
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}products/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setProduct',json)
            }else{
                commit('setProductEmpty')
            }
        },
        async AddProducts({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'products'
            formData.append('description',data.description)
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
        async UpdateProducts({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'products'
            formData.append('description',data.description)
            formData.append('state',data.state)
            const body = new URLSearchParams(formData);
            let config = {
                method:'PUT',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}${url}/${data.id_key}?${body}`,config)
            const json = await response.json()
            if(json.status){
                commit('setrequests',json)
                return json.status
            }
            return false
        },
        async destroy({commit},data) {
            if(data === null || data === '' ){
                return false
            }
            this.show = true
            let config = {
                method:'DELETE',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}products/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setProducts',json)
                return json.status
            }
        },
    },
    
}

export default Products