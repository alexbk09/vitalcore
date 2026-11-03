export interface quotesConsult {
    startappointment: Date;
    contracted_id: number;
    is_date_control: boolean;
    modality_date_control: string;
    patient_campus: string;
}

export interface OrdersServicesQuotes {
    id_history:            number;
    startdate:             Date;
    enddate:               Date;
    startappointment:      Date;
    endappointment:        Date;
    end_consultation:      null;
    id_order_services:     null;
    user_phone:            string;
    user_phone_2:          null;
    date_control:          Date;
    patient:               Patient;
    order_services:        null;
    trade_agreement:       TradeAgreement;
    mission_company:       MissionCompany;
    status_history:        HistoryProduct;
    date_control_product:  null;
    history_product:       HistoryProduct;
    technical_sheet:       TechnicalSheet;
    work_address:          string;
    modality_date_control: string;
}

export interface HistoryProduct {
    id:          number;
    description: string;
    state?:      string;
    created_at:  Date;
    updated_at:  Date;
    code?:       string;
    color?:      string;
}

export interface MissionCompany {
    id:   number;
    name: string;
}

export interface Patient {
    id:               number;
    firstname:        string;
    middlename:       string;
    first_surname:    string;
    second_surname:   string;
    phone:            null;
    email:            string;
    address:          string;
    age:              string;
    birthdate:        Date;
    contact_phone:    string;
    key_department:   number;
    key_locality:     number;
    key_municipality: number;
    type_document:    HistoryProduct;
    document:         string;
    genre:            string;
    marital_status:   string;
    zone:             string;
    patient_ward:     string;
}

export interface TechnicalSheet {
    address_of_residence: string;
    reason_consultation:  null;
}

export interface TradeAgreement {
    id_transfer:     number;
    name_agreements: string;
}

export interface QuoteHistory {
    id_history: number;
    status_history: number,
    key_product: number;
    startdate : Date;
    key_doctor: number;
}