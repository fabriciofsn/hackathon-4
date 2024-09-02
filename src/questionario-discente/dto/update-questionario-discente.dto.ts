import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionarioDiscenteDto } from './create-questionario-discente.dto';

export class UpdateQuestionarioDiscenteDto extends PartialType(CreateQuestionarioDiscenteDto) {}
