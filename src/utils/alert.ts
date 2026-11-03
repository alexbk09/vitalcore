import Swal, { SweetAlertIcon } from "sweetalert2";

export class AlertUtils {
  static success(title: string, message: string, icon: SweetAlertIcon = "success") {
    Swal.fire(title, message, icon);
  }

  static error(title: string, message: string, icon: SweetAlertIcon = "error") {
    Swal.fire(title, message, icon);
  }

  static warning(title: string, message: string, icon: SweetAlertIcon = "warning") {
    Swal.fire(title, message, icon);
  }

  static info(title: string, message: string, icon: SweetAlertIcon = "info") {
    Swal.fire(title, message, icon);
  }

  static confirm(title: string, message: string, icon: SweetAlertIcon = "warning") {
    return Swal.fire({
      title,
      text: message,
      icon,
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    });
  }
}
