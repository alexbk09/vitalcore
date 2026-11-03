<template>
    <div>
        <div class="py-7 container-fluid">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-3 border-end">
                            <ul class="list-group-flush">
                                <li class="list-group-item" :class="{ active: ViewState === 0 }" @click="view(0)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Introducción</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 1 }" @click="view(1)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Usuarios</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 2 }" @click="view(2)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Roles</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 3 }" @click="view(3)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Sedes</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 4 }" @click="view(4)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Vehículos</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 5 }" @click="view(5)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Eventos</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 6 }" @click="view(6)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Solicitudes</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 7 }" @click="view(7)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Evaluaciones</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 8 }" @click="view(8)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">CUPS</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 9 }" @click="view(9)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Acuerdos Comerciales</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 10 }" @click="view(10)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Orden de Servicio</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 11 }" @click="view(11)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">PDF Historias Clínicas</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 12 }" @click="view(12)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Historia Médica</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                                <li class="list-group-item" :class="{ active: ViewState === 13 }" @click="view(13)">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h2 class="h5 mb-0">Semaforización</h2>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-9 p-3 content-1 px-5">
                            <div v-if="ViewState === 0">
                                <h3 class="h2 mb-6">Manual de Usabilidad</h3>
                                <p class="p0">
                                    Bienvenido a <b>AYTEC</b>, una innovadora solución diseñada para mejorar la gestión y
                                    eficiencia en entornos médicos y de atención de la salud. Este sistema está
                                    especialmente
                                    creado para facilitar y optimizar las tareas diarias del personal médico, administrativo
                                    y
                                    los pacientes, brindando una experiencia integral y segura. <br> <br>

                                    Nuestra misión es proporcionar una plataforma tecnológica avanzada que garantice la
                                    precisión, rapidez y seguridad en todos los procesos relacionados con la atención
                                    médica.
                                    Con <b>AYTEC</b>, buscamos transformar la forma en que se administra y brinda la
                                    atención a
                                    los pacientes, permitiendo a los profesionales médicos concentrarse en lo más
                                    importante:
                                    cuidar de su salud y bienestar. </p>

                                <p class="mb-5 mt-5"><b>Características destacadas del Sistema Médico:</b></p>

                                <p class="mb-4 px-5"><b>1. </b>Gestión de Expedientes Médicos Electrónicos: Olvídese de los
                                    registros en papel y acceda de
                                    manera rápida y segura a la información completa de los pacientes, desde su historial
                                    médico
                                    hasta los tratamientos y resultados de análisis.</p>

                                <p class="mb-4 px-5"><b>2. </b>Citas y Agenda Integrada: Simplifique la programación y
                                    gestión
                                    de citas médicas con una
                                    agenda electrónica intuitiva que ayuda a mantener un flujo de trabajo organizado y
                                    evitar
                                    retrasos.</p>

                                <p class="mb-4 px-5"><b>3. </b>Administración de Inventario y Farmacia: Mantenga un control
                                    exhaustivo sobre el inventario
                                    de medicamentos y suministros médicos, garantizando un abastecimiento óptimo y evitando
                                    agotamientos.</p>

                                <p class="mb-4 px-5"><b>4. </b>Facturación y Gestión de Pagos: Agilice el proceso de
                                    facturación
                                    y cobro de servicios
                                    médicos, brindando una experiencia sin complicaciones tanto para los pacientes como para
                                    el
                                    personal administrativo.</p>

                                <p class="mb-4 px-5"><b>5. </b>Seguridad y Privacidad de Datos: Nuestra plataforma cuenta
                                    con
                                    robustas medidas de seguridad
                                    para proteger la información médica confidencial y cumplir con los estándares de
                                    privacidad
                                    más exigentes.</p>

                                <p class="mb-4">Estamos comprometidos con la mejora continua y el desarrollo constante de
                                    nuestro sistema,
                                    basado en los comentarios y necesidades de nuestros usuarios. Nuestro equipo de soporte
                                    y
                                    atención al cliente está disponible para brindar asistencia y resolver cualquier
                                    consulta
                                    que pueda surgir durante el uso del Sistema Médico <b>AYTEC</b>.</p>

                                <p class="mb-4">Gracias por confiar en nuestra tecnología para impulsar la excelencia en la
                                    atención médica.
                                    Juntos, construimos un futuro más saludable y seguro para todos.</p>
                            </div>
                            <VieItemUser v-if="ViewState === 1" />
                            <VieItemRols v-if="ViewState === 2" />
                            <VieItemSeat v-if="ViewState === 3" />
                            <VieItemVehicle v-if="ViewState === 4" />
                            <VieItemEvent v-if="ViewState === 5" />
                            <VieItemRequest v-if="ViewState === 6" />
                            <VieItemEvaluation v-if="ViewState === 7" />
                            <VieItemCups v-if="ViewState === 8" />
                            <AgreementsItem v-if="ViewState === 9" />
                            <OrderServiceItem v-if="ViewState === 10" />
                            <ClinicalHistoryItem v-if="ViewState === 11" />
                            <MedicalHistoryItem v-if="ViewState === 12" />
                            <TrafficLightItem v-if="ViewState === 13" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VieItemUser from "./Items/UserItem.vue"
import VieItemRols from "./Items/RolsItem.vue"
import VieItemSeat from "./Items/SeatItem.vue"
import VieItemVehicle from "./Items/VehicleItem.vue"
import VieItemEvent from "./Items/EventItem.vue"
import VieItemRequest from "./Items/RequestItem.vue"
import VieItemEvaluation from "./Items/EvaluationItem.vue"
import VieItemCups from "./Items/CupsItem.vue"
import AgreementsItem from "./Items/AgreementsItem.vue"
import OrderServiceItem from "./Items/OrderServiceItem.vue"
import ClinicalHistoryItem from "./Items/ClinicalHistoryItem.vue"
import MedicalHistoryItem from "./Items/MedicalHistoryItem.vue"
import TrafficLightItem from "./Items/TrafficLightItem.vue"
    
export default {
    name: 'GUIDE',
    data() {
        return {
            ViewState: 0
        }
    },
    components: {
        VieItemUser,
        VieItemRols,
        VieItemSeat,
        VieItemVehicle,
        VieItemEvent,
        VieItemRequest,
        VieItemEvaluation,
        VieItemCups,
        AgreementsItem,
        OrderServiceItem,
        ClinicalHistoryItem,
        MedicalHistoryItem,
        TrafficLightItem
    },
    methods: {
        view(state) {
            this.ViewState = state
        }
    }
}
</script>

<style>
.p0 {
    text-indent: 2em;
    margin-top: 2em;
}

.content-1 {
    text-align: justify;
    overflow-y: scroll;
    height: 900px;
}

.list-group-item {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.list-group-item:hover {
    background-color: #f0f0f0;
}

.list-group-item.active {
    background-color: #007bff;
    color: white;
}

.list-group-item.active h2,
.list-group-item.active i {
    color: white;
}
</style>