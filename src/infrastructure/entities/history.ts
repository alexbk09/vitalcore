export interface HistoryData {
    id: number;
    key_patient: number;
    startdate: Date;
    enddate: Date;
    startappointment: Date;
    endappointment: Date;
    time: number;
    key_status: number;
    control_date: Date;
    services: string;
    key_trade_agreement: number;
    key_mission_company: number;
    copago: number;
    observations: string;
    created_at: Date;
    updated_at: Date;
    key_vehicle: number;
    key_event_type: number;
    key_request: number;
    code_authorization: string;
    who_authorizes: string;
    transfer_code: string;
    who_authorizes_transfer: null;
    reporting_user: string;
    user_phone: string;
    company_geolocation: string;
    patient_ward: string;
    patient_campus: string;
    patient_diagnosis: string;
    zone_patient: string;
    key_doctor: number;
    key_user: number;
    num_order: number;
    agenda_process: null;
    key_transfer_type: null;
    key_cie10: null;
    analysis: string;
    rcp: string;
    death_confirmed: string;
    death_date: Date;
    observation_general: string;
    email_confirm: string;
    work_address: string;
    work_city: null;
    charge_report: string;
    video: string;
    user_phone_2: string;
    company_type: string;
    codeTraslate: null;
    companions_email: string;
    signature_patient: string;
    signature_doctor: null;
    end_consultation: Date;
    key_type_service: number;
    observations_type_services: string;
    key_request_order: number;
    id_order_services: number;
    get_type_services_history: GetTypeServicesHistory[];
    patient: Patient;
    revision_system: RevisionSystem;
    get_trade_agreement: GetTradeAgreement;
    get_mission_company: GetMissionCompany;
    get_type_request: GetTypeRequest;
    get_georeference: GetGeoreference;
    get_physical_exam: GetPhysicalExam;
    get_remission: null;
    get_products: GetProducts;
    get_disclaimer: any[];
    type_service: TypeService;
    get_diagnostic_history: GetDiagnosticHistory[];
    get_job_recommendation: GetJobRecommendation[];
    get_technical_sheet: GetTechnicalSheet;
    get_vaccine_data
    eps: string;
    driver_apply?: number;
    description: string;
    quantity: number;
    procedures_time_date: boolean;
    contracted_id: number;
    date_control: Date;
    modality_date_control: string;
}

export interface GetTypeServicesHistory {
    id: number;
    key_history: number;
    key_type_service: number;
    key_user: number;
    created_at: Date;
    updated_at: Date;
    observations_type_services: string;
    user: User;
    type_service: TypeService;
}
export interface TypeService {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
}

export interface GetDiagnosticHistory {
    id: number;
    code: string;
    description: string;
    origin: string;
    type: string;
    key_users: number;
    created_at: Date;
    updated_at: Date;
    key_history: number;
}

export interface GetGeoreference {
    id: number;
    description: string;
    key_trade_agreement: number;
    created_at: Date;
    updated_at: Date;
    sede_id: string;
}

export interface GetJobRecommendation {
    id: number;
    title: string;
    description: string;
    confirmed: number;
    observation: Observation;
    key_history: number;
    created_at: Date;
    updated_at: Date;
    media: null | string;
}

export enum Observation {
    Empty = "",
    EstaEsLaObservación = "Esta es la observación",
}

