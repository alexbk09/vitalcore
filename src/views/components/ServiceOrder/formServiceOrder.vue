<template>
  <div class="py-7">
    <div class="card mt-5 ">
      <div class="card-body">
        <form action="" v-on:submit.prevent="sendFormserviceOrder()">
          <div class="stepper">
            <div v-for="(step, index) in steps" :key="index" class="step">
              <div class="circle" :class="{ 'active': viewContent === index }" @click="changeStep(index)">
                {{ index + 1 }}
              </div>
              <p :class="{ 'active-text': viewContent === index }">{{ step }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 content mt-2" v-if="this.viewContent === 0">
              <p class="text-uppercase text-sm">Datos del Paciente </p>
              <div class="row">
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Coordinador de Operacion:</label>
                  <input type="text" class="form-control form-control-sm" readonly name=""
                    :value="this.userValidate.name" />
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Fecha:</label>
                  <input type="text" class="form-control form-control-sm" readonly name="date" :value="fecha" />
                  <b-alert v-if="msg_error.date" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.date
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">N° de Orden:</label>
                  <input type="text" class="form-control form-control-sm" readonly name="n_order"
                    v-model="serviceOrderr.n_order" />
                  <b-alert v-if="msg_error.n_order" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.n_order
                  }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Estado:</label>
                  <input type="text" class="form-control form-control-sm" readonly name="state" value="Activo" />
                  <b-alert v-if="msg_error.state" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.state
                  }}</b-alert>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Tipo de documento:</label>
                  <select class="form-select form-select-sm" :class="{ 'is-invalid': msg_error.type_ID_patient }"
                    ref="type_ID_patient" name="type_ID_patient" v-model="serviceOrderr.type_ID_patient"
                    id="inlineFormCustomSelectPref">
                    <option value="">Seleccione</option>
                    <option value="1">CC</option>
                    <option value="2">NIT</option>
                    <option value="3">RC</option>
                    <option value="4">TI</option>
                    <option value="5">NUIP</option>
                    <option value="6">CE</option>
                    <option value="7">PA</option>
                    <option value="8">PE</option>
                    <option value="9">SV</option>
                    <option value="10">CD</option>
                    <option value="11">CN</option>
                    <option value="12">MS</option>
                    <option value="13">AS</option>
                  </select>
                  <b-alert v-if="msg_error.type_ID_patient" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.type_ID_patient }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">N° de Identificación:</label>
                  <input type="text" @input="searchPatient" class="form-control form-control-sm"
                    name="number_ID_patient" v-model="serviceOrderr.number_ID_patient"
                    :class="{ 'is-invalid': msg_error.number_ID_patient }" ref="number_ID_patient" />
                  <b-alert v-if="msg_error.number_ID_patient" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.number_ID_patient }}</b-alert>
                  <ul class="autocompletepatiente">
                    <li :key="row.id" v-for="row in getPatientData"
                      @click="selecClickpatient(row.address, row.contact_phone, row.document, row.email, row.first_surname, row.firstname, row.genre, row.id, row.key_department, row.key_locality, row.key_municipality, row.key_type_document, row.middlename, row.phone, row.second_surname,row.patient_ward,row.zone)">
                      <span class="text-busqueda">{{ row.document }} {{ row.first_surname }} {{ row.second_surname }} {{
                        row.firstname }} {{ row.middlename }}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Primer Apellido:</label>
                  <input type="text" class="form-control form-control-sm" name="first_name"
                    :class="{ 'is-invalid': msg_error.first_name }" ref="first_name" v-model="serviceOrderr.first_name" />

                  <b-alert v-if="msg_error.first_name" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.first_name }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Segundo Apellido:</label>
                  <input type="text" class="form-control form-control-sm" name="second_surname"
                    v-model="serviceOrderr.second_surname" :class="{ 'is-invalid': msg_error.second_surname }"
                    ref="second_surname" />
                  <b-alert v-if="msg_error.second_surname" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.second_surname }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Primer Nombre:</label>
                  <input type="text" class="form-control form-control-sm" name="name_patient"
                    v-model="serviceOrderr.name_patient" :class="{ 'is-invalid': msg_error.name_patient }"
                    ref="name_patient" />
                  <b-alert v-if="msg_error.name_patient" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.name_patient }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Otros Nombres:</label>
                  <input type="text" class="form-control form-control-sm" name="second_name_patient"
                    v-model="serviceOrderr.second_name_patient" :class="{ 'is-invalid': msg_error.second_name_patient }"
                    ref="second_name_patient" />
                </div>


                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Genero:</label>
                  <select class="form-select form-select-sm" name="patient_gender"
                    v-model="serviceOrderr.patient_gender" id="inlineFormCustomSelectPref"
                    :class="{ 'is-invalid': msg_error.patient_gender }" ref="patient_gender">
                    <option value="">Seleccione</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                  <b-alert v-if="msg_error.patient_gender" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_gender }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Celular:</label>
                  <input type="text" class="form-control form-control-sm" name="contact_phone"
                    v-model="serviceOrderr.contact_phone" :class="{ 'is-invalid': msg_error.contact_phone }"
                    ref="contact_phone" />
                  <b-alert v-if="msg_error.contact_phone" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.contact_phone }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Otro numero de celular:</label>
                  <input type="text" class="form-control form-control-sm" name="patient_cell"
                    v-model="serviceOrderr.patient_cell" :class="{ 'is-invalid': msg_error.patient_cell }"
                    ref="patient_cell" />
                  <b-alert v-if="msg_error.patient_cell" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_cell }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Zona:</label>
                  <select class="form-select form-select-sm" name="zone_patient" v-model="serviceOrderr.zone_patient"
                    id="inlineFormCustomSelectPref" :class="{ 'is-invalid': msg_error.zone_patient }" ref="zone_patient">
                    <option value="">Seleccione</option>
                    <option value="2">Urbana</option>
                    <option value="1">Rural</option>
                  </select>
                  <b-alert v-if="msg_error.zone_patient" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.zone_patient }}</b-alert>
                </div>
                <div class="col-md-12 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Correo Electronico:</label>
                  <input type="email" class="form-control form-control-sm" name="email_patient"
                    v-model="serviceOrderr.email_patient" />
                  <!-- <b-alert v-if="msg_error.email_patient" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.email_patient }}</b-alert> -->
                </div>
                <div class="col-md-12 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Correo Acompañante:</label>
                  <input type="email" class="form-control form-control-sm" name="companions_email"
                    v-model="serviceOrderr.companions_email" />
                  <!-- <b-alert v-if="msg_error.companions_email" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.companions_email }}</b-alert> -->
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Dirección:</label>
                  <input type="text" class="form-control form-control-sm" name="direction_patient"
                    v-model="serviceOrderr.direction_patient" :class="{ 'is-invalid': msg_error.direction_patient }"
                    ref="direction_patient" />
                  <b-alert v-if="msg_error.direction_patient" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.direction_patient }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Barrio:</label>
                  <input type="text" class="form-control form-control-sm" name="patient_ward"
                    v-model="serviceOrderr.patient_ward" :class="{ 'is-invalid': msg_error.patient_ward }"
                    ref="patient_ward" />
                  <b-alert v-if="msg_error.patient_ward" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_ward }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Sede de atención:</label>
                  <select class="form-select form-select-sm" name="patient_campus"
                    @change="SearchGeoreferencingData(serviceOrderr.patient_campus)"
                    v-model="serviceOrderr.patient_campus" id="inlineFormCustomSelectPref"
                    :class="{ 'is-invalid': msg_error.patient_campus }" ref="patient_campus">
                    <option value="">Seleccione</option>
                    <option :value="items.id_seat" :key="items.id_seat" v-for="items in getseat">{{
                      items.name_seat }}</option>
                  </select>
                  <b-alert v-if="msg_error.patient_campus" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_campus }}</b-alert>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Departamento:</label>
                  <select class="form-select form-select-sm" name="patient_department"
                    v-model="serviceOrderr.patient_department"
                    @change="SearchDepartments(serviceOrderr.patient_department)" id="inlineFormCustomSelectPref"
                    :class="{ 'is-invalid': msg_error.patient_department }" ref="patient_department">
                    <option value="">Seleccione</option>
                    <option :value="items.id" :key="items.id" v-for="items in dataDepartaments">{{ items.name }}
                    </option>
                  </select>
                  <b-alert v-if="msg_error.patient_department" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_department }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4">
                  <label for="example-text-input" class="form-control-label">Municipio:</label>
                  <select class="form-select form-select-sm" name="patient_municipality"
                    v-model="serviceOrderr.patient_municipality" :class="{ 'is-invalid': msg_error.patient_municipality }"
                    ref="patient_municipality" id="inlineFormCustomSelectPref">
                    <option value="">Seleccione</option>
                    <option :value="items.id" :key="items.id" v-for="items in dataMunicipalities">{{ items.name }}
                    </option>
                  </select>
                  <b-alert v-if="msg_error.patient_municipality" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_municipality }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-4" v-if="serviceOrderr.patient_department === 5">
                  <label for="example-text-input" class="form-control-label">Localidad:</label>
                  <select class="form-select form-select-sm" name="patient_location"
                    v-model="serviceOrderr.patient_location" id="inlineFormCustomSelectPref"
                    :class="{ 'is-invalid': msg_error.patient_location }" ref="patient_location">
                    <option value="">Seleccione</option>
                    <option :value="items.id" :key="items.id" v-for="items in getLocalities">{{ items.name }}
                    </option>
                  </select>
                  <b-alert v-if="msg_error.patient_location" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_location }}</b-alert>
                </div>

                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">Causal de solicitud:
                    <!-- Registro de atención: --></label>
                  <textarea class="form-control form-control-sm" id="" rows="5" name="patient_diagnosis"
                    v-model="serviceOrderr.patient_diagnosis" :class="{ 'is-invalid': msg_error.patient_diagnosis }"
                    ref="patient_diagnosis"></textarea>
                  <b-alert v-if="msg_error.patient_diagnosis" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.patient_diagnosis }}</b-alert>
                </div>
              </div>
            </div>
            <div class="col-md-12 content mt-2" v-if="this.viewContent === 1">
              <p class="text-uppercase text-sm">Datos del Registro</p>
              <div class="row">
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Acuerdo Comercial - Pagador:</label>
                  <select class="form-select form-select-sm" name="company_payer" v-model="serviceOrderr.company_payer"
                    @change="SearchAgreements(serviceOrderr.company_payer)" id=""
                    :class="{ 'is-invalid': msg_error.company_payer }" ref="company_payer">
                    <option value="">Seleccione</option>
                    <option :value="items.id_transfer" :key="items.id_transfer" v-for="items in getagreements">{{
                      items.name_agreements }}</option>
                  </select>
                  <b-alert v-if="msg_error.company_payer" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.company_payer }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Georeferenciación:</label>
                  <select class="form-select form-select-sm" name="company_geolocation"
                    v-model="serviceOrderr.company_geolocation" id=""
                    :class="{ 'is-invalid': msg_error.company_geolocation }" ref="company_geolocation">
                    <option value="">Seleccione</option>
                    <option :value="items.id" :key="items.id" v-for="items in getgeoreferencingData">{{
                      items.description }}</option>
                  </select>
                  <b-alert v-if="msg_error.company_geolocation" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.company_geolocation }}</b-alert>
                </div>
                <div class="col-md-4 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Vehículos:</label>
                  <select class="form-select form-select-sm" name="company_vehicle"
                    v-model="serviceOrderr.company_vehicle" id="" :class="{ 'is-invalid': msg_error.company_vehicle }"
                    ref="company_vehicle">
                    <option value="">Seleccione</option>
                    <option :value="items.id_vehicle" :key="items.id_vehicle" v-for="items in getvehicle">{{
                      items.name_vehicle }}</option>
                  </select>
                  <b-alert v-if="msg_error.company_vehicle" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.company_vehicle }}</b-alert>
                </div>
                <div class="col-md-4 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Tipo de evento:</label>
                  <select class="form-select form-select-sm" name="company_event" v-model="serviceOrderr.company_event"
                    id="" :class="{ 'is-invalid': msg_error.company_event }" ref="company_event">
                    <option value="">Seleccione</option>
                    <option :value="items.id_event" :key="items.id_event" v-for="items in getevent">{{
                      items.name_event }}</option>
                  </select>
                  <b-alert v-if="msg_error.company_event" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.company_event }}</b-alert>
                </div>

              </div>
              <div class="row">
                <div
                  :class="serviceOrderr.company_request == 2 || serviceOrderr.company_request == 3 ? 'col-md-4 col-xl-2' : 'col-md-4 col-xl-3'">
                  <label for="example-text-input" class="form-control-label">Tipo de solicitud:</label>
                  <select class="form-select form-select-sm" name="company_request" @change="consulterHistory()"
                    v-model="serviceOrderr.company_request" id="" :class="{ 'is-invalid': msg_error.company_request }"
                    ref="company_request">
                    <option value="">Seleccione</option>
                    <option :value="items.id_request" :key="items.id_request" v-for="items in getrequest">{{
                      items.name_request }}</option>
                  </select>
                  <b-alert v-if="msg_error.company_request" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.company_request }}</b-alert>
                </div>
                <div class="col-md-12 col-xl-2"
                  v-if="serviceOrderr.company_request == 2 || serviceOrderr.company_request == 3">
                  <label for="example-text-input" class="form-control-label">Seleccione una historia:</label>
                  <select name="key_history" v-model="serviceOrderr.key_history" class="form-select form-select-sm"
                    id="">
                    <option value="">Seleccione</option>
                    <option v-for="row in getHistoryData" :key="row.id" :value="row.id">Orden {{ row.num_order }} - {{
                      moment(row.date).format('DD-MM-YYYY') }} </option>
                  </select>
                </div>
                <div
                  :class="serviceOrderr.company_request == 2 || serviceOrderr.company_request == 3 ? 'col-md-4 col-xl-2' : 'col-md-4 col-xl-3'">
                  <label for="example-text-input" class="form-control-label">Empresa en misión:</label>
                  <div class="row">
                    <div class="col-md-9">
                      <select name="id_mision" class="form-select form-select-sm" v-model="serviceOrderr.id_mision"
                        :class="{ 'is-invalid': msg_error.id_mision }" ref="id_mision">
                        <option value="">Seleccione</option>
                        <option :key="row.id" v-for="row in getCompanyData" :value="row.id">{{
                          row.name
                        }} </option>
                      </select>
                      <!-- <input type="text" class="form-control form-control-sm" placeholder="Buscar"
                                autocomplete="off" name="serviceOrderr.company" @input="SearchCompanys"
                                v-model="serviceOrderr.company" />
                              <input type="text" class="form-control" placeholder="Buscar" hidden autocomplete="off"
                                name="serviceOrderr.id_mision" v-model="serviceOrderr.id_mision" />
                              <ul class=" autocompleteCompany ">
                                <li :key="row.id" v-for="row in getCompanyData"
                                  @click="selecClickCompanny(row.id, row.name)"><span class="text-busqueda"> {{ row.id }}
                                    {{ row.name }}</span></li>
                              </ul> -->
                    </div>
                    <div class="col-md-3">
                      <button type="button" class="btn btn-light btn-sm py-1 px-3" @click="loadModal()"
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa fa-plus-square" aria-hidden="true"></i>
                      </button>

                      <!-- Modal -->
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Agregar Empresa de Misión</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <ViewFormCompanyMission v-if="this.loadModalForm === true"
                                :parametro="this.serviceOrderr.company_payer"
                                :valueAgreements="this.serviceOrderr.company_payer" />
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="col-md-12 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Tipo Evaluación médica o
                    Procedimiento:</label>
                  <select name="company_procedure" id="" class="form-select form-select-sm"
                    v-model="serviceOrderr.company_procedure" :class="{ 'is-invalid': msg_error.company_procedure }"
                    ref="company_procedure">
                    <option value="">Seleccione</option>
                    <option :value="items.id" :key="items.id" v-for="items in getProducts">{{
                      items.description }}</option>
                  </select>
                  <b-alert v-if="msg_error.company_procedure" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.company_procedure }}</b-alert>
                </div>
                <div class="col-md-12 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Profesional Asignado:</label>

                  <select class="form-select form-select-sm text-uppercase" name="operator_coordinator"
                    v-model="serviceOrderr.operator_coordinator" :class="{ 'is-invalid': msg_error.operator_coordinator }"
                    ref="operator_coordinator">
                    <option value="">Seleccione</option>
                    <option :value="items.id" :key="items.id" v-for="items in getDoctorData"
                      class="px-5 text-uppercase">{{
                        items.name + ' ' + items.last_name }}</option>
                  </select>
                  <b-alert v-if="msg_error.operator_coordinator" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.operator_coordinator }}</b-alert>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Nombre de Quien Reporta:</label>
                  <input type="text" class="form-control form-control-sm" name="reporting_user"
                    v-model="serviceOrderr.reporting_user" :class="{ 'is-invalid': msg_error.reporting_user }"
                    ref="reporting_user" />
                  <b-alert v-if="msg_error.reporting_user" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.reporting_user }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-2">
                  <label for="example-text-input" class="form-control-label">Cargo:</label>
                  <input type="text" class="form-control form-control-sm" name="user_charge"
                    v-model="serviceOrderr.user_charge" :class="{ 'is-invalid': msg_error.user_charge }"
                    ref="user_charge" />
                  <b-alert v-if="msg_error.user_charge" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.user_charge }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-2">
                  <label for="example-text-input" class="form-control-label">Celular:</label>
                  <input type="text" class="form-control form-control-sm" name="user_phone"
                    v-model="serviceOrderr.user_phone" :class="{ 'is-invalid': msg_error.user_phone }" ref="user_phone" />
                  <b-alert v-if="msg_error.user_phone" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.user_phone }}</b-alert>
                </div>
                <div class="col-md-6 col-xl-2">
                  <label for="example-text-input" class="form-control-label">Otro Celular:</label>
                  <input type="text" class="form-control form-control-sm" name="user_phone_2"
                    v-model="serviceOrderr.user_phone_2" :class="{ 'is-invalid': msg_error.user_phone_2 }"
                    ref="user_phone_2" />
                  <b-alert v-if="msg_error.user_phone_2" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.user_phone_2 }}</b-alert>
                </div>
                <div class="col-md-2 col-xl-1">
                  <label for="example-text-input text-center" class="form-control-label">Copago:</label>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" v-model="checkboxActivado">
                  </div>
                </div>
                <div class="col-md-4 col-xl-2">
                  <label for="example-text-input" class="form-control-label">Valor:</label>
                  <input type="text" class="form-control form-control-sm" :disabled="!checkboxActivado" name="copago"
                    v-model="serviceOrderr.copago" />
                  <b-alert v-if="msg_error.copago" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.copago
                  }}</b-alert>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Codigo de Autorización:</label>
                  <input type="text" class="form-control form-control-sm" name="authorization_code"
                    v-model="serviceOrderr.authorization_code" />
                  <b-alert v-if="msg_error.authorization_code" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.authorization_code }}</b-alert>
                </div>
                <div class="col-md-4 col-xl-3">
                  <label for="example-text-input" class="form-control-label">¿Quien Autoriza?:</label>
                  <input type="text" class="form-control form-control-sm" name="authorizing_user"
                    v-model="serviceOrderr.authorizing_user" :class="{ 'is-invalid': msg_error.authorizing_user }"
                    ref="authorizing_user" />
                  <b-alert v-if="msg_error.authorizing_user" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.authorizing_user }}</b-alert>
                </div>
                <div class="col-md-4 col-xl-3">
                  <label for="example-text-input" class="form-control-label">Tiempo de Espera:</label>
                  <select class="form-select form-select-sm" name="time" v-model="serviceOrderr.time"
                    id="inlineFormCustomSelectPref" :class="{ 'is-invalid': msg_error.time }" ref="time">
                    <option value="">Seleccione</option>
                    <option value="10">10 Minutos</option>
                    <option value="10">30 Minutos</option>
                    <option value="10">60 Minutos</option>
                    <option value="90">90 Minutos</option>
                    <option value="100">100 Minutos</option>
                    <option value="110">110 Minutos</option>
                    <option value="120">120 Minutos</option>
                    <option value="130">130 Minutos</option>
                    <option value="140">140 Minutos</option>
                    <option value="150">150 Minutos</option>
                    <option value="160">160 Minutos</option>
                    <option value="170">170 Minutos</option>
                    <option value="180">180 Minutos</option>
                    <option value="190">190 Minutos</option>
                    <option value="200">200 Minutos</option>
                    <option value="210">210 Minutos</option>
                    <option value="220">220 Minutos</option>
                    <option value="230">230 Minutos</option>
                    <option value="240">240 Minutos</option>
                  </select>
                  <b-alert v-if="msg_error.time" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.time
                  }}</b-alert>
                </div>
                <div class="col-md-2 col-xl-1">
                  <label for="example-text-input text-center" class="form-control-label">Traslado:</label>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" v-model="checkboxTraslate">
                  </div>
                </div>
                <div class="col-md-4 col-xl-2">
                  <label for="example-text-input" class="form-control-label">Codigo de Autorización:</label>
                  <input type="text" class="form-control form-control-sm" :disabled="!checkboxTraslate"
                    name="codeTraslate" v-model="serviceOrderr.codeTraslate" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">Observaciones:</label>
                  <textarea class="form-control form-control-sm" id="" rows="5" name="observation_general"
                    v-model="serviceOrderr.observation_general" :class="{ 'is-invalid': msg_error.observation_general }"
                    ref="observation_general"></textarea>
                  <b-alert v-if="msg_error.observation_general" class="text-danger text-alert" variant="danger" show>{{
                    msg_error.observation_general }}</b-alert>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-6"><a class="btn btn-danger btn-sm " @click="backContent()"
                v-if="this.viewContent === 1">Atras</a></div>
            <div class="col-md-6 text-end" v-if="this.viewContent === 0"><a class="btn btn-info btn-sm "
                @click="nextContent()">Siguiente</a></div>
            <div class="col-md-6 text-end"
              v-if="this.viewContent == 1 && this.serviceOrderr.key_status != 5 && this.serviceOrderr.key_status != 4">
              <argon-button type="submit" color="success " :disabled="spiner === true" size="sm" class="ms-auto">
                <span v-if="spiner === false">Guardar</span>
                <div class="d-flex align-items-center" v-if="spiner === true">
                  <strong class="me-2">Registrando</strong>
                  <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                </div>
              </argon-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import setNavPills from "./../../../assets/js/nav-pills.js";
