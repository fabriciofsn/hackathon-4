import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Matches } from 'class-validator';
import { Napne } from 'src/napne/entities/napne.entity';
import { QuestionarioDocente } from 'src/questionario-docente/entities/questionario-docente.entity';
import { EmailController } from 'src/email/email.controller';
import { EmailService } from 'src/email/email.service';

@Entity()
export class Docente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ unique: true, nullable: false })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @Column({ nullable: false })
  senha: string;

  @Column()
  cursos: string;

  @Column({ name: 'user_type', default: 'docente' })
  userType?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Napne, (napne) => napne.docente)
  @JoinColumn({ name: 'napne_id', referencedColumnName: 'id' })
  napne: Napne;

  @OneToMany(() => QuestionarioDocente, (questionario) => questionario.docente)
  questionarioDocente?: QuestionarioDocente;

  constructor(docente: Partial<Docente>) {
    Object.assign(this, docente);
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
