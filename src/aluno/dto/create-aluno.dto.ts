import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Raca } from '../entities/aluno.entity';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  CPF: string;

  @IsString()
  CPFreponsavel?: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  curso: string;

  @IsEnum(Raca)
  @IsNotEmpty()
  raca: Raca;

  @IsDate()
  @IsNotEmpty()
  data_nascimento: Date;
}
