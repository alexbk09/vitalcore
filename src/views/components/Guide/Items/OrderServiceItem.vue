<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="h2 mb-6">Orden de Servicio</h3>
                    <p class="p0">En esta sección, puede visualizar todas las órdenes de servicio creadas. Para facilitar la búsqueda y gestión de las órdenes, puede utilizar los siguientes filtros:</p>
                    <ul class="mb-4 px-5">
                        <li><b>Rango de Fechas:</b> Filtre las órdenes por un rango específico de fechas.</li>
                        <li><b>Identificación:</b> Busque órdenes utilizando la identificación del paciente.</li>
                        <li><b>Acuerdo Comercial:</b> Filtre las órdenes asociadas a un acuerdo comercial específico.</li>
                        <li><b>Empresa en Misión:</b> Filtre las órdenes relacionadas con una empresa en misión específica.</li>
                    </ul>
                    
                    <p class="mb-4">Para crear una nueva orden de servicio, siga los siguientes pasos:</p>
                    <p class="mb-4 px-5"><b>1. Datos del Paciente:</b> Rellene los campos obligatorios que el sistema solicita. Si el paciente ya existe en la plataforma, al ingresar la cédula, el sistema devolverá el nombre del paciente. Al hacer clic en el nombre, los datos se rellenarán automáticamente para agilizar el registro de la nueva orden. Asegúrese de verificar y completar todos los campos antes de continuar.</p>
                    <p class="mb-4 px-5"><b>2. Datos del Registro:</b> En esta sección, agregue un acuerdo comercial previamente registrado. Todo lo relacionado con el acuerdo comercial y agregado en su sección se reflejará aquí. Asegúrese de revisar y completar todos los datos necesarios. Una vez que todos los datos estén completos, haga clic en "Guardar" para crear la orden.</p>

                    <p class="mb-4">En la sección de Ordenes de Servicios, puede tanto crear como modificar órdenes existentes. Para modificar una orden, seleccione la orden deseada de la lista y realice los cambios necesarios. No olvide guardar los cambios una vez que haya terminado.</p>

                    <p class="mb-4">Estamos comprometidos a proporcionarle una experiencia de administración de órdenes de servicio sin complicaciones. Esta herramienta le permitirá tomar decisiones informadas y estratégicas para optimizar sus operaciones, mejorar la eficiencia y garantizar una atención de calidad a sus pacientes.</p>
                    <p class="mb-4">Gracias por utilizar nuestra Sección de Orden de Servicio. Esperamos que esta herramienta sea de gran utilidad en la gestión eficiente de sus órdenes y contribuya al éxito de su organización. Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.p0 {
    text-indent: 2em;
    margin-top: 2em;
}
</style>