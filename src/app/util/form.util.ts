
import { FormGroup } from '@angular/forms';
import {User} from "../admin/user/model/user.model";

export class FormUtil {

  static markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
