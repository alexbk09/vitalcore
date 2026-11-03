<template>
  <div
    v-show="this.$store.state.layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100 "></div>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[
      this.$store.state.isTransparent,
      this.$store.state.isRTL ? 'fixed-end' : 'fixed-start'
    ]"
    v-if="this.$store.state.showSidenav" class="" />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg pt-3">
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : 'text-white'
        "
      :minNav="navbarMinimize"
      v-if="true && this.$route.name != 'Signin'" />
    <router-view />
    <!-- <app-footer v-show="this.$store.state.showFooter" /> -->

  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav/index.vue";
import Navbar from "./examples/Navbars/Navbar.vue";
/* import AppFooter from "@/examples/Footer.vue"; */
import { mapGetters } from "vuex";
import { watch } from "vue";
import { useRouter } from 'vue-router'
import auth from './auth/auth'

export default {
  name: "App",
  components: {
    Sidenav,
    Navbar,
    /*  AppFooter */
  },
  methods: {
    ...mapGetters(["toggleConfigurator", "navbarMinimize"]),
    getToken() {
      return this.getUser
    },
  },
  computed: {
    ...mapGetters('Auth', ['getUser']),

    navClasses() {
      return {
        "position-sticky bg-white left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && !this.$store.state.darkMode,
        "position-sticky bg-default left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && this.$store.state.darkMode,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4": !this.$store.state.isAbsolute
      };
    }
  },
  beforeMount() {
    const router = useRouter()
    watch(
      () => router.currentRoute.value,
      // eslint-disable-next-line no-unused-vars
      // TODO ->  Error de login pendiente por refactorizar
      (to, from) => {
        if (this.$route.name != 'Signin') {
          auth.refreshToken(this.$route.name);
        }
      }
    );

    /* setInterval(() => {
      console.log("🚀 ~ setInterval ~ this.getToken:", this.getToken());
      if (!this.getToken() || this.getToken() == null) {
        auth.deleCookies(this.$route.name);
      }
    }, 10000);  */// Validar cada 60 segundos
    this.$store.state.isTransparent = "bg-transparent";
  },
  mounted() {
    this.$store.state.user
  },
};
</script>
