import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Napne } from 'src/napne/entities/napne.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Napne])],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
