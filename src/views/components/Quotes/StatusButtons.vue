<template>
  <div class="btn-group" role="group" aria-label="Estados de citas">
    <button 
      v-for="status in statuses" 
      :key="status.id"
      type="button" 
      class="btn py-3 px-4 btn-sm"
      :class="status.class"
      @click="$emit('status-change', status.id)"
    >
      {{ status.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'StatusButtons',
  data() {
    return {
      statuses: [
        { id: 'pending', label: 'POR AGENDAR', class: 'btn-white' },
        { id: 'completed', label: 'ATENCIÓN TERMINADA', class: 'status-completed' },
        { id: 'scheduled', label: 'ATENCIÓN PROGRAMADA', class: 'status-scheduled' },
        { id: 'new', label: 'NUEVO SEGUIMIENTO', class: 'status-new' },
        { id: 'failed', label: 'ATENCIÓN FALLIDA', class: 'status-failed' },
        { id: 'desisted', label: 'ATENCIÓN DESISTIDA', class: 'status-desisted' }
      ]
    }
  }
}
</script>

<style scoped>
.status-completed {
  background-color: #1E6DC7;
  color: white;
}

.status-scheduled {
  background-color: #37A844;
  color: white;
}

.status-new {
  background-color: #FDAA29;
  color: white;
}

.status-failed {
  background-color: #E22B3A;
  color: white;
}

.status-desisted {
  background-color: #838384;
  color: white;
}
</style> 