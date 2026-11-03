import {Benefits,
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
} from '@/infrastructure/entities/contentConsultations';
import { ConsulterDataFront, ConsulterDataServe, MedicineDataFront } from '../entities/contentConsultations';

export class ContentConsultationsMapper {
    static BenefitsToEntity(Benefits: Benefits): Benefits {
        return {
            id: Benefits.id,
            name: Benefits.name,
            status: Benefits.status,
        };
      }
      static PaymentToEntity(Payment: Payment): Payment {
        return {
            id: Payment.id,
            name: Payment.name,
            status: Payment.status,
        };
      }
      static BillingToEntity(Billing: Billing): Billing {
        return {
            id: Billing.id,
            name: Billing.name,
            status: Billing.status,
            file: Billing.path,
            path: Billing.path,
        };
      }
      static FollowToEntity(Follow: Follow): Follow {
        return {
            id: Follow.id,
            key_history: Follow.key_history,
            key_user: Follow.key_user,
            conversation: Follow.conversation,
            created_at: Follow.created_at,
            updated_at: Follow.updated_at,
            user: {
                name: Follow.user.name,
                last_name: Follow.user.last_name,
                id: Follow.user.id
            }
        };
      }
      static DepartmentDataToEntity(DepartmentData: DepartmentData): DepartmentData {
        return {
            id: DepartmentData.id,
            name: DepartmentData.name,
            active_locality: DepartmentData.active_locality,
            created_at: DepartmentData.created_at,
            updated_at: DepartmentData.updated_at
        };
      }
      static MunicipalityDataToEntity(MunicipalityData: MunicipalityData): MunicipalityData {
        return {
            id: MunicipalityData.id,
            name: MunicipalityData.name,
            key_department: MunicipalityData.key_department,
            created_at: MunicipalityData.created_at,
            updated_at: MunicipalityData.updated_at
        };
      }
      static LocalityDataToEntity(LocalityData: LocalityData): LocalityData {
        return {
            id: LocalityData.id,
            name: LocalityData.name,
            key_department: LocalityData.key_department,
            created_at: LocalityData.created_at,
            updated_at: LocalityData.updated_at
        };
      }
      static TypeDocumentsDataToEntity(TypeDocumentsData: TypeDocumentsData): TypeDocumentsData {
        return {
            id: TypeDocumentsData.id,
            description: TypeDocumentsData.description,
            created_at: TypeDocumentsData.created_at,
            updated_at: TypeDocumentsData.updated_at
        };
      }
      static VehicleSelectToEntity(VehicleData: VehicleSelect): VehicleSelect {
        return {
            id: VehicleData.id_vehicle,
            name: VehicleData.name_vehicle,
            key_sede: VehicleData.key_sede,
        };
      }
      static SeatSelectToEntity(SeatData: SeatSelect): SeatSelect {
        return {
            id: SeatData.id_seat,
            name: SeatData.name_seat,
        };
      }
      static RequestSelectToEntity(Request: RequestSelect): RequestSelect {
        return {
            id: Request.id_request,
            name: Request.name_request,
        };
      }
      static EventsSelectToEntity(Events: EventsSelect): EventsSelect {
        return {
            id: Events.id_event,
            name: Events.name_event,
        };
      }
      static ProductSelectToEntity(Product: ProductSelect): ProductSelect {
        return {
            id: Product.id,
            description: Product.description,
        };
      }
      static DoctorDataToEntity(Doctor: DoctorData): DoctorData {
        return {
            id: Doctor.id,
            name: Doctor.name,
            last_name: Doctor.last_name,
        };
      }
      static DriverDataToEntity(Driver: DoctorData): DoctorData {
        return {
            id: Driver.id,
            name: Driver.name,
            last_name: Driver.last_name,
        };
      }
      static ConsulterProOrCupsDataToEntity(Consulter: ConsulterDataServe): ConsulterDataFront {
        return {
            id_cups: Consulter.id_cups,
            code: Consulter.code,
            description: Consulter.description,
            price: Consulter.price,
            type_cups: Consulter.type_cups,
            type_rips: Consulter.type_rips,
            user_admin: Consulter.user_admin,
        };
      }

      static ConsulterProDataToEntity(Consulter: MedicineDataFront): MedicineDataFront {
        return {
            id: Consulter.id,
            code: Consulter.code,
            description: Consulter.description,
            price: Consulter.price,
            type: Consulter.type,
            unidad: Consulter.unidad,
            concentrations: Consulter.concentrations,
            pos: Consulter.pos,
        };
      }
      

}