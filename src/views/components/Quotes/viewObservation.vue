<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <h5>Observación / Novedad</h5>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body-custom">
        <div v-if="!showAdd">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="section-title">OBSERVACIÓN / NOVEDAD</span>
            <button class="btn btn-primary btn-add btn-sm py-0 px-5 rounded-3" type="button" @click="showAdd = true">
              AGREGAR <span style="font-size: 1.5rem; font-weight: bold;">+</span>
            </button>
          </div>
          <form>
          <div class="row mb-2">
            <div class="col-6">
              <label><b>OBSERVACIÓN:</b></label>
              <textarea class="form-control" rows="5" v-model="observacion.observacion"></textarea>
            </div>
            <div class="col-6">
              <div class="row">
                <div class="col-6">
              <label><b>FECHA:</b></label>
              <input type="date" class="form-control" v-model="observacion.fecha" />
            </div>
            <div class="col-6">
              <label><b>HORA:</b></label>
              <input type="time" class="form-control" v-model="observacion.hora" />
            </div>
            <div class="col-6">
              <label><b>PERSONAL:</b></label>
              <input type="text" class="form-control" v-model="observacion.personal" />
            </div>
            <div class="col-6 d-flex align-items-end">
              <label class="me-2"><b>OPCIONES:</b></label>
              <button type="button" class="btn btn-link p-0  me-2"><i class="fas fa-pen"></i></button>
              <button type="button" class="btn btn-link p-0 "><i class="fas fa-trash"></i></button>
            </div>
              </div>
            </div>
            
          </div>

          <div class="row">
            <div class="col-12 text-end">
              <button type="button" class="btn btn-danger" @click="$emit('close')">CERRAR</button>
            </div>
          </div>
        </form>
        </div>
        <div v-else>
          <div class="add-title">AGREGAR NUEVA OBSERVACIÓN / NOVEDAD</div>
          <hr class="add-title-hr" />
          <div class="mb-3">
            <textarea class="form-control add-textarea" rows="7" placeholder="OBSERVACIÓN" v-model="nuevaObservacion"></textarea>
          </div>
          <div class="text-end">
            <button class="btn btn-secondary me-2" @click="showAdd = false">CANCELAR</button>
            <button class="btn btn-primary">GUARDAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'viewObservation',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    observacion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showAdd: false,
      nuevaObservacion: ''
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
.section-title {
  background: #183472;
  color: #fff;
  border-radius: 7px;
  padding: 4px 18px;
  font-weight: bold;
  font-size: 1.2rem;
}
.btn-add {
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
}
.add-title {
  color: #23264C;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 10px;
}
.add-title-hr {
  margin-top: 0;
  margin-bottom: 18px;
  border: none;
  border-top: 2px solid #E5E7EB;
}
.add-textarea {
  border-radius: 10px;
  border: 2px solid #1E90FF;
  font-size: 1.2rem;
  color: #23264C;
  padding: 12px;
  min-height: 180px;
  resize: none;
}
.add-textarea::placeholder {
  color: #A0A0A0;
  font-size: 1.1rem;
}
</style> 