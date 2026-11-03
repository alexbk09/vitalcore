import auth from './../auth/auth'
import { API_URL } from "./../config/global.js";
const ServiceOrder = {
    namespaced: true,
    state: {
        serviceOrder: [],
        serviceOrderEmty: [],
        serviceOrderID: [],
        company: [],
        companyId: [],
        doctor: [],
        patient: [],
        historyPatient: [],
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
        links: null,
        nextPageUrl: null,
        prevPageUrl: null
    },
    getters: {
        getserviceOrder(state) {
            return state.serviceOrder
        },
        getserviceOrderID(state) {
            return state.serviceOrderID
        },
        getCompanyData(state) {
            return state.company
        },
        getCompanylDataID(state) {
            return state.companyId
        },
        getDoctorData(state) {
            return state.doctor
        },
        getPatientData(state) {
            return state.patient
        },
        getHistoryData(state) {
            return state.historyPatient
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
        },
        getLinks(state) {
            return state.links;
        }
    },
    mutations: {
        setOrders(state, data) {
            if (data.status) {
                state.serviceOrder = data.content.data
                state.currentPage = data.content.current_page;
                state.totalPages = data.content.last_page;
                state.perPage = data.content.per_page;
                state.nextPageUrl = data.content.next_page_url;
                state.prevPageUrl = data.content.prev_page_url;
                state.links = data.content.links;
            }
        },
        setOrdersID(state, data) {
            if (data.status) {
                let struct = {
                    type_ID_patient: data.content.patient.key_type_document,
                    number_ID_patient: data.content.patient.document,
                    first_name: data.content.patient.first_surname,
                    second_surname: data.content.patient.second_surname,
                    name_patient: data.content.patient.firstname,
                    second_name_patient: data.content.patient.middlename,
                    patient_gender: data.content.patient.genre,
                    patient_cell: data.content.patient.phone,
                    contact_phone: data.content.patient.contact_phone,
                    zone_patient: data.content.zone_patient,
                    direction_patient: data.content.patient.address,
                    patient_ward: data.content.patient_ward,
                    patient_location: data.content.patient.key_locality,
                    email_patient: data.content.patient.email,


                    patient_campus: data.content.patient_campus,
                    patient_department: data.content.patient.key_department,
                    patient_municipality: data.content.patient.key_municipality,
                    company_geolocation: data.content.get_georeference.id,
                    patient_diagnosis: data.content.patient_diagnosis,
                    company_vehicle: data.content.key_vehicle,
                    company_event: data.content.key_event_type,
                    company_request: data.content.key_request,
                    company_payer: data.content.key_trade_agreement,
                    company: data.content.get_mission_company.name,

                    id_mision: data.content.get_mission_company.id,
                    id: data.content.id_order_services,
                    company_procedure: data.content.services,
                    reporting_user: data.content.reporting_user,
                    user_charge: data.content.charge_report,
                    user_phone: data.content.user_phone,
                    user_phone_2: data.content.user_phone_2,
                    authorizing_user: data.content.who_authorizes,
                    authorization_code: data.content.code_authorization,
                    observation: data.content.observation_general,
                    current_price: data.content.amount,
                    code: data.content.code,
                    type_cups: data.content.type_order,
                    type_rips: data.content.type_rips,
                    time: data.content.time,
                    copago: data.content.copago,
                    operator_coordinator: data.content.key_doctor,
                    codeTraslate: data.content.codeTraslate,
                    company_type: data.content.company_type,
                    companions_email: data.content.companions_email,
                    n_order: data.content.num_order,
                    key_status: data.content.key_status
                }
                state.serviceOrderID = struct
            }
        },
        setPatient(state, data) {
            if (data.status) {
                state.patient = data.content
            }
        },
        setPatientEmpty(state) {
            state.patient = []
        },
        setDoctor(state, data) {
            if (data.status) {
                state.doctor = data.content
            }
        },
        setserviceOrder(state, data) {
            if (data.status) {
                state.serviceOrder = data.content.data
            }
        },
        setserviceOrderEmpty(state) {
            state.serviceOrder = []
        },
        setCompany(state, data) {
            if (data.status) {
                state.company = data.content
            }
        },
        setCompanyEmpty(state) {
            state.company = []
        },
        setCompanyID(state, data) {
            if (data.status) {
                state.companyId = data.content
            }
        },
        setHistory(state, data) {
            if (data.status) {
                state.historyPatient = data.content
            }
        },
        setHistoryEmpty(state) {
            state.historyPatient = []
        }
    },
    actions: {
        async get({ commit }, page = 1) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}orders?key_start_date=${formattedDate}&page=${page}`, config)
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setOrders', datos)
                return
            } else {
                commit('setserviceOrderEmpty')
            }
        },
        async getPanelOrder({ commit }) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}orders`, config)
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setOrders', datos)
                return
            } else {
                commit('setserviceOrderEmpty')
            }
        },
        SearchOrder: async function ({ commit }, data) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}history/${data.keyHistory}`, config)
            const json = await response.json()
            //console.log("🚀 ~ json:", json)
            if (json.status) {
                commit('setOrdersID', json)
            } else {
                commit('setserviceOrderEmpty')
            }
        },
        SearchPatient: async function ({ commit }, data) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${API_URL}patient/${data}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setPatient', json)
            } else {
                commit('setPatientEmpty')
            }
        },
        clearPatient({ commit }) {
            commit('setPatientEmpty')
        },
        search: async function ({ commit }, url) {
            //console.log("🚀 ~ url:", url)
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const response = await fetch(`${url}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setOrders', json)
            } else {
                commit('setserviceOrderEmpty')
            }
        },
        GetserviceOrder() {
            let formData = new FormData()
            formData.append('item', this.searchserviceOrder)
            const config = {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            fetch(this.$url + '/get/serviceOrder/', config).then((response) => {
                response.json().then((data) => {
                    if (data.status) {
                        data.content.map(pr => {
                            //console.log(pr)
                            //console.log(data);
                        })
                    }
                })
            })
        },
        async AggserviceOrder({ commit }, data) {
            this.show = true
            let formData = new FormData()
            var url = 'create/patient/history'
            if (data.time) formData.append('time', data.time)
            formData.append('status', '1')
            if (data.type_ID_patient) formData.append('key_type_document', data.type_ID_patient)
            if (data.number_ID_patient) formData.append('document', data.number_ID_patient)
            if (data.first_name) formData.append('first_surname', data.first_name)
            if (data.second_surname) formData.append('second_surname', data.second_surname)
            if (data.name_patient) formData.append('firstname', data.name_patient)
            if (data.second_name_patient) formData.append('middlename', data.second_name_patient)
            if (data.patient_gender) formData.append('genre', data.patient_gender)
            if (data.patient_cell) formData.append('phone', data.patient_cell)
            if (data.contact_phone) formData.append('contact_phone', data.contact_phone)
            if (data.zone_patient) formData.append('zone_patient', data.zone_patient)
            if (data.direction_patient) formData.append('address', data.direction_patient)
            if (data.patient_ward) formData.append('patient_ward', data.patient_ward)
            if (data.patient_department == 5 && data.patient_location) formData.append('key_locality', data.patient_location)
            if (data.patient_campus) formData.append('patient_campus', data.patient_campus)
            if (data.patient_department) formData.append('key_department', data.patient_department)
            if (data.patient_municipality) formData.append('key_municipality', data.patient_municipality)
            if (data.patient_diagnosis) formData.append('observations', data.patient_diagnosis)
            if (data.company_vehicle) formData.append('key_vehicle', data.company_vehicle)
            if (data.company_event) formData.append('key_event_type', data.company_event)
            if (data.company_request) formData.append('key_request', data.company_request)
            if ((data.company_request == 2 || data.company_request == 3) && data.key_history) formData.append('key_history', data.key_history)
            if (data.company_payer) formData.append('key_trade_agreement', data.company_payer)
            if (data.id_mision) formData.append('key_mission_company', data.id_mision)
            if (data.company_geolocation) formData.append('company_geolocation', data.company_geolocation)
            if (data.company_procedure) {
                formData.append('services', data.company_procedure)
                formData.append('description', data.company_procedure)
            }
            if (data.reporting_user) formData.append('reporting_user', data.reporting_user)
            if (data.user_charge) formData.append('charge_report', data.user_charge)
            if (data.user_phone) formData.append('user_phone', data.user_phone)
            if (data.user_phone_2) formData.append('user_phone_2', data.user_phone_2)
            formData.append('quantity', '1')
            formData.append('key_status', '1')
            if (data.email_patient) formData.append('email', data.email_patient)
            if (data.companions_email) formData.append('companions_email', data.companions_email)
            if (data.authorizing_user) formData.append('who_authorizes', data.authorizing_user)
            if (data.authorization_code) formData.append('code_authorization', data.authorization_code)
            if (data.observation_general) formData.append('observation_general', data.observation_general)
            formData.append('amount', 0)
            if (data.code) formData.append('code', data.code)
            if (data.type_cups) formData.append('type_order', data.type_cups)
            if (data.type_rips) formData.append('type_rips', data.type_rips)
            formData.append('copago', data.copago)
            if (data.codeTraslate) formData.append('codeTraslate', data.codeTraslate)
            formData.append('company_type', data.company_type)
            if (data.operator_coordinator) formData.append('id_user', data.operator_coordinator)
            let config = {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                }
            }
            const response = await fetch(`${API_URL}${url}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setserviceOrder', json)
                return json.status
            }
            return false
        },
        async updateServiceOrder({ commit }, data) {
            this.show = true
            let formData = new FormData()
            if (data.time) formData.append('time', data.time)
            formData.append('status', '1')
            if (data.type_ID_patient) formData.append('key_type_document', data.type_ID_patient)
            if (data.number_ID_patient) formData.append('document', data.number_ID_patient)
            if (data.first_name) formData.append('first_surname', data.first_name)
            if (data.second_surname) formData.append('second_surname', data.second_surname)
            if (data.name_patient) formData.append('firstname', data.name_patient)
            if (data.second_name_patient) formData.append('middlename', data.second_name_patient)
            if (data.patient_gender) formData.append('genre', data.patient_gender)
            if (data.patient_cell) formData.append('phone', data.patient_cell)
            if (data.contact_phone) formData.append('contact_phone', data.contact_phone)
            if (data.zone_patient) formData.append('zone_patient', data.zone_patient)
            if (data.direction_patient) formData.append('address', data.direction_patient)
            if (data.patient_ward) formData.append('patient_ward', data.patient_ward)
            if (data.patient_department == 5 && data.patient_location) formData.append('key_locality', data.patient_location)
            if (data.patient_campus) formData.append('patient_campus', data.patient_campus)
            if (data.patient_department) formData.append('key_department', data.patient_department)
            if (data.patient_municipality) formData.append('key_municipality', data.patient_municipality)
            if (data.patient_diagnosis) formData.append('observations', data.patient_diagnosis)
            if (data.company_vehicle) formData.append('key_vehicle', data.company_vehicle)
            if (data.company_event) formData.append('key_event_type', data.company_event)
            if (data.company_request) formData.append('key_request', data.company_request)
            if ((data.company_request == 2 || data.company_request == 3) && data.key_history) formData.append('key_history', data.key_history)
            if (data.company_payer) formData.append('key_trade_agreement', data.company_payer)
            if (data.id_mision) formData.append('key_mission_company', data.id_mision)
            if (data.company_geolocation) formData.append('company_geolocation', data.company_geolocation)
            if (data.company_procedure) {
                formData.append('services', data.company_procedure)
                formData.append('description', data.company_procedure)
            }
            if (data.reporting_user) formData.append('reporting_user', data.reporting_user)
            if (data.user_charge) formData.append('charge_report', data.user_charge)
            if (data.user_phone) formData.append('user_phone', data.user_phone)
            if (data.user_phone_2) formData.append('user_phone_2', data.user_phone_2)
            formData.append('quantity', '1')
            formData.append('key_status', '1')
            if (data.email_patient) formData.append('email', data.email_patient)
            if (data.companions_email) formData.append('companions_email', data.companions_email)
            if (data.authorizing_user) formData.append('who_authorizes', data.authorizing_user)
            if (data.authorization_code) formData.append('code_authorization', data.authorization_code)
            if (data.observation_general) formData.append('observation_general', data.observation_general)
            formData.append('amount', 0)
            if (data.code) formData.append('code', data.code)
            if (data.type_cups) formData.append('type_order', data.type_cups)
            if (data.type_rips) formData.append('type_rips', data.type_rips)
            if (data.copago) formData.append('copago', data.copago)
            if (data.codeTraslate) formData.append('codeTraslate', data.codeTraslate)
            if (data.company_type) formData.append('company_type', data.company_type)
            if (data.operator_coordinator) formData.append('id_user', data.operator_coordinator)
            const body = new URLSearchParams(formData);
            let config = {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged(),
                    'accept': '*/*'
                }
            }
            const response = await fetch(`${API_URL}patient/history/${data.id_history}?${body}`, config)
            const json = await response.json()
            if (json.status) {
                commit('setserviceOrder', json)
                return json.status
            }
            return false
        },
        async searchCompany({ commit }, data) {
            this.user = []
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}mission/company/commercial/${data.id}?search_value=` + data.id_mision, config)
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setCompany', datos)
                return
            } else {
                commit('setCompanyEmpty')
            }
        },
        async getCompany({ commit }, id) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}mission/company/commercial/all/${id}`, config)
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setCompany', datos)
                return
            } else {
                commit('setCompanyEmpty')
            }
        },
        cleadCompany({ commit }) {
            commit('setCompanyEmpty')
        },
        async searchDoctor({ commit }) {
            this.user = []
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}get/users/doctor`, config)
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setDoctor', datos)
                return
            }
        },
        async updateState(_object, data) {
            try {
                this.show = true;
                const formData = new FormData();
                formData.append('status', data.state);
                if(data.failed_date){
                    formData.append('failed_date', data.failed_date);
                }
                const config = {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Authorization': 'Bearer ' + auth.getUserLogged(),
                        // 'accept': '*/*' No necesitas este encabezado para tu solicitud
                    }
                };
                const response = await fetch(`${API_URL}history/${data.id_history}/set/status/${data.state}`, config);

                if (!response.ok) {
                    // Si la respuesta no es exitosa, lanzar un nuevo Error
                    throw new Error('No se pudo actualizar el estado de la historia clínica.');
                }
                const json = await response.json();
                if (json.status) {
                    //commit('setserviceOrder', json);
                    return json.status;
                }
            } catch (error) {
                //console.error('Error en la solicitud:', error.message);
                return false;
            }
        },
        async getHistoryPatient({ commit }, id) {
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.getUserLogged()
                }
            }
            const respuesta = await fetch(`${API_URL}history/all/${id}`, config)
            const datos = await respuesta.json();
            if (datos.status) {
                commit('setHistory', datos)
                return
            } else {
                commit('setHistoryEmpty')
            }
        }

    }
}

export default ServiceOrder