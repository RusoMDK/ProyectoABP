import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { messageValidator } from '../validators/messages.validator';
import { regexValidatorPatterns } from '../validators/regex.validators';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = new RegExp(regexValidatorPatterns.STRONG_PASSWORD);
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return '$property: ' + messageValidator.formMessage.strongPassword;
        },
      },
    });
  };
}
