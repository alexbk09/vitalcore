<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <h5>Datos Cita</h5>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body-custom">
        <form>
          <div class="row mb-2">
            <div class="col-3">
              <label><b>CITA MÉDICO:</b></label>
              <input type="text" class="form-control" :value="cita.date_control || ''" disabled />
            </div>
            <div class="col-3">
              <label><b>CITA REAL:</b></label>
              <input type="date" class="form-control" v-model="startdate" />
            </div>
            <div class="col-2">
              <label><b>HORA:</b></label>
              <input type="time" class="form-control" v-model="hour" />
            </div>
            <div class="col-4 d-flex align-items-end ">
              <button type="button" class="btn btn-agenda mt-4 w-100"><b>REVISAR AGENDA MÉDICA</b> <i class="fas fa-eye"></i></button>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <label><b>TIPO DE ATENCIÓN:</b></label>
              <select name="" id="" class="form-select" v-model="id_product">
                <option :value="product.id" v-for="product in listProduct" :key="product.id">{{ product.description }}</option>
              </select>
            </div>
            <div class="col-3">
              <label><b>DIRECCIÓN DE RESIDENCIA:</b></label>
              <input type="text" class="form-control" :value="cita.patient.address || ''" disabled />
            </div>
            <div class="col-3">
              <label><b>DIRECCIÓN DE TRABAJO:</b></label>
              <input type="text" class="form-control" :value="cita.work_address || ''" disabled />
            </div>
            <div class="col-3">
              <label><b>MÉDICO:</b></label>
              <select name="" id="" class="form-select" v-model="key_doctor">
                <option :value="doctor.id" v-for="doctor in listDoctor" :key="doctor.id">{{ doctor.name }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12">
              <label><b>MOTIVO DE CONSULTA:</b></label>
              <textarea class="form-control" rows="3" :value="cita?.technical_sheet?.reason_consultation || ''" disabled></textarea>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-3">
              <button type="button" class="btn btn-desistido w-100">PACIENTE DESISTIDO</button>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-end">
              <button type="button" class="btn btn-danger me-2" @click="$emit('close')">CERRAR</button>
              <button type="button" class="btn btn-primary" @click="quotesSave">GUARDAR</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'viewQuoteData',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    cita: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id_product: '',
      startdate: '',
      hour: '',
      key_doctor: '',
    }
  },
  mounted() {
    this.getDoctor()
    this.getProduct()
    this.id_product = Number(this.cita.modality_date_control) // Conversión a número
  },
  computed: {
    ...mapGetters("ContentConsultations", ["listDoctor","listProduct"]),
  },
  methods: {
    ...mapActions("ContentConsultations", ["getDoctor","getProduct"]),
    ...mapActions("Quotes", ["saveQuote"]),
    quotesSave() {
      const data = {
        id_history: this.cita.id_history,
        status_history: 7,
        key_product: this.id_product, // Usar el id_product convertido a número
        startdate: this.startdate + ' ' + this.hour, // Concatenar fecha y hora
        key_doctor: this.key_doctor,
      }
      this.saveQuote(data)
        .then(() => {
          this.$emit('close')
        })
        .catch(error => {
          console.error("Error saving quote:", error)
        })
    }
  },
  watch: {
    cita: {
      immediate: true,
      handler(newVal) {
        this.id_product = Number(newVal.modality_date_control) || ''
      }
    }
  },
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
.btn-agenda {
  background: #C6F7E2;
  color: #183472;
  border-radius: 8px;
  font-weight: bold;
}
.btn-desistido {
  background: #BDBDBD;
  color: #fff;
  border-radius: 8px;
  font-weight: bold;
}
</style>