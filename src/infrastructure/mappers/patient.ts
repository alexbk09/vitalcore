import { PatientData } from '../entities/patient';

export class PatientMapper{
    static PatientToEntity(PatientData: PatientData): PatientData {
        return {
            id: PatientData.id,
            firstname: PatientData.firstname,
            middlename: PatientData.middlename,
            first_surname: PatientData.first_surname,
            second_surname: PatientData.second_surname,
            phone: PatientData.phone,
            email: PatientData.email,
            address: PatientData.address,
            age: PatientData.age,
            birthdate: PatientData.birthdate,
            contact_phone: PatientData.contact_phone,
            key_department: PatientData.key_department,
            key_locality: PatientData.key_locality,
            key_municipality: PatientData.key_municipality,
            key_type_document: PatientData.key_type_document,
            document: PatientData.document,
            genre: PatientData.genre,
            marital_status: PatientData.marital_status,
            zone: PatientData.zone,
            patient_ward: PatientData.patient_ward
        };
    }
}