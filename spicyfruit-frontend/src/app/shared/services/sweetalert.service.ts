import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class SweetAlert {
  constructor() {
  }

  static swal() {
    return Swal;
  }

  static loadingAlert(title?: string): void {
    Swal.fire({
      title: (title ? title : 'Loading'),
      html: '<i class=\'ft-loader spinner font-large-2\'/>',
      showConfirmButton: false,
      showCloseButton: false,
      showCancelButton: false,
      allowOutsideClick: false
    });
  }

  static successAlert(message: string, showTitle = true) {
    Swal.fire((showTitle ? "Success" : ""), message, "success");
  }

  static errorAlert(error: string, showTitle = true) {
    Swal.fire((showTitle ? "Error" : ""), error, "error");
  }

  static htmlAlert(title: string, html?: string, showConfirm = true) {
    if(html) {
      Swal.fire({
        title: title,
        html: html,
        showConfirmButton: showConfirm,
        showCloseButton: false,
        showCancelButton: false,
        allowOutsideClick: false
      });
    } else {
      Swal.fire({
        title: title,
        showConfirmButton: showConfirm,
        showCloseButton: false,
        showCancelButton: false,
        allowOutsideClick: false
      });
    }
  }

  static close(): void {
    Swal.close();
  }
}
