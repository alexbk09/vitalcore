import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const Errors = {
    namespaced:true,
    state:{
        errors:[],
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
        links: null,
        nextPageUrl: null,
        prevPageUrl: null
    },
    getters:{
        getErrors(state){return state.errors},
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
        },
        getLinks(state) {
            return state.links;
        }
    },
    mutations:{
        setErrors(state, data) {
            state.errors = data.data;
            state.currentPage = data.current_page;
            state.totalPages = data.last_page;
            state.perPage = data.per_page;
            state.nextPageUrl = data.next_page_url;
            state.prevPageUrl = data.prev_page_url;
            state.links = data.links;
        },
    },
    actions:{
        consulterErrors({commit},page = 1){
            let config = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + auth.getUserLogged(),
                },
            };
            fetch(`${API_URL}errors?page=${page}`, config)
                .then((response) => {
                    response.json().then((data) => {
                        commit("setErrors", data);
                    });
                })
                .catch((error) => {
                    //console.log(error);
                });
        }
    },
    
}   
export default Errors

 