import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { Napne } from 'src/napne/entities/napne.entity';

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
  cursos: string;

  @IsNotEmpty()
  napne: Napne;
}
