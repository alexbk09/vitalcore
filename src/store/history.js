import auth from "./../auth/auth";
import { API_URL } from "./../config/global.js";
import { createElements } from "./../services/history.service.js";
const onLine = false;
const History = {
  namespaced: true,
  state: {
    totalDurationMinutes: 20,
    historyID: {},
    historyEmty: [],
    systemID: [],
    technicalID: [],
    stytemRevision: [],
    technical: [],
    physicalExam: [],
    physicalExamID: [],
    cie: [],
    diagnostic: [],
    anality: [],
    job: [],
    evolution: [],
    record: [],
    medicine: [],
    historyOrders: [],
    supply: [],
    imcapacities: [],
    remission: [],
    vaccination: {
      bcg: 0,
      hepatitis_a: 0,
      covid: 0,
      neumococo: 0,
      pentavalente: 0,
      polio: 0,
      rotavirus: 0,
      td_tt_woman: 0,
      vph: 0,
      schema_year: 0,
      name_vaccine: "",
    },
    gynecology: {
      menarche: "No Aplica",
      caesareanSections: 0,
      cycles: "No Aplica",
      stillbirths: 0,
      gravida: "No Aplica",
      livingChildren: 0,
      deliveries: 0,
      datesLastMenstruation: "No Aplica",
      abortions: 0,
      planning: "No Aplica",
      pregnant: 0,
      gestational_age: 0,
      date_cytology: "",
      cytology_observation: "",
    },
    disclaimer: [],
    status: [],
    procedures: [],
    typeService: [],
    signature: [],
    serviceGroup: [],
    procedureFodicalized: [],
    lunchBox: [],
  },
  getters: {
    getTotalDurationMinutes(state) {
      return state.totalDurationMinutes;
    },
    gethistory(state) {
      return state.historyID;
    },
    getSystemRevision(state) {
      return {
        status: state.status,
        content: state.stytemRevision,
      };
    },
    gettechnical(state) {
      return {
        status: state.status,
        content: state.technical,
      };
    },
    getPhysicalExam(state) {
      return state.physicalExam;
    },
    getCie10(state) {
      return state.cie;
    },
    getmedicine(state) {
      return state.medicine;
    },
    getsupply(state) {
      return state.supply;
    },
    getDiagnostic(state) {
      return state.diagnostic;
    },
    getanality(state) {
      return state.anality;
    },
    getjobrecommendation(state) {
      return state.job;
    },
    getevolution(state) {
      return state.evolution;
    },
    getrecord(state) {
      return state.record;
    },
    getHistoryOrders(state) {
      return state.historyOrders;
    },
    getIncapacities(state) {
      return state.imcapacities;
    },
    getRemission(state) {
      return state.remission;
    },
    getVaccination(state) {
      return state.vaccination;
    },
    getGynecology(state) {
      return state.gynecology;
    },
    getDisclaimer(state) {
      return state.disclaimer;
    },
    getStatus(state) {
      return state.status;
    },
    getProceduresHistory(state) {
      return state.procedures;
    },
    getTypeServices(state) {
      return state.typeService;
    },
    getSignature(state) {
      return state.signature;
    },
    getServiceGroup(state) {
      return state.serviceGroup;
    },
    getProcedureFodicalized(state) {
      return state.procedureFodicalized;
    },
    getLunchBox(state) {
      return state.lunchBox;
    },
  },
  mutations: {
    setTotalDurationMinutes(state, data) {
      state.totalDurationMinutes = data;
    },
    setOrders(state, data) {
      if (data.status) {
        state.historyID = data.content.data;
      }
    },
    setOrdersID(state, data) {
      if (data.status) {
        /* let struct = {
          key_patient: data.content.patient.id,
          key_history: data.content.id,
          date_Technical: data.content.created_at,
          department_Technical: data.content.patient.department.id,
          patient_municipality: data.content.patient.key_municipality,
          patient_location: data.content.patient.key_locality,
          geolocation_Technical: data.content.get_georeference ? data.content.get_georeference.description : "SIN GEOLOCALIZACIÓN",
          services_Technical: data.content.services,
          services_name: data.content.get_products.description,
          agreement_Technical: data.content.get_trade_agreement.name_agreements,
          mision_Technical: data.content.get_mission_company.name,
          //Datos del Cliente
          typeID_Technical: data.content.patient.type_document.id,
          IDPatient_Technical: data.content.patient.document,
          firstname_Technical: data.content.patient.firstname,
          middlename_Technical: data.content.patient.middlename,
          first_surname_Technical: data.content.patient.first_surname,
          second_surname_Technical: data.content.patient.second_surname,
          typeRequest_Technical: data.content.get_type_request.id_request,
          genre_Technical: data.content.patient.genre,
          phone_Technical: data.content.patient.phone,
          authorizationCode_Technical: !data.content.code_authorization || data.content.code_authorization === "undefined" ? "" : data.content.code_authorization,
          initialDate_Technical: data.content.startdate,
          diagnosis_Technical: data.content.observations,
          email_Technical: data.content.patient.email,
          video: data.content.video,
          status: data.content.key_status,
          copago: data.content.copago,
          companions_email_Technical: data.content.companions_email,
          companions_phone_Technical: !data.content.user_phone_2 || data.content.user_phone_2 === "null" ? "" : data.content.user_phone_2 ,
          birthDate_Technical: data.content.patient.birthdate,
          key_event_type: data.content.key_event_type,
          key_type_service: data.content.key_type_service ? data.content.key_type_service === "" : 0,
          observations_type_services: data.content.observations_type_services,
          key_request: data.content.key_request,
          key_request_order: data.content.key_request_order,
          id_order_services: data.content.id_order_services,
          signature: data.content.signature_patient,
          get_physical_exam: data.content.get_physical_exam,
        }; */

        state.historyID = data.content; //
      }
    },
    setOrdersDeleteID(state, data) {
      const diagnostic = state.historyID.get_diagnostic_history.filter(item => item.id != data); //
      state.historyID.get_diagnostic_history = diagnostic;
    },
    setSystemRevisionID(state, data) {
      if (data.status) {
        let struct = {
          osteoarticular_Revision: data.content.osteoarticular,
          gastrointestinal_Revision: data.content.gastrointestinal,
          cardiovascular_Revision: data.content.cardiovascular,
          respiratorio_Revision: data.content.respiratory,
          muscular_Revision: data.content.muscular,
          urinario_Revision: data.content.urinary,
          piel_faneras_Revision: data.content.skin_fan,
          linfatico_Revision: data.content.lymphatic,
          endocrine: data.content.endocrine,
          neurológico_Revision: data.content.neurological,
          others: data.content.others
            ? data.content.others == "undefined"
              ? "NO REFIERE ALTERACIÓN"
              : data.content.others
            : data.content.others,
          estado_vacunación_Revision: data.content.vaccination_status,
          nombre_vacunación_Revision: data.content.name_vaccination,
          dosis_Revision: data.content.dose,
          fecha_horas_dosis_Revision: data.content.date_time_vaccination_doses,
          digestive_system_Revision: data.content.digestive_system,
          locomotor_system_Revision: data.content.locomotor_system,
          dermatological_Revision: data.content.dermatological,
          gynecological_Revision: data.content.gynecological,
          otorhinolaryngological_Revision: data.content.otorhinolaryngological,
          dental: data.content.dental,
          psychiatric_psychological: data.content.psychiatric_psychological,
        };
        state.status = data.status;
        state.stytemRevision = struct;
      }
    },
    setSystemRevisionIDEmty(state) {
      let struct = {
        osteoarticular_Revision: "NO REFIERE ALTERACIÓN",
        gastrointestinal_Revision: "NO REFIERE ALTERACIÓN",
        cardiovascular_Revision: "NO REFIERE ALTERACIÓN",
        respiratorio_Revision: "NO REFIERE ALTERACIÓN",
        muscular_Revision: "NO REFIERE ALTERACIÓN",
        urinario_Revision: "NO REFIERE ALTERACIÓN",
        piel_faneras_Revision: "NO REFIERE ALTERACIÓN",
        linfatico_Revision: "NO REFIERE ALTERACIÓN",
        endocrine: "NO REFIERE ALTERACIÓN",
        neurológico_Revision: "NO REFIERE ALTERACIÓN",
        estado_vacunación_Revision: "",
        nombre_vacunación_Revision: "",
        dosis_Revision: "",
        fecha_horas_dosis_Revision: "",
        digestive_system_Revision: "NO REFIERE ALTERACIÓN",
        locomotor_system_Revision: "NO REFIERE ALTERACIÓN",
        dermatological_Revision: "NO REFIERE ALTERACIÓN",
        gynecological_Revision: "NO REFIERE ALTERACIÓN",
        otorhinolaryngological_Revision: "NO REFIERE ALTERACIÓN",
        dental: "NO REFIERE ALTERACIÓN",
        psychiatric_psychological: "NO REFIERE ALTERACIÓN",
      };
      state.status = false;
      state.stytemRevision = struct;
    },
    sethistory(state, data) {
      if (data.status) {
        state.historyID = data.content;
      }
    },
    sethistoryEmpty(state) {
      state.historyID = [];
    },
    setSystem(state) {
      state.systemID = [];
    },
    setTechnical(state, data) {
      if (data.status) {
        let struct = {
          charge_Technical: data.content.charge,
          jobFunctions_Technical: data.content.job_functions,
          residenceAddress_Technical: data.content.patient.address,
          companyTime_Technical: data.content.time_of_service,
          /* responsibleName_Technical: data.content.name_respondible, */
          relationship_Technical: data.content.relationship,
          companionsName_Technical: data.content.name_accompanying,
          passengerPhone_Technical: data.content.companion_phone,
          reasonConsultation_Technical:
            !data.content.reason_consultation ||
              data.content.reason_consultation === "undefined"
              ? ""
              : data.content.reason_consultation,
          currentIllness_Technical:
            !data.content.current_disease ||
              data.content.current_disease === "undefined"
              ? ""
              : data.content.current_disease,
          typeCare_Technical: data.content.type_of_attention,
          typeCareDisease_Technical: data.content.category_type_attention,
          typeCareAccident_Technical: data.content.category_type_attention,
          typeCareOther_Technical: data.content.category_type_attention,
          civilStatus_Technical: data.content.marital_status,
          birthDate_Technical: data.content.birthdate,
          workAddress_Technical: data.content.work_address,
          workCity_Technical: data.content.work_city,
          companions_email_Technical: data.content.companions_email,
          age_Technical: data.content.age,
          companions_phone_Technical: data.content.companions_phone,
        };
        if (struct.typeCare_Technical === 1) {
          struct.typeCareDisease_Technical =
            data.content.category_type_attention;
        }
        if (struct.typeCare_Technical === 2) {
          struct.typeCareAccident_Technical =
            data.content.category_type_attention;
        }
        if (struct.typeCare_Technical === 3) {
          struct.typeCareOther_Technical = data.content.category_type_attention;
        }
        state.status = data.status;
        state.technical = struct;
      }
    },
    setTechnicalEmty(state) {
      state.status = false;
      state.technical = [];
    },
    /* setPhysicalExam(state) {
      state.physicalExam = [];
    }, */
    setPhysicalExamID(state, data) {
      /* <<<<<<< Updated upstream */
      if (data.status && data.content) {
        let physicalExamData = data.content;
        let struct = {
          Generalaspect_PhysicalExam: physicalExamData.general_aspect,
          systolic_PhysicalExam: physicalExamData.systolic,
          diastolic_PhysicalExam: physicalExamData.diastolic,
          FCardiac_PhysicalExam: physicalExamData.f_cardiac,
          FRespiratory_PhysicalExam: physicalExamData.f_respiratory,
          satao2_PhysicalExam: physicalExamData.saturation,
          Temperature_PhysicalExam: physicalExamData.temperature,
          DominantLaterality_PhysicalExam: physicalExamData.dominant_laterality,
          Weight_PhysicalExam: physicalExamData.weight,
          Size_PhysicalExam: physicalExamData.size,
          Abdominalperimeter_PhysicalExam: physicalExamData.abdominal_perimeter,
          AbdominalInterpretation_PhysicalExam:
            physicalExamData.abdominal_interpretation,
          Glasgow_PhysicalExam: physicalExamData.glasgow,
          glucometer_PhysicalExam: physicalExamData.glucometer,
          ECOGindex_PhysicalExam: physicalExamData.index_ecog,
          HEAD_PhysicalExam: physicalExamData.head,
          NECK_PhysicalExam: physicalExamData.neck,
          THORAXANDBREAST_PhysicalExam: physicalExamData.thorax_mama,
          ABDOMEN_PhysicalExam: physicalExamData.abdomen,
          GENITOURINARY_PhysicalExam: physicalExamData.genitourinary,
          MUSCLESKELETAL_PhysicalExam: physicalExamData.skeletal_muscle,
          NERVOUSSYSTEM_PhysicalExam: physicalExamData.nervous_system,
          SKINANDFANS_PhysicalExam: physicalExamData.skin_faneras,
          medium_pressure_PhysicalExam: physicalExamData.medium_pressure,

          back_PhysicalExam: physicalExamData.back,
          extremities_PhysicalExam: physicalExamData.extremities,
          genitals_PhysicalExam: physicalExamData.genitals,
          nervous_PhysicalExam: physicalExamData.nervous,
          psychism_PhysicalExam: physicalExamData.psych,
          key_history: data.content.key_history,
        };
        state.physicalExam = struct;
      }
    },
    setPhysicalExamEmty(state) {
      let struct = {
        HEAD_PhysicalExam: "Sin evidencia de alteración",
        NECK_PhysicalExam: "Sin evidencia de alteración",
        THORAXANDBREAST_PhysicalExam: "Sin evidencia de alteración",
        ABDOMEN_PhysicalExam: "Sin evidencia de alteración",
        GENITOURINARY_PhysicalExam: "Sin evidencia de alteración",
        MUSCLESKELETAL_PhysicalExam: "Sin evidencia de alteración",
        NERVOUSSYSTEM_PhysicalExam: "Sin evidencia de alteración",
        SKINANDFANS_PhysicalExam: "Sin evidencia de alteración",
        back_PhysicalExam: "Sin evidencia de alteración",
        extremities_PhysicalExam: "Sin evidencia de alteración",
        genitals_PhysicalExam: "Sin evidencia de alteración",
        nervous_PhysicalExam: "Sin evidencia de alteración",
        psychism_PhysicalExam: "Sin evidencia de alteración",
        key_history: "",
      };
      state.status = false;
      state.physicalExam = struct;
    },
    /* =======
      if (data.status && data.content && data.content.get_physical_exam) {
        let physicalExamData = data.content.get_physical_exam;
        let struct = {
          Generalaspect_PhysicalExam: physicalExamData.general_aspect,
          systolic_PhysicalExam: physicalExamData.systolic,
          diastolic_PhysicalExam: physicalExamData.diastolic,
          FCardiac_PhysicalExam: physicalExamData.f_cardiac,
          FRespiratory_PhysicalExam: physicalExamData.f_respiratory,
          satao2_PhysicalExam: physicalExamData.saturation,
          Temperature_PhysicalExam: physicalExamData.temperature,
          DominantLaterality_PhysicalExam: physicalExamData.dominant_laterality,
          Weight_PhysicalExam: physicalExamData.weight,
          Size_PhysicalExam: physicalExamData.size,
          Abdominalperimeter_PhysicalExam: physicalExamData.abdominal_perimeter,
          AbdominalInterpretation_PhysicalExam: physicalExamData.abdominal_interpretation,
          Glasgow_PhysicalExam: physicalExamData.glasgow,
          glucometer_PhysicalExam: physicalExamData.glucometer,
          ECOGindex_PhysicalExam: physicalExamData.index_ecog,
          HEAD_PhysicalExam: physicalExamData.head,
          NECK_PhysicalExam: physicalExamData.neck,
          THORAXANDBREAST_PhysicalExam: physicalExamData.thorax_mama,
          ABDOMEN_PhysicalExam: physicalExamData.abdomen,
          GENITOURINARY_PhysicalExam: physicalExamData.genitourinary,
          MUSCLESKELETAL_PhysicalExam: physicalExamData.skeletal_muscle,
          NERVOUSSYSTEM_PhysicalExam: physicalExamData.nervous_system,
          SKINANDFANS_PhysicalExam: physicalExamData.skin_faneras,
          medium_pressure_PhysicalExam: physicalExamData.medium_pressure,

          back_PhysicalExam: physicalExamData.back,
          extremities_PhysicalExam: physicalExamData.extremities,
          genitals_PhysicalExam: physicalExamData.genitals,
          nervous_PhysicalExam: physicalExamData.nervous,
          psychism_PhysicalExam: physicalExamData.psych,
        };
        state.physicalExam = struct;
      }
    },
    setPhysicalExamEmty(state) {
      let struct = {
        HEAD_PhysicalExam: "Sin evidencia de alteración",
        NECK_PhysicalExam: "Sin evidencia de alteración",
        THORAXANDBREAST_PhysicalExam: "Sin evidencia de alteración",
        ABDOMEN_PhysicalExam: "Sin evidencia de alteración",
        GENITOURINARY_PhysicalExam: "Sin evidencia de alteración",
        MUSCLESKELETAL_PhysicalExam: "Sin evidencia de alteración",
        NERVOUSSYSTEM_PhysicalExam: "Sin evidencia de alteración",
        SKINANDFANS_PhysicalExam: "Sin evidencia de alteración",
        back_PhysicalExam: "Sin evidencia de alteración",
        extremities_PhysicalExam: "Sin evidencia de alteración",
        genitals_PhysicalExam: "Sin evidencia de alteración",
        nervous_PhysicalExam: "Sin evidencia de alteración",
        psychism_PhysicalExam: "Sin evidencia de alteración",
      }
      state.status = false;
      state.physicalExam = struct
    },
>>>>>>> Stashed changes */
    setCie(state, data) {
      if (data.status) {
        state.cie = data.content.data;
      }
    },
    setCieEmpty(state) {
      state.cie = [];
    },
    setDiagnosticEmty(state) {
      state.diagnostic = [];
    },
    setDiagnostic(state, data) {
      if (data.status) {
        state.diagnostic = data.content;
      }
    },
    setanality(state, data) {
      if (data.status) {
        let struct = {
          Analysis_diagnostic: data.content.analysis,
          deathdate_diagnostic: data.content.death_date,
          confirmdeath_diagnostic: data.content.death_confirmed ? 0 : 1,
          control_date: data.content.control_date,
        };
        state.anality = struct;
      }
    },
    setanalityEmty(state, data) {
      if (data.status) {
        let struct = {
          Analysis_diagnostic: "",
          deathdate_diagnostic: "",
          confirmdeath_diagnostic: 1,
          control_date: "",
        };
        state.anality = struct;
      }
    },
    setJob(state, data) {
      if (data.status) {
        data.content.map((job) => {
          job.confirmed = job.confirmed === 1 ? true : false;
          job.description = job.description ? job.description : "";
          job.observation = job.observation ? job.observation : "";
        });

        state.job = data.content;
      }
    },
    setJobEmpty(state) {
      state.job = [];
    },
    setEvolution(state, data) {
      if (data.status) {
        state.evolution = data.content;
      }
    },
    setEvolutionEmpty(state) {
      state.evolution = [];
    },
    setRecord(state, data) {
      if (data.status) {
        data.content.map((record) => {
          record.name = record.name ? record.name : "";
          record.value = record.value ? record.value : "";
        });

        state.record = data.content;
      }
    },
    setMedicine(state, data) {
      if (data.status) {
        state.medicine = data.content;
      }
    },
    setMedicineEmpty(state) {
      state.medicine = [];
    },
    setSupply(state, data) {
      if (data.status) {
        state.supply = data.content;
      }
    },
    setSupplyEmpty(state) {
      state.supply = [];
    },
    setOrderHistory(state, data) {
      if (data.status) {
        state.historyOrders = data.content;
      }
    },
    setOrderHistoryEmpty(state) {
      state.historyOrders = [];
    },
    setImcapacities(state, data) {
      if (data.status) {
        state.imcapacities = data.content;
      }
    },
    setImcapacitiesEmpty(state) {
      state.imcapacities = [];
    },
    setRemission(state, data) {
      if (data.status) {
        let struct = {
          transfer: data.content.description,
          remission: data.content.status,
          observations: data.content.observations,
          destinationIPS: data.content.destinationIPS,
        };
        state.remission = struct;
      }
    },
    setRemissionEmpty(state) {
      state.remission = [];
    },
    setVaccination(state, data) {
      if (data && data.status) {
        let struct = {
          bcg:
            data.content.bcg != "undefined" && data.content.bcg
              ? data.content.bcg
              : 0,
          hepatitis_a:
            data.content.hepatitis_a != "undefined" && data.content.hepatitis_a
              ? data.content.hepatitis_a
              : 0,
          covid:
            data.content.covid !== "undefined" && data.content.covid
              ? data.content.covid
              : 0,
          neumococo:
            data.content.neumococo != "undefined" && data.content.neumococo
              ? data.content.neumococo
              : 0,
          pentavalente:
            data.content.pentavalente != "undefined" &&
              data.content.pentavalente
              ? data.content.pentavalente
              : 0,
          polio:
            data.content.polio != "undefined" && data.content.polio
              ? data.content.polio
              : 0,
          rotavirus:
            data.content.rotavirus != "undefined" && data.content.rotavirus
              ? data.content.rotavirus
              : 0,
          td_tt_woman:
            data.content.td_tt_woman != "undefined" && data.content.td_tt_woman
              ? data.content.td_tt_woman
              : 0,
          vph:
            data.content.vph != "undefined" && data.content.vph
              ? data.content.vph
              : 0,
          schema_year:
            data.content.schema_year != "undefined" && data.content.schema_year
              ? data.content.schema_year
              : "NO",
          name_vaccine:
            data.content.name_vaccine != "undefined" &&
              data.content.name_vaccine
              ? data.content.name_vaccine
              : "",
        };
        state.vaccination = struct;
        /* console.log("🚀 ~ setVaccination ~ struct:", struct); */
      }
    },
    setVaccinationEmpty(state) {
      state.vaccination = {
        bcg: 0,
        hepatitis_a: 0,
        covid: 0,
        neumococo: 0,
        pentavalente: 0,
        polio: 0,
        rotavirus: 0,
        td_tt_woman: 0,
        vph: 0,
        schema_year: "NO",
      };
    },
    setGynecology(state, data) {
      if (data.status) {
        let struct = {
          menarche: data.content.menarche,
          caesareanSections: data.content.caesareanSections,
          cycles: data.content.cycles,
          stillbirths: data.content.stillbirths,
          gravida: data.content.gravida,
          livingChildren: data.content.livingChildren,
          deliveries: data.content.deliveries,
          datesLastMenstruation: data.content.datesLastMenstruation,
          abortions: data.content.abortions,
          planning: data.content.planning,
          ID_Patient: data.content.id_patient,
          menopauseoption: data.content.menopauseoption,
          menopausedate: data.content.menopausedate,
          pregnant: data.content.pregnant,
          gestational_age: data.content.gestational_age,
          date_cytology: data.content.date_cytology,
          cytology_observation: data.content.cytology_observation,
        };
        state.gynecology = struct;
      }
    },
    setGynecologyEmpty(state) {
      state.gynecology = {
        menarche: "No Aplica",
        caesareanSections: 0,
        cycles: "No Aplica",
        stillbirths: 0,
        gravida: "No Aplica",
        livingChildren: 0,
        deliveries: 0,
        datesLastMenstruation: "No Aplica",
        abortions: 0,
        planning: "No Aplica",
        menopausedate: "No Aplica",
        pregnant: 0,
        gestational_age: 0,
        date_cytology: "",
        cytology_observation: "",
      };
    },
    setDisclaimer(state, data) {
      if (data.status) {
        state.disclaimer = data.content;
      }
    },
    setDisclaimerEmpty(state) {
      state.disclaimer = [];
    },
    setStatus(state, data) {
      if (data.status) {
        state.status = data.content;
      }
    },
    setProcedures(state, data) {
      if (data.status) {
        state.procedures = data.content;
      }
    },
    setProceduresEmpty(state) {
      state.procedures = [];
    },
    setTypeService(state, data) {
      if (data.status) {
        state.typeService = data.content;
      }
    },
    setTypeServiceEmpty(state) {
      state.typeService = [];
    },
    setSignature(state, data) {
      if (data.status) {
        state.signature = data.content;
      }
    },
    setSignatureEmpty(state) {
      state.signature = [];
    },
    setServiceGroup(state, data) {
      if (data.status) {
        state.serviceGroup = data.content;
      }
    },
    setServiceGroupEmpty(state) {
      state.serviceGroup = [];
    },
    setProcedureFodicalized(state, data) {
      state.procedureFodicalized = data;
    },
    setProcedureFodicalizedEmpty(state) {
      state.procedureFodicalized = [];
    },
    setLunchBox(state, data) {
      if (data.status) {
        state.lunchBox = data.content.data;
      }
    },
  },
  actions: {
    incrementTotalDurationMinutes({ commit }, data) {
      commit("setTotalDurationMinutes", data);
    },
    SearchOrder: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}history/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setOrdersID", json);
      } else {
        commit("sethistoryEmpty");
      }
    },
    async addTechnical(_object, data) {
      this.show = true;
      let formData = new FormData();

      if (data.charge_Technical)
        formData.append("charge", data.charge_Technical);
      if (data.jobFunctions_Technical)
        formData.append("job_functions", data.jobFunctions_Technical);
      if (data.residenceAddress_Technical)
        formData.append("address_of_residence", data.residenceAddress_Technical);
      if (data.companyTime_Technical)
        formData.append("time_of_service", data.companyTime_Technical);
      if (data.relationship_Technical)
        formData.append("relationship", data.relationship_Technical);
      if (data.companionsName_Technical)
        formData.append("name_accompanying", data.companionsName_Technical);
      if (data.passengerPhone_Technical)
        formData.append("companion_phone", data.passengerPhone_Technical);
      if (data.typeCare_Technical)
        formData.append("type_of_attention", data.typeCare_Technical);
      formData.append("category_type_attention", 0);
      if (data.civilStatus_Technical)
        formData.append("marital_status", data.civilStatus_Technical);
      if (data.birthDate_Technical)
        formData.append("birthdate", data.birthDate_Technical);
      if (data.diagnosis_Technical)
        formData.append("patient_diagnosis", data.diagnosis_Technical);
      if (data.email_Technical) formData.append("email", data.email_Technical);
      if (data.email_Technical)
        formData.append("email_confirm", data.email_Technical);
      if (data.workAddress_Technical)
        formData.append("work_address", data.workAddress_Technical);
      if (data.typeID_Technical)
        formData.append("key_type_document", data.typeID_Technical);
      if (data.IDPatient_Technical)
        formData.append("document", data.IDPatient_Technical);
      if (data.firstname_Technical)
        formData.append("firstname", data.firstname_Technical);
      if (data.middlename_Technical)
        formData.append("middlename", data.middlename_Technical);
      if (data.first_surname_Technical)
        formData.append("first_surname", data.first_surname_Technical);
      if (data.second_surname_Technical)
        formData.append("second_surname", data.second_surname_Technical);
      if (data.department_Technical)
        formData.append("key_department", data.department_Technical);
      if (data.municipality_Technical)
        formData.append("key_municipality", data.municipality_Technical);
      if (data.department_Technical == 5) {
        formData.append("key_locality", data.location_Technical);
      }
      if (data.reasonConsultation_Technical)
        formData.append("reason_consultation", data.reasonConsultation_Technical);
      if (data.currentIllness_Technical)
        formData.append("current_disease", data.currentIllness_Technical);
      if (data.genre_Technical) formData.append("genre", data.genre_Technical);
      if (data.typeRequest_Technical)
        formData.append("key_request", data.typeRequest_Technical);
      if (data.phone_Technical) formData.append("phone", data.phone_Technical);
      if (data.age_Technical) formData.append("age", data.age_Technical);
      if (data.companions_email_Technical)
        formData.append("companions_email", data.companions_email_Technical);
      if (data.companions_phone_Technical)
        formData.append("companions_phone", data.companions_phone_Technical);

      // Crear objeto para IndexedDB
      const localData = {
        formId: "technicalForm",
        IDPatient: data.IDPatient_Technical || null,
        IDHistory: data.IDHistory || null,
        charge: data.charge_Technical || null,
        job_functions: data.jobFunctions_Technical || null,
        address_of_residence: data.residenceAddress_Technical || null,
        time_of_service: data.companyTime_Technical || null,
        relationship: data.relationship_Technical || null,
        name_accompanying: data.companionsName_Technical || null,
        companion_phone: data.passengerPhone_Technical || null,
        type_of_attention: data.typeCare_Technical || null,
        category_type_attention: 0,
        marital_status: data.civilStatus_Technical || null,
        birthdate: data.birthDate_Technical || null,
        patient_diagnosis: data.diagnosis_Technical || null,
        email: data.email_Technical || null,
        work_address: data.workAddress_Technical || null,
        key_type_document: data.typeID_Technical || null,
        document: data.IDPatient_Technical || null,
        firstname: data.firstname_Technical || null,
        middlename: data.middlename_Technical || null,
        first_surname: data.first_surname_Technical || null,
        second_surname: data.second_surname_Technical || null,
        key_department: data.department_Technical || null,
        key_municipality: data.municipality_Technical || null,
        key_locality:
          data.department_Technical === 5 ? data.location_Technical : null,
        reason_consultation: data.reasonConsultation_Technical || null,
        current_disease: data.currentIllness_Technical || null,
        genre: data.genre_Technical || null,
        key_request: data.typeRequest_Technical || null,
        phone: data.phone_Technical || null,
        age: data.age_Technical || null,
        companions_email: data.companions_email_Technical || null,
        companions_phone: data.companions_phone_Technical || null,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData);
          //console.log("Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar datos en IndexedDB:", error);
          throw error;
        }
      } else {
        // Enviar datos al servidor si hay conexión
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}technical/sheet/patient/${data.IDPatient}/history/${data.IDHistory}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            //console.log("Datos enviados al servidor exitosamente.");
            return json.status;
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return json.errors || "Ha ocurrido un error";
          }
        } catch (error) {
          console.error("Error al enviar datos al servidor:", error);
          throw error;
        }
      }
    },
    async updateTechnical(_object, data) {
      this.show = true;
      let formData = new FormData();

      if (data.charge_Technical)
        formData.append("charge", data.charge_Technical);
      if (data.jobFunctions_Technical)
        formData.append("job_functions", data.jobFunctions_Technical);
      if (data.residenceAddress_Technical)
        formData.append(
          "address_of_residence",
          data.residenceAddress_Technical
        );
      if (data.companyTime_Technical)
        formData.append("time_of_service", data.companyTime_Technical);
      if (data.relationship_Technical)
        formData.append("relationship", data.relationship_Technical);
      if (data.companionsName_Technical)
        formData.append("name_accompanying", data.companionsName_Technical);
      if (data.passengerPhone_Technical)
        formData.append("companion_phone", data.passengerPhone_Technical);
      if (data.typeCare_Technical)
        formData.append("type_of_attention", data.typeCare_Technical);
      formData.append("category_type_attention", 0);
      if (data.civilStatus_Technical)
        formData.append("marital_status", data.civilStatus_Technical);
      if (data.birthDate_Technical)
        formData.append("birthdate", data.birthDate_Technical);
      if (data.diagnosis_Technical)
        formData.append("patient_diagnosis", data.diagnosis_Technical);
      if (data.email_Technical) formData.append("email", data.email_Technical);
      if (data.email_Technical)
        formData.append("email_confirm", data.email_Technical);
      if (data.workAddress_Technical)
        formData.append("work_address", data.workAddress_Technical);
      if (data.typeID_Technical)
        formData.append("key_type_document", data.typeID_Technical);
      if (data.IDPatient_Technical)
        formData.append("document", data.IDPatient_Technical);
      if (data.firstname_Technical)
        formData.append("firstname", data.firstname_Technical);
      if (data.middlename_Technical)
        formData.append("middlename", data.middlename_Technical);
      if (data.first_surname_Technical)
        formData.append("first_surname", data.first_surname_Technical);
      if (data.second_surname_Technical)
        formData.append("second_surname", data.second_surname_Technical);
      if (data.department_Technical)
        formData.append("key_department", data.department_Technical);
      if (data.municipality_Technical)
        formData.append("key_municipality", data.municipality_Technical);
      if (data.department_Technical == 5) {
        formData.append("key_locality", data.location_Technical);
      }
      if (data.reasonConsultation_Technical)
        formData.append(
          "reason_consultation",
          data.reasonConsultation_Technical
        );
      if (data.currentIllness_Technical)
        formData.append("current_disease", data.currentIllness_Technical);
      if (data.genre_Technical) formData.append("genre", data.genre_Technical);
      if (data.typeRequest_Technical)
        formData.append("key_request", data.typeRequest_Technical);
      if (data.phone_Technical) formData.append("phone", data.phone_Technical);
      if (data.age_Technical) formData.append("age", data.age_Technical);
      if (data.companions_email_Technical)
        formData.append("companions_email", data.companions_email_Technical);
      if (data.companions_phone_Technical)
        formData.append("companions_phone", data.companions_phone_Technical);
      /* if !navigator.onLine == onLine) {
        saveToFirebaseTechnical(data);
      } */
      // Crear objeto para IndexedDB
      const localData = {
        formId: "technicalForm",
        IDPatient: data.IDPatient_Technical || null,
        IDHistory: data.IDHistory || null,
        charge: data.charge_Technical || null,
        job_functions: data.jobFunctions_Technical || null,
        address_of_residence: data.residenceAddress_Technical || null,
        time_of_service: data.companyTime_Technical || null,
        relationship: data.relationship_Technical || null,
        name_accompanying: data.companionsName_Technical || null,
        companion_phone: data.passengerPhone_Technical || null,
        type_of_attention: data.typeCare_Technical || null,
        category_type_attention: 0,
        marital_status: data.civilStatus_Technical || null,
        birthdate: data.birthDate_Technical || null,
        patient_diagnosis: data.diagnosis_Technical || null,
        email: data.email_Technical || null,
        work_address: data.workAddress_Technical || null,
        key_type_document: data.typeID_Technical || null,
        document: data.IDPatient_Technical || null,
        firstname: data.firstname_Technical || null,
        middlename: data.middlename_Technical || null,
        first_surname: data.first_surname_Technical || null,
        second_surname: data.second_surname_Technical || null,
        key_department: data.department_Technical || null,
        key_municipality: data.municipality_Technical || null,
        key_locality:
          data.department_Technical === 5 ? data.location_Technical : null,
        reason_consultation: data.reasonConsultation_Technical || null,
        current_disease: data.currentIllness_Technical || null,
        genre: data.genre_Technical || null,
        key_request: data.typeRequest_Technical || null,
        phone: data.phone_Technical || null,
        age: data.age_Technical || null,
        companions_email: data.companions_email_Technical || null,
        companions_phone: data.companions_phone_Technical || null,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData);
          //console.log("Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar datos en IndexedDB:", error);
          throw error;
        }
      } else {
        // Enviar datos al servidor si hay conexión
        const body = new URLSearchParams(formData);
        let config = {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}technical/sheet/patient/${data.IDPatient}/history/${data.IDHistory}?${body}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            //console.log("Datos enviados al servidor exitosamente.");
            return json.status;
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return json.errors || "Ha ocurrido un error";
          }
        } catch (error) {
          console.error("Error al enviar datos al servidor:", error);
          throw error;
        }
      }
    },
    searchTechnical: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const historyKey = data.keyHistory;
      //await getToFirebaseTechnical(historyKey);
      const response = await fetch(
        `${API_URL}technical/sheet/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setTechnical", json);
      } else {
        commit("setTechnicalEmty");
      }
    },
    async addSystemRevision(_object, data) {
      this.show = true;
      let formData = new FormData();

      // Añadir datos al FormData
      formData.append("osteoarticular", data.osteoarticular);
      formData.append("gastrointestinal", data.gastrointestinal);
      formData.append("cardiovascular", data.cardiovascular);
      formData.append("respiratory", data.respiratory);
      formData.append("muscular", data.muscular);
      formData.append("urinary", data.urinary);
      formData.append("skin_fan", data.skin_fan);
      formData.append("lymphatic", data.lymphatic);
      formData.append("endocrine", data.endocrine);
      formData.append("neurological", data.neurological);
      formData.append("others", data.others);
      formData.append("vaccination_status", data.vaccination_status);
      formData.append("name_vaccination", data.name_vaccination);
      formData.append("dose", data.dose);
      formData.append("date_time_vaccination_doses", data.date_time_vaccination_doses);
      formData.append("digestive_system", data.digestive_system);
      formData.append("locomotor_system", data.locomotor_system);
      formData.append("dermatological", data.dermatological);
      formData.append("gynecological", data.gynecological);
      formData.append("otorhinolaryngological", data.otorhinolaryngological);
      formData.append("dental", data.dental);
      formData.append("psychiatric_psychological", data.psychiatric_psychological);

      // Crear objeto para IndexedDB
      const localData = {
        formId: "SystemRevisionForm",
        IDPatient: data.IDPatient,
        IDHistory: data.IDHistory,
        osteoarticular: data.osteoarticular,
        gastrointestinal: data.gastrointestinal,
        cardiovascular: data.cardiovascular,
        respiratory: data.respiratory,
        muscular: data.muscular,
        urinary: data.urinary,
        skin_fan: data.skin_fan,
        lymphatic: data.lymphatic,
        endocrine: data.endocrine,
        neurological: data.neurological,
        others: data.others,
        vaccination_status: data.vaccination_status,
        name_vaccination: data.name_vaccination,
        dose: data.dose,
        date_time_vaccination_doses: data.date_time_vaccination_doses,
        digestive_system: data.digestive_system,
        locomotor_system: data.locomotor_system,
        dermatological: data.dermatological,
        gynecological: data.gynecological,
        otorhinolaryngological: data.otorhinolaryngological,
        dental: data.dental,
        psychiatric_psychological: data.psychiatric_psychological,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData);
          //console.log("Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return { status: "success", message: "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet." };
        } catch (error) {
          console.error("Error al guardar datos en IndexedDB:", error);
          return { status: "error", message: error.message };
        }
      } else {
        // Enviar datos al servidor si hay conexión
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}system/revision/patient/${data.IDPatient}/history/${data.IDHistory}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            //console.log("Datos enviados al servidor exitosamente.");
            return { status: "success", message: json.status };
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return { status: "error", message: json.errors || "Ha ocurrido un error" };
          }
        } catch (error) {
          console.error("Error al enviar datos al servidor:", error);
          return { status: "error", message: error.message };
        }
      }
    },
    async updateSystemRevision(_object, data) {
      this.show = true;
      let formData = new FormData();
      // Añadir datos al FormData
      formData.append("osteoarticular", data.osteoarticular);
      formData.append("gastrointestinal", data.gastrointestinal);
      formData.append("cardiovascular", data.cardiovascular);
      formData.append("respiratory", data.respiratory);
      formData.append("muscular", data.muscular);
      formData.append("urinary", data.urinary);
      formData.append("skin_fan", data.skin_fan);
      formData.append("lymphatic", data.lymphatic);
      formData.append("endocrine", data.endocrine);
      formData.append("neurological", data.neurological);
      formData.append("others", data.others);
      formData.append("vaccination_status", data.vaccination_status);
      formData.append("name_vaccination", data.name_vaccination);
      formData.append("dose", data.dose);
      formData.append("date_time_vaccination_doses", data.date_time_vaccination_doses);
      formData.append("digestive_system", data.digestive_system);
      formData.append("locomotor_system", data.locomotor_system);
      formData.append("dermatological", data.dermatological);
      formData.append("gynecological", data.gynecological);
      formData.append("otorhinolaryngological", data.otorhinolaryngological);
      formData.append("dental", data.dental);
      formData.append("psychiatric_psychological", data.psychiatric_psychological);

      // Crear objeto para IndexedDB
      const localData = {
        formId: "SystemRevisionForm",
        IDPatient: data.IDPatient,
        IDHistory: data.IDHistory,
        osteoarticular: data.osteoarticular,
        gastrointestinal: data.gastrointestinal,
        cardiovascular: data.cardiovascular,
        respiratory: data.respiratory,
        muscular: data.muscular,
        urinary: data.urinary,
        skin_fan: data.skin_fan,
        lymphatic: data.lymphatic,
        endocrine: data.endocrine,
        neurological: data.neurological,
        others: data.others,
        vaccination_status: data.vaccination_status,
        name_vaccination: data.name_vaccination,
        dose: data.dose,
        date_time_vaccination_doses: data.date_time_vaccination_doses,
        digestive_system: data.digestive_system,
        locomotor_system: data.locomotor_system,
        dermatological: data.dermatological,
        gynecological: data.gynecological,
        otorhinolaryngological: data.otorhinolaryngological,
        dental: data.dental,
        psychiatric_psychological: data.psychiatric_psychological,
      };

      if (!navigator.onLine) {
        try {
          await createElements(localData);
          //console.log("Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return { status: "success", message: "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet." };
        } catch (error) {
          console.error("Error al guardar datos en IndexedDB:", error);
          return { status: "error", message: error.message };
        }
      } else {
        // Enviar datos al servidor si hay conexión
        const body = new URLSearchParams(formData);
        let config = {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        try {
          const response = await fetch(
            `${API_URL}system/revision/patient/${data.IDPatient}/history/${data.IDHistory}?${body}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            //console.log("Datos enviados al servidor exitosamente.");
            return { status: "success", message: json.status };
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return { status: "error", message: json.errors || "Ha ocurrido un error" };
          }
        } catch (error) {
          console.error("Error al enviar datos al servidor:", error);
          return { status: "error", message: error.message };
        }
      }
    },
    searchSystemRevision: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}system/revision/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setSystemRevisionID", json);
      } else {
        commit("setSystemRevisionIDEmty");
      }
    },
    async addPhysicalExam(_object, data) {
      this.show = true;
      let formData = new FormData();

      formData.append("general_aspect", data.Generalaspect_PhysicalExam);
      formData.append("systolic", data.systolic_PhysicalExam);
      formData.append("diastolic", data.diastolic_PhysicalExam);
      formData.append("f_cardiac", data.FCardiac_PhysicalExam);
      formData.append("f_respiratory", data.FRespiratory_PhysicalExam);
      formData.append("saturation", data.satao2_PhysicalExam);
      formData.append("temperature", data.Temperature_PhysicalExam);
      formData.append(
        "dominant_laterality",
        data.DominantLaterality_PhysicalExam
      );
      formData.append("weight", data.Weight_PhysicalExam);
      formData.append("size", data.Size_PhysicalExam);

      if (data.Abdominalperimeter_PhysicalExam) {
        formData.append(
          "abdominal_perimeter",
          data.Abdominalperimeter_PhysicalExam
        );
      }
      if (data.AbdominalInterpretation_PhysicalExam) {
        formData.append(
          "abdominal_interpretation",
          data.AbdominalInterpretation_PhysicalExam
        );
      }
      if (data.Glasgow_PhysicalExam) {
        formData.append("glasgow", data.Glasgow_PhysicalExam);
      }
      if (data.glucometer_PhysicalExam) {
        formData.append("glucometer", data.glucometer_PhysicalExam);
      }
      if (data.ECOGindex_PhysicalExam) {
        formData.append("index_ecog", data.ECOGindex_PhysicalExam);
      }

      formData.append("head", data.HEAD_PhysicalExam);
      formData.append("neck", data.NECK_PhysicalExam);
      formData.append("thorax_mama", data.THORAXANDBREAST_PhysicalExam);
      formData.append("abdomen", data.ABDOMEN_PhysicalExam);
      formData.append("genitourinary", data.GENITOURINARY_PhysicalExam);
      formData.append("skeletal_muscle", data.MUSCLESKELETAL_PhysicalExam);
      formData.append("nervous_system", data.NERVOUSSYSTEM_PhysicalExam);
      formData.append("skin_faneras", data.SKINANDFANS_PhysicalExam);
      formData.append("key_history", data.IDHistory);
      formData.append("medium_pressure", data.medium_pressure_PhysicalExam);

      formData.append("back", data.back_PhysicalExam);
      formData.append("extremities", data.extremities_PhysicalExam);
      formData.append("genitals", data.genitals_PhysicalExam);
      formData.append("nervous", data.nervous_PhysicalExam);
      formData.append("psych", data.psychism_PhysicalExam);

      // Crear objeto para IndexedDB
      const localData = {
        formId: "PhysicalExamForm",
        general_aspect: data.Generalaspect_PhysicalExam || null,
        systolic: data.systolic_PhysicalExam || null,
        diastolic: data.diastolic_PhysicalExam || null,
        f_cardiac: data.FCardiac_PhysicalExam || null,
        f_respiratory: data.FRespiratory_PhysicalExam || null,
        saturation: data.satao2_PhysicalExam || null,
        temperature: data.Temperature_PhysicalExam || null,
        dominant_laterality: data.DominantLaterality_PhysicalExam || null,
        weight: data.Weight_PhysicalExam || null,
        size: data.Size_PhysicalExam || null,
        abdominal_perimeter: data.Abdominalperimeter_PhysicalExam || null,
        abdominal_interpretation:
          data.AbdominalInterpretation_PhysicalExam || null,
        glasgow: data.Glasgow_PhysicalExam || null,
        glucometer: data.glucometer_PhysicalExam || null,
        index_ecog: data.ECOGindex_PhysicalExam || null,
        head: data.HEAD_PhysicalExam || null,
        neck: data.NECK_PhysicalExam || null,
        thorax_mama: data.THORAXANDBREAST_PhysicalExam || null,
        abdomen: data.ABDOMEN_PhysicalExam || null,
        genitourinary: data.GENITOURINARY_PhysicalExam || null,
        skeletal_muscle: data.MUSCLESKELETAL_PhysicalExam || null,
        nervous_system: data.NERVOUSSYSTEM_PhysicalExam || null,
        skin_faneras: data.SKINANDFANS_PhysicalExam || null,
        key_history: data.IDHistory || null,
        medium_pressure: data.medium_pressure_PhysicalExam || null,
        back: data.back_PhysicalExam || null,
        extremities: data.extremities_PhysicalExam || null,
        genitals: data.genitals_PhysicalExam || null,
        nervous: data.nervous_PhysicalExam || null,
        psych: data.psychism_PhysicalExam || null,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData);
          //console.log("Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar datos en IndexedDB:", error);
          throw error;
        }
      } else {
        // Enviar datos al servidor si hay conexión
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(`${API_URL}phisical/exam/`, config);
          const json = await response.json();
          if (json.status) {
            //console.log("Datos enviados al servidor exitosamente.");
            return json.status;
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return json.errors || "Ha ocurrido un error";
          }
        } catch (error) {
          console.error("Error al enviar datos al servidor:", error);
          throw error;
        }
      }
    },
    async updatePhysicalExam(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("general_aspect", data.Generalaspect_PhysicalExam);
      formData.append("systolic", data.systolic_PhysicalExam);
      formData.append("diastolic", data.diastolic_PhysicalExam);
      formData.append("f_cardiac", data.FCardiac_PhysicalExam);
      formData.append("f_respiratory", data.FRespiratory_PhysicalExam);
      formData.append("saturation", data.satao2_PhysicalExam);
      formData.append("temperature", data.Temperature_PhysicalExam);
      formData.append(
        "dominant_laterality",
        data.DominantLaterality_PhysicalExam
      );
      formData.append("weight", data.Weight_PhysicalExam);
      formData.append("size", data.Size_PhysicalExam);
      if (data.Abdominalperimeter_PhysicalExam) {
        formData.append(
          "abdominal_perimeter",
          data.Abdominalperimeter_PhysicalExam
        );
      }
      if (data.AbdominalInterpretation_PhysicalExam) {
        formData.append(
          "abdominal_interpretation",
          data.AbdominalInterpretation_PhysicalExam
        );
      }
      if (data.Glasgow_PhysicalExam) {
        formData.append("glasgow", data.Glasgow_PhysicalExam);
      }
      if (data.glucometer_PhysicalExam) {
        formData.append("glucometer", data.glucometer_PhysicalExam);
      }
      if (data.ECOGindex_PhysicalExam) {
        formData.append("index_ecog", data.ECOGindex_PhysicalExam);
      }
      formData.append("head", data.HEAD_PhysicalExam);
      formData.append("neck", data.NECK_PhysicalExam);
      formData.append("thorax_mama", data.THORAXANDBREAST_PhysicalExam);
      formData.append("abdomen", data.ABDOMEN_PhysicalExam);
      formData.append("genitourinary", data.GENITOURINARY_PhysicalExam);
      formData.append("skeletal_muscle", data.MUSCLESKELETAL_PhysicalExam);
      formData.append("nervous_system", data.NERVOUSSYSTEM_PhysicalExam);
      formData.append("skin_faneras", data.SKINANDFANS_PhysicalExam);
      formData.append("key_history", data.IDHistory);
      formData.append("medium_pressure", data.medium_pressure_PhysicalExam);

      formData.append("back", data.back_PhysicalExam);
      formData.append("extremities", data.extremities_PhysicalExam);
      formData.append("genitals", data.genitals_PhysicalExam);
      formData.append("nervous", data.nervous_PhysicalExam);
      formData.append("psych", data.psychism_PhysicalExam);

      // Crear objeto para IndexedDB
      const localData = {
        formId: "PhysicalExamForm",
        general_aspect: data.Generalaspect_PhysicalExam || null,
        systolic: data.systolic_PhysicalExam || null,
        diastolic: data.diastolic_PhysicalExam || null,
        f_cardiac: data.FCardiac_PhysicalExam || null,
        f_respiratory: data.FRespiratory_PhysicalExam || null,
        saturation: data.satao2_PhysicalExam || null,
        temperature: data.Temperature_PhysicalExam || null,
        dominant_laterality: data.DominantLaterality_PhysicalExam || null,
        weight: data.Weight_PhysicalExam || null,
        size: data.Size_PhysicalExam || null,
        abdominal_perimeter: data.Abdominalperimeter_PhysicalExam || null,
        abdominal_interpretation:
          data.AbdominalInterpretation_PhysicalExam || null,
        glasgow: data.Glasgow_PhysicalExam || null,
        glucometer: data.glucometer_PhysicalExam || null,
        index_ecog: data.ECOGindex_PhysicalExam || null,
        head: data.HEAD_PhysicalExam || null,
        neck: data.NECK_PhysicalExam || null,
        thorax_mama: data.THORAXANDBREAST_PhysicalExam || null,
        abdomen: data.ABDOMEN_PhysicalExam || null,
        genitourinary: data.GENITOURINARY_PhysicalExam || null,
        skeletal_muscle: data.MUSCLESKELETAL_PhysicalExam || null,
        nervous_system: data.NERVOUSSYSTEM_PhysicalExam || null,
        skin_faneras: data.SKINANDFANS_PhysicalExam || null,
        key_history: data.IDHistory || null,
        medium_pressure: data.medium_pressure_PhysicalExam || null,
        back: data.back_PhysicalExam || null,
        extremities: data.extremities_PhysicalExam || null,
        genitals: data.genitals_PhysicalExam || null,
        nervous: data.nervous_PhysicalExam || null,
        psych: data.psychism_PhysicalExam || null,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData);
          //console.log("Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar datos en IndexedDB:", error);
          throw error;
        }
      } else {
        // Enviar datos al servidor si hay conexión
        const body = new URLSearchParams(formData);
        let config = {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}phisical/exam/history/${data.IDHistory}?${body}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            //console.log("Datos enviados al servidor exitosamente.");
            return json.status;
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return json.errors || "Ha ocurrido un error";
          }
        } catch (error) {
          console.error("Error al enviar datos al servidor:", error);
          throw error;
        }
      }
    },
    searchPhysicalExam: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };

      const response = await fetch(
        `${API_URL}physical/examination/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setPhysicalExamID", json);
      } else {
        commit("setPhysicalExamEmty");
      }
    },
    async addDiagnostic({ commit }, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("id", data.id_diagnostic);
      formData.append("origin", data.origin_diagnostic);
      if (data.type_diagnostic) {
        formData.append("type", data.type_diagnostic);
      }
      formData.append("code", data.code_diagnostic);

      // Crear objeto para IndexedDB
      const localData = {
        formId: "DiagnosticForm",
        id: data.id_diagnostic || null,
        origin: data.origin_diagnostic || null,
        type: data.type_diagnostic || null,
        code: data.code_diagnostic || null,
        idHistory: data.IDHistory || null,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Datos del diagnóstico guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar diagnóstico en IndexedDB:", error);
          throw error;
        }
      } else {
        // Enviar datos al servidor si hay conexión
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}diagnostic/${data.IDHistory}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            commit("setDiagnosticEmty", json);
            //console.log("Diagnóstico enviado al servidor exitosamente.");
            return json.status;
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return json.errors || "Ha ocurrido un error";
          }
        } catch (error) {
          console.error("Error al enviar diagnóstico al servidor:", error);
          throw error;
        }
      }
    },
    async searchCie10({ commit }, data) {
      this.cie10 = [];
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(
        `${API_URL}diagnostic?search=` + data,
        config
      );
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setCie", datos);
        return;
      } else {
        commit("setCieEmpty");
      }
    },
    cleadCie10({ commit }) {
      commit("setCieEmpty");
    },
    searchDiagnostic: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}diagnostic/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setDiagnostic", json);
      } else {
        commit("setDiagnosticEmty");
      }
    },
    async destroyCie10({ commit }, data) {
      if (data === null || data === "") {
        return false;
      }
      this.show = true;
      let config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}diagnostic/${data.keyCie10}/history/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {

        commit("setDiagnostic", json);
        commit("setOrdersDeleteID", data.keyCie10);
        return json.status;
      }
    },
    async addAnalysis({ commit }, data) {
      this.show = true;
      let formData = new FormData();

      formData.append("analysis", data.Analysis_diagnostic);
      formData.append("death_confirmed", data.confirmdeath_diagnostic);
      formData.append("key_history", data.IDHistory);

      if (data.confirmdeath_diagnostic == 3) {
        formData.append("death_date", data.deathdate_diagnostic);
      }
      if (data.control_date != null) {
        formData.append("control_date", data.control_date);
      }

      // Crear objeto para IndexedDB
      const localData = {
        formId: "AnalysisForm",
        analysis: data.Analysis_diagnostic || null,
        death_confirmed: data.confirmdeath_diagnostic || null,
        key_history: data.IDHistory || null,
        death_date:
          data.confirmdeath_diagnostic == 3 ? data.deathdate_diagnostic : null,
        control_date: data.control_date || null,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Datos del análisis guardados localmente en IndexedDB debido a falta de conexión a Internet.");
          return "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar análisis en IndexedDB:", error);
          throw error;
        }
      } else {
        // Enviar datos al servidor si hay conexión
        const body = new URLSearchParams(formData);
        let config = {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}history/${data.IDHistory}/set/paraclinial?${body}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            //console.log("Análisis enviado al servidor exitosamente.");
            return json.status;
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return json.errors || "Ha ocurrido un error";
          }
        } catch (error) {
          console.error("Error al enviar análisis al servidor:", error);
          throw error;
        }
      }
    },
    SearchAnality: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}history/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setanality", json);
      } else {
        commit("setanalityEmty");
      }
    },
    SearchJob: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}job/recommendation/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setJob", json);
      } else {
        commit("setJobEmpty");
      }
    },
    async addjobrecommendation(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("recommendations", JSON.stringify(data.recommendation));

      // Crear objeto para IndexedDB
      const localData = {
        formId: "jobrecommendationForm",
        recommendations: JSON.stringify(data.recommendation) || [],
        IdHistory: data.IdHistory || null,
      };

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Recomendaciones guardadas localmente en IndexedDB debido a falta de conexión a Internet.");
          return "Datos guardados localmente en IndexedDB debido a falta de conexión a Internet.";
        } catch (error) {
          console.error(
            "Error al guardar recomendaciones en IndexedDB:",
            error
          );
          throw error;
        }
      } else {
        // Enviar datos al servidor si hay conexión
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}job/recommendation/${data.IdHistory}`,
            config
          );
          const json = await response.json();
          if (json.status) {
            //console.log("Recomendaciones enviadas al servidor exitosamente.");
            return json.status;
          } else {
            console.error("Errores en la respuesta del servidor:", json.errors);
            return json.errors || "Ha ocurrido un error";
          }
        } catch (error) {
          console.error("Error al enviar recomendaciones al servidor:", error);
          throw error;
        }
      }
    },

    async addEvolution({ commit }, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("description", data.description_evolution);

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "EvolutionForm",
          description: data.description_evolution,
          IDHistory: data.IDHistory,
        };
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Evolución guardada localmente en IndexedDB debido a falta de conexión.");
          return "Datos guardados localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar evolución en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, enviar los datos al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(
          `${API_URL}evolution/${data.IDHistory}`,
          config
        );
        const json = await response.json();
        if (json.status) {
          commit("setEvolution", json);
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    searchevolution: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}evolution/${data.keyHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setEvolution", json);
      } else {
        commit("setEvolutionEmpty");
      }
    },
    SearchRecord: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}histories/patient?patient=${data.keyPatient}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setRecord", json);
      }
    },
    async addrecord(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("patient", data.keyPatient);
      formData.append("histories", JSON.stringify(data.histories));

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "RecordForm",
          patient: data.keyPatient,
          histories: JSON.stringify(data.histories),
        };
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Registro guardado localmente en IndexedDB debido a falta de conexión.");
          return "Datos guardados localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar registro en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, enviar los datos al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(`${API_URL}histories/patient`, config);
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async searchMedicine({ commit }, data) {
      this.cie10 = [];
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(
        `${API_URL}medicine?search=` + data,
        config
      );
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setMedicine", datos);
        return;
      } else {
        commit("setMedicineEmpty");
      }
    },
    cleadMedicine({ commit }) {
      commit("setMedicineEmpty");
    },
    async addOrders(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("description", data.description);
      formData.append("quantity", data.quantity || 0);
      formData.append("amount", data.amount || 0);
      formData.append("type_order", data.type_order);
      formData.append("code", data.code);
      formData.append("type_rips", "AM");
      formData.append("invoiced", 0);
      formData.append("frequency", data.frequency);
      formData.append("days", data.days);
      formData.append("observation", data.observation);
      formData.append("type", data.type);

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "OrdersForm",
          description: data.description,
          quantity: data.quantity || 0,
          amount: data.amount || 0,
          type_order: data.type_order,
          code: data.code,
          type_rips: "AM",
          invoiced: 0,
          frequency: data.frequency,
          days: data.days,
          observation: data.observation,
          type: data.type,
          patientID: data.IDPatient,
          historyID: data.IDHistory,
        };
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Orden guardada localmente en IndexedDB debido a falta de conexión.");
          return "Orden guardada localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar la orden en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, enviar los datos al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(
          `${API_URL}orders/${data.IDPatient}/${data.IDHistory}`,
          config
        );
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    getOrdersHistory: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}orders/${data.keyPatient}/${data.keyHistory}?type_order=${data.type}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setOrderHistory", json);
      } else {
        commit("setOrderHistoryEmpty");
      }
    },
    async destroyOrders({ commit }, data) {
      if (data === null || data === "") {
        return false;
      }
      this.show = true;
      let config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}orders/${data}`, config);
      const json = await response.json();
      if (json.status) {
        commit("setProcedures", json);
      } else {
        commit("setProceduresEmpty");
      }
    },
    async searchSupply({ commit }, data) {
      this.cie10 = [];
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(`${API_URL}supply?search=` + data, config);
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setSupply", datos);
        return;
      } else {
        commit("setSupplyEmpty");
      }
    },
    cleadSupply({ commit }) {
      commit("setSupplyEmpty");
    },
    async addIncapacities(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("date_init", data.date_init);
      formData.append("date_end", data.date_end);
      formData.append("days", data.days);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("extension", data.extension);
      formData.append("eventtype", data.eventtype);
      formData.append("key_group_service", data.key_group_service);

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "IncapacitiesForm",
          date_init: data.date_init,
          date_end: data.date_end,
          days: data.days,
          description: data.description,
          type: data.type,
          extension: data.extension,
          eventtype: data.eventtype,
          key_group_service: data.key_group_service,
          historyID: data.IDHistory,
        };
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Incapacidad guardada localmente en IndexedDB debido a falta de conexión.");
          return "Incapacidad guardada localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar la incapacidad en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, enviar los datos al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(
          `${API_URL}disability/medical/${data.IDHistory}`,
          config
        );
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async searchIncapacities({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(
        `${API_URL}disability/medical/` + data,
        config
      );
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setImcapacities", datos);
        return;
      } else {
        commit("setImcapacitiesEmpty");
      }
    },
    async addVideo(_object, data) {
      this.show = true;
      /*             let progress = 0 */
      let formData = new FormData();
      formData.append("video", data.video);
      let config = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
        /* onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        progress = Math.round((event.loaded / event.total) * 100);
                    }
                    console.log("🚀 ~ file: history.js:1008 ~ addVideo ~ progress:", progress)
                } */
      };
      const response = await fetch(
        `${API_URL}upload/video/history/${data.IDHistory}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        return json.status;
      } else {
        return json.errors;
      }
    },
    gteTypeService: async function ({ commit }) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}type/services`, config);
      const json = await response.json();
      if (json.status) {
        commit("setTypeService", json);
        return;
      } else {
        commit("setTypeServiceEmpty");
      }
    },
    async addTypeService(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("key_type_service", data.key_type_service);
      formData.append("observations_type_services", data.observations_type_services || '');
      if(data.date_control){
        formData.append("date_control", data.date_control);
      }
      if(data.modality_date_control){
        formData.append("modality_date_control", data.modality_date_control);
      }
      // Verificar conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "TypeServiceForm",
          key_type_service: data.key_type_service,
          observations_type_services: data.observations_type_services,
          historyID: data.IDHistory,
        };
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Tipo de servicio guardado localmente en IndexedDB debido a falta de conexión." );
          return "Tipo de servicio guardado localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error(
            "Error al guardar el tipo de servicio en IndexedDB:",
            error
          );
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, enviar los datos al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(
          `${API_URL}history/${data.IDHistory}/add/type/services`,
          config
        );
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async searchOrdersRemission({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(
        `${API_URL}remission/` + data.keyHistory,
        config
      );
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setRemission", datos);
        return;
      } else {
        commit("setRemissionEmpty");
      }
    },
    async addVaccination(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("patient_id", data.patient_id);
      formData.append("bcg", data.bcg);
      formData.append("hepatitis_a", data.hepatitis_a);
      formData.append("covid", data.covid);
      formData.append("neumococo", data.neumococo);
      formData.append("pentavalente", data.pentavalente);
      formData.append("polio", data.polio);
      formData.append("rotavirus", data.rotavirus);
      formData.append("td_tt_woman", data.td_tt_woman);
      formData.append("vph", data.vph);
      formData.append("schema_year", data.schema_year);
      formData.append("name_vaccine", data.name_vaccine);

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "VaccinationForm",
          patient_id: data.patient_id,
          bcg: data.bcg,
          hepatitis_a: data.hepatitis_a,
          covid: data.covid,
          neumococo: data.neumococo,
          pentavalente: data.pentavalente,
          polio: data.polio,
          rotavirus: data.rotavirus,
          td_tt_woman: data.td_tt_woman,
          vph: data.vph,
          schema_year: data.schema_year,
          name_vaccine: data.name_vaccine,
        };
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Vacunación guardada localmente en IndexedDB debido a falta de conexión.");
          return "Vacunación guardada localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar la vacunación en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, enviar los datos al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(`${API_URL}vaccination`, config);
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async updateVaccination(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("patient_id", data.patient_id);
      formData.append("bcg", data.bcg);
      formData.append("hepatitis_a", data.hepatitis_a);
      formData.append("covid", data.covid);
      formData.append("neumococo", data.neumococo);
      formData.append("pentavalente", data.pentavalente);
      formData.append("polio", data.polio);
      formData.append("rotavirus", data.rotavirus);
      formData.append("td_tt_woman", data.td_tt_woman);
      formData.append("vph", data.vph);
      formData.append("schema_year", data.schema_year);
      formData.append("name_vaccine", data.name_vaccine);

      // Verificar conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "VaccinationForm",
          patient_id: data.patient_id,
          bcg: data.bcg,
          hepatitis_a: data.hepatitis_a,
          covid: data.covid,
          neumococo: data.neumococo,
          pentavalente: data.pentavalente,
          polio: data.polio,
          rotavirus: data.rotavirus,
          td_tt_woman: data.td_tt_woman,
          vph: data.vph,
          schema_year: data.schema_year,
          name_vaccine: data.name_vaccine,
        };
        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Vacunación guardada localmente en IndexedDB debido a falta de conexión.");
          return "Vacunación guardada localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar la vacunación en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, actualizar los datos en el servidor
        const body = new URLSearchParams(formData);
        let config = {
          method: "PUT",
          body: body,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(`${API_URL}vaccination?${body}`, config);
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async searchVaccination({ commit }, data) {
      try {
        const respuesta = await fetch(
          `${API_URL}vaccination/${data.keyPatient}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + auth.getUserLogged(),
            },
          }
        );
        if (!respuesta.ok) {
          if (respuesta.status === 404) {
            commit("setVaccinationEmpty");
          } else {
            throw new Error(
              "Error al buscar datos de vacunación: " + respuesta.status
            );
          }
        }
        const datos = await respuesta.json();
        if (datos.status) {
          commit("setVaccination", datos);
        } else {
          commit("setVaccinationEmpty");
        }
      } catch (error) {
        commit("setError", error.message);
        console.error("Error al buscar datos de vacunación:", error);
      }
    },
    async deleteVaccination(_object, data) {
      if (data === null || data === "") {
        return false;
      }
      this.show = true;
      let config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}vaccination/${data}`, config);
      const json = await response.json();
      if (json.status) {
        return json.status;
      } else {
        return json.errors;
      }
    },
    async addGynecology(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("menarche", data.menarche);
      formData.append("caesareanSections", data.caesareanSections);
      formData.append("cycles", data.cycles);
      formData.append("stillbirths", data.stillbirths);
      formData.append("gravida", data.gravida);
      formData.append("livingChildren", data.livingChildren);
      formData.append("deliveries", data.deliveries);
      formData.append("datesLastMenstruation", data.datesLastMenstruation);
      formData.append("abortions", data.abortions);
      formData.append("planning", data.planning);
      formData.append("patient_id", data.IDPatient);
      formData.append("menopauseoption", data.menopauseoption);
      formData.append("menopausedate", data.menopausedate);
      formData.append("pregnant", data.pregnant);
      formData.append("gestational_age", data.gestational_age);
      formData.append("date_cytology", data.date_cytology);
      formData.append("cytology_observation", data.cytology_observation);

      // Verificar si hay conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "GynecologyForm",
          menarche: data.menarche,
          caesareanSections: data.caesareanSections,
          cycles: data.cycles,
          stillbirths: data.stillbirths,
          gravida: data.gravida,
          livingChildren: data.livingChildren,
          deliveries: data.deliveries,
          datesLastMenstruation: data.datesLastMenstruation,
          abortions: data.abortions,
          planning: data.planning,
          patient_id: data.IDPatient,
          menopauseoption: data.menopauseoption,
          menopausedate: data.menopausedate,
          pregnant: data.pregnant,
          gestational_age: data.gestational_age,
          date_cytology: data.date_cytology,
          cytology_observation: data.cytology_observation,
        };

        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Datos de ginecología guardados localmente en IndexedDB debido a falta de conexión.");
          return "Datos guardados localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar los datos en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, hacer la solicitud al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(`${API_URL}gynecology`, config);
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async updateGynecology(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("menarche", data.menarche);
      formData.append("caesareanSections", data.caesareanSections);
      formData.append("cycles", data.cycles);
      formData.append("stillbirths", data.stillbirths);
      formData.append("gravida", data.gravida);
      formData.append("livingChildren", data.livingChildren);
      formData.append("deliveries", data.deliveries);
      formData.append("datesLastMenstruation", data.datesLastMenstruation);
      formData.append("abortions", data.abortions);
      formData.append("planning", data.planning);
      formData.append("patient_id", data.IDPatient);
      formData.append("menopauseoption", data.menopauseoption);
      formData.append("menopausedate", data.menopausedate);
      formData.append("pregnant", data.pregnant);
      formData.append("gestational_age", data.gestational_age);
      formData.append("date_cytology", data.date_cytology);
      formData.append("cytology_observation", data.cytology_observation);

      // Verificar si hay conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "GynecologyForm",
          menarche: data.menarche,
          caesareanSections: data.caesareanSections,
          cycles: data.cycles,
          stillbirths: data.stillbirths,
          gravida: data.gravida,
          livingChildren: data.livingChildren,
          deliveries: data.deliveries,
          datesLastMenstruation: data.datesLastMenstruation,
          abortions: data.abortions,
          planning: data.planning,
          patient_id: data.IDPatient,
          menopauseoption: data.menopauseoption,
          menopausedate: data.menopausedate,
          pregnant: data.pregnant,
          gestational_age: data.gestational_age,
          date_cytology: data.date_cytology,
          cytology_observation: data.cytology_observation,
        };

        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Datos de ginecología guardados localmente en IndexedDB debido a falta de conexión.");
          return "Datos guardados localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar los datos en IndexedDB:", error);
          return "Error al guardar los datos localmente.";
        }
      } else {
        // Si hay conexión, hacer la solicitud al servidor
        const body = new URLSearchParams(formData);
        let config = {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(
          `${API_URL}gynecology/${data.IDPatient}?${body}`,
          config
        );
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async searchGynecology({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(
        `${API_URL}gynecology/${data.keyPatient}`,
        config
      );
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setGynecology", datos);
        return;
      } else {
        commit("setGynecologyEmpty");
      }
    },
    generatePdf: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate-pdf/${data.keyHistory}/${data.keyPatient}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    generateDiagnosis: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate-diagnostic/${data.keyHistory}/${data.keyPatient}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    generateMedicines: async function (_object, data) {
      let formData = new FormData();
      if (data.IDMedicine.length == 0) {
        formData.append("medicine", data.medicines);
      } else {
        formData.append("medicine", JSON.stringify(data.IDMedicine));
      }
      let config = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate/medicine/${data.keyHistory}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    generateMedicine: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate-medicine/${data.keyHistory}/${data.keyPatient}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    generateRemisions: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate-remision/${data.keyHistory}/${data.keyPatient}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    generateIncapacities: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
      };
      const response = await fetch(
        `${API_URL}generate-incapacidad/${data.keyHistory}/${data.keyPatient}`,
        config
      );

      if (!response.ok) {
        const json = await response.json();
        return json.errors || "Ha ocurrido un error";
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
      return "Incapacidad generada exitosamente";
    },
    genetareSummary: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate/summary/of/attention/${data.keyHistory}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    generateRecommendations: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
      };
      const response = await fetch(
        `${API_URL}generate/recommendations/${data.keyHistory}`,
        config
      );

      if (!response.ok) {
        const json = await response.json();
        return json.errors || "Ha ocurrido un error";
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
      return "Recomendaciones generadas exitosamente";
    },
    generateConsent: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate/informed/consent/${data.keyHistory}/${data.keyPatient}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    generateMedicineFocalized: async function (_object, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
        responseType: "blob",
      };
      const response = await fetch(
        `${API_URL}generate/medicine/focalized/${data.keyHistory}/${data.keyPatient}`,
        config
      );
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    async addDisclaimer(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("disclaimer", data.disclaimer);
      formData.append("key_history", data.key_history);
      if (data.key_status == 5) {
        formData.append("key_request", data.key_request);
      }

      // Verificar si hay conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "DisclaimerForm",
          disclaimer: data.disclaimer,
          key_history: data.key_history,
          key_status: data.key_status,
          key_request: data.key_request,
        };

        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Disclaimer guardado localmente debido a falta de conexión.");
          return "Disclaimer guardado localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar el disclaimer en IndexedDB:", error);
          return "Error al guardar el disclaimer localmente.";
        }
      } else {
        // Si hay conexión, hacer la solicitud al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(`${API_URL}disclaimer`, config);
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },
    async searchDisclaimer({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(
        `${API_URL}disclaimer/${data.key_history}`,
        config
      );
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setDisclaimer", datos);
        return;
      } else {
        commit("setDisclaimerEmpty");
      }
    },
    async Signature(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("signature_patient", data.signature_patient);
      formData.append("signature_doctor", data.signature_doctor);
      let config = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}upload/signature/${data.key_history}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        return json.status;
      } else {
        throw new Error(json.errors || "Ha ocurrido un error");
      }
    },
    async searchStatus({ commit }) {
      this.user = [];
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(`${API_URL}history/statuses`, config);
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setStatus", datos);
        return;
      }
    },
    async finishState(_object, data) {
      this.show = true;
      let config = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
          accept: "*/*",
        },
      };
      const response = await fetch(
        `${API_URL}history/statuses/${data.id_history}`,
        config
      );
      if (!response.ok) {
        await response.json();
      }
      const json = await response.json();
      if (json.status) {
        return json.status;
      } else {
        return json.errors;
      }
    },
    async addProcedure(_object, data) {
      this.show = true;
      let formData = new FormData();
      formData.append("key_patient", data.IDPatient);
      formData.append("observation", data.observation);
      formData.append("key_procedures", data.key_procedure);
      formData.append("key_history", data.IDHistory);
      formData.append("confirm_patient", data.application_consent);

      // Verificar si hay conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "ProcedureForm",
          IDPatient: data.IDPatient,
          observation: data.observation,
          key_procedure: data.key_procedure,
          IDHistory: data.IDHistory,
        };

        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Procedure guardado localmente debido a falta de conexión.");
          return "Procedure guardado localmente debido a falta de conexión a Internet.";
        } catch (error) {
          console.error("Error al guardar el procedure en IndexedDB:", error);
          return "Error al guardar el procedure localmente.";
        }
      } else {
        // Si hay conexión, hacer la solicitud al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };
        const response = await fetch(`${API_URL}order/procedure`, config);
        const json = await response.json();
        if (json.status) {
          return json.status;
        } else {
          return json.errors || "Ha ocurrido un error";
        }
      }
    },

    searchProcedure: async function ({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}order/procedure/history/${data}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setProcedures", json);
      } else {
        commit("setProceduresEmpty");
      }
    },
    async destroyPro({ commit }, data) {
      if (data === null || data === "") {
        return false;
      }
      this.show = true;
      let config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}order/procedure/${data}`, config);
      const json = await response.json();
      if (json.status) {
        commit("setProcedures", json);
      } else {
        commit("setProceduresEmpty");
      }
    },
    async signaturePadConsulter({ commit }, data) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(
        `${API_URL}upload/signature/${data}`,
        config
      );
      const json = await response.json();
      if (json.status) {
        commit("setSignature", json);
      } else {
        commit("setSignatureEmpty");
      }
    },
    async serviceGroup({ commit }) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}group/service`, config);
      const json = await response.json();
      if (json.status) {
        commit("setServiceGroup", json);
      } else {
        commit("setServiceGroupEmpty");
      }
    },
    async procedureFodicalized({ commit }) {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const response = await fetch(`${API_URL}procedure/fodicalized`, config);
      const json = await response.json();
      if (json.status) {
        commit("setProcedureFodicalized", json.content);
      } else {
        commit("setProcedureFodicalizedEmpty");
      }
    },
    async addProcedureFodicalized({ commit }, data) {
      let formData = new FormData();
      formData.append("code", data.procedureCode);
      formData.append("description", data.procedureDescription);
      formData.append("type_rips", data.procedureType);

      // Verificar si hay conexión a Internet
      if (!navigator.onLine) {
        // Guardar localmente en IndexedDB
        const localData = {
          formId: "ProcedureFodicalizedForm",
          procedureCode: data.procedureCode,
          procedureDescription: data.procedureDescription,
          procedureType: data.procedureType,
        };

        try {
          await createElements(localData); // Guardar en IndexedDB
          //console.log("Procedure guardado localmente debido a falta de conexión.");
          return {
            success: true,
            data: "Procedure guardado localmente debido a falta de conexión a Internet.",
          };
        } catch (error) {
          console.error("Error al guardar el procedure en IndexedDB:", error);
          return {
            success: false,
            errors: ["Error al guardar el procedure localmente."],
          };
        }
      } else {
        // Si hay conexión, hacer la solicitud al servidor
        let config = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.getUserLogged(),
          },
        };

        try {
          const response = await fetch(
            `${API_URL}procedure/fodicalized`,
            config
          );
          const json = await response.json();
          if (json.status) {
            return { success: true, data: json };
          } else {
            return { success: false, errors: json.errors };
          }
        } catch (error) {
          return {
            success: false,
            errors: ["Error de conexión con el servidor."],
          };
        }
      }
    },
    getConsulterStore({ commit }, data) {
      this.show = true;
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      fetch(`${API_URL}inventory?key_responsability=${data.keyID}&search=${data.search}`, config)
        .then((response) => {
          response.json().then((data) => {
            commit("setLunchBox", data);
          });
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    async deleteDiagnostic({ commit }, data) {
      if (data === null || data === "") {
        return false;
      }
      commit("setOrdersDeleteID", data);
    }
  },
};

export default History;
