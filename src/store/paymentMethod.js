import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const PaymentMethod = {
    namespaced:true,
    state:{
        paymentMethod:[],
        paymentMethodId:[],
    },
    getters:{
        getPaymentMethodId(state){
            return state.paymentMethod
        },

    },
    mutations:{
        setPaymentMethod(state,data){
            if(data.status){
                state.paymentMethod = data.content
            }
        },
        setPaymentMethodEmpty(state){
            state.paymentMethodId = []
        },
    },
    actions:{
        async getPaymentMethod({commit}){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}payment/options`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setPaymentMethod',datos)
                return
            }else{
                commit('setPaymentMethodEmpty')
            }
        },

    }
}

export default PaymentMethod