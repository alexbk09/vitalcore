interface OrderServiceValidations {
    n_order: number,
    type_ID_patient: string,
    number_ID_patient: string,
    patient_gender: string,
    first_name: string,
    second_surname: string,
    name_patient: string,
    second_name_patient: string,
    contact_phone: string,
    patient_cell: string,
    email_patient: string,
    companions_email: string,
    direction_patient: string,
    patient_ward: string,
    patient_campus: string,
    eps: string,
    patient_department: string,
    patient_municipality: string,
    patient_location: string,
    zone_patient: string,
    company_payer: string,
    company_geolocation: string,
    company_vehicle: string,
    responsible_director: string,
    company_event: string,
    company_request: string,
    id_mision: string,
    company_procedure: string,
    operator_coordinator: string,
    reporting_user: string,
    user_charge: string,
    user_phone: string,
    user_phone_2:   string,
    copago: string,
    authorization_code: string,
    authorizing_user: string,
    time: string,
    codeTraslate: string,
    observation_general: string,
}

export class OrderServiceValidationsResponse {
  static validateorderService(params: OrderServiceValidations): string | null {
    // Validación de campos obligatorios
    for (const [key, value] of Object.entries(params)) {
      if (!value) {
        // Excepciones para campos con validaciones específicas
        if (['user_phone_2', 'patient_cell', 'copago', 'authorization_code'].includes(key)) {
          continue;
        }
        return `El campo ${key} es obligatorio.`;
      }
    }
    // Si todas las validaciones pasan
    return null;
  }
}