export interface GetMissionCompany {
    id: number;
    name: string;
    address: null;
    document: string;
    key_trade_agreement: number;
    type_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface GetPhysicalExam {
    id: number;
    systolic: string;
    diastolic: string;
    f_cardiac: string;
    f_respiratory: string;
    saturation: string;
    temperature: string;
    dominant_laterality: string;
    weight: string;
    size: string;
    abdominal_perimeter: string;
    glasgow: string;
    glucometer: string;
    index_ecog: string;
    head: string;
    neck: string;
    thorax_mama: string;
    abdomen: string;
    genitourinary: string;
    skeletal_muscle: string;
    nervous_system: string;
    skin_faneras: string;
    key_history: number;
    created_at: Date;
    updated_at: Date;
    general_aspect: string;
    abdominal_interpretation: string;
    medium_pressure: string;
    back: string;
    extremities: string;
    genitals: string;
    nervous: string;
    psych: string;
}

export interface GetProducts {
    id: number;
    description: string;
    state?: string;
    created_at: Date;
    updated_at: Date;
    code?: string;
}

export interface GetTechnicalSheet {
    id: number;
    charge: string;
    job_functions: string;
    address_of_residence: string;
    time_of_service: string;
    name_respondible: string;
    relationship: string;
    name_accompanying: string;
    companion_phone: string;
    reason_consultation: string;
    current_disease: string;
    category_type_attention: string;
    type_of_attention: string;
    key_history: number;
    created_at: Date;
    updated_at: Date;
    companions_email: string;
    age: string;
    companions_phone: string;
    companionsName_Technical: string;
}

export interface GetTradeAgreement {
    id_transfer: number;
    name_agreements: string;
    number_contract: string;
    billing: Date;
    email_billing: string;
    days_to_pay: number;
    validity_since: Date;
    validity_until: Date;
    email: string;
    coverage: string;
    modality: string;
    generate_rips: string;
    type_ID_client: string;
    number_ID_client: string;
    dv_client: string;
    surname_client: string;
    second_surname_client: string;
    name_client: string;
    second_name_client: string;
    zone_client: string;
    direction_client: string;
    precinct_client: string;
    municipality_client: string;
    mobile_client: string;
    phone_client: string;
    email_client_client: string;
    type_ID_seller: string;
    number_ID_seller: string;
    dv_seller: string;
    surname_seller: string;
    second_surname_seller: string;
    name_seller: string;
    second_name_seller: string;
    tuition_billing: string;
    taxpayer_billing: string;
    regime_billing: string;
    responsibility_billing: string;
    user_admin: string;
    created_at: Date;
    updated_at: Date;
    state: number;
    key_type_trade: null;
    department_id: null;
    city: null;
    email_seller: null;
    phone_seller: null;
}

export interface GetTypeRequest {
    id_request: number;
    name_request: string;
    user_admin: string;
    state: string;
    created_at: Date;
    updated_at: Date;
}

export interface Patient {
    id: number;
    firstname: string;
    middlename: string;
    first_surname: string;
    key_type_document: number;
    document: string;
    address: string;
    phone: string;
    email: string;
    key_locality: number;
    key_department: number;
    key_municipality: number;
    genre: string;
    birthdate: Date;
    created_at: Date;
    updated_at: Date;
    second_surname: string;
    contact_phone: string;
    marital_status: string;
    age: string;
    department: TypeService;
    type_document: GetProducts;
}

export interface TypeService {
    id: number;
    name: string;
    active_locality?: number;
    created_at: Date;
    updated_at: Date;
}

export interface RevisionSystem {
    id: number;
    osteoarticular: string;
    gastrointestinal: string;
    cardiovascular: string;
    respiratory: string;
    muscular: string;
    urinary: string;
    endocrine: string;
    skin_fan: string;
    lymphatic: string;
    neurological: string;
    vaccination_status: null;
    name_vaccination: null;
    dose: null;
    date_time_vaccination_doses: null;
    key_history: number;
    created_at: Date;
    updated_at: Date;
    others: string;
    digestive_system: string;
    locomotor_system: string;
    dermatological: string;
    gynecological: string;
    otorhinolaryngological: string;
    dental: string;
    psychiatric_psychological: string;
}

export interface HistoryRequest {
    seat?: string;
    doctor?: string;
    startdate: Date;
}

export interface HistoryDataDetails {
    date_Technical: Date;
    department_Technical: number,
    patient_municipality: number,
    patient_location: number,
    geolocation_Technical: string,
    services_Technical: string,
    agreement_Technical: string,
    mision_Technical: string,
    typeID_Technical: number,
    IDPatient_Technical: string,
    firstname_Technical: string,
    middlename_Technical: string,
    first_surname_Technical: string,
    second_surname_Technical: string,
    typeRequest_Technical: number,
    genre_Technical: string,
    phone_Technical: string,
    phone_Technical_2: string,
    email_Technical: string,
    authorizationCode_Technical: string,
    initialDate_Technical: Date,
    diagnosis_Technical: string,
    IDPatient: number,
    status: number,
    key_status: number,
    copago: number,
    key_request_order: number,
    id_order_services: number,
    companions_phone_Technical: string,
    companions_email_Technical: string,
    signature_patient: string,
    services_name: string,
    video: string,
    birthDate_Technical: Date,
    key_event_type: number,
    key_type_service: number,
    observations_type_services: string,
    key_request: number,
    key_agreement: number,
    patient_address: string,
    id: number,
    key_patient: number,
    genre: string,
    revision_system: RevisionSystem,
    get_physical_exam: GetPhysicalExam,
    get_diagnostic_history: GetDiagnosticHistory[],
    analysis: string,
    death_date: Date,
    death_confirmed: string,
    control_date: Date,
    get_job_recommendation: GetJobRecommendation[],
    get_type_services_history: GetTypeServicesHistory[],
    get_trade_agreement: GetTradeAgreement,
    patient: Patient,
    startappointment: Date;
    
