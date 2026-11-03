<template>
  <div>
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Leer Consentimiento
      </button> -->
    <a href="https://d4iyqbpm2nrkk.cloudfront.net/pdf/CONSENTIMIENTO+INFORMADO+PARA+CONSULTA+DE+ATENCIO%CC%81N+DOMICILIARIA+PRESENCIAL+y+telemedicina.pdf"
      target="_blank" class="btn btn-success">Leer Consentimiento</a>

    <div class="row">
      <div class="col-12">
        <h5>Firma del paciente</h5>
      </div>
      <div class="col-12 mt-3">
        <div v-if="valueStatus.signature_patient" class="text-end">
          <img :src="'https://dpqp3qumpif1o.cloudfront.net/' + valueStatus.signature_patient" class="img-fluid border"
            width="100%" height="100%" alt="">
        </div>
        <VueSignaturePad v-else id="signature" width="100%" height="300px" ref="signaturePad" :options="options" />
      </div>
      <div class="buttons mt-3" v-if="!valueStatus.signature_patient && valueStatus.key_status != 5 && valueStatus.key_status != 4">
        <button class="btn btn-danger" @click="undo">Borrar</button>
        <button class="btn btn-primary" @click="handleSave">
          Agregar
        </button>
      </div>
    </div>
    <div class="p-2 mb-2 bg-danger d-flex align-items-center mt-3" v-if="!valueStatus.signature_patient && valueStatus.key_status != 5" style="border-radius: 8px; width: 200px; color: white;">
      <input class="form-check-input me-2" type="checkbox" id="showTextarea" v-model="showTextarea"
        style="width: 20px; height: 20px; border-radius: 50%;">
      <label class="form-check-label mt-2 text-white" for="showTextarea">
        PACIENTE FALLIDO
      </label>
    </div>
    <div v-if="showTextarea" class="mt-2">
      <textarea v-model="state.failed_date" class="form-control" rows="3" placeholder="Escribe tu observación aquí..."
        style="background: #ffe5e5;"></textarea>
      <div class="text-end mt-2">
        <button class="btn btn-danger" @click="cancel">
          Guardar
        </button>
      </div>
      
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Consentimiento</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- <div id="consentimiento-html" style="height: 500px; width: 100%;"></div> -->
            <!-- <iframe src="https://d4iyqbpm2nrkk.cloudfront.net/pdf/CONSENTIMIENTO_UNIFICADO.pdf
                            &embedded=true" style="width:100%; height:700px;" frameborder="0" ></iframe> -->
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueSignaturePad } from 'vue-signature-pad';
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  name: "App",
  props: {
    valueStatus: Object
  },
  data() {
    return {
      searchservicHistory: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      searchserviceOrder: this.$route.params.id,
      signatureData: null,
      options: {
        penColor: "#FF5733",
      },
      showTextarea: false,
      observation: '',
      state: {
        state: '',
        id_history: '',
        failed_date: '',
      },
    }
  },
  components: { VueSignaturePad },
  mounted() {
    /* this.loadHTMLContent(); */
  },
  methods: {
    ...mapActions('History', ['Signature', 'signaturePadConsulter']),
    ...mapActions('ServiceOrder', ["updateState"]),
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    handleSave() {
      if (this.$refs.signaturePad.isEmpty()) {
        Swal.fire({
          title: 'Advertencia',
          text: 'Debe firmar antes de agregar.',
          icon: 'warning',
          confirmButtonText: 'OK',
          timer: 1500
        });
        return;
      }
      this.save();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        this.signatureData = data;
        this.sendSignatureToVuex();
      }
    },
    async sendSignatureToVuex() {
      const dataSignature = {
        key_history: this.searchservicHistory,
        signature_patient: this.signatureData,
      };
      try {
        const response = await this.Signature(dataSignature);
        Swal.fire({
          title: 'Firma enviada',
          text: 'La firma se ha enviado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1500
        });
        this.$emit('saved');
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message || 'La firma no se ha podido enviar.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 1500
        });
      }
    },
    saveObservation() {
      alert('Observación guardada: ' + this.observation);
    },
    cancel() {
      Swal.fire({
        title: '¿Está seguro que deseas anular esta historia clinica?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, anular!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.state.id_history = this.searchserviceOrder
          this.state.state = 5


          const response = await this.updateState(this.state)
          if (!response) {
            Swal.fire(
              '¡Lo siento!',
              'La historia clinica no pudo ser anulada.',
              'error'
            )
            return
          }
          if (response) {
            Swal.fire(
              'Anulada!',
              'La historia clinica ha sido anulada.',
              'success'
            )
            location.reload();
          }
        }
      })
    },
  },
  computed: {
    ...mapGetters('History', ['getSignature']),
  }
};
</script>

<style>
#signature {
  border: double 3px black;
  border-radius: 5px;
  background-origin: border-box;
  background-clip: content-box, border-box;
}


.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>