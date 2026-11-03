<template>
    <div class="container-fluid mt-4">
      <div class="card">
        <div class="card-body">
          <div class="alert alert-warning" role="alert">
            Confirme la cuentas que serán generadas
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>No. Ingreso</th>
                  <th>Paciente</th>
                  <th>Serie</th>
                  <th>Factura</th>
                  <th>Entidad</th>
                  <th>Convenio</th>
                  <th>Valor</th>
                  <th>Fecha factura</th>
                </tr>
              </thead>
              <tbody>
                </tbody>
            </table>
          </div>
          <div class="text-center mt-3">
            <button type="button" class="btn btn-primary">Generar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmAccounts'
  }
  </script>
  
  <style scoped>
  .alert-warning {
    background-color: #fff9c4;
    border-color: #fff3e0;
    color: #664d03;
  }
  </style>