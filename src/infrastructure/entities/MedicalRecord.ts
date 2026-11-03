export interface MedicalRecord {
    id:                         number;
    key_patient:                number;
    startdate:                  Date;
    enddate:                    Date;
    startappointment:           Date;
    endappointment:             Date;
    time:                       number;
    key_status:                 number;
    control_date:               null;
    services:                   string;
    key_trade_agreement:        number;
    key_mission_company:        number;
    copago:                     number;
    observations:               string;
    created_at:                 Date;
    updated_at:                 Date;
    key_vehicle:                number;
    key_event_type:             number;
    key_request:                number;
    code_authorization:         string;
    who_authorizes:             string;
    transfer_code:              null;
    who_authorizes_transfer:    null;
    reporting_user:             string;
    user_phone:                 string;
    company_geolocation:        string;
    patient_ward:               string;
    patient_campus:             string;
    patient_diagnosis:          null;
    zone_patient:               string;
    key_doctor:                 number;
    key_user:                   number;
    num_order:                  number;
    agenda_process:             null;
    key_transfer_type:          null;
    key_cie10:                  null;
    analysis:                   string;
    rcp:                        null;
    death_confirmed:            number;
    death_date:                 null;
    observation_general:        string;
    email_confirm:              string;
    work_address:               string;
    work_city:                  null;
    charge_report:              string;
    video:                      null;
    user_phone_2:               null;
    company_type:               string;
    codeTraslate:               null;
    companions_email:           null;
    signature_patient:          string;
    signature_doctor:           null;
    end_consultation:           null;
    key_type_service:           number;
    observations_type_services: string;
    key_request_order:          number;
    id_order_services:          number;
    get_type_services_history:  any[];
    patient:                    Patient;
    revision_system:            RevisionSystem;
    get_trade_agreement:        GetTradeAgreement;
    get_mission_company:        GetMissionCompany;
    get_type_request:           GetTypeRequest;
    get_georeference:           GetGeoreference;
    get_physical_exam:          GetPhysicalExam;
    get_remission:              null;
    get_products:               GetProducts;
    get_disclaimer:             any[];
    type_service:               TypeService;
    get_diagnostic_history:     GetDiagnosticHistory[];
    get_job_recommendation:     GetJobRecommendation[];
    get_technical_sheet:        GetTechnicalSheet;
}

export interface GetDiagnosticHistory {
    id:          number;
    code:        string;
    description: string;
    origin:      string;
    type:        string;
    key_users:   number;
    created_at:  Date;
    updated_at:  Date;
    key_history: number;
}

export interface GetGeoreference {
    id:                  number;
    description:         string;
    key_trade_agreement: number;
    created_at:          Date;
    updated_at:          Date;
    sede_id:             string;
}

export interface GetJobRecommendation {
    id:          number;
    title:       string;
    description: string;
    confirmed:   number;
    observation: Observation;
    key_history: number;
    created_at:  Date;
    updated_at:  Date;
    media:       null | string;
}

export enum Observation {
    Empty = "",
    SinObservacion = "Sin observacion ",
}

export interface GetMissionCompany {
    id:                  number;
    name:                string;
    address:             null;
    document:            string;
    key_trade_agreement: number;
    type_id:             number;
    created_at:          Date;
    updated_at:          Date;
}

export interface GetPhysicalExam {
    id:                       number;
    systolic:                 string;
    diastolic:                string;
    f_cardiac:                string;
    f_respiratory:            string;
    saturation:               string;
    temperature:              string;
    dominant_laterality:      string;
    weight:                   string;
    size:                     string;
    abdominal_perimeter:      string;
    glasgow:                  null;
    glucometer:               null;
    index_ecog:               null;
    head:                     string;
    neck:                     string;
    thorax_mama:              string;
    abdomen:                  string;
    genitourinary:            string;
    skeletal_muscle:          string;
    nervous_system:           string;
    skin_faneras:             string;
    key_history:              number;
    created_at:               Date;
    updated_at:               Date;
    general_aspect:           string;
    abdominal_interpretation: string;
    medium_pressure:          string;
    back:                     string;
    extremities:              string;
    genitals:                 string;
    nervous:                  string;
    psych:                    string;
}

