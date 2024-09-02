import { Module } from '@nestjs/common';
import { NapneService } from './napne.service';
import { NapneController } from './napne.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Napne } from './entities/napne.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Napne])],
  controllers: [NapneController],
  providers: [NapneService],
})
export class NapneModule {}
