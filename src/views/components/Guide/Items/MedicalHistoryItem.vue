<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="h2 mb-6">Historia Médica</h3>
                    <p class="p0">En esta sección, puede gestionar todo el proceso de chequeo del paciente. A continuación, se detallan los pasos y módulos involucrados:</p>
                    
                    <p class="mb-4"><b>1. Historias Pendientes:</b> En la primera parte, se mostrarán las historias pendientes por atender. Al hacer clic en el botón "Pendiente", aparecerá una ventana modal para registrar la hora de llegada del paciente. Al confirmar, el estado de la historia se actualizará a "Atender Paciente".</p>
                    
                    <p class="mb-4"><b>2. Atender Paciente:</b> Una vez actualizado el estado, haga clic en el botón "Atender Paciente" para proceder al siguiente módulo donde se diligenciará toda la información necesaria para el chequeo médico.</p>
                    
                    <p class="mb-4"><b>3. Firma de Consentimiento:</b> Este módulo es obligatorio. El paciente debe firmar el consentimiento para poder acceder a los demás módulos. Sin la firma, no podrá continuar con el proceso.</p>
                    
                    <p class="mb-4"><b>4. Información Administrativa:</b> En este módulo, se mostrará información ya administrada al crear la orden de servicio, pero también habrá campos adicionales que deben ser diligenciados. Una vez completados todos los campos, haga clic en "Guardar" para continuar al siguiente módulo.</p>
                    
                    <p class="mb-4"><b>5. Motivo Consulta, Enfermedad Actual, Antecedentes y Vacunación:</b> Este módulo se divide en pestañas para cada sección:</p>
                    <ul class="mb-4 px-5">
                        <li><b>Motivo Consulta:</b> Describa el motivo de la consulta del paciente.</li>
                        <li><b>Enfermedad Actual:</b> Detalle la enfermedad actual del paciente.</li>
                        <li><b>Antecedentes:</b> Si no hay un registro previo, diligencie los antecedentes del paciente. Si ya existe un registro, la información se traerá automáticamente.</li>
                        <li><b>Vacunación:</b> Complete la información de vacunación del paciente si no hay un registro previo. Si ya existe un registro, la información se traerá automáticamente.</li>
                        <li><b>Ginecología:</b> Si el paciente es mujer, se activará un módulo adicional de <b>Ginecología</b>. Este módulo también traerá información registrada previamente, si existe. De lo contrario, deberá ser diligenciado.</li>
                    </ul>
                    
                    <p class="mb-4"><b>6. Revisión por Sistemas:</b> En este módulo, se revisarán los diferentes sistemas del cuerpo del paciente. Si ya existe un registro previo, la información se traerá automáticamente. De lo contrario, deberá ser diligenciada.</p>
                    
                    <p class="mb-4"><b>7. Examen Físico:</b> Diligencie todos los campos obligatorios en este módulo para completar el examen físico del paciente.</p>
                    
                    <p class="mb-4"><b>8. Paraclínicos, Diagnósticos y Análisis:</b> En este módulo, puede agregar la cantidad de diagnósticos necesarios para la historia clínica. También hay un campo de análisis donde el médico puede hacer comentarios sobre el análisis realizado.</p>
                    
                    <p class="mb-4"><b>9. Recomendaciones Generales:</b> Seleccione las recomendaciones pertinentes que el médico crea necesarias para el paciente. También hay un campo para agregar observaciones adicionales.</p>
                    
                    <p class="mb-4"><b>10. Órdenes Médicas, Incapacidades y Certificados Médicos:</b> Este módulo se divide en varias secciones:</p>
                    <ul class="mb-4 px-5">
                        <li><b>Tipo de Servicios:</b> Agregue la cantidad de servicios necesarios para el paciente. Estos servicios se reflejarán en una lista.</li>
                        <li><b>Medicamentos Focalizados:</b> Busque y agregue medicamentos desde la lonchera del doctor. Puede escanear el código de barras para mayor precisión. Complete los campos de cantidad, frecuencia, días y cantidad total.</li>
                        <li><b>Procedimientos Focalizados:</b> Estos procedimientos vienen del acuerdo comercial registrado previamente.</li>
                        <li><b>Medicamentos en Farmacia:</b> Funciona de manera similar a los medicamentos focalizados, pero la lista es general y no específica de la lonchera del médico.</li>
                        <li><b>Órdenes Procedimiento:</b> Muestra todos los procedimientos disponibles, no amarrados a un acuerdo comercial específico.</li>
                        <li><b>Orden Consentimiento:</b> Agregue los consentimientos necesarios para realizar procedimientos al paciente.</li>
                        <li><b>Órdenes Incapacidades:</b> Rellene los campos necesarios para generar una incapacidad al paciente.</li>
                    </ul>
                    
                    <p class="mb-4"><b>11. Nota Aclaratoria:</b> En este módulo, puede agregar correcciones o notificaciones pertinentes a la historia clínica. Este módulo solo se activará cuando la historia esté finalizada o cancelada.</p>
                    
                    <p class="mb-4">En la parte superior de esta vista, verá tres botones: "Anular", "Finalizar Atención" y "Aprobar".</p>
                    <ul class="mb-4 px-5">
                        <li><b>Anular:</b> Permite anular la historia médica. Use esta opción si la historia debe ser cancelada por alguna razón.</li>
                        <li><b>Finalizar Atención:</b> Marca la historia como finalizada. Use esta opción cuando haya completado todo el proceso de atención del paciente.</li>
                        <li><b>Aprobar:</b> Aprueba la historia médica. Use esta opción para aprobar la historia una vez que todos los datos hayan sido revisados y confirmados.</li>
                    </ul>
                    
                    <p class="mb-4">Estamos comprometidos a proporcionarle una experiencia de administración de historias médicas sin complicaciones. Esta herramienta le permitirá tomar decisiones informadas y estratégicas para optimizar sus operaciones, mejorar la eficiencia y garantizar una atención de calidad a sus pacientes.</p>
                    <p class="mb-4">Gracias por utilizar nuestra Sección de Historia Médica. Esperamos que esta herramienta sea de gran utilidad en la gestión eficiente de las historias médicas y contribuya al éxito de su organización. Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
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