import { PartialType } from '@nestjs/mapped-types';
import { CreateEscenaryDto } from './create-escenary.dto';

export class UpdateEscenaryDto extends PartialType(CreateEscenaryDto) {}
