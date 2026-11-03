export interface PatientData {
    id:                number;
    firstname:         string;
    middlename:        string;
    first_surname:     string;
    second_surname:    string;
    phone:             string;
    email:             string;
    address:           string;
    age:               string;
    birthdate:         Date;
    contact_phone:     string;
    key_department:    number;
    key_locality:      number;
    key_municipality:  number;
    key_type_document: number;
    document:          string;
    genre:             string;
    marital_status:    string;
    zone:              string;
    patient_ward:      string;
}