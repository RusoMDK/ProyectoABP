import { AbstractControl } from '@angular/forms';

export class AkCustomValidator {
  // Number only validation
  static numeric(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    } else {
      const test = /^\d*$/;
      if (!test.test(val.toString())) {
        return { numeric: true };
      } else return { numeric: false };
    }
  }
  static numeric_float(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }
    const test = /^\d[0-9,]*$/;
    if (!test.test(val.toString())) {
      return { numeric: true };
    } else return { numeric: false };
  }

  static alpha_numeric(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }
    /*  ^[0-9a-zA-Z _-áéíóúÁÉÍÓÚñÑ]+$ */
    if (val.toString().match('[^0-9a-zA-Z áéíóúÁÉÍÓÚñÑ]+')) {
      return { alpha_numeric: true };
    }
    return null;
  }
  static alpha_numeric_out_less(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }
    /*  ^[0-9a-zA-Z _-áéíóúÁÉÍÓÚñÑ]+$ */
    if (val.toString().match('[^0-9a-zA-Z áéíóúÁÉÍÓÚñÑ,]+')) {
      return { alpha_numeric: true };
    }
    return null;
  }

  static alpha_numeric_expanded(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (
      val.toString().match('[^0-9a-zA-ZáéíóúÁÉÍÓÚñÑ, _-]+') ||
      val.toString().match('[-|_|,| ]{1}[-|_|,| ]{1}') ||
      val.toString().match('^[-|_|,| ]+')
    ) {
      return { alpha_numeric: true };
    }
    return null;
  }
  static course_validator(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (
      val.toString().match('[^A-Za-z0-9áéíóúÁÉÍÓÚñÑ -]+') ||
      val.toString().match('[-]{2}|[ ]{2}') ||
      // val.toString().match('\\|[+]|[*]|[_]|[[]|[]]|[=]|[+]|[/]') ||
      val.toString().match('^-|^ ')
    ) {
      return { alpha_numeric: true };
    }
    return null;
  }

  static discapacity_validator(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }
    /*  ^[0-9a-zA-Z _-]+$ */
    if (
      val.toString().match('[^0-9a-zA-Z áéíóúÁÉÍÓÚñÑ]+') ||
      val.toString().match('[ ]{1}[ ]{1}') ||
      val.toString().match('^[ ]')
    ) {
      return { alpha_numeric: true };
    }
    return null;
  }

  static alpha_numeric_dash(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (!val.toString().match('^[0-9a-zA-Z _-áéíóúÁÉÍÓÚñÑ-]+')) {
      return { alpha_numeric: true };
    }
    return null;
  }

  static security_action(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (!val.toString().match('^[a-zA-Z _áéíóúÁÉÍÓÚñÑ]+$')) {
      return { security_action: true };
    }
    return null;
  }

  static email(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (!val.toString().match('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')) {
      return { email: true };
    }

    return null;
  }
  static onlyletters(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (val.toString().match('[^a-zA-Z áéíóúÁÉÍÓÚñÑ]+')) {
      return { onlyletters: true };
    }

    return null;
  }

  static personCategoryToken(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (!val.toString().match('^[A-Z_]*$') || val.toString().match('^_')) {
      return { personCategoryToken: true };
    }

    return null;
  }

  static akEmail(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (!val.toString().match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
      return { email: true };
    }

    return null;
  }
  static color(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (!val.toString().match('^(#)[0-9a-fA-F]{3,6}$')) {
      return { color: true };
    }

    return null;
  }

  static akNumberDashNumer(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') return null;

    const regExp = /^(\d{3})-(\d{2})/;

    if (regExp.test(val.toString())) return null;
    else return { numeric: true };
  }

  static ci(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === '') {
      return null;
    }

    if (
      !val
        .toString()
        .match('[0-9]{2}((0[1-9]|11|12)|(1[0-9])|(2[0-9])|(3[0-1]))[0-9]{5}')
    ) {
      return { ci: true };
    }

    return null;
  }
}
