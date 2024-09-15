import { Module } from '@nestjs/common';
import { QuestionarioDiscenteService } from './questionario-discente.service';
import { QuestionarioDiscenteController } from './questionario-discente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionarioDiscente } from './entities/questionario-discente.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Napne } from 'src/napne/entities/napne.entity';
import { EmailModule } from 'src/email/email.module';
import { CreateQuestionarioDiscenteDto } from './dto/create-questionario-discente.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionarioDiscente, Aluno, Napne]),
    EmailModule,
  ],
  controllers: [QuestionarioDiscenteController],
  providers: [QuestionarioDiscenteService, CreateQuestionarioDiscenteDto],
  exports: [QuestionarioDiscenteService],
})
export class QuestionarioDiscenteModule {}