    civilStatus_Technical: string,
    age_Technical: string,
    workAddress_Technical: string,
    charge_Technical: string,
    jobFunctions_Technical: string,
    companyTime_Technical: string,
    relationship_Technical: string,
    passengerPhone_Technical: string,
    typeCare_Technical: string,
    residenceAddress_Technical: string,
    companionsName_Technical: string,
    id_technical,

    reasonConsultation_Technical: string,
    currentIllness_Technical: string,
    procedures_Technical: boolean,
    contracted_id: number,
    end_consultation: Date,
    date_control: Date,
    modality_date_control: string,
}

export interface TechnicalDataDetails {
    date_Technical: Date,
    key_department: number,
    patient_municipality: number,
    key_locality: number,
    geolocation_Technical: string,
    services_name: string,
    agreement_Technical: string,
    mision_Technical: string,
    key_type_document:  number,
    document: string,
    first_surname: string,
    second_surname: string,
    firstname: string,
    middlename: string,
    genre: string,
    marital_status: string,
    birthdate: Date,
    age: string,
    phone_Technical: string,
    phone_Technical_2: string,
    email: string,
    email_confirm: string,
    patient_address: string,
    address_of_residence: string,
    authorizationCode_Technical: string,
    work_address: string,
    charge: string,
    job_functions: string,
    time_of_service: string,
    initialDate_Technical: Date,
    copago: number,
    patient_diagnosis: string,
    name_accompanying: string,
    relationship: string,
    companion_phone: string,
    type_of_attention: string,
    category_type_attention: string,
    key_municipality: number,
    key_request: number,
    key_history: number,
    key_patient: number,
    id_technical: number,
    companions_phone: string,
    reason_consultation: string,
    current_disease: string,
}

export interface VaccineDataServer {
    id_patient: string;
    bcg: string;
    hepatitis_a: string;
    covid: string;
    neumococo: string;
    rotavirus: string;
    pentavalente: string;
    polio: string;
    td_tt_woman: string;
    vph: string;
    schema_year: string;
    name_vaccine: string;
    updated_at: Date;
    created_at: Date;
    id: number;
}

export interface VaccineDataFront {
    patient_id: string;
    bcg: string;
    hepatitis_a: string;
    covid: string;
    neumococo: string;
    rotavirus: string;
    pentavalente: string;
    polio: string;
    td_tt_woman: string;
    vph: string;
    schema_year: string;
    name_vaccine: string;
    updated_at: Date;
    created_at: Date;
    id: number;
}

export interface RecordDataServer {
    id: number;
    name: string;
    value: string;
    patient_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface RecordDataFront {
    id: number;
    name: string;
    value: string;
    patient_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface RecordSave {
    histories: string,//mandara un todo dentro de un JSON,
    IdHistory: number;
    keyPatient: number;
    IdPatient: number;
}