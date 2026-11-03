export default function setupRouteGuard(router) {
    router.beforeEach((to, from, next) => {
        //console.log("Cambio de ruta detectado:", from.fullPath, "➡", to.fullPath);
        
        // Aquí puedes agregar lógica personalizada, por ejemplo:
        // - Verificar autenticación
        // - Registrar métricas de navegación
        // - Mostrar un loader
    
        next(); // Permitir la navegación
      });
      router.afterEach((to) => {
        //console.log(`estoy en: ${to.fullPath}`);
      });
  }
  