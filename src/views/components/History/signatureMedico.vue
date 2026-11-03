<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h5>Firma del medico</h5>
        </div>
        <div class="col-12 mt-3">
          <VueSignaturePad id="signature" width="100%" height="500px" ref="signaturePad" :options="options" />
        </div>
        <div class="buttons mt-3">
          <button class="btn btn-danger" @click="undo"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          <button class="btn btn-primary" @click="save"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
        </div>
      </div>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Consentimiento</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueSignaturePad } from 'vue-signature-pad';
import { mapActions/* , mapGetters */ } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  name: "App",
  data() {
    return {
      searchservicHistory: this.$route.params.id,
      searchKeyPatient: this.$route.params.key_patient,
      signatureData: null,
      options: {
        penColor: "#FF5733",
      },
    }
  },
  components: { VueSignaturePad },
  methods: {
    ...mapActions('History', ['Signature']),
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        this.signatureData = data;
        this.sendSignatureToVuex();
      }
    },
    sendSignatureToVuex() {
      const dataSignature = {
        key_history: this.searchservicHistory,
        signature_doctor: this.signatureData,
      };
      const response = this.Signature(dataSignature);
      if (response) {
        Swal.fire({
          title: 'Firma enviada',
          text: 'La firma se ha enviado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1500
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'La firma no se ha podido enviar.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 1500
        })
      }
    },
  },
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