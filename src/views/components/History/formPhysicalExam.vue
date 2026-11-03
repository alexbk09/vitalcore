<template>
    <div>
        <!-- <Loading v-if="this.isLoading " :valuetitle="title" /> -->
        <div class="px-7">
            <form action="" v-on:submit.prevent="sendFormsPhysicalExam()">
                <div class="row">
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Aspecto General:</label>
                        <textarea name="Generalaspect_PhysicalExam" v-model="physicalExam.Generalaspect_PhysicalExam"
                            class="form-control " :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            id="" :class="{ 'is-invalid': msg_error.Generalaspect_PhysicalExam }"
                            ref="Generalaspect_PhysicalExam"></textarea>
                        <b-alert v-if="msg_error.Generalaspect_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.Generalaspect_PhysicalExam }}</b-alert>
                    </div>
                </div>
                <div class="row mt-2">
                    <p class="text-uppercase h5">SIGNO VITALES</p>
                </div>
                <div class="row ">
                    <p class="text-secondary" style="font-size: 13px;">Tensión Arterial</p>
                    <div class="col-md-12 col-xl-4">
                        <label for="example-text-input" class="form-control-label">Sistólica:</label>
                        <input type="number" class="form-control" min="70" max="230" maxlength="3"
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.systolic_PhysicalExam }" ref="systolic_PhysicalExam"
                            name="systolic_PhysicalExam" v-model="physicalExam.systolic_PhysicalExam"
                            @input="limitCharacters('systolic_PhysicalExam'); activeFuntion()" />
                        <b-alert v-if="msg_error.systolic_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>
                            {{ msg_error.systolic_PhysicalExam }}
                        </b-alert>
                    </div>

                    <div class="col-md-12 col-xl-4">
                        <label for="example-text-input" class="form-control-label">Diastólica:</label>
                        <input type="number" class="form-control" min="30" max="130" maxlength="3"
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.diastolic_PhysicalExam }" ref="diastolic_PhysicalExam"
                            name="diastolic_PhysicalExam" v-model="physicalExam.diastolic_PhysicalExam"
                            @input="limitCharacters('diastolic_PhysicalExam'); activeFuntion()" />
                        <b-alert v-if="msg_error.diastolic_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>
                            {{ msg_error.diastolic_PhysicalExam }}
                        </b-alert>
                    </div>

                    <div class="col-md-12 col-xl-4">
                        <label for="example-text-input" class="form-control-label">Clasificación:</label>
                        <input type="text" readonly class="form-control"
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.Classification_PhysicalExam }"
                            ref="Classification_PhysicalExam" name="Classification_PhysicalExam"
                            v-model="physicalExam.Classification_PhysicalExam" />
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col-md-12 col-xl-6">
                        <label for="example-text-input" class="form-control-label">F. Cardiaca (x min):</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.FCardiac_PhysicalExam }" ref="FCardiac_PhysicalExam"
                            name="FCardiac_PhysicalExam" v-model="physicalExam.FCardiac_PhysicalExam" />
                        <b-alert v-if="msg_error.FCardiac_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>{{ msg_error.FCardiac_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12 col-xl-6">
                        <label for="example-text-input" class="form-control-label">F. Respiratorio (x min):</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.FRespiratory_PhysicalExam }"
                            ref="FRespiratory_PhysicalExam" name="FRespiratory_PhysicalExam"
                            v-model="physicalExam.FRespiratory_PhysicalExam" />
                        <b-alert v-if="msg_error.FRespiratory_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.FRespiratory_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">SatO2 (%):</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.satao2_PhysicalExam }" ref="satao2_PhysicalExam"
                            name="satao2_PhysicalExam" v-model="physicalExam.satao2_PhysicalExam" />
                        <b-alert v-if="msg_error.satao2_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>{{ msg_error.satao2_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Temperatura (°c):</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" maxlength="2"
                            max="42" :class="{ 'is-invalid': msg_error.Temperature_PhysicalExam }"
                            ref="Temperature_PhysicalExam" name="Temperature_PhysicalExam"
                            v-model="physicalExam.Temperature_PhysicalExam" />
                        <b-alert v-if="msg_error.Temperature_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.Temperature_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Lateralidad Dominante:</label>
                        <select id="" class="form-select "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.DominantLaterality_PhysicalExam }"
                            ref="DominantLaterality_PhysicalExam" name="DominantLaterality_PhysicalExam"
                            v-model="physicalExam.DominantLaterality_PhysicalExam">
                            <option>Seleccionar...</option>
                            <option value="DIESTRO">DIESTRO...</option>
                            <option value="ZURDO">ZURDO...</option>
                            <option value="AMBIDIESTRO">AMBIDIESTRO...</option>
                        </select>
                        <b-alert v-if="msg_error.DominantLaterality_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.DominantLaterality_PhysicalExam }}</b-alert>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Peso (Kg):</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.Weight_PhysicalExam }" ref="Weight_PhysicalExam"
                            name="Weight_PhysicalExam" @keyup="calcularIMC"
                            v-model="physicalExam.Weight_PhysicalExam" />
                        <b-alert v-if="msg_error.Weight_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>{{ msg_error.Weight_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Talla (cm):</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.Size_PhysicalExam }" ref="Size_PhysicalExam"
                            name="Size_PhysicalExam" @keyup="calcularIMC" v-model="physicalExam.Size_PhysicalExam" />
                        <b-alert v-if="msg_error.Size_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>{{ msg_error.Size_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Índice de Masa Coporal (IMC):</label>
                        <input type="text" readonly class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.BodyMassIndex_PhysicalExam }"
                            ref="BodyMassIndex_PhysicalExam" name="BodyMassIndex_PhysicalExam"
                            v-model="physicalExam.BodyMassIndex_PhysicalExam" />
                    </div>
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Perímetro Abdominal (cm):</label>
                        <input type="number" @keyup="categorizarPA()" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.Abdominalperimeter_PhysicalExam }"
                            ref="Abdominalperimeter_PhysicalExam" name="Abdominalperimeter_PhysicalExam"
                            v-model="physicalExam.Abdominalperimeter_PhysicalExam" />
                        <b-alert v-if="msg_error.Abdominalperimeter_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.Abdominalperimeter_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Interpretación Abdominal:</label>
                        <input type="text" readonly class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.AbdominalInterpretation_PhysicalExam }"
                            ref="AbdominalInterpretation_PhysicalExam" name="AbdominalInterpretation_PhysicalExam"
                            v-model="physicalExam.AbdominalInterpretation_PhysicalExam" />
                        <b-alert v-if="msg_error.AbdominalInterpretation_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.AbdominalInterpretation_PhysicalExam }}</b-alert>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <label for="example-text-input" class="form-control-label">Presión Arterial Media:</label>
                        <input type="text" class="form-control " readonly
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.medium_pressure_PhysicalExam }"
                            ref="medium_pressure_PhysicalExam" name="medium_pressure_PhysicalExam"
                            v-model="physicalExam.medium_pressure_PhysicalExam" />
                        <b-alert v-if="msg_error.medium_pressure_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.medium_pressure_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12 col-xl-4">
                        <label for="example-text-input" class="form-control-label">Glasgow:</label>
                        <input type="text" class="form-control"
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.Glasgow_PhysicalExam }" ref="Glasgow_PhysicalExam"
                            name="Glasgow_PhysicalExam" v-model="physicalExam.Glasgow_PhysicalExam"
                            @input="updateGlasgow" />
                        <b-alert v-if="msg_error.Glasgow_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>{{ msg_error.Glasgow_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12 col-xl-4">
                        <label for="example-text-input" class="form-control-label">Glucometría:</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.glucometer_PhysicalExam }" ref="glucometer_PhysicalExam"
                            name="glucometer_PhysicalExam" v-model="physicalExam.glucometer_PhysicalExam" />
                        <b-alert v-if="msg_error.glucometer_PhysicalExam" class="text-danger text-alert"
                            variant="danger" show>{{ msg_error.glucometer_PhysicalExam }}</b-alert>
                    </div>
                    <div class="col-md-12 col-xl-4">
                        <label for="example-text-input" class="form-control-label">Índice ECOG:</label>
                        <input type="number" class="form-control "
                            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                            :class="{ 'is-invalid': msg_error.ECOGindex_PhysicalExam }" ref="ECOGindex_PhysicalExam"
                            name="ECOGindex_PhysicalExam" v-model="physicalExam.ECOGindex_PhysicalExam" />
                        <b-alert v-if="msg_error.ECOGindex_PhysicalExam" class="text-danger text-alert" variant="danger"
                            show>{{ msg_error.ECOGindex_PhysicalExam }}</b-alert>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-10">
                        <div class="table-responsive p-0 mt-5">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            EXAMEN FÍSICO</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            HALLAZGO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="align-middle">
                                            <span class="text-secondary text-xs font-weight-bold">CABEZA</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.HEAD_PhysicalExam }"
                                                ref="HEAD_PhysicalExam" name="HEAD_PhysicalExam"
                                                v-model="physicalExam.HEAD_PhysicalExam" />
                                            <b-alert v-if="msg_error.HEAD_PhysicalExam" class="text-danger text-alert"
                                                variant="danger" show>{{ msg_error.HEAD_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle ">
                                            <span class="text-secondary text-xs font-weight-bold">CUELLO</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.NECK_PhysicalExam }"
                                                ref="NECK_PhysicalExam" name="NECK_PhysicalExam"
                                                v-model="physicalExam.NECK_PhysicalExam" />
                                            <b-alert v-if="msg_error.NECK_PhysicalExam" class="text-danger text-alert"
                                                variant="danger" show>{{ msg_error.NECK_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle ">
                                            <span class="text-secondary text-xs font-weight-bold">TORAX Y MAMA</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.THORAXANDBREAST_PhysicalExam }"
                                                ref="THORAXANDBREAST_PhysicalExam" name="THORAXANDBREAST_PhysicalExam"
                                                v-model="physicalExam.THORAXANDBREAST_PhysicalExam" />
                                            <b-alert v-if="msg_error.THORAXANDBREAST_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.THORAXANDBREAST_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle ">
                                            <span class="text-secondary text-xs font-weight-bold">ABDOMEN</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.ABDOMEN_PhysicalExam }"
                                                ref="ABDOMEN_PhysicalExam" name="ABDOMEN_PhysicalExam"
                                                v-model="physicalExam.ABDOMEN_PhysicalExam" />
                                            <b-alert v-if="msg_error.ABDOMEN_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.ABDOMEN_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle ">
                                            <span class="text-secondary text-xs font-weight-bold">GENITOURINARIO</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.GENITOURINARY_PhysicalExam }"
                                                ref="GENITOURINARY_PhysicalExam" name="GENITOURINARY_PhysicalExam"
                                                v-model="physicalExam.GENITOURINARY_PhysicalExam" />
                                            <b-alert v-if="msg_error.GENITOURINARY_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.GENITOURINARY_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle ">
                                            <span class="text-secondary text-xs font-weight-bold">MÚSCULO  -
                                                ESQUELÉTICO</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.MUSCLESKELETAL_PhysicalExam }"
                                                ref="MUSCLESKELETAL_PhysicalExam" name="MUSCLESKELETAL_PhysicalExam"
                                                v-model="physicalExam.MUSCLESKELETAL_PhysicalExam" />
                                            <b-alert v-if="msg_error.MUSCLESKELETAL_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.MUSCLESKELETAL_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle ">
                                            <span class="text-secondary text-xs font-weight-bold">SISTEMA
                                                NERVIOSO</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.NERVOUSSYSTEM_PhysicalExam }"
                                                ref="NERVOUSSYSTEM_PhysicalExam" name="NERVOUSSYSTEM_PhysicalExam"
                                                v-model="physicalExam.NERVOUSSYSTEM_PhysicalExam" />
                                            <b-alert v-if="msg_error.NERVOUSSYSTEM_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.NERVOUSSYSTEM_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle "><span
                                                class="text-secondary text-xs font-weight-bold">PIEL Y FANERAS</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.SKINANDFANS_PhysicalExam }"
                                                ref="SKINANDFANS_PhysicalExam" name="SKINANDFANS_PhysicalExam"
                                                v-model="physicalExam.SKINANDFANS_PhysicalExam" />
                                            <b-alert v-if="msg_error.SKINANDFANS_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.SKINANDFANS_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="align-middle "><span
                                                class="text-secondary text-xs font-weight-bold">ESPALDA</span></td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.back_PhysicalExam }"
                                                ref="back_PhysicalExam" name="back_PhysicalExam"
                                                v-model="physicalExam.back_PhysicalExam" />
                                            <b-alert v-if="msg_error.back_PhysicalExam" class="text-danger text-alert"
                                                variant="danger" show>{{ msg_error.back_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle "><span
                                                class="text-secondary text-xs font-weight-bold">EXTREMIDADES</span></td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.extremities_PhysicalExam }"
                                                ref="extremities_PhysicalExam" name="extremities_PhysicalExam"
                                                v-model="physicalExam.extremities_PhysicalExam" />
                                            <b-alert v-if="msg_error.extremities_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.extremities_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle "><span
                                                class="text-secondary text-xs font-weight-bold">GENITALES</span></td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.genitals_PhysicalExam }"
                                                ref="genitals_PhysicalExam" name="genitals_PhysicalExam"
                                                v-model="physicalExam.genitals_PhysicalExam" />
                                            <b-alert v-if="msg_error.genitals_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.genitals_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle "><span
                                                class="text-secondary text-xs font-weight-bold">NERVIOSO</span></td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.nervous_PhysicalExam }"
                                                ref="nervous_PhysicalExam" name="nervous_PhysicalExam"
                                                v-model="physicalExam.nervous_PhysicalExam" />
                                            <b-alert v-if="msg_error.nervous_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.nervous_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align-middle "><span
                                                class="text-secondary text-xs font-weight-bold">PSIQUISMO</span></td>
                                        <td class="align-middle text-center">
                                            <input type="text" class="form-control "
                                                :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                                                :class="{ 'is-invalid': msg_error.psychism_PhysicalExam }"
                                                ref="psychism_PhysicalExam" name="psychism_PhysicalExam"
                                                v-model="physicalExam.psychism_PhysicalExam" />
                                            <b-alert v-if="msg_error.psychism_PhysicalExam"
                                                class="text-danger text-alert" variant="danger" show>{{
                                                    msg_error.psychism_PhysicalExam }}</b-alert>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- {{ valueStatus }} -->
                <div class="row" v-if="this.valueStatus.key_status === 3">
                    <div class="col-md-12 text-end">
                        <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm"
                            class="ms-auto">
                            <span v-if="spiner === false">Guardar</span>
                            <div class="d-flex align-items-center" v-if="spiner === true">
                                <strong class="me-2">Guardando Datos</strong>
                                <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                            </div>
                        </argon-button>
                    </div>
                </div>
            </form>
            <!-- {{getPhysicalExam}} -->
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
/* import Loading from '../Utils/Loading.vue'; */
const body = document.getElementsByTagName("body")[0];

