import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionarioDocenteDto } from './create-questionario-docente.dto';

export class UpdateQuestionarioDocenteDto extends PartialType(CreateQuestionarioDocenteDto) {}
