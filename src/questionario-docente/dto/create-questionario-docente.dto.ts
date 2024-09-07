import {
  IsDate,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  Aprendizagem,
  AspectosMotores,
  Comportamento,
  Comunicacao,
  EstadoSaude,
  HistoricoEscolar,
  Pedagogico,
} from '../entities/questionario-docente.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';

export class CreateQuestionarioDocenteDto {
  @IsDate()
  @IsNotEmpty()
  inicioObservacao: Date;

  @IsDate()
  @IsNotEmpty()
  fimObsercacao: Date;

  @IsString()
  @IsNotEmpty()
  queixa: string;

  @IsEnum(EstadoSaude)
  @IsNotEmpty()
  estadoGeralAluno: EstadoSaude;

  @IsString()
  observacoes?: string;

  @IsEnum(HistoricoEscolar)
  @IsNotEmpty()
  historicoEscolar: HistoricoEscolar[];

  @IsEnum(Comportamento)
  @IsNotEmpty()
  comportamento: Comportamento[];

  @IsString()
  obsComportamento?: string;

  @IsEnum(Aprendizagem)
  @IsNotEmpty()
  aprendizagem: Aprendizagem[];

  @IsEnum(AspectosMotores)
  @IsNotEmpty()
  aspectosMotores: AspectosMotores[];

  @IsEnum(Comunicacao)
  @IsNotEmpty()
  comunicacao: Comunicacao[];

  @IsEnum(Pedagogico)
  @IsNotEmpty()
  pedagogico: Pedagogico[];

  @IsString()
  @IsNotEmpty()
  outrosDadosRelevantes: string;

  @IsNumber()
  @IsNotEmpty()
  docenteId: Docente;

  @IsNumber()
  @IsNotEmpty()
  alunoId: Aluno;
}
