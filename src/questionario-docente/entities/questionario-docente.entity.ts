import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EstadoSaude {
  SAUDAVEL = 'SAUDAVEL',
  PALIDO = 'PALIDO',
  LENTO = 'LENTO',
}

export enum HistoricoEscolar {
  ASSIDUO = 'ASSIDUO',
  CHEGA_ATRASADO = 'CHEGA ATRASADO',
  FALTA_MUITO = 'FALTA MUITO',
  PARTICIPATIVO = 'PARTICIPATIVO',
  FALTA_FREQ_POR_MOTIVO_DE_DOENCA = 'FALTA FREQUENTEMENTE POR MOTIVO DE DOENÇA',
}

export enum Comportamento {
  TRANQUILO = 'TRANQUILO',
  AGITADO = 'AGITADO',
  DISPERSO = 'DISPERSO',
}

export enum Aprendizagem {
  DOMINIO_CONCEITOS_BASICO = 'DOMINIO DE CONCEITOS BASICOS',
  DOMINIO_LEITURA_ESCRITA = 'DOMINIO DE LEITURA E ESCRITA',
  DIFICULDADES_LEITURA_ESCRITA = 'DIFICULDADES EM LEITURA E ESCRITA',
  DOMINIO_EM_EXATAS = 'DOMINIO EM EXATAS',
  DIFICULDADES_EM_EXATAS = 'DIFICULDADE EM EXATAS',
  DOMINIO_EM_LINGUAGENS = 'DOMINIO EM LINGUAGENS',
  DIFICULDADE_EM_LINGUAGENS = 'DIFICULDADE EM LINGUAGENS',
  DOMINIO_EM_HUMANAS = 'DIFICULDADE EM HUMANAS',
  DOMINIO_CIENCIAS_NATUREZA = 'DOMINIO EM CIENCIAS DA NATUREZA',
  DIFICULDADES_EM_CIENCIAS_DA_NATUREZA = 'DIFICULDADE EM CIENCIAS DA NATUREZA',
  DIFICULDADE_EM_FICAR_PARADO = 'DIFICULDADE EM FICAR PARADO,INTERROMPE',
  DIFICULDADE_ATENCAO_CONCENTRACAO = 'DIFICULDADE EM ATENÇÃO E CONCENTRAÇÃO',
}

export enum AspectosMotores {
  DIFICULDADE_AO_LOCOMOVER = 'DIFICULDADE AO SE LOCOMOVER',
  DIFICULDADE_MANUSEIO_OBJETOS = 'DIFICULDADE NO MANUSEIO DE OBJETOS',
}

export enum Comunicacao {
  UTILIZA_COMUNICACAO_NORMALMENTE = 'UTILIZA A COMUNICAÇÃO NORMALMENTE',
  DIFICULDADE_SE_COMUNICAR_COM_COLEGAS = 'DIFICULDADE DE SE COMUNICAR COM OS COLEGAS',
  DIFICULDADE_SE_COMUNICAR_COM_PROFESSORES = 'DIFICULDADE DE SE COMUNICAR COM PROFESSORES',
  DIFICULDADE_INTERAGIR_NA_AULA = 'DIFICULDADE DE INTERAGIR NA AULA',
}

export enum Pedagogico {
  ENTREGA_ATIVIDADES_NOS_DIAS_SOLICITADOS = 'ENTREGA AS ATIVIDADES NOS DIAS SOLICITADOS',
  COSTUMA_ESQUECER_MATERIAIS_OU_ENTREGA_DE_ATIVIDADES = 'COSTUMA ESQUECER MATERIAIS OU ENTREGA DE ATIVIDADES',
  DIFICULDADE_TRABALHO_EM_GRUPO = 'TEM DIFICULDADE EM TRABALHO EM GRUPO',
  ENTREGA_ATIVIDADES_DIFERENTES_QUE_FOI_SOLICITADO = 'ENTREGA ATIVIDADES DIFERENTES DO QUE FOI SOLICITADO',
}

@Entity()
export class QuestionarioDocente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'inicio_observacao' })
  inicioObservacao: Date;

  @Column({ name: 'fim_observacao' })
  fimObsercacao: Date;

  @Column({ length: 500 })
  queixa: string;

  @Column({
    name: 'estado_geral_aluno',
    enum: EstadoSaude,
    array: true,
    type: 'enum',
  })
  estadoGeralAluno: EstadoSaude;

  @Column({ name: 'obs_estado_geral_saude', length: 250, nullable: true })
  observacoes?: string;

  @Column({
    name: 'historico_escolar',
    type: 'enum',
    enum: HistoricoEscolar,
    array: true,
  })
  historicoEscolar: HistoricoEscolar[];

  @Column({ type: 'enum', enum: Comportamento, array: true })
  comportamento: Comportamento[];

  @Column({ name: 'obs_comportamento', nullable: true })
  obsComportamento?: string;

  @Column({
    name: 'aprendizagem',
    type: 'enum',
    enum: Aprendizagem,
    array: true,
  })
  aprendizagem: Aprendizagem[];

  @Column({ type: 'enum', enum: AspectosMotores, array: true })
  aspectosMotores: AspectosMotores[];

  @Column({ type: 'enum', enum: Comunicacao, array: true })
  comunicacao: Comunicacao[];

  @Column({ type: 'enum', enum: Pedagogico, array: true })
  pedagogico: Pedagogico[];

  @Column({ name: 'outros_dados_relevantes', type: 'varchar', length: 300 })
  outrosDadosRelevantes: string;

  @ManyToOne(() => Docente, (docente) => docente.questionarioDocente)
  @JoinColumn({ name: 'docente_id', referencedColumnName: 'id' })
  docente: Docente;

  @ManyToOne(() => Aluno, (aluno) => aluno.questionarioDocente)
  @JoinColumn({ name: 'aluno_id', referencedColumnName: 'id' })
  aluno: Aluno;

  constructor(quest: Partial<QuestionarioDocente>) {
    Object.assign(this, quest);
  }
}
