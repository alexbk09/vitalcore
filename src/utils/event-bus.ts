import mitt from "mitt";

type Events = {
  mensajeEnviado: string;
};

export const eventBus = mitt<Events>();
