import { QuoteHistory, quotesConsult } from "../entities/quotes";
import { CrudServices } from "../../utils/crudServices";
import { MunicipalityData } from "../entities/contentConsultations";
import { ContentConsultationsMapper } from "../mappers/contentConsultations";
import { OrderOfService } from "../entities/orderService";
import { QuotesMapper } from "../mappers/quotes";
import { PaginationMappers } from "../mappers/pagination_mappers";

export const getQuotesConsult = async (content: quotesConsult) => {
  const params = new URLSearchParams();
  
  if (content.startappointment) {
    params.append('startappointment', content.startappointment.toISOString());
  }
  if (content.contracted_id) {
    params.append('contracted_id', content.contracted_id.toString());
  }
  if (content.is_date_control !== undefined) {
    params.append('is_date_control', content.is_date_control.toString());
  }
  if (content.patient_campus) {
    params.append('patient_campus', content.patient_campus);
  }

  const response = await CrudServices.get(`/v2/checkup/appoinment?${params.toString()}`, {}, {});
  const data = PaginationMappers.PaginationToEntity(
    response.content,
    response.content.data,
    QuotesMapper.quotesConsultToEntity
  );
  return data;
};

export const addQuoteHistory = async (data: QuoteHistory) => {
  const response = await CrudServices.post("/v2/checkup/appoinment", data, {});
  return response;
};