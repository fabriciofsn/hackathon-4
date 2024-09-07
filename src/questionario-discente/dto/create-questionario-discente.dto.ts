import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Moradia } from '../entities/questionario-discente.entity';
import { Napne } from 'src/napne/entities/napne.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';

export class CreateQuestionarioDiscenteDto {
  @IsBoolean()
  @IsNotEmpty()
  recebeRecebeuAtendMedicoEspecifico: Boolean;

  @IsString()
  @IsNotEmpty()
  fazUsoQuaisMedicamentos: string;

  @IsString()
  @IsNotEmpty()
  possuiQuaisAlergias: string;

  @IsString()
  @IsNotEmpty()
  fazFezAcompProfissionais: string;

  @IsBoolean()
  @IsNotEmpty()
  freqInstituicaoDeAuxilioApoioForaAmbienteEscola: boolean;

  @IsBoolean()
  @IsNotEmpty()
  recebeAcompEscolar: boolean;

  @IsBoolean()
  @IsNotEmpty()
  estudaSozinhoRecebeReforco: boolean;

  @IsString()
  @IsNotEmpty()
  disciplinasDificuldade: string;

  @IsString()
  @IsNotEmpty()
  disciplinasFacilidade: string;

  @IsString()
  @IsNotEmpty()
  interesseHabArtistica: string;

  @IsBoolean()
  @IsNotEmpty()
  possuiEspacoEstudoEmCasa: boolean;

  @IsBoolean()
  @IsNotEmpty()
  possuiComputadorCelularTablet: boolean;

  @IsBoolean()
  @IsNotEmpty()
  recebeBolsaFamilia: boolean;

  @IsBoolean()
  @IsNotEmpty()
  recebeBPC: boolean;

  @IsNumber()
  @IsNotEmpty()
  qntPessoasMoramNaCasa: number;

  @IsNumber()
  @IsNotEmpty()
  qntCriancasMoramNaCasa: number;

  @IsNumber()
  @IsNotEmpty()
  qntPessoasAcima60Anos: number;

  @IsEnum(Moradia)
  @IsNotEmpty()
  opcaoMoradia: Moradia;

  @IsBoolean()
  @IsNotEmpty()
  precisaTransporteVirAoCampus: boolean;

  @IsNumber()
  @IsNotEmpty()
  alunoId: Aluno;

  @IsNumber()
  @IsNotEmpty()
  napneId: Napne;
}
