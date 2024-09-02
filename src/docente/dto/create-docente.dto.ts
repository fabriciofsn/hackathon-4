import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  curso: string;
}
