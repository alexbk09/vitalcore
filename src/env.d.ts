interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL_API: string;
  readonly VITE_APP_BASE_URL_MEDIO: string;
  // Agrega aquí otras variables de entorno si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}