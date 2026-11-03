<template>
    <div class="card card-profile">
      <div class="card-body pt-0 mt-4">
        <div class="row">
          <div class="col">
            <div class="d-flex justify-content-center">
              <div class="d-grid text-center">
                <span class="text-lg font-weight-bolder">5</span>
                <span class="text-sm opacity-8">Permisos Permitidos</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <h5>
            {{ rol.name_rol }} 
          </h5>
          <div class="mt-2">
            <i class="ni location_pin mr-2"></i><b>Usuario:</b> <!-- {{ user.user_name }} -->
          </div>
          <div class="mt-2">
            <i class="ni location_pin mr-2"></i><b>Telefono:</b> <!-- {{ user.phone }} -->
          </div>
          <div class="mt-2">
            <i class="ni location_pin mr-2"></i><b>Ciudad:</b> Bogota
          </div>
          <div class="mt-2">
            <i class="ni business_briefcase-24 mr-2"></i><b>Rol:</b> Administrador
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "view-rol",
      data() {
        return {
                msg: "componente principal predeterminado"
        };
      },
      props:{
        rol:Object
      },
      methods: {
        getData(data) {
          this.msg = data;
        }
      },
      mounted() {
        //console.log(this.rol)
      },
  }
  
  </script>