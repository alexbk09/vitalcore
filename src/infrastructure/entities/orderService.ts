export interface OrderOfService {
    firstname: string;
    first_surname: string;
    middlename: null;
    document: string;
    id_patient: number;
    name_status: string;
    name_mission_company: string;
    id: number;
    key_history: number;
    key_request: number;
    startdate: Date;
    enddate: Date;
    startappointment: Date;
    endappointment: Date;
    agenda_process: Date;
    end_consultation: Date;
    created_at: Date;
    updated_at: Date;
    id_order_services: number;
    user_phone: string;
    user_phone_2: null;
    key_status: number;
    services: string;
    key_trade_agreement: number;
    get_trade_agreement: GetTradeAgreement;
    contracted_id: number;
    is_date_control: boolean;
}

export interface GetTradeAgreement {
    id_transfer: number;
    name_agreements: string;
}

export interface OrderServiceRequest {
    document?: string;
    key_trade_agreement?: string;
    key_mission_company?: string;
    key_start_date: Date;
    key_end_date: Date;
}

export interface DetailServiceOrder {
    n_order: number,
    key_type_document: number,
    document: string,
    genre: string,
    first_surname: string,
    second_surname: string,
    firstname: string,
    second_name_patient: string,
    contact_phone: string,
    patient_cell: string,
    email: string,
    companions_email: string,
    address: string,
    patient_ward: string,
    patient_campus: string,
    eps: string,
    key_department: number,
    key_municipality: number,
    key_locality: number,
    zone_patient: string,
    patient_diagnosis: string,
    key_trade_agreement: number,
    company_geolocation: string,
    key_vehicle: number,
    driver_apply?: number,
    key_event_type: number,
    key_request: number,
    key_mission_company: number,
    services: string,
    id_user: number,
    reporting_user: string,
    charge_report: string,
    user_phone: string,
    user_phone_2: string,
    copago: number,
    code_authorization: string,
    who_authorizes: string,
    time: number,
    transfer_code: string,
    observation_general: string,
    id: number,
    key_status: number,
    company_type: string,
    description: string,
    quantity: number,
    amount?: number,
    status?: number,
    contracted_id: number,
}