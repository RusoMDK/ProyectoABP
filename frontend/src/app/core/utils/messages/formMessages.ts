export const FormMessages = {
  required: 'Campo obligatorio',
  minlength: 'El número mínimo de caracteres es ',
  maxlength: 'El número máximo de caracteres es ',
  onlyNumbers: 'Campo incorrecto',
  onlyLetters: 'Permite solo letras',
  email: 'Correo no válido',
  pattern: 'EL campo solo puede contener letras',
  msgcustom: 'El campo solo puede contener letras',
  msgcustomnum: 'Campo incorrecto',
  alpha_numeric: 'El campo solo puede contener caracteres alfanúmericos',
  ci: 'El carné no es válido.',

  getMinLength(min: number) {
    return this.minlength + min;
  },

  getMaxLength(max: number) {
    return this.maxlength + max;
  },
};
