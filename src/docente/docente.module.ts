import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Napne } from 'src/napne/entities/napne.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Docente, Napne])],
  controllers: [DocenteController],
  providers: [DocenteService, EmailService],
  exports: [DocenteService],
})
export class DocenteModule {}
