import { IsNotEmpty, IsString } from 'class-validator';
import { Napne } from 'src/napne/entities/napne.entity';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  napneId: Napne;
}
