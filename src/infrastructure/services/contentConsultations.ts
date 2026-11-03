import { CrudServices } from "../../utils/crudServices";
import { ContentConsultationsMapper } from "@/infrastructure/mappers/contentConsultations";
import {
  Benefits,
  Payment,
  Billing,
  Follow,
  DepartmentData,
  MunicipalityData,
  LocalityData,
  TypeDocumentsData,
  VehicleSelect,
  SeatSelect,
  RequestSelect,
  EventsSelect,
  ProductSelect,
  DoctorData
} from "@/infrastructure/entities/contentConsultations";
import { ConsulterDataFront, DriverData, MedicineDataFront } from "../entities/contentConsultations";

// Benefits
export const addBenefits = async (data: Benefits) => {
  const response = await CrudServices.post("/plan/cover/benefits", data, {});
  return response;
};
export const updateBenefits = async (data: Benefits) => {
  const response = await CrudServices.put(
    `/plan/cover/benefits/${data.id}`,
    data,
    {}
  );
  return response;
};
export const getBenefits = async () => {
  try {
    const response = await CrudServices.get(`/plan/cover/benefits`, {});
    
    const data = response.content.data.map((item: Benefits) =>
      ContentConsultationsMapper.BenefitsToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const deleteBenefits = async (id: string) => {
  const response = await CrudServices.delete(`/plan/cover/benefits/${id}`, {});
  return response;
};
export const addPayment = async (data: Payment) => {
  const response = await CrudServices.post(
    "/modality/hiring/payment",
    data,
    {}
  );
  return response;
};
export const updatePayment = async (data: Payment) => {
  const response = await CrudServices.put(
    `/modality/hiring/payment/${data.id}`,
    data,
    {}
  );
  return response;
};
export const getPayment = async () => {
  try {
    const response = await CrudServices.get(`/modality/hiring/payment`, {});
    
    const data = response.content.data.map((item: Payment) =>
      ContentConsultationsMapper.PaymentToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const deletePayment = async (id: string) => {
  const response = await CrudServices.delete(
    `/modality/hiring/payment/${id}`,
    {}
  );
  return response;
};
export const addBilling = async (data: Billing) => {
  const response = await CrudServices.post("/manual/billing", data, {});
  return response;
};
export const updateBilling = async (data: Billing) => {
  const response = await CrudServices.put(
    `/manual/billing/${data.id}`,
    data,
    {}
  );
  return response;
};
export const getBilling = async () => {
  try {
    const response = await CrudServices.get(`/manual/billing`, {});
    
    const data = response.content.data.map((item: Billing) =>
      ContentConsultationsMapper.BillingToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const deleteBilling = async (id: string) => {
  const response = await CrudServices.delete(`/manual/billing/${id}`, {});
  return response;
};
export const followUpGet = async (id: string) => {
  try {
    const response = await CrudServices.get(`/follow/up/call/${id}`, {}, {});
    const data = response.content.map((item: Follow) =>
      ContentConsultationsMapper.FollowToEntity(item)
    );
    return data;
  } catch (error) {
    console.error("Error al generar el archivo pdf:", error);
    throw error;
  }
};
export const savefollowUp = async (data: Follow) => {
  const response = await CrudServices.post("/follow/up/call", data, {});
  return response;
};
export const getTypeDocuments = async () => {
  try {
    const response = await CrudServices.get(`/type_document`, {});
    
    const data = response.content.map((item: TypeDocumentsData) =>
      ContentConsultationsMapper.TypeDocumentsDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const getDepartmentData = async () => {
  try {
    const response = await CrudServices.get(`/departments`, {});
    
    const data = response.content.map((item: DepartmentData) =>
      ContentConsultationsMapper.DepartmentDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
}
export const getMunicipalityData = async (id: string) => {
  try {
    const response = await CrudServices.get(
      `/municipalities/${id}`,
      {}
    );
    
    const data = response.content.map((item: MunicipalityData) =>
      ContentConsultationsMapper.MunicipalityDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const getLocalityData = async (id: string) => {
  try {
    const response = await CrudServices.get(
      `/departments/${id}/localities`,
      {}
    );
    
    const data = response.content.map((item: LocalityData) =>
      ContentConsultationsMapper.LocalityDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const getSeatData = async () => {
  try {
    const response = await CrudServices.post(`/get/seats`, {});
    
    const data = response.content.data.map((item: SeatSelect) =>
      ContentConsultationsMapper.SeatSelectToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
}
export const getVehicleData = async (id: string) => {
  try {
    const response = await CrudServices.post(
      `/get/vehicle?key_sede=${id}`,
      {}
    );
    
    const data = response.content.data.map((item: VehicleSelect) =>
      ContentConsultationsMapper.VehicleSelectToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const getRequestData = async () => {
  try {
    const response = await CrudServices.post(`/get/request`, {});
    
    const data = response.content.map((item: RequestSelect) =>
      ContentConsultationsMapper.RequestSelectToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const getEventsData = async () => {
  try {
    const response = await CrudServices.post(`/get/event`, {});
    
    const data = response.content.data.map((item: EventsSelect) =>
      ContentConsultationsMapper.EventsSelectToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const getProductData = async () => {
  try {
    const response = await CrudServices.get(`/products`, {});
    
    const data = response.content.map((item: ProductSelect) =>
      ContentConsultationsMapper.ProductSelectToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};
export const getDoctorData = async () => {
  try {
    const response = await CrudServices.get(`/get/users/doctor`, {});
    
    const data = response.content.map((item: DoctorData) =>
      ContentConsultationsMapper.DoctorDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};

export const getDriverData = async (id: string) => {
  try {
    const response = await CrudServices.get(`/get/users/type/${id}`, {});
    
    const data = response.content.map((item: DriverData) =>
      ContentConsultationsMapper.DriverDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};


export const getConsulterCupsData = async (id: string) => {
  try {
    const response = await CrudServices.get(`/get/consultercups?busquedaCups=${id}`,  {} );
    
    const data = response.content.data.map((item: ConsulterDataFront) =>
      ContentConsultationsMapper.ConsulterProOrCupsDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    throw error;
  }
};

export const getConsulterProData = async (id: string) => {
  try {
    const response = await CrudServices.get(`/medicine?search=${id}`, {});
    
    if (!response || !response.content) {
      console.warn('La respuesta de la API no tiene el formato esperado.');
      return [];
    }
    
    const data = response.content.map((item: MedicineDataFront) =>
      ContentConsultationsMapper.ConsulterProDataToEntity(item)
    );
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los tipos de motivo de la solicitud:",
      error
    );
    return [];
  }
};