export interface GetProducts {
    id:          number;
    description: string;
    state?:      string;
    created_at:  Date;
    updated_at:  Date;
    code?:       string;
}

export interface GetTechnicalSheet {
    id:                      number;
    charge:                  string;
    job_functions:           string;
    address_of_residence:    string;
    time_of_service:         string;
    name_respondible:        null;
    relationship:            null;
    name_accompanying:       null;
    companion_phone:         string;
    reason_consultation:     string;
    current_disease:         string;
    category_type_attention: string;
    type_of_attention:       string;
    key_history:             number;
    created_at:              Date;
    updated_at:              Date;
    companions_email:        null;
    age:                     string;
    companions_phone:        null;
}

export interface GetTradeAgreement {
    id_transfer:            number;
    name_agreements:        string;
    number_contract:        string;
    billing:                Date;
    email_billing:          string;
    days_to_pay:            number;
    validity_since:         Date;
    validity_until:         Date;
    email:                  string;
    coverage:               string;
    modality:               string;
    generate_rips:          string;
    type_ID_client:         string;
    number_ID_client:       string;
    dv_client:              string;
    surname_client:         string;
    second_surname_client:  string;
    name_client:            string;
    second_name_client:     string;
    zone_client:            string;
    direction_client:       string;
    precinct_client:        string;
    municipality_client:    string;
    mobile_client:          string;
    phone_client:           string;
    email_client_client:    string;
    type_ID_seller:         string;
    number_ID_seller:       string;
    dv_seller:              string;
    surname_seller:         string;
    second_surname_seller:  string;
    name_seller:            string;
    second_name_seller:     string;
    tuition_billing:        string;
    taxpayer_billing:       string;
    regime_billing:         string;
    responsibility_billing: string;
    user_admin:             string;
    created_at:             Date;
    updated_at:             Date;
    state:                  number;
    key_type_trade:         null;
    department_id:          null;
    city:                   null;
    email_seller:           null;
    phone_seller:           null;
}

export interface GetTypeRequest {
    id_request:   number;
    name_request: string;
    user_admin:   string;
    state:        string;
    created_at:   Date;
    updated_at:   Date;
}

export interface Patient {
    id:                number;
    firstname:         string;
    middlename:        string;
    first_surname:     string;
    key_type_document: number;
    document:          string;
    address:           string;
    phone:             string;
    email:             string;
    key_locality:      number;
    key_department:    number;
    key_municipality:  number;
    genre:             string;
    birthdate:         Date;
    created_at:        Date;
    updated_at:        Date;
    second_surname:    string;
    contact_phone:     string;
    marital_status:    string;
    age:               string;
    department:        TypeService;
    type_document:     GetProducts;
}

export interface TypeService {
    id:               number;
    name:             string;
    active_locality?: number;
    created_at:       Date;
    updated_at:       Date;
}

export interface RevisionSystem {
    id:                          number;
    osteoarticular:              string;
    gastrointestinal:            string;
    cardiovascular:              string;
    respiratory:                 string;
    muscular:                    string;
    urinary:                     string;
    endocrine:                   string;
    skin_fan:                    string;
    lymphatic:                   string;
    neurological:                string;
    vaccination_status:          null;
    name_vaccination:            null;
    dose:                        null;
    date_time_vaccination_doses: null;
    key_history:                 number;
    created_at:                  Date;
    updated_at:                  Date;
    others:                      string;
    digestive_system:            string;
    locomotor_system:            string;
    dermatological:              string;
    gynecological:               string;
    otorhinolaryngological:      string;
    dental:                      string;
    psychiatric_psychological:   string;
}