import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Record = {
    namespaced:true,
    state:{
        record:[],
        billing:[],
        waitTime:[]
    },
    getters:{
        getBilling(state){
            return state.billing
        }
    },
    mutations:{
        setBilling(state, data){
            if(data.status){
                state.billing = data.content
            }
        },
        setBillingEmpty(state){
            state.billing = []
        },
        setWaitTime(state, data){
            if(data.status){
                state.waitTime = data.content
            }
        },
        setWaitTimeEmpty(state){
            state.waitTime = []
        }
    },
    actions:{
        async SendBilling(_object,data) {
            /* console.log("🚀 ~ SendBilling ~ data:", data) */
            const queryParams = new URLSearchParams(data);
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    accept: "*/*",
                },
                responseType: "blob",
            }
            const respuesta = await fetch(`${API_URL}consolidated/care?${queryParams}`,config)
            if (!respuesta.ok) {
                throw new Error("Error al generar el excel");
              }
            const blob = await respuesta.blob();
            const url = URL.createObjectURL(blob);
            window.open(url);
        },
        async SendWaitTime(_object,data) {
            /* console.log("🚀 ~ SendBilling ~ data:", data) */
            const queryParams = new URLSearchParams(data);
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    accept: "*/*",
                },
                responseType: "blob",
            }
            const respuesta = await fetch(`${API_URL}consolidated/time?${queryParams}`,config)
            if (!respuesta.ok) {
                throw new Error("Error al generar el excel");
              }
            const blob = await respuesta.blob();
            const url = URL.createObjectURL(blob);
            window.open(url);
        },
        async SendHistory(_object,data) {
            /* console.log("🚀 ~ SendBilling ~ data:", data) */
            const queryParams = new URLSearchParams(data);
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    accept: "*/*",
                },
                responseType: "blob",
            }
            const respuesta = await fetch(`${API_URL}list/history/clinic?${queryParams}`,config)
            if (!respuesta.ok) {
                throw new Error("Error al generar el excel");
              }
            const blob = await respuesta.blob();
            const url = URL.createObjectURL(blob);
            window.open(url);
        }
    },
}
export default Record