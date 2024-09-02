import { PartialType } from '@nestjs/mapped-types';
import { CreateNapneDto } from './create-napne.dto';

export class UpdateNapneDto extends PartialType(CreateNapneDto) {}
