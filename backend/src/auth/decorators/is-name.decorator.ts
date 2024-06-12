import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { messageValidator } from '../validators/messages.validator';
import { regexValidatorPatterns } from '../validators/regex.validators';

export function IsNameText(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNameText',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = new RegExp(regexValidatorPatterns.ONLY_LETTERS);
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return '$property: ' + messageValidator.formMessage.onlyLetters;
        },
      },
    });
  };
}
