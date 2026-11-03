const Auth = {
    namespaced: true,
    state:{
        user: null,
        token: localStorage.getItem('apiKey') || null,
        status: null,
        error: null,
        loading: false,
        userLogged: null,
    },
    mutations:{
        setLogin(state, data){
            state.user = data.user
            state.token = data.token
            state.userLogged = true
        },
        setLogout(state){
            state.user = null
            state.token = null
            state.userLogged = false
        },
        setToken(state, data){
            state.token = data.token
        }
    },
    getters:{
        getUser(state){
            return state.token
        }
    },
    actions:{
        setToken({ commit }, data){
            commit('setToken', data)
        },
        setLogin({ commit }, data){
            commit('setLogin', data)
        },
        setLogout({ commit }){
            commit('setLogout')
        }
    
    }
}

export default Auth