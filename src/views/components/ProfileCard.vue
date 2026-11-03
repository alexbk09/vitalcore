<template>
  <div class="card card-profile">
    <img src="https://wallpaper.dog/large/20383255.jpg" alt="Image placeholder" class="card-img-top" />
    <div class="row justify-content-center">
      <div class="col-4 col-lg-4 order-lg-2 ">
        <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
          <a href="javascript:;">
            <img
              src="../../assets/img/usuario.png"
              class="rounded-circle img-fluid border border-2 border-white"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="card-body pt-0 mt-4">
      <div class="text-center mt-4">
        <h5>
          {{ user.name }} {{ user.last_name }}
        </h5>
        <div class="mt-2">
          <i class="ni location_pin mr-2"></i><b>Usuario:</b> {{ user.user_name }}
        </div>
        <div class="mt-2">
          <i class="ni location_pin mr-2"></i><b>Telefono:</b> {{ user.phone }}
        </div>
        <div class="mt-2">
          <i class="ni location_pin mr-2"></i><b>Ciudad:</b> Bogota
        </div>
        <div class="mt-2">
          <i class="ni business_briefcase-24 mr-2"></i><b>Rol:</b> {{ user.name_rol }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile-card",
    data() {
      return {
              msg: "componente principal predeterminado"
      };
    },
    props:{
      user:Object
    },
    methods: {
      getData(data) {
        this.msg = data;
      }
    },
    mounted() {
    },
}

</script>