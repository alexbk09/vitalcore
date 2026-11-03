<template>
  <div class="patient-card">
    <div class="patient-info">
      <div class="patient-name">
        {{ paciente.first_surname }} {{ paciente.second_surname }}<br>
        {{ paciente.firstname }} {{ paciente.middlename }}
      </div>
      <div class="patient-phone">
        TEL: {{ paciente.contact_phone }}
      </div>
    </div>
    <div class="patient-actions">
      <i class="fas fa-plus" @click="$emit('show-patient', paciente, quote)" aria-label="Ver detalles del paciente"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientCard',
  props: {
    paciente: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.firstname && value.first_surname && value.contact_phone
      }
    },
    quote: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.patient-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  height: 48px;
  width: 100%;
  padding: 4px 12px;
  box-sizing: border-box;
}

.patient-info {
  flex: 1;
  text-align: center;
  color: #183472;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.1;
}

.patient-actions {
  font-size: 2rem;
  color: #183472;
  margin-left: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style> 