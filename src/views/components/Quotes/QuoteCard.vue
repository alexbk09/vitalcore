<template>
  <div class="quote-card">
    <div class="quote-info">
      <span class="quote-type">{{ quote.status_history.description }}</span>
    </div>
    <div class="quote-actions">
      <i class="fas fa-calendar-alt" @click="$emit('show-quote', quote)" aria-label="Ver detalles de la cita"></i>
      <span class="plus-icon">+</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteCard',
  props: {
    quote: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.cita && value.citaTipo
      }
    }
  }
}
</script>

<style scoped>
.quote-card {
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

.quote-info {
  flex: 1;
  text-align: center;
}

.quote-type {
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: #183472;
}

.quote-actions {
  font-size: 1.7rem;
  color: #183472;
  margin-left: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.plus-icon {
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 2px;
}
</style> 