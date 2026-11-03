import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
import axios from 'axios';
import { getDepartmentData } from './../infrastructure/services/contentConsultations.ts'
const Municipality = {
    namespaced:true,
    state:{
        departaments:[],
        departamentsId:[],
        municipalities:[],
        municipalitiesId:[],
        localities:[],
        localitiesId:[]
    },
    getters:{
        dataDepartaments(state){
            return state.departaments
        },
        getLocalities(state){
            return state.localities
        },
        dataMunicipalities(state){
            return state.municipalities
        }


    },
    mutations:{
        setDepartaments(state,data){
            if(data){
                state.departaments = data
            }
        },
        setDepartamentsEmpty(state){
            state.departamentsId = []
        },
        setLocalities(state,data){
            if(data){
                state.localities = data.content
            }
        },
        setLocalitiesEmpty(state){
            state.localitiesId = []
        },
        setMunicipalities(state,data){
            if(data){
                state.municipalities = data.content
            }
        },
        setMunicipalitiesEmpty(state){
            state.municipalitiesId = []
        }
    },
    actions:{
        async getMunicipalities({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}municipalities/${id}`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setMunicipalities',datos)
                return
            }else{
                commit('setMunicipalitiesEmpty')
            }
        },
        async getDepartaments({ commit }) {
            try {
                const response = await getDepartmentData();
                console.log("🚀 ~ getDepartaments ~ response:", response)
                commit("setDepartaments", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getLocalitiesType({commit},id){
            let config = {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}departments/${id}/localities`,config)
            const datos = await respuesta.json();
            if(datos.status){
                commit('setLocalities',datos)
                return
            }else{
                commit('setLocalitiesEmpty')
            }
        },

    }
}

export default Municipality