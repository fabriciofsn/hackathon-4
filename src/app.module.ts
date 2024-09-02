import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DocenteModule } from './docente/docente.module';
import { NapneModule } from './napne/napne.module';
import { AlunoModule } from './aluno/aluno.module';
import { QuestionarioDocenteModule } from './questionario-docente/questionario-docente.module';
import { QuestionarioDiscenteModule } from './questionario-discente/questionario-discente.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DocenteModule,
    NapneModule,
    AlunoModule,
    QuestionarioDocenteModule,
    QuestionarioDiscenteModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