import setTooltip from "./../../../assets/js/tooltip.js";
import ArgonButton from "./../../../components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import ViewFormCompanyMission from "./../Agreements/formCompanyMission.vue";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Loading from '../Utils/Loading.vue';
import moment from "moment";




export default {
  name: "formserviceOrder",
  data() {
    return {
      userValidate: {},
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      serviceOrderr: {
        operator_coordinator: '',
        time: '',
        date: '',
        n_order: 'Por Asignar',
        state: '',
        type_ID_patient: '',
        number_ID_patient: '',
        first_name: '',
        second_surname: '',
        name_patient: '',
        second_name_patient: '',
        patient_gender: '',
        contact_phone: '',
        patient_cell: '',
        zone_patient: '',
        direction_patient: '',
        patient_ward: '',
        patient_location: '',
        patient_campus: '',
        patient_municipality: '',
        patient_department: '',
        patient_diagnosis: '',
        company: '',
        company_geolocation: '',
        company_vehicle: '',
        company_event: '',
        company_request: '',
        company_payer: '',
        company_procedure: '',
        reporting_user: '',
        user_charge: '',
        user_phone_2: '',
        user_phone: '',
        authorizing_user: '',
        type_transfer: '',
        transfer_code: '',
        authorize: '',
        observation_general: '',
        busquedacups: '',
        id: '',
        id_mision: '',
        amount: '',
        code: '',
        descri: '',
        curren: '',
        type_cups: '',
        type_rips: '',
        id_history: '',
        copago: 0,
        email_patient: '',
        codeTraslate: '',
        company_type: 0,
        companions_email: '',
        key_status: '',
        key_history: '',
      },
      msg_error: {
        operator_coordinator: '',
        time: '',
        date: '',
        n_order: '',
        state: '',
        type_ID_patient: '',
        number_ID_patient: '',
        first_name: '',
        second_surname: '',
        name_patient: '',
        second_name_patient: '',
        patient_gender: '',
        contact_phone: '',
        patient_cell: '',
        zone_patient: '',
        direction_patient: '',
        patient_ward: '',
        patient_location: '',
        patient_campus: '',
        patient_municipality: '',
        patient_department: '',
        patient_diagnosis: '',
        company_geolocation: '',
        company_vehicle: '',
        company_event: '',
        company_request: '',
        company_payer: '',
        company_procedure: '',
        reporting_user: '',
        user_charge: '',
        user_phone_2: '',
        user_phone: '',
        authorizing_user: '',
        type_transfer: '',
        transfer_code: '',
        authorize: '',
        observation_general: '',
        email_patient: '',
        codeTraslate: '',
        company_type: '',
        companions_email: '',
        copago: ''
      },
      show: false,
      searchserviceOrder: this.$route.params.id,
      searchKeyPatient: this.$route.params.key_patient,
      viewContent: 0,
      ItemsNameContact: "",
      loadModalForm: false,
      dataCups: {
        data_cups: '',
        key_agreements: '',
      },
      keyHistory: '',
      keyPatient: '',
      checkboxActivado: false,
      checkboxTraslate: false,
      spiner: false,
      isLoading: true,
      title: 'Formulario',
      viewContent: 0,
      steps: [
        "Datos del paciente",
        "Datos del registro",
      ]
    };

  },
  components: {
    ArgonButton,
    ViewFormCompanyMission,
    Loading
  },

  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    await this.get();
    await this.getpanel();
    await this.getDocumentType();
    await this.getevents();
    await this.getrequests();
    await this.getDepartaments();
    await this.getagreement()
    this.validateUser()
    await this.searchDoctor();
    await this.loadingActive()
    if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
      await this.loadingActive()
      this.serviceOrderr = this.getserviceOrderID
      await this.SearchDepartments(this.serviceOrderr.patient_department)
      await this.getMunicipalities(this.serviceOrderr.patient_municipality)
      await this.SearchAgreements(this.serviceOrderr.company_payer)
      await this.SearchGeoreferencingData(this.serviceOrderr.patient_campus)
      if (this.serviceOrderr.copago != '') {
        this.checkboxActivado = true
      }
      if (this.serviceOrderr.codeTraslate != '') {
        this.checkboxTraslate = true
      }
      this.getCompanyData = ''
    }
  },
  methods: {
    ...mapActions('ServiceOrder', ['get', "AggserviceOrder", "SearchOrder", "updateServiceOrder", "searchDoctor", "SearchPatient", "clearPatient", "getHistoryPatient"]),
    ...mapActions('Cups', ["searchCupsAgreements", "cleadCups"]),
    ...mapActions('Vehicle', ["getvehicleSeat"]),
    ...mapActions('EventType', ["getevents"]),
    ...mapActions('Request', ["getrequests"]),
    ...mapActions('Seat', ["getpanel"]),
    ...mapActions('DocumentType', ["getDocumentType"]),
    ...mapActions('Municipality', ["getDepartaments", "getLocalitiesType", "getMunicipalities"]),
    ...mapActions('Agreements', ["getagreement", "Search", "searchCompany", "cleadCompany", "getgeoreferencing", "getCompany"]),
    ...mapActions('Products', ["get", "destroy"]),
    async getStoreserviceOrder() {
      if (this.searchserviceOrder != undefined) {
        const searchOrder = {
          keyHistory: this.searchserviceOrder,
          keyPatient: this.searchKeyPatient
        }
        await this.SearchOrder(searchOrder)
      }
    },
    changeStep(index) {
      if (this.viewContent === 0) {
        if (!this.viewContentTwo()) {
          return false;
        }
      }
      this.viewContent = index;
    },
    moment,
    async consulterHistory() {
      //console.log(this.serviceOrderr.id);
      await this.getHistoryPatient(this.serviceOrderr.id)
    },
    async loadingActive() {
      this.isLoading = true
      //console.log('estoy en la linea 636');
      await this.getStoreserviceOrder()
      this.isLoading = false
    },
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem('user'))
    },
    resetForm() {
      this.msg_error.operator_coordinator = '',
        this.msg_error.time = '',
        this.msg_error.date = '',
        this.msg_error.n_order = '',
        this.msg_error.state = '',
        this.msg_error.type_ID_patient = '',
        this.msg_error.number_ID_patient = '',
        this.msg_error.first_name = '',
        this.msg_error.second_surname = '',
        this.msg_error.name_patient = '',
        this.msg_error.second_name_patient = '',
        this.msg_error.patient_gender = '',
        this.msg_error.contact_phone = '',
        this.msg_error.patient_cell = '',
        this.msg_error.zone_patient = '',
        this.msg_error.direction_patient = '',
        this.msg_error.email_patient = '',
        this.msg_error.patient_ward = '',
        this.msg_error.patient_location = '',
        this.msg_error.patient_campus = '',
        this.msg_error.patient_municipality = '',
        this.msg_error.patient_department = '',
        this.msg_error.patient_diagnosis = '',

        this.msg_error.company_geolocation = '',
        this.msg_error.company_vehicle = '',
        this.msg_error.company_event = '',
        this.msg_error.company_request = '',
        this.msg_error.company_payer = '',
        this.msg_error.company_procedure = '',
        this.msg_error.reporting_user = '',
        this.msg_error.user_charge = '',
        this.msg_error.user_phone_2 = '',
        this.msg_error.user_phone = '',
        this.msg_error.authorizing_user = '',
        this.msg_error.type_transfer = '',
        this.msg_error.transfer_code = '',
        this.msg_error.authorize = '',
        this.msg_error.observation_general = ''
      this.msg_error.company_type = ''
    },
    async sendFormserviceOrder() {
      this.resetForm()
      if (!this.$validatePropertyEmpty(this.serviceOrderr.company_payer)) {
        this.msg_error.company_payer = 'Este campo es obligatorio';
        this.$refs.company_payer.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.company_geolocation)) {
        this.msg_error.company_geolocation = 'Este campo es obligatorio';
        this.$refs.company_geolocation.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.company_vehicle)) {
        this.msg_error.company_vehicle = 'Este campo es obligatorio';
        this.$refs.company_vehicle.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.company_event)) {
        this.msg_error.company_event = 'Este campo es obligatorio';
        this.$refs.company_event.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.company_request)) {
        this.msg_error.company_request = 'Este campo es obligatorio';
        this.$refs.company_request.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.id_mision)) {
        this.msg_error.id_mision = 'Este campo es obligatorio';
        this.$refs.id_mision.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.company_procedure)) {
        this.msg_error.company_procedure = 'Este campo es obligatorio';
        this.$refs.company_procedure.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.operator_coordinator)) {
        this.msg_error.operator_coordinator = 'Este campo es obligatorio';
        this.$refs.operator_coordinator.scrollIntoView({ behavior: 'smooth' });
        return
      }



      if (!this.$validatePropertyEmpty(this.serviceOrderr.time)) {
        this.msg_error.time = 'Este campo es obligatorio';
        this.$refs.time.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (this.checkboxActivado == true) {
        if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.serviceOrderr.copago)) {
          this.msg_error.copago = 'Este campo solo acepta valores numericos';
          this.$refs.copago.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
        this.serviceOrderr.id_history = this.searchserviceOrder
        this.spiner = true
        const response = await this.updateServiceOrder(this.serviceOrderr)
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La orden se modifico con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.spiner = false
          this.$router.push('/serviceOrder')
        }
        if (response === false) {
          this.spiner = false
          Swal.fire({
            icon: 'error',
            title: 'Lo siento, la orden no pudo ser modificada',
            text: 'Intentalo de nuevo',
          })
        }
      } else {
        this.spiner = true
        const response = await this.AggserviceOrder(this.serviceOrderr)
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La orden se agrego con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.spiner = false
          this.$router.push('/serviceOrder')
        }
        if (response === false) {
          this.spiner = false
          Swal.fire({
            icon: 'error',
            title: 'Lo siento, la orden no pudo ser agregada',
            text: 'Intentalo de nuevo',
          })
        }
      }


    },
    nextContent() {
      this.resetForm()
      this.regex = /^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/;
      switch (this.viewContent) {
        case 0:
          this.resetForm()
          if (!this.viewContentTwo()) {
            return false
          }
          this.viewContent = 1
          break;
        case 1:
          this.viewContent = 2
          break;
        case 2:
          this.viewContent = 3
          break;
      }
    },
    viewContentOne() {
      this.viewContent = 0
    },
    viewContentTwo() {
      this.resetForm()

      if (!this.$validatePropertyEmpty(this.serviceOrderr.type_ID_patient)) {
        this.msg_error.type_ID_patient = 'Este campo es obligatorio';
        this.$refs.type_ID_patient.scrollIntoView({ behavior: 'smooth' });
        return false
      }

      if (!this.$validatePropertyEmpty(this.serviceOrderr.number_ID_patient)) {
        this.msg_error.number_ID_patient = 'Este campo es obligatorio';
        this.$refs.number_ID_patient.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.serviceOrderr.number_ID_patient)) {
        this.msg_error.number_ID_patient = "Este campos solo acepta formatos numericos"
        this.$refs.number_ID_patient.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.first_name)) {
        this.msg_error.first_name = 'Este campo es obligatorio';
        this.$refs.first_name.scrollIntoView({ behavior: 'smooth' });
        return
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.second_surname)) {
        this.msg_error.second_surname = 'Este campo es obligatorio';
        this.$refs.second_surname.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.name_patient)) {
        this.msg_error.name_patient = 'Este campo es obligatorio';
        this.$refs.name_patient.scrollIntoView({ behavior: 'smooth' });
        return false
      }


      if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_gender)) {
        this.msg_error.patient_gender = 'Este campo es obligatorio';
        this.$refs.patient_gender.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.contact_phone)) {
        this.msg_error.contact_phone = 'Este campo es obligatorio';
        this.$refs.contact_phone.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (!this.regex.test(this.serviceOrderr.contact_phone)) {
        this.msg_error.contact_phone = 'Este campo es obligatorio';
        this.$refs.contact_phone.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      /* if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_cell)) {
        this.msg_error.patient_cell = "El numero celular es obligatorio"
        return false
      }
      if (!this.regex.test(this.serviceOrderr.patient_cell)) {
        this.msg_error.patient_cell = "Este campo solo acepta caracteres numericos"
        return false
      } */
      if (!this.$validatePropertyEmpty(this.serviceOrderr.zone_patient)) {
        this.msg_error.zone_patient = 'Este campo es obligatorio';
        this.$refs.zone_patient.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.direction_patient)) {
        this.msg_error.direction_patient = 'Este campo es obligatorio';
        this.$refs.direction_patient.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      /* if (!this.$validatePropertyEmpty(this.serviceOrderr.email_patient)) {
        this.msg_error.email_patient = "Correo electronico es obligatorio"
        return false
      } */
      /* if (!this.$validatePropertyEmpty(this.serviceOrderr.companions_email)) {
        this.msg_error.companions_email = "El Correo del acompañante es obligatorio"
        return false
      } */
      if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_ward)) {
        this.msg_error.patient_ward = 'Este campo es obligatorio';
        this.$refs.patient_ward.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_campus)) {
        this.msg_error.patient_campus = 'Este campo es obligatorio';
        this.$refs.patient_campus.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_department)) {
        this.msg_error.patient_department = 'Este campo es obligatorio';
        this.$refs.patient_department.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_municipality)) {
        this.msg_error.patient_municipality = 'Este campo es obligatorio';
        this.$refs.patient_municipality.scrollIntoView({ behavior: 'smooth' });
        return false
      }
      if (this.serviceOrderr.patient_department === 5) {
        if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_location)) {
          this.msg_error.patient_location = 'Este campo es obligatorio';
          this.$refs.patient_location.scrollIntoView({ behavior: 'smooth' });
          return false
        }
      }
      if (!this.$validatePropertyEmpty(this.serviceOrderr.patient_diagnosis)) {
        this.msg_error.patient_diagnosis = 'Este campo es obligatorio';
        this.$refs.patient_diagnosis.scrollIntoView({ behavior: 'smooth' });
        return false
      }



      this.viewContent = 1
    },
    viewContentThree() {
      this.resetForm()
      this.viewContent = 2
    },
    viewContentFour() {
      this.resetForm()
      this.viewContent = 3
    },
    backContent() {
      if (this.viewContent === 1) {
        this.viewContent = 0
      }
      if (this.viewContent === 2) {
        this.viewContent = 1
      }
      if (this.viewContent === 3) {
        this.viewContent = 2
      }
    },
    async SearchAgreements(id) {
      /* alert('he llegado aqui') */
      this.getCompanyData = ''
      if (id != '') {
        await this.getCompany(id)
        await this.getgeoreferencing(id)
      }
      return this.agreements = id
    },
    SearchGeoreferencingData(id) {
      this.getvehicleSeat(id)
    },
    async searchCupss() {
      this.dataCups.data_cups = this.serviceOrderr.company_procedure
      this.dataCups.key_agreements = this.agreements
      if (this.serviceOrderr.company_procedure != '') {
        await this.searchCupsAgreements(this.dataCups)
      } else {
        this.serviceOrderr.company_procedure = ''
      }
    },
    async SearchCompanys() {
      if (this.serviceOrderr.company != '') {
        this.serviceOrderr.id = this.agreements
        await this.searchCompany(this.serviceOrderr)
      }
    },
    selecClickCompanny(id, name) {
      this.serviceOrderr.company = name
      this.serviceOrderr.id_mision = id
      this.cleadCompany()
    },
    async SearchDepartments(id) {
      await this.getLocalitiesType(id)
      await this.getMunicipalities(id)
    },
    async loadModal() {
      this.loadModalForm = true
    },
    async searchPatient() {
      if (this.serviceOrderr.number_ID_patient.length > 4) {
        this.searchValue = this.serviceOrderr.number_ID_patient
        await this.SearchPatient(this.searchValue)
      }
    },
    selecClickpatient(address, contact_phone, document, email, first_surname, firstname, genre, id, key_department, key_locality, key_municipality, key_type_document, middlename, phone, second_surname,zone,patient_ward) {
      /* console.log("🚀 ~ selecClickpatient ~ zone:", zone, "~ selecClickpatient ~ zone:",patient_ward) */
      this.serviceOrderr.number_ID_patient = document
      this.serviceOrderr.first_name = first_surname
      this.serviceOrderr.second_surname = second_surname
      this.serviceOrderr.name_patient = firstname
      this.serviceOrderr.second_name_patient = middlename
      this.serviceOrderr.id = id
      this.serviceOrderr.type_ID_patient = key_type_document
      this.serviceOrderr.patient_gender = genre
      this.serviceOrderr.contact_phone = contact_phone
      this.serviceOrderr.patient_cellphone = phone
      this.serviceOrderr.email_patient = email
      this.serviceOrderr.direction_patient = address
      this.serviceOrderr.patient_department = key_department
      this.serviceOrderr.patient_location = key_locality
      this.serviceOrderr.patient_municipality = key_municipality
      this.serviceOrderr.patient_ward = patient_ward
      this.serviceOrderr.zone_patient = zone


      this.getMunicipalities(key_department)
      this.getLocalitiesType(key_department)


      return this.clearPatient()

    },
  },
  computed: {
    ...mapGetters('ServiceOrder', ['getserviceOrderID', 'getDoctorData', 'getPatientData', 'getHistoryData']),
    ...mapGetters('Cups', ['getCups']),
    ...mapGetters('Vehicle', ['getvehicle']),
    ...mapGetters('EventType', ['getevent']),
    ...mapGetters('Request', ['getrequest']),
    ...mapGetters('Seat', ['getseat']),
    ...mapGetters('DocumentType', ['getDocument']),
    ...mapGetters('Municipality', ['dataDepartaments', 'getLocalities', 'dataMunicipalities']),
    ...mapGetters('Agreements', ['getagreements', 'getCompanyData', 'getgeoreferencingData', 'getgeoreferencinglDataID']),
    ...mapGetters('Products', ['getProducts']),
  }
};
</script>