export default {
    name: "formHistory",
    props: {
        valueStatus: Object
    },
    data() {
        return {
            userValidate: {},
            fecha: new Date().toLocaleDateString(),
            showMenu: false,
            physicalExam: {
                Generalaspect_PhysicalExam: '',
                systolic_PhysicalExam: '',
                diastolic_PhysicalExam: '',
                Classification_PhysicalExam: '',
                FCardiac_PhysicalExam: '',
                FRespiratory_PhysicalExam: '',
                satao2_PhysicalExam: '',
                Temperature_PhysicalExam: '',
                DominantLaterality_PhysicalExam: '',
                Weight_PhysicalExam: '',
                Size_PhysicalExam: '',
                BodyMassIndex_PhysicalExam: 0,
                Abdominalperimeter_PhysicalExam: '',
                AbdominalInterpretation_PhysicalExam: '',
                Glasgow_PhysicalExam: '',
                glucometer_PhysicalExam: '',
                ECOGindex_PhysicalExam: '',
                HEAD_PhysicalExam: '',
                NECK_PhysicalExam: '',
                THORAXANDBREAST_PhysicalExam: '',
                ABDOMEN_PhysicalExam: '',
                GENITOURINARY_PhysicalExam: '',
                MUSCLESKELETAL_PhysicalExam: '',
                NERVOUSSYSTEM_PhysicalExam: '',
                SKINANDFANS_PhysicalExam: '',
                medium_pressure_PhysicalExam: '',
                IDHistory: '',
                IDPatient: '',

                back_PhysicalExam: '',
                extremities_PhysicalExam: '',
                genitals_PhysicalExam: '',
                nervous_PhysicalExam: '',
                psychism_PhysicalExam: '',
            },
            msg_error: {
                Generalaspect_PhysicalExam: '',
                systolic_PhysicalExam: '',
                diastolic_PhysicalExam: '',
                Classification_PhysicalExam: '',
                FCardiac_PhysicalExam: '',
                FRespiratory_PhysicalExam: '',
                satao2_PhysicalExam: '',
                Temperature_PhysicalExam: '',
                DominantLaterality_PhysicalExam: '',
                Weight_PhysicalExam: '',
                Size_PhysicalExam: '',
                BodyMassIndex_PhysicalExam: '',
                Abdominalperimeter_PhysicalExam: '',
                AbdominalInterpretation_PhysicalExam: '',
                Glasgow_PhysicalExam: '',
                glucometer_PhysicalExam: '',
                ECOGindex_PhysicalExam: '',
                HEAD_PhysicalExam: '',
                NECK_PhysicalExam: '',
                THORAXANDBREAST_PhysicalExam: '',
                ABDOMEN_PhysicalExam: '',
                GENITOURINARY_PhysicalExam: '',
                MUSCLESKELETAL_PhysicalExam: '',
                NERVOUSSYSTEM_PhysicalExam: '',
                SKINANDFANS_PhysicalExam: '',
                medium_pressure_PhysicalExam: '',

                back_PhysicalExam: '',
                extremities_PhysicalExam: '',
                genitals_PhysicalExam: '',
                nervous_PhysicalExam: '',
                psychism_PhysicalExam: '',
            },
            presion: '',
            masa_corporal: '',
            show: false,
            searchserviceOrder: this.valueStatus.id,
            searchKeyPatient: this.valueStatus.key_patient,
            spiner: false,
            keyHistory: '',
            keyPatient: '',
            KeyTypeCare: '',
            ageTotal: '',
            /* isLoading: true,*/
            title: 'Paraclinicos y Diagnósticos',
            glasgowNumerator: 0,
        };

    },
    watch: {
        'physicalExam.systolic_PhysicalExam'(newVal) {
            if (newVal > 230 || newVal < 70) {
                this.msg_error.systolic_PhysicalExam = 'El rango de presión sistólica es de 70 a 230 mmHg';
            } else {
                this.msg_error.systolic_PhysicalExam = '';
            }
        },
        'physicalExam.diastolic_PhysicalExam'(newVal) {
            const diastolic = Number(newVal);
            const systolic = Number(this.physicalExam.systolic_PhysicalExam);

            if (diastolic > 130 || diastolic < 30) {
                this.msg_error.diastolic_PhysicalExam = 'El rango de presión diastólica es de 30 a 130 mmHg';
            } else if (systolic && diastolic >= systolic) {
                this.msg_error.diastolic_PhysicalExam = 'La presión diastólica no puede ser mayor que la presión sistólica';
            } else {
                this.msg_error.diastolic_PhysicalExam = '';
            }
        },
        'physicalExam.Weight_PhysicalExam'(newVal) {
            if (newVal <= 0) {
                this.msg_error.Weight_PhysicalExam = 'El peso debe ser mayor que 0';
            } else {
                this.msg_error.Weight_PhysicalExam = '';
                this.calcularIMC();
            }
        },
        'physicalExam.Size_PhysicalExam'(newVal) {
            if (newVal <= 0) {
                this.msg_error.Size_PhysicalExam = 'La talla debe ser mayor que 0';
            } else {
                this.msg_error.Size_PhysicalExam = '';
                this.calcularIMC();
            }
        },
        'physicalExam.satao2_PhysicalExam'(newVal) {
            if (newVal < 0 || newVal > 100) {
                this.msg_error.satao2_PhysicalExam = 'El valor de SatO2 debe estar entre 0 y 100';
            } else {
                this.msg_error.satao2_PhysicalExam = '';
            }
        },
        'physicalExam.Temperature_PhysicalExam'(newVal) {
            if (newVal < 35 || newVal > 42) {
                this.msg_error.Temperature_PhysicalExam = 'El valor de la temperatura debe estar entre 35 y 42 °C';
            } else {
                this.msg_error.Temperature_PhysicalExam = '';
            }
        },
        'physicalExam.Glasgow_PhysicalExam': {
            handler(newVal) {
                if (newVal) {
                    const value = parseInt(newVal.split('/')[0]);
                    if (!isNaN(value)) {
                        this.glasgowNumerator = value;
                    }
                }
            },
            immediate: true
        },
        glasgowNumerator(newVal) {
            if (newVal < 1) {
                this.glasgowNumerator = 1;
            } else if (newVal > 15) {
                this.glasgowNumerator = 15;
            }
            this.updateGlasgow();
        }
    },
    components: {
        ArgonButton,
    },

    async mounted() {
        this.$store.state.isAbsolute = true;
        if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
            //await this.getStoreserviceOrder()
            if (this.valueStatus.get_physical_exam) {
                let struct = {
                    Generalaspect_PhysicalExam: this.valueStatus?.get_physical_exam?.general_aspect,
                    systolic_PhysicalExam: this.valueStatus?.get_physical_exam?.systolic,
                    diastolic_PhysicalExam: this.valueStatus?.get_physical_exam?.diastolic,
                    FCardiac_PhysicalExam: this.valueStatus?.get_physical_exam?.f_cardiac,
                    FRespiratory_PhysicalExam: this.valueStatus?.get_physical_exam?.f_respiratory,
                    satao2_PhysicalExam: this.valueStatus?.get_physical_exam?.saturation,
                    Temperature_PhysicalExam: this.valueStatus?.get_physical_exam?.temperature,
                    DominantLaterality_PhysicalExam: this.valueStatus?.get_physical_exam?.dominant_laterality,
                    Weight_PhysicalExam: this.valueStatus?.get_physical_exam?.weight,
                    Size_PhysicalExam: this.valueStatus?.get_physical_exam?.size,
                    Abdominalperimeter_PhysicalExam: this.valueStatus?.get_physical_exam?.abdominal_perimeter,
                    AbdominalInterpretation_PhysicalExam: this.valueStatus?.get_physical_exam?.abdominal_interpretation,
                    Glasgow_PhysicalExam: this.valueStatus?.get_physical_exam?.glasgow,
                    glucometer_PhysicalExam: this.valueStatus?.get_physical_exam?.glucometer,
                    ECOGindex_PhysicalExam: this.valueStatus?.get_physical_exam?.index_ecog,
                    HEAD_PhysicalExam: this.valueStatus?.get_physical_exam?.head,
                    NECK_PhysicalExam: this.valueStatus?.get_physical_exam?.neck,
                    THORAXANDBREAST_PhysicalExam: this.valueStatus?.get_physical_exam?.thorax_mama,
                    ABDOMEN_PhysicalExam: this.valueStatus?.get_physical_exam?.abdomen,
                    GENITOURINARY_PhysicalExam: this.valueStatus?.get_physical_exam?.genitourinary,
                    MUSCLESKELETAL_PhysicalExam: this.valueStatus?.get_physical_exam?.skeletal_muscle,
                    NERVOUSSYSTEM_PhysicalExam: this.valueStatus?.get_physical_exam?.nervous_system,
                    SKINANDFANS_PhysicalExam: this.valueStatus?.get_physical_exam?.skin_faneras,
                    medium_pressure_PhysicalExam: this.valueStatus?.get_physical_exam?.medium_pressure,
                    back_PhysicalExam: this.valueStatus?.get_physical_exam?.back,
                    extremities_PhysicalExam: this.valueStatus?.get_physical_exam?.extremities,
                    genitals_PhysicalExam: this.valueStatus?.get_physical_exam?.genitals,
                    nervous_PhysicalExam: this.valueStatus?.get_physical_exam?.nervous,
                    psychism_PhysicalExam: this.valueStatus?.get_physical_exam?.psych,
                }
                this.physicalExam = struct
            } else {
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
                this.physicalExam = struct
            }
            if (this.physicalExam != null) {
                this.calcularTension()
                this.calcularIMC()
            }
        }
        if (!this.physicalExam.Glasgow_PhysicalExam) {
            this.physicalExam.Glasgow_PhysicalExam = '0/15';
        }
        this.glasgowNumerator = this.physicalExam.Glasgow_PhysicalExam.split('/')[0];
    },

    methods: {
        ...mapActions('History', ["SearchOrder", "addPhysicalExam", "searchPhysicalExam", "updatePhysicalExam"]),
        limitCharacters(field) {
            if (this.physicalExam[field].toString().length > 3) {
                this.physicalExam[field] = this.physicalExam[field].toString().slice(0, 3);
            }
        },
        validateUser() {
            this.userValidate = JSON.parse(localStorage.getItem('user'))
        },
        clearMsg_Errors() {
            this.msg_error.Generalaspect_PhysicalExam = ''
            this.msg_error.systolic_PhysicalExam = ''
            this.msg_error.diastolic_PhysicalExam = ''
            this.msg_error.Classification_PhysicalExam = ''
            this.msg_error.FCardiac_PhysicalExam = ''
            this.msg_error.FRespiratory_PhysicalExam = ''
            this.msg_error.satao2_PhysicalExam = ''
            this.msg_error.Temperature_PhysicalExam = ''
            this.msg_error.DominantLaterality_PhysicalExam = ''
            this.msg_error.Weight_PhysicalExam = ''
            this.msg_error.Size_PhysicalExam = ''
            this.msg_error.BodyMassIndex_PhysicalExam = ''
            this.msg_error.HEAD_PhysicalExam = ''
            this.msg_error.NECK_PhysicalExam = ''
            this.msg_error.THORAXANDBREAST_PhysicalExam = ''
            this.msg_error.ABDOMEN_PhysicalExam = ''
            this.msg_error.GENITOURINARY_PhysicalExam = ''
            this.msg_error.MUSCLESKELETAL_PhysicalExam = ''
            this.msg_error.NERVOUSSYSTEM_PhysicalExam = ''
            this.msg_error.SKINANDFANS_PhysicalExam = '',
            this.msg_error.medium_pressure_PhysicalExam = '',
            this.msg_error.back_PhysicalExam = '',
            this.msg_error.extremities_PhysicalExam = '',
            this.msg_error.genitals_PhysicalExam = '',
            this.msg_error.nervous_PhysicalExam = '',
            this.msg_error.psychism_PhysicalExam = ''
        },
        calcularEdad() {
            const fechaActual = new Date();
            const fechaNac = new Date(this.gethistory.birthDate_Technical);
            let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
            this.ageTotal = edad;
            return edad;
        },
        async sendFormsPhysicalExam() {
            this.physicalExam.IDHistory = this.valueStatus.id;
            this.physicalExam.IDPatient = this.valueStatus.key_patient;
            this.clearMsg_Errors();
            
            const validateField = (field, errorMsg) => {
                if (!this.$validatePropertyEmpty(this.physicalExam[field])) {
                    this.msg_error[field] = errorMsg;
                    this.$refs[field].scrollIntoView({ behavior: 'smooth' });
                    return false;
                }
                return true;
            };

            if (this.ageTotal > 15) {
                if (!validateField('Generalaspect_PhysicalExam', 'Este campo es requerido')) return;
                if (!validateField('systolic_PhysicalExam', 'Este campo es requerido')) return;
                if (this.physicalExam.systolic_PhysicalExam > 230 || this.physicalExam.systolic_PhysicalExam < 70) {
                    this.msg_error.systolic_PhysicalExam = 'El rango de presión sistólica es de 70 a 230 mmHg';
                    this.$refs.systolic_PhysicalExam.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                if (!validateField('diastolic_PhysicalExam', 'Este campo es requerido')) return;
                if (this.physicalExam.diastolic_PhysicalExam > 130 || this.physicalExam.diastolic_PhysicalExam < 30) {
                    this.msg_error.diastolic_PhysicalExam = 'El rango de presión diastólica es de 30 a 130 mmHg';
                    this.$refs.diastolic_PhysicalExam.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                if (this.physicalExam.systolic_PhysicalExam <= this.physicalExam.diastolic_PhysicalExam) {
                    this.msg_error.diastolic_PhysicalExam = 'La presión diastólica no puede ser mayor que la presión sistólica';
                    this.$refs.diastolic_PhysicalExam.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                if (!validateField('FCardiac_PhysicalExam', 'Este campo es requerido')) return;
                if (!validateField('FRespiratory_PhysicalExam', 'Este campo es requerido')) return;
                if (!validateField('satao2_PhysicalExam', 'Este campo es requerido')) return;
                if (!validateField('Temperature_PhysicalExam', 'Este campo es requerido')) return;
            }
            if (!validateField('DominantLaterality_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('Weight_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('Size_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('HEAD_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('NECK_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('THORAXANDBREAST_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('ABDOMEN_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('GENITOURINARY_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('MUSCLESKELETAL_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('NERVOUSSYSTEM_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('SKINANDFANS_PhysicalExam', 'Este campo es requerido')) return;
            if (!validateField('medium_pressure_PhysicalExam', 'Este campo es requerido')) return;

            this.spiner = true;
            const response = this.valueStatus.get_physical_exam 
                ? await this.updatePhysicalExam(this.physicalExam) 
                : await this.addPhysicalExam(this.physicalExam);

            if (response === true) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Datos ' + (this.valueStatus.get_physical_exam ? 'actualizados' : 'agregados') + ' con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.spiner = false;
                this.$emit('saved');
            } else {
                this.spiner = false;
                let errorMessage = typeof response === 'object' 
                    ? Object.values(response).map(msg => `<div>${msg}</div>`).join('') 
                    : response;
                Swal.fire({
                    icon: 'error',
                    title: 'Lo siento, los datos no se pudieron ' + (this.valueStatus.get_physical_exam ? 'actualizar' : 'agregar'),
                    html: errorMessage,
                });
            }
        },
        async activeFuntion() {
            this.show = !this.show;
            await this.calcularTension();
            await this.calcularPM();
        },
        calcularTension() {
            const systolic = parseInt(this.physicalExam.systolic_PhysicalExam);
            const diastolic = parseInt(this.physicalExam.diastolic_PhysicalExam);

            if (isNaN(systolic) || isNaN(diastolic)) {
                return;
            }

            if (systolic <= 120 && diastolic <= 80) {
                this.presion = "Tensión arterial normal";
            } else if (systolic >= 120 && systolic <= 129 && diastolic <= 80) {
                this.presion = "Presión elevada";
            } else if (systolic >= 130 && systolic <= 139 && diastolic >= 80 && diastolic <= 89) {
                this.presion = "Hipertensión estadio I";
            } else if (systolic >= 140 && systolic <= 159 && diastolic >= 90 && diastolic <= 99) {
                this.presion = "Hipertensión grado I";
            } else if (systolic >= 160 && systolic <= 179 && diastolic >= 100 && diastolic <= 109) {
                this.presion = "Hipertensión grado II";
            } else if (systolic >= 180 || diastolic >= 110) {
                this.presion = "Hipertensión grado III";
            } else if (systolic >= 140 && diastolic < 90) {
                this.presion = "Hipertensión grado I";
            } else if (systolic >= 160 && diastolic < 100) {
                this.presion = "Hipertensión grado II";
            } else {
                this.presion = "Clasificación desconocida";
            }

            this.physicalExam.Classification_PhysicalExam = this.presion;
        },
        calcularIMC() {
            if (this.physicalExam.Weight_PhysicalExam === '' || this.physicalExam.Size_PhysicalExam === '') {
                return;
            }
            const peso = parseFloat(this.physicalExam.Weight_PhysicalExam);
            const estaturaCentimetros = parseFloat(this.physicalExam.Size_PhysicalExam);
            const estaturaMetros = estaturaCentimetros / 100;
            const imc = peso / (estaturaMetros * estaturaMetros);

            if (imc < 18.5) {
                this.masa_corporal = "Por debajo del peso normal";
            } else if (imc >= 18.5 && imc < 25) {
                this.masa_corporal = "Peso normal";
            } else if (imc >= 25 && imc < 30) {
                this.masa_corporal = "Sobrepeso";
            } else if (imc >= 30 && imc < 35) {
                this.masa_corporal = "Obesidad grado I";
            } else if (imc >= 35 && imc < 40) {
                this.masa_corporal = "Obesidad grado II";
            } else {
                this.masa_corporal = "Obesidad grado III";
            }

            this.physicalExam.BodyMassIndex_PhysicalExam = `${this.masa_corporal} (${imc.toFixed(2)})`;
            return imc.toFixed(2);
        },
        categorizarPA() {
            const paValue = parseFloat(this.physicalExam.Abdominalperimeter_PhysicalExam);
            if (isNaN(paValue) || paValue < 0) {
                this.physicalExam.AbdominalInterpretation_PhysicalExam = 'Valor inválido';
                return;
            }

            if (paValue < 94) {
                this.physicalExam.AbdominalInterpretation_PhysicalExam = 'Normal';
            } else if (paValue >= 94 && paValue <= 102) {
                this.physicalExam.AbdominalInterpretation_PhysicalExam = 'Alto';
            } else {
                this.physicalExam.AbdominalInterpretation_PhysicalExam = 'Muy alto';
            }
        },
        calcularPM() {
            const systolic = parseInt(this.physicalExam.systolic_PhysicalExam);
            const diastolic = parseInt(this.physicalExam.diastolic_PhysicalExam);

            if (isNaN(systolic) || isNaN(diastolic)) {
                this.physicalExam.medium_pressure_PhysicalExam = '';
                return;
            }

            const PM = (2 * diastolic + systolic) / 3;
            this.physicalExam.medium_pressure_PhysicalExam = PM.toFixed(2);
        },
        updateGlasgow() {
            const value = parseInt(this.physicalExam.Glasgow_PhysicalExam.split('/')[0]);
            if (isNaN(value) || value < 1) {
                this.glasgowNumerator = 1;
            } else if (value > 15) {
                this.glasgowNumerator = 15;
            } else {
                this.glasgowNumerator = value;
            }
            this.physicalExam.Glasgow_PhysicalExam = `${this.glasgowNumerator}/15`;
        }
    },
    computed: {
        ...mapGetters('History', ['gethistory', 'getPhysicalExam']),
    }
};
</script>

<style scoped>
@media (max-width: 767px) {
  .px-7 {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
  .form-control,
  .form-select,
  textarea {
    font-size: 1rem !important;
    padding: 10px 12px !important;
    min-height: 44px;
  }
  label.form-control-label {
    font-size: 1rem !important;
    margin-bottom: 4px;
    margin-top: 10px;
  }
  .row > [class^="col-"] {
    margin-bottom: 12px !important;
  }
  .b-alert {
    font-size: 0.95rem !important;
    padding: 6px 10px !important;
  }
  .table-responsive {
    padding: 0 !important;
  }
  .table th, .table td {
    font-size: 0.95rem !important;
    padding: 8px 6px !important;
  }
}
</style>