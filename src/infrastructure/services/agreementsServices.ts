import { CrudServices } from "../../utils/crudServices";
import { AgreementData, AgreementReplacement, GeoreferencingData,MissionCompany } from "@/infrastructure/entities/agreements";
import { AgreementMapper } from "@/infrastructure/mappers/agreement";
import { PaginationMappers } from "@/infrastructure/mappers/pagination_mappers";
import { AgreementDataFront, Contant, ContractedData, ContractedDataServe, DocumentsFront, GeoreferencingContracted, PackagesFront, ProductData, SeatContracted, SeatData } from "../entities/agreements";

export const getAgreementsData = async (datas: AgreementData) => {
  const response = await CrudServices.post(`/get/agreements`, datas, {});
  const data = response.content.map((item: AgreementData) => AgreementMapper.AgreementToEntity(item));
  return data;
};

export const getAgreementsConsultation = async (datas: AgreementReplacement) => {
  const response = await CrudServices.post(`/get/agreements`, datas, {});
  const data = response.content.map((item: AgreementReplacement) => AgreementMapper.AgreementReplacementToEntity(item));
  return data;
};

export const getGeoreferencingData = async (id: number) => {
  try {
    const response = await CrudServices.get(`/georeference/commercial/all/${id}`, {});
    
    // Verificar si response.content existe y es un array
    if (!response.content || !Array.isArray(response.content)) {
      console.warn('La respuesta del servidor no tiene el formato esperado:', response);
      return [];
    }

    const data = response.content.map((item: GeoreferencingData) => AgreementMapper.GeoreferencingDataToEntity(item));
    return data;
  } catch (error) {
    console.error('Error al obtener la información de georreferenciación:', error);
    return []; // Retornar array vacío en caso de error
  }
};

export const getMissionCompanyData = async (id: string) => {
  try {
    const response = await CrudServices.get( `/mission/company/commercial/all/${id}`, {} );

    // Verificar si response.content existe y es un array
    if (!response.content || !Array.isArray(response.content)) {
      console.warn('La respuesta del servidor no tiene el formato esperado:', response);
      return [];
    }

    const data = response.content.map((item: MissionCompany) => AgreementMapper.MissionCompanyToEntity(item));
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    return []; // Retornar array vacío en caso de error
  }
};

export const addAgreements = async (data: AgreementDataFront) => {
  const response = await CrudServices.post("/v2/agreements", data, {});
  return response;
};

export const updateAgreements = async (data: AgreementDataFront) => {
  const response = await CrudServices.put(`/v2/agreements/${data.id_transfer}`, data, {} );
  return response;
};

export const addContracted = async (data: ContractedData) => {
  const response = await CrudServices.post("/v2/contracted", data, {});
  return response;
};

export const updateContracted = async (data: ContractedData) => {
  const response = await CrudServices.put(`/v2/contracted/${data.id}`, data, {} );
  return response;
};

export const getContractedData = async (datas: ContractedData) => {
  try {
    const response = await CrudServices.get(`/v2/contracted/${datas}`, {}, {});
    // Validar que response.content.data sea un array antes de mapear
    const data = PaginationMappers.PaginationToEntity(
      response.content,
      Array.isArray(response.content?.data) ? response.content.data : [], AgreementMapper.ContracteToEntity, );
    return data;
  } catch (error) {
    console.error('Error al obtener la información:', error);
    throw error; // Relanzar el error para que pueda ser manejado en otro lugar
  }
};

export const getAgreementsIDData = async (datas: AgreementData) => {
  try {
    const response = await CrudServices.post(`/get/agreements/${datas}`, {}, {});
    // Validar que response.content.data sea un array antes de mapear
    const data =  AgreementMapper.AgreementToEntity(response.content);
    return data;
  } catch (error) {
    console.error('Error al obtener la información:', error);
    throw error; // Relanzar el error para que pueda ser manejado en otro lugar
  }
};

export const addContractedSeat = async (data: SeatContracted) => {
  const response = await CrudServices.post("/v2/seat/contracted", data, {});
  return response;
};

export const updateContractedSeat = async (data: SeatContracted) => {
  const response = await CrudServices.put(`/v2/seat/contracted/${data}`, data, {} );
  return response;
};