<style>
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  text-align: center;
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #87b6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.circle.active {
  background-color: #007bff;
}

p {
  margin-top: 5px;
  font-size: 14px;
  color: #6c757d;
}

p.active-text {
  color: #007bff;
  font-weight: bold;
}

.line {
  position: absolute;
  top: 50%;
  left: 100%;
  height: 5px;
  width: calc(100% - 60px);
  background-color: #87b6ff;
  transform: translateY(-50%);
}

.step:last-child .line {
  display: none;
}

@media (max-width: 768px) {
  .circle {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  p {
    font-size: 12px;
  }
}

.content {
  margin-top: -50px !important;
  border-top: 1px solid #F8F8F8;
  border-radius: 10px;
}

.contentState {
  cursor: pointer;
}

ul.autocompleteOrder {
  background: white;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 46%;
  position: absolute;
  z-index: 101;
}

ul.autocompleteOrder>li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

ul.autocompleteOrder>li:hover {
  background: #d2d2d24d;
}


ul.autocomplete-list {
  background: white;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  position: absolute;
  z-index: 101;
  display: none;
}

ul.autocomplete-list>li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

ul.autocomplete-list>li:hover {
  background: #d2d2d24d;
}



ul.autocompleteCompany {
  background: white;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 40%;
  position: absolute;
  z-index: 101;
}

ul.autocompleteCompany>li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

ul.autocompleteCompany>li:hover {
  background: #d2d2d24d;
}

.text-busqueda {
  font-size: 13px;
  text-transform: capitalize;
}

.text-alert {
  font-size: 12px;
}

ul.autocompletepatiente {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 40%;
  z-index: 101;
  border-radius: 20px;
  background-color: white;
}

ul.autocompletepatiente>li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

ul.autocompletepatiente>li:hover {
  background: #d2d2d24d;
}

.is-invalid {
  border-color: red;
}
</style>