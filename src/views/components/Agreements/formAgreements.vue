<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="container-fluid py-7" v-else>
      <form action="" v-on:submit.prevent="sendFormAgreements()">
        <div class="row justify-content-center">
          <div class="col-md-12 col-xl-3 mb-3">
            <div class="card">
              <div class="card-body">
                <p class="mb-0">{{ this.$route.name }}</p>
                <div class="row contentState" @click="this.viewContentOne()">
                  <div class="col-md-1 p-2 text-center ">
                    <h5 class=" " :class="this.viewContent === 0 ? 'text-info' : 'text-black-50'">1</h5>
                  </div>
                  <div class="col-md-8 p-2">
                    <h6 class="" :class="this.viewContent === 0 ? 'text-info' : 'text-black-50'">DATOS DEL CONTRATO</h6>
                  </div>
                </div>
                <div class="row contentState" @click="this.viewContentTwo()">
                  <div class="col-md-1 p-2 text-center">
                    <h5 class=" " :class="this.viewContent === 1 ? 'text-info' : 'text-black-50'">2</h5>
                  </div>
                  <div class="col-md-8 p-2">
                    <h6 :class="this.viewContent === 1 ? 'text-info' : 'text-black-50'">DATOS DEL CLIENTE</h6>
                  </div>
                </div>
                <div class="row contentState" @click="this.viewContentThree()">
                  <div class="col-md-1 p-2 text-center">
                    <h5 class=" " :class="this.viewContent === 2 ? 'text-info' : 'text-black-50'">3</h5>
                  </div>
                  <div class="col-md-8 p-2">
                    <h6 :class="this.viewContent === 2 ? 'text-info' : 'text-black-50'">DATOS DEL VENDEDOR</h6>
                  </div>
                </div>
                <div class="row contentState" @click="this.viewContentFour()">
                  <div class="col-md-1 p-2 text-center">
                    <h5 class=" " :class="this.viewContent === 3 ? 'text-info' : 'text-black-50'">4</h5>
                  </div>
                  <div class="col-md-8 p-2">
                    <h6 :class="this.viewContent === 3 ? 'text-info' : 'text-black-50'">DATOS PARA FACTURACION
                      ELECTRONICA</h6>
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="d-grid gap-2">

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-xl-9">
            <div class="card">
              <div class="card-header ">

              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 content" v-if="this.viewContent === 0">
                    <div class="card-body">
                      <p class="text-uppercase text-sm">Datos del Contrato </p>
                      <div class="row">
                        <div class="col-md-7 col-xl-6">
                          <label for="example-text-input" class="form-control-label">Nombre del Acuerdo Comercial,
                            Contrato o Convenio:</label>
                          <input type="text" class="form-control form-control-sm" name="name_agreements"
                            v-model="agreements.name_agreements" />
                          <b-alert v-if="msg_error.name_agreements" class="text-danger" variant="danger" show>{{
                            msg_error.name_agreements }}</b-alert>
                        </div>
                        <div class="col-md-5 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Numero de Contrato:</label>
                          <input type="text" class="form-control form-control-sm" name="number_contract"
                            v-model="agreements.number_contract" />
                          <b-alert v-if="msg_error.number_contract" class="text-danger" variant="danger" show>{{
                            msg_error.number_contract }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Estado</label>
                          <select class="form-select form-select-sm" name="state" v-model="agreements.state"
                            aria-label="Default select example">
                            <option value="1">Activo</option>
                            <option value="2">Desactivado</option>
                          </select>
                          <b-alert v-if="msg_error.state" class="text-danger" variant="danger" show>{{ msg_error.state
                          }}</b-alert>
                        </div>

                        <div class="col-md-6 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Fecha del Corte de
                            Facturacion:</label>
                          <input type="date" class="form-control form-control-sm" name="billing"
                            v-model="agreements.billing" />
                          <b-alert v-if="msg_error.billing" class="text-danger" variant="danger" show>{{ msg_error.billing
                          }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Dias para de Corte:</label>
                          <input type="number" class="form-control form-control-sm" min="1" max="180" name="days_to_pay"
                            v-model="agreements.days_to_pay" />
                          <b-alert v-if="msg_error.days_to_pay" class="text-danger" variant="danger" show>{{
                            msg_error.days_to_pay
                          }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Vigencia Desde:</label>
                          <input type="date" class="form-control form-control-sm" name="validity_since"
                            v-model="agreements.validity_since" />
                          <b-alert v-if="msg_error.validity_since" class="text-danger" variant="danger" show>{{
                            msg_error.validity_since }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Vigencia Hasta:</label>
                          <input type="date" class="form-control form-control-sm" name="validity_until"
                            v-model="agreements.validity_until" />
                          <b-alert v-if="msg_error.validity_until" class="text-danger" variant="danger" show>{{
                            msg_error.validity_until }}</b-alert>
                        </div>
                      </div>
                      <div class="row">

                        <div class="col-md-6 col-xl-4">
                          <label for="example-text-input" class="form-control-label">Correo Electronico:</label>
                          <input type="text" class="form-control form-control-sm" name="email"
                            v-model="agreements.email" />
                          <b-alert v-if="msg_error.email" class="text-danger" variant="danger" show>{{ msg_error.email
                          }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-4">
                          <label for="example-text-input" class="form-control-label">Cobertura o plan beneficios:</label>
                          <select class="form-select form-select-sm" name="coverage" v-model="agreements.coverage" id="">
                            <option value="1">Plan de beneficios en salud financiado con UPC</option>
                            <option value="2">Prima EPS / EOC, no asegurados SOAT</option>
                            <option value="3">Cobertura ARL</option>
                            <option value="4">Cobertura ADRES</option>
                            <option value="5">Cobertura Salud Publica</option>
                            <option value="6">Cobertura entidad territorial, recursos de oferta</option>
                            <option value="7">Urgencias poblacion migrante</option>
                            <option value="8">Plan complementario en salud</option>
                            <option value="9">Plan medicina prepagada</option>
                            <option value="10">Otras polizas en salud</option>
                            <option value="11">Cobertura Regimen Especial o Excepcion</option>
                            <option value="12">Cobertura fondo Nacional de Salud de las Personas Privadas de la Libertad
                            </option>
                            <option value="13">Particular</option>
                          </select>
                          <b-alert v-if="msg_error.coverage" class="text-danger" variant="danger" show>{{
                            msg_error.coverage }}</b-alert>
                        </div>
                        <div class="col-md-12 col-xl-4">
                          <label for="example-text-input" class="form-control-label">Modalidad de contratacion y
                            pago:</label>
                          <select class="form-select form-select-sm" name="modality" v-model="agreements.modality" id="">
                            <option value="1">Paquete/Canasta/Conjunto Intregral en Salud</option>
                            <option value="2">Grupos relacionados por diagnostico</option>
                            <option value="3">Integral por grupo de riesgo</option>
                            <option value="4">Pago por contacto por especialidad</option>
                            <option value="5">Pago por escenario de atencion</option>
                            <option value="6">Pago por tipo de servicio</option>
                            <option value="7">Pago global prospectivo por episodio</option>
                            <option value="8">Pago global prospectivo por grupo de riesgo</option>
                            <option value="9">Pago global prospectivo por especialidad</option>
                            <option value="10">Pago global prospectivo por nivel de complejidad</option>
                            <option value="11">Capitacion</option>
                            <option value="12">Por servicio</option>
                          </select>
                          <b-alert v-if="msg_error.modality" class="text-danger" variant="danger" show>{{
                            msg_error.modality }}</b-alert>
                        </div>
                        <div class="col-md-12">
                          <label for="example-text-input" class="form-control-label">EPS o Entidad Administradora (Para
                            generar RIPS):</label>
                          <input type="text" class="form-control form-control-sm" name="generate_rips"
                            v-model="agreements.generate_rips" />
                          <b-alert v-if="msg_error.generate_rips" class="text-danger" variant="danger" show>{{
                            msg_error.generate_rips }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 content" v-if="this.viewContent === 1">
                    <div class="card-body">
                      <p class="text-uppercase text-sm">Datos del Cliente </p>
                      <div class="row">
                        <div class="col-md-6 col-xl-2">
                          <label for="example-text-input" class="form-control-label">Tipo:</label>
                          <select class="form-select form-select-sm" name="type_ID_client"
                            v-model="agreements.type_ID_client" id="inlineFormCustomSelectPref">
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
                          <b-alert v-if="msg_error.type_ID_client" class="text-danger" variant="danger" show>{{
                            msg_error.type_ID_client }}</b-alert>
                        </div>
                        <div class="col-md-4 col-xl-3">
                          <label for="example-text-input"
                            class="form-control-label">N° de Identificacion:</label>
                          <input type="text" class="form-control form-control-sm"
                            name="number_ID_client" v-model="agreements.number_ID_client" />
                          <b-alert v-if="msg_error.number_ID_client" class="text-danger" variant="danger" show>{{
                            msg_error.number_ID_client }}</b-alert>
                        </div>
                        <div class="col-md-2 col-xl-3" :style="this.agreements.type_ID_client == 2 ? 'display:block' : 'display:none'">
                          <label for="example-text-input" class="form-control-label">Dv:</label>
                          <input type="text" class="form-control form-control-sm" name="dv_client"
                            v-model="agreements.dv_client" />
                          <b-alert v-if="msg_error.dv_client" class="text-danger" variant="danger" show>{{
                            msg_error.dv_client }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3" :style="this.agreements.type_ID_client == 2 ? 'display:none' : ''">
                          <label for="example-text-input" class="form-control-label" >Primer Apellido:</label>
                          <input type="text" class="form-control form-control-sm" name="surname_client"
                            v-model="agreements.surname_client" />
                          <b-alert v-if="msg_error.surname_client" class="text-danger" variant="danger" show>{{
                            msg_error.surname_client }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3" :style="this.agreements.type_ID_client == 2 ? 'display:none' : ''">
                          <label for="example-text-input" class="form-control-label" >Segundo Apellido:</label>
                          <input type="text" class="form-control form-control-sm" name="second_surname_client"
                            v-model="agreements.second_surname_client" />
                          <b-alert v-if="msg_error.second_surname_client" class="text-danger" variant="danger" show>{{
                            msg_error.second_surname_client }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3" >
                          <label for="example-text-input" class="form-control-label" v-if="this.agreements.type_ID_client != 2">Primer Nombre:</label>
                          <label for="example-text-input" v-if="this.agreements.type_ID_client == 2"
                            class="form-control-label">Razon Social:</label>
                          <input type="text" class="form-control form-control-sm" name="name_client"
                            v-model="agreements.name_client" />
                          <b-alert v-if="msg_error.name_client" class="text-danger" variant="danger" show>{{
                            msg_error.name_client }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3" :style="this.agreements.type_ID_client == 2 ? 'display:none' : ''">
                          <label for="example-text-input" class="form-control-label">Otros Nombres:</label>
                          <input type="text" class="form-control form-control-sm" name="second_name_client"
                            v-model="agreements.second_name_client" />
                        </div>
                      
                        <div class="col-md-2">
                          <label for="example-text-input" class="form-control-label">Zona:</label>
                          <select class="form-select form-select-sm" name="zone_client" v-model="agreements.zone_client"
                            id="inlineFormCustomSelectPref">
                            <option value="1">URBANA</option>
                            <option value="2">RURAL</option>
                          </select>
                          <b-alert v-if="msg_error.zone_client" class="text-danger" variant="danger" show>{{
                            msg_error.zone_client }}</b-alert>
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Direccion:</label>
                          <input type="text" class="form-control form-control-sm" name="direction_client"
                            v-model="agreements.direction_client" />
                          <b-alert v-if="msg_error.direction_client" class="text-danger" variant="danger" show>{{
                            msg_error.direction_client }}</b-alert>
                        </div>
                        <div class="col-md-2">
                          <label for="example-text-input" class="form-control-label">Barrio:</label>
                          <input type="text" class="form-control form-control-sm" name="precinct_client"
                            v-model="agreements.precinct_client" />
                          <b-alert v-if="msg_error.precinct_client" class="text-danger" variant="danger" show>{{
                            msg_error.precinct_client }}</b-alert>
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Municipio:</label>
                          <select class="form-select form-select-sm" name="municipality_client"
                            v-model="agreements.municipality_client">
                            <option value="1">Amazonas</option>
                            <option value="2">Antioquia</option>
                            <option value="3">Arauca</option>
                            <option value="4">Atlántico</option>
                            <option value="5">Bolívar</option>
                            <option value="6">Boyacá</option>
                            <option value="7">Caldas</option>
                            <option value="8">Caquetá</option>
                            <option value="9">Casanare</option>
                            <option value="10">Cauca</option>
                            <option value="11">Cesar</option>
                            <option value="12">Chocó</option>
                            <option value="13">Córdoba</option>
                            <option value="14">Cundinamarca</option>
                            <option value="15">Guainía</option>
                            <option value="16">Guaviare</option>
                            <option value="17">Huila</option>
                            <option value="18">La Guajira</option>
                            <option value="19">Magdalena</option>
                            <option value="20">Meta</option>
                            <option value="21">Nariño</option>
                            <option value="22">Norte De Santander</option>
                            <option value="23">Putumayo</option>
                            <option value="24">Quindío</option>
                            <option value="25">Risaralda</option>
                            <option value="26">San Andrés</option>
                            <option value="27">Santander</option>
                            <option value="28">Sucre</option>
                            <option value="29">Tolima</option>
                            <option value="30">Valle Del Cauca</option>
                            <option value="31">Vaupés</option>
                            <option value="32">Vichada</option>
                          </select>
                          <b-alert v-if="msg_error.municipality_client" class="text-danger" variant="danger" show>{{
                            msg_error.municipality_client }}</b-alert>
                        </div>
                      
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Celulares:</label>
                          <input type="text" class="form-control form-control-sm" name="mobile_client"
                            v-model="agreements.mobile_client" />
                          <b-alert v-if="msg_error.mobile_client" class="text-danger" variant="danger" show>{{
                            msg_error.mobile_client }}</b-alert>
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Telefonos:</label>
                          <input type="text" class="form-control form-control-sm" name="phone_client"
                            v-model="agreements.phone_client" />
                          <b-alert v-if="msg_error.phone_client" class="text-danger" variant="danger" show>{{
                            msg_error.phone_client }}</b-alert>
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Correo Electronico:</label>
                          <input type="text" class="form-control form-control-sm" name="email_client_client"
                            v-model="agreements.email_client_client" />
                          <b-alert v-if="msg_error.email_client_client" class="text-danger" variant="danger" show>{{
                            msg_error.email_client_client }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 content" v-if="this.viewContent === 2">
                    <div class="card-body">
                      <p class="text-uppercase text-sm">Datos del Vendedor </p>
                      <div class="row">
                        <div class="col-md-6 col-xl-1">
                          <label for="example-text-input" class="form-control-label">Tipo:</label>
                          <select class="form-select form-select-sm" name="type_ID_seller"
                            v-model="agreements.type_ID_seller" id="inlineFormCustomSelectPref">
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
                        </div>
                        <div class="col-md-4 col-xl-2">

                          <label for="example-text-input"
                            class="form-control-label">N° de Identificacion:</label>
                          
                          <input type="text" class="form-control form-control-sm"
                            name="number_ID_seller" v-model="agreements.number_ID_seller" />
                          <b-alert v-if="msg_error.number_ID_seller" class="text-danger" variant="danger" show>{{
                            msg_error.number_ID_seller }}</b-alert>
                        </div>
                        <div class="col-md-2 col-xl-1" :style="this.agreements.type_ID_seller == 2 ? 'display:block' : 'display:none'">
                          <label for="example-text-input" class="form-control-label">Dv:</label>
                          <input type="text" class="form-control form-control-sm" name="dv_seller"
                            v-model="agreements.dv_seller" />
                        </div>
                        <div class="col-md-6 col-xl-2">
                          <label for="example-text-input" class="form-control-label" v-if="this.agreements.type_ID_seller != 2">Primer Apellido:</label>
                          <label for="example-text-input" v-if="this.agreements.type_ID_seller == 2"
                            class="form-control-label">Razon Social:</label>
                          <input type="text" class="form-control form-control-sm" name="surname_seller"
                            v-model="agreements.surname_seller" />
                        </div>
                        <div class="col-md-6 col-xl-2" :style="this.agreements.type_ID_seller == 2 ? 'display:none' : ''">
                          <label for="example-text-input" class="form-control-label">Segundo Apellido:</label>
                          <input type="text" class="form-control form-control-sm" name="second_surname_seller"
                            v-model="agreements.second_surname_seller" />
                        </div>
                        <div class="col-md-6 col-xl-2" :style="this.agreements.type_ID_seller == 2 ? 'display:none' : ''">
                          <label for="example-text-input" class="form-control-label">Primer Nombre:</label>
                          <input type="text" class="form-control form-control-sm" name="name_seller"
                            v-model="agreements.name_seller" />
                        </div>
                        <div class="col-md-6 col-xl-2" :style="this.agreements.type_ID_seller == 2 ? 'display:none' : ''">
                          <label for="example-text-input" class="form-control-label">Otros Nombres:</label>
                          <input type="text" class="form-control form-control-sm" name="second_name_seller"
                            v-model="agreements.second_name_seller" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 content" v-if="this.viewContent === 3">
                    <div class="card-body">
                      <p class="text-uppercase text-sm">Datos para facturacion electronica </p>
                      <div class="row">
                        <div class="col-md-6 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Correo Electronico:</label>
                          <input type="email" class="form-control form-control-sm" name="email_billing"
                            v-model="agreements.email_billing" />
                        </div>
                        <div class="col-md-6 col-xl-2">
                          <label for="example-text-input" class="form-control-label">Matricula mercantil:</label>
                          <input type="text" class="form-control form-control-sm" name="tuition_billing"
                            v-model="agreements.tuition_billing" />
                          <b-alert v-if="msg_error.tuition_billing" class="text-danger" variant="danger" show>{{
                            msg_error.tuition_billing }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-2">
                          <label for="example-text-input" class="form-control-label">Tipo de contribuyente:</label>
                          <select class="form-select form-select-sm" name="taxpayer_billing"
                            v-model="agreements.taxpayer_billing" id="">
                            <option value="1">JURIDICA</option>
                            <option value="2">NATURAL</option>
                          </select>
                          <b-alert v-if="msg_error.taxpayer_billing" class="text-danger" variant="danger" show>{{
                            msg_error.taxpayer_billing }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-2">
                          <label for="example-text-input" class="form-control-label">Regimen fiscal:</label>
                          <select class="form-select form-select-sm" name="regime_billing"
                            v-model="agreements.regime_billing" id="">
                            <option value="1">Responsable de IVA</option>
                            <option value="2">No Responsable de IVA</option>
                          </select>
                          <b-alert v-if="msg_error.regime_billing" class="text-danger" variant="danger" show>{{
                            msg_error.regime_billing }}</b-alert>
                        </div>
                        <div class="col-md-6 col-xl-3">
                          <label for="example-text-input" class="form-control-label">Responsabilidad fisical:</label>
                          <select class="form-select form-select-sm" name="responsibility_billing"
                            v-model="agreements.responsibility_billing" id="">
                            <option value="1">0-13 Gran contribuyente</option>
                            <option value="2">0-15 Autorretenedor</option>
                            <option value="3">0-23 Agente de retencion IVA</option>
                            <option value="4">0-47 Regimen simple de tributacion</option>
                            <option value="5">R-99-PN No responsable</option>
                          </select>
                          <b-alert v-if="msg_error.responsibility_billing" class="text-danger" variant="danger" show>{{
                            msg_error.responsibility_billing }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6"><a class="btn btn-danger btn-sm mt-4" @click="backContent()"
                      v-if="this.viewContent != 0">Atras</a></div>
                  <div class="col-md-6 text-end">
                    <a class="btn btn-info btn-sm mt-4" @click="nextContent()" v-if="this.viewContent != 3">Siguiente</a>
                    <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm"
                      v-if="this.viewContent == 3" class="ms-auto">
                      <span v-if="spiner === false">Guardar</span>
                      <div class="d-flex align-items-center" v-if="spiner === true">
                        <strong class="me-2">Registrando</strong>
                        <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                      </div>
                    </argon-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 mt-5"
            v-if="this.searchagreements !== '' && this.searchagreements !== null && this.searchagreements !== undefined">
            <div class="card">
              <div class="card-header">
                <nav>
                  <div class="nav nav-tabs nav-pills nav-fill" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-five-tab" data-bs-toggle="tab" data-bs-target="#nav-five"
                      type="button" role="tab" aria-controls="nav-five" aria-selected="true">Georeferenciacion</button>
                    <button class="nav-link" id="nav-one-tab" data-bs-toggle="tab" data-bs-target="#nav-one" type="button"
                      role="tab" aria-controls="nav-one" aria-selected="false">Datos de Contacto y/o Comerciales</button>
                    <button class="nav-link" id="nav-two-tab" data-bs-toggle="tab" data-bs-target="#nav-two" type="button"
                      role="tab" aria-controls="nav-two" aria-selected="false">Productos Contratados</button>
                    <button class="nav-link" id="nav-three-tab" data-bs-toggle="tab" data-bs-target="#nav-three"
                      type="button" role="tab" aria-controls="nav-three" aria-selected="false">Paquetes por Cargo</button>
                      <!-- <button class="nav-link" id="nav-five-tab" data-bs-toggle="tab" data-bs-target="#nav-five"
                      type="button" role="tab" aria-controls="nav-five" aria-selected="false">Cargar Medicamentos</button> -->
                    <button class="nav-link" id="nav-four-tab" data-bs-toggle="tab" data-bs-target="#nav-four"
                      type="button" role="tab" aria-controls="nav-four" aria-selected="false">Empresas en Mision</button>
                  </div>
                </nav>
              </div>
              <div class="card-body">
                <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane fade" id="nav-one" role="tabpanel" aria-labelledby="nav-one-tab">
                    <ViewFormCommercial :valueAgreements="this.searchagreements" />
                  </div>
                  <div class="tab-pane fade" id="nav-two" role="tabpanel" aria-labelledby="nav-two-tab">
                    <ViewFormProduct :valueAgreements="this.searchagreements" />
                  </div>
                  <div class="tab-pane fade" id="nav-three" role="tabpanel" aria-labelledby="nav-three-tab">
                    <ViewFormPackage :valueAgreements="this.searchagreements" />
                  </div>
                 <!--  <div class="tab-pane fade" id="nav-five" role="tabpanel" aria-labelledby="nav-five-tab">
                    <ViewFormMedicine :valueAgreements="this.searchagreements" />
                  </div> -->
                  <div class="tab-pane fade" id="nav-four" role="tabpanel" aria-labelledby="nav-four-tab">
                    <ViewFormCompanyMission :valueAgreements="this.searchagreements" />
                  </div>
                  <div class="tab-pane fade show active" id="nav-five" role="tabpanel" aria-labelledby="nav-five-tab">
                    <ViewFormGeoreferencing :valueAgreements="this.searchagreements" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import setNavPills from "./../../../assets/js/nav-pills.js";
import setTooltip from "./../../../assets/js/tooltip.js";
import ArgonButton from "./../../../components/ArgonButton.vue";
import ViewFormCommercial from "./formCommercial.vue"
import ViewFormCompanyMission from "./formCompanyMission.vue"
import ViewFormProduct from "./formProduct.vue"
import ViewFormGeoreferencing from "./formGeoreferencing.vue"
import ViewFormPackage from "./formpackage.vue"
import ViewFormMedicine from "./formMedicine.vue"
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Loading from '../Utils/Loading.vue';



export default {
  name: "formagreements",
  data() {
    return {
      showMenu: false,
      agreements: {
        name_agreements: '',
        description: '',
        number_contract: '',
        state: '',
        billing: '',
        validity_since: '',
        validity_until: '',
        email: '',
        coverage: '',
        modality: '',
        generate_rips: '',
        type_ID_client: '',
        number_ID_client: '',
        dv_client: '',
        surname_client: '',
        second_surname_client: '',
        name_client: '',
        second_name_client: '',
        zone_client: '',
        direction_client: '',
        precinct_client: '',
        municipality_client: '',
        mobile_client: '',
        phone_client: '',
        email_client_client: '',
        type_ID_seller: '',
        number_ID_seller: '',
        dv_seller: '',
        surname_seller: '',
        second_surname_seller: '',
        name_seller: '',
        second_name_seller: '',
        tuition_billing: '',
        taxpayer_billing: '',
        regime_billing: '',
        responsibility_billing: '',
        email_billing: '',
        days_to_pay: '',
      },
      msg_error: {
        name_agreements: '',
        description: '',
        number_contract: '',
        state: '',
        billing: '',
        validity_since: '',
        validity_until: '',
        email: '',
        coverage: '',
        modality: '',
        generate_rips: '',
        type_ID_client: '',
        number_ID_client: '',
        dv_client: '',
        surname_client: '',
        second_surname_client: '',
        name_client: '',
        second_name_client: '',
        zone_client: '',
        direction_client: '',
        precinct_client: '',
        municipality_client: '',
        mobile_client: '',
        phone_client: '',
        email_client_client: '',
        type_ID_seller: '',
        number_ID_seller: '',
        dv_seller: '',
        surname_seller: '',
        second_surname_seller: '',
        name_seller: '',
        second_name_seller: '',
        tuition_billing: '',
        taxpayer_billing: '',
        regime_billing: '',
        responsibility_billing: '',
        email_billing: '',
        days_to_pay: '',
      },
      show: false,
      searchagreements: this.$route.params.id,
      viewContent: 0,
      spiner: false,
      isLoading: true,
      title: 'Formulario',
      inputNiet: '',
      inputID: '',
    };
  },
  components: {
    ArgonButton,
    ViewFormCommercial,
    ViewFormCompanyMission,
    ViewFormProduct,
    ViewFormGeoreferencing,
    ViewFormPackage,
    ViewFormMedicine,
    Loading
  },
  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    await this.get();
    await this.loadingActive()
    this.agreements = this.getagreements;
    if (this.searchagreements !== '' && this.searchagreements !== null && this.searchagreements !== undefined) {
      await this.loadingActive()
      this.agreements = this.getagreements
    }
  },
  methods: {
    ...mapActions('Agreements', ['get', "Aggagreements", "Search"]),
    async getStoreagreements() {
      if (this.searchagreements != undefined) {
        await this.Search(this.searchagreements)
      }
    },
    async loadingActive() {
      this.isLoading = true
      //console.log('estoy en la linea 636');
      await this.getStoreagreements()
      this.isLoading = false
    },
    resetForm() {
      this.msg_error.name_agreements = '';
      this.msg_error.description = '',
      this.msg_error.number_contract = '';
      this.msg_error.state = '';
      this.msg_error.billing = '';
      this.msg_error.validity_since = '';
      this.msg_error.validity_until = '';
      this.msg_error.email = '';
      this.msg_error.coverage = '';
      this.msg_error.modality = '';
      this.msg_error.generate_rips = '';
      this.msg_error.type_ID_client = '';
      this.msg_error.number_ID_client = '';
      this.msg_error.dv_client = '';
      this.msg_error.surname_client = '';
      this.msg_error.second_surname_client = '';
      this.msg_error.name_client = '';
      this.msg_error.second_name_client = '';
      this.msg_error.zone_client = '';
      this.msg_error.direction_client = '';
      this.msg_error.precinct_client = '';
      this.msg_error.municipality_client = '';
      this.msg_error.mobile_client = '';
      this.msg_error.phone_client = '';
      this.msg_error.email_client_client = '';
      this.msg_error.type_ID_seller = '';
      this.msg_error.number_ID_seller = '';
      this.msg_error.dv_seller = '';
      this.msg_error.surname_seller = '';
      this.msg_error.second_surname_seller = '';
      this.msg_error.name_seller = '';
      this.msg_error.second_name_seller = '';
      this.msg_error.tuition_billing = '';
      this.msg_error.taxpayer_billing = '';
      this.msg_error.regime_billing = '';
      this.msg_error.responsibility_billin = '';
    },
    async sendFormAgreements() {
      this.spiner = true
      const response = await this.Aggagreements(this.agreements)
      if (response.status === true) { 
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El registro fue exitoso',
          showConfirmButton: false,
          timer: 1500
        })
        this.spiner = false
        this.$router.push('/add/agreements/'+response.agreements.id_transfer)
        this.searchagreements = response.agreements.id_transfer
      }
      if (response.status === false) {
        
        this.spiner = false
        var title = ''
        const errors = response.errors
        if (typeof errors != 'string') {
          for (const key in errors) {
            const element = errors[key];
            element.map((error) => {
              title = error + ' <br/>' + title
            })
          }
        }else{
          title = response.errors
        }
        Swal.fire({
          icon: 'error',
          title: title,
          text: 'Intentalo de nuevo',
        })
      }
    },
    nextContent() {
      this.resetForm()
      switch (this.viewContent) {
        case 0:
          if (!this.viewContentTwo()) {
            return
          }
          this.viewContent = 1
          break;
        case 1:
          if (!this.viewContentThree()) {
            return
          }
          this.viewContent = 2
          break;
        case 2:
        if (this.agreements.type_ID_seller == 2) {
          if (!/^\d{9}|\d{1,3}(?:\.\d{3})*-\d{1}$/.test(this.agreements.number_ID_seller)) {
            this.msg_error.number_ID_seller = "El formato del nit debe ser exacto, ejemplo 123456789-2"
            return
          }
        }
        if (this.agreements.type_ID_seller != 2) {
          if (!this.$validatePropertyEmpty(this.agreements.number_ID_seller)) {
            this.msg_error.number_ID_seller = "El numero de identificación del vendedor es obligatorio"
            return
          }
          if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.agreements.number_ID_seller)) {
            this.msg_error.number_ID_seller = "Este campos solo acepta formatos numericos"
            return
          }
        }
          this.viewContent = 3
          break;
        case 3:
          this.viewContent = 4
          break;
      }
    },
    viewContentOne() {
      this.viewContent = 0
    },
    viewContentTwo() {
      this.resetForm()
      if (!this.$validatePropertyEmpty(this.agreements.name_agreements)) {
        this.msg_error.name_agreements = "Nombre del Acuerdo Comercial, Contrato o Convenio es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.number_contract)) {
        this.msg_error.number_contract = "El numero de contrato es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.state)) {
        this.msg_error.state = "El estado del acuerdo comercial es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.billing)) {
        this.msg_error.billing = "El del corte de facturacion es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.validity_since)) {
        this.msg_error.validity_since = "El inicio de la vigencia es obligatoria"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.validity_until)) {
        this.msg_error.validity_until = "El fin de la vigencia es obligatoria"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.email)) {
        this.msg_error.email = "El email es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.coverage)) {
        this.msg_error.coverage = "La convertura es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.modality)) {
        this.msg_error.modality = "La modalidad es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.generate_rips)) {
        this.msg_error.generate_rips = "La eps o la entidad administradora es obligatorio"
        return
      }
      this.viewContent = 1
    },
    viewContentThree() {
      this.resetForm()
      if (!this.$validatePropertyEmpty(this.agreements.type_ID_client)) {
        this.msg_error.type_ID_client = "El tipo de identificación del cliente es obligatorio"
        return
      }
      if (this.agreements.type_ID_client == 2) {
        if (!/^\d{9}$/.test(this.agreements.number_ID_client)) {
          this.msg_error.number_ID_client = "El formato del nit debe ser exacto, ejemplo 123456789"
          return
        }
        if (!this.$validatePropertyEmpty(this.agreements.dv_client)) {
          this.msg_error.dv_client = "El DV es obligatorio"
          return
        }
      }
      if (this.agreements.type_ID_client != 2) {
        if (!this.$validatePropertyEmpty(this.agreements.number_ID_client)) {
          this.msg_error.number_ID_client = "El numero de identificación del cliente es obligatorio"
          return
        }
        if (!/^(?:\d{1,3}(\.\d{3}){0,2}|\d+)$/.test(this.agreements.number_ID_client)) {
          this.msg_error.number_ID_client = "Este campos solo acepta formatos numericos"
          return
        }
        if (!this.$validatePropertyEmpty(this.agreements.surname_client)) {
          this.msg_error.surname_client = "El primer apellido del cliente es obligatorio"
          return
        }
        if (!this.$validatePropertyEmpty(this.agreements.second_surname_client)) {
          this.msg_error.second_surname_client = "El segundo apellido del cliente es obligatorio"
          return
        }
        if (!this.$validatePropertyEmpty(this.agreements.name_client)) {
          this.msg_error.name_client = "El nombre del cliente es obligatorio"
          return
        }
      }
      
      if (!this.$validatePropertyEmpty(this.agreements.zone_client)) {
        this.msg_error.zone_client = "La zona es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.direction_client)) {
        this.msg_error.direction_client = "La dirección es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.precinct_client)) {
        this.msg_error.precinct_client = "El barrio es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.municipality_client)) {
        this.msg_error.municipality_client = "El municipio es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.mobile_client)) {
        this.msg_error.mobile_client = "El celular es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.phone_client)) {
        this.msg_error.phone_client = "El numero de telefono es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.email_client_client)) {
        this.msg_error.email_client_client = "El correo del cliente es obligatorio"
        return
      }
      this.viewContent = 2
    },
    viewContentFour() {
      this.resetForm()
      if (!this.$validatePropertyEmpty(this.agreements.type_ID_seller)) {
        this.msg_error.type_ID_seller = "El tipo de identificación del vendedor es obligatorio"
        return
      }
      
      if (!this.$validatePropertyEmpty(this.agreements.dv_seller)) {
        this.msg_error.dv_seller = "El DV es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.surname_seller)) {
        this.msg_error.surname_seller = "El apellido del vendedor es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.second_surname_seller)) {
        this.msg_error.second_surname_seller = "El segundo apellido del vendedor es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.name_seller)) {
        this.msg_error.name_seller = "El nombre del vendedor es obligatorio"
        return
      }
      if (!this.$validatePropertyEmpty(this.agreements.second_name_seller)) {
        this.msg_error.second_name_seller = "El segundo nombre del vendedor es obligatorio"
        return
      }
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
  },
  computed: {
    ...mapGetters('Agreements', ['getagreements']),
  }
};
</script>
 
<style>
.content {
  margin-top: -50px !important;
  border-top: 1px solid #F8F8F8;
  border-radius: 10px;
}

.contentState {
  cursor: pointer;
}

.nav.nav-pills .nav-link.active {
  animation: 0.2s ease;
  background-color: #1976D2;
  color: white;
}
</style>