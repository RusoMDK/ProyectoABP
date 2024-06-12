export const regexValidatorPatterns = {
  ONLY_NUMBER: '^[0-9]*$',
  ALPHA_NUMERIC: '^[0-9a-zA-Z _-áéíóúÁÉÍÓÚñÑ]+$',
  EMAIL: '^[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,4}$',
  ONLY_LETTERS: '^[a-zA-Z _-áéíóúÁÉÍÓÚ]*$',
  STRONG_PASSWORD:
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,50}$' /* MÍnimo 8 caracteres, Máximo 50 caracteres, Al menos una letra mayúscula, Al menos una letra minúscula, Al menos un dígito, No espacios en blanco, Al menos 1 caracter especial */,
  PHONE: '^(?:[+]{1})?(?:([0-9]{1,2}) ?)?(?:[0-9] ?-?){6,14}[0-9]$',
};
