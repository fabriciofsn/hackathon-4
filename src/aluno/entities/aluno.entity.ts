import { Matches } from 'class-validator';
import { Napne } from 'src/napne/entities/napne.entity';
import { QuestionarioDiscente } from 'src/questionario-discente/entities/questionario-discente.entity';
import { QuestionarioDocente } from 'src/questionario-docente/entities/questionario-docente.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Raca {
  PRETO = 'PRETO',
  PARDO = 'PARDO',
  BRANCO = 'BRANCO',
  AMARELO = 'AMARELO',
  INDIGENA = 'INDÍGENA',
}

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
  CPF: string;

  @Column({ nullable: true, unique: true, name: 'CPF_reponsavel' })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
  CPFresponsavel: string;

  @Column({ unique: true })
  @Matches(/^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/)
  telefone: string;

  @Column({ unique: true })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @Column()
  curso: string;

  @Column()
  raca: Raca;

  @Column()
  matricula: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => QuestionarioDiscente, (questionario) => questionario.aluno)
  questionario?: QuestionarioDiscente;

  @OneToOne(() => Napne, (napne) => napne.aluno)
  @JoinColumn({ name: 'napne_id', referencedColumnName: 'id' })
  napne: Napne;

  @OneToMany(() => QuestionarioDocente, (questionario) => questionario.aluno)
  questionarioDocente?: QuestionarioDocente;

  constructor(aluno: Partial<Aluno>) {
    Object.assign(this, aluno);
  }

  @BeforeInsert()
  gerarMatricula(): void {
    const ano = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    this.matricula = `${ano}${random}`;
  }
}
