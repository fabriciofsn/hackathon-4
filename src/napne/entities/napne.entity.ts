import { genSalt, hash } from 'bcrypt';
import { Matches } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Docente } from 'src/docente/entities/docente.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { QuestionarioDiscente } from 'src/questionario-discente/entities/questionario-discente.entity';
import { Curso } from 'src/cursos/entities/curso.entity';

@Entity()
export class Napne {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @Column()
  senha: string;

  @Column({ unique: true })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
  CPF: string;

  @Column({ name: 'user_type', default: 'napne' })
  userType?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => QuestionarioDiscente, (questionario) => questionario.napne)
  questionario: QuestionarioDiscente;

  @OneToOne(() => Aluno, (aluno) => aluno.napne)
  aluno: Aluno;

  @OneToMany(() => Docente, (docente) => docente.napne)
  docente: Docente;

  @OneToMany(() => Curso, (curso) => curso.napneId)
  curso: Curso;

  constructor(napne: Partial<Napne>) {
    Object.assign(this, napne);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.senha) {
      const salt = await bcrypt.genSalt();
      this.senha = await bcrypt.hash(this.senha, salt);
    }
  }
}
