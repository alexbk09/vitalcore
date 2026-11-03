<template>
    <div>
        <!-- Contenido -->
        <button class="floating-button" @click="captureAndCopy">
            📸
        </button>
    </div>
</template>
<script>
import html2canvas from "html2canvas";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default {
    methods: {
        async captureAndCopy() {
    // Aseguramos que la actualización del DOM haya terminado
    await this.$nextTick();

    const captureArea = document.querySelector(".main-content"); // Asegúrate de usar el contenedor correcto

    if (!captureArea) {
      console.error("El área de captura no fue encontrada");
      return;
    }

    // Opcionalmente puedes ocultar elementos que no quieras capturar, como un menú flotante
    // document.querySelector('.sidebar').style.display = 'none';

    try {
      // Capturamos el área con una escala mayor para mejor calidad
      const canvas = await html2canvas(captureArea, {
        scale: 2, // Aumenta la escala para mejorar la calidad de la imagen
        useCORS: true, // Si tienes imágenes externas, habilita CORS
        width: captureArea.scrollWidth, // Ajusta el ancho del área a capturar
        height: captureArea.scrollHeight // Ajusta el alto del área a capturar
      });

      // Restauramos la visibilidad de cualquier elemento oculto después de la captura
      // document.querySelector('.sidebar').style.display = '';

      // Convertimos el canvas en blob y lo copiamos al portapapeles
      canvas.toBlob(async (blob) => {
        try {
          if (navigator.clipboard && navigator.clipboard.write) {
            const item = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([item]);
            if (navigator.clipboard && navigator.clipboard.write) {
                            const item = new ClipboardItem({ "image/png": blob });
                            await navigator.clipboard.write([item]);
                            Swal.fire({
                                icon: "success",
                                title: "Imagen copiada al portapapeles",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error al copiar la imagen al portapapeles",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
          }
        } catch (error) {
          console.error("Error al copiar al portapapeles: ", error);
        }
      });
    } catch (error) {
      console.error("Error al capturar la pantalla: ", error);
    }
  }
    }
};
</script>
<style scoped>
.floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    font-size: 18px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.floating-button:hover {
    background-color: #2980b9;
    transform: scale(1.1);
}

/* Adaptable a pantallas pequeñas */
@media screen and (max-width: 768px) {
    .floating-button {
        padding: 12px 16px;
        font-size: 16px;
    }
}

/* Adaptable a pantallas muy pequeñas (móviles) */
@media screen and (max-width: 480px) {
    .floating-button {
        bottom: 15px;
        right: 15px;
        padding: 10px 14px;
        font-size: 14px;
    }
}
</style>