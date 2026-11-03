<template>
  <div
    v-show="this.$store.state.layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'bg-new'}`"
  />
  <aside v-if="$store.state.sidebarVisible"
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="[
      this.$store.state.isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3',
      this.$store.state.layout === 'landing' ? 'bg-transparent shadow-none' : '',
      this.$store.state.sidebarType,
      this.$store.state.isMenuCollapsed ? 'collapsed' : ''
    ]"
    id="sidenav-main"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <router-link class="m-0 navbar-brand" to="/home">
        <!-- <img
          :src="
            this.$store.state.darkMode ||
            this.$store.state.sidebarType === 'bg-default'
              ? logoWhite
              : logo
          "
          class="img-logo"
          alt="main_logo"
        /> -->
        <img
          :src="this.$store.state.isMenuCollapsed ? logoWhite : logoIcon"
          class="img-logo"
          :class="{'collapsed-logo': this.$store.state.isMenuCollapsed}"
          alt="main_logo"
        />
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="custom_class" :isHovered="isHovered" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
/* import logo from "@/assets/img/logo-img/AYTEC_Mesa de trabajo 1.png"; */
/* import logoIcon from "./assets/img/logo-img/AYTEC-04.png"; */
import logoIcon from "./../../assets/img/logo-img/logocompleto.png";
import logoWhite from "./../../assets/img/logo-img/logoIcono.png";
export default {
  name: "index",
  components: {
    SidenavList
  },
  data() {
    return {
      /* logo, */
      logoWhite,
      logoIcon,
      isHovered: false
    };
  },
  props: ["custom_class", "layout"],
  methods: {
    handleMouseEnter() {
      if (this.$store.state.isMenuCollapsed) {
        this.isHovered = true;
        const sidenav = document.getElementById('sidenav-main');
        if (sidenav) {
          sidenav.classList.add('expanded');
        }
      }
    },
    handleMouseLeave() {
      if (this.$store.state.isMenuCollapsed) {
        this.isHovered = true;
        const sidenav = document.getElementById('sidenav-main');
        if (sidenav) {
          sidenav.classList.remove('expanded');
        }
      }
    }
  }
};
</script>

<style>

  .img-logo{
    position: absolute;
    top: 10px;
    height: 60px;
    left: 20px;
    max-width: none !important;
    max-height: none !important;
    margin-bottom: 5px;
    transition: all 0.0s ease;
  }

  .collapsed-logo {
    height: 40px !important;
    top: 20px !important;
    left: 20px !important;
  }

  .bg-new{
    background-color: #1976D2;
  }

#sidenav-main{
  overflow-x: hidden !important;
  transition: all 0.0s ease;
}

#sidenav-main.collapsed {
  width: 80px !important;
}

#sidenav-main.collapsed.expanded {
  width: 250px !important;
}

#sidenav-main.collapsed.expanded .nav-link {
  padding: 0.75rem 1rem !important;
}

#sidenav-main.collapsed.expanded .nav-link-text {
  display: inline-block !important;
  opacity: 1 !important;
  width: auto !important;
}

#sidenav-main.collapsed.expanded .icon {
  margin: 0;
}

@media (max-width: 768px) {
  #sidenav-main.collapsed {
    width: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  #sidenav-main.collapsed.expanded {
    width: 250px !important;
    padding: 1rem !important;
    margin: 1rem !important;
  }
  
  .collapsed-logo {
    display: none;
  }
}

/* Estilos para mantener el diseño original cuando el menú está expandido */
#sidenav-main.collapsed.expanded {
  width: 250px !important;
}

#sidenav-main.collapsed.expanded .nav-link {
  padding: 0.75rem 1rem !important;
}

#sidenav-main.collapsed.expanded .nav-link-text {
  display: inline-block !important;
  opacity: 1 !important;
  width: auto !important;
}

#sidenav-main.collapsed.expanded .icon {
  margin: 0;
}

/* Elimino los estilos de :hover para evitar conflictos */
#sidenav-main.collapsed:hover {
  /* sin efecto */
}
#sidenav-main.collapsed:hover .nav-link {
  /* sin efecto */
}
#sidenav-main.collapsed:hover .nav-link-text {
  /* sin efecto */
}
#sidenav-main.collapsed:hover .icon {
  /* sin efecto */
}
</style>
