<template>
    <div
        v-if="status === 3"
        class="sticky-mobile"
        :style="{
            '--background-time-color': progressBgColor
        }"
        @click="handleClick">
        <div
            class="progreso-circular"
            :style="{
                '--porcentaje': progressPercent,
                '--color-progreso': progressTrackColor
            }">
            <div class="valor-progreso">
                <p class="text-center">{{ textButton ? textButton : 'Finalizar Atención' }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted, computed, watch } from 'vue';

const props = defineProps({
    status: {
        type: Number,
        required: true
    },
    dateAttention: {
        type: Date, // Asegúrate que esto sea un objeto Date válido
        required: true
    },
    eventClick: {
        type: Function,
        required: true
    },
    initStatus: {
        type: Number,
        required: true
    },
    totalDurationMinutes: {
        type: Number,
        required: true
    },
    textButton: {
        type: String,
        required: true
    }
});

const progressPercent = ref<number>(0); // Porcentaje de 0 a 100
const progressTrackColor = ref<string>('#00A73E'); // Color inicial de la barra
const textStatus = ref<string>('');
let intervalId: number | undefined = undefined;
const progressBgColor = ref<string>('#CFFFE1');

const changeColor = (time: number): { borderColor: string, bgColor: string } => {

    if (props.totalDurationMinutes === 0) {
        return {
            borderColor: '#025AB1',
            bgColor: '#C8E4FF',
        };
    }

    if (time < props.totalDurationMinutes * 0.3) {
        return {
            borderColor: '#00A73E',
            bgColor: '#CFFFE1',
        };
    }

    if (time > props.totalDurationMinutes * 0.3 && time < props.totalDurationMinutes * 0.6) {
        return {
            borderColor: '#F6D403',
            bgColor: '#FFF5B8'
        };
    }

    if (time >= props.totalDurationMinutes * 0.6 && time <= props.totalDurationMinutes * 0.9) {
        return {
            borderColor: '#FFAD3A',
            bgColor: '#FEDAA2'
        };
    }
    if (time >= props.totalDurationMinutes * 0.9) {
        return {
            borderColor: '#FF0000',
            bgColor: '#FFB3B3'
        };
    }
    return {
        borderColor: '#025AB1',
        bgColor: '#C8E4FF',
    };

}

const handleClick = () => {
    props.eventClick();
}

const getTrackColorForTime = (elapsedMinutes: number): string => {
    if (elapsedMinutes < props.totalDurationMinutes * 0.3) {
        return '#00A73E'; // Verde
    }
    if (elapsedMinutes < props.totalDurationMinutes * 0.6) { // No es necesario "elapsedMinutes > 45" por el if anterior
        return '#F6D403'; // Amarillo
    }
    if (elapsedMinutes < props.totalDurationMinutes * 0.9) { // No es necesario "elapsedMinutes >= 59"
        return '#FFAD3A'; // Naranja
    }
    // Para 90 minutos o más
    return '#FF0000';   // Rojo
};

// --- Función para actualizar el progreso ---
const updateProgress = () => {
    if (!props.dateAttention) {
        progressPercent.value = 0;
        progressTrackColor.value = getTrackColorForTime(0);
        return;
    }

    const dateAttention = new Date(props.dateAttention);

    if (!(dateAttention instanceof Date) || isNaN(dateAttention.getTime())) {
        console.warn("dateAttention no es una fecha válida.");
        progressPercent.value = 0;
        progressTrackColor.value = getTrackColorForTime(0);
        return;
    }

    // Ajustamos a la zona horaria de Colombia (America/Bogota)
    const now = new Date();
    const colombiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
    const startTime = dateAttention.getTime();
    const currentTime = colombiaTime.getTime();

    const elapsedMilliseconds = Math.max(0, currentTime - startTime);
    const elapsedMinutes = elapsedMilliseconds / (1000 * 60);

    let currentPercentage = (elapsedMinutes / props.totalDurationMinutes) * 100;
    currentPercentage = Math.min(100, Math.max(0, currentPercentage)); // Asegura entre 0 y 100

    progressPercent.value = currentPercentage;

    // Actualizamos el color de la barra de progreso
    progressTrackColor.value = changeColor(elapsedMinutes).borderColor;
    progressBgColor.value = changeColor(elapsedMinutes).bgColor;

    if (elapsedMinutes >= props.totalDurationMinutes) {
        if (intervalId) clearInterval(intervalId);
        textStatus.value = 'APROBAR';
    }
};

watch(() => props.status, (newStatus) => {
    if (newStatus === props.initStatus) {
        updateProgress();
        intervalId = window.setInterval(updateProgress, 1000);
    }
    textStatus.value = props.textButton;
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

// Si el status cambia dinámicamente y quieres iniciar/detener el intervalo:
// import { watch } from 'vue';
// watch(() => props.status, (newStatus) => {
//     if (newStatus === 3) {
//         updateProgress();
//         if (!intervalId) {
//            intervalId = window.setInterval(updateProgress, 5000);
//         }
//     } else {
//         if (intervalId) {
//             clearInterval(intervalId);
//             intervalId = undefined;
//         }
//     }
// });

// Las refs 'textStatus' y 'time' de tu script original no se usan en esta solución
// para la barra de progreso, pero las puedes mantener si son para otra funcionalidad.
// const textStatus = ref<string[]>(['Finalizar Atención', 'APROBAR']);
// const time = ref<number>(0); // Esta 'time' parece ser diferente a 'elapsedMinutes'
</script>

<style>
.progreso-circular {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
}

@media (max-width: 576px) {
    .progreso-circular {
        width: 100px;
        height: 100px;
    }

    .valor-progreso p {
        margin: 0;
        font-size: 15px;
        color: #333;
    }
}

.progreso-circular::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(var(--color-progreso) calc(var(--porcentaje) * 1%),
            #e0e0e0 calc(var(--porcentaje) * 1%));
    transition: all 0.5s ease-in-out;
    transform-origin: center;
    animation: rotate 0.5s ease-in-out;
}

.progreso-circular::after {
    content: '';
    position: absolute;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    background-color: var(--background-time-color);
    border-radius: 50%;
    transition: all 0.5s ease-in-out;
}

.valor-progreso {
    position: relative;
    z-index: 1;
    font-size: 1em;
    font-weight: bold;
    color: #333;
}

.valor-progreso p {
    margin: 0;
    font-size: 1.2em;
    color: #333;
    font-weight: bold;
}

h2 {
    /* Si tienes títulos fuera del componente */
    color: #333;
    text-align: center;
}

@media (max-width: 576px) {
    .progreso-circular {
        width: 100px;
        height: 100px;
    }

    .valor-progreso p {
        margin: 0;
        font-size: 13px;
        color: #333;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>