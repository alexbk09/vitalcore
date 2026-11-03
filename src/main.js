import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import setupRouteGuard from './utils/routeGuard';
/* import { VueSignaturePad } from "vue-signature-pad"; */
const validatePropertyEmpty = (property) => {
    if (property === undefined || property === null) {
        return false;
    }
    if (typeof property === 'string' && property.trim() === '') {
        return false;
    }
    if (Array.isArray(property) && property.length === 0) {
        return false;
    }
    return true;
};

const validateUser = (privilegies) => {
    var userValidate = JSON.parse(localStorage.getItem('privilegies'))
    if (!userValidate) {
        return false
    }
    const privilegie = userValidate.filter((item) => item.id.toString() === privilegies)

    if(privilegie.length > 0){
      return true
    }
    return false
}


const validateModule = (module) => {
    var userValidate = JSON.parse(localStorage.getItem('privilegies'))
    if (!userValidate) {
        return false
    }
    const modules = userValidate.filter((item) => item.module === module)
    if(modules.length > 0){
      return true
    }
    return false
}

const appInstance = createApp(App);
setupRouteGuard(router);
appInstance.config.globalProperties.$validatePropertyEmpty = validatePropertyEmpty
appInstance.config.globalProperties.$validateUser = validateUser
appInstance.config.globalProperties.$validateModule = validateModule
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
/* appInstance.component("VueSignaturePad", VueSignaturePad); */

