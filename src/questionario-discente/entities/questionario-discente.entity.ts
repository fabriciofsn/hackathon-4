import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import { EmailController } from 'src/email/email.controller';
import { EmailService } from 'src/email/email.service';
import { Napne } from 'src/napne/entities/napne.entity';
import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionarioDiscenteService } from '../questionario-discente.service';

export enum Moradia {
  ALUGUEL = 'ALGUEL',
  CASA_PROPRIA = 'CASA PROPRIA',
  CEDIDA = 'CEDIDA',
  FINANCIADA = 'FINANCIADA',
  IMOVEL_SITUACAO_IRREGULAR = 'IMÓVEL EM SITUAÇÃO IRREGULAR',
  INVASAO_DE_PROPRIEDADE = 'INVASÃO DE PROPRIEDADE',
  QUILOMBOLA = 'QUILOMBOLA',
  ALDEIA_INDIGENA = 'ALDEIA INDÍGENA',
}

@Entity()
export class QuestionarioDiscente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'recebe_recebeu_atend_medico_especifico' })
  recebeRecebeuAtendMedicoEspecifico: Boolean;

  @Column({ name: 'faz_uso_de_quais_medicamentos' })
  fazUsoQuaisMedicamentos: string;

  @Column({ name: 'possui_quais_alergias' })
  possuiQuaisAlergias: string;

  @Column({ name: 'faz_fez_acomp_profissionais' })
  fazFezAcompProfissionais: string;

  @Column({ name: 'freq_inst_auxilio_apoio_fora_ambiente_escolar' })
  freqInstituicaoDeAuxilioApoioForaAmbienteEscola: Boolean;

  @Column({ name: 'recebe_acomp_escolar' })
  recebeAcompEscolar: Boolean;

  @Column({ name: 'estuda_sozinho_recebe_reforco' })
  estudaSozinhoRecebeReforco: Boolean;

  @Column({ name: 'disciplinas_dificuldade', length: 200 })
  disciplinasDificuldade: string;

  @Column({ name: 'disciplinas_facilidade', length: 200 })
  disciplinasFacilidade: string;

  @Column({ name: 'interesse_hab_artistica' })
  interesseHabArtistica: string;

  @Column({ name: 'possui_espaco_estudo_casa' })
  possuiEspacoEstudoEmCasa: Boolean;

  @Column({ name: 'possui_computador_celular_tablet' })
  possuiComputadorCelularTablet: Boolean;

  @Column({ name: 'recebe_bolsa_familia' })
  recebeBolsaFamilia: Boolean;

  @Column({ name: 'recebe_BPC' })
  recebeBPC: Boolean;

  @Column({ name: 'qnt_pessoas_mora_na_casa', type: 'integer' })
  qntPessoasMoramNaCasa: number;

  @Column({ name: 'qnt_criancas_moram_na_casa', type: 'integer' })
  qntCriancasMoramNaCasa: number;

  @Column({ name: 'qnt_pessoas_acima_60_anos', type: 'integer' })
  qntPessoasAcima60Anos: number;

  @Column({ name: 'opcao_de_moradia', type: 'enum', enum: Moradia })
  opcaoMoradia: Moradia;

  @Column({ name: 'precisa_transporte_vir_ao_campus' })
  precisaTransporteVirAoCampus: Boolean;

  @OneToOne(() => Aluno, (aluno: Aluno) => aluno.questionario)
  @JoinColumn({ name: 'aluno_id', referencedColumnName: 'id' })
  aluno: Aluno;

  @OneToOne(() => Napne, (napne) => napne.questionario)
  @JoinColumn({ name: 'napne_id', referencedColumnName: 'id' })
  napne: Napne;

  constructor(ques: Partial<QuestionarioDiscente>) {
    Object.assign(this, ques);
  }
}
