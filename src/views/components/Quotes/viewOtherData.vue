<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <h5>OTROS DATOS</h5>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body-custom">
        <form>
          <div class="row mb-2">
            <div class="col-4">
              <label><b>NOMBRE DEL ACOMPAÑANTE:</b></label>
              <input type="text" class="form-control" v-model="form.companionName" />
            </div>
            <div class="col-4">
              <label><b>PARENTESCO:</b></label>
              <input type="text" class="form-control" v-model="form.relationship" />
            </div>
            <div class="col-4">
              <label><b>TELÉFONO DEL ACOMPAÑANTE:</b></label>
              <input type="text" class="form-control" v-model="form.companionPhone" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <label><b>TELÉFONO DEL ACOMPAÑANTE:</b></label>
              <input type="text" class="form-control" v-model="form.trackingCode" />
            </div>
            <div class="col-4">
              <label><b>AUTORIZA:</b></label>
              <input type="text" class="form-control" v-model="form.authorizes1" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <label><b>SE CONTACTA A:</b></label>
              <input type="text" class="form-control" v-model="form.contactedTo" />
            </div>
            <div class="col-4">
              <label><b>FECHA SE PROGRAMA:</b></label>
              <input type="date" class="form-control" v-model="form.scheduledDate" />
            </div>
            <div class="col-4">
              <label><b>QUIÉN PROGRAMA:</b></label>
              <input type="text" class="form-control" v-model="form.whoSchedules" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <label><b>ENVÍO DE INFORMACIÓN:</b></label>
              <input type="text" class="form-control info-bg" v-model="form.infoSent" />
            </div>
            <div class="col-4">
              <label><b>WHATSAPP:</b></label>
              <input type="text" class="form-control info-bg" v-model="form.whatsapp" />
            </div>
            <div class="col-4">
              <label><b>AUTORIZA:</b></label>
              <input type="text" class="form-control info-bg" v-model="form.authorizes2" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <label><b>SE ENVÍA CORREO:</b></label>
              <input type="text" class="form-control info-bg" v-model="form.emailSent" />
            </div>
            <div class="col-8">
              <label><b>OBSERVACIONES:</b></label>
              <input type="text" class="form-control info-bg" v-model="form.observations" />
            </div>
          </div>
          <div class="row my-3">
            <div class="col-12 text-start">
              <button type="button" class="btn btn-business-contact btn-sm">
                AGREGAR CONTACTO EMRESARIAL <span style="font-weight: bold;">+</span>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-end">
              <button type="button" class="btn btn-danger me-2" @click="$emit('close')">CERRAR</button>
              <button type="button" class="btn btn-business-contact">GUARDAR</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'viewOtherData',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        companionName: '',
        relationship: '',
        companionPhone: '',
        trackingCode: '',
        authorizes1: '',
        contactedTo: '',
        scheduledDate: '',
        whoSchedules: '',
        infoSent: '',
        whatsapp: '',
        authorizes2: '',
        emailSent: '',
        observations: ''
      }
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content-custom {
  background: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  min-width: 900px;
  max-width: 95vw;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
}
.modal-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
.btn-business-contact {
  background: #1864ab;
  color: #fff;
  border-radius: 8px;
  font-weight: bold;
}
.info-bg {
  background: #e3f0ff;
}
</style> 