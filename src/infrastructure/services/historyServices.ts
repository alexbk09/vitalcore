import { HistoryData,HistoryRequest, RecordDataFront, RecordDataServer, RecordSave, TechnicalDataDetails, VaccineDataFront } from "../entities/history";
import { HistoryMapper } from "..//mappers/history";
import { CrudServices } from "../../utils/crudServices";
import { PaginationMappers } from "../mappers/pagination_mappers";


export const getHistoryDataTraffic = async (datas: HistoryRequest) => {
  const response = await CrudServices.get(`/traffic`, datas, {});
  const data = Array.isArray(response.content)
    ? response.content.map((item: HistoryData) => HistoryMapper.HistoryToEntity(item))
    : []; 
  return data;
};

export const getHistoryService = async (id: string) => {
  const response = await CrudServices.get(`/history/${id}`, {}, {});
  const data = HistoryMapper.HistoryToEntity(response.content);
  return data;
};

export const addVaccination = async (data: VaccineDataFront) => {
  const response = await CrudServices.post("/vaccination", data, {});
  return response;
};
export const updateVaccination = async (data: VaccineDataFront) => {
  const response = await CrudServices.put(`/vaccination/${data.patient_id}`, data, {},);
  return response;
};
export const getVaccination = async (id: string) => {
  const response = await CrudServices.get(`/vaccination/${id}`, {}, {});
  const data = HistoryMapper.VaccineToEntity(response.content);
  return data;
};

export const addRecord = async (data: RecordSave) => {
  const response = await CrudServices.post("/histories/patient", data, {});
  return response;
};
export const getRecord = async (search: string) => {
  const response = await CrudServices.get(`/histories/patient?patient=${search}`, {}, {});
  const data = response.content.map((item: RecordDataServer) =>
      HistoryMapper.RecordToEntity(item)
    );
  return data;
};

export const addTechnical = async (query: TechnicalDataDetails) => {
  const response = await CrudServices.post(`/technical/sheet/patient/${query.key_patient}/history/${query.key_history}`, query, {});
  return response;
};
export const updateTechnical = async (query: TechnicalDataDetails) => {
  const response = await CrudServices.put(`/technical/sheet/patient/${query.key_patient}/history/${query.key_history}`, query, {});
  const data = response
  return data;
};