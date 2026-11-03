import { OrderServiceRequest, OrderOfService } from '../entities/orderService'
import { OrderServiceMapper } from '../mappers/orderService'
import { CrudServices } from "../../utils/crudServices";
import { PaginationMappers } from '../mappers/pagination_mappers';
import { HistoryData } from '../entities/history';

export const getHistoryDataFilter = async (datas: OrderServiceRequest) => {
  try {
    const response = await CrudServices.get(`/orders`, datas, {});
    // Validar que response.content.data sea un array antes de mapear
    const data = PaginationMappers.PaginationToEntity(
      response.content,
      Array.isArray(response.content?.data) ? response.content.data : [],
      OrderServiceMapper.OrderServiceToEntity,
    );
    return data;
  } catch (error) {
    console.error('Error al obtener la información:', error);
    throw error; // Relanzar el error para que pueda ser manejado en otro lugar
  }
};

export const addOrderService = async (data: HistoryData) => {
  const response = await CrudServices.post("/create/patient/history", data, {});
  return response;
};
export const updateOrderService = async (data: HistoryData) => {
  const response = await CrudServices.put(`/patient/history/${data.id}`, data, {},);
  return response;
};
export const getIDOrderService = async (id: string) => {
  const response = await CrudServices.get(`/history/${id}`, {}, {});
  const data = OrderServiceMapper.OrderServiceDetailsToEntity(response.content);
  return data;
};
