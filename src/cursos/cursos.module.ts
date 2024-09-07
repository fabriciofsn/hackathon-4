import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Napne } from 'src/napne/entities/napne.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Napne])],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
