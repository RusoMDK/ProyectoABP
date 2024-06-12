import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export default function HandlerException(error: any, modelName?: string) {
  if (error?.code === 11000) {
    throw new BadRequestException(
      `The ${
        modelName ? modelName : 'object'
      } has exists in database. Error: ${JSON.stringify(error?.keyValue)}`,
    );
  } else if (error?.name) {
    throw error;
  }
  throw new InternalServerErrorException(
    error?.message
      ? error.message
      : `An error has occurred in server, please check logs in server`,
  );
}
