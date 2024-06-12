export const messageValidator = {
  formMessage: {
    required: 'Este valor no debería estar vacío',
    minLength: 'El número mínimo de caracteres es  ',
    maxLength: 'El número máximo de caracteres es ',
    email: 'Introduzca una dirección de correo válida',
    number: 'Este campo solo puede contener números',
    phone: 'Introduzca un número de teléfono válido',
    pattern: 'El campo no es válido',
    onlyLetters: 'Este campo solo puede contener letras',
    alphaNumeric: 'El campo solo puede contener caracteres alfanúmericos',
    maxFileSize: 'El fichero a subir debe ser menor a ',
    extensionsAllowedFile: 'Solo se aceptan formatos de tipo ',
    notEqualsPasswords: 'La contraseña ingresada no coincide',
    invalidOldPassword:
      'Este valor debería ser la contraseña actual del usuario',
    strongPassword:
      'La contraseña debe contener al menos (8 caracteres y máximo 50, una letra mayúscula, una letra minúscula, un dígito, 1 caracter especial) y no espacios en blanco',
  },
  actionMessage: {
    success: 'La acción ha sido realizada satisfactoriamente',
    cancelConfirm: '¿Está seguro que desea cancelar la operación?',
    deleteConfirm: '¿Está seguro que desea eliminar el elemento?',
    disableConfirm: '¿Está seguro que desea deshabilitar este elemento?',
    enableConfirm: '¿Está seguro que desea habilitar este elemento?',
    createSuccess: 'El elemento se ha creado satisfactoriamente',
    createMultipleSuccess: 'Los elementos se han creado satisfactoriamente',
    updateSuccess: 'El elemento se ha actualizado satisfactoriamente',
    deleteSuccess: 'El elemento se ha eliminado satisfactoriamente',
    deleteAllSuccess: 'Todos los elementos se han eliminado satisfactoriamente',
    createError: 'Se ha producido un error durante la creación del elemento',
    updateError:
      'Se ha producido un error durante la actualización del elemento',
    deleteError: 'Se ha producido un error durante la eliminación del elemento',
    rolePermissionsError:
      'Se ha producido un error, verifique que el rol tenga permisos asociados',
    loginError: 'Usuario o contraseña incorrectos',
    passwordError: 'Contraseña incorrecta',
    loginErrorUserDisabled:
      'El usuario está deshabilitado, por favor contacte con el administrador del sistema',
    changePasswordError:
      'Se ha producido un error durante la actualización de la contraseña',
    notFound: 'El elemento buscado no existe',
  },
  systemMessages: {
    errorAPiConnection: 'Error al conectar con el servidor',
    loading: 'Por favor espere...',
  },
  getMinLength(min: number) {
    return this.formMessages.minLength + min;
  },
  getMaxLength(max: number) {
    return this.formMessages.maxLength + max;
  },
  getMaxFileSize(max: number) {
    return this.formMessages.maxFileSize + max + 'MB';
  },
  getExtensionsAllowed(extensions: string) {
    return this.formMessages.extensionsAllowedFile + extensions;
  },
  getUniqueMessage(entityName?: string, message?: string) {
    return message ? message : `${entityName} existente en la base de datos`;
  },
};
