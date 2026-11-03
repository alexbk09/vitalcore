<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <h5>Datos del Paciente</h5>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body-custom">
        <form>
          <div class="row">
            <div class="col-3">
              <label><b>PRIMER APELLIDO:</b></label>
              <input type="text" class="form-control" :value="paciente.first_surname" disabled />
            </div>
            <div class="col-3">
              <label><b>SEGUNDO APELLIDO:</b></label>
              <input type="text" class="form-control" :value="paciente.second_surname" disabled />
            </div>
            <div class="col-3">
              <label><b>PRIMER NOMBRE:</b></label>
              <input type="text" class="form-control" :value="paciente.firstname" disabled />
            </div>
            <div class="col-3">
              <label><b>SEGUNDO NOMBRE:</b></label>
              <input type="text" class="form-control" :value="paciente.middlename" disabled />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-3">
              <label><b>TIPO DE DOCUMENTO:</b></label>
              <input type="text" class="form-control" :value="paciente.type_document.description" disabled />
            </div>
            <div class="col-3">
              <label><b>Nº DE IDENTIFICACIÓN:</b></label>
              <input type="text" class="form-control" :value="paciente.document" disabled />
            </div>
            <div class="col-3">
              <label><b>FECHA DE NACIMIENTO:</b></label>
              <input type="text" class="form-control" :value="paciente.birthdate" disabled />
            </div>
            <div class="col-3">
              <label><b>EDAD:</b></label>
              <input type="text" class="form-control" :value="paciente.age" disabled />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-3">
              <label><b>CELULAR:</b></label>
              <input type="text" class="form-control" :value="paciente.contact_phone" disabled />
            </div>
            <div class="col-3">
              <label><b>TELÉFONO:</b></label>
              <input type="text" class="form-control" :value="paciente.phone" disabled />
            </div>
            <div class="col-3">
              <label><b>CORREO ELECTRÓNICO:</b></label>
              <input type="text" class="form-control" :value="paciente.email" disabled />
            </div>
            <div class="col-3">
              <label><b>GÉNERO:</b></label>
              <input type="text" class="form-control" :value="paciente.genre" disabled />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-3">
              <label><b>ACUERDO COMERCIAL:</b></label>
              <input type="text" class="form-control" :value="agreement.name_agreements" disabled />
            </div>
            <div class="col-3">
              <label><b>EMPRESA:</b></label>
              <input type="text" class="form-control" :value="mission.name" disabled />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'viewPatients',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    paciente: {
      type: Object,
      required: true
    },
    agreement: {
      type: Object,
      required: true,
      default: () => ({})
    },
    mission: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  mounted() {
    console.log('Agreement recibido:', this.agreement)
    console.log('Mission recibido:', this.mission)
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
</style> 