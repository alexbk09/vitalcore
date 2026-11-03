import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Seat = {
    namespaced:true,
    state:{
        seat:[]
    },
    getters:{
        getseat(state){
            return state.seat
        }
    },
    mutations:{
        setSeats(state,data){
            if(data.status){
                state.seat = data.content.data
            }
        },
        setSeat(state,data){
            if(data.status){
                state.seat = data.content.data
            }
        },
        setSeatId(state,data){
            if(data.status){
                state.seat = data.content
            }
        },
        setSeatEmpty(state){
            state.seat = []
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
            await fetch(`${API_URL}get/seats`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setSeats',data)
                })
            })
        },
        async getpanel({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/seats`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setSeats',data)
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
            const response = await fetch(`${API_URL}get/seat/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setSeatId',json)
            }
        },
        async AggSeat({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_seat !== null && data.id_seat !== undefined && data.id_seat !== ''){
                formData.append('id_seat',data.id_seat)
                url = `update/seat/${data.id_seat}`
            }else{
                url = 'create/seats'
            }
            formData.append('name_seat',data.name_seat)
            formData.append('state',data.state)
            formData.append('address',data.address)
            formData.append('qualification',data.qualification)
            formData.append('email',data.email)
            formData.append('phone',data.phone)
            formData.append('cellphone',data.cellphone)
            
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
                commit('setSeats',json)
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
            const response = await fetch(`${API_URL}delete/seat/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setSeat',json)
                return json.status
            }
        },
        async searchSeat({commit},busqueda) {
            this.vehicle = []
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}get/consulterseat?busquedaSeat=`+busqueda,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setSeat',datos)
                return
            }else{
                commit('setSeatEmpty')
            }
                
        },
    },
    
}

export default Seat