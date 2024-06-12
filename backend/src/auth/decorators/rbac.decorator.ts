import { SetMetadata } from '@nestjs/common';

export const Rbac = (...args: string[]) => SetMetadata('rbac', args);
