import {
  AgreementData,
  AgreementReplacement,
  GeoreferencingData,
  MissionCompany,
} from "@/infrastructure/entities/agreements";
import { AgreementDataFront, Contant, ContractedData, ContractedDataServe, DocumentsFront, DocumentsServe, GeoreferencingContracted, PackagesFront, ProductData, ProductDataServe, ProductFront, SeatContracted } from "../entities/agreements";

export class AgreementMapper {
  static AgreementToEntity(AgreementData: AgreementData): AgreementDataFront {
    return {
      id_transfer: AgreementData.id_transfer,
      name_agreements: AgreementData.name_agreements,
      type_ID_client: AgreementData.type_ID_client,
      number_ID_client: AgreementData.number_ID_client,
      surname_client: AgreementData.surname_client,
      second_surname_client: AgreementData.second_surname_client,
      name_client: AgreementData.name_client,
      second_name_client: AgreementData.second_name_client,
      department_client: AgreementData.department_client,
      city_client: AgreementData.city_client,
      precinct_client: AgreementData.precinct_client,
      direction_client: AgreementData.direction_client,
      email_client_client: AgreementData.email_client_client,
      mobile_client: AgreementData.mobile_client,
      phone_client: AgreementData.phone_client,
      zone_client: AgreementData.zone_client,
      surname_seller: AgreementData.surname_seller,
      second_surname_seller: AgreementData.second_surname_seller,
      name_seller: AgreementData.name_seller,
      second_name_seller: AgreementData.second_name_seller,
      number_ID_seller: AgreementData.number_ID_seller,
      email_seller: AgreementData.email_seller,
      phone_seller: AgreementData.phone_seller,
      email_billing: AgreementData.email_billing,
      tuition_billing: AgreementData.tuition_billing,
      taxpayer_billing: AgreementData.taxpayer_billing,
      tax_details: AgreementData.tax_details,
      tax_customer_exchange: AgreementData.tax_customer_exchange,
      state: AgreementData.state,
      contracted: AgreementData.contracted
    };
  }

  static AgreementReplacementToEntity(
    AgreementData: AgreementReplacement
  ): AgreementReplacement {
    return {
      name: AgreementData.name_agreements,
      id: AgreementData.id_transfer,
      mission_company: AgreementData.mission_company,
    };
  }

  static GeoreferencingDataToEntity(
    GeoreferencingData: GeoreferencingData
  ): GeoreferencingData {
    return {
      id: GeoreferencingData.id,
      description: GeoreferencingData.description,
      key_trade_agreement: GeoreferencingData.key_trade_agreement,
      created_at: GeoreferencingData.created_at,
      updated_at: GeoreferencingData.updated_at,
      sede_id: GeoreferencingData.sede_id,
    };
  }

  static SeartDataToEntity(
    SeartData: SeatContracted
  ): SeatContracted {
    return {
      id: SeartData.id,
      seat_id: SeartData.seat_id,
      contracted_id: SeartData.contracted_id,
      trade_agreement_id: SeartData.trade_agreement_id,
    };
  }

  static MissionCompanyToEntity(
    MissionCompany: MissionCompany
  ): MissionCompany {
    return {
      id: MissionCompany.id,
      name: MissionCompany.name,
    };
  }

  static ContracteToEntity(ContractedData: ContractedDataServe): ContractedData {
    return {
      contract_number:ContractedData .contract_number ,
      is_active:ContractedData.is_active ,
      email:ContractedData.email ,
      billing_close_day:ContractedData.billing_close_day ,
      billing_from_day:ContractedData.billing_from_day ,
      billing_to_day:ContractedData.billing_to_day ,
      plan_cover_benefits_id:ContractedData.plan_cover_benefits_id ,
      modality_hiring_payment_id:ContractedData .modality_hiring_payment_id ,
      is_date_control:ContractedData.is_date_control ,
      id:ContractedData.id ,
      trade_agreement:ContractedData.trade_agreement ,
    };
  }
  static GeoToEntity(Geo: GeoreferencingContracted): GeoreferencingContracted {
    return {
      id: Geo.id,
      description: Geo.description,
      key_trade_agreement: Geo.key_trade_agreement,
      created_at: Geo.created_at,
      updated_at: Geo.updated_at,
      sede_id: Geo.sede_id,
    };
  }
  static ContactToEntity(ContactData: Contant): Contant {
      return {
        id: ContactData.id,
        name: ContactData.name,
        charge: ContactData.charge,
        email: ContactData.email,
        phone: ContactData.phone,
        contracted_id: ContactData.contracted_id,
        key_trade_agreement: ContactData.key_trade_agreement,
      };
    }

    static ProductToEntity(ProductData: ProductData): ProductData {
      return {
        id: ProductData.id,
        code: ProductData.code,
        description: ProductData.description,
        current_price: ProductData.current_price,
        amount: ProductData.amount,
        percentage: ProductData.percentage,
        contracted_id: ProductData.contracted_id,
        key_trade_agreement: ProductData.key_trade_agreement,
        key_type: ProductData.key_type,
      };
    }

    static MissionsToEntity(MissionsData: ProductDataServe): ProductFront {
      return {
        id: MissionsData.id,
        name: MissionsData.name,
        type_id: MissionsData.type_id,
        document: MissionsData.document,
        contracted_id: MissionsData.contracted_id,
        key_trade_agreement: MissionsData.key_trade_agreement,
      };
    }

    static DocumentsToEntity(Documents: DocumentsServe): DocumentsFront {
      return {
        contracted_id: Documents.contracted_id,
        file: Documents.file,
        id: Documents.id,
      };
    }

    static PackagesToEntity(ProductData: PackagesFront): PackagesFront {
      return {
        key_trade: ProductData.key_trade,
        name: ProductData.name_package,
        status: ProductData.status,
        amount_manual: ProductData.amount_manual,
        items: ProductData.items,
        contracted_id: ProductData.contracted_id,
        id: ProductData.id,
        children: ProductData.children,
      };
    }

}
