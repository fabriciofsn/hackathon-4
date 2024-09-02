import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNapneDto } from './dto/create-napne.dto';
import { UpdateNapneDto } from './dto/update-napne.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Napne } from './entities/napne.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NapneService {
  constructor(
    @InjectRepository(Napne)
    private readonly napneRepository: Repository<Napne>,
  ) {}

  async create(createNapneDto: CreateNapneDto) {
    const userNapne = new Napne(createNapneDto);
    return this.napneRepository.save(userNapne);
  }

  findAll() {
    return this.napneRepository.find({ select: ['nome', 'email', 'CPF'] });
  }

  findOne(id: number) {
    return this.napneRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.napneRepository.findOne({ where: { email } });
  }

  async update(id: number, updateNapneDto: UpdateNapneDto) {
    const userNapne = await this.napneRepository.findOneOrFail({
      where: { id },
    });
    if (!userNapne) throw new NotFoundException('Aluno não encontrado');
    this.napneRepository.merge(userNapne, updateNapneDto);
    return this.napneRepository.save(userNapne);
  }

  remove(id: number) {
    return this.napneRepository.softDelete(id);
  }
}
