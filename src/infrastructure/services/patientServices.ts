import { PatientData } from "../entities/patient";
import { CrudServices } from "../../utils/crudServices";
import { PatientMapper } from "@/infrastructure/mappers/patient";
import { PaginationMappers } from "@/infrastructure/mappers/pagination_mappers";

export const getPatientsData = async (datas) => {
  const response = await CrudServices.get(`/patient/${datas}`, {}, {});
  const data = response.content.map((item: PatientData) => PatientMapper.PatientToEntity(item));
  
  return data;
};