import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Agreements = {
    namespaced:true,
    state:{
        agreements:[],
        commercialData:[],
        commercialDataId:[],
        company:[],
        companyId:[],
        product:[],
        productId:[],
        georeference:[],
        georeferenceID:[],
        packageEmpty:[],
        package:[]
    },
    getters:{
        getagreements(state){
            return state.agreements
        },
        getCommercialData(state){
            return state.commercialData
        },
        getCommercialDataID(state){
            return state.commercialDataId
        },
        getCompanyData(state){
            return state.company
        },
        getCompanylDataID(state){
            return state.companyId
        },
        getProductData(state){
            return state.product
        },
        getgeoreferencingData(state){
            return state.georeference
        },
        getgeoreferencinglDataID(state){
            return state.georeferenceID
        },
        getPackageData(state){
            return state.package
        },
    },
    mutations:{
        setagreement(state,data){
            if(data.status){
                state.agreements = data.content
            }
        },
        setagreements(state,data){
            if(data.status){
                state.agreements = data.content
            }
        },
        setCommercialData(state,data){
            if(data.status){
                state.commercialData = data.content
            }
        },
        setCommercialDataID(state,data){
            if(data.status){
                let struct = { 
                    ItemsNameContact: data.content.name, 
                    ItemsPost: data.content.charge,
                    ItemsPhone: data.content.phone,
                    ItemsEmail: data.content.email,
                    ItemsDate: data.content.birthdate,
                  }
                state.commercialDataId = struct
            }
        },
        setCommercialDataEmpty(state){
            state.commercialData = []
        },
        setCompany(state,data){
            if(data.status){
                state.company = data.content
            }
        },
        setCompanyEmpty(state){
            state.company = []
        },
        setCompanyID(state,data){
            if(data.status){
                state.companyId = data.content
            }
        },
        setProduct(state,data){
            if(data.status){
                state.product = data.content.data
            }
        },
        setProductEmpty(state){
            state.product = []
        },
        setProductID(state,data){
            if(data.status){
                state.productId = data.content
            }
        },
        setGeoreference(state,data){
            if(data.status){
                state.georeference = data.content
            }
        },
        setGeoreferenceID(state,data){
            if(data.status){
                state.georeferenceID = data.content
            }
        },
        setGeoreferenceEmpty(state){
            state.georeference = []
        },
        setPackageEmpty(state){
            state.packageEmpty = []
        },
        setPackage(state,data){
            state.package = data.content
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
            await fetch(`${API_URL}get/agreements`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setagreement',data)
                })
            })
        },
        async getagreement({commit}){
            let config = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(`${API_URL}get/agreements`,config)
                .then((response) => {
                    response.json().then((data) => {
                    commit('setagreement',data)
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
            const response = await fetch(`${API_URL}get/agreements/${data}`,config)
            const json = await response.json()
            if(json.status){
                commit('setagreement',json)
            }
        },
        Getagreements(){
            let formData = new FormData()
            formData.append('item',this.searchagreements)
            const config = {
                  method:'POST',
                  body:formData,
                  headers:{
                      'Authorization': 'Bearer ' + auth.getUserLogged()
                  }
              }
            fetch(this.$url  + '/get/agreements/',config).then((response) => {
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
        async Aggagreements({commit},data){
            this.show = true
            let formData = new FormData()
            var url
            if(data.id_transfer !== null && data.id_transfer !== undefined && data.id_transfer !== ''){
                formData.append('id_transfer',data.id_transfer)
                url = `update/agreements/${data.id_transfer}`
            }else{
                url = 'create/agreements'
            }
            formData.append('name_agreements',data.name_agreements)
            formData.append('description',data.description)
            formData.append('number_contract',data.number_contract)
            formData.append('state',data.state)
            formData.append('billing',data.billing)
            formData.append('validity_since',data.validity_since)
            if(data.validity_until !== null && data.validity_until !== undefined && data.validity_until !== ''){
                formData.append('validity_until',data.validity_until)
            }
            formData.append('email',data.email)
            formData.append('coverage',data.coverage)
            formData.append('modality',data.modality)
            formData.append('generate_rips',data.generate_rips)
            formData.append('type_ID_client',data.type_ID_client)
            formData.append('number_ID_client',data.number_ID_client)
            formData.append('dv_client',data.dv_client)
            formData.append('surname_client',data.surname_client)
            formData.append('second_surname_client',data.second_surname_client)
            formData.append('name_client',data.name_client)
            formData.append('second_name_client',data.second_name_client)
            formData.append('zone_client',data.zone_client)
            formData.append('direction_client',data.direction_client)
            formData.append('precinct_client',data.precinct_client)
            formData.append('municipality_client',data.municipality_client)
            formData.append('mobile_client',data.mobile_client)
            formData.append('phone_client',data.phone_client)
            formData.append('email_client_client',data.email_client_client)
            formData.append('type_ID_seller',data.type_ID_seller)
            formData.append('number_ID_seller',data.number_ID_seller)
            formData.append('dv_seller',data.dv_seller)
            formData.append('surname_seller',data.surname_seller)
            formData.append('second_surname_seller',data.second_surname_seller)
            formData.append('name_seller',data.name_seller)
            formData.append('second_name_seller',data.second_name_seller)
            formData.append('tuition_billing',data.tuition_billing)
            formData.append('taxpayer_billing',data.taxpayer_billing)
            formData.append('regime_billing',data.regime_billing)
            formData.append('responsibility_billing',data.responsibility_billing)
            formData.append('email_billing',data.email_billing)
            if(data.days_to_pay !== null && data.days_to_pay !== undefined && data.days_to_pay !== ''){
               formData.append('days_to_pay',data.days_to_pay) 
            }
            formData.append('key_type_trade',1)
            let config = {
                method:'POST',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            try { 
                const response = await fetch(`${API_URL}${url}`,config)
                const json = await response.json()
                if(json.status){
                    commit('setagreements',json)
                    return json
                }else {
                    const errorMessage = json;
                    return errorMessage;
                }
            }
            catch (error) {
                //console.error(error);
                return {
                    status:false,
                    errors: error
                };
            }
        },
        async AddCommercialData({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'business/contact'
            formData.append('name',data.ItemsNameContact)
            formData.append('charge',data.ItemsPost)
            formData.append('phone',data.ItemsPhone)
            formData.append('email',data.ItemsEmail)
            formData.append('birthdate',data.ItemsDate)
            formData.append('key_trade_agreement',data.id)
            let config = {
                method: 'POST',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}${url}`,config)
            const json = await response.json()
            if(json.status){
                commit('setagreements',json)
                return json.status
            }
            return false
        },
        async getCommercial({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}business/contact/commercial/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setCommercialData',datos)
                return
            }else{
                commit('setCommercialDataEmpty')
            }
        },
        async searchCommercialId({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}business/contact/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setCommercialDataID',datos)
                return
            }else{
                commit('setCommercialDataEmpty')
            }  
        },
        async UpdateCommercialData({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'business/contact'
            formData.append('name',data.ItemsNameContact)
            formData.append('charge',data.ItemsPost)
            formData.append('phone',data.ItemsPhone)
            formData.append('email',data.ItemsEmail)
            formData.append('birthdate',data.ItemsDate)
            formData.append('key_trade_agreement',data.id)
            const body = new URLSearchParams(formData);
            let config = {
                method:'PUT',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    'content-type' : 'application/json'
                }
            }
            const response = await fetch(`${API_URL}${url}/${data.key}?${body}`,config)
            const json = await response.json()
            if(json.status){
                commit('setagreements',json)
                return json.status
            }
            return false
        },
        async clearCommercial({commit}){
            commit('setCommercialDataEmpty')
        },
        async destroyCommercial({commit},data) {
            if(data === null || data === '' ){
                return false
            }
            this.show = true
            let formData = new FormData()
            formData.append('key_trade_agreement',data.key)
            let config = {
                method:'DELETE',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}business/contact/${data.id}`,config)
            const json = await response.json()
            if(json.status){
                commit('setCommercialData',json)
                return json.status
            }
        },
        async getCompany({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}mission/company/commercial/all/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setCompany',datos)
                return
            }else{
                commit('setCompanyEmpty')
            }
        },
        async clearCompany({commit}){
            commit('setCompanyEmpty')
        },
        async searchCompany({commit},data) {
            this.user = []
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}mission/company/commercial/${data.id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setCompany',datos)
                return
            }else{
                commit('setCompanyEmpty')
            }   
        },
        cleadCompany({commit}){
            commit('setCompanyEmpty')
        },
        async AddCompanyData({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'mission/company'
            formData.append('name',data.name)
            formData.append('type_id',data.type_id)
            formData.append('document',data.document)
            formData.append('key_trade_agreement',data.id)
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
                commit('setCompany',json)
                return json.status
            }
            return false
        },
        async searchCompanyId({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}mission/company/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setCompanyID',datos)
                return
            }else{
                commit('setCompanyEmpty')
            }  
        },
        async UpdateCompanyData({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'mission/company'
            formData.append('name',data.name)
            formData.append('type_id',data.type_id)
            formData.append('document',data.document)
            formData.append('address',data.address)
            formData.append('key_trade_agreement',data.id)
            const body = new URLSearchParams(formData);
            let config = {
                method:'PUT',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    'content-type' : 'application/json'
                }
            }
            const response = await fetch(`${API_URL}${url}/${data.key}?${body}`,config)
            const json = await response.json()
            if(json.status){
                commit('setCompanyEmpty',json)
                return json.status
            }
            return false
        },
        async destroyCompany({commit},data) {
            if(data === null || data === '' ){
                return false
            }
            this.show = true
            let formData = new FormData()
            formData.append('key_trade_agreement',data.key)
            let config = {
                method:'DELETE',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}mission/company/${data.id}`,config)
            const json = await response.json()
            if(json.status){
                commit('setCompanyEmpty',json)
                return json.status
            }
        },
        async getProduct({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}contracted/services?key_trade_agreement=${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setProduct',datos)
                return
            }else{
                commit('setProductEmpty')
            }
        },
        async AddProductData({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'contracted/services/'
            formData.append('code',data.itemscode)
            formData.append('description',data.itemsdescription)
            formData.append('current_price',data.price)
            formData.append('amount',data.amount)
            formData.append('percentage',data.percentage)
            formData.append('key_trade_agreement',data.id)
            let config = {
                method: 'POST',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}${url}`,config)
            const json = await response.json()
            if(json.status){
                commit('setProduct',json)
                return json.status
            }
            return false
        },
        async destroyProduct({commit},data) {
            if(data === null || data === '' ){
                return false
            }
            this.show = true
            let formData = new FormData()
            formData.append('key_trade_agreement',data.key)
            let config = {
                method:'DELETE',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}contracted/services/${data.id}`,config)
            const json = await response.json()
            if(json.status){
                commit('setProduct',json)
                return json.status
            }
        },
        async clearProduct({commit}) {
            commit('setProductEmpty')
        },
        async AddgeoreferencingData({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'georeference'
            formData.append('description',data.description)
            formData.append('sede_id',data.sede_id)
            formData.append('key_trade_agreement',data.id)
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
                commit('setGeoreference',json)
                return json.status
            }
            return false
        },
        async getgeoreferencing({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}georeference/commercial/all/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setGeoreference',datos)
                return
            }else{
                commit('setGeoreferenceEmpty')
            }
        },
        async clearGeoreferencing({commit}) {
            commit('setGeoreferenceEmpty')
        },
        async searchgeoreferencingId({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}georeference/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setGeoreferenceID',datos)
                return
            }else{
                commit('setGeoreferenceEmpty')
            }
        },
        async destroygeoreferencing({commit},id) {
            let config = {
                method:'DELETE',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}georeference/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setGeoreferenceID',datos)
                return
            }else{
                commit('setGeoreferenceEmpty')
            }
        },
        async UpdategeoreferencingData({commit},data){
            this.show = true
            let formData = new FormData()
            var url = 'georeference'
            formData.append('description',data.description)
            formData.append('sede_id',data.sede_id)
            formData.append('key_trade_agreement',data.id)
            const body = new URLSearchParams(formData);
            let config = {
                method:'PUT',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    'content-type' : 'application/json'
                }
            }
            const response = await fetch(`${API_URL}${url}/${data.key}?${body}`,config)
            const json = await response.json()
            if(json.status){
                commit('setGeoreference',json)
                return json.status
            }
            return false
        },
        async addPackage({commit},{key_trade, items, name, status, amount_manual}){
            this.show = true
            let formData = new FormData()
            formData.append('key_trade',key_trade)
            formData.append('name',name )
            formData.append('status',status)
            formData.append('amount_manual',amount_manual)
            formData.append('items',JSON.stringify(items))
            let config = {
                method:'POST',
                body:formData,
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}package`,config)
            const json = await response.json()
            if(json.status){
                commit('setPackageEmpty',json) 
                return json.status
            }
            return false   

        },
        async searchPackage({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}package?key_trade=${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setPackage',datos)
                return
            }else{
                commit('setPackageEmpty')
            }
        },
        async destroyPackage(_object,data) {
            let config = {
                method:'DELETE',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}package/${data.keyId}?key_trade=${data.keyHistory}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                return
            }
        },
        async updatePackage({commit},{key_trade, items, name, idPackage, status, amount_manual}){
            this.show = true
            let formData = new FormData()
            formData.append('key_trade',key_trade)
            formData.append('name',name )
            formData.append('status',status)
            formData.append('amount_manual',amount_manual)
            formData.append('items',JSON.stringify(items))
            const body = new URLSearchParams(formData);
            let config = {
                method:'PUT',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}package/${idPackage}?${body}`,config)
            const json = await response.json()
            if(json.status){
                commit('setPackageEmpty',json)
                return json.status
            }
            return false   

        },
        
    }
}

export default Agreements