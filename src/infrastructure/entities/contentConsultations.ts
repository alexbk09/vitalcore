export interface Benefits {
  id: number;
  name: string;
  status: string;
}

export interface Payment {
  id: number;
  name: string;
  status: string;
}

export interface Billing {
  id: number;
  name: string;
  status: string;
  path: string;
  file: string;
}

export interface Follow {
  id:           number;
  key_history:  number;
  key_user:     number;
  conversation: string;
  created_at:   Date;
  updated_at:   Date;
  user:         User;
}

export interface User {
  name:      string;
  last_name: string;
  id:        number;
}

export interface DepartmentData {
    id:              number;
    name:            string;
    active_locality: number;
    created_at:      Date;
    updated_at:      Date;
}

export interface MunicipalityData {
    id:             number;
    name:           string;
    key_department: number;
    created_at:     Date;
    updated_at:     Date;
}

export interface LocalityData {
    id:             number;
    name:           string;
    key_department: number;
    created_at:     Date;
    updated_at:     Date;
}

export interface TypeDocumentsData {
    id:          number;
    code:        string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
}


export interface VehicleSelect {
    id:    number;
    name:  string;
    key_sede:      number;
}

export interface SeatSelect {
    id:       number;
    name:     string;
}

export interface RequestSelect {
    id:   number;
    name: string;
}

export interface EventsSelect {
    id:   number;
    name: string;
}

export interface ProductSelect {
    id:          number;
    description: string;
    state:       string;
    created_at:  Date;
    updated_at:  Date;
}

export interface DoctorData {
    id:                  number;
    user_name:           string;
    email:               string;
    corporate_mail:      string;
    second_name:         null;
    second_surname:      string;
    start_date:          Date;
    phone:               string;
    name:                string;
    last_name:           string;
    t_identication:      string;
    identication:        string;
    direction:           string;
    city:                string;
    country:             string;
    p_code:              string;
    rol:                 string;
    state:               string;
    user_admin:          string;
    created_at:          Date;
    updated_at:          Date;
    error_login:         number;
    cellphone:           string;
    birthdate:           Date;
    civil_status:        string;
    gender:              string;
    expedition_date:     Date;
    expiration_place:    string;
    signature:           string;
    key_speciality:      null;
    type_user:           number;
    key_trade_agreement: number;
    id_rol_pri:          number;
    rol_key:             string;
    rol_privilegies:     string;
}

export interface DriverData {
    id:                  number;
    user_name:           string;
    email:               string;
    corporate_mail:      string;
    second_name:         null;
    second_surname:      string;
    start_date:          Date;
    phone:               string;
    name:                string;
    last_name:           string;
    t_identication:      string;
    identication:        string;
    direction:           string;
    city:                string;
    country:             string;
    p_code:              string;
    rol:                 string;
    state:               string;
    user_admin:          string;
    created_at:          Date;
    updated_at:          Date;
    error_login:         number;
    cellphone:           string;
    birthdate:           Date;
    civil_status:        string;
    gender:              string;
    expedition_date:     Date;
    expiration_place:    string;
    signature:           string;
    key_speciality:      null;
    type_user:           number;
    key_trade_agreement: number;
    id_rol_pri:          number;
    rol_key:             string;
    rol_privilegies:     string;
}

export interface ConsulterDataServe {
    id_cups:     number;
    code:        string;
    description: string;
    price:       string;
    type_cups:   string;
    type_rips:   string;
    user_admin:  string;

}

export interface ConsulterDataFront {
    id_cups:     number;
    code:        string;
    description: string;
    price:       string;
    type_cups:   string;
    type_rips:   string;
    user_admin:  string;

}

export interface MedicineDataFront {
    id:     number;
    code:        string;
    description: string;
    price:       string;
    type:   string;
    unidad:  string;
    concentrations: string;
    pos: number;

}
