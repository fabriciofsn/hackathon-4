import { Napne } from 'src/napne/entities/napne.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Napne, (napne) => napne.curso)
  @JoinColumn({ name: 'napne_id', referencedColumnName: 'id' })
  napneId: Napne;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor(curso: Partial<Curso>) {
    Object.assign(this, curso);
  }
}
