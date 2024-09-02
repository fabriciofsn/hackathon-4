import { Module } from '@nestjs/common';
import { QuestionarioDocenteService } from './questionario-docente.service';
import { QuestionarioDocenteController } from './questionario-docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionarioDocente } from './entities/questionario-docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionarioDocente])],
  controllers: [QuestionarioDocenteController],
  providers: [QuestionarioDocenteService],
})
export class QuestionarioDocenteModule {}
