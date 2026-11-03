import { OrdersServicesQuotes, quotesConsult } from "../entities/quotes";

export class QuotesMapper {
    static quotesConsultToEntity(quotesConsult: OrdersServicesQuotes): OrdersServicesQuotes {
        return {
            id_history: quotesConsult.id_history,
            startdate: quotesConsult.startdate,
            enddate: quotesConsult.enddate,
            startappointment: quotesConsult.startappointment,
            endappointment: quotesConsult.endappointment,
            end_consultation: quotesConsult.end_consultation,
            order_services: quotesConsult.order_services,
            user_phone: quotesConsult.user_phone,
            user_phone_2: quotesConsult.user_phone_2,
            date_control: quotesConsult.date_control,
            patient: quotesConsult.patient,
            trade_agreement: quotesConsult.trade_agreement,
            mission_company: quotesConsult.mission_company,
            status_history: quotesConsult.status_history,
            id_order_services: quotesConsult.id_order_services,
            work_address: quotesConsult.work_address,
            modality_date_control: quotesConsult.modality_date_control,
            technical_sheet: quotesConsult.technical_sheet,
            date_control_product: quotesConsult.date_control_product,
            history_product: quotesConsult.history_product,
        };
    }
}