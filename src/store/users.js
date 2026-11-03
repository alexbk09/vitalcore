import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Users = {
    namespaced:true,
    state:{
        users:[],
        identication:'',
        name:'',
        id:'',
        busquedaUser: "",
        typeUser:[],
        currentPage: null,
        totalPages: null,
        perPage: null,
        nextPageUrl: null,
        prevPageUrl: null
    },
    getters:{
        getUsers(state){
            return state.users
        },
        getUsersType(state){
            return state.typeUser
        },
        getCurrentPage(state) {
            return state.currentPage;
        },
        getTotalPages(state) {
            return state.totalPages;
        },
        getNextPageUrl(state) {
            return state.nextPageUrl;
        },
        getPrevPageUrl(state) {
            return state.prevPageUrl;
        }
    },
    mutations:{
        setUsers(state,data){
            if(data.status){
                state.users = data.content.data
                state.currentPage = data.content.current_page;
                state.totalPages = data.content.last_page;
                state.perPage = data.content.per_page;
                state.nextPageUrl = data.content.next_page_url;
                state.prevPageUrl = data.content.prev_page_url;
            }
        },
        setUser(state,data){
            if(data.status){
                state.users = data.content.data
            }
        },
        setUserId(state,data){
            if(data.status){
                state.users = data.content
            }
        },
        setUserEmpty(state){
            state.users = []
        },
        setTypeUser(state,data){
            if(data.status){
                state.typeUser = data.content
            }
        }
    },
    actions:{
        async get({commit},page = 1){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            await fetch(`${API_URL}get/user?page=${page}`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setUsers',data)
                })
            })
        },
        Search: async function ({commit}, data) {
            let config = {
                method:'POST',
                body:{},
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}get/user/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setUserId',json)
            }
        },
        Getuser(){
            let formData = new FormData()
            formData.append('item',this.searchuser)
            const config = {
                  method:'POST',
                  body:formData,
                  headers:{
                      'Authorization': 'Bearer ' + auth.getUserLogged()
                  }
              }
            fetch(this.$url  + '/get/user/',config).then((response) => {
                response.json().then((data) => {
                if(data.status){
                  data.content.map(pr => {
                    //console.log(pr)
                    //console.log(data);
                  })
                }
              })
            })
          },
        async AggUsers({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id !== null && data.id !== undefined && data.id !== ''){
                formData.append('id',data.id)
                url = `update/user/${data.id}`
            }else{
                url = 'create/user'
            }
            formData.append('user_name',data.user_name)
            formData.append('email',data.email)
            formData.append('corporate_mail',data.corporate_mail)
            if(data.phone == '' || data.phone == undefined || data.phone.length == 0){
                formData.append('phone',0)
            }else{
                formData.append('phone',data.phone)
            }
            formData.append('cellphone',data.cellphone)
            formData.append('birthdate',data.birthdate)
            formData.append('civil_status',data.civil_status)
            formData.append('gender',data.gender)
            if(data.password != '' && data.password != undefined && data.password.length != 0){
              formData.append('password',data.password)  
            }
            formData.append('name',data.name)
            formData.append('last_name',data.last_name)
            formData.append('second_name',data.second_name)
            formData.append('second_surname',data.second_surname)
            formData.append('t_identication',data.t_identication)
            formData.append('identication',data.identication)
            formData.append('expedition_date',data.expedition_date)
            formData.append('expiration_place',data.expiration_place)
            formData.append('direction',data.direction)
            formData.append('city',data.city)
            formData.append('country',data.country)
            formData.append('p_code',data.p_code)
            formData.append('rol',data.rol)
            formData.append('type_user',data.type_user)
            if(data.type_user == 2){
                formData.append('key_product',JSON.stringify(data.key_product))
            }
            formData.append('state',data.state)
            formData.append('start_date',data.start_date)
            formData.append('signature',data.signatureBase64)

            if(data.key_trade_agreement != '' && data.key_trade_agreement != null && data.key_trade_agreement != undefined){
                formData.append('key_trade_agreement',data.key_trade_agreement)
            }
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
                commit('setUser',json)
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
            const response = await fetch(`${API_URL}delete/user/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setUser',json)
                return json.status
            }
        },
        async searchUser({commit},busqueda) {
            this.user = []
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}get/consulteruser?busquedaUser=`+busqueda,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setUser',datos)
                return
            }else{
                commit('setUserEmpty')
            }
                
        },
        async updateState({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'update/user/status'
            formData.append('status',data.state)
            const body = new URLSearchParams(formData);
            let config = {
                method:'PUT',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    'content-type' : 'application/json'
                }
            }
            const response = await fetch(`${API_URL}${url}/${data.id}?${body}`,config)
            const json = await response.json()
            if(json.status){
                commit('setUser',json)
                return json.status
            }
            return false
        },
        async getTypeUsers({commit}) {
            this.show = true
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}type/user`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setTypeUser',datos)
                return
            }   
        },
        
    }
}

export default Users