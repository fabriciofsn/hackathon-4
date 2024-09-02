import { Module } from '@nestjs/common';
import { QuestionarioDiscenteService } from './questionario-discente.service';
import { QuestionarioDiscenteController } from './questionario-discente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionarioDiscente } from './entities/questionario-discente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionarioDiscente])],
  controllers: [QuestionarioDiscenteController],
  providers: [QuestionarioDiscenteService],
})
export class QuestionarioDiscenteModule {}
