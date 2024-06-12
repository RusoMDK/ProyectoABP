import set = Reflect.set;
export const ApplicatioMessages = {
  formMessages: {
    required: 'Campo requerido.',
    minlength: 'Se requieren ',
    maxlength: 'Excede la cantidad máxima de caracteres.',
    email: 'Correo no válido.',
    number: 'Campo incorrecto.',
    pattern: 'Campo incorrecto.',
    msgcustom: 'Se requieren solo letras.',
    alpha_numeric: 'Se requieren solo números y letras.',
    color: 'Campo incorrecto.',
    ci: 'El carné no es válido.',
  },
  actionsMessages: {
    succes: 'La acción ha sido realizada satisfactoriamente.',
    cancelConfirm: '¿Está seguro que desea cancelar la operación?',
    deleteConfirm: '¿Está seguro que desea eliminar este elemento?',
    disableConfirm: '¿Está seguro que desea deshabilitar este elemento?',
    enableConfirm: '¿Está seguro que desea habilitar este elemento?',
  },
  systemMessages: {
    errorAPiConnection: 'Error al conectar con el servidor.',
    loading: 'Por favor espere...',
  },

  getMinLength(min: number) {
    return this.formMessages.minlength + min + ' caracteres';
  },

  getMaxLength(max: number) {
    return this.formMessages.maxlength;
  },
};
