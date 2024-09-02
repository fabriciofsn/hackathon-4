import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) {}

  async create(createDocenteDto: CreateDocenteDto) {
    const userDocente = new Docente(createDocenteDto);
    return this.docenteRepository.save(userDocente);
  }

  findAll() {
    return this.docenteRepository.find({ select: ['nome', 'email', 'curso'] });
  }

  findOne(id: number) {
    return this.docenteRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    const docenteUpdate = await this.docenteRepository.findOne({
      where: { id },
    });
    if (!docenteUpdate) throw new NotFoundException('Aluno não encontrado');

    this.docenteRepository.merge(docenteUpdate, updateDocenteDto);

    return this.docenteRepository.save(docenteUpdate);
  }

  remove(id: number) {
    return this.docenteRepository.softDelete(id);
  }
}
