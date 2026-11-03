interface VaccineDataFront {
  id_patient: string;
  bcg: string;
  hepatitis_a: string;
  covid: number;
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

export class HistoryValidationsResponse {
  static validateVaccine(params: VaccineDataFront): string | null {
    // Validación: si covid es diferente de 0, name_vaccine es obligatorio
    if (params.covid !== 0 && (!params.name_vaccine || params.name_vaccine.trim() === "")) {
      return "El nombre de la vacuna es obligatorio si se selecciona una opción de Covid.";
    }
    return null;
  }
}