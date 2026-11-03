export interface AgreementData {
  id_transfer: number;
  name_agreements: string;
  type_ID_client: number;
  number_ID_client: number;
  surname_client: string;
  second_surname_client: string;
  name_client: string;
  second_name_client: string;
  department_client: number;
  city_client: string;
  precinct_client: string;
  direction_client: string;
  email_client_client: string;
  mobile_client: string;
  phone_client: string;
  zone_client: string;
  surname_seller: string;
  second_surname_seller: string;
  name_seller: string;
  second_name_seller: string;
  number_ID_seller: string;
  email_seller: string;
  phone_seller: string;
  email_billing: string;
  tuition_billing: string;
  taxpayer_billing: string;
  tax_details: string;
  tax_customer_exchange: string;
  state: string;
  contracted: ContractedData[];
}

export interface Georefence {
  id: number;
  description: string;
  key_trade_agreement: number;
  created_at: Date;
  updated_at: Date;
  sede_id: string;
}

export interface MissionCompany {
  id: number;
  name: string;
  address: null;
  document: string;
  key_trade_agreement: number;
  type_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface AgreementReplacement {
  name: string;
  id: number;
  mission_company: MissionCompany[];
}

export interface GeoreferencingData {
  id: number;
  description: string;
  key_trade_agreement: number;
  created_at: Date;
  updated_at: Date;
  sede_id: string;
  id_seat: number;
  name_seat: string;
  user_admin: string;
  state: string;
  address: string;
  qualification: string;
  email: string;
  phone: string;
  cellphone: string;
}


export interface SeatData {
  seat_id: string;
  contracted_id: number;
  trade_agreement_id: MissionCompany[];
}
export interface AgreementDataFront {
  id_transfer: number;
  name_agreements: string;
  type_ID_client: number;
  number_ID_client: number;
  surname_client: string;
  second_surname_client: string;
  name_client: string;
  second_name_client: string;
  department_client: number;
  city_client: string;
  precinct_client: string;
  direction_client: string;
  email_client_client: string;
  mobile_client: string;
  phone_client: string;
  zone_client: string;
  surname_seller: string;
  second_surname_seller: string;
  name_seller: string;
  second_name_seller: string;
  number_ID_seller: string;
  email_seller: string;
  phone_seller: string;
  email_billing: string;
  tuition_billing: string;
  taxpayer_billing: string;
  tax_details: string;
  tax_customer_exchange: string;
  state: string;
  contracted: ContractedData[];
}

export interface ContractedData {
  contract_number: string;
  is_active: boolean;
  email: string;
  billing_close_day: Date;
  billing_from_day: Date;
  billing_to_day: Date;
  plan_cover_benefits_id: PlanCoverBenefitsID;
  modality_hiring_payment_id: ModalityHiringPaymentID;
  is_date_control: boolean;
  id: number;
  trade_agreement: TradeAgreement;
}

export interface ContractedDataServe {
    id:                         number;
    contract_number:            string;
    is_active:                  boolean;
    email:                      string;
    billing_close_day:          Date;
    billing_from_day:           Date;
    billing_to_day:             Date;
    plan_cover_benefits_id:     PlanCoverBenefitsID;
    modality_hiring_payment_id: ModalityHiringPaymentID;
    is_date_control:            boolean;
    key_user_id:                KeyUserID;
    trade_agreement:            TradeAgreement;
    created_at:                 Date;
    updated_at:                 Date;
}

export interface KeyUserID {
    id:   number;
    name: string;
}

export interface ModalityHiringPaymentID {
    id:         number;
    name:       string;
    status:     boolean;
    created_at: Date;
    updated_at: Date;
}

export interface PlanCoverBenefitsID {
    id:     number;
    name:   string;
    status: boolean;
}

export interface TradeAgreement {
    id_transfer:            number;
    name_agreements:        string;
    number_contract:        string;
    billing:                null;
    email_billing:          string;
    days_to_pay:            null;
    validity_since:         null;
    validity_until:         null;
    email:                  null;
    coverage:               null;
    modality:               null;
    generate_rips:          null;
    type_ID_client:         string;
    number_ID_client:       string;
    dv_client:              null;
    surname_client:         string;
    second_surname_client:  string;
    name_client:            string;
    second_name_client:     string;
    zone_client:            string;
    direction_client:       string;
    precinct_client:        string;
    municipality_client:    null;
    mobile_client:          string;
    phone_client:           string;
    email_client_client:    string;
    type_ID_seller:         null;
    number_ID_seller:       string;
    dv_seller:              null;
    surname_seller:         string;
    second_surname_seller:  string;
    name_seller:            string;
    second_name_seller:     string;
    tuition_billing:        string;
    taxpayer_billing:       string;
    regime_billing:         null;
    responsibility_billing: null;
    user_admin:             string;
    created_at:             Date;
    updated_at:             Date;
    state:                  string;
    key_type_trade:         null;
    department_id:          null;
    city:                   null;
    email_seller:           null;
    phone_seller:           null;
    tax_customer_exchange:  null;
    tax_details:            null;
    city_client:            null;
}

export interface SeatContracted {
    id:     number;
    seat_id:   string;
    contracted_id: number;
    trade_agreement_id: number;
}

export interface GeoreferencingContracted {
    id:     number;
    description: string;
    key_trade_agreement: number;
    created_at: Date;
    updated_at: Date;
    sede_id: string;
}

export interface Contant {
  key_trade_agreement: number;
  contracted_id: number;
  name: string;
  charge: string;
  phone: string;
  email: string;
  id: number;
}

export interface ProductData {
  code: string,
  description: string,
  current_price: number,
  amount: number,
  percentage: number,
  key_trade_agreement: number,
  contracted_id: number,
  id: number,
  key_type: number,
}

export interface ProductFront {
  name: string,
  type_id: number,
  document: string,
  key_trade_agreement: number,
  contracted_id: number,
  id: number,
}

export interface ProductDataServe {
  name: string,
  type_id: number,
  document: string,
  key_trade_agreement: number,
  contracted_id: number,
  id: number,
}

export interface DocumentsServe {
  contracted_id: number;
  file: string;
  id: number;
}
export interface DocumentsFront {
  contracted_id: number;
  file: string;
  id: number;
}

export interface PackagesFront {
  key_trade: number;
  name: string;
  status: string;
  amount_manual: number;
  items: number;
  contracted_id: number;
  id: number;
  children: Child[];
}

export interface Child {
  id:                     number;
  key_package_per_charge: number;
  qty:                    number;
  price:                  string;
  total:                  string;
  created_at:             Date;
  updated_at:             Date;
  key_code:               string;
  type_package:           null;
  name_item:              string;
}