export const addSeat = async (data: SeatData) => {
  const response = await CrudServices.post("/v2/seat/contracted", data, {});
  return response;
};

export const updateSeat = async (data: SeatData) => {
  const response = await CrudServices.put(`/v2/seat/contracted/${data.contracted_id}`, data, {} );
  return response;
};

export const getSeatContentData = async (id: number) => {
  const response = await CrudServices.get(`/v2/seat/contracted/${id}`, {});
  const data = response.content.map((item: SeatContracted) => AgreementMapper.SeartDataToEntity(item));
  return data;
};

export const deleteContrated = async (id: string) => {
  const response = await CrudServices.delete(`/v2/contracted/${id}`, {} );
  return response;
};

export const getContractedtData = async (id: number) => {
  const response = await CrudServices.get(`/v2/contracted/details/${id}`, {});
  const data = AgreementMapper.ContracteToEntity(response.content);
  return data;
};

export const addGeoreferencing = async (data: GeoreferencingContracted) => {
  const response = await CrudServices.post("/georeference", data, {});
  return response;
};

export const getGeoreferencing = async (id: number) => {
  const response = await CrudServices.get(`/georeference/commercial/all/${id}`, {});
  const data = response.content.map((item: GeoreferencingContracted) => AgreementMapper.GeoToEntity(item));
  return data;
};

export const deleteGeoreferencing = async (id: string) => {
  const response = await CrudServices.delete(`/georeference/${id}`, {} );
  return response;
};

export const addContact = async (data: Contant) => {
  const response = await CrudServices.post("/business/contact", data, {});
  return response;
};

export const getContact = async (id: number) => {
  const response = await CrudServices.get(`/business/contact/commercial/${id}`, {});
  const data = response.content.map((item: Contant) => AgreementMapper.ContactToEntity(item));
  return data;
};

export const deleteContact = async (id: string) => {
  const response = await CrudServices.delete(`/business/contact/${id}`, {} );
  return response;
};

export const addProduct = async (data: ProductData) => {
  const response = await CrudServices.post("/contracted/services", data, {});
  return response;
};

export const getProduct = async (id: number) => {
  const response = await CrudServices.get(`/contracted/services?contracted_id=${id}`, {});
  const data = PaginationMappers.PaginationToEntity(
        response.content,
        Array.isArray(response.content?.data) ? response.content.data : [],
        AgreementMapper.ProductToEntity,
      );
  return data;
};

export const deleteProduct = async (id: string) => {
  const response = await CrudServices.delete(`/contracted/services/${id}`, {} );
  return response;
};

export const addMission = async (data: ProductData) => {
  const response = await CrudServices.post("/mission/company", data, {});
  return response;
};

export const getMission = async (id: number) => {
  const response = await CrudServices.get(`/mission/company/commercial/all/${id}`, {});
  const data = response.content.map((item: ProductData) => AgreementMapper.MissionsToEntity(item));
  return data;
};

export const deleteMission = async (id: string) => {
  const response = await CrudServices.delete(`/mission/company/${id}`, {} );
  return response;
};

export const addDocuments = async (data: DocumentsFront) => {
  const response = await CrudServices.post("/v2/document/contracted", data, {});
  return response;
};

export const getDocuments = async (id: number) => {
  const response = await CrudServices.get(`/v2/document/contracted/${id}`, {});
  const data = response.content.map((item: DocumentsFront) => AgreementMapper.DocumentsToEntity(item));
  return data;
};

export const deleteDocuments = async (id: string) => {
  const response = await CrudServices.delete(`/v2/document/contracted/${id}`, {} );
  return response;
};

export const addPackages = async (data: PackagesFront) => {
  const response = await CrudServices.post("/package", data, {});
  return response;
};

export const updatePackages = async (data: PackagesFront) => {
  const response = await CrudServices.put(`/package/${data.id}`, data, {} );
  return response;
};

export const getPackages = async (id: number) => {
  const response = await CrudServices.get(`/package?contracted_id=${id}`, {});
  const data = response.content.map((item: PackagesFront) => AgreementMapper.PackagesToEntity(item));
  return data;
};

export const deletePackages = async (data: PackagesFront) => {
  const response = await CrudServices.delete(`/package/${data.id}`, {} );
  return response;
};